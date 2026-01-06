# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TypeScript monorepo with production-ready full-stack applications and reusable library packages. Contains two main application projects (**dapp** - Web3/blockchain app, **travel-log** - full-stack travel logging app) with supporting libraries across API, web, mobile, and common utility domains.

## Common Commands

```bash
# Installation & Setup
pnpm install                          # Install all dependencies
pnpm reset:install                    # Clean setup with ignore symlinks
pnpm reset:reset                      # Full clean + reinstall

# Build
pnpm --filter <package-name> build    # Build specific package

# Testing
pnpm --filter <package-name> test:test      # Run tests for specific package
pnpm --filter <package-name> test:watch     # Watch mode for specific package
pnpm --filter <package-name> test:coverage  # Coverage for specific package
pnpm --filter '*' test:coverage             # All packages coverage

# Linting
pnpm lint:check                       # Check ESLint, Prettier, Solhint
pnpm lint:fix                         # Auto-fix linting issues

# Development servers (run from package directory or use --filter)
pnpm dev:travel-log-api-core          # NestJS API server
pnpm dev:travel-log-web               # Vite web app
pnpm dev:travel-log-native            # React Native app

# Cleanup
pnpm clean:build-cache                # Clear build artifacts and caches
```

## Architecture

### Monorepo Tools
- **pnpm** - Package manager (use pnpm, not npm/yarn)
- **Nx** - Task orchestration and caching

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
