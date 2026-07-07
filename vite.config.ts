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
    rollupOptions: {
      output: {
        // Split all third-party code into a single long-lived "vendor" chunk.
        // It rarely changes, so returning visitors keep it cached across app
        // deploys and only re-download the (much smaller) app chunk.
        // Kept as ONE chunk on purpose: finer vendor groups here are circularly
        // entangled and Rollup merges them anyway, which also avoids the
        // cross-chunk initialization-order errors seen with earlier splits.
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
  },
});
