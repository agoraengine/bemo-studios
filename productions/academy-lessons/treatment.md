# Treatment: Academy Lessons

The shared visual and production system for every lesson video. Ratified with `brief.md` and amended, not forked, when a lesson's structure does not fit. Extends, never overrides, `docs/02-production-standards.md` and the Academy exception in `docs/01-pipeline.md`.

## The lesson grammar

The register is a college lesson, about five minutes: the viewer listens, reads, and watches at once. The presenter is full screen only to open and close; the body of the lesson belongs to the material, with the presenter alongside it.

| Movement | Screen | Sound | Timing |
|---|---|---|---|
| **1. The welcome** | Presenter full screen (waist-up, plain warm-paper backdrop). Lesson title as a lower third. The AI-presenter disclosure appears here (see below). | The presenter speaks the open: the job to be done, in the viewer's terms, before any product noun, then what the next five minutes cover. | ~15-25s |
| **2. The lesson** | Never presenter-full-screen, and **never the Academy course player on camera** (Becky, 2026-08-04: the app's lesson page reads poorly at video scale and doubles the same text; the deck replaces it). Two framings, alternating by what serves the beat: **split screen** (presenter on one side, a designed slide on the other) and **bubble** (presenter in a circular bubble, bottom corner, over the full-bleed slide). Slides are the lecture deck in the **TED register** (Becky, 2026-08-04): one idea per slide, very large type, few words, a single striking phrase or figure, simple graphics and icons where they earn their place, bold color for the moment that must land (the prohibition in red, the green lights in green). Never bullet-dense; the slide punctuates what the voice is saying so the lesson lands twice. One slide per beat, built from `slides.html` per lesson. App capture appears only when a lesson genuinely teaches product UI. | The presenter narrates. Bullets on screen say what the voice is saying, so the lesson lands twice. | The body, ~3-5 min |
| **3. The handle** | Presenter full screen again. Recap of what the viewer can now do, then where this lives in the product ("find this in Academy, or just start the work and ask"). | The presenter. No sell, no CTA beyond the product itself. | ~15-20s |

**Keeping five minutes compelling.** The frame changes every 20-40 seconds: split to bubble, capture to text slide, never one static composition for a minute. The reading layer is what makes it a lesson rather than a monologue: key lines, terms, and steps appear on screen in sync with the narration, so the viewer reads what they are hearing. Text builds progressively (a line lands when it is spoken, prior lines persist as the running outline), set per the type rules below.

**Who the presenter is:** the lesson's product category looks it up in the cast table in `brief.md`: one stock avatar and matched voice per category, never mixed within a category or within a lesson. The cast is the SME-partner future drawn in advance: a partner clearing consent for their category takes over that seat, and nothing else changes.

**Courses are named, never bare-coded** (Becky, 2026-08-05): narration, on-screen text, captions, and docs refer to a course by its name, or by code and name together ("AC-01, Introduction to Nonprofit Advocacy"), never by the code alone. A viewer has no reason to know what AC-04 means; a name teaches, a code doesn't.

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

- One HeyGen render per movement, generated from the locked script text with the lesson's category presenter and its matched voice (the cast table in `brief.md`).
- Movement 2 narration is generated as avatar video too (the split and bubble crops come from it), so voice and lips always agree wherever the presenter is visible.
- **Full-frame, never pillarboxed, never a close-up** (Lee and Becky, 2026-08-04, settled by rendered variants): full-screen presenter segments render as a **background-removed cutout on the branded loft scene** (`removeBackground: true`, `background: {type: image, asset_id: 06368a6aed9d440daeb389eeba7cb603}`, natural waist-up distance, no `fit: cover`). The scene is the bemo brick-loft office (Becky, 2026-08-04, from Lee's set); the boardroom alternate is asset `85c9b25857fe40e581a0ceacd05177c7`, and warm paper `#f6f2e9` is the fallback for any presenter whose cutout fights the scene. One scene per series; every cast member sits in the same room. The pilot v1's white pillarboxing and v2's fit-cover close-up are the two counterexamples.
- **The presenter's scene follows them into every frame, including the bubble** (Becky, 2026-08-05, superseding the plain-bubble rule): bubble segments render with the presenter's scene baked in (`removeBackground` + the scene asset), so the circle shows brick, never a home room or white lobby. Each presenter keeps one scene throughout (Becky the loft, Lee the boardroom).
- **The wall logo appears once: on the welcome** (Becky, 2026-08-05, ratified direction pending assets): every other beat renders on a logo-free variant of the same scene, retiring collision management (`bgCropX`/`avatarCropX` gymnastics) permanently. Brand presence elsewhere comes from the welcome, the slide system, and optionally subtle product placement (a mug on the desk) where the mark is either crisp or deliberately oblique; an AI-warped logo is worse than none. Blocked on Lee regenerating the loft and boardroom without the wall wordmark; the current cuts stand until those assets exist.
- **Captions and the bubble never overlap** (Becky, 2026-08-05): the bubble sits above the caption zone (overlay y = H-h-176) and captions carry a right margin (MarginR) so centered lines stay clear of the bubble corner. Nothing renders text across a face.
- **Pronunciation is managed, not hoped for** (Lee, 2026-08-04): brand words get phonetic treatment (in HeyGen's UI: highlight the word, choose Pronunciation, type the phonetic spelling; the workspace brand glossary is the durable home for these). "BeMo" is the first entry: phonetic **"Bee Mo"** (Becky, 2026-08-04). When generating via API, the phonetic substitution happens in the text sent to HeyGen; `script.md` keeps the real spelling, and captions always burn from the script, never from the TTS text.
- **No `[pause]` directives in API generation text** (Becky, 2026-08-04): on the Avatar V voice path the directive is read aloud as the word "pause" instead of creating silence (pilot v2). Timing comes from segment editing in assemble instead. The UI-side pause feature may behave differently; for API renders the ban is absolute.
- Batches of lessons go through `create_video_batch`; singles through `create_video_from_avatar`. Renders download to `capture/out/<slug>/avatar/`, never into git.

## Assembly

Plan-driven: each lesson's `lessons/<slug>/plan.json` lists segments (avatar full screen, split screen, screen or text slide with bubble, key-line text overlays), and the shared cutter `capture/assemble.mjs` renders it: trims, split and circular-bubble compositing, progressive key lines, caption burn from the locked script, loudnorm to -16 LUFS, delivery variants per standards. Text slides render from HTML the way `super-demo-60/capture/render-cards.mjs` renders cards, or as stills a segment can hold. Naming: `bemo-academy-<slug>-<variant>-v<n>.mp4`.

Dropping the `avatar` track from a plan.json produces the voice-over-capture fallback cut with no other pipeline change. This is the escape hatch if a presenter disappoints; it applies per presenter, not to the whole series.

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
