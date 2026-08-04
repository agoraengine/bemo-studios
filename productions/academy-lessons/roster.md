# Roster: Academy Lessons

The one-glance map of the series. One row per lesson in the app's Academy section. Seeded from the discovery probe (`node capture/academy-probe.mjs`, output at `capture/out/academy/lessons.json`); re-run the probe when Academy gains lessons and append rows, never delete (a lesson removed from the app gets status Retired).

Status ladder, in order: **Discovered → Scripted → Ratified → Generated → Captured → Assembled → Shipped**. Batches of 3-5 move Discovered → Scripted together and are ratified together (per `brief.md`). Detail lives in each lesson's `lessons/<slug>/` folder; this table holds status only.

Presenter is **Generic** (the series' one stock avatar, `brief.md`) for every lesson. The column exists for the SME-partner future: a partner clearing consent for their area changes those rows to their name, nothing else.

| # | Lesson | Slug | Product area | Presenter | App route | Batch | Status |
|---|---|---|---|---|---|---|---|
| | _pending probe run_ | | | | | | |

## How the pilot works

The presenter seat is settled first by the audition round (`brief.md`): the same sample passage rendered across several stock avatars, Becky picks from the finished renders. Then the first lesson she picks runs alone, end to end, before any batch opens: script → Becky ratifies → presenter generation → capture → assemble → Becky reviews the finished video. The pilot is where the format (welcome, split/bubble body, reading layer) gets accepted or adjusted; the fallback if the presenter disappoints is voice-over-capture.
