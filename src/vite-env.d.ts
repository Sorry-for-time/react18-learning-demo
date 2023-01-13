/// <reference types="vite/client" />

/**
 * 从 `.env` 里读取的值都为 string 类型, 所有需要自己进行判断并转化到所需的类型
 */
interface ImportMetaEnv {
  /**
   * 移动端设计稿单位尺寸
   */
  readonly VITE_MOBILE_VIEWPORT_UNIT: string;

  /**
   * PC 端设计稿单位尺寸
   */
  readonly VITE_PC_VIEWPORT_UNIT: string;

  /**
   * 本地开发服务器端口
   */
  readonly VITE_SERVER_PORT: string;

  /**
   * 开发模式下是否打开浏览器
   */
  readonly VITE_OPEN_BROWSER: "true" | "false";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
