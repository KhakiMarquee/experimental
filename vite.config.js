export default {
  base: '/experimental/', // 👈 MUST match your repo name!
  build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          manualChunks: undefined,
        }
      }
    },
    server: {
      open: true
    }
};

