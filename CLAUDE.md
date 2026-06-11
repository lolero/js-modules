# CLAUDE.md

## Tooling

- **pnpm** - Use pnpm, not npm/yarn
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

**NestJS gotcha**: NestJS apps build for production even in dev mode. When you change a dependency package, you must rebuild it before changes appear in the NestJS app.

**tsconfig hygiene**: Before adding any compiler option to a package `tsconfig.json`, read every file in its `extends` chain (typically `scripts/tsconfig/tsconfig.*.json` and the root `tsconfig.json`) and confirm the option is not already defined there. Never duplicate an option that is already covered by a mixin.

## Follow travel-log Patterns

**travel-log is the reference implementation for this monorepo.** Before writing any new file or code, read the equivalent in `apps-travel-log-*` — web → `apps-travel-log-web*`, native → `apps-travel-log-native*`, API → `apps-travel-log-api*`. Match its file/directory structure and naming (files, dirs, variables, types, functions). When no direct analogue exists, infer the pattern from conventions observed across travel-log packages.

## Code Style

- Conventional commits (Angular convention)
- Index files only in package `src/` directories
- **No lint disable comments** of any kind unless strictly necessary and explicitly authorized by the user. Fix the underlying issue instead.
- **After completing code changes**, run `pnpm lint:staged-fix` to lint and auto-fixe only the files changed since HEAD. Run once per task, not after every file edit.
- **JSDoc**: Give every non-nested function you create or edit a JSDoc block.
- **JSDoc currency**: When you edit a function, or review my changes to one, verify its JSDoc is still accurate and valid. Run once per task, not after every file edit.
- **JSDoc React components**: The root `@param props` description is always `Component props.`
- **MUI styling**: use theme tokens (`primary.main`, `background.paper`, `spacing`, etc.) — never hardcode colors or sizes that the theme already defines. Structural or repeated styles belong in `getThemeComponents` overrides in the theme file; `sx` props are for layout and one-off adjustments specific to a single usage.
- **Icons**: React+MUI apps use `<MuiFaIcon />` from `@js-modules/web-react-utils`. React Native apps use `<NativeFaIcon />` from `@js-modules/native-react-utils`. Both accept Font Awesome `IconDefinition` objects. Do not use MUI's built-in icon set or any other icon library.
