import pluginBabel from '@rolldown/plugin-babel';
import pluginReact, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { docsMuiStaticAssets } from '@js-modules/web-react-docs-mui/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    pluginReact(),
    pluginBabel({ presets: [reactCompilerPreset()] }),
    svgr({
      svgrOptions: {
        exportType: 'named',
      },
      include: '**/*.svg',
    }),
    docsMuiStaticAssets(),
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
    port: 5181,
    strictPort: true,
    host: true,
    allowedHosts: ['client-web'],
  },
});
