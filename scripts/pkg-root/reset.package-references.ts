import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join, relative } from 'path';
import { exportTargetToSrcBase } from '../common/common.utils';

const root = join(__dirname, '../..');

/**
 * Map a package `exports` target (e.g. `./build/reactRouter/index.js` or
 * `./src/vite/foo.mjs`) to its source path relative to the package, so subpath
 * aliases resolve to `src` like the main alias: a trailing `/index` collapses to
 * its directory so TS resolves it via directory-index resolution.
 * @param target - Export target path from the package's `exports` map.
 * @returns Source path relative to the package (e.g. `src/reactRouter`).
 */
function exportTargetToSrcPath(target: string): string {
  return exportTargetToSrcBase(target).replace(/\/index$/, '');
}

/**
 * Search for files with file name.
 * @param filename - File name.
 * @returns File paths.
 */
function findFiles(filename: string): string[] {
  return execSync(
    `find packages -name "${filename}" -not -path "*/node_modules/*"`,
    { cwd: root, encoding: 'utf8' },
  )
    .trim()
    .split('\n')
    .filter(Boolean)
    .sort();
}

// --- pyproject.toml workspace members ---
const pyMembers = findFiles('pyproject.toml').map((file) =>
  file.replace(/\/pyproject\.toml$/, ''),
);

const pyprojectFilePath = join(root, 'pyproject.toml');
let pyprojectContent = readFileSync(pyprojectFilePath, 'utf8');
const membersBlock = `members = [\n${pyMembers.map((member) => `  "${member}",`).join('\n')}\n]`;
pyprojectContent = pyprojectContent.replace(
  /members = \[\n[\s\S]*?\n\]/,
  membersBlock,
);
writeFileSync(pyprojectFilePath, pyprojectContent);
console.log(`updated pyproject.toml: ${pyMembers.length} workspace members`);

// --- tsconfig.json compilerOptions.paths ---
const packagePaths: Record<string, [string]> = {};

for (const filePackage of findFiles('package.json')) {
  const packageFilePath = join(root, filePackage);
  const packageObject = JSON.parse(readFileSync(packageFilePath, 'utf8')) as {
    name?: string;
    exports?: Record<string, unknown>;
    nx?: { tags?: string[] };
  };

  if (!packageObject.name?.startsWith('@js-modules/')) {
    continue;
  }

  // Only libraries are importable, so only they get path aliases; apps
  // (`type:app`) are skipped.
  if (!(packageObject.nx?.tags ?? []).includes('type:lib')) {
    continue;
  }

  const packageDir = packageFilePath.replace(/\/package\.json$/, '');
  if (!existsSync(join(packageDir, 'src'))) {
    continue;
  }

  const pathFromRoot = relative(root, packageDir);
  packagePaths[packageObject.name] = [`./${pathFromRoot}/src`];

  // Also alias every `exports` subpath (e.g. `@js-modules/pkg/export-subapath`)
  // to its source, so subpath imports resolve without a prior build.
  for (const [exportKey, exportValue] of Object.entries(
    packageObject.exports ?? {},
  )) {
    if (exportKey === '.') {
      continue;
    }

    const target =
      typeof exportValue === 'string'
        ? exportValue
        : ((exportValue as { types?: string; default?: string }).types ??
          (exportValue as { default?: string }).default);
    if (!target) {
      continue;
    }

    packagePaths[`${packageObject.name}${exportKey.slice(1)}`] = [
      `./${pathFromRoot}/${exportTargetToSrcPath(target)}`,
    ];
  }
}

const sortedPaths = Object.fromEntries(
  Object.entries(packagePaths).sort(([a], [b]) => a.localeCompare(b)),
);

const tsconfigPath = join(root, 'tsconfig.json');
const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf8')) as {
  compilerOptions: { paths: Record<string, [string]> };
};
tsconfig.compilerOptions.paths = sortedPaths;
writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2) + '\n');
console.log(
  `updated tsconfig.json: ${Object.keys(sortedPaths).length} path aliases`,
);
