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
          // Separate vendor chunks
          if (id.includes("node_modules")) {
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router")
            ) {
              return "react-vendor";
            }
            if (id.includes("@fortawesome")) {
              return "fontawesome";
            }
            if (id.includes("react-hot-toast")) {
              return "toast";
            }
            return "vendor"; // Other node_modules
          }

          // Separate admin pages into own chunk
          if (id.includes("/pages/Admin")) {
            return "admin-pages";
          }

          // Split lesson/exercise pages into feature-based chunks
          // Grammar feature (theory components are lazy-loaded separately per lesson)
          if (
            id.includes("/pages/LessonGrammar") ||
            id.includes("/pages/Grammar")
          ) {
            return "grammar-pages";
          }

          // Each grammar theory lesson gets its own chunk via lazy loading
          // This is handled automatically by dynamic imports in LessonGrammarTheory.tsx

          // C-Test feature
          if (
            id.includes("/pages/LessonCtest") ||
            id.includes("/pages/Ctest")
          ) {
            return "ctest-pages";
          }

          // Reading feature
          if (id.includes("/pages/Reading")) {
            return "reading-pages";
          }

          // Flashcard/Deck feature
          if (id.includes("/pages/LessonDeck") || id.includes("/pages/Deck")) {
            return "deck-pages";
          }

          // Core lesson pages (LessonPage)
          if (id.includes("/pages/Lesson")) {
            return "lesson-core";
          }
        },
      },
    },
  },
});
