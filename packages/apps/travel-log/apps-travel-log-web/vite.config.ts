import { defineConfig, PluginOption } from 'vite';
import pluginReact from '@vitejs/plugin-react';
import tsconfigPathsPlugin from 'vite-tsconfig-paths';

const plugins: (PluginOption | PluginOption[])[] = [
  pluginReact({
    babel: {
      parserOpts: {
        plugins: ['decorators-legacy', 'classProperties'],
      },
      // plugins: [
      //   ['@babel/plugin-proposal-decorators', { legacy: true }],
      //   ['@babel/plugin-proposal-class-properties', { loose: true }],
      // ],
    },
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
  define: {
    'process.env.ROUTER_HOST': JSON.stringify('$VITE_ROUTER_HOST'),
  },
  build: {
    outDir: 'build',
  },
  server: {
    host: true,
    allowedHosts: ['client-web'],
  },
});
