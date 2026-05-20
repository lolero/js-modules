// Pinned to ESLint 9 — eslint-plugin-react doesn't declare ESLint 10 peer
// support yet: https://github.com/jsx-eslint/eslint-plugin-react/issues/3977
// TODO: monitor eslint-plugin-react support for ESLint 10 (see above)
import { readFileSync } from 'fs';
import { join } from 'path';
import pluginHtml from '@html-eslint/eslint-plugin';
import type { Linter } from 'eslint';
import gitignore from 'eslint-config-flat-gitignore';
import configPrettier from 'eslint-config-prettier/flat';
// @ts-expect-error -- no type declarations published
import pluginChaiFriendly from 'eslint-plugin-chai-friendly';
import { flatConfigs as configsImportXPlugin } from 'eslint-plugin-import-x';
import pluginJest from 'eslint-plugin-jest';
import pluginJsdoc from 'eslint-plugin-jsdoc';
// @ts-expect-error -- no type declarations published
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginMocha from 'eslint-plugin-mocha';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginSvelte from 'eslint-plugin-svelte';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import {
  configs as configsTsEslint,
  parser as parserTsEslint,
} from 'typescript-eslint';
import { extensions, Language } from '../common/common.utils';

// The order of EslintConfigType matters!!!
export const EslintConfigType = {
  // commonBefore must be first
  commonBefore: 'commonBefore',
  hardhat: 'hardhat',
  jsdoc: 'jsdoc',
  nest: 'nest',
  react: 'react',
  // keycloakify must go after react (overrides a11y rules)
  keycloakify: 'keycloakify',
  reduxSaga: 'reduxSaga',
  storybook: 'storybook',
  svelte: 'svelte',
  vue: 'vue',
  // commonAfter must follow all framework configs (wins over any typed-rule
  // re-enables)
  commonAfter: 'commonAfter',
  // prettier must be last
  prettier: 'prettier',
} as const;
export type EslintConfigType =
  (typeof EslintConfigType)[keyof typeof EslintConfigType];

// Named alias — avoids TS2742 in packages with moduleResolution: "nodenext".
export type EslintConfigList = Linter.Config[];

export type EslintConfig = {
  buildConfig: (packageDir: string) => EslintConfigList;
  isEnabled: (deps: Set<string>) => boolean;
};

/**
 * Builds an ESLint flat config list for a package.
 * @param packageDir - Absolute path to package directory with `package.json`.
 * @param overridesEnable - Eslint config types to force enable.
 * @returns ESLint flat config array.
 */
export function createEslintConfig(
  packageDir: string,
  overridesEnable: EslintConfigType[] = [],
): EslintConfigList {
  const pkg = JSON.parse(
    readFileSync(join(packageDir, 'package.json'), 'utf-8'),
  ) as {
    name?: string;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
  };

  const depsAll = new Set<string>([
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
    ...Object.keys(pkg.devDependencies ?? {}),
  ]);

  const eslintConfigTypesEnabled = (
    Object.values(EslintConfigType) as EslintConfigType[]
  ).filter(
    (eslintConfigType) =>
      eslintConfigs[eslintConfigType].isEnabled(depsAll) ||
      overridesEnable.includes(eslintConfigType),
  );

  console.log(
    `[eslint] ${pkg.name ?? packageDir}: ${eslintConfigTypesEnabled.join(', ')}`,
  );

  const eslintConfigsEnabled = eslintConfigTypesEnabled.flatMap(
    (eslintConfigType) =>
      eslintConfigs[eslintConfigType].buildConfig(packageDir),
  );
  return eslintConfigsEnabled;
}

