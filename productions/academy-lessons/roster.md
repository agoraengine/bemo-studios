# Roster: Academy Lessons

The one-glance map of the series. One row per lesson in the app's Academy section. Seeded from the discovery probe (`node capture/academy-probe.mjs`, output at `capture/out/academy/lessons.json`); re-run the probe when Academy gains lessons and append rows, never delete (a lesson removed from the app gets status Retired).

Status ladder, in order: **Discovered → Scripted → Ratified → Generated → Captured → Assembled → Shipped**. Batches of 3-5 move Discovered → Scripted together and are ratified together (per `brief.md`). Detail lives in each lesson's `lessons/<slug>/` folder; this table holds status only.

Presenter comes from the cast table in `brief.md`: one stock avatar per product category, so the column holds the cast name (Daphne, and the rest as the audition assigns them). A category never mixes presenters. An SME partner clearing consent for their category takes over those rows, nothing else changes.

The catalog was fully probed 2026-08-04: **270 courses across 10 categories**, all content captured to `capture/out/academy/lessons.json`. The per-course table lives in [roster-courses.md](roster-courses.md) (generated from the dump; status is the only hand-maintained column). This table is the category view, which is also the cast view:

| Category | Prefix | Courses | Presenter seat | First mover |
|---|---|---|---|---|
| Advocacy & Civic Engagement | AC | 30 | pending cast | **AC-01 scripted as the full-length pilot** |
| AI for Nonprofits | AI | 25 | pending cast | |
| Communications & Marketing | CM | 34 | pending cast | |
| Fund Development | FD | 35 | pending cast | |
| Finance & Operations | FO | 30 | pending cast | |
| People & Leadership | PL | 35 | pending cast | |
| Personal Growth | PG | 25 | pending cast | |
| Program Impact | PI | 25 | pending cast | |
| Strategy & Governance | SG | 30 | pending cast | |
| Featured | LPA | 1 | pending cast | |

## How the pilot works

The presenter seat is settled first by the audition round (`brief.md`): the same sample passage rendered across several stock avatars, Becky picks from the finished renders. Then the first lesson she picks runs alone, end to end, before any batch opens: script → Becky ratifies → presenter generation → capture → assemble → Becky reviews the finished video. The pilot is where the format (welcome, split/bubble body, reading layer) gets accepted or adjusted; the fallback if the presenter disappoints is voice-over-capture.
