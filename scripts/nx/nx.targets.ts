import { existsSync, readdirSync, readFileSync } from 'fs';
import { basename, join, relative } from 'path';
import type { TargetConfiguration } from '@nx/devkit';
import { Language } from '../common/common.utils';
import { LintMode } from './nx.lint-types';

export const TargetModeHardhat = {
  deploy: 'deploy',
} as const;
export type TargetModeHardhat =
  (typeof TargetModeHardhat)[keyof typeof TargetModeHardhat];

export const TargetModeKeycloakify = {
  addStory: 'add-story',
  build: 'build',
  ejectPage: 'eject-page',
  storybook: 'storybook',
} as const;
export type TargetModeKeycloakify =
  (typeof TargetModeKeycloakify)[keyof typeof TargetModeKeycloakify];

export const TargetModeReactNative = {
  metroStart: 'metro:start',
  metroStartCLean: 'metro:start-clean',
  metroStartCleanDeep: 'metro:start-clean-deep',
  metroExit: 'metro:exit',
  androidEmulatorList: 'android:emulator-list',
  androidEmulatorStart: 'android:emulator-start',
  androidEmulatorStartClean: 'android:emulator-start-clean',
  androidEmulatorReversePortFwd: 'android:emulator-reverse-port-fwd',
  androidEmulatorExit: 'android:emulator-exit',
  androidEmulatorCertificatePush: 'android:emulator-certificate-push',
  androidEmulatorCertificateDelete: 'android:emulator-certificate-delete',
  androidEmulatorAppClean: 'android:emulator-app-clean',
  androidEmulatorAppCleanDeep: 'android:emulator-app-clean-deep',
  androidEmulatorAppInstall: 'android:emulator-app-install',
  androidEmulatorAppRun: 'android:emulator-app-run',
  androidEmulatorAppExit: 'android:emulator-app-exit',
  androidEmulatorAppUninstall: 'android:emulator-app-uninstall',
  androidEmulatorAppRestart: 'android:emulator-app-restart',
  androidEmulatorAppRestartClean: 'android:emulator-app-restart-clean',
  androidEmulatorAppRestartCleanDeep: 'android:emulator-app-restart-clean-deep',
  androidEmulatorAppReinstallClean: 'android:emulator-app-reinstall-clean',
  androidEmulatorAppReinstallCleanDeep:
    'android:emulator-app-reinstall-clean-deep',
  iosEmulatorRunApp: 'ios:emulator-run-app',
} as const;
export type TargetModeReactNative =
  (typeof TargetModeReactNative)[keyof typeof TargetModeReactNative];

export const TargetModeNest = {
  prod: 'prod',
  typeorm: 'typeorm',
} as const;
export type TargetModeNest =
  (typeof TargetModeNest)[keyof typeof TargetModeNest];

export const TargetModeNext = {
  start: 'start',
} as const;
export type TargetModeNext =
  (typeof TargetModeNext)[keyof typeof TargetModeNext];

export const TargetModeTest = {
  watch: 'watch',
  coverage: 'coverage',
  gasStats: 'gas-stats',
  health: 'health',
} as const;
export type TargetModeTest =
  (typeof TargetModeTest)[keyof typeof TargetModeTest];

export const TargetModeVite = {
  preview: 'preview',
} as const;
export type TargetModeVite =
  (typeof TargetModeVite)[keyof typeof TargetModeVite];

/**
 * Creates an Nx target configuration that runs a command in a given directory.
 * @param command - Shell command string.
 * @param cwd - cwd for the command, relative to the workspace root.
 * @returns Nx TargetConfiguration using the `nx:run-commands` executor.
 */
function buildTargetConfiguration(
  command: string,
  cwd: string,
): TargetConfiguration {
  return {
    executor: 'nx:run-commands',
    options: { command, cwd },
  };
}

export const TargetType = {
  build: 'build',
  dev: 'dev',
  hardhat: 'hardhat',
  keycloakify: 'keycloakify',
  lint: 'lint',
  nest: 'nest',
  next: 'next',
  reactNative: 'react-native',
  test: 'test',
  types: 'types',
  vite: 'vite',
} as const;
export type TargetType = (typeof TargetType)[keyof typeof TargetType];

