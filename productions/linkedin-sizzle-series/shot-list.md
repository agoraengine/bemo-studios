# Shot List: LinkedIn Sizzle Series

**Capture state:** COMPLETE (reel 1, both cuts)
**Last run:** 2026-08-02
**Build captured against:** n/a (all reel 1 shots render from an animated capture source, same pipeline as `../ga-sizzle-reel/capture/`; no app build required)

Check off each shot when usable footage exists. The capture gate is every row checked.

*This production renders animation scenes with the GA sizzle's Playwright pipeline: a `capture/source.html` per reel (vertical 1080x1920 primary, 16:9 secondary), recorded and encoded with ffmpeg-static. No shot in reel 1 touches the app, so no shot here is type `screen` and Lee is not needed for this reel.*

*`screen` shots in later reels may be sourced three ways: the Playwright capture pipeline, manual screenshots, or Supademo recordings (Becky, 2026-08-02). All three count as real product for rule 4 purposes only if they capture the real app or site with seeded demo data. Screenshots and Supademo exports are media: they live in Drive and get linked in `assets.md`, never committed to git. Product UI text is never edited in post regardless of source; wrong UI text is a finding for Lee.*

## Reel 1: Starting From Zero

| ID | What is on screen | Type | Duration | App path | Captured |
|---|---|---|---|---|---|
| R1-S1 | Generic AI chat frame (no vendor branding), empty thread. Typing animation into the input: "We're a small nonprofit. Our mission is..." Caption bottom of safe area: "Monday. A new chat." | title | 0:06 | n/a; adapt scene `s1` from `../ga-sizzle-reel/capture/source-30.html`, add typing animation | [x] |
| R1-S2 | Second chat, visually distinct thread (fresh session), same sentence typing from the first character. Caption: "Thursday. From the top." | title | 0:07 | n/a; duplicate of R1-S1 scene with reset state | [x] |
| R1-S3 | Third empty chat, cursor blinking, nothing typed. Headline resolves: "Every one starts from zero." | title | 0:04 | n/a; existing `s1` end state, headline `#s1h` reused verbatim | [x] |
| R1-S4 | Thesis headline "BeMo is where your organization's knowledge lives." with "You never start over." resolving beneath | title | 0:07 | n/a; existing scene `s2`, add the single subline (not the three-phrase build) | [x] |
| R1-S5 | Wordmark, tagline "Where missions gain momentum.", CTA line "The beta is open. bemointel.ai", held to end plus 2s tail | title | 0:06 | n/a; existing scene `s7` with CTA line replacing the close subline | [x] |

Additional shots for the 60-second cut (script v1.1):

| ID | What is on screen | Type | Duration | App path | Captured |
|---|---|---|---|---|---|
| R1-S6 | Thesis headline with the three phrases resolving ("Conversation first. Memory preserved. You never start over.") | title | 0:08 | n/a; existing GA sizzle scene `s2`, unchanged | [x] |
| R1-S7 | Four fragments (email, call note, spreadsheet, message) drifting in and resolving into one organized record | title | 0:12 | n/a; existing GA sizzle scene `s3`, unchanged | [x] |
| R1-S8 | Live app footage: the Templates gallery scrolling (real deliverable templates) | screen | 0:05 | Recorded from app.bemointel.ai via the session pipeline (`capture/live-clips.mjs`), clip `out/live-funderstorm-template.webm` t 5.0+ | [x] |
| R1-S9 | The pillar line above a FunderStorm screen showing a grant cycle carrying forward (last award, upcoming renewal) | screen | 0:06 | FunderStorm, seeded demo org: a funder page or pipeline view with prior-cycle context visible. Screenshot or Supademo frame, 2560 wide, saved to `capture/assets/funderstorm.png`. Becky can grab it; Lee if seeding is needed. Approved funder-page art stands in until then | [ ] blocked on the real capture |

