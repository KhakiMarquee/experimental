import { resolve } from 'path';

export default {
  resolve: {
    alias: {
      css: resolve(__dirname, 'css') // <--- this maps 'css/' to the /css folder
    },
  },
  base: '/experimental/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'pages/projects.html'),
      },
      output: {
        manualChunks: undefined,
      }
    }
  },
  server: {
    open: true,
  }
};