export type TargetBuilder = (
  projectPathRel: string,
) => Record<string, TargetConfiguration>;

export type TargetBuilders = {
  [TargetType.build]: Record<typeof Language.javascript, TargetBuilder>;
  [TargetType.dev]: Record<typeof Language.javascript, TargetBuilder>;
  [TargetType.hardhat]: Record<typeof Language.javascript, TargetBuilder>;
  [TargetType.keycloakify]: Record<typeof Language.javascript, TargetBuilder>;
  [TargetType.lint]: TargetBuilder;
  [TargetType.nest]: Record<typeof Language.javascript, TargetBuilder>;
  [TargetType.next]: Record<typeof Language.javascript, TargetBuilder>;
  [TargetType.reactNative]: Record<typeof Language.javascript, TargetBuilder>;
  [TargetType.test]: Record<
    typeof Language.javascript | typeof Language.python,
    TargetBuilder
  >;
  [TargetType.types]: Record<typeof Language.javascript, TargetBuilder>;
  [TargetType.vite]: Record<typeof Language.javascript, TargetBuilder>;
};

export const ProjectTypeJs = {
  cjs: 'cjs',
  hardhat: 'hardhat',
  icons: 'icons',
  keycloakify: 'keycloakify',
  nest: 'nest',
  next: 'next',
  reactNative: 'react-native',
  vite: 'vite',
} as const;
export type ProjectTypeJs = (typeof ProjectTypeJs)[keyof typeof ProjectTypeJs];

/**
 * Detects the JS project type from a project's files and dependencies.
 * @param projectPathRel - Project path relative to the workspace root.
 * @returns The detected `ProjectTypeJs`, or `undefined` for standard libraries.
 */
export function getProjectTypeJs(
  projectPathRel: string,
): ProjectTypeJs | undefined {
  if (basename(projectPathRel).endsWith('-cjs')) {
    return ProjectTypeJs.cjs;
  }

  if (existsSync(join(projectPathRel, 'hardhat.config.ts'))) {
    return ProjectTypeJs.hardhat;
  }

  const assetsDir = join(projectPathRel, 'src/assets');
  if (
    basename(projectPathRel).endsWith('-icons') &&
    existsSync(assetsDir) &&
    readdirSync(assetsDir).some((file) => file.endsWith('.svg'))
  ) {
    return ProjectTypeJs.icons;
  }

  const { dependencies } = JSON.parse(
    readFileSync(join(projectPathRel, 'package.json'), 'utf-8'),
  ) as { dependencies?: Record<string, string> };

  if (dependencies?.['keycloakify']) {
    return ProjectTypeJs.keycloakify;
  }

  if (existsSync(join(projectPathRel, 'nest-cli.json'))) {
    return ProjectTypeJs.nest;
  }

  if (
    [
      'next.config.ts',
      'next.config.js',
      'next.config.mts',
      'next.config.mjs',
    ].some((file) => existsSync(join(projectPathRel, file)))
  ) {
    return ProjectTypeJs.next;
  }

  if (existsSync(join(projectPathRel, 'metro.config.js'))) {
    return ProjectTypeJs.reactNative;
  }

  if (
    ['vite.config.ts', 'vite.config.js', 'vite.config.mts'].some((file) =>
      existsSync(join(projectPathRel, file)),
    )
  ) {
    return ProjectTypeJs.vite;
  }

  return undefined;
}

export const ProjectTypeJsTest = {
  hardhat: 'hardhat',
  jest: 'jest',
} as const;
export type ProjectTypeJsTest =
  (typeof ProjectTypeJsTest)[keyof typeof ProjectTypeJsTest];

export const targetBuildersJavascriptTest: Record<
  ProjectTypeJsTest,
  TargetBuilder
