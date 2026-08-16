# Findings: LinkedIn Sizzle Series

Canon and product findings collected during this production. Raised to bemo-os or the site owner; never fixed from here.

## For Lee (product)

### Amplify output uses em dashes (2026-08-03)

The finished appeal letter in Becky's Amplify screenshot contains em dashes ("worked — with no one", "doubled in impact — helping"). BeMo's writing rules ban em dashes in BeMo-voiced copy; if that rule is meant to reach Amplify's generated deliverables, the generation templates need the rule. Logged, not edited: product UI text is never touched in post.

### FunderStorm GPR template page uses an em dash (2026-08-04)

The Grant Progress Report template page captured live for reel 1's grant-cycle beat (on screen about 0:38 in the 60s cut) carries an em dash in its "Why you need it" copy ("whether their investment is on track — and to decide"). Same class as the Amplify finding above: if the no-em-dash rule reaches product copy, the template descriptions need it. Logged, not edited: product UI text is never touched in post.

### Compass chat output uses em dashes (2026-08-05)

The Compass in-flow capture (`website-demo-slots/capture/out/compass-in-flow-raw.webm`, used in reel 1A) shows generated answers with em dashes ("Good — I have a solid picture", "a fourth weekly distribution stop — a second Saturday site"). Same class as the Amplify and FunderStorm findings: if the no-em-dash rule reaches generated product copy, Compass's generation needs it too. Logged, not edited.

### Press-release screenshot not used in reel 1 (2026-08-03)

Becky supplied a Press Release Editor screenshot alongside the Amplify letter. Not used: its collected-facts panel carries real customer data from a live workspace (Meg Poe, Autoimmune Encephalitis Alliance, Durham NC, pulled from her knowledge base). Using it externally needs Meg's per-use approval, and the cleaner path is recreating the flow in the seeded demo org. Parked for a later reel (it is a strong "it already knew" visual once recreated).

### Annual Report Editor interview copy uses double hyphens (2026-08-16)

The annual-report capture used for reel 2's interview beat shows product copy with a spaced double hyphen standing in for a dash ("Starting with the most essential fields -- please answer as many as you can", and again in the follow-up list "the field got the fiscal year text by mistake -- please describe"). Same class as the Amplify, FunderStorm, and Compass em dash findings above: if the punctuation rule reaches generated product copy, this interview template needs it. Logged, not edited: product UI text is never touched in post, and the capture ships as captured per the Week 30 guardrails.

## For bemo-os

### "Apps" versus "products," and now "one product" (2026-08-03, updated same day)

**Resolved 2026-08-04: Becky ratified "Four apps. One product."** ("YES, four apps. one product.") The phrase is now recorded in `ga-message-map.md` 3.1 as the category line, with "apps" as the component count noun going forward (edit made in bemo-os, uncommitted there, same handling as the August 1 "Nothing drops on the floor" ratification). One loose end raised in that edit rather than resolved: the July 29 Allocate ruling's "four AI-powered products" phrasing still appears as the external count-noun form and needs reconciling wherever it lives.

Original finding, for the record: Becky directed the reel's ending line through three revisions in one session ("Four apps. One platform." then "Four apps. One memory." then "Four apps. One product."), the map had never phrased the whole as "one product," and the line needed a founder decision before it stopped changing shape.

## For bemo-os (earlier)

### Pre-GA debut amends the launch draft's sequencing (2026-08-01)

Becky decided the five-reel series starts posting before GA, as teasers in the ongoing narrative arc and as Jon's pre-call sends. `docs/initiatives/ga-launch/00-overview.md` currently places the sizzle debut in Wave 2 ("as a post rather than an ad") and names launching campaign content before the website as the top failure mode.

What keeps both true, as briefed here: the reels stay teaser-register (Amendment 2 already allows teaser-level pre-call material), and none of them drives to a signup path or site experience that does not exist yet; the CTA stays soft until Wave 1 lands. The launch doc is Becky's own draft, so this is an amendment, not a contradiction, but it should be written there (Amendment 3?) rather than living only in this brief, and Lee should see it since the draft's OPEN items are his.

### Consistency exposure while pre-GA posts run (decided 2026-08-01)

A viewer who watches a reel and visits the site pre-Wave-1 hears the GA message in the video and the older copy on the page. Becky decided at ratification that the reels carry the beta invitation anyway ("The beta is open. bemointel.ai"), accepting the mismatch until Wave 1 lands. Recorded so the Wave 1 work knows the video audience is already arriving.

### Meg clearance trail needs to match her use (2026-08-01)

