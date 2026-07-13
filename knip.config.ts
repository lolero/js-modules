import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import type { KnipConfig } from 'knip';
import {
  exportTargetToSrcBase,
  extensionsJsTs,
  getProjectTypeJs,
  ProjectTypeJs,
} from './scripts/common/common.utils';

const project = [`src/**/*.{${extensionsJsTs}}`];

/**
 * Maps a package `exports` target to a knip entry glob into its source, e.g.
 * `./build/next/index.js` -> `src/next/index.{ts,tsx,…}`. The target carries the
 * published extension (`.js`/`.d.ts`), not the source one, so the extension is
 * dropped and a glob covers whichever source extension exists.
 * @param target - Export target path from a package's `exports` map.
 * @returns Entry glob relative to the package.
 */
function exportTargetToEntry(target: string): string {
  return `${exportTargetToSrcBase(target)}.{${extensionsJsTs}}`;
}

/**
 * Finds files by name under `packages`, ignoring `node_modules` and `build`.
 * @param pattern - `find -name` glob pattern (e.g. `package.json`, `*.native.*`).
 * @returns Matching file paths relative to the workspace root.
 */
function findFiles(pattern: string): string[] {
  return execSync(
    `find packages -name "${pattern}" -not -path "*/node_modules/*" -not -path "*/build/*"`,
    { encoding: 'utf8' },
  )
    .trim()
    .split('\n')
    .filter(Boolean);
}

const packageJsonPaths = findFiles('package.json');

// React Native platform files: metro resolves the `.native` suffix, but knip's
// resolver cannot, so the `src/index` barrel never reaches them.
const nativeFiles = findFiles('*.native.*');

// A per-workspace `entry` replaces knip's defaults rather than extending them, so
// the `packages/**` workspace below sets none: knip's default entry covers a
// library's `src/index` barrel and an app's `src/main`, and its plugins cover
// tool entries (vite, next, metro). Overrides are generated only for entries
// knip can't infer: library subpath exports, and framework files loaded at
// runtime (Hardhat, NestJS+TypeORM, React Native platform/polyfill files).
const generatedWorkspaces: Record<
  string,
  { project: string[]; entry?: string[]; ignoreDependencies?: string[] }
> = {};

// Packages without a `src/` dir (e.g. config-only bundles) aren't standard
// analyzable workspaces; skip them so `project` doesn't hint on no matches.
const ignoreWorkspaces: string[] = [];

