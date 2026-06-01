import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'fs';
import { dirname, join } from 'path';

const envFile = join(__dirname, '../.env.dev');
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, 'utf8').split('\n')) {
    const match = line.match(/^([^#=]+)=(.+)$/);
    if (match && !process.env[match[1].trim()]) {
      process.env[match[1].trim()] = match[2].trim();
    }
  }
}

// Pin to a specific tag/SHA for reproducibility, e.g. 'v9.0.0'.
// https://github.com/mui/material-ui/releases
// https://github.com/mui/mui-x/releases
const REF_MUI = 'master';
const REF_MUI_X = 'master';

if (!process.env.GITHUB_TOKEN) {
  console.error(
    'Error: GITHUB_TOKEN is not set.\n' +
      'Add it to packages/web/react/web-react-docs-mui/.env.dev (see .env.dev.example).\n' +
      'Get a token at: https://github.com/settings/tokens (no scopes needed)',
  );
  process.exit(1);
}

const dirDocsExamples = join(__dirname, '../src/_docsExamplesCopy-DO-NOT-EDIT');

// The examples reference assets by absolute path (e.g. `/static/images/...`),
// served by MUI's docs site. They are vendored alongside the examples and served
// to consumer apps by the `@js-modules/web-react-docs-mui/vite` plugin.
const dirStatic = join(dirDocsExamples, 'static');
const STATIC_BASE_URL = 'https://mui.com';
// mui.com rate-limits bursts; space out the asset requests.
const STATIC_FETCH_DELAY_MS = 1000;

// Stamped on every copied example. These are verbatim vendored files (excluded
// from tsconfig and lint); `@ts-nocheck` extends that to type-checking, since
// tsc still checks them when a Box component imports them.
const TS_NOCHECK_HEADER =
  '// @ts-nocheck\n// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.\n\n';

/**
 * Prepends the `@ts-nocheck` header to copied example source, but only for
 * `.ts`/`.tsx` files — other file types are returned unchanged.
 * @param fileName - Name (or path) of the file being written.
 * @param content - Raw file content fetched from the MUI repo.
 * @returns Content with the header prepended for TS files, otherwise unchanged.
 */
function stampTsNoCheck(fileName: string, content: string): string {
  if (!fileName.endsWith('.ts') && !fileName.endsWith('.tsx')) {
    return content;
  }

  return `${TS_NOCHECK_HEADER}${content}`;
}

type DocsSource = {
  name: string;
  repo: string;
  ref: string;
  path: string;
};

const docsSources: DocsSource[] = [
  {
    name: 'mui',
    repo: 'mui/material-ui',
    ref: REF_MUI,
    path: 'docs/data/material/components',
  },
  {
    name: 'mui-x',
    repo: 'mui/mui-x',
    ref: REF_MUI_X,
    path: 'docs/data',
  },
  {
    name: 'mui-x',
    repo: 'mui/mui-x',
    ref: REF_MUI_X,
    path: 'docs/src/modules',
  },
];

// Individual files that live outside the directory sources above, copied to a
// custom destination path (and optionally renamed). The MUI docs ship some of
// these as `.js` only; saving as `.tsx` is fine since the dir is excluded from
// tsc/lint/prettier.
type DocsFile = {
  repo: string;
  ref: string;
  srcPath: string;
  destPath: string;
};

const docsFiles: DocsFile[] = [
  {
    repo: 'mui/material-ui',
    ref: REF_MUI,
    srcPath: 'docs/data/material/customization/palette/Intentions.js',
    destPath: 'mui/palette/PaletteValues.tsx',
  },
  {
    repo: 'mui/material-ui',
    ref: REF_MUI,
    srcPath: 'docs/data/material/components/chips/ChipsPlayground.js',
    destPath: 'mui/chips/ChipsPlayground.tsx',
  },
  {
    repo: 'mui/mui-x',
    ref: REF_MUI_X,
    srcPath: 'docs/src/modules/examples/charts/AreaChartsGrid.js',
    destPath: 'mui-x/examples/AreaChartsGrid.tsx',
  },
  {
    repo: 'mui/mui-x',
    ref: REF_MUI_X,
    srcPath: 'docs/src/modules/examples/charts/BarChartsGrid.js',
    destPath: 'mui-x/examples/BarChartsGrid.tsx',
  },
  {
    repo: 'mui/mui-x',
    ref: REF_MUI_X,
    srcPath: 'docs/src/modules/examples/charts/ChartExampleThumbnailGrid.js',
    destPath: 'mui-x/examples/ChartExampleThumbnailGrid.tsx',
  },
  {
    repo: 'mui/mui-x',
    ref: REF_MUI_X,
    srcPath: 'docs/src/modules/examples/charts/LineChartsGrid.js',
    destPath: 'mui-x/examples/LineChartsGrid.tsx',
  },
  {
    repo: 'mui/mui-x',
    ref: REF_MUI_X,
    srcPath: 'docs/src/modules/examples/charts/OtherChartsGrid.js',
    destPath: 'mui-x/examples/OtherChartsGrid.tsx',
  },
  {
    repo: 'mui/mui-x',
    ref: REF_MUI_X,
    srcPath: 'docs/src/modules/examples/charts/PieChartsGrid.js',
    destPath: 'mui-x/examples/PieChartsGrid.tsx',
  },
  {
    repo: 'mui/mui-x',
    ref: REF_MUI_X,
    srcPath: 'docs/src/modules/examples/charts/ScatterChartsGrid.js',
    destPath: 'mui-x/examples/ScatterChartsGrid.tsx',
  },
  {
    repo: 'mui/mui-x',
    ref: REF_MUI_X,
    srcPath: 'docs/data/charts/dataset/usaUnemploymentAndGdp.js',
    destPath: 'mui-x/charts/dataset/usaUnemploymentAndGdp.ts',
  },
];

type GithubEntry = { name: string; type: string };

async function fetchJson(url: string): Promise<unknown> {
  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  return res.json();
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  return res.text();
}

/**
 * Lists every file under a directory, recursively.
 * @param dir - Directory to walk.
 * @returns Absolute file paths.
 */
function listFiles(dir: string): string[] {
  const files: string[] = [];
  for (const dirItem of readdirSync(dir)) {
    const dirItemPath = join(dir, dirItem);
    if (statSync(dirItemPath).isDirectory()) {
      files.push(...listFiles(dirItemPath));
    } else {
      files.push(dirItemPath);
    }
  }
  return files;
}

async function downloadStaticAsset(assetPath: string): Promise<void> {
  const res = await fetch(`${STATIC_BASE_URL}${assetPath}`);
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  const fileDest = join(dirStatic, assetPath.replace(/^\/static\//, ''));
  mkdirSync(dirname(fileDest), { recursive: true });
  writeFileSync(fileDest, Buffer.from(await res.arrayBuffer()));
}

/**
 * Scans the copied examples for `/static/...` asset references and vendors each
 * one into `dirStatic`, mirroring the path so the absolute URLs resolve.
 */
async function downloadStaticAssets(): Promise<void> {
  const assetPathRegex =
    /\/static\/[A-Za-z0-9_./-]+\.(?:jpe?g|png|svg|gif|webp)/g;
  const assetPaths = new Set<string>();
  for (const file of listFiles(dirDocsExamples)) {
    for (const match of readFileSync(file, 'utf8').matchAll(assetPathRegex)) {
      assetPaths.add(match[0]);
    }
  }

  console.log(`\nStatic assets (${assetPaths.size})`);
  for (const assetPath of [...assetPaths].sort()) {
    try {
      await downloadStaticAsset(assetPath);
      console.log(`  ✓    ${assetPath}`);
    } catch (err) {
      console.error(
        `  ✗     ${assetPath}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
    await new Promise((resolve) => {
      setTimeout(resolve, STATIC_FETCH_DELAY_MS);
    });
  }
}

async function downloadDir(
  baseApi: string,
  baseRaw: string,
  pathRel: string,
  dirDest: string,
  ref: string,
): Promise<void> {
  const contents = (await fetchJson(
    `${baseApi}/${pathRel}?ref=${ref}`,
  )) as GithubEntry[];

  const filesTsx = contents.filter(
    (githubEntry) =>
      githubEntry.type === 'file' &&
      (githubEntry.name.endsWith('.tsx') ||
        githubEntry.name.endsWith('.ts') ||
        githubEntry.name.endsWith('.json') ||
        githubEntry.name.endsWith('.md')) &&
      !githubEntry.name.endsWith('.d.ts') &&
      !githubEntry.name.endsWith('.preview.tsx'),
  );

  const subDirs = contents.filter((githubEntry) => githubEntry.type === 'dir');

  if (filesTsx.length > 0) {
    mkdirSync(dirDest, { recursive: true });
    for (const file of filesTsx) {
      const content = await fetchText(`${baseRaw}/${pathRel}/${file.name}`);
      writeFileSync(
        join(dirDest, file.name),
        stampTsNoCheck(file.name, content),
      );
    }
    console.log(
      `  ✓    ${dirDest.replace(dirDocsExamples + '/', '')} (${filesTsx.length} files)`,
    );
  }

  for (const subDir of subDirs) {
    await downloadDir(
      baseApi,
      baseRaw,
      `${pathRel}/${subDir.name}`,
      join(dirDest, subDir.name),
      ref,
    );
  }
}

async function downloadSource(docsSource: DocsSource): Promise<void> {
  const apiBase = `https://api.github.com/repos/${docsSource.repo}/contents`;
  const rawBase = `https://raw.githubusercontent.com/${docsSource.repo}/${docsSource.ref}`;
  const docsSourceDir = join(dirDocsExamples, docsSource.name);

  mkdirSync(docsSourceDir, { recursive: true });

  const topLevel = (await fetchJson(
    `${apiBase}/${docsSource.path}?ref=${docsSource.ref}`,
  )) as GithubEntry[];

  for (const entry of topLevel.filter(
    (githubEntry) => githubEntry.type === 'dir',
  )) {
    await downloadDir(
      apiBase,
      rawBase,
      `${docsSource.path}/${entry.name}`,
      join(docsSourceDir, entry.name),
      docsSource.ref,
    );
  }
}

async function downloadFile(docsFile: DocsFile): Promise<void> {
  const rawUrl = `https://raw.githubusercontent.com/${docsFile.repo}/${docsFile.ref}/${docsFile.srcPath}`;
  const fileDest = join(dirDocsExamples, docsFile.destPath);
  const content = await fetchText(rawUrl);
  mkdirSync(dirname(fileDest), { recursive: true });
  writeFileSync(fileDest, stampTsNoCheck(docsFile.destPath, content));
  console.log(`  ✓    ${docsFile.destPath}`);
}

async function main(): Promise<void> {
  rmSync(dirDocsExamples, { recursive: true, force: true });
  mkdirSync(dirDocsExamples, { recursive: true });

  for (const docsSource of docsSources) {
    console.log(`\n${docsSource.repo}/${docsSource.path}`);
    try {
      await downloadSource(docsSource);
    } catch (err) {
      console.error(
        `  ✗     ${docsSource.name}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  console.log('\nIndividual files');
  for (const docsFile of docsFiles) {
    try {
      await downloadFile(docsFile);
    } catch (err) {
      console.error(
        `  ✗     ${docsFile.destPath}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  await downloadStaticAssets();
}

main().catch(console.error);
