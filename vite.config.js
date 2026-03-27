import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  // Inline PostCSS so Vite does not walk up to E:\Projects\postcss.config.js (Tailwind is @tailwindcss/vite).
  css: {
    postcss: {
      plugins: [],
    },
  },
  define: {
    'import.meta.env.VITE_KMJK_BUILD_REF': JSON.stringify(process.env.COMMIT_REF || process.env.VITE_COMMIT_REF || 'dev'),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
