import { execSync, spawnSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import {
  extensions,
  filterFilesByExtensions,
  isExtensionInFiles,
  Language,
  printCommand,
  printHealthCheck,
  runCommand,
  runCommands,
} from '../common/common.utils';
import {
  healthCheckExitCode,
  healthChecksHelpers,
  HealthCheckType,
  isOkToStatus,
} from './nx.lint-health';
import {
  packageJsonCheck,
  packageJsonFix,
  packageJsonHealth,
} from './nx.lint-linters-package-json';
import { LinterName, ScanMode } from './nx.lint-types';
import type { Linter, LintFunction } from './nx.lint-types';

const {
  // prettier doesn't support Python at all (ruff owns it)
  [Language.python]: _extensionsPython,
  // taplo is used for TOML formatting
  [Language.toml]: _extensionsToml,
  ...extensionsPrettier
} = extensions;

export const linterExtensions: Record<LinterName, readonly string[]> = {
  [LinterName.eslint]: [
    ...extensions[Language.javascript],
    ...extensions[Language.typescript],
    ...extensions[Language.svelte],
    ...extensions[Language.vue],
    ...extensions[Language.html],
  ],
  [LinterName.packageJson]: extensions[Language.json],
  [LinterName.prettier]: Object.values(extensionsPrettier).flat(),
  [LinterName.ruff]: extensions[Language.python],
  [LinterName.shellcheck]: extensions[Language.shell],
  [LinterName.solhint]: extensions[Language.solidity],
  [LinterName.taplo]: extensions[Language.toml],
  [LinterName.yamllint]: extensions[Language.yaml],
};

/**
 * Prints a unified diff between the original file and its auto-fixed version.
 * @param fileWithErrorsPath - Path to the original file.
 * @param fileFixed - Fixed file content.
 */
function printFileWithErrorsDiff(
  fileWithErrorsPath: string,
  fileFixed: string,
): void {
  process.stdout.write(`\n=== ${fileWithErrorsPath} ===\n`);
  const diff = spawnSync('diff', ['-u', fileWithErrorsPath, '-'], {
    input: fileFixed,
    encoding: 'utf8',
  }).stdout;
  process.stdout.write(diff);
}

// Diff helpers — invoked from each linter's `check` mode so output shows
// actual line changes, not just a list of flagged files. Only linters whose
// native check mode lacks line-level output need an entry here.
const linterDiffCheck = {
  // prettier's `--check` and `--list-different` only print file paths, not
  // diffs. Re-run prettier per flagged file to capture its formatted output,
  // then diff that against the on-disk file.
  [LinterName.prettier]: (_lintContext, { flags, targets }): 0 | 1 => {
    printCommand('prettier', ['--list-different', ...flags, ...targets]);
    // Inherit stderr so prettier's own errors also get printed
    const spawnSyncReturns = spawnSync(
      'prettier',
      ['--list-different', ...flags, ...targets],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] },
    );
    if (spawnSyncReturns.status === 0) {
      return 0;
    }
    const fileWithErrorsPaths = spawnSyncReturns.stdout
      .split('\n')
      .filter(Boolean);
    for (const fileWithErrorsPath of fileWithErrorsPaths) {
      const fileFixed = spawnSync('prettier', [fileWithErrorsPath], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'inherit'],
      }).stdout;
      printFileWithErrorsDiff(fileWithErrorsPath, fileFixed);
    }
    return 1;
  },
  // taplo's `--check` only prints paths; the installed build doesn't ship
  // `--diff`. Re-format via stdin and compare to the file on disk.
  [LinterName.taplo]: ({ files }, _parts): number => {
    const tomlFiles = filterFilesByExtensions(
      files,
      linterExtensions[LinterName.taplo],
    );
    printCommand('taplo', ['format', '--check', ...tomlFiles]);
    let exitCode = 0;
    for (const filePath of tomlFiles) {
      const fileOriginal = readFileSync(filePath, 'utf8');
      // Inherit stderr so taplo's parse errors also get printed
      const spawnSyncReturns = spawnSync('taplo', ['format', '-'], {
        input: fileOriginal,
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'inherit'],
        // `RUST_LOG=error` silences INFO logs but keeps real errors visible.
        env: { ...process.env, RUST_LOG: 'error' },
      });
      if (spawnSyncReturns.status !== 0) {
        // If parsing fails, print error and skip to next file to avoid a
        // misleading "delete everything" diff.
        exitCode = 1;
        continue;
      }
      const fileFixed = spawnSyncReturns.stdout;
      if (fileFixed !== fileOriginal) {
        printFileWithErrorsDiff(filePath, fileFixed);
        exitCode = 1;
      }
    }
    return exitCode;
  },
} satisfies Partial<Record<LinterName, LintFunction>>;

