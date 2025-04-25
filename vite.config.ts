import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(fileURLToPath(import.meta.url), "..", "client", "src"),
      "@shared": path.resolve(fileURLToPath(import.meta.url), "..", "shared"),
      "@assets": path.resolve(fileURLToPath(import.meta.url), "..", "attached_assets"),
    },
  },
  root: path.resolve(fileURLToPath(import.meta.url), "..", "client"),
  build: {
    outDir: path.resolve(fileURLToPath(import.meta.url), "..", "dist/public"),
    emptyOutDir: true,
  },
});
