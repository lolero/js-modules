import { defineConfig } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import tsconfigPathsPlugin from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactPlugin(),
    tsconfigPathsPlugin({
      projects: [
        process.env.NODE_ENV === 'production'
          ? 'tsconfig.build.json'
          : 'tsconfig.json',
      ],
    }),
  ],
  build: {
    outDir: 'build',
  },
});
