import { LintMode } from './nx.lint-types';
import { runLint } from './nx.lint-utils';

const [, , mode] = process.argv as [unknown, unknown, LintMode];
const modes = Object.values(LintMode);
if (!modes.includes(mode)) {
  process.stderr.write(
    `Lint mode must be one of ${modes.join(', ')}; got: ${mode}\n`,
  );
  process.exit(2);
}
process.exit(runLint(mode));