export const linters = {
  [LinterName.eslint]: {
    isEnabled: (files): boolean =>
      isExtensionInFiles(files, linterExtensions[LinterName.eslint]),
    buildFlags: ({ scanMode }): string[] =>
      scanMode === ScanMode.shallow
        ? ['--no-error-on-unmatched-pattern', '--ignore-pattern', '*/**']
        : ['--no-error-on-unmatched-pattern'],
    buildTargets: (): string[] => ['.'],
    lintFunctions: {
      check: ({ scanMode, files }, { flags }): number => {
        if (scanMode !== ScanMode.files) {
          return runCommand('eslint', [...flags, '.']);
        }
        return runLintFilesEslint(files, (filesEslintProject, cwd) =>
          runCommand('eslint', [...flags, ...filesEslintProject], { cwd }),
        );
      },
      fix: ({ scanMode, files }, { flags }): number => {
        if (scanMode !== ScanMode.files) {
          return runCommand('eslint', [...flags, '--fix', '.']);
        }
        return runLintFilesEslint(files, (filesEslintProject, cwd) =>
          runCommand('eslint', [...flags, '--fix', ...filesEslintProject], {
            cwd,
          }),
        );
      },
      health: (_lintContext, { targets }): number =>
        healthCheckExitCode({
          [HealthCheckType.binary]: () =>
            healthChecksHelpers.binary('eslint', 'eslint'),
          [HealthCheckType.config]: healthChecksHelpers.skip(
            'dynamic lookup of closest config',
          ),
          [HealthCheckType.files]: healthChecksHelpers.skip(
            'no file dependencies',
          ),
          [HealthCheckType.stdout]: () =>
            healthChecksHelpers.stdout(
              'config loaded (eqeqeq rule active)',
              'eslint',
              ['--print-config', 'eslint.config.ts'],
              'eqeqeq',
            ),
          [HealthCheckType.targets]: () => healthChecksHelpers.targets(targets),
        }),
    },
  },
  // Run packageJson before prettier so fixes get prettier-normalized after
  [LinterName.packageJson]: {
    isEnabled: (files): boolean =>
      files.some((file) => file.endsWith('package.json')),
    buildTargets: ({ files }): string[] =>
      files.filter((file) => file.endsWith('package.json')),
    lintFunctions: {
      check: packageJsonCheck,
      fix: packageJsonFix,
      health: packageJsonHealth,
    },
  },
  [LinterName.prettier]: {
    isEnabled: (files): boolean =>
      isExtensionInFiles(files, linterExtensions[LinterName.prettier]),
    buildFlags: ({ pathToRoot }): string[] => [
      '--no-error-on-unmatched-pattern',
      '--ignore-path',
      join(pathToRoot, '.prettierignore'),
      '--ignore-path',
      join(pathToRoot, 'scripts/nx/nx.lint-ignore'),
    ],
    // One glob per language group. Avoids ENAMETOOLONG when prettier's
    // pre-glob lstat() exceeds the filesystem's NAME_MAX (e.g. eCryptfs at
    // 143 bytes).
    buildTargets: ({ scanMode }): string[] => {
      const languageGlobs = Object.values(extensionsPrettier).map(
        (extensionsPrettierLanguage) =>
          `*.{${extensionsPrettierLanguage.join(',')}}`,
      );
      return scanMode === ScanMode.recursive
        ? languageGlobs.map((languageGlob) => `./**/${languageGlob}`)
        : languageGlobs;
    },
    lintFunctions: {
      check: linterDiffCheck[LinterName.prettier],
      fix: (_lintContext, { flags, targets }): number =>
        runCommand('prettier', [...flags, '--write', ...targets]),
      health: (_lintContext, { flags, targets }): number => {
        const ignorePaths = flags.reduce<string[]>(
          (ignorePathsTemp, flag, index) => {
            if (flag === '--ignore-path') {
              ignorePathsTemp.push(flags[index + 1]);
            }
            return ignorePathsTemp;
          },
          [],
        );
        return healthCheckExitCode({
          [HealthCheckType.binary]: () =>
            healthChecksHelpers.binary('prettier', 'prettier'),
          [HealthCheckType.config]: healthChecksHelpers.skip(
            'config defined in root package.json',
          ),
          [HealthCheckType.files]: () =>
            healthChecksHelpers.files('ignore files exist', ignorePaths),
          // `--find-config-path <file>` returns the path to the prettier config
          // https://prettier.io/docs/cli#--find-config-path
          [HealthCheckType.stdout]: () =>
            healthChecksHelpers.stdout(
              'config resolves to package.json',
              'prettier',
              ['--find-config-path', 'package.json'],
              'package.json',
            ),
          [HealthCheckType.targets]: () => healthChecksHelpers.targets(targets),
        });
      },
    },
  },
  [LinterName.ruff]: {
    isEnabled: (files): boolean =>
      isExtensionInFiles(files, linterExtensions[LinterName.ruff]),
    buildTargets: (): string[] => ['.'],
    lintFunctions: {
      check: (_lintContext, { targets }): number =>
        runCommands(
          ['uv', ['run', 'ruff', 'check', ...targets]],
          ['uv', ['run', 'ruff', 'format', '--check', ...targets]],
        ),
      fix: (_lintContext, { targets }): number =>
        runCommands(
          ['uv', ['run', 'ruff', 'check', '--fix', ...targets]],
          ['uv', ['run', 'ruff', 'format', ...targets]],
        ),
      health: (_lintContext, { targets }): number =>
        healthCheckExitCode({
          [HealthCheckType.binary]: () =>
            healthChecksHelpers.binary('ruff', 'uv', [
              'run',
              'ruff',
              '--version',
            ]),
          [HealthCheckType.config]: healthChecksHelpers.skip(
            'dynamic lookup of `[tool.ruff]` definition',
          ),
          [HealthCheckType.files]: healthChecksHelpers.skip(
            'no file dependencies',
          ),
          // check for `B002` flake8-bugbear ruff rule
          [HealthCheckType.stdout]: () =>
            healthChecksHelpers.stdout(
              'config loaded (flake8-bugbear rules active)',
              'uv',
              ['run', 'ruff', 'check', '--show-settings', '.'],
              '(B002)',
            ),
          [HealthCheckType.targets]: () => healthChecksHelpers.targets(targets),
        }),
    },
  },
  [LinterName.shellcheck]: {
    // shellcheck has no auto-fix — check and fix both report.
    isEnabled: (files): boolean =>
      isExtensionInFiles(files, linterExtensions[LinterName.shellcheck]),
    buildTargets: ({ files }): string[] =>
      filterFilesByExtensions(files, linterExtensions[LinterName.shellcheck]),
    lintFunctions: {
      check: (_lintContext, { targets }): number =>
        runCommand('shellcheck', targets),
      fix: (_lintContext, { targets }): number =>
        runCommand('shellcheck', targets),
      health: ({ pathToRoot }, { targets }): number =>
        healthCheckExitCode({
          [HealthCheckType.binary]: () =>
            healthChecksHelpers.binary('shellcheck', 'shellcheck'),
          [HealthCheckType.config]: () =>
            healthChecksHelpers.config(join(pathToRoot, '.shellcheckrc')),
          [HealthCheckType.files]: healthChecksHelpers.skip(
            'no file dependencies',
          ),
          // no introspection command — probe SC1091 suppression in snippet
          // per the .shellcheckrc config
          [HealthCheckType.stdout]: () => {
            const spawnSyncReturns = spawnSync(
              'shellcheck',
              ['--format=json', '-'],
              {
                input: '#!/bin/bash\n. /some/external/script.sh\n',
                encoding: 'utf8',
                stdio: ['pipe', 'pipe', 'ignore'],
              },
            );
            let sc1091Suppressed: boolean;
            try {
              const warnings = JSON.parse(spawnSyncReturns.stdout || '[]') as {
                code: number;
              }[];
              sc1091Suppressed = !warnings.some((w) => w.code === 1091);
            } catch {
              sc1091Suppressed = false;
            }
            printHealthCheck(
              HealthCheckType.stdout,
              'SC1091 suppressed (config loaded)',
              isOkToStatus(sc1091Suppressed),
            );
            return sc1091Suppressed;
          },
          [HealthCheckType.targets]: () => healthChecksHelpers.targets(targets),
        }),
    },
  },
  [LinterName.solhint]: {
    isEnabled: (files): boolean =>
      isExtensionInFiles(files, linterExtensions[LinterName.solhint]),
    buildFlags: ({ pathToRoot }): string[] => [
      // solhint doesn't walk up to find .solhint.json, so pass it explicitly.
      '-c',
      join(pathToRoot, '.solhint.json'),
      // --ignore-path keeps solhint out of node_modules (via .gitignore).
      '--ignore-path',
      join(pathToRoot, '.solhintignore'),
    ],
    // One glob per ext — solhint's globset parser treats `{x}` (no comma) as
    // literal braces, so single-ext brace groups match 0 files.
    buildTargets: ({ scanMode }): string[] =>
      extensions[Language.solidity].map((extension) =>
        scanMode === ScanMode.recursive
          ? `./**/*.${extension}`
          : `*.${extension}`,
      ),
    lintFunctions: {
      check: (_lintContext, { flags, targets }): number =>
        runCommand('solhint', [...flags, ...targets]),
      fix: (_lintContext, { flags, targets }): number =>
        runCommand('solhint', [...flags, '--fix', '--noPrompt', ...targets]),
      health: ({ pathToRoot }, { targets }): number => {
        const configPath = join(pathToRoot, '.solhint.json');
        return healthCheckExitCode({
          [HealthCheckType.binary]: () =>
            healthChecksHelpers.binary('solhint', 'solhint'),
          [HealthCheckType.config]: () =>
            healthChecksHelpers.config(configPath),
          [HealthCheckType.files]: healthChecksHelpers.skip(
            'no file dependencies',
          ),
          // no introspection command — check `.solhint.json` rule
          [HealthCheckType.stdout]: () =>
            healthChecksHelpers.stdout(
              'rules loaded (reason-string rule active)',
              'solhint',
              ['-c', configPath, 'list-rules'],
              'reason-string',
            ),
          [HealthCheckType.targets]: () => healthChecksHelpers.targets(targets),
        });
      },
    },
  },
  [LinterName.taplo]: {
    isEnabled: (files): boolean =>
      isExtensionInFiles(files, linterExtensions[LinterName.taplo]),
    // One glob per ext — taplo's globset parser treats `{x}` (no comma) as
    // literal braces, so single-ext brace groups match 0 files.
    buildTargets: ({ scanMode }): string[] =>
      extensions[Language.toml].map((extension) =>
        scanMode === ScanMode.recursive
          ? `./**/*.${extension}`
          : `*.${extension}`,
      ),
    lintFunctions: {
      check: (lintContext, lintCommandParts): number => {
        let exitCode = 0;
        if (
          linterDiffCheck[LinterName.taplo](lintContext, lintCommandParts) !== 0
        ) {
          exitCode = 1;
        }
        if (runCommand('taplo', ['lint', ...lintCommandParts.targets]) !== 0) {
          exitCode = 1;
        }
        return exitCode;
      },
      fix: (_lintContext, { targets }): number =>
        runCommands(
          ['taplo', ['format', ...targets]],
          ['taplo', ['lint', ...targets]],
        ),
      health: ({ pathToRoot }, { targets }): number =>
        healthCheckExitCode({
          // taplo exits 1 on --version — check prefix from stdout
          [HealthCheckType.binary]: () => {
            const versionResult = spawnSync('taplo', ['--version'], {
              encoding: 'utf8',
              stdio: ['ignore', 'pipe', 'ignore'],
            });
            const isOk = versionResult.stdout.startsWith('taplo ');
            printHealthCheck(
              HealthCheckType.binary,
              '`taplo` invocable',
              isOkToStatus(isOk),
            );
            return isOk;
          },
          [HealthCheckType.config]: () =>
            healthChecksHelpers.config(join(pathToRoot, '.taplo.toml')),
          [HealthCheckType.files]: healthChecksHelpers.skip(
            'no file dependencies',
          ),
          // no introspection command — probe allowed_blank_lines error in
          // snippet per the .taplo.toml config
          [HealthCheckType.stdout]: () => {
            const probe = spawnSync(
              'taplo',
              ['format', '-c', join(pathToRoot, '.taplo.toml'), '-'],
              {
                input: 'a = 1\n\n\nb = 2\n',
                encoding: 'utf8',
                stdio: ['pipe', 'pipe', 'ignore'],
                env: { ...process.env, RUST_LOG: 'error' },
              },
            );
            const isOk = probe.status === 0 && !probe.stdout.includes('\n\n\n');
            printHealthCheck(
              HealthCheckType.stdout,
              'blank-line limit applied',
              isOkToStatus(isOk),
            );
            return isOk;
          },
          [HealthCheckType.targets]: () => healthChecksHelpers.targets(targets),
        }),
    },
  },
  [LinterName.yamllint]: {
    // yamllint has no auto-fix — check and fix both report; which is why we
    // format with prettier and only do semantic checks here.
    // Runs from repo root so `.yamllint`'s `ignore-from-file` resolves.
    isEnabled: (files): boolean =>
      isExtensionInFiles(files, linterExtensions[LinterName.yamllint]),
    buildFlags: (): string[] => ['-c', '.yamllint', '--strict'],
    // Pass the package dir in recursive mode (let yamllint walk + filter)
    // Pass an explicit file list at the root (yamllint doesn't glob-expand).
    buildTargets: ({ files, projectPathFromRoot, scanMode }): string[] =>
      scanMode === ScanMode.recursive
        ? [projectPathFromRoot]
        : filterFilesByExtensions(files, linterExtensions[LinterName.yamllint]),
    lintFunctions: {
      check: ({ pathToRoot }, { flags, targets }): number =>
        runCommand('uv', ['run', 'yamllint', ...flags, ...targets], {
          cwd: pathToRoot,
        }),
      fix: ({ pathToRoot }, { flags, targets }): number =>
        runCommand('uv', ['run', 'yamllint', ...flags, ...targets], {
          cwd: pathToRoot,
        }),
      health: ({ pathToRoot }, { targets }): number =>
        healthCheckExitCode({
          [HealthCheckType.binary]: () =>
            healthChecksHelpers.binary('yamllint', 'uv', [
              'run',
              'yamllint',
              '--version',
            ]),
          [HealthCheckType.config]: () =>
            healthChecksHelpers.config(join(pathToRoot, '.yamllint')),
          [HealthCheckType.files]: healthChecksHelpers.skip(
            'no file dependencies',
          ),
          // no introspection command — probe `quoted-strings` error in
          // snippet per the .yamllint config
          [HealthCheckType.stdout]: () => {
            const probe = spawnSync(
              'uv',
              ['run', 'yamllint', '-c', '.yamllint', '-f', 'parsable', '-'],
              {
                input: 'foo: "bar"\n',
                encoding: 'utf8',
                stdio: ['pipe', 'pipe', 'ignore'],
                cwd: pathToRoot,
              },
            );
            const isOk = probe.stdout.includes('quoted-strings');
            printHealthCheck(
              HealthCheckType.stdout,
              'quoted-strings rule active (redundant quote flagged)',
              isOkToStatus(isOk),
            );
            return isOk;
          },
          [HealthCheckType.targets]: () => healthChecksHelpers.targets(targets),
        }),
    },
  },
} satisfies Record<LinterName, Linter>;