for (const packageJsonPath of packageJsonPaths) {
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as {
    name?: string;
    exports?: Record<string, string | { types?: string; default?: string }>;
    nx?: { tags?: string[] };
  };

  if (!packageJson.name?.startsWith('@js-modules/')) {
    continue;
  }

  const packageDir = packageJsonPath.replace(/\/package\.json$/, '');
  if (!existsSync(join(packageDir, 'src'))) {
    ignoreWorkspaces.push(packageDir);
    continue;
  }

  // A library's subpath exports fully define its entry set (main index included).
  const exportEntries = Object.entries(packageJson.exports ?? {});
  if (
    (packageJson.nx?.tags ?? []).includes('type:lib') &&
    exportEntries.some(([key]) => key !== '.')
  ) {
    generatedWorkspaces[packageDir] = {
      entry: exportEntries
        .map(([, value]) =>
          typeof value === 'string' ? value : (value.types ?? value.default),
        )
        .filter((target): target is string => Boolean(target))
        .map(exportTargetToEntry),
      project,
    };
    continue;
  }

  const entry: string[] = [];
  // Deps that are used but sit outside knip's import graph (build commands,
  // `.sol` imports, generated files), scoped to the project type that needs them.
  const ignoreDependencies: string[] = [];
  // React Native platform files live in libraries too, not just the app: metro
  // resolves the `.native` suffix, but knip's resolver can't, so the `src/index`
  // barrel never reaches them.
  if (nativeFiles.some((file) => file.startsWith(`${packageDir}/`))) {
    entry.push(
      `src/index.{${extensionsJsTs}}`,
      `**/*.native.{${extensionsJsTs}}`,
    );
  }

  // Framework entrypoints loaded at runtime, not statically imported. Each case
  // re-lists the package's default entry, since `entry` replaces knip's default.
  switch (getProjectTypeJs(packageDir)) {
    case ProjectTypeJs.nest:
      // NestJS bootstrap plus the TypeORM CLI data source and migrations.
      entry.push(
        `src/main.{${extensionsJsTs}}`,
        `src/**/*.dataSource.{${extensionsJsTs}}`,
        `src/migrations/*.{${extensionsJsTs}}`,
      );
      // The build runs the `nest` CLI (`nest build`), not an import.
      ignoreDependencies.push('@nestjs/cli');
      break;
    case ProjectTypeJs.hardhat:
      // Hardhat deploy scripts and Solidity tests are run, never imported.
      entry.push(
        `src/scripts/deploy.{${extensionsJsTs}}`,
        `**/*.soltest.{${extensionsJsTs}}`,
      );
      // Solidity dependencies are imported in `.sol` files, which knip can't parse.
      ignoreDependencies.push('@openzeppelin/contracts');
      break;
    case ProjectTypeJs.reactNative:
      // React Native polyfills are wired through metro aliases, not imports.
      entry.push(`src/polyfills/*.{${extensionsJsTs}}`);
      // Metro injects `@babel/runtime` helpers, and the gradle plugin + codegen
      // are used by the native Android build — none via a JS import.
      ignoreDependencies.push(
        '@babel/runtime',
        '@react-native/gradle-plugin',
        '@react-native/codegen',
      );
      break;
    case ProjectTypeJs.keycloakify:
      // Keycloakify's generated theme entry: keycloak loads the theme through
      // it, its boilerplate re-exports aren't all consumed, and it's regenerated
      // (never hand-edited), so mark it an entry rather than flag its exports.
      entry.push(`src/kc.gen.{ts,tsx}`);
      break;
    case ProjectTypeJs.cjs:
      // The build bundles with the esbuild CLI (`esbuild src/index.ts`), not an import.
      ignoreDependencies.push('esbuild');
      break;
    case ProjectTypeJs.icons:
      // The generated icon components import these, but that file is a build
      // artifact knip doesn't analyze.
      ignoreDependencies.push('react', '@mui/material', '@types/react');
      break;
  }

  if (entry.length > 0 || ignoreDependencies.length > 0) {
    generatedWorkspaces[packageDir] = {
      project,
      ...(entry.length > 0 && { entry }),
      ...(ignoreDependencies.length > 0 && { ignoreDependencies }),
    };
  }
}

const config: KnipConfig = {
  workspaces: {
    '.': {
      entry: [`*.{${extensionsJsTs}}`, `scripts/**/*.{${extensionsJsTs}}`],
      project: [`scripts/**/*.{${extensionsJsTs}}`],
      // Used outside the import graph, so knip can't trace them: husky hooks
      // (commitlint, lint-staged), nx command strings (cross-env), the
      // jest-config-loader comment (esbuild-register), the lint pipeline (solhint).
      ignoreDependencies: [
        '@commitlint/cli',
        'cross-env',
        'esbuild-register',
        'lint-staged',
        'solhint',
      ],
      // System binaries, not npm packages.
      ignoreBinaries: ['adb', 'diff', 'uv'],
    },
    'packages/**': {
      project,
    },
    ...generatedWorkspaces,
  },
  ignoreWorkspaces,
  ignore: [
    // Build-only type contracts are never imported by design.
    '**/*.assert.ts',
    // Vendored MUI documentation examples, copied verbatim and not edited.
    '**/_docsExamplesCopy-DO-NOT-EDIT/**',
  ],
};

export default config;
