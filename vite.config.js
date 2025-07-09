import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,          // elimina mapas de fuente en producción
    minify: 'esbuild',         // compresión rápida
    cssCodeSplit: true,        // divide el CSS por componente
    brotliSize: true,          // útil para medir compresión
    chunkSizeWarningLimit: 1000, // sube el límite del warning de 500 KB a 1000 KB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('firebase')) return 'firebase';
            if (id.includes('react')) return 'react';
            return 'vendor';
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 3000,
  },
})
