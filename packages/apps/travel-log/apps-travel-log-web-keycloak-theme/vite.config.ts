import { defineConfig, PluginOption } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import { keycloakify } from 'keycloakify/vite-plugin';
import tsconfigPathsPlugin from 'vite-tsconfig-paths';

const plugins: (PluginOption | PluginOption[])[] = [
  reactPlugin(),
  keycloakify({
    accountThemeImplementation: 'none',
  }),
];

if (process.env.NODE_ENV !== 'production') {
  plugins.push(
    tsconfigPathsPlugin({
      projects: ['../../../../tsconfig.json'],
    }),
  );
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins,
  build: {
    outDir: 'build',
  },
  define: {
    'process.env': {},
  },
});
