---
name: academy-lesson
description: Run Academy lessons through the lesson-video pipeline at scale, from the roster in productions/academy-lessons/ to shipped videos, batching scripts for Becky's review and then generating (HeyGen twin), capturing, and assembling unattended. Use for scripting, generating, or shipping Academy lesson videos.
---

# Academy Lesson

Moves lessons through `productions/academy-lessons/` along the roster's status ladder: Discovered → Scripted → Ratified → Generated → Captured → Assembled → Shipped. The series was designed in one pass (2026-08-03); `brief.md` and `treatment.md` are its contract, and this skill executes them. It never re-decides what they settled.

## Gates, in order

1. **Series brief ratified.** `productions/academy-lessons/brief.md` must say RATIFIED. If DRAFT, stop and say so.
2. **The lesson's cast seat exists.** Presenters come from the cast table in brief.md: one stock avatar per product category, each with its own matched American English voice (no founder twin, per Becky 2026-08-04). The lesson's category must have a real `avatar_id`/`voice_id` in the table, settled by the audition round. If pending, run the audition for that seat, not a substitute. Never swap presenters across categories, and never put Becky's voice on any cast member.
3. **Roster seeded.** If `roster.md` has no lesson rows, run discovery first: Becky runs `node capture/login.mjs`, then `node capture/academy-probe.mjs`, then seed the roster from `capture/out/academy/lessons.json` (one row per lesson, status Discovered, no batch assigned, product area from the lesson's subject, presenter Generic). A lesson whose product area is ambiguous gets flagged for Becky, not guessed. Log any surprises about Academy's structure to the production's `findings.md`.
4. **Audition before pilot, pilot before batches.** The presenter seat is settled by the audition round in the brief: one short sample passage rendered across several stock avatars with their matched voices, reviewed by Becky as finished renders side by side (never described to her in place of rendering). Until she ratifies one into the decision table, nothing pilots. Then, until one lesson has Shipped status, exactly one lesson (Becky's pick) moves at a time; batch mode opens only after she approves the finished pilot, which is also where the college-lesson format (welcome, split/bubble body, reading layer) gets accepted or adjusted.

## Scripting a batch (Discovered → Scripted)

Take the next 3-5 lessons in Discovered (or the pilot alone). For each:

1. Read the lesson's own content from the probe dump (`capture/out/academy/lessons.json`, the course's full player text). The lesson is the source; the video invents no curriculum. If the dump is stale (app changed), re-run the probe rather than trusting it.
2. Read canon fresh, per the `video-script` skill's rules: message map, voice and tone, anti-patterns, claim map, and `customer-stories/00-overview.md` (never from memory). All of `CLAUDE.md`'s hard rules apply: no em dashes, no AI tells, claims trace. Carry the course's own disclaimers into the reading layer (AC-01's "not legal advice" note is the model).
3. Write `lessons/<slug>/script.md` (from `templates/script.md`) to the treatment's three-movement grammar: the welcome, the lesson, the handle. The open names the job, not the feature. One beat per VO segment; each body beat names its slide in the on-screen column. Claim trace cites the lesson content for teaching claims and the message/claim map for anything about BeMo. Clock check at ~150 wpm; a compact Reading makes a compact lesson (AC-01 runs 2:44), never pad.
4. Write `lessons/<slug>/slides.html`: the TED-register deck per the treatment (one idea per slide, huge type, bold color where the moment lands), with the shared CSS pattern from AC-01, `?slide=<id>` selection and `?w=half` variants for every slide a split beat uses. App capture replaces a slide only when the lesson teaches product UI; then write `lessons/<slug>/capture.mjs` (default export `run({ page, mark, helpers })`; always re-navigate after a login redirect and verify the target surface before recording; never Home).
5. Set roster status to Scripted with a batch number.

## The batch gate (Scripted → Ratified)

Present the batch to Becky as one review: per lesson, the script, its measured read time, and anything that would not trace. She ratifies the batch (or pulls individual lessons back to Scripted with notes). Only ratified lessons proceed. Record the ratification date in each script's change log.

## Production (Ratified → Shipped), unattended per lesson

The exact recipe, proven end to end on AC-01 (2026-08-04):

1. **Generate VO.** One HeyGen render per beat from the locked script text, using the lesson's category presenter (`avatar_id` + matched voice from the brief's cast table): `create_video_from_avatar` for singles, `create_video_batch` + `bulk_video_statuses` polling for batches. Flags that matter: `engine: avatar_v` for twins (`avatar_iii` for public studio looks, which reject Avatar IV); **welcome, handle, and every split beat** render with `removeBackground: true` and the loft scene (`background: {type: image, asset_id: 06368a6aed9d440daeb389eeba7cb603}`); **bubble beats render plain**. Generation-text substitutions (never in script.md or captions): "Bee Mo" for BeMo, phonetics for anything the voice mangles ("five oh one C three", "H B four twelve"); **no `[pause]` directives ever** (the voice reads them aloud). Download each render by writing its signed URL to a file and curling from it (hand-copied URLs corrupt), into `productions/academy-lessons/capture/out/<slug>/avatar/` (gitignored). VO matches the locked script word for word; if a read demands a change, change the script first (it drops back to Scripted for re-ratification). Roster → Generated.
2. **Render slides.** Headless Chromium screenshots of the lesson's `slides.html`: 1920x1080 viewport for full-bleed slides, 960x1080 with `&w=half` for every slide a split beat uses (a full-width slide cover-cropped into the split pane loses its text). Output to `capture/out/<slug>/slides/`.
3. **Capture** (only when the lesson teaches product UI). `node productions/academy-lessons/capture/run.mjs <slug>`: headed, signs in interactively in its own window when the profile has no session, resumes itself, re-navigates after login redirects, and refuses to record the wrong surface. Never Home. Roster → Captured.
4. **Captions.** The `gen-captions.mjs` pattern from AC-01: probe each downloaded render's real duration with ffmpeg, spread the script's sentences across each segment proportionally, write `captions.srt`. Captions carry the script's real spellings, never the phonetic generation text.
5. **Assemble.** Write `lessons/<slug>/plan.json` (schema in the assemble script's header: avatar / split / screen+bubble segments, still-image slides by `duration`, `captions`), then `node productions/academy-lessons/capture/assemble.mjs lessons/<slug>/plan.json`. Output lands beside the plan as `bemo-academy-<slug>-primary-v<n>.mp4`. Roster → Assembled.
6. **Standards check.** The full checklist in `docs/02-production-standards.md` (including the Academy lesson length row), plus the series' own: the disclosure chip on the first avatar frame, the loft behind the presenter in every visible frame except the bubble, no course player in the body, the frame changing at least every 40 seconds, nothing testimonial in the presenter's mouth. Verify with extracted frames, never by assumption. A failure is fixed in script, slides, or plan, and never waved through.
7. **Ship.** Upload to Drive (per-lesson subfolder), record links in `assets.md`, roster → Shipped. Findings (product oddities, lesson content errors, canon conflicts) go to `findings.md`, never fixed in the siblings.

## The fallback

If a presenter disappoints (Becky's call at that presenter's pilot), its lessons ship voice-over-capture: drop avatar segments and `pip` keys from each `plan.json`, generate VO only, and the rest of the pipeline is unchanged. The brief records the switch per presenter; the other presenter's lessons are unaffected.
