/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AZURE_VISION_KEY?: string
  readonly VITE_AZURE_VISION_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
