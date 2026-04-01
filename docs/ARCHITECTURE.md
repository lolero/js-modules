# Architecture

## Design Principles

*Document principles as they emerge from real decisions.*

## Package Structure

### Categories

- **Library packages**: Export artifacts consumed by other packages. Have `build/` output.
- **App packages**: Build into executable applications. Do not export to other packages.

A package must be one or the other, never both.

### Naming Convention

Format: `<category>-<subcategory>-<name>`

Examples:
- `api-nest-utils` - API utilities for NestJS
- `common-react-utils` - Shared React utilities
- `apps-travel-log-web` - Travel log web application

## Patterns

*Add patterns here as they become established conventions.*

## Decisions

*Record significant architecture decisions and their rationale.*

<!--
Consider using ADR format for decisions:
- Context: What is the issue?
- Decision: What was decided?
- Consequences: What are the tradeoffs?
-->
