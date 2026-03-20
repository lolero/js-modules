# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TypeScript monorepo with production-ready full-stack applications and reusable library packages. Contains two main application projects (**dapp** - Web3/blockchain app, **travel-log** - full-stack travel logging app) with supporting libraries across API, web, mobile, and common utility domains.

## Common Commands

```bash
# Installation & Setup
pnpm install:js                       # Install JS dependencies (pnpm install)
pnpm install:py                       # Install Python dependencies (uv sync)
pnpm reset:install                    # Create symlinks + install JS & Python in parallel
pnpm reset:reset                      # Full clean + reinstall

# Build
pnpm --filter <package-name> build    # Build specific package

# Testing (JS and Python via Nx)
pnpm nx test:test <package-name>      # Run tests for specific package
pnpm nx test:watch <package-name>     # Watch mode for specific package
pnpm nx test:coverage <package-name>  # Coverage for specific package
pnpm nx run-many -t test:test         # Run all tests (JS + Python)

# Linting
pnpm lint:check                       # Check ESLint, Prettier, Solhint, Ruff (parallel)
pnpm lint:fix                         # Auto-fix linting issues (parallel)

# Development servers (run from package directory or use --filter)
pnpm dev:travel-log-api-core          # NestJS API server
pnpm dev:travel-log-web               # Vite web app
pnpm dev:travel-log-native            # React Native app

# Cleanup
pnpm clean:main                       # Remove dependencies (node_modules, .venv, etc.)
pnpm clean:build                      # Remove build artifacts (JS + Python)
pnpm reset:clean                      # Full clean (main + build)
```

## Architecture

### Monorepo Tools
- **pnpm** - Package manager (use pnpm, not npm/yarn)
- **Nx** - Task orchestration and caching
- **uv** - Python package manager and virtualenv
- **nx-plugin.ts** - Custom plugin providing unified test/lint targets for JS and Python

### Package Structure
```
packages/
├── api/nest/           # NestJS backend utilities & modules
├── apps/
│   ├── dapp/           # Web3/blockchain app packages
│   └── travel-log/     # Full-stack travel app packages
├── common/             # Shared libraries (react, redux, utils)
├── native/             # React Native utilities
└── web/                # Web-specific libraries (react, styles)
```

### Package Naming Convention
Format: `<category>-<subcategory>-<package-name>`
Examples: `api-nest-utils`, `common-react-utils`, `web-react-icons`, `apps-travel-log-web`

### Critical Import Rules
- **Use path aliases**: `import { X } from '@js-modules/common-react-utils'`
- **Never use relative paths across packages** - imports must go through package.json dependencies
- Path aliases (`@js-modules/*`) are defined in root `tsconfig.json` for development

### Package Categories
- **Library**: Exports artifacts consumed by other packages (has `build/` output)
- **App**: Builds into executable application
- A package must be one or the other, never both

### NestJS Important Note
NestJS apps **do not use** root tsconfig.json path aliases. They build for production even in dev mode. When changes are made to dependency packages, those dependencies must be rebuilt before changes take effect in the NestJS app.

## Testing

Jest with ts-jest. Each package with tests has its own `jest.config.ts` extending the root `jest.config-common.ts`.

Test files: `src/**/?(*.)+(spec|test).[jt]s?(x)`

## TypeScript Configuration

- `tsconfig.json` - Development config with path aliases
- `tsconfig.build.json` - Production build config (base)
- Each package has its own tsconfig files extending the root configs

## Code Style

- ESLint with `airbnb-typescript-prettier` base config
- Prettier: single quotes, trailing commas
- Conventional commits required (Angular convention via commitlint)
- Index files only allowed in package `src/` directories

## Tech Stack

- **Backend**: NestJS 11, TypeORM, PostgreSQL, Keycloak
- **Frontend**: React 19, Material UI 7, Redux + Saga, Vite
- **Mobile**: React Native 0.83, React Navigation, React Native Paper
- **Blockchain**: Solidity 0.8.x (dapp only)
- **Python/ML**: Python 3.11+, LangChain, uv

## Python Packages

### Python Tooling
- **uv** - Package manager, virtualenv, and Python version manager (replaces pip, poetry, pyenv)
- **ruff** - Linting and formatting (replaces flake8, black, isort)
- **pytest** - Testing framework
- **nx-plugin.ts** - Auto-detects Python packages and provides Nx targets

### Python Commands

```bash
# Installation & Setup
uv python install 3.11                # Install specific Python version
uv python pin 3.11                    # Pin version for project
pnpm install:py                       # Install Python dependencies (uv sync)

# Testing & Linting (via Nx - same as JS)
pnpm nx test:test apps-langchain-basics
pnpm nx test:coverage apps-langchain-basics
pnpm nx lint:check apps-langchain-basics
pnpm nx lint:fix apps-langchain-basics

# Run across all packages (JS + Python)
pnpm nx run-many -t test:test
pnpm nx run-many -t lint:check
```

### Python Configuration Files
```
js-modules/
├── pyproject.toml                    # Workspace config (uv, ruff, pytest)
├── .python-version                   # Python version pin (3.11)
├── nx-plugin.ts                      # Nx plugin for JS + Python targets
└── packages/
    └── apps/langchain/
        └── apps-langchain-basics/
            ├── pyproject.toml        # Package dependencies
            ├── src/apps_langchain_basics/
            └── tests/
```

### Python Package Detection
- Any directory with `pyproject.toml` (without `package.json`) is detected as a Python package
- Nx targets (`test:test`, `test:watch`, `test:coverage`, `lint:check`, `lint:fix`) are auto-generated

### Python Code Style
- Ruff for linting (replaces flake8, isort, etc.)
- Single quotes (matching TypeScript/Prettier config)
- Line length: 88 (ruff default)
- Python 3.11+ required
