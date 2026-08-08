# Why

Standing explanations for code that looks wrong, or looks like it could be
simplified, but can't be. Each entry is keyed by a **slug**; the code it explains
is marked `// WHY: <slug>` plus one line of local context, so
`grep -rn 'WHY:'` lists every site an entry covers.

This is the sibling of the watch-items list in
`.claude/commands/deps-update.md`. One question decides which a constraint
belongs to:

> Is there a plausible upstream release that would let us delete this code?

**Yes → watch item.** Its value is the lifecycle: re-check on every deps update,
and delete the entry with its workaround the moment it resolves.

**No → here.** These don't expire. Each entry ends with _What would change this_
— the thing that would have to become true for the constraint to lift — but none
of them is expected, and none is on anyone's roadmap.

Don't mint a slug for a single site; an inline comment is better at n=1. Slugs
earn their keep at two or more.

Entries explain the constraint and the remedy; they never list sites. The marker
does that, and a hand-maintained roster goes stale the moment a site is added or
removed.

---

## `react-compiler-hookless-hook`

**The React Compiler only compiles a `use*` function if that function itself
calls at least one hook.** A hook that calls none is left completely untouched —
and unlike a bail, it emits **no diagnostic at all**, because it was never a
compilation candidate. Absence of a `CompileError` is not evidence of coverage.

The cause is that memoizing requires _injecting a hook_. The compiler's cache is
`const $ = _c(n)`, and `c` resolves to
`resolveDispatcher().useMemoCache(size)` (`react/cjs/react.development.js`) — a
hook, which consumes a slot in hook order and throws outside a render.

A `use*` function that calls no hooks is not yet bound by the rules of hooks:
callers may legally invoke it conditionally, in a loop, from an event handler, or
outside React entirely. Injecting `useMemoCache` would break every one of those
call sites, and the compiler transforms one function at a time, so it cannot
check them. Components are exempt for exactly this reason — React always invokes
a component during render, once, unconditionally — which is why a component with
no hook calls still compiles.

**Consequence: manual memoization in such a hook is load-bearing, and it is
self-sustaining.** The `useMemo`/`useCallback` calls are themselves what make the
function a compilable hook. Removing them doesn't merely forgo the compiler's
help — it evicts the function from the compiler's view, so nothing memoizes it at
all and every consumer's cache invalidates each render. This is a trap: the
cleanup destroys the coverage that would have made the cleanup safe.

**Two remedies.** Keep the manual memoization, or remove the need for it — hoist
the value to module scope so its identity is stable by construction. Prefer the
second where it applies: it takes the site out of the risk entirely instead of
documenting it. `useTranslate` in
`web-react-docs-mui-internal-core-docs/src/i18n.tsx` is the hoisted case.

**Verify:** run Babel with the plugin's `logger` and collect events whose
`kind !== 'CompileSuccess'`, then separately confirm each hook appears in the
`CompileSuccess` set — a non-candidate produces no event, so only presence
proves coverage. Per file, `_c(` in the build output means compiled, but that
gives false passes when one function in a file compiles and another does not.

**What would change this:** the compiler would need whole-program proof that
every call site of a given `use*` function is render-phase and unconditional.
That is out of scope for a per-function Babel transform. Not expected.

---

## `react-compiler-hook-as-value`

**The React Compiler refuses any function that treats a hook as a value rather
than calling it directly**, and skips the whole function silently. The
diagnostics are `Hooks may not be referenced as normal values, they must be
called` and `Hooks must be the same function on every render`.

This is not a compiler limitation — it is React enforcing a documented rule,
[never pass around hooks as regular values](https://react.dev/reference/rules/react-calls-components-and-hooks#never-pass-around-hooks-as-regular-values).
Combined with the `useMemoCache` mechanism described under
[`react-compiler-hookless-hook`](#react-compiler-hookless-hook), there is no fix
to wait for.

`web-react-router` does this deliberately. The adapter carries the framework's
route-params hook (`useParams`) so consumers can call it at their own position in
the tree — route params are match-scoped, so they cannot be a top-level value on
the provider (see `WebRouterUseParams` in `webRouter.types.ts`). Both
`WebRouterProvider`s and `useWebParams` are therefore uncompiled, and their
`useMemo`/`useCallback` are load-bearing: without them the context value is a
fresh object every render and every `useWebRouter()` consumer re-renders.

**Verify:** `pnpm nx run @js-modules/web-react-router:build`, then check the
emitted `build/reactRouter/WebRouterProvider.js` for `_c(` — its absence means
still skipped.

**What would change this:** React would have to permit hooks as first-class
values, reversing a stated rule of React. Not expected. If it ever happens, the
adapter could drop its manual memoization at every
`grep -rn 'WHY: react-compiler-hook-as-value'` site.
