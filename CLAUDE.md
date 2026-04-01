# CLAUDE.md

## Tooling

- **pnpm** - Use pnpm, not npm/yarn
- **uv** - Python package manager (not pip/poetry)
- **ruff** - Python linting/formatting
- **Nx** - Task runner for both JS and Python packages

## Commands

```bash
pnpm reset:install                    # Install all dependencies (JS + Python)
pnpm --filter <package-name> build    # Build specific package
pnpm nx test:test <package-name>      # Run tests
pnpm nx run-many -t test:test         # Run all tests
pnpm lint:fix                         # Auto-fix linting issues
```

## Critical Rules

**Imports**: Use path aliases, never relative paths across packages:
```ts
import { X } from '@js-modules/common-react-utils'  // correct
import { X } from '../../other-package/src/X'       // wrong
```

**Package naming**: `<category>-<subcategory>-<name>` (e.g., `api-nest-utils`, `apps-travel-log-web`)

**NestJS gotcha**: NestJS apps build for production even in dev mode. When you change a dependency package, you must rebuild it before changes appear in the NestJS app.

## Code Style

- Conventional commits (Angular convention)
- Index files only in package `src/` directories
