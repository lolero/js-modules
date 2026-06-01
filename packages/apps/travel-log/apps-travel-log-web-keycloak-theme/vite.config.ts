import pluginReact from '@vitejs/plugin-react';
import { keycloakify } from 'keycloakify/vite-plugin';
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
    keycloakify({
      accountThemeImplementation: 'none',
    }),
  ],
  resolve: {
    tsconfigPaths: process.env.NODE_ENV !== 'production',
  },
  build: {
    outDir: 'build',
  },
  define: {
    'process.env': {},
  },
  optimizeDeps: {
    exclude: ['react-native'],
  },
  server: {
    port: 5182,
    strictPort: true,
  },
});
