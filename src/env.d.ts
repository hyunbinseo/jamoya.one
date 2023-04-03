/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_PAGE_DOMAIN: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
