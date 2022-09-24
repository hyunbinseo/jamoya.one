import { defineConfig, loadEnv } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

import type { Plugin, ConfigEnv, UserConfigExport } from 'vite';

const addImages = (domain: string = ''): Plugin => ({
  name: 'add-favicon-and-og:image-plugin',
  transformIndexHtml() {
    return [
      {
        injectTo: 'head',
        tag: 'link',
        attrs: {
          rel: 'icon',
          type: 'image/svg+xml',
          href: `${domain}/favicon.svg`,
        },
      },
      {
        injectTo: 'head',
        tag: 'link',
        attrs: {
          rel: 'icon',
          type: 'image/png',
          href: `${domain}/favicon.png`,
          sizes: 'any',
        },
      },
      {
        injectTo: 'head',
        tag: 'meta',
        attrs: {
          property: 'og:image',
          content: `${domain}/open-graph.jpg`,
        },
      },
    ];
  },
});

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const { VITE_PAGE_DOMAIN } = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [
      svelte(),
      ...(mode === 'production' ? [addImages(VITE_PAGE_DOMAIN)] : []),
    ],
  });
};
