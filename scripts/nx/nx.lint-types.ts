export const LintMode = {
  check: 'check',
  fix: 'fix',
  health: 'health',
} as const;
export type LintMode = (typeof LintMode)[keyof typeof LintMode];

export const LinterName = {
  eslint: 'eslint',
  prettier: 'prettier',
  ruff: 'ruff',
  shellcheck: 'shellcheck',
  solhint: 'solhint',
  taplo: 'taplo',
  yamllint: 'yamllint',
} as const;
export type LinterName = (typeof LinterName)[keyof typeof LinterName];

export const ScanMode = {
  shallow: 'shallow', // root-level files only (cwd === gitRoot)
  recursive: 'recursive', // full package tree (cwd !== gitRoot)
  files: 'files', // explicit file paths (runLintFiles)
} as const;
export type ScanMode = (typeof ScanMode)[keyof typeof ScanMode];

export type LintContext = {
  files: string[];
  pathToRoot: string;
  projectPathFromRoot: string;
  scanMode: ScanMode;
};

export type LintCommandParts = {
  flags: string[];
  targets: string[];
};

export type LintFunction = (
  lintContext: LintContext,
  lintCommandParts: LintCommandParts,
) => number;

export type LintFunctions = Record<LintMode, LintFunction>;

export type Linter = {
  isEnabled: (files: LintContext['files']) => boolean;
  buildFlags?: (lintContext: LintContext) => LintCommandParts['flags'];
  buildTargets?: (lintContext: LintContext) => LintCommandParts['targets'];
  lintFunctions: LintFunctions;
};
