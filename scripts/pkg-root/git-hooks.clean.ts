import { execSync } from 'child_process';
import { existsSync, rmSync } from 'fs';
import { join } from 'path';

const root = join(__dirname, '../..');

try {
  execSync('git config --unset core.hooksPath', {
    cwd: root,
    stdio: 'inherit',
  });
} catch {
  // exit code 5 means the key wasn't set — not an error
}

const huskyDir = join(root, '.husky');
if (existsSync(huskyDir)) {
  rmSync(huskyDir, { recursive: true, force: true });
  console.log('removed: .husky');
}