/**
 * Groups files by their nearest `eslint.config.ts` and runs ESLint per group.
 * @param files - Absolute paths of files to lint.
 * @param runCommandEslintFiles - ESLint callback for file group.
 * @returns 0 if all groups passed, 1 if any failed.
 */
function runLintFilesEslint(
  files: string[],
  runCommandEslintFiles: (filesEslintProject: string[], cwd: string) => number,
): number {
  const gitRoot = execSync('git rev-parse --show-toplevel', {
    encoding: 'utf8',
  }).trim();

  const eslintConfigFileGroups = new Map<string, string[]>();
  for (const file of files) {
    let dir = dirname(file);
    while (!existsSync(join(dir, 'eslint.config.ts'))) {
      const parent = dirname(dir);
      if (parent === dir) {
        dir = gitRoot;
        break;
      }
      dir = parent;
    }
    const eslintConfigFileGroup = eslintConfigFileGroups.get(dir) ?? [];
    eslintConfigFileGroup.push(file);
    eslintConfigFileGroups.set(dir, eslintConfigFileGroup);
  }

  let exitCode = 0;
  for (const [cwd, eslintConfigFileGroupFiles] of eslintConfigFileGroups) {
    if (runCommandEslintFiles(eslintConfigFileGroupFiles, cwd) !== 0) {
      exitCode = 1;
    }
  }
  return exitCode;
}
