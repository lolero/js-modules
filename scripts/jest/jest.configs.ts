// TODO: @swc/jest does not hoist jest.mock() when `jest` is imported from
//  @jest/globals — it transforms the call to `_globals.jest.mock()`, which
//  runs after module requires and breaks mocks.
//  Track: https://github.com/swc-project/swc/issues/10325
//    → Look for a comment or PR saying "@jest/globals imports are now hoisted"
//      or that jest.mock() hoisting no longer depends on the identifier being
//      an unbound global. The sibling issue
//      https://github.com/swc-project/jest/issues/120 was closed as
//      not-planned; the fix (if it comes) will land in swc core instead.
//  Workaround in spec files: import `jest as jestGlobals` from @jest/globals
//  for typed mock utilities (mocked, spyOn, resetAllMocks, etc.), and use the
//  bare global `jest` only for jest.mock() calls at module scope (requires
//  "jest" in tsconfig.json compilerOptions.types for the global to type-check).
//  When fixed, confirm by adding `import { jest } from '@jest/globals'` to any
//  spec file that has jest.mock() and running its tests — if mocks resolve
//  correctly, the fix is live. Then clean up:
//    1. In all spec files: change `jest as jestGlobals` → `jest`, rename all
//       `jestGlobals.` → `jest.`
//    2. Remove "jest" from tsconfig.json compilerOptions.types
//    3. Remove @types/jest from root devDependencies
//    4. In scripts/eslint.configs.ts: simplify
//    `jest/prefer-importing-jest-globals` from `{ types: ['hook',
//    'describe', 'test', 'expect', 'unknown'] }` to just `'error'`
import { readFileSync } from 'fs';
import { join } from 'path';
import type { Config } from 'jest';
import { extensions, Language } from '../common/common.utils';

export const JestConfigType = {
  common: 'common',
  react: 'react',
  reactNative: 'reactNative',
} as const;
export type JestConfigType =
  (typeof JestConfigType)[keyof typeof JestConfigType];

export type JestConfig = {
  buildConfig: (packageDir: string) => Config;
  isEnabled: (deps: Set<string>) => boolean;
};

/**
 * Builds a Jest config for a package.
 * @param packageDir - Absolute path to package directory with `package.json`.
 * @param overridesEnable - Jest config types to force enable.
 * @returns Jest merged config.
 */
export function createJestConfig(
  packageDir: string,
  overridesEnable: JestConfigType[] = [],
): Config {
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

  const jestConfigTypesEnabled = (
    Object.values(JestConfigType) as JestConfigType[]
  ).filter(
    (jestConfigType) =>
      jestConfigs[jestConfigType].isEnabled(depsAll) ||
      overridesEnable.includes(jestConfigType),
  );

  console.log(
    `[jest] ${pkg.name ?? packageDir}: ${jestConfigTypesEnabled.join(', ')}`,
  );

  const jestConfigEnabled = Object.assign(
    {},
    ...jestConfigTypesEnabled.map((jestConfigType) =>
      jestConfigs[jestConfigType].buildConfig(packageDir),
    ),
  ) as Config;
  return jestConfigEnabled;
}

const extensionsJest = [
  ...extensions[Language.javascript],
  ...extensions[Language.typescript],
];
const extensionsJestStr = extensionsJest.join(',');
const extensionsJestRegex = `\\.(${extensionsJest.join('|')})$`;

const jestConfigs: Record<JestConfigType, JestConfig> = {
  [JestConfigType.common]: {
    isEnabled: () => true,
    buildConfig: () => ({
      transform: {
        [extensionsJestRegex]: [
          '@swc/jest',
          {
            jsc: {
              loose: true,
              parser: {
                syntax: 'typescript',
                tsx: true,
                decorators: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                },
                legacyDecorator: true,
                decoratorMetadata: true,
              },
            },
            module: {
              type: 'commonjs',
            },
          },
        ],
      },
      testMatch: [
        `<rootDir>/src/**/*.{test,spec}.{${extensionsJestStr}}`,
        `<rootDir>/src/**/__{tests,specs}__/**/*.{${extensionsJestStr}}`,
      ],
      // `*-DO-NOT-EDIT` are generated copies (e.g. MUI doc examples that ship
      // their own Vitest tests); they are not run under this repo's Jest.
      testPathIgnorePatterns: ['/node_modules/', '-DO-NOT-EDIT'],
      collectCoverageFrom: [
        `<rootDir>/src/**/*.{${extensionsJestStr}}`,
        '!<rootDir>/node_modules/**',
        '!<rootDir>/build/**',
        '!<rootDir>/src/*',
        `!<rootDir>/src/**/*constants.{${extensionsJestStr}}`,
        `!<rootDir>/src/**/*context.{${extensionsJestStr}}`,
        `!<rootDir>/src/**/*exports.{${extensionsJestStr}}`,
        `!<rootDir>/src/**/*routes.{${extensionsJestStr}}`,
        `!<rootDir>/src/**/*types.{${extensionsJestStr}}`,
      ],
      coverageReporters: ['html', 'text'],
    }),
  },

  [JestConfigType.react]: {
    isEnabled: (deps) => deps.has('react') && !deps.has('react-native'),
    buildConfig: () => ({
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: [join(__dirname, 'jest.setup-react.ts')],
    }),
  },

  [JestConfigType.reactNative]: {
    isEnabled: (deps) => deps.has('react-native'),
    buildConfig: () => ({
      preset: '@react-native/jest-preset',
    }),
  },
};
