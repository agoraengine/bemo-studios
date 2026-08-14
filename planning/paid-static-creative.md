# Paid LinkedIn Static Creative: design guidelines

**Status:** DRAFT for Becky's review, 2026-08-14
**Owner:** Becky. BeMo builds the creative and writes the posts; Molly runs the campaigns.
**Needed by:** 2026-08-21, so the awareness campaign can start Monday August 24.
**Why static:** paid is an awareness play while the audience is cold. A stranger has no reason to watch a video about a platform they have never heard of. Stills buy far more impressions per dollar and can state the problem in one frame. Video runs later, against people who have already visited the site.

## The governing idea: show, do not tell

Every ad is **a real frame of the product doing the honest thing**, with one problem-led line above it. Not a headline on a color field, not an illustration of a feature, not a mockup. The screenshots below already exist; they were captured from the live product on August 3 against Common Table, the standing fictional organization.

This is the rule that makes these ads hard to copy. Any competitor can write "trustworthy AI." Almost none of them will publish a screenshot of their AI saying it does not know something.

## The four ads, in priority order

Each one is: a headline, a real screenshot cropped to the moment, a provenance label, and one call to action.

### Ad 1: "I don't have any information about that"

**The screenshot:** `productions/common-table-kb-load/capture/out/ask-gala-final.png`

The user asks "What did the board decide about the gala budget?" and BeMo answers: *"I don't have any information about your board's gala budget decision, nothing in our current chat history or your BeMo knowledge base covers that. BeMo doesn't have access to your internal meeting notes, board minutes, or financial records unless you've uploaded them here."* Then it offers three real ways forward.

**Crop:** the question bubble plus the first paragraph of the answer. The three numbered options can be cut; the honesty is the whole point, and a shorter crop is more readable at feed size.

**Headline options** (pick one per variant, never stack):
- "Most AI would have made this up."
- "The most useful thing it said was that it didn't know."
- "Ask it something it can't know. Watch what happens."

**Why it leads:** it is the single most differentiating frame we own, and it converts the skeptic, who is the hardest and most valuable person in this audience to reach.

### Ad 2: The unprompted gap list

**The screenshot:** `productions/common-table-kb-load/capture/out/ask-board-final.png`

At the end of a long, competent answer briefing a new board member, BeMo volunteers: *"A couple of things I don't have on file that would strengthen this brief: her name (so you can personalize it), and any documents already in your Drive such as bylaws, a strategic plan, or a board handbook."*

**Crop:** the closing paragraph only, with enough of the answer above it visible to show this came after real work, not instead of it.

**Headline options:**
- "It finished the work, then told us what was missing."
- "Your knowledge base has holes. This one names them."
- "Nobody asked it what was missing. It said anyway."

### Ad 3: Where the knowledge lives

**The screenshot:** `productions/common-table-kb-load/capture/out/kb-final.png`

The Knowledge Base index: board chair, board members, board secretary, community need addressed, EIN, executive director, geographic service area, key staff, media contact, mission statement, and more, each with an owner and a timestamp.

**Crop:** the list itself, twelve to fifteen rows. This is the roof claim made literal, and it is the least abstract picture of "organizational memory" we have.

**Headline options:**
- "How much of this lives only in someone's head?"
- "This is what your organization knows, written down."
- "When the person who knows leaves, this stays."

### Ad 4: The before and after

**The screenshot:** needs capturing. An empty knowledge base beside the loaded one, ideally the same view at two moments.

**Status:** the only one of the four not already on disk. It can come out of the Zero to Org rehearsal, which produces exactly this footage. If that rehearsal slips, ship the first three and add this one later; three is enough to start.

**Headline options:**
- "Monday it knew nothing. Friday it knew the organization."
- "Everything on the right was reconstructed from documents they already had."

## The visual system

Inherited from the website's design system, which these ads must not contradict. A viewer who clicks should land on a page that looks like the ad they came from.

### Colors

| Role | Hex | Use |
|---|---|---|
| Ground | `#FFFFFF` | The card background. White, always |
| Deep Sapphire | `#05347E` | Headlines |
| Ink | `#1A2A3A` | Body and supporting text |
| Ink muted | `#3D4F66` | Provenance label |
| Solar Orange | `#FF8210` | The action color, and only the action color: the call-to-action button |
| Verdant Green | `#4CBB17` | The voice accent: an underline mark under the key phrase in a headline. Never a background |
| Rule | `#D1D9E6` | Hairline border around the screenshot |

Orange means action and nothing else. Green means BeMo's own voice and nothing else. Do not introduce a color that is not in this table, do not use gradients, and do not put the headline on a colored band.

### Type

**Schibsted Grotesk throughout.** One typeface doing every job; crispness comes from weight, not from pairing. No serif anywhere. No second display face.

- **Headline:** weight 560, letter-spacing -0.018em, line-height 1.05. Sentence case, never title case. Two lines maximum.
- **Body and supporting line:** weight 400, line-height 1.6.
- **Provenance label:** Geist Mono, weight 500, letter-spacing 0.02em, uppercase, small. This is the one place a second typeface is allowed.

### Layout, 1200 x 628 (the LinkedIn single-image size)

- Outer margin 56px on all sides. Nothing important within 40px of an edge.
- **Headline top-left**, two lines maximum, on white.
- **Screenshot below or beside it**, with a 1px `#D1D9E6` border and 10px corner radius. Crop tight to the moment; never shrink a full app window to fit, because unreadable text reads as a stock image.
- **Provenance label directly under the screenshot.**
- **Call to action bottom-right**: ink text on a Solar Orange pill. Never white text on orange, the contrast fails.
- Also produce **1080 x 1080** of each, since square takes more feed height on mobile. Same elements, headline above the screenshot.

### The provenance label, required on every ad

Real captures and illustrated fiction are always declared. Both are true here at once: real product, fictional organization. The label reads:

> REAL BEMO SCREEN. COMMON TABLE IS OUR DEMO ORGANIZATION.

Small, muted, directly under the image. It is not fine print to hide; it is the reason the ad is credible.

## Copy rules

- **Lead with the problem.** Never with AI, never with a feature list, never with the product name in the first line.
- **One idea per ad.** No stacking two claims.
- **No em dashes.** Use a comma, a colon, parentheses, or restructure.
- **No urgency, no countdowns, no scarcity, no superlatives.** No "revolutionary," "seamless," "unlock," "empower," "game-changer."
- **Never call BeMo an AI assistant, a chatbot, a CRM, a productivity tool, an operating system, or a suite of tools.**
- **Never claim better AI.** The difference is memory, not quality.
- **Sentence case.** No exclamation points. No emoji.
- **Call to action:** "See how it works" to bemointel.ai. One per ad.
- Every claim gets checked against the claim map before it runs. Paid carries higher scrutiny than organic.

## What ChatGPT needs to build these

Give it: this document, the screenshot file, the size, and the chosen headline. The screenshots are the input, not something to generate. It must not redraw, restyle, or clean up the product screen; the whole value is that it is real. If a screenshot is unreadable at feed size, crop tighter rather than enlarge the frame.

Deliver each ad in both 1200 x 628 and 1080 x 1080, as PNG.

## Open questions

- Which headline per ad. Three options each above; recommend picking one and testing the three ads against each other rather than testing headlines within an ad, since the budget will not resolve both at once.
- Whether ad 4 makes the August 21 deadline, which depends on the Zero to Org rehearsal.
- The em dash in ad 1's screenshot is the product's own output, not our copy. We cannot edit a real screenshot, so the options are to use it as captured or to crop before it. Logged as a product finding: BeMo's generated prose uses em dashes, which contradicts house style everywhere else.
