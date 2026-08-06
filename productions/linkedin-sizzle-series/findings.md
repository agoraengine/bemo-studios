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

- **The surface split, for Becky to confirm:** six-tools stays the reel 8 family hook while the site hero asks the memory question. The one-voice doctrine holds because both lines live in the same carrying/scatter territory and the gap-honesty pair appears verbatim in both the reel and the site. If Becky would rather the launch hero open on the ratified site hero itself, R8H's first beat swaps to the memory question: new VO for one line, re-render of the opening beat, decision best made inside the pending vH6 review.
- **The narration-variant finding above partially resolves:** the question register won at the site level (the hero is literally a question now). The specific spoken variant ("How many tabs do you open...") remains a variant of the declarative on-screen line; unchanged.
- **Stale VO inventory:** `hge-h1/h2` speak the pre-Aug-5 site hero ("Your nonprofit got smarter this week." / "Nobody wrote it down."); only retired cuts (1D, 1W) use them. If Reel 1A advances, its "hero hook pair" cold open needs regeneration against E3 (audio-only speech endpoint, per the Aug 4 path).
- **Captures are self-healing:** anything filmed from the site build from now on shows E3 automatically. The R8H front-page take (`hero-front.mjs`) is unaffected; it deliberately opens inside the assembly track and never frames the H1.
- **SEO note for reel end cards:** the site's title tag is now "where your nonprofit's knowledge lives" (keyword variant); the on-screen roof line stays "your organization's knowledge lives" as ratified. End cards keep using the roof verbatim.
