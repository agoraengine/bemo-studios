# Week 30 content pull

**Date:** August 16, 2026
**What this is:** the record of pulling the week of Aug 17's assets for posting, against the Week 30 asset plan (bemo-os `docs/communications/narrative-arc/anchors/2026-w30-asset-plan.md`). Canonical media stays in each production's `capture/out/`; a disposable staging copy sits at `~/Desktop/BeMo Week 30 Content/` for the Drive upload and gets deleted after. Share links land in each production's `assets.md` when uploaded.

## Pulled, ready as planned

| Slot | File (canonical location) | State |
|---|---|---|
| Thu, Amplify feature reel | `productions/li-product-feature-reels/capture/out/bemo-amplify-feature-30s-v1-final.mp4` | Ledger final, awaiting Becky's approval; Jen approved Aug 16 |
| Thu, alternate cut | same folder, `bemo-amplify-feature-30s-v2-letter-final.mp4` | From the Aug 15 session, **not yet in assets.md**; decide which cut is the one and update the ledger |
| Wed, templates still | `planning/amplify-platform-frames/amplify-templates-already-knows-appeal-letter-{wide,square,portrait}.png` | Rebuilt Aug 16 on the appeal letter per Becky (the week's document); **headline decided same evening: already-knows, because it names the pain point**; the dozens variant and the press-release set stay on disk |
| Fri, question poster | `productions/question-posters/capture/out/bemo-short-form-whose-voice-appeal-v2s.mp4` + `-sq-v2s` | Re-rendered Aug 16 asking "Whose voice is your appeal letter in?" per Becky; newsletter v1s kept for a later rotation; gated on ratifying the campaign plan |
| Sat, named quote still | `planning/amplify-platform-frames/amplify-quote-questions-named-{square,portrait}.png` | Ready |

## Gaps found in the pull

1. **Sizzle reel 2 ("An Hour, Not Three Days") is not rendered.** ~~Becky's VO passes exist (`capture/out/vo/becky/r2-pass-a/b`) but no cut was produced~~ **Corrected Aug 16: those passes are a second recording session of reel 1's lines** (the pass-b transcript announces "Line one, Line two" matching the reel 1 recording sheet), so no VO for this reel ever existed. **RESOLVED Aug 16: rendered as `bemo-linkedin-sizzle-series-r4-30s-v2.mp4`** (production code R4 per the roster ledger; v2 recuts the word BeMo in line 2 and the close per Becky's same-day catch) with four reads on her twin voice, pending her approval; if she'd rather record the four lines herself, the build re-runs unchanged (`capture/build-reel2.mjs`). Details in the sizzle script change log (R4-v1) and assets ledger.
2. **The FunderStorm product reel is not captured or rendered.** The slate's rollout had it first out; no capture exists in `li-product-feature-reels/capture/out/`. Tuesday's page slot needs one of: a capture-and-render session, the stand-in below, or one of the rendered template reels (impact story, fact sheet, elevator pitch, thank-you; all awaiting approval).

**Stand-ins staged:** Monday, `bemo-annualreport-feature-24s-v1-final.mp4` (same territory as reel 2, behavior-only, no Jen figures); Tuesday, `common-table-press-release/capture/out/common-table-press-release-motion30-v4.mp4` (ratified Aug 10, the slate's standing entry). Note the press-release cut carries the white-knockout close while the newer reels carry full-colour; the open logo-close ruling decides which set re-renders.

## Built after the pull (Aug 16 build session)

- **Sizzle reel 2 rendered** (gap 1 resolved above): `linkedin-sizzle-series/capture/out/bemo-linkedin-sizzle-series-r4-30s-v1.mp4`, pending Becky.
- **Wednesday carousel built** (the asset plan's build-by-Tuesday item): `planning/week-30-carousel/` holds the 7-slide LinkedIn PDF, portrait and square PNGs, and the build script; copy verbatim from the asset plan; pending Becky.
- **FunderStorm reel built** from the Grant Progress Report captures in website-demo-slots (the brief's "capture on disk" pointed there, not this production's out folder): script section, shot list, and both cuts in the li-product-feature-reels ledger, pending Becky.
- **Becky's Aug 16 rulings, applied same day:** (1) Jen and Maryellen run named with their organizations as needed (watch fatigue across repeated placements); the FunderStorm quote card now carries the foundation, and the customer-stories overview in bemo-os needs her matching edit. (2) Feature reels stay music-only on the Aug 15 session's beds (P2 under 30s, P1 under 15s; bed A superseded), and **the 15-second core is the LinkedIn feed asset with the 30s going to YouTube**. (3) Quote cards leave the feature reels: real tester quotes and demo-org footage no longer share a frame; the 30s parents are behavior-only and proof lives in post copy, anchors, and stills. Current files after her evening notes (top captions on FunderStorm, letter cut chosen): `bemo-funderstorm-feature-15s-core-v3-final.mp4` (Tue feed) + `-30s-v4-final` (YouTube; Maryellen's quote lives in the Tuesday post copy drafted in script.md), `bemo-amplify-feature-15s-core-v3-final.mp4` (Thu feed) + `-30s-v6-letter-final` (YouTube, **chosen**; the appeal-picture alternate stays on disk). The Week 30 edcal's Tuesday and Thursday rows still say the 30s posts to LinkedIn; that amendment is hers to make in bemo-os.

## Follow-ups

- [ ] Becky's Sunday approval batch, all on one review page with playable previews: https://claude.ai/code/artifact/40f9de78-6700-4444-85f0-36841653c9f2 (reel 2, the FunderStorm pair and post copy, the Amplify cut choice, the carousel, the templates headline, the poster ratification, plus the anchor's own checklist; the logo-close ruling closed Aug 15, knockout won, and is off the list)
- [x] UTM links generated (the edcal's Monday-morning item), paste-ready:
  - Mon anchor post first comment: `https://bemointel.ai/?utm_source=linkedin&utm_medium=post&utm_campaign=w30-ai-slop`
  - Mon article footer: `https://bemointel.ai/?utm_source=linkedin&utm_medium=article&utm_campaign=w30-ai-slop`
  - Tue extension post first comment: `https://bemointel.ai/?utm_source=linkedin&utm_medium=post&utm_campaign=w30-ai-slop`
  - Wed carousel first comment: `https://bemointel.ai/?utm_source=linkedin&utm_medium=carousel&utm_campaign=w30-ai-slop`
  - Thu reel post first comment: `https://bemointel.ai/?utm_source=linkedin&utm_medium=video&utm_campaign=w30-ai-slop`
  - Fri newsletter CTA block: `https://bemointel.ai/?utm_source=newsletter&utm_medium=email&utm_campaign=w30-ai-slop`
  - Fri Facebook closing line: `https://bemointel.ai/?utm_source=facebook&utm_medium=post&utm_campaign=w30-ai-slop`
  - Sat quote-still first comment: `https://bemointel.ai/?utm_source=linkedin&utm_medium=post&utm_campaign=w30-ai-slop`
  - Instagram runs on the bio link (no per-post UTM); confirm the bio points at the live site per the edcal's Thursday note.
  - YouTube descriptions (Becky posts; she handles the YouTube page, resolved Aug 16): `https://bemointel.ai/?utm_source=youtube&utm_medium=video&utm_campaign=w30-ai-slop` on both the Tuesday and Thursday full cuts.
  - **Confirm with Lee before Monday: UTM tracking end to end** (the tagged links land in analytics and the signup goal fires). All links sit on the shareable plan per post: https://claude.ai/code/artifact/d7653cae-0a05-4daf-b30e-d9cb5d3b4a1e
- [ ] **Monday amplification: share the article to the "AI for Nonprofit Organizations" LinkedIn group** (Becky, after the article is live). Drafted Aug 16; paste the live article URL at the bracket. No UTM and no beta pitch in the group (the article's footer carries the tagged link); Jen deliberately unnamed here, one fewer placement against the fatigue budget; the closing question harvests the group's own tests for the Friday close notes.

  > LinkedIn added a "Seems like AI slop" report button a few weeks ago. I run an AI company that serves nonprofits, so I wrote down what I actually think about it, and it's probably not what you'd expect from someone in my seat.
  >
  > Most of what that button is pointed at deserves it. But the button measures the wrong thing, because "was AI involved" was never the real question. The real question is whether there's still a person in it.
  >
  > The piece is built around a true story: an executive director of a library friends group who wrote her annual appeal letter with AI and ended up with a letter that had more of her in it, not less. It closes with the five questions I'd ask about any piece of writing instead of the one a classifier can answer.
  >
  > [link to the article]
  >
  > For this group specifically: when you evaluate AI-drafted donor material, what's your test? Mine is in the piece, and I'd genuinely like to compare lists.

- [ ] Drive uploads from the staging folder; links into each production's `assets.md`
- [x] Monday and Tuesday slots decided (Becky, Aug 16 evening): **the Amplify letter reel moves to Tuesday** because it supports the anchor (15s core to the page feed, letter 30s to YouTube, the Jen post copy in page voice); **FunderStorm moves to Thursday** (Becky's profile + YouTube, Maryellen post copy); **Monday's company page goes dark** with the anchor owning the day; **sizzle reel 2 is held** for a later slot (rendered, pending approval, feeds the sizzle rollout's v5 re-flow). Lee's gift-levels comment line rides Tuesday with the Amplify reel; his Thursday FunderStorm comment points at the continuity beat. The shareable plan with the final content: https://claude.ai/code/artifact/d7653cae-0a05-4daf-b30e-d9cb5d3b4a1e (built for sharing with Lee)
- [ ] Sizzle rollout needs its v5 pass against the live weekly calendar; the reel 2 render gap is another argument for doing it now
- [ ] Delete the Desktop staging folder after upload
