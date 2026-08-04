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
| [website-demo-slots](website-demo-slots/) | GA Launch Wave 1, the six DemoSlot placements in bemo-website | In production 2026-08-03. Specs ratified in `bemo-website/DEMOS.md`; capturing against the real app. |

## Queued

The six foundation videos from [`04-core-video-set.md`](../../bemo-os/docs/communications/narrative-arc/04-core-video-set.md), already specified with their arc phases: orientation, funding workflow, messaging workflow, decision moment, before/after, and "what this is." Each becomes a production when it is next up, not before.
