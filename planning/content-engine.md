# The Content Engine

**v5 · August 16, 2026** · Status: PROPOSED, awaiting Becky's ratification

This page names the whole machine: every moving part of BeMo's content operation, from canon to the Friday close, with one name each and a map of how they connect. Version 2 adds what version 1 missed: the life of one asset traced step by step, the ownership map, the listening and engagement half, the search and discoverability half, the email machinery, the in-product content, and the working-ahead ledger. It draws on all four sibling repos: bemo-os, bemo-studios, bemo-website, and bemo-listen.

Two ground rules for reading it:

1. **This page proposes, it does not rule.** Naming what BeMo says is bemo-os territory. Where a name sticks, it gets ratified into bemo-os and this page points at it. Studios keeps only the production-side names.
2. **Nothing here is new machinery.** Every part below already exists and runs, or is ratified and owed. The work is naming, reconciling, and giving homes to the parts that have none.

---

## The system in one sentence

Canon decides what may be said, the bench proves it, the arc decides what we are saying now, the week turns that into seven slots, the franchises fill the slots, the studio makes the assets, the voices post them, the conversation is worked by hand, the doors catch the people who never saw the feed, the scoreboard reads the results, and the close feeds what we learned back into the arc.

```
THE CANON ──► THE ARC ──► THE WEEK ──► THE FRANCHISES ──► THE STUDIO
   ▲             ▲            │                                │
THE BENCH ───────┘            └──────► THE VOICES ◄────────────┘
   (proof)                                 │
                                    THE CONVERSATION
                                           │
THE DOORS (search, LLMs, press,     THE SCOREBOARD
  community, webinars) ──────────────────┘ │
                              THE CLOSE ───┘
                              (feeds back into the arc, weekly)
```

---

## The eleven layers

### 1. The Canon (what may be said)

The source of truth for positioning, voice, and claims. Lives entirely in bemo-os.

| Part | Where |
|---|---|
| The message map (the three tracks, the roof, the three pillars) | `bemo-os/docs/internal/initiatives/ga-message-map.md` |
| The messaging assets (elevator pitch, boilerplate, map on a page) | `messaging-assets-v1.md` |
| The message house (copy discipline: one pillar per piece, the commitment rule) | `message-house.md` |
| Voice and tone, anti-patterns | `bemo-os/docs/organization/16-voice-and-tone.md`, `18-anti-patterns.md` |
| The claim map and the overclaim test | `bemo-os/docs/initiatives/trust-framework/05-claim-map.md`, `09-overclaim-risk.md` |
| The language register (internal term vs. external term) | message map, Part 5 |

The three pillars of record: **Stop Starting Over / You Finally Have a Colleague / What You Built Will Outlast You.** An older pillar set still sits in the June architecture doc without a superseded marker (decision 9).

**Becky's August 16 ruling: the brand guidelines live in the canon.** Today the design system sits in `bemo-website/DESIGN.md` and the video brand rules in the Studios production standards; the visual identity is as much canon as the voice, and both need a ratified home in bemo-os that the website and the studio quote (see the homeless parts).

### 2. The Bench (who proves it)

The cleared customer-story roster and the rotation that keeps proof flowing without wearing anyone out.

