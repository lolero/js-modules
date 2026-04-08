import pluginReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    pluginReact(),
    svgr({
      svgrOptions: {
        exportType: 'named',
      },
      include: '**/*.svg',
    }),
  ],
  resolve: {
    tsconfigPaths: process.env.NODE_ENV !== 'production',
  },
  build: {
    outDir: 'build',
  },
  define: {
    'process.env.ROUTER_HOST': JSON.stringify('$VITE_ROUTER_HOST'),
  },
  optimizeDeps: {
    exclude: ['react-native'],
  },
  server: {
    port: 5180,
    strictPort: true,
    host: true,
    allowedHosts: ['client-web'],
  },
});
