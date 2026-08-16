# Brief: Short-Form Animations (the ten-second cuts)

**Status:** DRAFT, awaiting Becky's ratification
**Owner:** Becky
**Target length:** 10 to 15 seconds, silent
**Opened:** 2026-08-14

**Provenance:** Becky, 2026-08-14, pointing at [Apple's "Guess which computer is a business fave?" post](https://www.linkedin.com/posts/guess-which-computer-is-a-business-fave-ugcPost-7487911886433370112-ShcB/) and asking for short animation on that model. The format analysis is in `reference-apple-short-form.md`, including what could and could not be retrieved from the source post.

## What this video is for

A slate, not one video. Each cut buys three seconds of a scroller's attention with a question they answer in their own head, and spends nothing else. It is not trying to explain BeMo, show the product, or book a call. It is trying to make a stranger stop, recognize their own week on screen, and read the post copy underneath, which is where the ask lives.

This is a new tier below the feature reels, and its job is distinct from theirs. The 30-second feature reel argues. The 15-second cutdown compresses that argument. **The ten-second cut does not argue at all**: it lands one recognition and gets out. That is why it can run at a cadence the reels cannot.

## Where it serves

Top of funnel, launch window and after. Distribution is a proposal, not a ruling: these post on the organic LinkedIn calendar as filler between the Monday/Thursday sizzle reels and the Wednesday feature reels, at whatever cadence Becky wants, because they cost hours rather than days to make. They are also the natural asset for the paid static-ad frames in `planning/amplify-platform-frames/` to have a motion sibling, if the Aug 21 paid gate opens.

Anchored by the Amendment 2 teaser doctrine in `../../../bemo-os/docs/initiatives/ga-launch/00-overview.md`: these are teasers by construction, since they do not attempt to show anything at all.

## Who watches it, and in what context

A cold nonprofit ED or development director scrolling LinkedIn muted, three seconds of patience, no idea who BeMo is. The critical difference from the reel audience: this viewer has not decided to watch anything. The cut has to survive being scrolled past, which is why the first frame is a question and not a title.

## What it must say

One thing, once. Each cut carries exactly one line that traces:

1. **"You don't have to be the only one who knows how this organization works."** Verbatim from `../../../bemo-os/docs/internal/initiatives/ga-message-map.md` line 105 (the Compass row) and `messaging-assets-v1.md` line 86. Checked 2026-08-14.
2. **"Your nonprofit learned five things this week. Where did they go?"** The live site hero, verbatim from `../../../bemo-website/public/preview/index-beta.html`. Checked 2026-08-14. The site marks "Where did they go?" in green; the cut keeps the mark.
3. **The scattered-tools problem, stated as a count.** Derived from the approved hero-reel opening ("How many tabs do you open, just to find out what's happening in your own organization?", `../linkedin-sizzle-series/capture/run-hero30.mjs`). This is a statement about the viewer's day, not a claim about BeMo, so it traces to the approved script rather than the claim map.

Plus the standing close: white knockout wordmark on Deep Sapphire, "Where missions gain momentum.", bemointel.ai.

## What it must not say

- **No product, at all.** These cuts carry no capture, no screenshots, no UI, not even abstracted UI that could be read as BeMo's. That is a deliberate scope choice, not a shortcut: hard rule 4 says anything that looks like the product is the product, and a ten-second cut has no room to earn a provenance label. Product belongs in the feature reels.
- **No proof.** No customer names, no quotes, no numbers. See the proof table below.
- **No brand in the opening frame.** Hard rule 2 and the opening-three-seconds standard. The mark appears only in the close.
- **No riddle whose answer is BeMo.** Apple can play that game; we cannot, and the reason is in the reference analysis. The thing being recognized is always the viewer's own pattern.
- **No GA mention, no countdown, no urgency.** Same pre-GA rules the sizzle series carries; the beta CTA lives in post copy.
- **No second idea.** A cut that needs two lines of argument is two cuts.

## Proof available

Checked against `../../../bemo-os/docs/customer-stories/00-overview.md` on 2026-08-14.

| Proof | Source | Permission |
|---|---|---|
| (none) | | **No cut in this slate carries proof.** The format has no room for an attributed quote card, and an unattributed one is not permitted. Clearance surface is deliberately zero. |

## The three cuts in the first batch

Each is one recognition, told in the four-beat grammar the reference analysis derives: ask, withhold, resolve, mark.

| # | Working name | The recognition | The line it lands on | Length |
|---|---|---|---|---|
| 1 | The only one | Everyone in the org, dimming one by one, until only you are lit | "You don't have to be the only one who knows how this organization works." | ~14s |
| 2 | Where did they go | Five things learned, then an empty frame, then the question | "Your nonprofit learned five things this week. Where did they go?" | ~12s |
| 3 | Seven tabs | The tab strip filling up, counter ticking, then collapsing to one | "Seven tabs. One organization." | ~14s |

Cut 2 is the purest instance of the format: it is the shipped site hero split at its own period, with a full second of empty frame inserted where the page can only put a line break. The pause is the whole video.

## Format rules proposed for this tier

These are proposals for `docs/02-production-standards.md`, not decisions. Ratifying the brief ratifies them.

- **10 to 15 seconds, hard ceiling 20.** Longer than 15 and it stops being this format and starts being a bad cutdown.
- **16:9, 1920x1080**, captured at 2560x1440, per the standing format table.
- **Silent-native. No VO, no music required.** The music bed is optional and off by default; a sound-on viewer hearing nothing is correct here, not a defect.
- **No captions.** See the open question below.
- **Type-led, house v6 system**: Schibsted Grotesk only, Snow ground, Deep Sapphire display, green as a 3px inherited underline mark, orange nowhere except the close. No serif.
- **The standing brand close**, held about three seconds.
- **The empty beat is mandatory.** Every cut in this slate holds at least one full second where the frame is nearly empty. That beat is the format; a cut without it is a fast reel, not a ten-second cut.

## Success looks like

A stranger who has never heard of BeMo watches one, does not click, and three weeks later recognizes the name because the question stuck. Secondary: these become the cheap top-of-funnel volume that lets the reels stay rare and considered, instead of the calendar forcing a reel out before it is ready.

## Open questions

Founder decisions needed before this leaves DRAFT.

- **Captions.** `docs/02-production-standards.md` requires burned-in captions on every video with no exceptions, because the audience watches muted. **A silent cut has no speech to caption**, and burning a caption bar under a type card doubles the on-screen text, which the Aug 9 no-doubling ruling already rejected. Proposal: the standard reads "every video with speech," and silent cuts ship with no `.srt`. Becky's call.
- **Cadence and placement.** How often these post, and whether they interleave with the reel calendar or replace slots in it.
- **Whether the slate has a name viewers ever see.** Recommendation: no. These should read as one-off thoughts, not as episodes of a series with a number in the corner.
- **Whether the format ever carries a product frame.** Recommendation: no, per the "no product, at all" rule above. Worth being explicit so the question does not get relitigated per cut.
