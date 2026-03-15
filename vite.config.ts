import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const serverPort = Number.parseInt(env.VITE_PORT ?? "5173", 10);
  const backendPort = Number.parseInt(env.BACKEND_PORT ?? env.PORT ?? "3001", 10);
  const apiTarget = (env.VITE_API_BASE_URL ?? `http://localhost:${backendPort}`).replace(/\/$/, "");

  return {
    server: {
      host: "::",
      port: Number.isNaN(serverPort) ? 5173 : serverPort,
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
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
