import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Reads the dependency names pinned in the `overrides` block of
 * `pnpm-workspace.yaml`; taze excludes these so they stay hand-maintained.
 * @returns Overridden dependency names.
 */
function readOverrideNames(): string[] {
  const yaml = readFileSync(join(process.cwd(), 'pnpm-workspace.yaml'), 'utf8');
  const start = yaml.indexOf('\noverrides:');
  if (start < 0) {
    return [];
  }
  const names: string[] = [];
  for (const line of yaml
    .slice(start + 1)
    .split('\n')
    .slice(1)) {
    if (line.trim() === '') {
      continue; // tolerate blank lines within the block
    }
    if (!/^\s/.test(line)) {
      break; // dedent → end of overrides block
    }
    const match = line.match(/^\s+'?([^':\s]+)'?\s*:/);
    if (match) {
      names.push(match[1]);
    }
  }
  return names;
}

// https://github.com/antfu-collective/taze#config-file
export default {
  recursive: true, // whole workspace, incl. catalog
  exclude: readOverrideNames(), // overrides are hand-maintained; never bump them
};
