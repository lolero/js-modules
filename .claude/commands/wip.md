---
description: List, resume, or record work in progress that spans sessions
argument-hint: [optional slug to resume]
---

# Work in progress

Entries live in `.claude/wip/<slug>.md`, one file per workstream. **The
directory is the index** — there is no roster to maintain, so nothing can drift.

## Listing (no argument)

Read only the first three lines of each file in `.claude/wip/` — every entry
opens with a one-line status — and report the slugs with those statuses. **Do
not load the bodies.**

**First check each entry's done-when condition.** Entries often complete through
something the user does — a commit, a merge, a deploy — which happens outside a
session, so nothing prompts the cleanup and the entry silently goes stale. A
stale entry is worse than none: it describes a world that no longer exists and
will be acted on. Where the condition is checkable, check it (`git status` for
"once committed", `git log` for "once merged") and offer to delete rather than
report it as pending. Then:

- If the user's opening message already says what we're doing, just surface the
  list in a line or two and carry on with what they asked.
- If it doesn't, ask which one to resume.

Load a body only for the slug the user picks. That is the whole point of the
split: a workstream pending for weeks costs one line per session, not its full
text.

## Resuming (`/wip <slug>`)

Read `.claude/wip/<slug>.md` in full and continue from **Next**. Treat
**Decided** as settled — those are choices already made with the user; do not
reopen them without new information.

## Recording

Open an entry when work will span more than one sitting, or when it is waiting
on a user decision. Skip one-off tasks — an entry for a five-minute edit is
noise.

Each file starts with a one-line status (this is what listing shows), then:

- **Decided** — choices already made, so a later session doesn't relitigate
  them. The highest-value field: git shows _what_ changed, never _why it was
  chosen_.
- **Done** — what has landed and been verified.
- **Next** — the concrete next action, specific enough to act on cold.
- **Verify** — the command(s) that prove the work is sound.
- **Blocked on** — anything awaiting a decision, phrased as a question.
- **Done when** — the condition that retires the entry, stated so it can be
  checked without reading the body (`git status` is clean; PR #123 is merged).
  Required whenever completion depends on the user rather than on me, since
  that event happens outside a session and nothing else will prompt cleanup.
- **Scope notes** — how a work-list was derived, not just its size. A count
  without its derivation is what makes a sweep miss things.

Update at decision points and before long-running operations. It is a resume
point, not a running log. Don't record what a command answers better — file
lists belong to `git status`, history to `git log`.

## Cleanup

Delete the file when the work lands. A finished workstream is a deletion, not an
archive; anything still worth knowing afterwards belongs in `docs/WHY.md`, a
`WATCH:` item, or a CLAUDE.md rule instead.

## Relationship to the durable systems

This queue _produces_ `WATCH:` items (deferred upstream fixes, in
`.claude/commands/deps-update.md`) and `WHY:` items (permanent constraints, in
`docs/WHY.md`). It is neither — entries here are transient by design. If an item
stops being imminent, it isn't work in progress any more; move it to whichever
of those it actually is.
