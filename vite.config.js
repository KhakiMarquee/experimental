import { resolve } from 'path';

export default {
  base: '/experimental/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'pages/projects.html'),
        // Add other pages here if needed
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



