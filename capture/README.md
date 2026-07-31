# Capture

Shared helpers for Playwright capture runs. Per-production capture scripts live in `productions/<slug>/capture/run.mjs` and import from `lib/`.

## Why capture is scripted

The run is repeatable. No fumbled cursor, no mistyped field, no "let me start that again." When the UI changes, re-run the script and get clean footage instead of rebooking a recording session.

That is the whole argument, and it is worth more the earlier the product is. The app is mid-build, so this footage will be recaptured more than once.

## Helpers

| File | What it does |
|---|---|
| `lib/viewport.mjs` | Standard capture viewport (2560x1440) and device scale |
| `lib/pacing.mjs` | Dwell times, typing speed, scroll easing. Real UI is faster than a viewer can read. |
| `lib/redact.mjs` | Blur or replace anything that should not be on screen |

## Setup

```
npm install
npx playwright install chromium
```

## Running a capture

Use the `capture-run` skill in Claude Code, which writes the script and drives the run. To run one manually:

```
node productions/<slug>/capture/run.mjs --shot S3
```

Output lands in `productions/<slug>/capture/out/`, which is gitignored. Upload to Drive and link it in the production's `assets.md`.
