import { execSync } from 'child_process';
import { join } from 'path';
import { LintMode } from './nx.lint-types';
import { runLintFiles } from './nx.lint-utils';

const args = process.argv.slice(2);
const modeFlagIndex = args.indexOf('--mode');

let mode: LintMode;
let files: string[];

if (modeFlagIndex !== -1) {
  const modeValue = args[modeFlagIndex + 1] as LintMode;
  const modes = Object.values(LintMode);
  if (!modes.includes(modeValue)) {
    process.stderr.write(
      `--mode must be one of ${modes.join(', ')}; got: ${modeValue}\n`,
    );
    process.exit(2);
  }
  mode = modeValue;
  const gitRoot = execSync('git rev-parse --show-toplevel', {
    encoding: 'utf8',
  }).trim();
  files = execSync('git diff HEAD --name-only --diff-filter=ACMR', {
    encoding: 'utf8',
  })
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((file) => join(gitRoot, file));
} else {
  mode = LintMode.check;
  files = args;
}

if (files.length === 0) {
  process.exit(0);
}
process.exit(runLintFiles(files, mode));
