import { execSync, spawnSync } from 'child_process';

export const Language = {
  graphql: 'graphql',
  html: 'html',
  javascript: 'javascript',
  json: 'json',
  markdown: 'markdown',
  python: 'python',
  shell: 'shell',
  solidity: 'solidity',
  sql: 'sql',
  style: 'style',
  svelte: 'svelte',
  toml: 'toml',
  typescript: 'typescript',
  vue: 'vue',
  xml: 'xml',
  yaml: 'yaml',
} as const;
export type Language = (typeof Language)[keyof typeof Language];

export const extensions = {
  [Language.graphql]: ['graphql', 'gql'],
  [Language.html]: ['html', 'htm'],
  [Language.javascript]: ['js', 'jsx', 'mjs', 'cjs'],
  [Language.json]: ['json', 'jsonc', 'json5'],
  [Language.markdown]: ['md', 'markdown', 'mdx'],
  [Language.python]: ['py'],
  [Language.shell]: ['sh', 'bash'],
  [Language.solidity]: ['sol'],
  [Language.sql]: ['sql'],
  [Language.style]: ['css', 'scss', 'less'],
  [Language.svelte]: ['svelte'],
  [Language.toml]: ['toml'],
  [Language.typescript]: ['ts', 'tsx', 'mts', 'cts'],
  [Language.vue]: ['vue'],
  [Language.xml]: ['xml', 'svg'],
  [Language.yaml]: ['yml', 'yaml'],
} as const;

/**
 * Get non-gitignored files in a directory.
 * @param dir - Directory to query; must be inside a git repo.
 * @param recursive - When false, filters to root-level files only.
 * @returns File paths relative to `dir`, or an empty array if git fails.
 */
export function getDirFiles(dir: string, recursive: boolean): string[] {
  try {
    const filesStr = execSync('git ls-files -co --exclude-standard', {
      cwd: dir,
      encoding: 'utf8',
    });
    const files = filesStr.split('\n').filter(Boolean);
    return recursive ? files : files.filter((file) => !file.includes('/'));
  } catch {
    return [];
  }
}

/**
 * Finds out if any file in a list ends with one of the given extensions.
 * @param files - File paths to check.
 * @param fileExtensions - Extensions to match against, without a leading dot.
 * @returns True if at least one file matches, false otherwise.
 */
export function isExtensionInFiles(
  files: readonly string[],
  fileExtensions: readonly string[],
): boolean {
  return files.some((file) =>
    fileExtensions.some((extension) => file.endsWith(`.${extension}`)),
  );
}

/**
 * Filters files whose extension matches one of the given extensions.
 * @param files - File paths to filter.
 * @param fileExtensions - Extensions to keep, without a leading dot.
 * @returns Subset of `files` matching any of the given extensions.
 */
export function filterFilesByExtensions(
  files: readonly string[],
  fileExtensions: readonly string[],
): string[] {
  return files.filter((file) =>
    fileExtensions.some((extension) => file.endsWith(`.${extension}`)),
  );
}

export type RunCommandOptions = { cwd?: string };

export type RunCommandArgs = [
  command: string,
  commandArgs: string[],
  options?: RunCommandOptions,
];

/**
 * Writes a formatted shell command to stdout.
 * @param command - Binary name or path.
 * @param commandArgs - Arguments passed to the command.
 * @param options - Optional CWD override for the command.
 */
export function printCommand(
  command: string,
  commandArgs: string[],
  options: RunCommandOptions = {},
): void {
  const prefix = options.cwd ? `[cd ${options.cwd}] ` : '';
  const argsFormatted = commandArgs.map((arg) => `  ${arg}`).join(' \\\n');
  process.stdout.write(`${prefix}$ ${command} \\\n${argsFormatted}\n\n`);
}

/**
 * Terminates process if exitCode is non-zero.
 * @param exitCode - Fail exit code.
 */
export function exitOnFailure(exitCode: number): void {
  if (exitCode !== 0) {
    process.exit(exitCode);
  }
}

/**
 * Spawns a command, streams its output, and returns the exit code.
 * @param command - Binary name or path.
 * @param commandArgs - Arguments passed to the command.
 * @param options - Optional CWD override.
 * @returns Process exit code, or 1 if the process could not be spawned.
 */
export function runCommand(
  command: string,
  commandArgs: string[],
  options: RunCommandOptions = {},
): number {
  printCommand(command, commandArgs, options);
  const result = spawnSync(command, commandArgs, {
    stdio: 'inherit',
    cwd: options.cwd,
  });
  return result.status ?? 1;
}

/**
 * Runs multiple commands sequentially and returns 0 if all succeed.
 * @param commands - Commands to run, each in `[command, args, options?]` form.
 * @returns 0 if all commands succeeded, 1 if any failed.
 */
export function runCommands(...commands: RunCommandArgs[]): number {
  let exitCode = 0;
  for (const [command, commandArgs, options] of commands) {
    if (runCommand(command, commandArgs, options) !== 0) {
      exitCode = 1;
    }
  }
  return exitCode;
}

export const HealthCheckStatus = {
  ok: 'ok',
  fail: 'fail',
  skip: 'skip',
} as const;
export type HealthCheckStatus =
  (typeof HealthCheckStatus)[keyof typeof HealthCheckStatus];

const healthCheckMarks: Record<HealthCheckStatus, string> = {
  [HealthCheckStatus.ok]: '\x1b[32m✓\x1b[0m',
  [HealthCheckStatus.fail]: '\x1b[31m✗\x1b[0m',
  [HealthCheckStatus.skip]: '\x1b[90m○\x1b[0m',
};

/**
 * Writes a single health-check result line to stdout.
 * @param healthCheckType - Category label shown in the output line.
 * @param description - Human-readable description of what was checked.
 * @param status - Whether the check passed, failed, or was skipped.
 */
export function printHealthCheck(
  healthCheckType: string,
  description: string,
  status: HealthCheckStatus,
): void {
  const prefix = status === HealthCheckStatus.skip ? 'skip ' : '';
  process.stdout.write(
    `  ${healthCheckMarks[status]} ${prefix}${healthCheckType}: ${description}\n`,
  );
}
