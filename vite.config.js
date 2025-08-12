import { resolve } from 'path';

export default {
  base: './',
  resolve: {
    alias: {
      '@css': resolve(__dirname, 'css'), // your css alias
      '@media': resolve(__dirname, 'media')
    },
  },
  optimizeDeps: {
    exclude: ['p5.sound'], // exclude p5.sound from pre-bundling
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'pages/projects.html'),
        stones: resolve(__dirname, 'pages/stones.html')
      },
      external: ['p5.sound'], // mark p5.sound external so it’s not bundled
      output: {
        manualChunks: undefined,
      },
    },
    commonjsOptions: {
      include: [/node_modules/, /p5.sound/], // ensure CJS modules are handled
    },
  },
  server: {
    open: true,
  },
};