Becky authorized Meg's quotes for this series at ratification (planned placement: reel 5, GA week). The canonical status in `docs/customer-stories/00-overview.md` still reads per-use approval required for each new placement. bemo-os commit `5330e2e` (Aug 1) records a dated per-use approval for the quote **in the GA sizzle reel**; the mechanism now exists, and reel 5 needs its own dated line in that file's approved-uses list before it ships. Becky can add it, or get Meg's word after Aug 10, whichever her Aug 1 authorization was meant to be.

## Batch 2 findings (2026-08-05)

### The Caigh It Forward attribution conflict (blocking Reel 10's quote card)

The customer-stories overview (`../bemo-os/docs/customer-stories/00-overview.md`) records the blanket approval as **MaryEllen O'Donohue**, Caigh It Forward Foundation. The website preview build (`bemo-website/public/preview/index.html`, homepage KB section) credits the identical quote to **"Maryellen Duggan."** One of these names is wrong, and both surfaces are live-adjacent. Canon wins once a founder confirms which record is right; until then Reel 10's quote card does not render, and the site needs the same correction. Raised to Becky in the batch report.

### Map v1.3 lines are ratification-pending, and these reels are the ratification event

Reels 8 and 12 carry the August 5 working additions (the six-tools line, the in-play/missing pair, the Copilot contrast). The map marks them "working language for the sizzle rerun; ratification pending use." Becky approving these scripts and posting the reels is the use that ratifies; when that happens the map's v1.3 status lines should flip to ratified with the date, in bemo-os, by a founder.

### The front-page reel's brief gate is superseded by v1.3, but the brief still says otherwise

This brief's candidate backlog gates the front-page reel on "the two-surfaces build ships and the idiom graduates." Map v1.3 (Becky, Aug 5) authorizes Home language for the sizzle rerun now, and Reel 8 is written under it, with the front-page scene filmed from the public website build and labeled illustrated. The brief's backlog line should be amended by Becky so the two records agree.

### Reel 12 leans on an anti-patterns boundary; founder call requested

Map 3.3 sanctions "Copilot knows your inbox. BeMo knows your organization" (working, pending use). The anti-patterns doc separately says never compare BeMo primarily against other tools. A 30-second reel whose cold open names Copilot is a primarily-comparative frame in a way a single line inside a bigger argument is not. Options staged in the script: run as written, run vendor-blind, or hold. Becky decides; the reel is marked HOLD until she does.

### Narration variant of a ratified line (logged, not a quiet upgrade)

Reel 8 speaks the six-tools problem line as a question ("How many tabs do you open just to find out...?") while the screen carries the ratified declarative verbatim. If the question form reads stronger, that is a bemo-os edit for a founder to make in the map, not a scriptwriter's substitution; logged here per the sharper-language rule.

### Batch 2 resolutions (Becky, 2026-08-05, same day)

**The attribution conflict is resolved the other way: Maryellen Duggan is correct.** The website's credit stands; the wrong record is `../bemo-os/docs/customer-stories/00-overview.md`, which lists the Caigh It Forward blanket approval under "MaryEllen O'Donohue." That's a bemo-os correction for Becky to make (Studios writes to neither sibling repo); until it's made, the canon file contradicts a founder decision recorded here. Reel 10's quote card is unblocked and attributes Maryellen Duggan, Executive Director, Caigh It Forward Foundation.

**No Copilot naming (Becky).** Reel 12 runs vendor-blind: "The new AI assistants know your inbox. BeMo knows your organization." The map's 3.3 Copilot line stays available for sales conversations per its register note; the published form is the category version. When Becky updates the map's v1.3 status lines, this decision belongs in the same edit.

