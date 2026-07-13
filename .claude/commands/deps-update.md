---
description: Run pnpm deps:update-latest, then review/update the pnpm-workspace overrides and allowBuilds with rationale
argument-hint: [optional package or scope to focus on]
---

# Update dependencies (taze) + review overrides & allowBuilds

Run `pnpm deps:update-latest`, then **hand-review** the two things taze can't touch: the `overrides` and `allowBuilds` blocks in `pnpm-workspace.yaml`.

Optional focus for this run: **$ARGUMENTS**

## THE INVARIANT — read first

`taze` bumps the **catalog** but **deliberately skips every package in `overrides`** (`taze.config.ts` → `exclude: readOverrideNames()`). Overrides are hand-maintained pins of **two kinds**:

- **Permanent — an upstream tool dictates the version** (e.g. React Native). NEVER lift these, even when the latest versions happen to match. The pin _guarantees_ the whole tree stays on that required version, so a future transitive bump can't silently pull an incompatible one. They only ever get **re-pinned** (when the dictating tool moves to a new required version).
- **Temporary — a compatibility workaround** while an upstream bug/lag is open. **Lift** these the moment the upstream fix lands.

After every update, re-check each pin accordingly. A major bump can also introduce _new_ conflicts — so **verify with a real build + test**, never just install.

## Workflow

1. **Update** — `pnpm deps:update-latest` (`taze major -w && pnpm install`). Bumps the catalog to latest majors, leaving `overrides` pinned. Skim the taze diff for surprising majors.

2. **Review each `override`** — the `#region permanent` / `#region temporary` markers group them by kind:
   - **Permanent** — never delete. Only act if the version it's forced to has moved upstream: **re-pin** to the new required version, otherwise leave it.
   - **Temporary** — a workaround. Re-check whether the upstream reason in its comment is still true (`pnpm view <pkg> peerDependencies.<dep>` / `dependencies`). If the fix has shipped → **delete the override**. A temporary pin is _debt_: lift it the moment its reason is gone, and update its comment if the reason changed.

3. **Review `allowBuilds`** — after install, pnpm prints _"Ignored build scripts: …"_ for new deps with a postinstall. Inspect each new one's script and decide:
   - **Native binary** (fetches/compiles a platform binary — swc, esbuild, sharp, watchers, napi) → `true`
   - **Benign** (funding notice, etc.) → `true`
   - **Analytics** (scarf, `*-telemetry`, phone-home) → `false`
   - Remove entries for packages no longer in the tree. Add the entry under the matching `#region` (`native-binaries` / `postinstalls-benign` / `postinstalls-analytics`), whose header comment already states the group's rationale.

4. **Verify** — a major update can break at build _or_ runtime. Run the full gate:
   - `pnpm nx run-many -t build` + `-t test` (a bumped framework/test dep can break — e.g. this repo's jest/RN conflict only surfaces in tests)
   - `pnpm lint:fix` (new plugin majors change rules)
   - `pnpm deps:check` (see `/deps-cleanup` — new deps may need per-type `ignoreDependencies`)

## Adding a new override (temporary pin for a broken major update)

When a `deps:update-latest` bump breaks the build/test and the fix belongs upstream (not in your code), pin the offender while you wait:

1. **Isolate** the breaking package — from the build/test error plus `pnpm why <pkg>`. A version conflict shows as two versions of one transitive dep (e.g. `pkg@1` alongside `pkg@2`). Use `pnpm why` (the actual dependency graph), not `ls node_modules/.pnpm` (which also lists orphaned store leftovers).
2. **Pin** it in `overrides` — the direct dep, or the specific dual-versioned transitive dep. Use the narrowest version that resolves it.
3. **Comment** it as a _temporary_ pin: what broke, why the pin is needed, and the **lift condition** (the upstream version / PR / issue that will let you remove it). Add it inside the `#region temporary` block.
4. **Verify** the pin fixes the break (`build` + `test`) without breaking anything else.
5. It's now auto-excluded from taze (overrides are hand-maintained), so it resurfaces for review on every `/deps-update` — lift it the moment the upstream fix ships.

## Commands

- `pnpm deps:update-latest` — taze major + install
- `pnpm view <pkg> peerDependencies.<dep>` · `pnpm view <pkg> dependencies` — check upstream constraints before lifting a pin
- `pnpm nx run-many -t build` / `-t test` — verify (build _and_ test)
- `pnpm lint:fix` · `pnpm deps:check` — gates
