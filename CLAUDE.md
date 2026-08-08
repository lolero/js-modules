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

### General

- **Work in progress**: when work will span sessions or is waiting on my decision, record it with `/wip`, which carries the rules. Check `/wip` when resuming prior work.
- **Git**: read freely — `status`, `log`, `diff`, `show`, `reflog`, `ls-files`. **Ask before anything that mutates** the working tree, index, history or remote: `commit` (incl. `--amend`), `reset`, `rebase`, `merge`, `stash`, `clean`, `checkout`/`restore` of tracked files, `push`. A dirty working tree is normal here — I review and commit; leave it alone.
- Conventional commits (Angular convention)
- Index files only in package `src/` directories
- **No lint disable comments** of any kind unless strictly necessary and explicitly authorized by the user. Fix the underlying issue instead.
- **After completing code changes**, `git add -N` any files you created and then run `pnpm lint:fix-staged` to lint and auto-fix the files changed since HEAD. Run once per task, not after every file edit.
- **Rule shape** (for this file): when a rule outgrows a principle plus one qualifier, split it — a leading principle, then each case as a labelled `- **Label**: …` sub-bullet, with any disambiguating test stated first and its exceptions after. A rule that reads as a wall gets skimmed and pattern-matched instead of looked up, which is how it ends up misapplied.

### Naming & syntax

- **Naming**: order identifier parts so the grouping axis comes first — favor sorting and autocomplete over grammatical reading order. When two axes could lead, cluster on the domain.
  - **Leads**: a category (`cssSelectorButtonDisabled`, `commandTscEmit`, `configBabelReactLib`); a verb or predicate (`getX`, `isX`, `useX`).
  - **Trails**: a type or role (`navLeftDrawerTreeViewItemLinkSx`, `WorkspaceContentBoxProps`); a variant qualifier — `previous`, `next`, `base`, `temp`, `updated` — so variants sort beside the value they vary (`stickyBreadcrumbsMetadataPrevious`, never `previousStickyBreadcrumbsMetadata`).
  - **Qualifier, or part of the name?** A word trails only when it marks a variant of a value that is in scope. If such a base value is in scope, the suffix wins regardless of what the enclosing function is called (`userRepresentationUpdated`, built from a `userRepresentation` param). Otherwise the word belongs to the name and stays put — `updatedAt` is a field, and a binding holding a call's result takes the callee's noun phrase (`const updatedKeycloakUserRepresentation = getUpdatedKeycloakUserRepresentation(…)`).