> = {
  [ProjectTypeJsTest.hardhat]: (projectPathRel) => ({
    [TargetType.test]: buildTargetConfiguration(
      'pnpm hardhat test',
      projectPathRel,
    ),
    [`${TargetType.test}:${TargetModeTest.coverage}`]: buildTargetConfiguration(
      'pnpm hardhat test --coverage',
      projectPathRel,
    ),
    [`${TargetType.test}:${TargetModeTest.gasStats}`]: buildTargetConfiguration(
      'pnpm hardhat test --gas-stats',
      projectPathRel,
    ),
    [`${TargetType.test}:${TargetModeTest.health}`]: buildTargetConfiguration(
      'pnpm hardhat test --list-files',
      projectPathRel,
    ),
  }),
  [ProjectTypeJsTest.jest]: (projectPathRel) => ({
    [TargetType.test]: buildTargetConfiguration(
      'jest --passWithNoTests',
      projectPathRel,
    ),
    [`${TargetType.test}:${TargetModeTest.coverage}`]: buildTargetConfiguration(
      'jest --passWithNoTests --coverage',
      projectPathRel,
    ),
    [`${TargetType.test}:${TargetModeTest.health}`]: buildTargetConfiguration(
      'jest --listTests',
      projectPathRel,
    ),
    [`${TargetType.test}:${TargetModeTest.watch}`]: buildTargetConfiguration(
      'jest --watch',
      projectPathRel,
    ),
  }),
};

