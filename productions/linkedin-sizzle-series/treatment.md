# Series Treatment: How the Reels Are Made

**Status:** DRAFT, 2026-08-03. The visual system for all nineteen reels: what each story is told with (live platform video, treated screenshots, motion graphics), and how the whole series stays in the website's look and feel. Extends, never overrides, `docs/02-production-standards.md` and the series contract in `brief.md`.

## The three ingredients

Every reel is assembled from three kinds of material, and each has one job:

**1. Platform video (the proof).** Playwright capture of the real app on the Common Table demo org, recorded at 2560x1440 and downscaled. Used wherever the claim is about behavior: the KB loading, gaps surfacing, a grant cycle picking up, BeMo declining to invent an answer. This is the only ingredient allowed to look like BeMo's UI in motion, per hard rule 4: if it moves and looks like the product, it is the product. Captures are scripted (`capture-run`), so when the UI changes mid-build, we re-run instead of reshooting.

**2. Treated screenshots (the held moment).** Full-resolution stills, taken in the same capture sessions or supplied by Becky, spliced into the animation by `run.mjs --build`. Used when a single frame argues better than motion: the finished appeal letter, the receipts under an answer, the "I don't know" response held long enough to read. Screenshots always wear the house frame: 14px radius, 1px rule border, the soft navy shadow, sitting on a Snow scrim. That frame is the website's mockup chrome, so a screenshot in a reel and a screenshot on the site read as the same object. Movement is limited to a slow push or settle; screenshots never fake interaction.

**3. Motion graphics (the argument).** The HTML/CSS scene system (`source-template.html`, descended from the GA sizzle), captured as video. This carries what the product cannot show: the problem scenes (scattered fragments, the blank stateless chat), the type cards that hold the argument for muted autoplay, quote cards, and the brand close. Graphics may abstract the problem; they may never impersonate the product. The generic-chat pastiche is deliberately generic and unlabeled; anything BeMo-shaped comes from ingredients 1 or 2.

## The grammar of a 30-second reel

The three ingredients almost always land in the same order, because the series is problem-first by rule:

- **0 to 8s, graphics:** the problem, felt. Type card plus an abstract problem scene. No product.
- **8 to 22s, platform video and screenshots:** the shift, shown. Real capture doing the one thing the reel claims, with a held screenshot where the eye needs to rest on evidence.
- **22 to 30s, graphics:** the resolution line, then the standardized brand close (wordmark, tagline spoken and shown, bemointel.ai small).

Muted autoplay is the design constraint: the type cards and on-screen callouts must carry the full argument alone. Narration and music are reinforcement.

## Look and feel: pinned to the website

