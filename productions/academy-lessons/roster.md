# Roster: Academy Lessons

The one-glance map of the series. One row per lesson in the app's Academy section. Seeded from the discovery probe (`node capture/academy-probe.mjs`, output at `capture/out/academy/lessons.json`); re-run the probe when Academy gains lessons and append rows, never delete (a lesson removed from the app gets status Retired).

Status ladder, in order: **Discovered → Scripted → Ratified → Generated → Captured → Assembled → Shipped**. Batches of 3-5 move Discovered → Scripted together and are ratified together (per `brief.md`). Detail lives in each lesson's `lessons/<slug>/` folder; this table holds status only.

| # | Lesson | Slug | App route | Batch | Status |
|---|---|---|---|---|---|
| | _pending probe run_ | | | | |

## How the pilot works

The first lesson Becky picks runs alone, end to end, before any batch opens: script → Becky ratifies → twin generation → capture → assemble → Becky reviews the finished video. The pilot is where the twin's look and voice get accepted or the series falls back to voice-over-capture.
