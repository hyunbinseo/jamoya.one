#!/usr/bin/env node

import { existsSync, readdirSync, renameSync, unlinkSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import { join } from 'node:path';
import { argv } from 'node:process';

const writeFiles = argv.includes('--write') || argv.includes('-w');
const recursive = argv.includes('--recursive') || argv.includes('-r');

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

const ignore = ['desktop.ini'];

function collectItems(dir = '.', items = []) {
	const entries = readdirSync(dir, { withFileTypes: true });

	for (const entry of entries) {
		if (ignore.includes(entry.name) || entry.name.startsWith('.')) {
			continue;
		}

		const fullPath = dir === '.' ? entry.name : join(dir, entry.name);

		if (entry.name !== entry.name.normalize()) {
			items.push({
				name: entry.name,
				path: fullPath,
				dir: dir,
				isDirectory: entry.isDirectory(),
			});
		}

		if (recursive && entry.isDirectory()) {
			collectItems(fullPath, items);
		}
	}

	return items;
}

try {
	const needsNormalization = collectItems();

	if (!needsNormalization.length) {
		console.log('NFD로 인코딩 된 파일명 또는 디렉터리명이 없습니다.');
		process.exit(0);
	}

	const itemType = recursive ? '항목' : '파일명';
	console.log(
		`총 ${needsNormalization.length}개의 ${itemType}이 NFD로 인코딩 되어 있습니다.\n`,
	);

	for (const { name: filename, path: fullPath, dir: itemDir, isDirectory } of needsNormalization) {
		const normalized = filename.normalize();
		const normalizedPath = itemDir === '.' ? normalized : join(itemDir, normalized);

		if (!writeFiles) {
			console.log(normalizedPath);
			continue;
		}

		if (!skipExistCheck && existsSync(normalizedPath))
			throw new Error(
				`변환 실패: ${normalizedPath} - 동일 이름의 ${isDirectory ? '디렉터리' : '파일'}이 존재합니다.`,
			);

		renameSync(fullPath, normalizedPath);
		const itemType = isDirectory ? '디렉터리' : '파일';
		console.log(`변환 완료: ${normalizedPath} (${itemType})`);
	}
} catch (e) {
	if (e instanceof Error) console.error(e);
}
