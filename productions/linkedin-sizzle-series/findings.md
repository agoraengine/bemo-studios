# Findings: LinkedIn Sizzle Series

Canon and product findings collected during this production. Raised to bemo-os or the site owner; never fixed from here.

## For Lee (product)

### Amplify output uses em dashes (2026-08-03)

The finished appeal letter in Becky's Amplify screenshot contains em dashes ("worked — with no one", "doubled in impact — helping"). BeMo's writing rules ban em dashes in BeMo-voiced copy; if that rule is meant to reach Amplify's generated deliverables, the generation templates need the rule. Logged, not edited: product UI text is never touched in post.

### Press-release screenshot not used in reel 1 (2026-08-03)

Becky supplied a Press Release Editor screenshot alongside the Amplify letter. Not used: its collected-facts panel carries real customer data from a live workspace (Meg Poe, Autoimmune Encephalitis Alliance, Durham NC, pulled from her knowledge base). Using it externally needs Meg's per-use approval, and the cleaner path is recreating the flow in the seeded demo org. Parked for a later reel (it is a strong "it already knew" visual once recreated).

## For bemo-os

### Pre-GA debut amends the launch draft's sequencing (2026-08-01)

Becky decided the five-reel series starts posting before GA, as teasers in the ongoing narrative arc and as Jon's pre-call sends. `docs/initiatives/ga-launch/00-overview.md` currently places the sizzle debut in Wave 2 ("as a post rather than an ad") and names launching campaign content before the website as the top failure mode.

What keeps both true, as briefed here: the reels stay teaser-register (Amendment 2 already allows teaser-level pre-call material), and none of them drives to a signup path or site experience that does not exist yet; the CTA stays soft until Wave 1 lands. The launch doc is Becky's own draft, so this is an amendment, not a contradiction, but it should be written there (Amendment 3?) rather than living only in this brief, and Lee should see it since the draft's OPEN items are his.

### Consistency exposure while pre-GA posts run (decided 2026-08-01)

A viewer who watches a reel and visits the site pre-Wave-1 hears the GA message in the video and the older copy on the page. Becky decided at ratification that the reels carry the beta invitation anyway ("The beta is open. bemointel.ai"), accepting the mismatch until Wave 1 lands. Recorded so the Wave 1 work knows the video audience is already arriving.

### Meg clearance trail needs to match her use (2026-08-01)

Becky authorized Meg's quotes for this series at ratification (planned placement: reel 5, GA week). The canonical status in `docs/customer-stories/00-overview.md` still reads per-use approval required for each new placement. bemo-os commit `5330e2e` (Aug 1) records a dated per-use approval for the quote **in the GA sizzle reel**; the mechanism now exists, and reel 5 needs its own dated line in that file's approved-uses list before it ships. Becky can add it, or get Meg's word after Aug 10, whichever her Aug 1 authorization was meant to be.
