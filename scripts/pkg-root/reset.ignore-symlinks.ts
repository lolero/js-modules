import { existsSync, symlinkSync, unlinkSync } from 'fs';
import { join } from 'path';

const root = join(__dirname, '../..');

const symlinks: [target: string, link: string][] = [
  ['.gitignore', '.nxignore'],
  ['.gitignore', '.dockerignore'],
  ['.gitignore', '.prettierignore'],
  ['.gitignore', '.solhintignore'],
];

for (const [target, link] of symlinks) {
  const linkPath = join(root, link);
  if (existsSync(linkPath)) {
    unlinkSync(linkPath);
  }
  symlinkSync(target, linkPath);
  console.log(`created: ${link} -> ${target}`);
}
