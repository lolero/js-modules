import { defineConfig, PluginOption } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import tsconfigPathsPlugin from 'vite-tsconfig-paths';

const plugins: (PluginOption | PluginOption[])[] = [reactPlugin()];

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
});
