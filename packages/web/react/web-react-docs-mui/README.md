# @js-modules/web-react-docs-mui

A documentation viewer for the monorepo's MUI components, built from the official
MUI documentation examples.

## Vendored examples

The component demos live under `src/_docsExamplesCopy-DO-NOT-EDIT`. They are
copied **verbatim** from the [MUI](https://github.com/mui/material-ui) and
[MUI X](https://github.com/mui/mui-x) docs repositories by
`scripts/mui.copy-docs-examples.ts` (`pnpm mui:copy-docs-examples`), so they are
generated, not hand-written — DO NOT EDIT them!!!

That directory is:

- **`tsconfig`-excluded** and **lint-ignored** (`**/_*-DO-NOT-EDIT/**`), because
  it is third-party code we do not own.
- Stamped with `// @ts-nocheck` on every file by the copy script — `tsc` still
  type-checks these files when a `*Box` component imports one, and MUI's examples
  use loose typing, so the directive keeps `types:check` green without editing
  the copies.

### Static assets

The examples reference assets by absolute path (e.g.
`/static/images/avatar/1.jpg`), served by MUI's docs site. The copy script scans
the copied examples for those references and vendors each asset once, alongside
the examples, under `src/_docsExamplesCopy-DO-NOT-EDIT/static`.

Consumer apps serve them via the Vite plugin exported at
`@js-modules/web-react-docs-mui/vite`, which serves `/static/...` from that
directory in dev and emits the assets into the build output in prod — so the
images render in both, without copying assets into every consumer app:

```ts
// consumer vite.config.ts
import { docsMuiStaticAssets } from '@js-modules/web-react-docs-mui/vite';

export default defineConfig({
  plugins: [pluginReact(), docsMuiStaticAssets()],
});
```

## Why this package is source-only (no build)

Unlike the other `@js-modules/*` library packages, this one has **no `main` /
`build` / `tsconfig.build.json`** and is consumed directly from `src` via the
`exports` map in `package.json`:

```jsonc
"exports": {
  ".": "./src/index.ts",
  "./vite": { "types": "...d.mts", "default": "...mjs" }
}
```

The built packages emit `build/index` because they are resolved through
`node_modules → main` in production (where Vite's `tsconfigPaths` is off). This
package cannot meaningfully build: a `tsc -p tsconfig.build.json` would try to
compile the ~2,000 vendored `@ts-nocheck` example files and emit thousands of
useless artifacts. So it is consumed as source instead, and the `exports` map is
the source-consumption equivalent of `main` — it makes both `.` and `./vite`
resolve deterministically in **dev and prod** without a build step. (`"files":
["build"]` is irrelevant here: this package is `private` and never published.)

The companion package
[`@js-modules/web-react-docs-mui-internal-core-docs`](../web-react-docs-mui-internal-core-docs)
follows the same source-only pattern, providing local shims for MUI's
unpublished `@mui/internal-core-docs` helpers that the examples import.
