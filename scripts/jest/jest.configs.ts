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
    peerDependenciesMeta?: Record<string, { optional?: boolean }>;
  };

  // An optional peer means "works with X if you have it", not "is an X", and the
  // question here is which environment the tests actually need. Subtracted from
  // the whole set, not just the peer bucket: this repo mirrors every peer into
  // devDependencies so libs build standalone, so filtering peers alone leaves the
  // name behind. `common-utils-general` declares `react-native` optionally so RN
  // consumers resolve its source but has no RN code — counting it would hand a
  // plain utils package the RN jest preset, whose ESM setup file jest can't parse.
  // Deliberately unlike `scripts/eslint/eslint.configs.ts`, which does count
  // optional peers: lint cares about code paths you might exercise, tests about
  // the environment you require.
  const peerDependenciesOptional = new Set(
    Object.entries(pkg.peerDependenciesMeta ?? {})
      .filter(([, meta]) => meta.optional)
      .map(([dep]) => dep),
  );

  const depsAll = new Set<string>(
    [
      ...Object.keys(pkg.dependencies ?? {}),
      ...Object.keys(pkg.peerDependencies ?? {}),
      ...Object.keys(pkg.devDependencies ?? {}),
    ].filter((dep) => !peerDependenciesOptional.has(dep)),
  );

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

const transformSwc: [string, Record<string, unknown>] = [
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
];

const jestConfigs: Record<JestConfigType, JestConfig> = {
  [JestConfigType.common]: {
    isEnabled: () => true,
    buildConfig: () => ({
      transform: {
        [extensionsJestRegex]: transformSwc,
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
      // The preset's own pattern assumes a flat layout
      // (`node_modules/(?!((jest-)?react-native|@react-native(-community)?)/)`),
      // so under pnpm it matches at the `.pnpm/` segment and leaves the RN
      // packages untransformed — their ESM then fails to parse. Match on package
      // identity anywhere in the path instead, which survives
      // `node_modules/.pnpm/@react-native+jest-preset@x.y.z/node_modules/@react-native/...`.
      transformIgnorePatterns: [
        'node_modules/(?!.*(?:@react-native|react-native))',
      ],
      // Two transformers, and the order matters — Jest uses the first pattern
      // that matches. React Native ships **Flow**-typed JS (`value(cb: number =>
      // void): TimeoutID`), which swc cannot parse: it supports TypeScript, not
      // Flow. So route `node_modules` through babel with the RN preset, and keep
      // swc for our own sources.
      transform: {
        '[/\\\\]node_modules[/\\\\].+\\.[cm]?[jt]sx?$': [
          'babel-jest',
          {
            presets: ['module:@react-native/babel-preset'],
            babelrc: false,
            configFile: false,
          },
        ],
        [extensionsJestRegex]: transformSwc,
      },
    }),
  },
};
