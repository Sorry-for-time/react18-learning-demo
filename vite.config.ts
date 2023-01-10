import react from "@vitejs/plugin-react-swc";
import autoprefixer from "autoprefixer";
import { fileURLToPath, URL } from "node:url";
import { ConfigEnv, defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): any => {
  const env: Record<string, string> = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],

    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    },

    server: {
      port: Number.parseInt(env.VITE_SERVER_PORT),
      open: env.VITE_OPEN_BROWSER === "true" ? true : false
    },

    css: {
      postcss: {
        plugins: [autoprefixer]
      }
    }
  };
});
