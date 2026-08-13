# Persona Reels and Landing Pages: a system exploration

**Status:** EXPLORATION, not a brief. Opened 2026-08-12 from Becky and Lee's morning website working session (Gemini notes, Aug 12: "Configure Landing Pages: consult with Fable regarding the implementation of landing pages optimized for specific audience segments"). Nothing here is ratified; the decision list is at the bottom.
**Owner:** Becky
**Canon read:** target-market personas (bemo-os docs/organization/08), ga-message-map.md v1.4, messaging-assets-v1.md, message-house.md, affiliate-marketing/07-conversion-enhancements.md, ga-launch/00-overview.md Amendment 2, all read 2026-08-12. Clearances re-read at script time regardless.

## What the Aug 12 call already settled (from the meeting notes)

- **Vercel moves to the 20 dollar monthly team plan**, so team collaboration on the site is unblocked.
- **Plausible is the analytics platform**, with an upgrade to the business tier planned (Lee) for team access and API usage. The API matters here: it is what turns per-persona UTM traffic into a report.
- **The robots.txt fix is on Lee's list** to allow crawling. This is the same indexing gate flagged below; it needs to land before any paid traffic points at a landing page.
- **The signup flow is being reworked** (Lee) from manual provisioning to self-service "with proper data capture." The persona parameter should ride on that rework rather than be bolted on after: if the new flow captures the parameter at signup, reel-to-page-to-signup attribution closes end to end.
- **A marketing plan for the 30-second sizzle and the 15-second cuts for paid testing** is on Becky's list; the persona pages are the destinations that plan needs.

## The idea

Targeted reels for specific personas, each pointing at a customized landing page on the website, so the person who recognized themselves in the reel lands on a page that continues the same argument instead of the generic front door.

## The headline finding

Almost every piece of this system already exists. The work is connecting them, not creating them.

- **The personas are defined.** Canon (bemo-os, docs/organization/08-target-market-and-personas.md) names six, and the marketing reduction to three is already shipped on the website homepage as the "Find your door" band: "You run the organization" (Executive Director), "You raise the money" (Development Director), "You advise nonprofits" (Consultant).
- **The per-persona messages are ratified.** message-house.md carries a full block per audience: lead pillar, the message that converts, entry hooks, and proof. These are quotable verbatim.
- **Most of the reels exist or are ratified.** The sizzle roster and the Wednesday feature slate already carry the persona-matched arguments (matrix below). Only the pairing is new.
- **The landing pages were already proposed once.** bemo-os affiliate-marketing/07-conversion-enhancements.md, "Tailored Landing Pages": four first-impression variants, "different hero messaging, different featured capabilities, same signup flow. The effort is in copywriting and design, not engineering."
- **What is genuinely missing:** the pages themselves (no /for/ routes exist), the reel-to-page routing (reels currently point at bemointel.ai generically), and attribution (no UTM handling; campaign-to-signup tracking dies at the app.bemointel.ai boundary today).

## The system, in three layers

**1. Reel layer (Studios owns).** A persona reel is the existing 30-second grammar with the persona's entry hook in the opening seconds and the persona's converting message as the one message. Existing reels cover most of this already; where they do, the persona "reel" is the existing reel plus persona-specific post copy, not a re-render.

**2. Destination layer (bemo-website owns).** One landing page per persona at /for/<role>, built from the prototype's existing design vocabulary: the seat-name eyebrow, the converting message as the headline, a recognition paragraph from the entry hooks, the persona's reel or demo clip embedded with the standard provenance line, one cleared proof quote, and the same Start free CTA as everywhere else. One pillar per page, per the messaging rule.

**3. Attribution layer (bemo-website owns).** Persona parameter on the CTA link into app.bemointel.ai/signup, and the existing Plausible Lead goal extended with a persona property. Plausible already records UTM sources on pageviews automatically, so LinkedIn-post-to-page attribution works the day the pages ship; page-to-signup is the small code change.

## The persona matrix

| Persona | Door (shipped homepage copy) | Converting message (message-house, verbatim) | Lead pillar | Reel that carries it | Proof and clearance |
|---|---|---|---|---|---|
| Executive Director | "You run the organization" | "You don't have to be the only one who knows how this organization works." | Colleague | Sizzle reel 9, The Colleague (scheduled Thu Sep 10); Compass feature reel (Wed Aug 26) | Behavior-only today; Meg Poe needs a dated per-use line |
| Development Director | "You raise the money" | "Your next grant cycle should start where your last one ended, not from scratch." | Stop Starting Over | FunderStorm feature reel (Wed Aug 19) | Maryellen Duggan, blanket (July 31) |
| Communications Lead | (no door yet) | "Every piece of content reflects who you actually are, not who you were three drafts ago." | Stop Starting Over (voice) | Amplify feature reel (Wed Sep 2) | Jennifer Allen, blanket (July 31) |
| Consultant | "You advise nonprofits" | "Right now, when you leave a client engagement, your expertise leaves with you. BeMo stays with the client." | Stop Starting Over + Legacy | Series reel 18, Your Expertise Stays (ratified, unscheduled) | Product behavior on screen |
| Shadow AI user | (secondary path, not headline) | "Here's how to stop starting from scratch every time." | Stop Starting Over | Series reels 17 and 22 (reel 22 has an open register call on naming Claude) | Product contrast on screen |