Capture order note: R1-S1, R1-S2, R1-S3 are one scene template in three states; build once, parameterize. R1-S4 and R1-S5 are existing GA sizzle scenes with one text change each. The 60s cut adds three unchanged GA sizzle scenes (s2, s3, s3b) and one new text card; the GA sizzle scenes were composed 16:9, so the vertical-first render needs a reflow check on s3's fragment layout.

## Batch 2: the headline reels (DRAFT scripts, 2026-08-05; capture not started)

Grouped by capture source, not by reel: the title-card pipeline builds one source per reel; the site scenes film in one Playwright session against the preview build (Reel 1W pipeline, `capture/site-tour.mjs` grammar); the one real-product clip already exists.

| ID | What is on screen | Type | Duration | App path / source | Captured |
|---|---|---|---|---|---|
| R8-S1 | Generic tool windows piling (mail, sheet, docs, chat, calendar, folders; no vendor branding), headline resolves: the six-tools line verbatim | title | 0:08 | n/a; new scene, ghost-window pile grammar from `source-commercial.html` | [x] |
| R8-S2 | The site's front-page assembly: fragments snap into the Common Table weekly edition; three caption phrases land in sync; provenance line small | site | 0:09 | Preview build home, trackA scroll segment (beats 2-3), filmed at 1080p with dev chrome hidden | [x] |
| R8-S3 | The edition's "One thing worth a look" ask, then the grey invitation slot; the in-play/missing line on screen | site | 0:06 | Preview build home, trackA end state (fp-piece sect + invite) | [x] |
| R8-S4 | "Nothing drops on the floor." alone on navy | title | 0:03 | n/a; navy card grammar from 1C | [x] |
| R8-S5 | Brand close | title | 0:04 | n/a; existing close scene | [x] |
| R8H-S4 | The first-platform thesis as headline; memory diagram draws beneath | site | 0:08 | Same scene as R9-S2; one capture serves both | [x] |
| R8H-S5 | Four icons cascade | title | 0:04 | n/a; existing R1-S10 | [x] |
| R8H-S6 | Real finished Amplify letter, cropped to body | title | 0:06 | Existing reel 1 60s scene (R1-S8 family), unchanged | [x] existing |
| R8H-S7 | Jen receipt card with hour-vs-three-days headline | title | 0:06 | n/a; 1D Jen card scene with new headline line | [x] |
| R8H-S8 | "Nothing drops on the floor." / "And nothing walks out the door." land in turn on navy | title | 0:05 | n/a; navy card grammar | [x] |
| R8H-S9 | Brand close, held plus tail | title | 0:08 | n/a; existing | [x] |
| R9-S1 | Two app windows drifting apart, hairline never connects; headline "None of your tools have met." | title | 0:08 | n/a; new scene | [ ] |
| R9-S2 | The first-platform sentence as headline; memory diagram draws beneath | site | 0:08 | Preview build how-it-works memflow section, or rebuilt in the title pipeline if the film needs tighter sync | [ ] |
| R9-S3 | Four icons cascade | title | 0:04 | n/a; existing R1-S10 scene unchanged | [ ] |
| R9-S4 | Finished report resolves left; grant draft right pulls the same facts, sourced; provenance line | title | 0:06 | n/a; new split scene, fictional Common Table facts only (fact-sheet.md is source of truth) | [ ] |
| R9-S5 | Brand close | title | 0:04 | n/a; existing | [ ] |
| R10-S1 | "Every AI sounds confident." replaced by "Software that knows what it doesn't know." | title | 0:08 | n/a; dark-card grammar from 1C | [ ] |
| R10-S2 | KB receipts: funder page with source line and page history | site | 0:06 | Preview build how-it-works trackK scene k1 (Bright Harbor page) | [ ] |
| R10-S3 | Real product: chat names what it has, what it lacks, offers to record it | screen | 0:07 | Existing capture `bemo-website/public/demos/knows-whats-missing.mp4` (Drive master in demo-slots assets.md); crop per the 16:9 display rule | [x] existing |
| R10-S4 | Quote card, verbatim; attributed Maryellen Duggan, Executive Director, Caigh It Forward Foundation (resolved, Becky Aug 5) | title | 0:05 | n/a; quote-card grammar from 1D's Jen card | [ ] |
| R10-S5 | Trust line, brand close | title | 0:04 | n/a; existing | [ ] |
| R11-S1 | Bright generic app window dims, gathers clutter; headline "Most software peaks on day one." | title | 0:09 | n/a; new scene | [ ] |
| R11-S2 | Memory build: fragments land, record grows | title | 0:08 | n/a; GA sizzle s3 scene grammar, 16:9 | [ ] |
| R11-S3 | The hundredth-interaction line over the compounding curve | title | 0:06 | n/a; curve redrawn from the site About chart grammar (no screenshot needed) | [ ] |
| R11-S4 | "Nothing resets. The work compounds." on navy | title | 0:03 | n/a | [ ] |
| R11-S5 | Brand close | title | 0:04 | n/a; existing | [ ] |
| R12-S1 | "The new AI assistants know your inbox. BeMo knows your organization." two halves landing (vendor-blind per Becky Aug 5) | title | 0:07 | n/a | [ ] |
| R12-S2 | Small circle "your day" inside large circle "your organization" | title | 0:08 | n/a; new diagram scene | [ ] |
| R12-S3 | The large circle fills into the memory graph | site | 0:08 | Preview build Mission Network section, or title-pipeline redraw | [ ] |
| R12-S4 | "Built for the organization, not just the person in the chair." | title | 0:03 | n/a | [ ] |
| R12-S5 | Brand close | title | 0:04 | n/a; existing | [ ] |

