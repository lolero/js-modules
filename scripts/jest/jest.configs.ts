// WATCH: swc-jest-mock-hoisting
// Spec files use the bare global `jest` for jest.mock() at module scope (hence
// "jest" in tsconfig.json compilerOptions.types) and `jest as jestGlobals` for
// typed utilities (mocked, spyOn, resetAllMocks).
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
