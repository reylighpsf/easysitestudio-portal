import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const parsePort = (value: string | undefined, fallback: number) => {
    const parsed = Number.parseInt((value ?? "").trim(), 10);
    return Number.isNaN(parsed) ? fallback : parsed;
  };

  const serverPort = parsePort(env.VITE_PORT, 5173);
  const backendPort = parsePort(env.BACKEND_PORT ?? env.PORT, 3001);
  const rawApiBaseUrl = (env.VITE_API_BASE_URL ?? "").trim();
  const apiTarget =
    rawApiBaseUrl.length > 0
      ? rawApiBaseUrl.replace(/\/$/, "")
      : `http://localhost:${backendPort}`;

  return {
    server: {
      host: "::",
      port: serverPort,
      hmr: {
        overlay: false,
      },
      proxy: {
        "/api": {
          target: apiTarget,
          changeOrigin: true,
        },
        "/uploads": {
          target: apiTarget,
          changeOrigin: true,
        },
      },
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
