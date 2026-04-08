import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { join } from 'path';

const root = join(__dirname, '../..');

execSync('husky install', { cwd: root, stdio: 'inherit' });

const hookPath = join(root, '.husky', 'pre-commit');
const hookContent =
  ['#!/bin/sh', 'pnpm lint-staged', 'pnpm commitlint --edit "$1"'].join('\n') +
  '\n';

writeFileSync(hookPath, hookContent, { mode: 0o755 });
console.log('created: .husky/pre-commit');
