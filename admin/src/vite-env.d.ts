/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const vueComponent: DefineComponent<{}, {}, any>;
  export default vueComponent;
}

declare module "vuex" {
  export * from "vuex/types/index.d.ts";
  export * from "vuex/types/helpers.d.ts";
  export * from "vuex/types/logger.d.ts";
  export * from "vuex/types/vue.d.ts";
}

// 环境变量 TypeScript的智能提示;
interface ImportMetaEnv {
  VITE_APP_PORT: number;
  VITE_API_URL: string;
  VITE_WEBSOCKET_URL: string;

  VITE_COS_BUCKET: string;
  VITE_COS_REGION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
