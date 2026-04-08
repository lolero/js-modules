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

## Code Style

- Conventional commits (Angular convention)
- Index files only in package `src/` directories
- **No lint disable comments** of any kind unless strictly necessary and explicitly authorized by the user. Fix the underlying issue instead.
- **After completing code changes**, run `pnpm lint:staged-fix` — lints and auto-fixes only the files changed since HEAD. Run once per task, not after every file edit.