## Reels 2 through 7 (DRAFT scripts, 2026-08-05; capture not started)

| ID | What is on screen | Type | Duration | App path / source | Captured |
|---|---|---|---|---|---|
| R2-S1 | Headline "Knowing what to do was never the problem." | title | 0:07 | n/a | [ ] |
| R2-S2 | Ghost copies of one document stacking; captions "rebuilt / re-explained / hunted down"; headline "The reconstruction tax." | title | 0:08 | n/a; ghost-pile grammar from `source-commercial.html` | [ ] |
| R2-S3 | Signature line alone on light card | title | 0:05 | n/a | [ ] |
| R2-S4 | Stack collapses into one growing record; "Nothing resets." | title | 0:06 | n/a; GA sizzle s3 grammar | [ ] |
| R2-S5 | Brand close | title | 0:04 | n/a; existing | [ ] |
| R3-S1 | "The first month is archaeology." over a dig through drives, inboxes, a binder | title | 0:09 | n/a; new scene | [ ] |
| R3-S2 | The catch-her-up ask typed; briefing composes with source lines; provenance "Illustrated · fictional organization" | title | 0:10 | n/a; ask-and-answer grammar from the site's demo section, Common Table facts only | [ ] |
| R3-S3 | "It already knew." on navy | title | 0:03 | n/a; existing 1C card | [ ] |
| R3-S4 | Roof line resolves | title | 0:04 | n/a; existing s2 scene | [ ] |
| R3-S5 | Brand close | title | 0:04 | n/a; existing | [ ] |
| R4-S1 | Headline "The annual report took about an hour." eyebrow: Jennifer Allen, Friends of the Saratoga Springs Public Library | title | 0:09 | n/a | [ ] |
| R4-S2 | Real Amplify annual-report flow; provenance "Captured from the product" | screen | 0:07 | Existing capture `bemo-website/public/demos/amplify-in-flow.mp4`; crop per the 16:9 display rule | [x] existing |
| R4-S3 | Jen quote card, verbatim, attributed | title | 0:06 | n/a; 1D Jen card exists, reuse | [x] existing scene |
| R4-S4 | Amplify lead message card | title | 0:04 | n/a | [ ] |
| R4-S5 | Brand close | title | 0:04 | n/a; existing | [ ] |
| R5-S1 | Headline "Where does what you know live?" | title | 0:08 | n/a | [ ] |
| R5-S2 | Four labeled fragments (processes, funders, voice, strategy) drift and fade | title | 0:07 | n/a; fragment grammar from GA sizzle s3, reversed | [ ] |
| R5-S3 | The roof, alone, full weight | title | 0:05 | n/a; existing s2 scene | [ ] |
| R5-S4 | Four icons cascade | title | 0:03 | n/a; existing R1-S10 | [ ] |
| R5-S5 | Meg quote card. GATED: dated per-use line in customer-stories overview required before render | title | 0:04 | n/a; quote-card grammar | [ ] gated |
| R5-S6 | Brand close | title | 0:04 | n/a; existing | [ ] |
| R6-S1 | Headline "You're the only one who knows how this place runs." | title | 0:09 | n/a | [ ] |
| R6-S2 | "You don't have to be." alone on light | title | 0:03 | n/a | [ ] |
| R6-S3 | Real Compass exchange under the colleague line; provenance "Captured from the product · fictional organization" | screen | 0:07 | Existing capture `bemo-website/public/demos/compass-in-flow.mp4`; crop per the 16:9 display rule | [x] existing |
| R6-S4 | Three captions land: remembers / picks up / honest about limits | title | 0:06 | n/a; captions composited over R6-S3's tail | [ ] |
| R6-S5 | Meg colleague card. GATED: per-use line for this placement required | title | 0:02 | n/a; quote-card grammar | [ ] gated |
| R6-S6 | Brand close | title | 0:03 | n/a; existing | [ ] |
| R7-S1 | The anonymized verbatim as a quote-marked headline card, unattributed by design | title | 0:10 | n/a | [ ] |
| R7-S2 | One-person diagram: threads to every part of the org; figure steps away, threads snap | title | 0:09 | n/a; new scene | [ ] |
| R7-S3 | Threads re-anchor into the record; with/without inheritance panel | title | 0:05 | n/a; site problem-section grammar, redrawn | [ ] |
| R7-S4 | "What you built will outlast you." on navy | title | 0:03 | n/a | [ ] |
| R7-S5 | Brand close | title | 0:03 | n/a; existing | [ ] |

