import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      fastRefresh: true
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    cssCodeSplit: true,
    brotliSize: true,
    chunkSizeWarningLimit: 1000,
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
      '@': '/src'
    }
  },
  server: {
    port: 3000,
    strictPort: true
  },
  define: {
    'process.env': {}
  }
})