export const targetBuilders: TargetBuilders = {
  [TargetType.build]: {
    [Language.javascript]: (projectPathRel) => {
      const projectType = getProjectTypeJs(projectPathRel);
      const hasTsconfigBuild = existsSync(
        join(projectPathRel, 'tsconfig.build.json'),
      );
      let command: string | undefined;
      switch (projectType) {
        case ProjectTypeJs.cjs:
          command =
            'tsc -p tsconfig.build.json && esbuild src/index.ts --platform=node --bundle --format=cjs --outfile=build/index.js';
          break;
        case ProjectTypeJs.hardhat:
          command = 'pnpm hardhat compile';
          break;
        case ProjectTypeJs.icons: {
          const pathToRoot = relative(projectPathRel, '.') || '.';
          command = `tsx ${join(pathToRoot, 'scripts/nx/nx.react-icons-utils.ts')} && tsc -p tsconfig.build.json && node -e "require('fs').cpSync('src/assets','build/assets', { recursive:true })"`;
          break;
        }
        case ProjectTypeJs.nest:
          command = 'nest build -p tsconfig.build.json';
          break;
        case ProjectTypeJs.next:
          command = 'next build';
          break;
        case ProjectTypeJs.reactNative:
          command = "echo 'Building dependency packages...'";
          break;
        // Necessary fallthrough so keycloakify projects get vite build command
        case ProjectTypeJs.keycloakify:
        case ProjectTypeJs.vite: {
          command = hasTsconfigBuild
            ? 'tsc -p tsconfig.build.json --noEmit && vite build'
            : 'vite build';
          break;
        }
        default:
          if (hasTsconfigBuild) {
            command = 'tsc -p tsconfig.build.json';
          }
      }

      if (command === undefined) {
        return {};
      }

      return {
        [`${TargetType.build}`]: buildTargetConfiguration(
          command,
          projectPathRel,
        ),
      };
    },
  },
  [TargetType.dev]: {
    [Language.javascript]: (projectPathRel) => {
      const projectType = getProjectTypeJs(projectPathRel);
      let command: string;
      switch (projectType) {
        case ProjectTypeJs.hardhat:
          command = 'pnpm hardhat node';
          break;
        case ProjectTypeJs.nest: {
          command = `cross-env NODE_ENV=development NODE_TLS_REJECT_UNAUTHORIZED=0 nest start --watch`;
          break;
        }
        case ProjectTypeJs.next:
          command = 'next dev';
          break;
        // Necessary fallthrough so keycloakify projects get vite dev command
        case ProjectTypeJs.keycloakify:
        case ProjectTypeJs.vite:
          command = 'vite';
          break;
        default:
          return {};
      }
      return {
        [`${TargetType.dev}`]: {
          ...buildTargetConfiguration(command, projectPathRel),
          ...(projectType === ProjectTypeJs.nest && {
            dependsOn: [TargetType.build],
          }),
        },
      };
    },
  },
  [TargetType.hardhat]: {
    [Language.javascript]: (projectPathRel) => {
      if (getProjectTypeJs(projectPathRel) !== ProjectTypeJs.hardhat) {
        return {};
      }
      return {
        [`${TargetType.hardhat}:${TargetModeHardhat.deploy}`]:
          buildTargetConfiguration(
            'pnpm hardhat run ./src/scripts/deploy.ts --network localhost',
            projectPathRel,
          ),
      };
    },
  },
  [TargetType.keycloakify]: {
    [Language.javascript]: (projectPathRel) => {
      if (getProjectTypeJs(projectPathRel) !== ProjectTypeJs.keycloakify) {
        return {};
      }
      return {
        [`${TargetType.keycloakify}:${TargetModeKeycloakify.addStory}`]:
          buildTargetConfiguration('keycloakify add-story', projectPathRel),
        [`${TargetType.keycloakify}:${TargetModeKeycloakify.build}`]:
          buildTargetConfiguration('keycloakify build', projectPathRel),
        [`${TargetType.keycloakify}:${TargetModeKeycloakify.ejectPage}`]:
          buildTargetConfiguration('keycloakify eject-page', projectPathRel),
        [`${TargetType.keycloakify}:${TargetModeKeycloakify.storybook}`]:
          buildTargetConfiguration('storybook dev -p 5182', projectPathRel),
      };
    },
  },
  [TargetType.nest]: {
    [Language.javascript]: (projectPathRel) => {
      if (getProjectTypeJs(projectPathRel) !== ProjectTypeJs.nest) {
        return {};
      }

      const { nx: nxConfig } = JSON.parse(
        readFileSync(join(projectPathRel, 'package.json'), 'utf-8'),
      ) as {
        nx?: {
          targetParams?: {
            allowUnauthorizedTls?: boolean;
          };
        };
      };
      const targetParams = nxConfig?.targetParams;

      return {
        [`${TargetType.nest}:${TargetModeNest.prod}`]: buildTargetConfiguration(
          `cross-env NODE_ENV=production ${targetParams?.allowUnauthorizedTls ? 'NODE_TLS_REJECT_UNAUTHORIZED=0 ' : ''}node build/main`,
          projectPathRel,
        ),
        [`${TargetType.nest}:${TargetModeNest.typeorm}`]:
          buildTargetConfiguration(
            `cross-env NODE_ENV=development typeorm -d build/config/config.typeorm.dataSource.js`,
            projectPathRel,
          ),
      };
    },
  },
  [TargetType.next]: {
    [Language.javascript]: (projectPathRel) => {
      if (getProjectTypeJs(projectPathRel) !== ProjectTypeJs.next) {
        return {};
      }
      return {
        [`${TargetType.next}:${TargetModeNext.start}`]:
          buildTargetConfiguration('next start', projectPathRel),
      };
    },
  },
  [TargetType.reactNative]: {
    [Language.javascript]: (
      projectPathRel,
    ): Record<string, TargetConfiguration> => {
      if (getProjectTypeJs(projectPathRel) !== ProjectTypeJs.reactNative) {
        return {};
      }

      const { nx: nxConfig } = JSON.parse(
        readFileSync(join(projectPathRel, 'package.json'), 'utf-8'),
      ) as {
        nx?: {
          targetParams?: {
            avd?: string;
            pathCertificate?: string;
          };
        };
      };
      const { avd = 'Medium_Phone', pathCertificate = '' } =
        nxConfig?.targetParams ?? {};
      const bundleId = `com.${basename(projectPathRel)
        .replace(/^apps-/, '')
        .replace(/-/g, '')}`;

      const pathToRoot = relative(projectPathRel, '.') || '.';
      const pathReactNativeScripts = join(pathToRoot, 'scripts/react-native');

      return {
        [`${TargetType.reactNative}:${TargetModeReactNative.metroStart}`]:
          buildTargetConfiguration('react-native start', projectPathRel),
        [`${TargetType.reactNative}:${TargetModeReactNative.metroStartCLean}`]:
          buildTargetConfiguration(
            'react-native start --reset-cache',
            projectPathRel,
          ),
        [`${TargetType.reactNative}:${TargetModeReactNative.metroStartCleanDeep}`]:
          buildTargetConfiguration(
            `tsx ${pathReactNativeScripts}/metro.start-clean-deep.ts`,
            projectPathRel,
          ),
        [`${TargetType.reactNative}:${TargetModeReactNative.metroExit}`]:
          buildTargetConfiguration(
            `tsx ${pathReactNativeScripts}/metro.exit.ts`,
            projectPathRel,
          ),
        [`${TargetType.reactNative}:${TargetModeReactNative.androidEmulatorList}`]:
          buildTargetConfiguration(
            `tsx ${pathReactNativeScripts}/android.emulator-list.ts`,
            projectPathRel,
          ),
        [`${TargetType.reactNative}:${TargetModeReactNative.androidEmulatorStart}`]:
          buildTargetConfiguration(
            `tsx ${pathReactNativeScripts}/android.emulator-start.ts ${avd}`,
            projectPathRel,
          ),
        [`${TargetType.reactNative}:${TargetModeReactNative.androidEmulatorStartClean}`]:
          buildTargetConfiguration(
            `tsx ${pathReactNativeScripts}/android.emulator-start-clean.ts ${avd} ${pathCertificate}`,
            projectPathRel,
          ),
        [`${TargetType.reactNative}:${TargetModeReactNative.androidEmulatorReversePortFwd}`]:
          buildTargetConfiguration(
            'adb reverse tcp:8081 tcp:8081',
            projectPathRel,
          ),
        [`${TargetType.reactNative}:${TargetModeReactNative.androidEmulatorExit}`]:
          buildTargetConfiguration('adb emu kill', projectPathRel),
        [`${TargetType.reactNative}:${TargetModeReactNative.androidEmulatorCertificatePush}`]:
          buildTargetConfiguration(
            `adb push ${pathCertificate} /sdcard/Download/${basename(pathCertificate)}`,
            projectPathRel,
          ),
        [`${TargetType.reactNative}:${TargetModeReactNative.androidEmulatorCertificateDelete}`]:
          buildTargetConfiguration(
            `adb shell "rm -f /sdcard/Download/${basename(pathCertificate)}"`,
            projectPathRel,
          ),
        [`${TargetType.reactNative}:${TargetModeReactNative.androidEmulatorAppClean}`]:
          buildTargetConfiguration(
            `tsx ${pathReactNativeScripts}/android.emulator-app-clean.ts`,
            projectPathRel,
          ),
        [`${TargetType.reactNative}:${TargetModeReactNative.androidEmulatorAppCleanDeep}`]:
          buildTargetConfiguration(
            `tsx ${pathReactNativeScripts}/android.emulator-app-clean.ts && pnpm dlx rimraf android/.cxx android/app/.cxx android/build android/app/build`,
            projectPathRel,
          ),
        [`${TargetType.reactNative}:${TargetModeReactNative.androidEmulatorAppInstall}`]:
          buildTargetConfiguration(
            `tsx ${pathReactNativeScripts}/android.emulator-app-install.ts`,
            projectPathRel,
          ),
        [`${TargetType.reactNative}:${TargetModeReactNative.androidEmulatorAppRun}`]:
          buildTargetConfiguration(
            `adb shell am start -n ${bundleId}/.MainActivity`,
            projectPathRel,
          ),
        [`${TargetType.reactNative}:${TargetModeReactNative.androidEmulatorAppExit}`]:
          buildTargetConfiguration(
            `adb shell am force-stop ${bundleId}`,
            projectPathRel,
          ),
        [`${TargetType.reactNative}:${TargetModeReactNative.androidEmulatorAppUninstall}`]:
          buildTargetConfiguration(`adb uninstall ${bundleId}`, projectPathRel),
        [`${TargetType.reactNative}:${TargetModeReactNative.androidEmulatorAppRestart}`]:
          buildTargetConfiguration(
            `tsx ${pathReactNativeScripts}/android.emulator-app-restart.ts`,
            projectPathRel,
          ),
        [`${TargetType.reactNative}:${TargetModeReactNative.androidEmulatorAppRestartClean}`]:
          buildTargetConfiguration(
            `tsx ${pathReactNativeScripts}/android.emulator-app-restart-clean.ts`,
            projectPathRel,
          ),
        [`${TargetType.reactNative}:${TargetModeReactNative.androidEmulatorAppRestartCleanDeep}`]:
          buildTargetConfiguration(
            `tsx ${pathReactNativeScripts}/android.emulator-app-restart-clean-deep.ts`,
            projectPathRel,
          ),
        [`${TargetType.reactNative}:${TargetModeReactNative.androidEmulatorAppReinstallClean}`]:
          buildTargetConfiguration(
            `tsx ${pathReactNativeScripts}/android.emulator-app-reinstall-clean.ts`,
            projectPathRel,
          ),
        [`${TargetType.reactNative}:${TargetModeReactNative.androidEmulatorAppReinstallCleanDeep}`]:
          buildTargetConfiguration(
            `tsx ${pathReactNativeScripts}/android.emulator-app-reinstall-clean-deep.ts`,
            projectPathRel,
          ),
        [`${TargetType.reactNative}:${TargetModeReactNative.iosEmulatorRunApp}`]:
          buildTargetConfiguration('react-native run-ios', projectPathRel),
      };
    },
  },
  [TargetType.lint]: (projectPathRel) => {
    // Every linter runs inside a single tsx process so we pay the startup
    // cost once per project. The per-linter logic lives in nx.lint-utils.
    const pathToRoot = relative(projectPathRel, '.') || '.';
    const script = `tsx ${join(pathToRoot, 'scripts/nx/nx.lint-cli.ts')}`;
    return Object.fromEntries(
      Object.values(LintMode).map((mode) => [
        `${TargetType.lint}:${mode}`,
        buildTargetConfiguration(`${script} ${mode}`, projectPathRel),
      ]),
    );
  },
  [TargetType.test]: {
    [Language.javascript]: (projectPathRel) => {
      const projectType = getProjectTypeJs(projectPathRel);
      return projectType === ProjectTypeJs.hardhat
        ? targetBuildersJavascriptTest[ProjectTypeJsTest.hardhat](
            projectPathRel,
          )
        : targetBuildersJavascriptTest[ProjectTypeJsTest.jest](projectPathRel);
    },
    [Language.python]: (projectPathRel) => ({
      [TargetType.test]: buildTargetConfiguration(
        // Exit code 5 means "no tests collected" — treat as success
        'uv run pytest || test $? -eq 5',
        projectPathRel,
      ),
      [`${TargetType.test}:${TargetModeTest.watch}`]: buildTargetConfiguration(
        'uv run pytest-watch',
        projectPathRel,
      ),
      [`${TargetType.test}:${TargetModeTest.coverage}`]:
        buildTargetConfiguration(
          // Exit code 5 means "no tests collected" — treat as success
          'uv run pytest --cov=src --cov-report=html --cov-report=term || test $? -eq 5',
          projectPathRel,
        ),
      [`${TargetType.test}:${TargetModeTest.health}`]: buildTargetConfiguration(
        // Exit code 5 means "no tests collected" — treat as success
        'uv run pytest --collect-only -q || test $? -eq 5',
        projectPathRel,
      ),
    }),
  },
  [TargetType.types]: {
    [Language.javascript]: (projectPathRel) => ({
      [`${TargetType.types}:check`]: buildTargetConfiguration(
        'tsc --noEmit',
        projectPathRel,
      ),
    }),
  },
  [TargetType.vite]: {
    [Language.javascript]: (projectPathRel) => {
      const projectType = getProjectTypeJs(projectPathRel);
      if (
        projectType !== ProjectTypeJs.vite &&
        projectType !== ProjectTypeJs.keycloakify
      ) {
        return {};
      }
      return {
        [`${TargetType.vite}:${TargetModeVite.preview}`]:
          buildTargetConfiguration('vite preview', projectPathRel),
      };
    },
  },
};
