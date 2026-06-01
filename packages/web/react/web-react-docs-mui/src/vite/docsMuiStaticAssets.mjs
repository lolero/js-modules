import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, posix, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

// The verbatim MUI docs examples reference assets by absolute path
// (e.g. `/static/images/avatar/1.jpg`), served by MUI's docs site. Those assets
// are vendored once alongside the examples (in `_docsExamplesCopy-DO-NOT-EDIT`);
// this plugin serves them at the same `/static/...` paths in dev and emits them
// into the build output in prod, so any consumer app renders the example images
// without per-app duplication.
//
// Authored as `.mjs` (not `.ts`) because a consumer's vite config loads it in a
// Node context that does not transpile this externalized dependency.
const staticDir = fileURLToPath(
  new URL('../_docsExamplesCopy-DO-NOT-EDIT/static', import.meta.url),
);

// The vendored mui-x examples import sibling demos via MUI's docs-site bare
// specifiers (`docs/data/...`, `docs/src/modules/...`). Both prefixes flatten
// into the `mui-x` copy folder (see mui.copy-docs-examples.ts), so alias them
// there and let Vite resolve the file extension (.tsx/.ts/.json).
const muiXExamplesDir = fileURLToPath(
  new URL('../_docsExamplesCopy-DO-NOT-EDIT/mui-x', import.meta.url),
);
const muiXExampleAliases = [
  { find: /^docs\/data\//, replacement: `${muiXExamplesDir}/` },
  { find: /^docs\/src\/modules\//, replacement: `${muiXExamplesDir}/` },
];

// A few examples also reach sibling demos via deep `../../../../../../data/...`
// relatives that, in MUI's repo, climb out to `docs/data/...`. Our flattened
// copy puts those under `mui-x/...`, so any relative import that escapes the
// copy dir into a phantom `.../data/<rest>` is remapped onto the mui-x folder.
// Shallow, in-copy `../data/...` imports stay inside copyDir and are untouched.
const copyDir = fileURLToPath(
  new URL('../_docsExamplesCopy-DO-NOT-EDIT', import.meta.url),
);
const DATA_ESCAPE_MARKER = `${sep}data${sep}`;

// The examples link to docs pages by root-relative path (e.g.
// `/x/react-charts/bar-demo/#SimpleBarChart`). Those routes only exist on MUI's
// docs site, so absolutize them to mui.com — the links then behave exactly as
// they would on the official docs. Matches quoted string literals beginning
// with a MUI docs product root; `/static/...` is deliberately NOT in the list,
// since those asset paths are served locally by this plugin.
const MUI_DOCS_ORIGIN = 'https://mui.com';
const MUI_ROUTE_LITERAL =
  /(['"])(\/(?:x|material-ui|joy-ui|base-ui|system|toolpad)\/[^'"]*)\1/g;

// Since those rewritten links now point off-origin (mui.com), open them in
// a new tab so a click doesn't navigate away from the docs app. A
// delegated, capturing click handler keys off the resolved origin, so it
// targets exactly the absolutized docs links and leaves in-page demo
// anchors (`href="#..."`) and any same-origin links untouched. Injected
// once via the page HTML.
const EXTERNAL_LINK_NEW_TAB_SCRIPT = `
document.addEventListener('click', function (event) {
  if (event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  var target = event.target;
  var anchor = target && target.closest ? target.closest('a[href]') : null;
  if (!anchor || anchor.target === '_blank') return;
  var url;
  try {
    url = new URL(anchor.href, window.location.href);
  } catch (_) {
    return;
  }
  if (url.origin === window.location.origin) return;
  event.preventDefault();
  window.open(url.href, '_blank', 'noopener,noreferrer');
}, true);
`;

const MIME_BY_EXT = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
};

/**
 * Lists every file under a directory, recursively.
 * @param {string} dir - Directory to walk.
 * @returns {string[]} Absolute file paths.
 */
function listFiles(dir) {
  const files = [];
  if (!existsSync(dir)) {
    return files;
  }
  for (const entry of readdirSync(dir)) {
    const entryPath = join(dir, entry);
    if (statSync(entryPath).isDirectory()) {
      files.push(...listFiles(entryPath));
    } else {
      files.push(entryPath);
    }
  }
  return files;
}

/**
 * Vite plugin that serves and emits the vendored MUI docs example assets,
 * aliases the examples' `docs/...` bare specifiers into the vendored copy,
 * absolutizes their root-relative docs links to mui.com, and opens the
 * resulting off-origin links in a new tab.
 * @returns {import('vite').Plugin} The configured Vite plugin.
 */
export function docsMuiStaticAssets() {
  return {
    name: 'docs-mui-static-assets',
    config() {
      return { resolve: { alias: muiXExampleAliases } };
    },
    async resolveId(source, importer) {
      if (!importer || !source.startsWith('.')) {
        return null;
      }
      const resolved = resolve(dirname(importer), source);
      // Only act on relatives that escape the vendored copy; in-copy imports
      // (including shallow `../data/...`) resolve normally.
      if (resolved.startsWith(copyDir + sep)) {
        return null;
      }
      const markerIndex = resolved.indexOf(DATA_ESCAPE_MARKER);
      if (markerIndex === -1) {
        return null;
      }
      const rest = resolved.slice(markerIndex + DATA_ESCAPE_MARKER.length);
      return this.resolve(join(muiXExamplesDir, rest), importer, {
        skipSelf: true,
      });
    },
    transform(code, id) {
      const file = id.split('?')[0];
      if (!file.startsWith(copyDir + sep)) {
        return null;
      }
      MUI_ROUTE_LITERAL.lastIndex = 0;
      if (!MUI_ROUTE_LITERAL.test(code)) {
        return null;
      }
      MUI_ROUTE_LITERAL.lastIndex = 0;
      const rewritten = code.replace(
        MUI_ROUTE_LITERAL,
        `$1${MUI_DOCS_ORIGIN}$2$1`,
      );
      return { code: rewritten, map: null };
    },
    transformIndexHtml() {
      return [
        {
          tag: 'script',
          children: EXTERNAL_LINK_NEW_TAB_SCRIPT,
          injectTo: 'body',
        },
      ];
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? '').split('?')[0];
        if (!url.startsWith('/static/')) {
          next();
          return;
        }
        const filePath = join(staticDir, url.slice('/static/'.length));
        if (!filePath.startsWith(staticDir)) {
          next();
          return;
        }
        try {
          const ext = posix.extname(url);
          if (MIME_BY_EXT[ext]) {
            res.setHeader('Content-Type', MIME_BY_EXT[ext]);
          }
          res.end(readFileSync(filePath));
        } catch {
          next();
        }
      });
    },
    generateBundle() {
      for (const filePath of listFiles(staticDir)) {
        this.emitFile({
          type: 'asset',
          fileName: posix.join('static', relative(staticDir, filePath)),
          source: readFileSync(filePath),
        });
      }
    },
  };
}
