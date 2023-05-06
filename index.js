#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { readdir, rename } from 'node:fs/promises';
import os from 'node:os';
import { argv } from 'node:process';
import about from './package.json' assert { type: 'json' };

const plistPath = '/System/Library/CoreServices/SystemVersion.plist';

if (os.platform() === 'darwin' && existsSync(plistPath)) {
	const [version] =
		readFileSync(plistPath, 'utf8').match(
			/(?<=<key>ProductVersion<\/key>\s*<string>)[\d.]+(?=<\/string>)/
		) || [];

	if (version && /^13\.3\./.test(version))
		throw new Error(
			`macOS 13.3.x 버전은 지원되지 않습니다. ${about.bugs.url}/6`
		);
}

const write = argv[2] === '--write';

const ignore = ['desktop.ini'];

try {
	const items = await readdir('.', { withFileTypes: true });

	const validFiles = items.filter(
		(item) =>
			!item.isDirectory() ||
			!item.name.startsWith('.') ||
			!ignore.includes(item.name)
	);

	if (!validFiles.length) throw new Error('디렉터리에 유효한 파일이 없습니다.');

	const needsNormalization = validFiles.filter(
		({ name }) => name !== name.normalize()
	);

	console.log(
		needsNormalization.length
			? `총 ${needsNormalization.length}개의 파일명이 NFD로 인코딩 되어 있습니다.\n`
			: 'NFD로 인코딩 된 파일명이 없습니다.'
	);

	for (const { name: filename } of needsNormalization) {
		const normalized = filename.normalize();

		if (!write) {
			console.log(normalized);
			continue;
		}

		if (existsSync(normalized))
			throw new Error(
				`변환 실패: ${normalized} - 동일 이름의 파일이 존재합니다.`
			);

		await rename(filename, normalized);
		console.log(`변환 완료: ${normalized}`);
	}
} catch (e) {
	if (e instanceof Error) console.error(e);
}
