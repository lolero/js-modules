# @js-modules/web-react-docs-mui-internal-core-docs

Local stand-in for MUI's unpublished `@mui/internal-core-docs` package, used by
the verbatim MUI documentation examples in
[`@js-modules/web-react-docs-mui`](../web-react-docs-mui).

## Purpose

The example components under
`web-react-docs-mui/src/_docsExamplesCopy-DO-NOT-EDIT` are copied verbatim from
the [MUI documentation repository](https://github.com/mui/material-ui) (see
`web-react-docs-mui/scripts/mui.copy-docs-examples.ts`). A handful of them
import helpers from MUI's internal docs infrastructure:

```ts
import { HighlightedCode } from '@mui/internal-core-docs/HighlightedCode';
import { MarkdownElement } from '@mui/internal-core-docs/MarkdownDocs';
```

That package only exists inside MUI's own monorepo — the version published to
npm (`@mui/internal-core-docs@0.0.1`) is an empty placeholder with no code, so
those imports cannot resolve. This package provides lightweight local shims for
the subpaths the copied examples actually use, so the examples compile and run
without editing the (verbatim, do-not-edit) copies.

## How it's wired

The copied files import the literal specifier `@mui/internal-core-docs/*`, which
must resolve to this package. That is done with a pnpm dependency alias in the
consumer's `package.json`, which keeps this package's name within the
`@js-modules/*` convention while making it resolvable at the MUI specifier:

```jsonc
// web-react-docs-mui/package.json
"dependencies": {
  "@mui/internal-core-docs": "workspace:@js-modules/web-react-docs-mui-internal-core-docs@*"
}
```

Because the alias key (`@mui/internal-core-docs`) is not a workspace project
name, Nx cannot infer the dependency edge from it, so the consumer also declares
it explicitly:

```jsonc
// web-react-docs-mui/package.json
"nx": {
  "implicitDependencies": ["@js-modules/web-react-docs-mui-internal-core-docs"]
}
```

With this in place the bare import resolves natively in every consumer — Vite
(dev and prod) and `tsc` — with no per-consumer build config.

## Why it has no build step

Unlike the other `@js-modules/*` library packages, this one is **source-only**:
its `exports` map points straight at the `.tsx` files in `src`, and there is no
`tsconfig.build.json` or emitted `build/` output.

This is intentional, and follows from how the package is consumed. The other
library packages are imported via their `@js-modules/*` name, which is mapped to
their `src` by the root `tsconfig.json` `paths` in dev, and resolved through
`node_modules` to their built `main: build/index` in prod — so they must emit a
build. This package is reached through the `@mui/internal-core-docs` **alias**,
which sits outside the `@js-modules/*` `paths` namespace, so it always resolves
through `node_modules` to its `exports` — in both dev and prod.

Given that, source `exports` are the correct choice:

- **`exports` → `src`** (current): the bundler transforms the `.tsx` directly,
  working in dev and prod with no build. Edits are live in dev.
- **`exports` → `build`**: would require `build/` to exist before the app can
  run, but `nx dev` has no `^build` dependency — so dev would break on a fresh
  checkout. Adding a build while keeping `exports` at `src` would only emit dead,
  unused output.

Type checking is still covered by the package's `types:check` target
(`tsc --noEmit`). The only situation that would call for a build (or a Jest
`transform` entry) is a **non-bundler** consumer — for example, a future Jest
test in `web-react-docs-mui` that renders an example using these shims. There are
no such tests today; that can be addressed if and when one is added.