The scene system already runs the brand-guidelines tokens Becky chose July 29 (the `/preview/` reference build direction): white and Snow surfaces (#FFFFFF, #F8F9FC), Deep Sapphire headlines (#05347E), the navy ink family, Geist for body and UI, Source Serif for display accents. Reel 1 shipped on this system.

**One conflict, named rather than picked silently:** the live site's deployed pages still run the v4 warm-paper and Bricolage system, and `DESIGN.md` records the token decision as open for Lee. The reels follow Becky's July 29 choice, which means until the React migration restyles the live pages, a viewer moving from reel to deployed site sees the chosen direction in the video and the older warm-paper on the page. Same shape as the copy exposure already accepted in `findings.md`. If the token decision goes the other way, the reels re-render: the scene system is HTML, so it is a token swap and a re-capture, not a redesign.

Rules that keep the two surfaces reading as one front door:

- **Product colors as identifiers, not decoration** (the website's own rule). A product-led reel takes its product's color as the single accent: FunderStorm orange (10), Compass blue (6), Amplify green (12), Academy teal (14). Home (19) takes no product color; the front page is the org's, not a product's. Everything else defaults to the green sitewide accent. One accent per reel; the rest stays ink and Snow.
- **The website's motion register:** ease-out, no bounce, ambient low-chroma glows, calm pacing at the ratified 1.12x. Nothing in a reel moves in a way the website would not.
- **Type discipline:** Geist carries the argument; Source Serif appears where the site would use display voice (the resolution line, quotes). Quote cards are set as written, attributed, never voiced by the narrator.
- **The screenshot frame** matches the site's mockup treatment exactly (radius, rule, shadow), so product imagery is one visual object across both surfaces.

**Fix needed before the next render:** `capture/fonts/` holds only Geist.ttf, so the `.serif` class silently falls back to Georgia. Add Source Serif 4 to the fonts folder so the serif accents actually match the site.

## Ingredient map, reels 1 through 19

| # | Reel | Graphics carry | Platform video | Screenshots |
|---|---|---|---|---|
| 1 | Starting From Zero | Problem open, stateless pastiche, close | (shipped) | Amplify letter (shipped) |
| 2 | The Reconstruction Tax | The rebuild-vs-pickup contrast scene (to be designed; Becky sees it before capture) | Picking up where the record already is | Last cycle's narrative, framed |
| 3 | It Already Knew | Type open on the new-board-member problem | The board-member ask (exists as Wrenfield footage; recapture on Common Table) | Receipts held under the answer |
| 4 | An Hour, Not Three Days | Jen's quote card, as written | Amplify report flow b-roll | The finished report |
| 5 | Where It Lives | The roof line, Meg card, reveal register | Short montage from reels 1-4 captures | KB overview |
| 6 | The Colleague | Type open on being the only one who knows | Compass working a decision | The colleague moment held |
| 7 | What You Built Outlasts You | Succession open, anonymized verbatim card | The KB as the org's record, scrolling | The record, framed |
| 8 | Day One | Implementation-dread open | The 13-document KB load, compressed (recapture on Common Table) | The loaded KB |
| 9 | It Tells You What's Missing | Type open, MaryEllen card | Gaps surfacing in the KB | The gaps list held |
| 10 | Where Your Last Cycle Ended | The from-scratch open | FunderStorm picking a cycle back up | Funder notes already there |
| 11 | It Says "I Don't Know" | "AI always answers" open | Two questions asked live | The honest refusal, held long |
| 12 | Sounds Like You | The vendor-voice open | A draft arriving in the org's voice | Voice doc + draft, side by side |
| 13 | Grant Narrative Matches Board Report | Choreography: three framed screenshots assembling | One fact updated once | The three surfaces (real captures) |
| 14 | In the Flow of Work | Unused-training open | Academy inside a real task | The learning moment framed |
| 15 | A Week to Answer | The four-places-and-one-memory open | The question asked, answered with receipts | Receipts held |
| 16 | No Pitch | The how-this-usually-goes open | Export control in the app | The real pricing page (site, local build) |
| 17 | Claude Is Yours | Generic-chat pastiche (reel 1 mechanism) | BeMo mid-conversation, context live | Fresh generic session, blank |
| 18 | Your Expertise Stays | Engagement-ends open | The consultant's multi-workspace view | Knowledge staying put |
| 19 | Nothing Drops on the Floor | The what-did-I-miss open | Home, once the two-surfaces build ships | The front page held |

Reel 16's pricing shot runs against the website local build (`cd ../bemo-website && npm run dev`), which also means it can be captured against the restyled pages before they deploy.

## Production mechanics

- One shared scene library: `capture/source-template.html` grows a scene per pattern (type card, framed screenshot, pastiche chat, quote card, fragments, close), and each reel's `source.html` composes from it. New reels reuse before they invent.
- Screenshots are by-products of capture sessions: every Playwright run grabs full-res stills at the beats the shot list marks, so the still and the motion ingredient always match.
- Existing footage is a head start, not a deliverable: the Wrenfield KB-load and board-member-ask footage proves shots 3 and 8 work, but ships nothing; both recapture on Common Table, the standing universe.
- Assets stay out of git per the Drive boundary; `assets.md` records the links.