**Reels 2-7 scripted as a batch (Becky's direction: the full roster, shared for review).** This amends the brief's "written one at a time as their arc-week pairings firm up" cadence; the arc-pairing obligations still hold at posting time, they just no longer gate scripting. Reel 5 still holds for GA week. The Meg cards in reels 5 and 6 remain gated on dated per-use lines in the customer-stories overview.

### E3 is the site hero (Becky, 2026-08-06); the reels split surfaces with it

Becky closed the two-day headline audition: the website hero is now **"How much of your nonprofit's memory lives only in your head?"** with the bridged sub ("half in your head, half on sticky notes... BeMo is where it lives instead"). Shipped in `bemo-website` `e5649ae`; ratified in `ga-message-map.md` v1.4 (committed and pushed in bemo-os, `30da88c`, unlike earlier ratifications that sat uncommitted). The gap-honesty pair ("The front page shows what's in play. The Knowledge Base tells you what's missing.") is ratified through the same use and is live on the site.

**What this means for the reels:**

- **The surface split, CONFIRMED (Becky, 2026-08-06):** six-tools stays the reel 8 family hook while the site hero asks the memory question. The one-voice doctrine holds because both lines live in the same carrying/scatter territory and the gap-honesty pair appears verbatim in both the reel and the site. R8H proceeds unchanged; no re-render needed for E3. The only remaining gate on the launch hero is Becky's vH6 review itself.
- **The narration-variant finding above partially resolves:** the question register won at the site level (the hero is literally a question now). The specific spoken variant ("How many tabs do you open...") remains a variant of the declarative on-screen line; unchanged.
- **Stale VO inventory:** `hge-h1/h2` speak the pre-Aug-5 site hero ("Your nonprofit got smarter this week." / "Nobody wrote it down."); only retired cuts (1D, 1W) use them. If Reel 1A advances, its "hero hook pair" cold open needs regeneration against E3 (audio-only speech endpoint, per the Aug 4 path).
- **Captures are self-healing:** anything filmed from the site build from now on shows E3 automatically. The R8H front-page take (`hero-front.mjs`) is unaffected; it deliberately opens inside the assembly track and never frames the H1.
- **SEO note for reel end cards:** the site's title tag is now "where your nonprofit's knowledge lives" (keyword variant); the on-screen roof line stays "your organization's knowledge lives" as ratified. End cards keep using the roof verbatim.

### Every reel is a mini story (Becky, 2026-08-06): standing direction for the batch

Becky's direction on the vH9 review: it was not clear the viewer is inside BeMo or what they are looking at; a cold viewer gets confused. The rule going forward, for every reel: set up the problem, hint at the solution, then name it. A reel is a mini story, not a sequence of claims.

Applied to R8H (vH10): the narration already ran the arc (problem at 0:00, the hint at 0:12, BeMo unspoken until 0:24), so the fix was visual orientation at the turns: a "You're inside BeMo" chip landing with the front-page reveal, the wordmark landing with the first spoken "BeMo." No narration or VO changes.

Still owed: reels 8 (30s), 9, 10, 11, and 12 are DRAFTs and need auditing against the mini-story rule before capture. Reel 9 opens on the problem and names BeMo in its second beat at 0:08, which is likely too early under this rule; reels 10-12 need the same check. That is a script pass for a future session, gated on Becky's read of how vH10 lands.

### "Nothing falls on the floor" reworded from "drops" (Becky, 2026-08-06, adopting Lee's note)

Lee's hero-review note ("falls" sounds more natural than "drops") was adopted by Becky the same day. The map's Home outcome line is reworded in `../bemo-os/docs/internal/initiatives/ga-message-map.md` 3.2 (edit made in bemo-os, uncommitted there, same handling as the Aug 1 original ratification). R8H updated end to end in vH13: navy card, caption, srt, and a fresh Avatar V read (`hgh-l5`; the "drops" read archived as `hgh-l5-drops.wav`).

**Divergence accepted, on record:** the shipped GA sizzle finals (`bemo-ga-sizzle-reel-{60s,30s}-final-captioned*`) carry "Nothing drops on the floor." in Becky's recorded VO, and the 30s reel 8 script now says "falls." The GA sizzle is not re-mastered by this change; if both assets end up in circulation simultaneously, the two wordings will coexist unless Becky orders a GA sizzle re-master.

### Second testimonial in the hero (Lee's suggestion, 2026-08-06): audition rendered, gated on Meg

Lee suggested a second testimonial; the only cleared-and-fitting candidate is Meg's "BeMo is the best colleague." (approved Aug 1 **for the GA sizzle reel quote card only**; per-use approval is required for each new placement per `../bemo-os/docs/customer-stories/00-overview.md`). vH13m renders the audition: the silent proof beat splits into the Jen card (40.9-44.0) and the Meg card (44.0-46.8, "Another real user" eyebrow, quote verbatim, attributed by name). **INTERNAL REVIEW ONLY.** Two gates before it can ship: Becky judges whether two cards in six seconds read comfortably, and Meg gives a dated per-use yes for the hero placement (she is back Aug 10; the approved-uses list in the customer-stories overview needs the new line). If either gate fails, vH13 is the hero.

### The dark-ground logo rule reached R8H; reels 1, 1A, and the v2 cut still carry the old treatment (2026-08-06)

Becky flagged the logo in R8H's close. The treatment (color wordmark boxed in a white chip on navy) is not a variant `bemo-os/docs/branding/03-logo.md` sanctions; dark grounds take the white knockout directly on the navy. Fixed in R8H vH11 with `capture/assets/wordmark-white.svg` derived from the canonical asset. The same white-chip close exists in `source-appcut.html` and `source-v2cut.html`, which means the approved reel 1 renders (30s v13, 60s v17) and the 1A candidate shipped with an off-canon close. Becky decides whether those re-render before the Drive upload; the fix is one scene swap per source now that the knockout asset exists.

### The hero track evened to one recording (Becky, 2026-08-09)

Becky's vH13 note: even the audio out some more so it sounds like one recording. The seams were real and measurable, three of them, all in the mix rather than the reads: per-segment gains matched whole-file integrated loudness, which the segments' differing silence padding skews; the VO bus dynaudnorm re-leveled every 250ms frame toward full scale, pulling each segment's breaths and noise floor up by different amounts (the per-segment pumping that read as separate recordings); and the dynamic master loudnorm crept upward after quiet passages, which was also silently cancelling the scored duck under the Jen beat, so the approved vH13 sound there was an accident of the master. vH14 fixes all three (speech-median matching with a post-chain trim, one uniform compressor for every line, a probe-measured fixed master) and scores the Jen-beat music rise deliberately at the level the accident used to produce. VO beat spread in the delivered mix: 3.7 LU down to 1.3, with the remainder being the scored music. Standing note for the batch: `run-hero.mjs` is the reference mix chain now; the appcut and v2cut pipelines still carry the dynaudnorm chain and should adopt this one before any of those reels re-render.

### Maryellen is the second-testimonial candidate with no permission gate (Becky, 2026-08-09)

Becky named Maryellen for the second testimonial. This supersedes the Aug 6 finding's premise that Meg was the only cleared-and-fitting candidate: Maryellen Duggan has **blanket approval** (Becky, July 31, recorded in `../bemo-os/docs/customer-stories/00-overview.md`), name and words usable in any channel with no per-use confirmation, a stronger clearance than Meg's. Her card quote is verbatim from the message map's Knowledge Base proof cell ("I love that BeMo can tell you the 'gaps' that exist in your Knowledge Base."), which is also the ratified proof for this reel's own honest-ask line, so the claim trace is direct. vH14mel renders the audition; the only open gate is Becky's pacing call on two cards in six seconds (Jen 2.5s, Maryellen 3.4s). The Meg audition (vH13m) stays on file as the alternative, still double-gated on her per-use approval and the same pacing call. Note for the site pass: the Aug 3 founders' agenda already wants Jen, MaryEllen, and Meg named on the customers page, so the hero and the site would carry the same three names whichever card ships.

### Resolved same day: both quotes share the screen (Becky, 2026-08-09)

Becky's calls on the review: the Maryellen quote ships, and instead of two sequential cards the quotes appear on one screen and animate in and out. vH15 renders it (Jen rises first, a hairline rule and Maryellen's card join, both sink out together) and is the hero. The pacing concern the sequential audition surfaced is moot; each attribution now holds for over three seconds. The Meg audition (vH13m) stays on file, still gated on her per-use approval, and would now need re-staging against the same-screen scene rather than the split beat if it advances. The GA sizzle "drops" divergence also closed today on Becky's remaster order; see `../ga-sizzle-reel/findings.md`.