## Reel 1R: the punchline revision (DRAFT script, 2026-08-05; capture not started)

| ID | What is on screen | Type | Duration | App path / source | Captured |
|---|---|---|---|---|---|
| R1R-S1 | One empty chat, mission typing, ghost duplicates stacking behind; "Every one starts from zero." | title | 0:07 | n/a; compresses R1-S1/S2/S3 into one scene; ghost grammar from `source-commercial.html` | [ ] |
| R1R-S2 | The flip: the record assembles, facts landing | title | 0:06 | n/a; GA sizzle s3 grammar | [ ] |
| R1R-S3 | Ask typed ("What did the board decide in March?"); answer composes with source line; "Every fact, sourced."; provenance label | title | 0:07 | n/a; new ask-with-source scene, Common Table facts only | [ ] |
| R1R-S4 | "Not a chatbot. Your organization's memory." on navy | title | 0:05 | n/a; 1C card grammar | [ ] |
| R1R-S5 | Brand close | title | 0:05 | n/a; existing | [ ] |

## Capture notes

- Seeded demo org used: none; no app capture in reel 1
- Anything that had to be redacted: nothing; the typed mission text is generic by design (script note, rule 4)
- Shots that needed more than one take, and why: the 60s scenes needed a second render pass (caption cards were clipped by an animation transform, and the finished-work screenshot needed regrouping with its caption for vertical); captions needed a second encode pass (libass style space misread, rendered top-of-frame first time)

## Findings

UI problems noticed during capture. These go to Lee as product findings, not fixed in the edit.

-
