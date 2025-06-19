import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://erp.teamproit.com',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, '../jobpro/public/frontend'), 
    emptyOutDir: true,
    target: 'esnext',
    chunkSizeWarningLimit: 1000,  
    rollupOptions: {
      output: {
        manualChunks: undefined, 
      },
    },
  },
  optimizeDeps: {
    include: ['frappe-ui > feather-icons', 'showdown', 'engine.io-client'],
  },
});
