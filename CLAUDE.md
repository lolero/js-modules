# CLAUDE.md

## Tooling

- **pnpm** - JS package manager (not npm/yarn)
- **uv** - Python package manager (not pip/poetry)
- **ruff** - Python linting/formatting
- **Nx** - Task runner for both JS and Python packages

## Commands

```bash
pnpm reset:install                 # Install all dependencies (JS + Python)
pnpm --filter <package-name> build # Build specific package
pnpm nx test <package-name>        # Run tests
pnpm nx run-many -t test           # Run all tests
pnpm lint:fix                      # Auto-fix linting issues
```

## Critical Rules

**Imports**: Use path aliases, never relative paths across packages:

```ts
import { X } from '@js-modules/common-react-utils'; // correct
import { X } from '../../other-package/src/X'; // wrong
```

**Package naming**: `<category>-<subcategory>-<name>` (e.g., `api-nest-utils`, `apps-travel-log-web`)

**Nx project names**: JS packages register under `@js-modules/<dir-name>` (autodetected from `package.json.name`). Python packages register under `@py-modules/<dir-name>` (applied by `nx-plugin.ts` as an nx-only scope — `pyproject.toml` and `uv` are unaffected). Always use the scoped form in nx commands: `pnpm nx <target> @<js|py>-modules/<dir-name>`.

**New-package tooling coverage**: after scaffolding a package, confirm the shared tooling picks it up. Give it correct `nx.tags` (`type:lib` or `type:app`) and the standard `src/` + `index.ts` layout so the eslint config and `knip.config.ts` globs apply. Verify with `pnpm nx run @js-modules/<dir-name>:lint:check` (the right rule set runs, not just the base config) and `pnpm deps:check` (no false "unused files" or config hints for the new package). For libraries, run `pnpm reset:install` (regenerates path aliases via `reset.package-references.ts`) and confirm `@js-modules/<dir-name>` — and every `exports` subpath — resolves in the root `tsconfig.json` `paths`; only `type:lib` packages get aliased, so a mis-tagged lib won't resolve. A new framework/app type or `exports` shape may need a matching branch in `knip.config.ts`.

**New-dependency tooling coverage**: when adding a dependency to any package, reference its version as `catalog:` and add the package to the `catalog:` block in `pnpm-workspace.yaml` (never a raw range). If `pnpm install` then reports **ignored build scripts**, triage each into `allowBuilds` per `/deps-update` (native/benign → `true`, telemetry/analytics → `false`) — don't leave the warning unhandled. Do **not** proactively add `overrides`; they're conflict-driven. But when a real version conflict _does_ surface (a duplicate version in the tree, a build/test break from version skew) and it can't be resolved by aligning the direct deps, **pinning it tree-wide via `overrides` is the fix** — see `/deps-update`.

**Tree-shaking (`sideEffects`)**: every `type:lib` package sets `"sideEffects": false` so consumers can tree-shake it. The exception is a lib with genuine module-level side effects — CSS imports or global registration (e.g. Font Awesome in `web-react-mui`'s `MuiFaIcon`) — which instead lists those file globs: `"sideEffects": ["**/*.css", "**/MuiFaIcon.*"]`. Apps (`type:app`) omit `sideEffects` — they are leaf bundles, not consumed. Verify with a full build after adding it.

**NestJS gotcha**: NestJS apps build for production even in dev mode. When you change a dependency package, you must rebuild it before changes appear in the NestJS app.

**tsconfig hygiene**: Before adding any compiler option to a package `tsconfig.json`, read every file in its `extends` chain (typically `scripts/tsconfig/tsconfig.*.json` and the root `tsconfig.json`) and confirm the option is not already defined there. Never duplicate an option that is already covered by a mixin.

## Follow travel-log Patterns

**travel-log is the reference implementation for this monorepo.** Before writing any new file or code, read the equivalent in `apps-travel-log-*` — web → `apps-travel-log-web*`, native → `apps-travel-log-native*`, API → `apps-travel-log-api*`. Match its file/directory structure and naming (files, dirs, variables, types, functions). When no direct analogue exists, infer the pattern from conventions observed across travel-log packages.

## Code Style

- Conventional commits (Angular convention)
- Index files only in package `src/` directories
- **No lint disable comments** of any kind unless strictly necessary and explicitly authorized by the user. Fix the underlying issue instead.
- **Functions**: use `function` declarations, not arrow functions, for every named/top-level function. Reserve arrows for inline callbacks and expressions where a declaration isn't possible.
- **After completing code changes**, `git add -N` any files you created and then run `pnpm lint:fix-staged` to lint and auto-fix the files changed since HEAD. Run once per task, not after every file edit.
- **JSDoc**: Give every non-nested function you create or edit a JSDoc block.
- **JSDoc currency**: When you edit a function, or review my changes to one, verify its JSDoc is still accurate and valid. Run once per task, not after every file edit.
- **Watch items**: code that carries a workaround for an unresolved _upstream_ issue is marked `// WATCH: <slug>` plus one line of local context — never `TODO`, which is reserved for work we can actually act on. The rationale, tracking link, verification and cleanup steps live once, under that slug, in the watch-items step of `.claude/commands/deps-update.md`. `grep -rn 'WATCH:'` finds every site an item licenses; delete the marker and the workaround together when the item is resolved.
- **JSDoc React components**: The root `@param props` description is always `Component props.`
- **MUI styling**: use theme tokens (`primary.main`, `background.paper`, `spacing`, etc.) — never hardcode colors or sizes that the theme already defines. Structural or repeated styles belong in `getThemeComponents` overrides in the theme file; `sx` props are for layout and one-off adjustments specific to a single usage.
- **MUI `sx` performance**: keep `sx` cheap and statically analyzable — pass plain strings/numbers and system shorthands (`pr: 1.5`, `color: 'primary.main'`), never inline computation or per-property callbacks (`pr: (t) => t.spacing(1.5)`). Hoist derived values above the JSX, and `useMemo` any `sx` that depends on props/state.
- **MUI class names**: target elements via MUI's exported class-name constants (`svgIconClasses.root`, `treeItemClasses.content`, etc.), never hardcoded `.MuiX-root` strings — in `sx` selectors, theme `styleOverrides`, and everywhere else.
- **Icons**: React+MUI apps use `<MuiFaIcon />` from `@js-modules/web-react-mui`. React Native apps use `<NativeFaIcon />` from `@js-modules/native-react-utils`. Both accept Font Awesome `IconDefinition` objects. Do not use MUI's built-in icon set or any other icon library.
- **Enums**: never use TS `enum` (emits runtime code, not type-erasable). Use a POJO enum — an `as const` object + `export type X = Enum<typeof X>` (`Enum` from `@js-modules/common-utils-general`). In **type** position, member access needs `typeof` (e.g. `RequestAction<typeof Foo.Bar, …>`), since `Foo.Bar` is a value there.
