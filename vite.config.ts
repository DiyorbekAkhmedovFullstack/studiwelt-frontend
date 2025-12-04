import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'es2015',
    minify: 'esbuild', // Faster than terser, good compression
    cssCodeSplit: true, // Split CSS for lazy loaded components
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separate vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('@fortawesome')) {
              return 'fontawesome';
            }
            if (id.includes('react-hot-toast')) {
              return 'toast';
            }
            return 'vendor'; // Other node_modules
          }

          // Separate admin pages into own chunk
          if (id.includes('/pages/Admin')) {
            return 'admin-pages';
          }

          // Separate lesson/exercise pages
          if (id.includes('/pages/Lesson') || id.includes('/pages/Reading') || id.includes('/pages/Grammar') || id.includes('/pages/Ctest') || id.includes('/pages/Deck')) {
            return 'lesson-pages';
          }

          // Landing and auth pages stay in main chunk for fast initial load
        },
      },
    },
  },
})