- Roster and clearance terms: `bemo-os/docs/customer-stories/00-overview.md`. Re-read at production time, every time.
- As of August 16: Jennifer Allen (blanket), Maryellen Duggan (blanket for her name and words only; the foundation and Caileigh's name are separate, and the legacy bridge is permanently banned), Meg Poe (per-use), Landis Andrews (in flight). CPN is not committed and unusable, though two arc documents still lean on it (decision 11).
- **The rotation rule** (never two weeks without published beta evidence) and the release order live in `planning/ga-onramp.md`, not beside the roster they govern (see the homeless parts).
- The bench also feeds back: every close routes report-backs and story leads to the Talk To People list, so proof and learning run on the same rail.

### 3. The Arc (what we are saying now)

The belief-building sequence: feel it, name it, see it differently, discover something exists for it. Lives in `bemo-os/docs/communications/narrative-arc/`.

- **The anchors**: one anchor essay plus one asset plan per week. Since mid-July this pair is the live arc; the older phase documents have gone stale behind it.
- **The topline messaging ledger**: which cornerstone phrases have graduated to public use.
- **The published ledger**: what actually ran, week by week, and the official week count.
- **The campaign sequence**: GA launch Waves 0 through 5, including the sizzle doctrine (the video opens the door, the live session walks through it).
- The schedule of record for the onramp is `planning/ga-onramp.md` (GA at even odds the week of September 21, four-in-five by October 2), backed by the two Trello boards.
- **The intake** (unnamed until now): where new material enters the arc. Today ideas arrive from Talk To People calls, the listening digest's "language we are not catching" section, advisor calls, production findings files, and Trello cards. There is no single list; the proposal is one intake list reviewed in the Monday planning step, so nothing arrives by memory.

### 4. The Week (the operating unit)

The engine's clock. Each week is: the anchor essay, the asset plan, the Google Doc edcal for review, the pull, the posting, the engagement rows, the Friday close.

**The Standing Week** (proposed name for Becky's August 15 seven-slot calendar, currently recorded only inside one asset plan and one campaign doc):

| Day | Slot | Voice |
|---|---|---|
| Sunday | Field Notes video (60 seconds, real Becky to camera, always) | Becky |
| Monday | Field Notes anchor (the week's essay as a LinkedIn article) | Becky |
| Tuesday | Product reel | BeMo page + reposts |
| Wednesday | Build Notes edition + carousel | Lee (edition), Becky (carousel) |
| Thursday | Feature reel | BeMo page + reposts |
| Friday | Question poster + the newsletter send | Page, Becky repost, Lee alternating |
| Saturday | Quote card or still | BeMo page |

Also part of this layer, each currently recorded only inside individual weekly asset plans:

- **The cadence canon**: one post per day per channel, maximum; channels count separately; an article and its announcement post are one release; comments never count.
- **The review surface rule**: Google Docs is the review surface (artifacts cannot carry comments), per the August 14 sync.
- **The pull**: the pre-week asset gathering against the asset plan, recorded like `planning/week-30-content-pull.md`.
- **The email machinery**: the Friday newsletter repurposes the anchor with a short personal note. HubSpot is the de facto platform (the pre-GA plan and the week-25 edcal both name it); the growth docs still list "ConvertKit, Beehiiv, or Substack" as an open pick (decision 14).
- **The planning rhythm**: the growth docs specify a Monday planning session (anchor in, full multiplier plan out, Becky approves) and a Friday review. In practice the asset plan is drafted with me against the anchor and the close runs off its checklist; the ritual names are worth keeping because the steps are real.

### 5. The Franchises (the recurring formats)

The named series that fill the slots. Status as of August 16.

**The public register:**

| Franchise | Slot / surface | Made where | Status |
|---|---|---|---|
| **Field Notes** (video, anchor, newsletter) | Sunday + Monday, LinkedIn + email | Becky directly, not a Studios production | Running; stays human, no twin, ever |
| **Build Notes** (Lee's Then / Now / Delta editions) | Wednesday article + feed post | Lee directly; spine in bemo-os | Six editions shipped; public name undecided |
| **The sizzle series** (reels 1 to 24 + the 60-second hero) | LinkedIn reel slots | `linkedin-sizzle-series` | Reel 1 and hero final; reel 2 pending review |
| **The product and feature reels** (30s parents, 15s cutdowns) | Tuesday + Thursday, + YouTube | `li-product-feature-reels` | Ratified; FunderStorm and Amplify rendered |
| **The question posters** (6-to-8-second silent posters) | Friday | `short-form-animations` | All seven built; campaign awaiting ratification |
| **The stills** (beat, quote, and frame batches) | Saturday + paid + anywhere | `planning/amplify-platform-frames` | 32-frame batch built, spec at v6 |
| **The carousels** | Wednesday document post, Becky's page | `planning/week-30-carousel` | First one built for the week of August 17 |
| **The paid statics** (four real-frame ads) | Paid LinkedIn, Molly runs | `planning/paid-static-creative.md` | Drafted; needed by August 21 |
| **The set pieces** (GA sizzle, super demo, Zero to Org, the foundational demo training) | One-off moments | Their own production folders | Various; Zero to Org gated on rehearsal |
| **The persona reels and /for/ pages** | LinkedIn to per-persona pages | `planning/persona-reels-and-landing-pages.md` | Exploration; six decisions open with Lee |

(Ask It Something It Can't Know was a piece of content, not a franchise; its folder stays but it carries no register row.)

**The in-product and onboarding set** (post-signup content; not top-of-funnel but part of the engine):

| Format | What it is | Status |
|---|---|---|
| **The things-to-try guide** | Ten guided scenarios, written, delivered by email to every signup ("bring real work") | Drafted August 11; manual send by Becky first, then automated via the signup route |
| **The welcome videos and guided tours** | Becky's no-tech welcome plus per-app 60-to-90-second orientations | Platform-level ones exist; app-specific ones suppressed in the app and need rebuilding |
| **The walkthrough library** | Guided demos against the same ten use cases | Planned, sequenced after the guide |
| **The Academy lessons** (five-minute presenter lessons, 270-course catalog) | The Academy product surface | Three built; brief and cast await ratification |
| **The demo slots** (six honesty-ruled website clips) | bemo-website product pages | Two of six live; four gated on product behavior |

The fan-out principle behind the register is **the content multiplier** ("one idea, twenty assets"): one anchor essay feeds every slot that week, restated platform-native, never pasted across. The SEO docs add a twenty-second asset: the blog version of the anchor on BeMo's own domain (see The Doors).

### 6. The Studio (how it gets made)

The bemo-studios repo. The five-stage pipeline (brief, script, capture, audio, assemble, gated in order), the production standards, the capture harness on Becky's saved session (Cottage 2: Lee is never a capture dependency), the Common Table standing universe, and Drive as the only home for media. The boundary holds: the studio reads canon and produces assets; it does not author positioning and does not own publishing state.

### 7. The Voices (who posts where)

The accounts that speak, named without rules attached. Per-piece approvals are granted by Becky; nothing in this layer fixes who may say what.

- **The voices**: Becky's profile, Lee's profile, the BeMo company page, Molly's profile, the one-to-one sends, and the newsletter sender.
- **The channel map**: LinkedIn is the spine; Instagram and Facebook take the square cuts and adaptations; YouTube takes the 30-second parents (channel ownership still unconfirmed); the newsletter is the Friday send; the website is the standing surface everything points at.
- Posting is manual, per surface, per day; time slots in the edcal are human slots, not queue times. Automating LinkedIn is covered under The Conversation.

### 8. The Conversation (the work after posting)

Posting is half of LinkedIn; this layer is the other half, and it is deliberately human.

- **The engagement rows**: since the week of August 16, each asset plan carries a day-by-day table of who comments, reshares, and reacts, with drafted starting lines for Lee that must end sounding like him. The closing rule: nobody posts a line they did not touch, and no two voices post identical copy.
- **The comment engine**: the growth docs set daily minimums (12 to 15 comments across the three accounts as a floor, connection requests with personalized notes, page invites) and the second-touch system for new connections. These numbers were calibrated to a staffed operation and need re-ratifying at founder-only capacity (see the debts).
- **The listening system**: the bemo-listen sibling repo, run via the `/social-listen` skill. Four intake lanes (sector RSS, Reddit, a search engine's public index of LinkedIn, and manual paste-ins), scored against the persona map, producing a five-item morning punch list of conversations worth joining, plus a weekly Talk To People digest measured by convergence. It suggests; it never posts.
- **The line we do not cross**: no automated reading or posting of LinkedIn itself. LinkedIn's read API scope is closed, automating the logged-in surface breaches its User Agreement and risks the account, and two ratified guardrails already forbid it (Cottage 2 guardrail 3 and the social-listening terms-of-service rule). Overruling this requires a deliberate written decision with Lee in bemo-os. The recurring "just automate LinkedIn" proposal should be answered by pointing here.

### 9. The Doors (how strangers arrive without the feed)

The owned social wave creates demand; this layer captures it. Mostly specified, mostly unbuilt.

- **Search**: the SEO and discoverability initiative in bemo-os. The key connection: the anchor gets a blog version on BeMo's own domain, and social posts link there instead of to LinkedIn, concentrating authority. The blog pipeline is specified but unbuilt; `/blog` is an orphan route flagged before indexing.
- **LLM discoverability**: the monthly audit of what ChatGPT, Claude, Perplexity, and Google AI Overviews say about BeMo, against a canonical question set. The April baseline reads "not mentioned" across the board; no audit has been logged since. Term ownership of "coordination collapse" is the long game, and Reddit is the highest-weight third-party surface for LLM training.
- **Community presence**: Becky's disclosed Reddit account, answer mode only through the six-week aging window, with named mode unlocking at GA (and never in the main nonprofit subreddit). The automation builds (thread scout, audit script, ledger sync) run as an intern workstream; the community ledger records every post.
- **Earned media**: Wave 3 of the GA sequence, narrow local and regional press plus sector newsletters, riding on the press kit and media list from Wave 0.
- **Webinars and live formats**: the Lunch and Learn series (paused for launch window, superseded by daily office hours per Bill's ratified advice). **Office hours are Becky and Lee's** (Becky's August 16 ruling), and can be used as a CTA when needed. A LinkedIn Live CTA swap is flagged but undecided.

### 10. The Scoreboard (how we know it worked)

- **The UTM convention** (proposed August 16, pending ratification into the production standards): source is the platform, medium is organic-social / paid-social / email / video-description, campaign is the folder slug spelled out, content is the asset. Lowercase, hyphens, tagged links generated Monday morning, never on internal links.
- **Plausible** on bemointel.ai records UTM parameters automatically; the persona pages plan adds per-persona reporting on its business tier.
- **The known gap**: signup lands on app.bemointel.ai, which the website's Plausible does not cover, so campaign-to-signup attribution dies at that boundary today. Asked Lee in #analytics on August 16.
- **The launch dashboard** (ratified August 5, still to be defined): signups, activation depth, time-to-first-value, repeat engagement, and the qualitative gate (do strangers describe BeMo correctly in their own words). Every beta conversation captures two strata: what did you do, and what changed, who did you tell.
- **The growth gates**: the milestones doc defines phase gates, weekly KPI tiers, and decision triggers (including the capacity-crisis trigger and the ten-times-average-post trigger). Calibrated to a staffed operation; treat the numbers as shapes until re-ratified.
- **Hand-logging is the current practice**: per-platform metrics logged at the close; the posters start their own hand-log (impressions, three-second views, saves and reposts).

### 11. The Close (the learning loop)

The Friday close runs off the asset plan's checklist: metrics and conversions logged, report-backs collected and routed to the Talk To People list, the named customer gets their numbers and comments, the published ledger and the Build Notes log updated, the week's named watches recorded (this week: the disclosure watch and the three-layer watch), next week's pillar decision made, and the close record written with what performed and what the comments taught us.

This is the layer the dogfooding spec eventually moves into the product itself: one long-lived arc leaf, one content-week leaf per week, and the content multiplier as a skill, with the edcal and posting schedule becoming derived views. When that lands, the week and the close migrate in-product; the studio keeps capture and render.

Today the loop runs socially but not in artifact form: the spec says close records append weekly to the published folder, and none exist there.

---

## The life of one asset

The walkthrough version 1 lacked: every step from idea to close, with the owner and the gate at each. A feed post takes the short path; a video takes all of it.

**Decide**

1. **The idea enters** through the intake: a Talk To People signal, a listening punch-list thread, a findings file, an advisor ruling, a Trello card. Becky decides it belongs in the arc. *Gap: no single intake list; arrival is by memory.*
2. **Becky writes the anchor essay** in bemo-os, versioned, with Lee's review where his territory is touched. *Target: two weeks ahead (Stage 2). Practice: same week.*
3. **The asset plan is drafted against the anchor**: the Standing Week slots filled, week-specific guardrails numbered, conversion and engagement rows written, per-day copy blocks drafted. Ops rows stay on the GA onramp and Trello; the plan is a content edcal only.
4. **The Google Doc edcal is created and linked** for review, because Google Docs is the review surface and artifacts cannot carry comments.

**Make** (the studio path; skipped by text-only assets. The Field Notes video takes neither path: founder-recorded, same day, no pipeline)

5. **Brief** ratified by Becky. Nothing below starts first.
6. **Script and shot list** written against canon, with the claim check (every assertion traces to the message map or claim map) and the clock check (about 150 words a minute).
7. **Capture** through the Cottage 2 harness against the real product or the real website. Common Table is a prop, never proof; provenance labels on every product visual.
8. **Audio**: generated VO through the ratified chain, or founder-recorded for founder POV. VO matches the locked script word for word.
9. **Assemble** and walk the ten-item standards check.
10. **Upload to Drive**, link in the production's assets file. No media in git.

**Ship**

11. **Becky's approval pass** on the finished assets (the Sunday row in practice), and the pull stages everything against the plan.
12. **Post copy is finalized** from the plan's copy blocks, guardrails applied (this week: at most one machine-involvement beat per derivative asset).
13. **The publish-day pass**: the week's open rulings closed, an anti-pattern and voice pass, and the claims audit re-run on the day the anchor publishes. The claim check at script time is not the last check.
14. **The named-story courtesy loop**: the customer sees the story before it runs, gets a note with the live link the day it publishes, and gets their numbers and comments at the close.
15. **Links are tagged** with the UTM convention on Monday morning; the link rides in the first comment.
16. **A human presses the button.** Posting is manual, per surface, per day, one post per channel maximum; no scheduler, no automation.

**Work it**

17. **The engagement rows run**: first comments within the hour, seeds through midweek, the repost and alternation pattern, replies handled same day. Alongside, the listening punch list surfaces the morning's five conversations worth joining, and the comment engine keeps the accounts present beyond our own posts.

**Read it**

18. **Numbers are logged by hand** per platform; Plausible reads the tagged links; the launch dashboard (once defined) reads activation, not raw signups.

**Close**

19. **The Friday close** runs the checklist: ledger updated, report-backs routed, the named customer thanked with their numbers, watches recorded, next week decided, close record written. What the week taught feeds the next anchor, and the loop starts again.

---

## The ownership map

Who runs each layer today. Founders and Molly are named; everyone else appears by role (Becky's August 16 naming policy for content workstreams). The older growth docs also assume a dedicated content-operations role with a ninety-minute day and a scheduling tool that the executing practice does not have; treat those rows as a staffing plan to ratify or rewrite, not current fact.

| Who | Owns in the engine |
|---|---|
| **Becky** | The arc and the anchors, the week and its rulings, Field Notes (always on camera, never a twin), the posting, the engagement rows, the bench relationships, Reddit answer mode, office hours (with Lee), the welcome-email send |
| **Lee** | Build Notes end to end, his own posting and comments, office hours (with Becky), app-side builds (signup route, analytics, welcome videos, Partner Claims view), YouTube confirmation, ratifications in his territory |
| **Molly** | Paid campaigns and broadcast creative under the one-link arrangement through December 31 |
| **The sales lane** | One-to-one sends: the super demo, prepared workspaces, named-org outreach |
| **The automation builds** (intern workstream) | SEO and community automation: the thread scout, the monthly LLM audit script, the ledger sync |
| **The ICP review** (outside advisor, as written) | Biweekly ICP review of anchors; the joint webinar format, currently paused |
| **Me (Claude, in this repo and its siblings)** | The multiplier's hands: asset plans, scripts, capture, assembly, stills, carousels, post copy drafts, UTM link lists, the listening ranking, this page |

---

## The working-ahead ledger

The growth docs define the lead-time ladder: Stage 1 is one week ahead, Stage 2 is two weeks ahead, Stage 3 is a monthly arc mapped in advance. Where each franchise actually stands:

| Franchise | Target | Actual, August 16 |
|---|---|---|
| Anchors and asset plans | Two weeks ahead | Same week (the week-30 plan was drafted the day its week began) |
| Question posters | Flight built in advance | **Seven Fridays ahead, through October 2. The model franchise** |
| Feature and product reels | Calendar through October 7 | Two of eight rendered; the rest scripted |
| Sizzle series | A reel a week through September | Scripts far ahead (through reel 24); renders one behind |
| Carousels | With the week's plan | Built same week |
| Build Notes | Editions dated ahead | Log four editions behind; week-31-plus runway a week late |
| Field Notes | Same week by nature | Same week, as designed |
| Academy lessons | Batch pipeline | Three of 270; awaiting cast ratification |
| The content stockpile | Five to ten evergreen assets per platform | Not built |

The pattern: script-ahead is solved, render-ahead and write-ahead are not. The posters show what ahead looks like; the anchor is the piece most exposed to a bad week.

---

## Name collisions to resolve

Each of these is one ruling. Where the fix lands is marked.

1. **"Field Notes" carries four meanings**: the Sunday video, the LinkedIn newsletter, the email newsletter name, and "Field Notes Insight" meaning an interview observation in the pre-beta arc docs. Proposal: Field Notes is the franchise, one identity across surfaces; the interview-observation sense gets renamed. Fix in bemo-os. Becky rules.
2. **"Build Notes" is the calendar's slot name but is vetoed for public use.** Six editions have shipped unbranded. Candidates already on the table: The Connective Layer, Load-Bearing, Systems That Hold, Second Pass, What Held. Lee rules, Becky seconds. Fix in bemo-os.
3. **Two editorial spines for Build Notes are live at once**: the spine doc and a diverged local twin with different dates and gate states, plus a diverged edition-five draft. One must be declared authoritative and the other deleted. Fix in bemo-os. Lee rules.
4. **"Wave" means three unrelated numbering systems**: GA campaign Waves 0 through 5, product build waves, and lakehouse graph waves. Proposal: only the campaign keeps "wave." Fix in bemo-os. Lee and Becky.
5. **"Phase" is overloaded four ways** (arc phases, arc file titles, dogfooding phases, growth phases). Worth one line in the language register. Fix in bemo-os.
6. **The reel slots and the ratified rollout plans disagree.** The Standing Week names Tuesday product reel and Thursday feature reel; the sizzle brief says Mondays and Thursdays; the feature-reel plan says Wednesdays. The week-30 plan already hit this live (sizzle reel 3 versus the Amplify feature reel, both claiming Thursday). One ruling on which series feeds which slot, then amend both rollout plans. Fix in Studios once Becky rules.
7. **The week count is off by one** in the post-GA arc doc, which also still assumes the July 6 GA. Either revise-and-renumber or mark it superseded by the anchors. Fix in bemo-os.
8. **The folder `short-form-animations` makes the question posters unfindable**, and its brief contradicts its own campaign doc. Proposal: rename the folder `question-posters`, rewrite the brief to match the campaign. Fix in Studios. Becky rules.
9. **Two three-pillar sets coexist.** The message map's set is current; the older architecture doc's set needs a superseded marker, pillar by pillar, because asset plans cite pillars by number. Fix in bemo-os.
10. **"Super demo" and "Supademo"** (the third-party tool named in the sizzle shot list) collide audibly. Cheap fix: the shot list calls the tool by vendor name plus "the recording tool." Fix in Studios.
11. **CPN is unusable but still load-bearing** in the GA arc doc and the post-GA arc doc. The bodies need rewriting, not just banners. Fix in bemo-os.
12. **Maryellen's surname is wrong in five pre-August-6 files.** Back-correct once. Fix in Studios.
13. **The core video set was never produced under its six names**; the sizzle reels are its descendants. Record in the core-video-set doc that the set is superseded by the sizzle roster. Fix in bemo-os.
14. **The email platform is stated three ways.** HubSpot is the de facto platform (the pre-GA plan and the week-25 edcal); the growth docs still say "ConvertKit, Beehiiv, or Substack"; the week-30 plan says only "Email." Ratify HubSpot or choose, then reconcile. Fix in bemo-os. Becky and Lee.
15. **The growth docs' operating model does not match the executing practice.** The ecosystem and engine docs assume a dedicated content-operations role (a ninety-minute production day, a multi-platform scheduling tool, delegated commenting); the practice is manual posting by Becky with no scheduler. Either rewrite the docs to current capacity, or ratify the staffing plan they require and staff it. The daily minimums and KPI tiers inherit the same problem. Fix in bemo-os. Becky and Lee.
16. **Webinars are superseded but not marked.** Daily office hours replaced the Lunch and Learn for the launch window per Bill's ratified advice; the webinar strategy doc still reads as active. Record the supersession and decide whether the series resumes after the launch window. Fix in bemo-os.

## Homeless parts

Things that run but live nowhere durable. Proposed homes:

| Part | Lives today | Proposed home |
|---|---|---|
| The Standing Week | One paragraph in the week-30 asset plan, one table in the posters campaign | A standing doc in the narrative-arc folder (the week-30 plan itself asks for this) |
| The cadence canon | Repeated in each asset plan | The same standing doc |
| The review surface rule | Repeated in asset plans | The same standing doc |
| The brand guidelines | `bemo-website/DESIGN.md` plus the Studios production standards | The canon, per Becky's August 16 ruling; the website and the studio quote it |
| The rotation rule and story release order | `planning/ga-onramp.md` | The customer-stories overview, beside the roster it governs |
| The UTM convention | Memory plus one week's link list | The Studios production standards, quoted by asset plans |
| The close records | Nowhere (the spec says the published folder) | Start writing them; one file per week beside the ledger |
| The intake | Nowhere; arrival is by memory | One list, reviewed every Monday |
| The week-31-plus runway | Owed since the week-29 close | Lee's runway doc, then anchors as usual |

## Standing debts (not naming, just behind)

- The published ledger owes as-published files for the weeks of June 21 through July 12, and Becky's individual-post history.
- The Build Notes log is four editions behind; edition four's gate disposition was never recorded; the edition-four comps gate is three weeks late for a date or a decision.
- YouTube channel ownership is unconfirmed, blocking the 30-second parents in both rollout plans.
- The Partner Claims view is written up but not confirmed built in HubSpot.
- The monthly LLM audit has a baseline ("not mentioned," April) and no logged audit since.
- The blog pipeline (the anchor's twenty-second asset) is specified and unbuilt; `/blog` is an orphan route.
- App-specific welcome videos are suppressed in the app and need rebuilding; the walkthrough library is sequenced behind the things-to-try guide.
- The content stockpile (the bad-week insurance) does not exist.
- App-side Plausible (the signup goal) is an open ask with Lee; until it lands, the launch dashboard cannot read activation.
- Both Studios README production tables are stale, and two shipped productions still carry DRAFT briefs.

## What ratification looks like

If this page is right, the sequence is: Becky ratifies the layer names, the Standing Week, and the walkthrough as the reference version of the process; the Standing Week, cadence canon, and review rule get one standing doc in the bemo-os narrative-arc folder; the brand guidelines get their canon home; the sixteen collisions get their rulings logged where each fix lands; the working-ahead ledger gets a target column ratified so "behind" is checkable; and this page shrinks to a map that only points. The engine itself does not change. It is already running; this gives it a control panel.

---

*v5, August 16, 2026: the walkthrough now matches the executing week: added the publish-day pass (rulings closed, anti-pattern and voice pass, claims audit re-run) and the named-story courtesy loop as steps, and the Field Notes video's own path (founder-recorded, no pipeline). Office hours recorded as Becky and Lee's, usable as a CTA when needed. The engagement rows stand as written per Becky's ruling. v4, August 16, 2026: five Becky rulings applied. The brand guidelines belong in the canon (recorded in the Canon layer and the homeless parts). The Voices layer names the voices only, with no rules attached; per-piece approvals are granted, and the lane, CTA, and posting-split rules came out of the layer, the walkthrough, and the ownership map. The carousel posts on Becky's page. Ask It Something It Can't Know is recorded as a piece of content, not a franchise. The beta-evidence formats table is removed. v3, August 16, 2026: applied Becky's naming policy (only Becky, Lee, and Molly named on content work; the sales lane, the automation builds, and the ICP review appear as roles) and corrected collision 15, whose premise was wrong: the growth docs' operating model mismatch is a staffing-versus-practice question, not a departure. v2, August 16, 2026: added the life-of-one-asset walkthrough, the ownership map, the working-ahead ledger, the intake, The Conversation layer, The Doors layer, the email machinery, the beta-evidence and in-product format registers, and collisions 14 through 16. v1, August 16, 2026: first draft from the full two-repo inventory.*
