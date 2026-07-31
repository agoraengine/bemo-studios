---
name: capture-run
description: Write and execute a Playwright capture script that drives the real BeMo app through a shot list and records video. Use when a production's script is written and footage is needed.
---

# Capture Run

Writes `productions/<slug>/capture/run.mjs` and executes it, producing recorded footage for every `screen` shot in the shot list.

## Gate

The script and shot list must exist, with the app path column filled for every `screen` shot. If app paths are missing, the shot list is not finished; go back to `video-script`.

## Two capture targets

**The product.** Ask the user for the URL and how to reach it (local dev server, a deployed environment, credentials). Do not guess and do not assume a previous session's answer still holds; the app is mid-build, and much of what a video wants to show may not exist yet.

**The website.** `../bemo-website` is capturable today. Run it locally rather than capturing what is deployed:

```
cd ../bemo-website && npm run dev
```

Local capture means footage does not depend on what is live, and a page can be captured from a branch before that branch ships. Check `../bemo-os/docs/initiatives/website/ga-website-edits-v2.md` first: if the copy on the page is about to change, capturing it now buys a recapture later.

## Before writing anything

**Confirm the demo org.** Capture uses seeded demo data, never a real customer's workspace. This is a hard rule in `CLAUDE.md`, and the reason is practical as well as ethical: a real org's data on screen is a permission problem that surfaces after the video ships.

**Check which Playwright MCP is installed.** The official server and the community record server expose different tool names for recording. Verify before writing, per `docs/01-pipeline.md`.

## Writing the capture script

Structure `run.mjs` as one function per shot ID, so a single shot can be recaptured without rerunning everything. That matters more than it sounds: most recapture is one shot, not the whole reel.

```
S1() → navigate, wait for stable, record, stop
S2() → ...
```

Use the helpers in `capture/lib/`:

- `viewport.mjs` — standard 2560x1440 capture viewport and device scale
- `pacing.mjs` — dwell times, typing speed, scroll easing
- `redact.mjs` — blur or replace anything that should not be on screen

**Rules that make footage usable:**

- **Capture at 2560x1440**, downscale on export. Capturing at delivery resolution leaves no crop or push-in room, and the edit always wants some.
- **Pace deliberately.** Real UI moves faster than a viewer can read. Use `pacing.mjs` defaults rather than raw Playwright timing, which is instant.
- **Type at human speed.** `page.type()` with a delay, not `fill()`. Instant text appearing in a field reads as fake, and viewers notice without knowing why.
- **Wait for stable, not for load.** Wait for the specific element the shot is about, plus a beat. Screenshots taken at load fire mid-animation.
- **Hold at the end of each shot.** Two extra seconds on the final frame gives the edit somewhere to cut.
- **Capture more than the list asks.** Extra passes of the same flow cost one run and save a reshoot.

## Running

Run each shot, then check it. Do not run the whole list and review at the end: a viewport or data problem on S1 usually affects every shot after it, and finding that out at S12 wastes the run.

Output goes to `productions/<slug>/capture/out/`, which is gitignored.

## After the run

1. **Check off the shot list.** Every `screen` row gets its Captured box ticked, or an explicit note about what is still missing. This is the capture gate.
2. **Fill capture notes**: which demo org, what was redacted, what needed multiple takes.
3. **Log findings.** UI problems noticed during capture go in `findings.md` for Lee. They do not get fixed in the edit; `docs/02-production-standards.md` is explicit that product UI text is never edited in post.
4. **Upload raw footage to Drive** and link it in `assets.md`.

## When capture is blocked

The app is mid-build, and the two-surfaces work gates real screenshots for the website as well as footage here. If the UI a shot needs does not exist yet, say so plainly and mark the shot blocked in the shot list with what it is waiting on. Do not substitute a mockup: rule 4 in `CLAUDE.md` exists because a mockup presented as product is the kind of thing that gets noticed later, by the wrong person.