- **Functions**: use `function` declarations, not arrow functions, for every named/top-level function. Reserve arrows for inline callbacks and expressions where a declaration isn't possible. React components are no exception — declare them as `function`, never `const X = () => …` or `const X: React.FC = …`. `React.FC` stays valid in **type** position, where it describes a component value rather than declaring one (`function initApp(): React.FC`, `type WebRouterProviderComponent = React.FC<WebRouterProviderProps>`).
- **React component return types**: components return `React.ReactNode` — never `JSX.Element` (React 19 removed the global `JSX` namespace, so it resolves only via a dependency's own type, e.g. `keycloakify/tools/JSX`) nor `React.JSX.Element`. `ReactNode` already covers `null` and string returns, so a component that conditionally renders nothing needs no union. Same for `children` props. Render helpers that aren't components — functions returning a single element to a library — keep `ReactElement`.
- **Enums**: never use TS `enum` (emits runtime code, not type-erasable). Use a POJO enum — an `as const` object + `export type X = Enum<typeof X>` (`Enum` from `@js-modules/common-utils-general`). In **type** position, member access needs `typeof` (e.g. `RequestAction<typeof Foo.Bar, …>`), since `Foo.Bar` is a value there.

### Documentation

- **JSDoc**: Give every non-nested function you create or edit a JSDoc block.
- **JSDoc currency**: When you edit a function, or review my changes to one, verify its JSDoc is still accurate and valid. Run once per task, not after every file edit.
- **JSDoc React components**: The root `@param props` description is always `Component props.`
- **Watch items**: a workaround for an unresolved _upstream_ issue, marked `// WATCH: <slug>` — never `TODO`, which is reserved for work we can actually act on.
  - **Rationale** lives once under that slug in the watch-items step of `.claude/commands/deps-update.md`, with its tracking link, verification and cleanup steps.
  - **Lifecycle**: `grep -rn 'WATCH:'` finds every site an item licenses; delete the marker and the workaround together when it resolves.
- **Why items**: a constraint with **no** upstream fix coming — code that looks wrong or simplifiable but isn't — marked `// WHY: <slug>`, with the reasoning, evidence and verification steps living once under that slug in `docs/WHY.md`.
  - **Which marker**: ask whether a plausible upstream release would let us delete the code — yes → `WATCH:`, no → `WHY:`.
  - **Local context**: add one line where the slug alone doesn't make the local relevance obvious. When one slug licenses several sites in the same function, mark each site and leave them bare — repeating the sentence adds nothing, and a marker on the line above is what stops the edit the item exists to prevent.
  - **Threshold**: don't mint a slug for a single site — an inline comment is better at n=1.

### React Compiler

- **Memoization**: don't hand-memoize — the React Compiler does it exhaustively, caching the JSX element rather than just the value, and across conditionals `useMemo` structurally can't.
  - **Cost of doing it anyway**: `react-hooks/preserve-manual-memoization` makes the compiler honor your boundary, blocking it from fusing a value's cache with the element's — 5 cache slots instead of 3 when the value is passed as a prop.
  - **Exception — the compiler bails**: it then does nothing, so manual memoization is the only lever (see the `WHY:` slugs in `docs/WHY.md`).
  - **Exception — identity is semantics**, not optimization: a `Map`/`WeakMap` key, or a value handed to a library that caches by reference — use `useRef`/`useState`, not `useMemo`.
  - **`React.memo`** is unnecessary: element caching already produces the same parent-level bail-out.
- **Computed object keys**: the React Compiler skips any function whose object keys aren't plain identifiers — a template literal (``[`& .${cls.root}`]``), an `as` cast (`['--x' as keyof CSSProperties]`), or a destructured computed key (`const { [k]: v } = …`). It skips silently, and takes that function's whole memoization with it. Hoist the key to a `const` and reference it by identifier, or index instead of destructuring, and mark the site `// WATCH: react-compiler-computed-keys` so the workaround is removed when the limitation is. <!-- WATCH: react-compiler-computed-keys -->
- **React lint disables**: the React Compiler skips any function containing an `eslint-disable` that names a `react-hooks/*` rule — user authorization can't change that, so the suppression costs the memoization the rule was (often wrongly) warning about. Fix the code or leave the warning. The one exception is a function that already bails for an independent reason (`VirtualizedAutocomplete`'s incompatible library, `usePrevious`'s render-time ref read) — there is no memoization left to lose. Disables naming non-React rules, and bare `eslint-disable-next-line`, don't affect compilation.

### MUI & icons

- **MUI styling — where a style belongs**: use theme tokens (`primary.main`, `background.paper`, `spacing`, etc.) — never hardcode colors or sizes that the theme already defines. Generic, app-agnostic styling — MUI components, and the workspace package's own components — belongs in `getThemeComponents` `styleOverrides`, which resolve once per theme instead of per render. `sx` is for instance-specific, one-off adjustments.
- **MUI `sx` — how to write it**: keep it statically analyzable — plain strings/numbers and system shorthands (`pr: 1.5`, `color: 'primary.main'`), never inline computation or per-property callbacks (`pr: (t) => t.spacing(1.5)`).
  - **Units differ by property**: `pr`/`px`/`my` take spacing multipliers, `width`/`height` are sizing (`0.25` means `25%`), and `top`/`right`/`bottom`/`left` are raw CSS — those need `theme.spacing()` from a hoisted `useTheme()`.
  - **Inline it**: the React Compiler caches the whole element, so hoisting a static `sx` to a `const` inside a component buys nothing, including in list and row renderers. Extract only for reuse across call sites, or in plain non-component code the compiler never touches.
- **MUI `sx` — values that change at runtime**: keep the `sx` object static and pass the changing value as a CSS custom property through `style` (`style={{ ['--row-h' as keyof CSSProperties]: `${h}px` }}` with `height: 'var(--row-h)'` in the `sx`). Interpolating it into `sx` instead injects a new class per distinct value and grows the stylesheet without bound. Never hand-memoize an `sx` — the React Compiler does it, and better: it caches the JSX element itself, not just the object. `react-hooks/preserve-manual-memoization` means a manual `useMemo` only constrains it.
- **MUI class names**: target elements via MUI's exported class-name constants (`svgIconClasses.root`, `treeItemClasses.content`, etc.), never hardcoded `.MuiX-root` strings — in `sx` selectors, theme `styleOverrides`, and everywhere else.
- **Icons**: React+MUI apps use `<MuiFaIcon />` from `@js-modules/web-react-mui`. React Native apps use `<NativeFaIcon />` from `@js-modules/native-react-utils`. Both accept Font Awesome `IconDefinition` objects. Do not use MUI's built-in icon set or any other icon library.
