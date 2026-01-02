import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },
  build: {
    target: "es2015",
    minify: "esbuild",
    cssCodeSplit: true,
    // Let Vite handle code splitting automatically via lazy() imports in AppRoutes.tsx
    // Manual chunking was causing initialization order issues between chunks
  },
});
