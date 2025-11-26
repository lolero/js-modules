/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');
const fs = require('fs');
/* eslint-enable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */

// Path to monorepo root
const monorepoRoot = path.resolve(__dirname, '../../../..');

// Load and parse tsconfig.json to get paths mapping
const tsconfigPath = path.resolve(monorepoRoot, 'tsconfig.json');
const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
const tsconfigPaths = tsconfig.compilerOptions?.paths || {};

// Convert tsconfig paths to Metro-compatible package map
// tsconfig format: "@js-modules/package": ["path/to/package/src"]
// Metro format: { "@js-modules/package": "path/to/package/src" }
const packageMap = {};
Object.keys(tsconfigPaths).forEach((packageName) => {
  const pathArray = tsconfigPaths[packageName];
  if (Array.isArray(pathArray) && pathArray.length > 0) {
    // Take the first path (tsconfig allows multiple, we use the first one)
    // eslint-disable-next-line prefer-destructuring
    packageMap[packageName] = pathArray[0];
  }
});

// Build extraNodeModules mapping for workspace packages
// Maps @js-modules/* packages to their package root (not src)
const extraNodeModules = {};
Object.keys(packageMap).forEach((packageName) => {
  const packagePath = packageMap[packageName];
  // Remove '/src' from the end to get package root
  const packageRoot = packagePath.replace(/\/src$/, '');
  const fullPath = path.resolve(monorepoRoot, 'packages', packageRoot);

  // Only add if directory exists
  if (fs.existsSync(fullPath)) {
    extraNodeModules[packageName] = fullPath;
  }
});

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  // Watch monorepo root node_modules and all workspace packages
  watchFolders: [
    path.resolve(monorepoRoot, 'node_modules'),
    path.resolve(monorepoRoot, 'packages'),
  ],

  resolver: {
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(monorepoRoot, 'node_modules'),
    ],

    extraNodeModules: {
      // Map workspace packages to their source directories
      ...extraNodeModules,
      // Provide empty polyfills for required Node.js built-ins
      path: path.resolve(__dirname, 'src/polyfills/polyfills.empty.js'),
      fs: path.resolve(__dirname, 'src/polyfills/polyfills.empty.js'),
      os: path.resolve(__dirname, 'src/polyfills/polyfills.empty.js'),
      crypto: path.resolve(__dirname, 'src/polyfills/polyfills.empty.js'),
      // Mock the dotenv package itself for React Native
      dotenv: path.resolve(__dirname, 'src/polyfills/polyfills.dotenv.js'),
    },

    // Ensure Metro can resolve TypeScript source files
    sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx'],
  },

  // Transformer configuration to handle TypeScript and workspace packages
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
