---
name: academy-lesson
description: Run Academy lessons through the lesson-video pipeline at scale, from the roster in productions/academy-lessons/ to shipped videos, batching scripts for Becky's review and then generating (HeyGen twin), capturing, and assembling unattended. Use for scripting, generating, or shipping Academy lesson videos.
---

# Academy Lesson

Moves lessons through `productions/academy-lessons/` along the roster's status ladder: Discovered → Scripted → Ratified → Generated → Captured → Assembled → Shipped. The series was designed in one pass (2026-08-03); `brief.md` and `treatment.md` are its contract, and this skill executes them. It never re-decides what they settled.

## Gates, in order

1. **Series brief ratified.** `productions/academy-lessons/brief.md` must say RATIFIED. If DRAFT, stop and say so.
2. **The presenter exists.** One generic stock avatar presents every lesson (brief.md; no founder twin, per Becky 2026-08-04). The brief's decision table must hold a real `avatar_id`/`voice_id`, settled by the audition round. If pending, run the audition, not a substitute. Never put Becky's voice on the presenter.
3. **Roster seeded.** If `roster.md` has no lesson rows, run discovery first: Becky runs `node capture/login.mjs`, then `node capture/academy-probe.mjs`, then seed the roster from `capture/out/academy/lessons.json` (one row per lesson, status Discovered, no batch assigned, product area from the lesson's subject, presenter Generic). A lesson whose product area is ambiguous gets flagged for Becky, not guessed. Log any surprises about Academy's structure to the production's `findings.md`.
4. **Audition before pilot, pilot before batches.** The presenter seat is settled by the audition round in the brief: one short sample passage rendered across several stock avatars with their matched voices, reviewed by Becky as finished renders side by side (never described to her in place of rendering). Until she ratifies one into the decision table, nothing pilots. Then, until one lesson has Shipped status, exactly one lesson (Becky's pick) moves at a time; batch mode opens only after she approves the finished pilot, which is also where the college-lesson format (welcome, split/bubble body, reading layer) gets accepted or adjusted.

## Scripting a batch (Discovered → Scripted)

Take the next 3-5 lessons in Discovered (or the pilot alone). For each:

1. Read the lesson's own content from the probe dump. The lesson is the source; the video invents no curriculum. If the dump is stale (app changed), re-run the probe rather than trusting it.
2. Read canon fresh, per the `video-script` skill's rules: message map, voice and tone, anti-patterns, claim map, and `customer-stories/00-overview.md` (never from memory). All of `CLAUDE.md`'s hard rules apply: no em dashes, no AI tells, claims trace.
3. Write `lessons/<slug>/script.md` (from `templates/script.md`) to the treatment's three-movement grammar: the welcome, the lesson, the handle. The open names the job, not the feature. The script's on-screen column carries the reading layer (the key lines that build as the running outline) beat by beat, because the viewer reads what they hear. Claim trace cites the lesson content for teaching claims and the message/claim map for anything about BeMo. Clock check at ~150 wpm against the brief's 4-6 minute target (a 5-minute lesson is roughly 700-750 narrated words; frame changes every 20-40s per the treatment).
4. Write `lessons/<slug>/shot-list.md` with app paths from the probe's URLs. If movement 2 needs interaction beyond scrolling the lesson page, also write `lessons/<slug>/capture.mjs` (default export `run({ page, mark, helpers })`; the runner supplies `assertLoggedIn`, `assertDemoOrg`, `stableAnswer`, `typeAndSend`, pacing).
5. Set roster status to Scripted with a batch number.

## The batch gate (Scripted → Ratified)

Present the batch to Becky as one review: per lesson, the script, its measured read time, and anything that would not trace. She ratifies the batch (or pulls individual lessons back to Scripted with notes). Only ratified lessons proceed. Record the ratification date in each script's change log.

## Production (Ratified → Shipped), unattended per lesson

1. **Generate.** One HeyGen render per movement from the locked script text, using the series presenter (`avatar_id` + matched voice from the brief's decision table): `create_video_from_avatar` for singles, `create_video_batch` + `bulk_video_statuses` polling for batches. Download renders to `productions/academy-lessons/capture/out/<slug>/avatar/` (gitignored). VO matches the locked script word for word; if a read demands a change, change the script first (it drops back to Scripted for re-ratification). Roster → Generated.
2. **Capture.** Becky (or a fresh session) runs `node capture/login.mjs`, then `node productions/academy-lessons/capture/run.mjs <slug>` per lesson. Sessions expire ~1h: the runner stops cleanly on expiry, and the roster makes resuming per-lesson cheap. Roster → Captured.
3. **Assemble.** Write `lessons/<slug>/plan.json` (schema in the assemble script's header) and run `node productions/academy-lessons/capture/assemble.mjs lessons/<slug>/plan.json`. Captions come from the locked script as an `.srt` in the lesson folder. Roster → Assembled.
4. **Standards check.** The full checklist in `docs/02-production-standards.md` (including the Academy lesson length row), plus the series' own: the disclosure chip is visible on the first avatar frame, the frame changes at least every 40 seconds through the body, and nothing in the presenter's mouth is testimonial. A failure is fixed in script or plan, never waved through.
5. **Ship.** Upload to Drive (per-lesson subfolder), record links in `assets.md`, roster → Shipped. Findings (product oddities, lesson content errors, canon conflicts) go to `findings.md`, never fixed in the siblings.

## The fallback

If a presenter disappoints (Becky's call at that presenter's pilot), its lessons ship voice-over-capture: drop avatar segments and `pip` keys from each `plan.json`, generate VO only, and the rest of the pipeline is unchanged. The brief records the switch per presenter; the other presenter's lessons are unaffected.
