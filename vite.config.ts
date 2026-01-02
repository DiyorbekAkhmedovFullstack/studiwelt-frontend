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
    minify: "esbuild", // Faster than terser, good compression
    cssCodeSplit: true, // Split CSS for lazy loaded components
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Keep all node_modules in a single vendor chunk to avoid initialization order issues
          if (id.includes("node_modules")) {
            // Only separate large icon library
            if (id.includes("@fortawesome")) {
              return "fontawesome";
            }
            return "vendor";
          }

          // Separate admin pages into own chunk
          if (id.includes("/pages/Admin")) {
            return "admin-pages";
          }

          // Split lesson/exercise pages into feature-based chunks
          if (
            id.includes("/pages/LessonGrammar") ||
            id.includes("/pages/Grammar")
          ) {
            return "grammar-pages";
          }

          if (
            id.includes("/pages/LessonCtest") ||
            id.includes("/pages/Ctest")
          ) {
            return "ctest-pages";
          }

          if (id.includes("/pages/Reading")) {
            return "reading-pages";
          }

          if (id.includes("/pages/LessonDeck") || id.includes("/pages/Deck")) {
            return "deck-pages";
          }

          if (id.includes("/pages/Lesson")) {
            return "lesson-core";
          }
        },
      },
    },
  },
});
