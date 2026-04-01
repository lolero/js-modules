# Contributing

## Setup

```bash
pnpm reset:install    # Install JS + Python dependencies
```

## Pull Requests

1. Create a feature branch from `main`
2. Make your changes
3. Run `pnpm lint:fix` before committing
4. Run `pnpm nx run-many -t test:test` to verify tests pass
5. Submit PR with a clear description

## Commit Conventions

This project uses [Conventional Commits](https://www.conventionalcommits.org/) (Angular convention).

```
feat: add user authentication
fix: resolve login redirect loop
refactor: simplify API error handling
docs: update setup instructions
```

## CLAUDE.md Guidelines

The `CLAUDE.md` file provides context to AI coding agents. Keep it minimal and high-signal.

### What belongs in CLAUDE.md

- **Tooling requirements**: Commands that differ from defaults (pnpm not npm, uv not pip)
- **Non-obvious conventions**: Rules that would cause errors if violated (import aliases, naming conventions)
- **Gotchas**: Quirks that are hard to discover and cause real pain (NestJS rebuild requirement)

### What does NOT belong in CLAUDE.md

- **Directory trees**: Agents discover structure by exploring - listing it wastes tokens
- **Tech stack lists**: Visible in package.json and config files
- **Standard configurations**: If it's discoverable from config files, don't repeat it
- **Verbose explanations**: Keep rules terse; agents don't need persuasion

### Principles

1. **Add rules only after hitting the same wall twice** - Let pain earn its place
2. **Target under 50 lines** - If it's longer, question every line
3. **Prefer commands over explanations** - `pnpm lint:fix` beats a paragraph about linting
4. **Delete aggressively** - If a rule hasn't prevented an error recently, remove it

Reference: [ETH Zurich study on context files (2026)](https://www.marktechpost.com/2026/02/25/new-eth-zurich-study-proves-your-ai-coding-agents-are-failing-because-your-agents-md-files-are-too-detailed/)
