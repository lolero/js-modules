import { execSync } from 'child_process';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, relative } from 'path';

const root = join(__dirname, '../..');

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
  };

  if (!packageObject.name?.startsWith('@js-modules/')) {
    continue;
  }

  const packageDir = packageFilePath.replace(/\/package\.json$/, '');
  if (!existsSync(join(packageDir, 'src'))) {
    continue;
  }

  const packageFiles = readdirSync(packageDir);
  const hasViteConfig = packageFiles.some((file) =>
    /^vite\.config\./.test(file),
  );
  const hasNestCli = packageFiles.includes('nest-cli.json');
  const hasMetroConfig = packageFiles.some((file) =>
    /^metro\.config\./.test(file),
  );
  const hasHardhatConfig = packageFiles.some((file) =>
    /^hardhat\.config\./.test(file),
  );
  if (hasViteConfig || hasNestCli || hasMetroConfig || hasHardhatConfig) {
    continue;
  }

  const pathFromRoot = relative(root, packageDir);
  packagePaths[packageObject.name] = [`./${pathFromRoot}/src`];
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
