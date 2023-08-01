#!/usr/bin/env node

import {
	existsSync,
	readdirSync,
	renameSync,
	unlinkSync,
	writeFileSync,
} from 'node:fs';
import os from 'node:os';
import { argv } from 'node:process';

const writeFiles = argv[2] === '--write';

const skipExistCheck = (() => {
	if (os.platform() !== 'darwin') return false;

	const nfdString = '자모야 모여라 이름 귀엽지 않나요.txt';
	if (existsSync(nfdString)) return false;

	writeFileSync(nfdString, '', { encoding: 'utf-8' });

	// https://github.com/hyunbinseo/jamoya.one/issues/6
	const exists = existsSync(nfdString.normalize());

	unlinkSync(nfdString);

	return exists ? true : false;
})();

try {
	const items = readdirSync('.', { withFileTypes: true });

	const ignore = ['desktop.ini'];

	const validFiles = items.filter(
		(item) =>
			!item.isDirectory() ||
			!item.name.startsWith('.') ||
			!ignore.includes(item.name),
	);

	if (!validFiles.length) throw new Error('디렉터리에 유효한 파일이 없습니다.');

	const needsNormalization = validFiles.filter(
		({ name }) => name !== name.normalize(),
	);

	console.log(
		needsNormalization.length
			? `총 ${needsNormalization.length}개의 파일명이 NFD로 인코딩 되어 있습니다.\n`
			: 'NFD로 인코딩 된 파일명이 없습니다.',
	);

	for (const { name: filename } of needsNormalization) {
		const normalized = filename.normalize();

		if (!writeFiles) {
			console.log(normalized);
			continue;
		}

		if (!skipExistCheck && existsSync(normalized))
			throw new Error(
				`변환 실패: ${normalized} - 동일 이름의 파일이 존재합니다.`,
			);

		renameSync(filename, normalized);
		console.log(`변환 완료: ${normalized}`);
	}
} catch (e) {
	if (e instanceof Error) console.error(e);
}
