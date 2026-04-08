import { execSync } from 'child_process';
import { relative } from 'path';
import { filterFilesByExtensions, getDirFiles } from '../common/common.utils';
import { linterExtensions, linters } from './nx.lint-linters';
import { ScanMode } from './nx.lint-types';
import type {
  LintCommandParts,
  LintContext,
  Linter,
  LinterName,
  LintMode,
} from './nx.lint-types';

/**
 * Writes a colored pass/fail summary line for a linter run to stdout.
 * @param linterName - Name of the linter.
 * @param lintMode - Lint mode.
 * @param linterExitCode - Linter exit code.
 */
function printLinterStatus(
  linterName: string,
  lintMode: LintMode,
  linterExitCode: number,
): void {
  const ok = linterExitCode === 0;
  const color = ok ? '\x1b[32m' : '\x1b[31m';
  const mark = ok ? '✓' : '✗';
  const status = ok ? 'ok' : 'failed';
  process.stdout.write(
    `\n${color}${mark} ${linterName} (${lintMode}): ${status}\x1b[0m\n`,
  );
}

/**
 * Runs all enabled linters against the current working directory.
 * @param lintMode - Lint mode.
 * @returns 0 if all linters passed, 1 if any failed.
 */
export function runLint(lintMode: LintMode): number {
  const gitRoot = execSync('git rev-parse --show-toplevel', {
    encoding: 'utf8',
  }).trim();
  const cwd = process.cwd();
  const pathToRoot = relative(cwd, gitRoot) || '.';
  const projectPathFromRoot = relative(gitRoot, cwd) || '.';
  const recursive = cwd !== gitRoot;
  const files = getDirFiles(cwd, recursive);
  const lintContext: LintContext = {
    files,
    pathToRoot,
    projectPathFromRoot,
    scanMode: recursive ? ScanMode.recursive : ScanMode.shallow,
  };

  let exitCode = 0;
  const linterEntries = Object.entries(linters) as [string, Linter][];
  for (const [
    linterName,
    { isEnabled, buildFlags, buildTargets, lintFunctions },
  ] of linterEntries) {
    if (!isEnabled(files)) {
      continue;
    }
    const lintCommandParts: LintCommandParts = {
      flags: buildFlags?.(lintContext) ?? [],
      targets: buildTargets?.(lintContext) ?? [],
    };
    process.stdout.write(`\n━━━ ${linterName} (${lintMode}) start ━━━\n`);
    const linterExitCode = lintFunctions[lintMode](
      lintContext,
      lintCommandParts,
    );
    printLinterStatus(linterName, lintMode, linterExitCode);
    process.stdout.write(`━━━ ${linterName} (${lintMode}) end ━━━\n\n`);
    if (linterExitCode !== 0) {
      exitCode = 1;
    }
  }
  return exitCode;
}

/**
 * Runs all enabled linters against an explicit list of absolute file paths.
 * @param filePathsAbsolute - Absolute paths of files to lint.
 * @param lintMode - Whether to check, fix, or run health checks.
 * @returns 0 if all linters passed, 1 if any failed.
 */
export function runLintFiles(
  filePathsAbsolute: string[],
  lintMode: LintMode,
): number {
  const gitRoot = execSync('git rev-parse --show-toplevel', {
    encoding: 'utf8',
  }).trim();
  const cwd = process.cwd();
  const pathToRoot = relative(cwd, gitRoot) || '.';
  const projectPathFromRoot = relative(gitRoot, cwd) || '.';

  let exitCode = 0;
  const linterEntries = Object.entries(linters) as [LinterName, Linter][];
  for (const [linterName, { buildFlags, lintFunctions }] of linterEntries) {
    const matchedFiles = filterFilesByExtensions(
      filePathsAbsolute,
      linterExtensions[linterName],
    );
    if (matchedFiles.length === 0) {
      continue;
    }

    const lintContext: LintContext = {
      files: matchedFiles,
      pathToRoot,
      projectPathFromRoot,
      scanMode: ScanMode.files,
    };
    const lintCommandParts: LintCommandParts = {
      flags: buildFlags?.(lintContext) ?? [],
      targets: matchedFiles,
    };
    process.stdout.write(`\n━━━ ${linterName} (${lintMode}) start ━━━\n`);
    const linterExitCode = lintFunctions[lintMode](
      lintContext,
      lintCommandParts,
    );
    printLinterStatus(linterName, lintMode, linterExitCode);
    process.stdout.write(`━━━ ${linterName} (${lintMode}) end ━━━\n\n`);
    if (linterExitCode !== 0) {
      exitCode = 1;
    }
  }
  return exitCode;
}
