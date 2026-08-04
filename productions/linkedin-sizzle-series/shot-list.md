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

## Capture notes

- Seeded demo org used: none; no app capture in reel 1
- Anything that had to be redacted: nothing; the typed mission text is generic by design (script note, rule 4)
- Shots that needed more than one take, and why: the 60s scenes needed a second render pass (caption cards were clipped by an animation transform, and the finished-work screenshot needed regrouping with its caption for vertical); captions needed a second encode pass (libass style space misread, rendered top-of-frame first time)

## Findings

UI problems noticed during capture. These go to Lee as product findings, not fixed in the edit.

-
