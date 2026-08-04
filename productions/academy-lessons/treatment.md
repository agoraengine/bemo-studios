# Treatment: Academy Lessons

The shared visual and production system for every lesson video. Ratified with `brief.md` and amended, not forked, when a lesson's structure does not fit. Extends, never overrides, `docs/02-production-standards.md` and the Academy exception in `docs/01-pipeline.md`.

## The lesson grammar

Three movements, every lesson:

| Movement | Screen | Sound | Timing |
|---|---|---|---|
| **1. The job** | Avatar full-frame (twin, waist-up, plain warm-paper backdrop). Lesson title as a lower third. The AI-presenter disclosure appears here (see below). | Twin speaks the open: the job to be done, in the viewer's terms, before any product noun. | ~8-12s |
| **2. The work** | Screen capture of the real app doing the lesson's subject, twin in picture-in-picture (bottom-right, ~22% frame width, rounded corners per the site's soft geometry). PiP drops out entirely when the screen needs full attention; voice carries. | Twin narrates over the capture. Pacing per `capture/lib/pacing.mjs`: the UI never moves faster than the narration explains it. | The body of the runtime |
| **3. The handle** | Avatar full-frame again. One-line recap of what the viewer can now do, then where this lives in the product ("find this in Academy, or just start the work and ask"). | Twin. No sell, no CTA beyond the product itself. | ~6-10s |

The open follows the problem-first rule at lesson scale: the first sentence names the job ("A new board member starts Monday"), not the feature ("Academy's onboarding module").

## The disclosure

Condition 2 of the Academy exception, non-negotiable, checked at the standards gate:

- On screen from the first frame of movement 1, minimum 3 seconds: a small chip in the lower third area, `AI-generated presenter`, set in the site's body face at caption size, ink-muted on a soft surface chip (same construction as the "fictitious" chip in super-demo-60).
- It reappears whenever the avatar returns full-frame after an absence of more than 30 seconds.

## Look and feel

The video is the website's front door continued, per `../../../bemo-website/DESIGN.md` (v4 direction; tokens in the site's `app/globals.css` are source of truth, re-read at render time, never copied here):

- Type: Bricolage Grotesque for display (lesson title card), Geist for captions, lower thirds, and chips.
- Surfaces: warm paper backdrop for avatar frames; deep navy ink for text.
- Product color: if a lesson belongs to one product's area, that product's family color (brass, sage, clay, ocean) may tint the lower third, at the site's identifier-not-decoration restraint.
- Captions: burned in, 2-line max, Geist on a soft chip, `.srt` sidecar, per `docs/02-production-standards.md`.

## Capture

- Real app, Common Table demo org only (`demo-org/common-table/`), `assertDemoOrg` guard active in every run. Known trap: Home and any pre-wipe document are un-filmable in the Common Table universe (see `website-demo-slots/findings.md`); every take starts fresh.
- Per-lesson runs: `node productions/academy-lessons/capture/run.mjs <lesson-slug>` reads the lesson's `shot-list.md` states and records to `capture/out/<slug>/`.
- 1920x1200 viewport (matches the working harness; the 2560x1440 standard applies when a lesson needs crop room, flag it in the lesson's shot list).

## Avatar generation

- One HeyGen render per avatar movement (movement 1 and movement 3, plus any mid-lesson full-frame returns), generated from the locked script text with the twin's avatar_id and matched voice (ids in `brief.md`).
- Movement 2 narration is generated as audio-led avatar video too (the PiP crop comes from it), so voice and lips always agree.
- Batches of lessons go through `create_video_batch`; singles through `create_video_from_avatar`. Renders download to `capture/out/<slug>/avatar/`, never into git.

## Assembly

Plan-driven: each lesson's `lessons/<slug>/plan.json` lists segments (avatar full-frame, screen capture with PiP window, title card), and the shared cutter `capture/assemble.mjs` renders it: trims, PiP compositing, caption burn from the locked script, loudnorm to -16 LUFS, delivery variants per standards. Naming: `bemo-academy-<slug>-<variant>-v<n>.mp4`.

Dropping the `avatar` track from a plan.json produces the voice-over-capture fallback cut with no other pipeline change. This is the series' escape hatch if the twin disappoints.

## Per-lesson files

```
productions/academy-lessons/
  lessons/<slug>/
    script.md      from templates/script.md; claim trace cites the lesson's own
                   content (probe dump) first, message/claim map for BeMo claims
    shot-list.md   from templates/shot-list.md; app paths from the probe's URLs
    plan.json      the assembly plan; written at assemble time
```

The roster (`roster.md`) is the one-glance index; status lives there and nowhere else.
