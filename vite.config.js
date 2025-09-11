import { resolve } from 'path';

export default {
  base: '/',
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
        stories: resolve(__dirname, 'pages/stories.html'),
        stones: resolve(__dirname, 'pages/stones.html'),
        services: resolve(__dirname, 'pages/services.html'),
        team: resolve(__dirname, 'pages/team.html'),
        error: resolve(__dirname, 'pages/404.html')
      },
      external: ['p5.sound'], // mark p5.sound external so it’s not bundled
      
      output: {
        manualChunks: undefined,
      },
    },
    commonjsOptions: {
      include: [/node_modules/], // ensure CJS modules are handled
    },
  },
  server: {
    open: true,
  },
};
