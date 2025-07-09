import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false, // desactiva los mapas de fuente en producción
    minify: 'esbuild', // compresión más rápida y efectiva
    cssCodeSplit: true, // divide los CSS por componentes
    brotliSize: true,   // calcula tamaños para brotli (útil para medir)
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})