const repoRoot = join(__dirname, '../..');
const workspaceYaml = readFileSync(
  join(repoRoot, 'pnpm-workspace.yaml'),
  'utf-8',
);
const reactVersion =
  workspaceYaml.match(/^\s*react:\s*['"]?([\d.]+)/m)?.[1] ?? '';

const extensionsJsTs = [
  ...extensions[Language.typescript],
  ...extensions[Language.javascript],
].join(',');

/**
 * Converts file extensions to a recursive glob pattern, working around the
 * single-extension picomatch edge case.
 * @param exts - File extensions without a leading dot.
 * @returns Glob matching the extensions recursively in any subdirectory.
 */
function extensionsToGlobRecursive(exts: readonly string[]): string {
  // `**/*.{ext}` (single-item braces) does not match in minimatch v3 / picomatch.
  // Use `**/*.ext` for single extensions and `**/*.{a,b}` for multiple.
  return exts.length === 1 ? `**/*.${exts[0]}` : `**/*.{${exts.join(',')}}`;
}

const globs = {
  rootScripts: [`*.{${extensionsJsTs}}`, `scripts/**/*.{${extensionsJsTs}}`],
  tests: [
    `**/*.test.{${extensionsJsTs}}`,
    `**/*.spec.{${extensionsJsTs}}`,
    `**/__tests__/**/*.{${extensionsJsTs}}`,
    `**/__specs__/**/*.{${extensionsJsTs}}`,
  ],
  soltests: [
    `**/*.soltest.{${extensionsJsTs}}`,
    `**/__soltests__/**/*.{${extensionsJsTs}}`,
  ],
};

const eslintConfigs: Record<EslintConfigType, EslintConfig> = {
  [EslintConfigType.commonBefore]: {
    isEnabled: () => true,
    buildConfig: (packageDir) => [
      // .gitignore
      gitignore({
        cwd: repoRoot,
        root: true,
        recursive: true,
      }),

      // TypeScript
      ...configsTsEslint.recommended,
      // Type-aware rules (no-floating-promises, no-unsafe-*, etc.) — slower and
      // noisier, but catches real bugs. Requires `parserOptions.projectService`
      // (already wired below for TS files).
      // https://typescript-eslint.io/getting-started/typed-linting
      ...configsTsEslint.recommendedTypeChecked,

      // Import
      configsImportXPlugin.recommended,
      configsImportXPlugin.typescript,

      // Jest (scoped to test files)
      {
        ...pluginJest.configs['flat/recommended'],
        files: globs.tests,
      },
      {
        ...pluginJest.configs['flat/style'],
        files: globs.tests,
      },

      // HTML (scoped to html files) — https://html-eslint.org/docs/getting-started
      {
        ...pluginHtml.configs['flat/recommended'],
        files: [extensionsToGlobRecursive(extensions[Language.html])],
      },

      // Settings
      {
        settings: {
          'import-x/resolver': {
            // When packageDir === repoRoot the eslint.config.ts is shared by
            // both the root package (CWD = repoRoot) and 'root' Nx projects
            // like root-scripts (CWD = scripts/) and root-docs (CWD = docs/)
            // 'root' Nx projects' CWDs have no local tsconfig.json, so
            // CWD-relative path fails
            // packages have their own tsconfig.json, so CWD-relative path works
            typescript: {
              project:
                packageDir === repoRoot
                  ? // 'root' nx projects point to the root tsconfig
                    join(repoRoot, 'tsconfig.json')
                  : // packages nx projects point to their own tsconfig
                    'tsconfig.json',
            },
          },
        },
      },

      // Typed linting (TS files only — `projectService` auto-discovers the
      // nearest tsconfig per file, which plays nicely with per-package
      // tsconfigs). `allowDefaultProject` routes eslint.config.ts and
      // jest.config.ts to the root tsconfig — the ESLint CLI only loads the
      // package tsconfig, so these files are invisible to the project
      // service without it.
      {
        files: [extensionsToGlobRecursive(extensions[Language.typescript])],
        languageOptions: {
          parserOptions: {
            projectService: {
              allowDefaultProject: [
                // root tsconfig already covers eslint.config.ts but packages
                // only include src
                ...(packageDir !== repoRoot ? ['eslint.config.ts'] : []),
                'jest.config.ts',
                // Covers flat package-local scripts/ dirs. Recursive globs
                // (`scripts/**/*.ts`) are disallowed by allowDefaultProject.
                // Packages needing scripts subdirectories should add a
                // tsconfig.json inside their scripts/ dir instead (auto-
                // discovered by the project service). Could be unified at the
                // root tsconfig.json include once TypeScript supports
                // extending includes with `${configDir}`.
                // https://github.com/microsoft/TypeScript/issues/56436
                // TODO: monitor ${configDir} support (see above)
                'scripts/*.ts',
              ],
              defaultProject: join(repoRoot, 'tsconfig.json'),
            },
          },
        },
      },

      {
        rules: {
          eqeqeq: ['error', 'always'],
          curly: ['error', 'all'],
          '@typescript-eslint/no-unused-vars': [
            'error',
            { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
          ],
          // import type vs import for type-only imports. Reduces bundle size.
          // https://typescript-eslint.io/rules/consistent-type-imports
          '@typescript-eslint/consistent-type-imports': 'error',
          // Collapse `import { type X, type Y }` into `import type { X, Y }`.
          // Reduces bundle size.
          // https://typescript-eslint.io/rules/no-import-type-side-effects
          '@typescript-eslint/no-import-type-side-effects': 'error',
          // Syntax-only rule (no type info required); TS-aware version avoids
          // false positives on enum + type/value same-name pairs.
          // https://typescript-eslint.io/rules/no-shadow
          '@typescript-eslint/no-shadow': 'error',
          // Disable the base rule so it can't double-report if a future preset
          // turns it on. https://typescript-eslint.io/rules/#extension-rules
          'no-shadow': 'off',
          'import-x/no-cycle': 'error',
          'import-x/no-extraneous-dependencies': 'error',
          'import-x/no-relative-packages': 'error',
          'import-x/order': [
            'error',
            {
              groups: [
                'builtin',
                'external',
                'internal',
                'parent',
                'sibling',
                'index',
              ],
              pathGroups: [
                {
                  pattern: '@js-modules/**',
                  group: 'external',
                  position: 'after',
                },
              ],
              pathGroupsExcludedImportTypes: ['builtin'],
              'newlines-between': 'never',
              alphabetize: { order: 'asc', caseInsensitive: true },
            },
          ],
          'no-alert': 'warn',
          'no-console': 'warn',
          'no-debugger': 'error',
          'no-nested-ternary': 'error',
          'sort-imports': [
            'error',
            {
              ignoreDeclarationSort: true,
              ignoreCase: true,
              ignoreMemberSort: false,
            },
          ],
        },
      },

      {
        files: [extensionsToGlobRecursive(extensions[Language.html])],
        // Formatting rules — owned by prettier; eslint-config-prettier does not
        // disable `@html-eslint/*` rules, so disable them explicitly here.
        rules: {
          '@html-eslint/attrs-newline': 'off',
          '@html-eslint/element-newline': 'off',
          '@html-eslint/indent': 'off',
          '@html-eslint/no-extra-spacing-attrs': 'off',
          '@html-eslint/no-extra-spacing-tags': 'off',
          '@html-eslint/no-trailing-spaces': 'off',
          '@html-eslint/quotes': 'off',
          '@html-eslint/require-closing-tags': 'off',
        },
      },
    ],
  },

  [EslintConfigType.commonAfter]: {
    isEnabled: () => true,
    buildConfig: (packageDir: string): Linter.Config[] => [
      {
        files: ['*.js'],
        rules: {
          '@typescript-eslint/no-require-imports': 'off',
        },
      },

      {
        files: globs.rootScripts,
        rules: {
          'no-console': 'off',
          'import-x/no-extraneous-dependencies': [
            'error',
            {
              devDependencies: true,
            },
          ],
        },
      },

      {
        files: [...globs.tests],
        rules: {
          // https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-extraneous-dependencies.md
          'import-x/no-extraneous-dependencies': [
            'error',
            {
              packageDir: [repoRoot, packageDir],
              devDependencies: true,
            },
          ],
          // Enforce @jest/globals imports for all categories except 'jest'.
          // jest.mock/requireActual/requireMock must stay as bare globals for
          // @swc/jest hoisting to work (see scripts/jest/jest.configs.ts).
          // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-importing-jest-globals.md
          'jest/prefer-importing-jest-globals': [
            'error',
            { types: ['hook', 'describe', 'test', 'expect', 'unknown'] },
          ],
        },
      },

      {
        files: ['**/eslint.config.ts', '**/jest.config.ts'],
        rules: {
          // Override for eslint & jest config files
          // `packageDir: [repoRoot]` -> pins the lookup to the root package.json so
          // hoisted root-only dev tooling (e.g. `@swc/jest`, eslint
          // plugins) resolves when imported from a package-local config file
          // These two config files should stick to root-level tooling:
          // imports in config files are checked against the root only. A
          // package-local dep (e.g. a package's own `lodash`) imported from
          // its config file would be flagged as extraneous.
          'import-x/no-extraneous-dependencies': [
            'error',
            {
              packageDir: [repoRoot],
              devDependencies: true,
            },
          ],
          'import-x/no-relative-packages': 'off',
        },
      },

      // Disable type-checked rules for files with no (or partial) TS program
      // coverage: plain JS, and framework SFCs where type-aware rules on the
      // whole file produce false positives or crashes. Placed after all
      // framework configs so it wins over any typed-rule re-enables they apply.
      // https://typescript-eslint.io/getting-started/typed-linting
      {
        ...configsTsEslint.disableTypeChecked,
        files: [
          extensionsToGlobRecursive([
            ...extensions[Language.html],
            ...extensions[Language.javascript],
            ...extensions[Language.svelte],
            ...extensions[Language.vue],
          ]),
        ],
      },

      // disableTypeChecked only covers rules from recommendedTypeChecked.
      // consistent-type-imports and no-import-type-side-effects are manually
      // added in the global rules block and also require type info, so they
      // need an explicit off for any file whose parser doesn't forward
      // parserOptions.project (HTML, Svelte, Vue).
      {
        files: [
          extensionsToGlobRecursive([
            ...extensions[Language.html],
            ...extensions[Language.svelte],
            ...extensions[Language.vue],
          ]),
        ],
        rules: {
          '@typescript-eslint/consistent-type-imports': 'off',
          '@typescript-eslint/no-import-type-side-effects': 'off',
        },
      },
    ],
  },

  [EslintConfigType.hardhat]: {
    isEnabled: (deps) => deps.has('hardhat'),
    buildConfig: (packageDir) => [
      {
        ...pluginMocha.configs.recommended,
        files: globs.soltests,
      },

      {
        ...(
          pluginChaiFriendly as unknown as {
            configs: { recommendedFlat: Linter.Config };
          }
        ).configs.recommendedFlat,
        files: globs.soltests,
      },

      {
        files: globs.soltests,
        rules: {
          'import-x/no-extraneous-dependencies': [
            'error',
            {
              packageDir: [repoRoot, packageDir],
              devDependencies: true,
            },
          ],
          'jest/valid-expect': 'off',
        },
      },

      {
        files: ['**/hardhat.config.ts'],
        rules: {
          'import-x/no-extraneous-dependencies': [
            'error',
            {
              packageDir: [repoRoot, packageDir],
              devDependencies: true,
            },
          ],
        },
      },
    ],
  },

  [EslintConfigType.jsdoc]: {
    isEnabled: () => false, // opt-in only via createEslintConfig overrides
    buildConfig: () => [
      pluginJsdoc.configs['flat/recommended-typescript'],
      {
        rules: {
          // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-types.md
          'jsdoc/no-types': 'error',
          // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/tag-lines.md
          'jsdoc/tag-lines': ['error', 'never', { startLines: 0 }],
          // TypeScript generator return types already encode yield types.
          // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-yields.md
          'jsdoc/require-yields': 'off',
          // Allow jest.config.ts loader directives alongside standard JSDoc tags.
          // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-tag-names.md
          'jsdoc/check-tag-names': [
            'error',
            { definedTags: ['jest-config-loader'] },
          ],
        },
      },
    ],
  },

  // Must follow react — (overrides a11y rules)
  [EslintConfigType.keycloakify]: {
    isEnabled: (deps) => deps.has('keycloakify'),
    buildConfig: () => [
      {
        ignores: ['public/keycloakify-dev-resources/**'],
      },

      {
        rules: {
          'jsx-a11y/anchor-is-valid': [
            'error',
            // All options at
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md#rule-options
            // except for noHref
            // - omit invalidHref because keycloakify templates use `href="#"`
            // with onClick handlers for JS-driven form submission
            // - omit preferButton because keycloakify templates style `<a>` as
            // action triggers by convention
            { aspects: ['noHref'] },
          ],
          'jsx-a11y/no-autofocus': 'off',
          'jsx-a11y/tabindex-no-positive': 'off',
        },
      },
    ],
  },

  [EslintConfigType.nest]: {
    isEnabled: (deps) => [...deps].some((k) => k.startsWith('@nestjs/')),
    buildConfig: () => [
      {
        rules: {
          'class-methods-use-this': 'off',
          'no-param-reassign': 'off',
          'no-useless-constructor': 'off',
        },
      },
    ],
  },

  // Must be last — disables formatting rules that framework configs would
  // otherwise re-enable. https://github.com/prettier/eslint-config-prettier#installation
  [EslintConfigType.prettier]: {
    isEnabled: () => true,
    buildConfig: () => [configPrettier],
  },

  [EslintConfigType.react]: {
    isEnabled: (deps) => deps.has('react'),
    buildConfig: () => [
      pluginReact.configs.flat.recommended,
      pluginReact.configs.flat['jsx-runtime'],
      pluginReactHooks.configs.flat['recommended-latest'],
      (pluginJsxA11y as { flatConfigs: { recommended: Linter.Config } })
        .flatConfigs.recommended,

      {
        settings: {
          react: { version: reactVersion },
        },
      },

      {
        // React Compiler rules are irrelevant without the react compiler plugin
        rules: { 'react-hooks/incompatible-library': 'off' },
      },
    ],
  },

  [EslintConfigType.reduxSaga]: {
    isEnabled: (deps) => deps.has('redux-saga') || deps.has('typed-redux-saga'),
    buildConfig: () => [
      {
        // redux-saga [context, method] call pattern — middleware handles binding
        // https://redux-saga.js.org/docs/api/#callcontextfnargs
        files: [extensionsToGlobRecursive(['sagas.ts', 'sagas.utils.ts'])],
        rules: {
          '@typescript-eslint/unbound-method': 'off',
        },
      },
    ],
  },

  [EslintConfigType.storybook]: {
    isEnabled: (deps) =>
      deps.has('storybook') ||
      [...deps].some((dep) => dep.startsWith('@storybook/')),
    buildConfig: (): Linter.Config[] => [
      {
        files: ['**/.storybook/**', `**/*.stories.{${extensionsJsTs}}`],
        rules: {
          'import-x/no-extraneous-dependencies': [
            'error',
            {
              devDependencies: true,
            },
          ],
        },
      },
    ],
  },

  [EslintConfigType.svelte]: {
    isEnabled: (deps) => deps.has('svelte'),
    buildConfig: () => [
      ...pluginSvelte.configs['flat/recommended'],

      {
        files: [extensionsToGlobRecursive(extensions[Language.svelte])],
        languageOptions: {
          parserOptions: {
            parser: parserTsEslint,
          },
          globals: { ...globals.browser },
        },
      },

      {
        files: [
          extensionsToGlobRecursive([
            ...extensions[Language.typescript],
            ...extensions[Language.svelte],
          ]),
        ],
        rules: {
          // SvelteKit apps bundle everything, so `svelte` and `@sveltejs/*` live in
          // devDependencies by template convention
          // https://kit.svelte.dev/docs/project-structure
          'import-x/no-extraneous-dependencies': [
            'error',
            { devDependencies: true },
          ],
          // SvelteKit virtual modules (`$app/*`, `$env/*`, `$service-worker`) are
          // generated by `svelte-kit sync` and aren't resolvable as regular files.
          // https://svelte.dev/docs/kit/$app-navigation
          'import-x/no-unresolved': [
            'error',
            { ignore: ['^\\$app/', '^\\$env/', '^\\$service-worker$'] },
          ],
        },
      },
    ],
  },

  // https://eslint.vuejs.org/user-guide/#usage
  [EslintConfigType.vue]: {
    isEnabled: (deps) => deps.has('vue'),
    buildConfig: () => [
      ...pluginVue.configs['flat/recommended'],

      {
        files: [extensionsToGlobRecursive(extensions[Language.vue])],
        languageOptions: {
          parserOptions: {
            parser: parserTsEslint,
            extraFileExtensions: ['.vue'],
          },
          globals: { ...globals.browser },
        },
      },
    ],
  },
};
