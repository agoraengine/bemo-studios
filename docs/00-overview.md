# BeMo Studios: What This Is

**Opened July 31, 2026.** Repo separation was Lee's call. Scope (video production only) and the boundaries below are the founding decisions.

## The problem it solves

BeMo needs video it does not have. The GA launch sequence lists a sizzle reel in Wave 0 with nothing started. The narrative arc has specified six foundation videos since before beta. Jon and Bill have both asked for sizzle content, which is the strongest signal available, because they are the two people whose job is opening doors.

Video has been the standing gap because it is the one content type the repo-plus-Claude-Code workflow could not produce. Text assets multiply well from an anchor article. Video needs capture, audio, and assembly, and none of that was tooled.

## Why it is its own repo

`bemo-os` is a knowledge base that is also published as a permissioned wiki. It holds thinking. Production machinery is a different kind of artifact: capture scripts, render config, asset manifests, MCP declarations. Putting it in bemo-os would mean shipping build tooling to the wiki and mixing two rates of change, because canon changes when the founders decide something and tooling changes when a library updates.

The separation only works if the boundary is enforced. See below.

## The boundary, stated once

Studios **reads** canon and **produces** video. It does not author canon and does not hold state.

**Studios owns:** briefs, scripts, shot lists, capture automation, production standards, asset manifests, the record of what was produced and when.

**Studios does not own:** positioning, claims, voice, permissions, the narrative arc, which video comes next in the sequence, whether a video is approved to publish, publishing itself.

**Studios reads two repos and commits to neither.** `bemo-os` for canon and permissions, `bemo-website` for the live surface the video has to stay consistent with and for capturable pages. Findings go to `findings.md` and get raised in the repo that owns the problem.

Three failure modes to watch for, because each one has already happened to someone:

1. **Canon drift.** A script says something sharper than the message map, it never gets promoted back to bemo-os, and now two documents disagree. Rule: if a script produces better language, that is a finding for bemo-os. Log it in the production's `findings.md` and raise it. Do not let the script become the source.
2. **State creep.** Studios starts tracking which videos are approved, scheduled, published. That is the content-week leaf's job, specified in `../../bemo-os/docs/initiatives/dogfooding/05-narrative-arc-system.md` and destined for BeMo at Phase 3. Studios records that a cut was *produced*, not that it was *published*.
3. **Media in git.** Video in a git repo is a mistake that is expensive to undo. `.gitignore` blocks the common formats. Assets live in Drive, and `assets.md` holds the links.

## Relationship to dogfooding

Worth being honest about: a hand-rolled production repo is, structurally, the DIY-AI alternative that the dogfooding initiative exists to beat. That is fine, and here is why.

BeMo is not a video editor and is not going to become one. Capture, audio, and assembly are outside the product's boundary in the same way that finished graphics and edited video are already outside the Knowledge Base boundary. What BeMo *will* own is the surrounding workflow: which video, for which theme, in which week, approved by whom. Studios is scoped to sit under that, not beside it.

Concretely: when the content-week leaf ships, a week leaf will carry a record saying "sizzle reel v2 produced," with a Drive link. Studios produced the file. BeMo holds the fact.

## What is out of scope in v1

Named explicitly so scope creep is visible when it starts:

- **The social multiplier** (anchor article to ~21 assets). Stays in the bemo-os Monday session until Phase 3 takes it.
- **Carousels and static graphics.** Canva MCP already handles these in the existing workflow.
- **Publishing and scheduling.** The dogfooding spec is explicit that BeMo is not the publisher on day one, and neither is Studios.
- **Podcasts.** `bemo-os/scripts/build-podcast-bundles.mjs` already does the NotebookLM bundles.

If any of these move in later, they move in as a decision recorded here, not by accumulation.

## Related, in bemo-os

- `docs/initiatives/ga-launch/00-overview.md`: Wave 0 lists the sizzle reel; Amendment 2 is the doctrine carve-out that permits it
- `docs/communications/narrative-arc/04-core-video-set.md`: the six foundation videos, their arc phases, and when to surface each
- `docs/initiatives/dogfooding/05-narrative-arc-system.md`: where content operations end up
- `docs/internal/initiatives/ga-message-map.md`: what every asset has to say
