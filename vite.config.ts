import { svelte } from '@sveltejs/vite-plugin-svelte';
import type { ConfigEnv, Plugin, UserConfigExport } from 'vite';
import { defineConfig, loadEnv } from 'vite';

const htmlPlugin = (domain = ''): Plugin => {
	return {
		name: 'html-transform',
		transformIndexHtml(html) {
			return html.replace(/__domain/g, domain);
		},
	};
};

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
	const { VITE_PAGE_DOMAIN } = loadEnv(mode, process.cwd());
	const domain = mode === 'production' ? VITE_PAGE_DOMAIN : '';

	return defineConfig({
		plugins: [svelte(), [htmlPlugin(domain)]],
	});
};