Entry hooks for the opening seconds, from message-house: the Executive Director's succession anxiety, the board question she couldn't answer, no real vacation in two years; the Development Director's "grant stuff" folder and funder follow-ups that require reconstruction; the Consultant's six clients, six contexts, one of you.

Clearances above were checked against customer-stories/00-overview.md on Aug 11 by the feature-reels brief. Hard rule 3 applies: re-read at script time, never trust this table from a later session.

## Landing page mechanics (from the website repo survey)

Two viable builds; the recommendation is the second.

- **Prototype-native:** add each page to index-beta.html and run it through the converter and the pixel gate like the other 13 pages. Right if these pages are permanent fixtures. Costs a converter tweak (hyphenated page ids) and gate config per page.
- **Campaign route (recommended):** one dynamic route, app/(ref)/for/[persona]/page.tsx, reading a small content map (eyebrow, headline, recognition paragraph, clip id, proof quote, CTA). It renders inside the existing reference layout with the prototype's own CSS classes, so it looks native without being pixel-gated. Scales to a dozen personas, and to the sector axis later, without touching the prototype.

Either way, four site-side items ride along (this is the tech-side list for Lee's review):

1. **The /for/ route and content map** (the campaign-route build above): one dynamic page, one small content file per persona.
2. **Attribution:** persona parameter on the CTA href into app.bemointel.ai/signup, captured by the new self-service signup flow, and the Plausible Lead event gains a persona property. The Plausible business-tier API then reports persona-by-persona conversion.
3. **Indexing:** the robots.txt fix already on Lee's list, plus confirming ALLOW_INDEXING on the production deploy, before any paid traffic points at these pages; today the default posture is noindex.
4. **Share cards:** og:image is still missing sitewide (open item in SEO.md). A persona page shared or linked on LinkedIn renders without a card until that lands.

The consultant door already routes to /partners, which exists. The consultant "landing page" may be an enrichment of /partners (embed the reel, tighten the hero to the converting message) rather than a new page.

## What canon constrains

- **Amendment 2 holds.** A persona reel is still a teaser: the persona's problem, the shape of the product, get the meeting. Targeting by role is fine; attempting the personalized wow is not. The wow stays live.
- **Persona language is internal only.** Pages say "You raise the money," never "The Relentless Fundraiser." The public ICP statement stays one sentence.
- **One pillar per piece.** Each page and each reel leads with exactly one pillar from the matrix; no stacking.
- **Proof rules unchanged:** quotes as written, never composited; Meg Poe per-use; nothing uncleared; claims live in the deliverables column, stories not statistics.
- **Never imply they are doing it wrong.** The recognition paragraph describes the constraint, not a failure: "you no longer have to do it alone."
- **Anti-patterns and voice rules apply to page copy** exactly as they do to narration: no feature-led opens, no urgency, no AI-led framing, no banned vocabulary, no em dashes.

## Where this fits distribution

The organic calendar is full through GA (sizzle Mondays and Thursdays, feature slate Wednesdays), and the persona system does not need new slots. Its natural channels:

- **Post copy retargeting:** when a matrix reel posts on its scheduled day, the post copy can carry the persona framing and the /for/ link. Zero new video work.
- **Paid:** the 15-second cutdowns are already the paid unit (gates: telemetry experiment live, budget ceiling decided, due Aug 21). LinkedIn job-title targeting per persona pointed at the matching /for/ page is exactly what those pages are for, and it is where attribution pays off.
- **One-to-one sends:** Jon and the affiliates get a per-persona kit (reel plus page link) for follow-ups. This is the tailored-landing-page scenario the affiliate initiative originally proposed.
- **Later, the sector axis:** bemo-os carries sector messaging maps (Education, Arts and Culture, Community Services, Veterans Services, Environment) with LinkedIn targeting per sector. Same system, different axis. Note: those two sector files are flagged in the message map's punch list as not yet reconciled with the current registers; reconcile before building on them.

## Decisions needed (for the Lee call or after)

1. **Which personas first?** Recommendation: Development Director and Consultant. The Development Director has blanket proof, a reel shipping Aug 19, and canon calls the role "most likely to convert quickly." The Consultant is a referral multiplier and the page may be a /partners enrichment. The Executive Director page is third: highest-priority audience, but its proof is gated on a Meg Poe per-use line.
2. **Page build:** campaign route or prototype-native? (Recommendation above: campaign route.)
3. **Do the persona doors on the homepage re-point** from product pages to the /for/ pages once they exist, or stay as they are?
4. **New opens or post copy only?** Are persona reels re-cut with persona entry hooks in the first 3 seconds, or do the existing reels carry persona framing in post copy alone to start? Recommendation: post copy first, measure, re-cut only where a page shows traffic without conversion.
5. **Timing:** the launch window owns this week. Recommendation: pages ship after launch settles, in time for the paid gates decision on Aug 21, so the first paid test (FunderStorm and Amplify cutdowns) can point at real persona pages instead of the homepage.
6. **Who builds the pages?** The copy is Studios-shaped work (it is scripting, with the same canon reads), but the pages live in bemo-website and Studios writes to neither sibling. Proposed split: Studios drafts page copy per persona in a production folder, the website work happens in bemo-website sessions, findings flow as usual.

## What Studios would open if this is ratified

One production, persona-landing-pages (or fold into the existing slates): page copy per persona traced to the message map, the post-copy variants for the matrix reels, and the per-persona send kits for Jon. No new capture; every visual already exists or is scheduled.
