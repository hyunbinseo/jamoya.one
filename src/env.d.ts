/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
