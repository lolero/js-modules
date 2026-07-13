---
description: Run knip deps:check and safely triage/clean unused dependencies (build-verified)
argument-hint: [optional package or dep to focus on]
---

# Clean unused dependencies with knip

Run `pnpm deps:check` and act on the flags **safely**. `knip.config.ts` is already tuned with per-type ignores; this is about triaging the remaining findings correctly.

Optional focus for this run (a package or dep to scope the triage to): **$ARGUMENTS**

## THE INVARIANT — read first

A dependency is "unused" **only if `pnpm install` (prune) + `pnpm nx run-many -t build` + tests pass without it.**

knip and grep are a _starting point_, never the authority. **`tsc`/type-check is NOT enough** — it silently passes on deps used via CSS, `.svelte`, generated files, dynamic imports, DI/decorators, `peerDependencies`, and runtime injection. Only a real **build + test** proves removability. Never remove a dep on knip's word alone.

## Workflow

1. **Audit** — `pnpm deps:check`. Note the categories: unused dependencies, devDependencies, catalog entries, files, exports.

2. **Classify each flagged dep** — known false positive (→ ignore) or removal candidate (→ verify)? Use the checklist + table below.

3. **Verify removal candidates empirically** (small batches):
   1. Remove from **every** field in the package.json — `dependencies`, `devDependencies`, `peerDependencies`, `optionalDependencies`. Reusable libs duplicate deps into peer + dev; removing one field leaves it installed.
   2. `pnpm install` — **prune node_modules.** Essential: skip this and the build "passes" only because the dep is still resolvable → the test is meaningless.
   3. `pnpm nx run-many -t build` — the real validator (catches CSS / asset / `.svelte` / dynamic imports that `tsc` misses).
   4. `pnpm nx run-many -t test -p <affected + consumers>` — catches test deps (`@nestjs/testing`, `supertest`) and DI / runtime needs.
   5. **React Native only**: `pnpm nx run <rn-app>:react-native:metro:bundle` (one-shot headless bundle, no device) — exits non-zero on an unresolved module, catching metro-injected deps like `@babel/runtime`. Gradle deps (`@react-native/gradle-plugin`, `@react-native/codegen`) can't be tested headless — treat as required.
   6. **Restore anything that breaks**, with the correct spec: internal deps use `workspace:^` / `workspace:*`, everything else uses `catalog:`.

4. **Suppress required-but-unflaggable survivors** — deps knip genuinely can't see (config-referenced, generated files, `.sol`, metro-injected). Add to `ignoreDependencies` **scoped by project type** in `knip.config.ts`'s `getProjectTypeJs` switch (never a global list — keep it precise). Root tooling → the `.` workspace's `ignoreDependencies` / `ignoreBinaries`.

5. **Prune orphaned catalog entries** — removing a dep from its last consumer orphans its `pnpm-workspace.yaml` catalog entry (shows up as "Unused catalog entries"). Confirm 0 package.json references, remove the line, `pnpm install`.

6. **Format & commit** — `pnpm lint:fix-staged` fixes package.json / yaml formatting after edits.

## Blind-spot checklist — why static analysis lies

Before calling a dep dead, remember knip/grep MISS these; the build catches them:

- **CSS imports** — `@import`, `.../node_modules/x/y.css` (e.g. `preline`)
- **`.svelte` / `.vue` files** — grep over `.ts/.tsx` won't see them (e.g. `classnames`)
- **Generated files** — icons `_dynamically-generated-*.tsx`, `kc.gen.tsx` (often gitignored build artifacts)
- **JSX type-peers** — `@types/react` for `react/jsx-runtime`, needed without an import
- **Dead-but-compiled files** — `tsc` compiles unused files, so their imports look "needed" even when the file is dead
- **DI / decorators** — nest `.forRoot()` / `.forFeature()` (`@nestjs/config`, `@nestjs/typeorm`)
- **peerDependencies duplication** — reusable libs declare deps as peer AND dev; check and remove BOTH
- **pnpm hoisting / phantom deps** — a package importing a dep it never declared, resolved via a sibling's hoist; the prune exposes it (build fails)
- **Runtime-injected** — metro injects `@babel/runtime`; nest bootstrap needs `@nestjs/platform-express`
- **Solidity** — `.sol` imports (`@openzeppelin/contracts`); knip can't parse `.sol`
- **Shell / command tools** — `esbuild` (cjs build command), `@nestjs/cli` (`nest build`), `cross-env` / `solhint` (nx command strings, lint pipeline) — invoked, never imported

## False-positive → fix

| Situation                                                         | Action                                                                      |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Build + test clean without it                                     | **Remove** (all fields)                                                     |
| Runtime/build peer, config-ref, generated, `.sol`, metro-injected | Per-type `ignoreDependencies` in `knip.config.ts` (`getProjectTypeJs` case) |
| Root tooling (husky, nx commands, lint pipeline)                  | `.` workspace `ignoreDependencies` / `ignoreBinaries`                       |
| Lib runtime peer (`react` / `@emotion/*` in a component lib)      | Move to `peerDependencies`                                                  |
| System binary (`uv`, `adb`, `diff`)                               | `ignoreBinaries`                                                            |

## Commands

- `pnpm deps:check` — audit (whole-repo)
- `pnpm install` — prune (between remove and build — mandatory)
- `pnpm nx run-many -t build` — the validator
- `pnpm nx run-many -t test -p <pkgs>` — test / DI deps
- `pnpm lint:fix-staged` — format after edits
