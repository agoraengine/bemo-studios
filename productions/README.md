# Productions

One folder per video. Open a new one with the `new-production` skill rather than copying by hand, so the brief gets written against current canon.

## Anatomy

```
<slug>/
├── brief.md       what the video is for. Ratified before anything else starts.
├── script.md      narration, on-screen text, timings, shot IDs
├── shot-list.md   what to capture, and whether it has been
├── assets.md      Drive links. No media files in this repo.
├── findings.md    canon findings for bemo-os, product findings for Lee
└── capture/       run.mjs, plus gitignored out/
```

## Naming

Kebab-case, describes the video, not the date or the version. `ga-sizzle-reel`, `orientation`, `before-after`.

## Current

| Production | Serves | State |
|---|---|---|
| [ga-sizzle-reel](ga-sizzle-reel/) | GA Launch Wave 0, debuts in Wave 2 | Brief drafted, awaiting ratification. Capture blocked on the two-surfaces build. |
| [website-demo-slots](website-demo-slots/) | GA Launch Wave 1, the six DemoSlot placements in bemo-website | Two of six live 2026-08-03 (`funderstorm-cycle` on `/products/funderstorm`, `knows-whats-missing` on `/platform`). Four wait on product behavior; see `findings.md`. |
| [academy-lessons](academy-lessons/) | The Academy product surface: the built-in lessons as videos, presented by a HeyGen digital twin per the Academy exception in `docs/01-pipeline.md` | Series brief drafted, awaiting ratification. Roster waits on the discovery probe (`capture/academy-probe.mjs`); twin setup is the long-lead item. |
| [common-table-press-release](common-table-press-release/) | Real work seeded in the app (Harvest Supper press release in the templates / document editor), then a sizzle clip, likely reel 12 of the LinkedIn series | Brief drafted 2026-08-06, awaiting ratification. **Work seeded the same day**: "Press release: Harvest Supper 2026" finished in the app (Complete 5 of 5, quality score 90/100). Clip capture waits on the brief; findings in `findings.md`. |

## Queued

The six foundation videos from [`04-core-video-set.md`](../../bemo-os/docs/communications/narrative-arc/04-core-video-set.md), already specified with their arc phases: orientation, funding workflow, messaging workflow, decision moment, before/after, and "what this is." Each becomes a production when it is next up, not before.