**2026-08-10, hero vH19 (visual-only motion-grammar adoption, PENDING Becky's approval vs the approved vH18):** Becky's call: the hero is not yet shipped, so it adopts the blue/orange and the ratified feature-series grammar now rather than at a future re-render. Changes are visual only, in `source-hero.html`: chapter wipes (navy panel, orange leading edge) at the four chapter breaks; the green marks now wipe on after their lines land (six tools, share the same memory, an hour, gaps); the Amplify work window lands on a spring before its push; the close URL is the ink-on-orange pill. Orange stays accent-never-ground per her Aug 10 rule; the Deep Sapphire close and the vH18 audio chain and tracks are untouched (finish re-measured to the same -15.8 target, 0.10 LU evenness). vH18 remains the approved final until she approves vH19 over it.

**2026-08-10, hero vH20 (supersedes the vH19 proposal):** Becky's read on vH19: the wipes distract; the hero's visuals already move. Agreed and logged as a grammar rule: **the wipes belong where the material is static (feature cuts); where the footage supplies its own motion, transitions stay cuts.** vH20 keeps only the quiet adoptions: green marks that wipe on, and the ink-on-orange URL pill on the close. The work-window spring is also reverted. Audio remains the untouched vH18 chain. Pending her pick: vH20 or stay on vH18 outright.

**2026-08-10, Becky's final call: the hero stays vH18.** vH19 (full grammar) and vH20 (quiet adoptions) are both declined; the hero keeps its own language entirely, and `source-hero.html` is restored to the vH18 state. The grammar boundary is now explicit: the motion grammar, wipes, and orange accents are the **feature-series** signature; the hero is its own film. vH19/vH20 renders remain in out/ as reference only.
