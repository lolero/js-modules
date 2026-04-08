import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const root = join(__dirname, '../..');
const packagesDir = join(root, 'packages');
const MAX_DEPTH = 3;

/**
 * Prints a directory's content in graphical form to the console.
 * @param dir - Directory path
 * @param depth - Graph depth
 * @param prefix - Graph printout line prefix
 */
function printTree(dir: string, depth: number, prefix: string): void {
  if (depth > MAX_DEPTH) {
    return;
  }
  const entries = readdirSync(dir)
    .filter((e) => statSync(join(dir, e)).isDirectory())
    .sort();

  entries.forEach((entry, i) => {
    const isLast = i === entries.length - 1;
    console.log(`${prefix}${isLast ? '└──' : '├──'} ${entry}`);
    printTree(
      join(dir, entry),
      depth + 1,
      `${prefix}${isLast ? '    ' : '│   '}`,
    );
  });
}

console.log('packages');
printTree(packagesDir, 1, '');
