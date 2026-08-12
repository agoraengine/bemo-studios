# GA Onramp: Plan on a Page

Working timeline, built 2026-08-11 from the BeMo GTM and BeMo Strategic Tasks Trello boards. Trello stays the system of record; this page is the at-a-glance view. It also doubles as the working draft for "Deliver the GA timeline with error bars to Bill" (due Sep 4).

**The shape of it:** site live in beta posture Thursday Aug 14, launch-week content and the pricing decisions clear through Aug 21, Lee builds Wave 3 (the editor and front page) while the pricing experiment runs through Aug 28, editions ship and get benchmarked through Sep 4, billing gets built the week of Sep 7, everything gets tested the week of Sep 14, then the GA gate. **GA date model per the board: P50 = week of Sep 21, P80 = by Oct 2.** GA itself is deliberately small: "Start beta" becomes "Start free" and pricing switches on, on a page that is already proven.

Owner tags come from board labels and list ownership. "Blocked" means the card carries the Blocked label; most unblock when the item above them lands.

---

## Week of Aug 10: open beta goes live (this week)

### Wednesday Aug 12
- [ ] **Lee:** Merge/confirm Vercel production branch serves the new site build (go-live blocker)
- [ ] **Lee:** Fix signup delivery (RESEND_API_KEY / LEAD_WEBHOOK_URL) and confirm the signup path
- [ ] **Lee** (blocked): Repoint the live site deployment to the BeMo Vercel account
- [x] Clean up sizzle-reel numbering in the repo (done Aug 11)

### Thursday Aug 13
- [ ] **Lee:** Install analytics and role capture on signup (the $50/day experiment runs blind without it)
- [ ] **Lee:** Configure and test AI usage caps (the hold-the-date blocker for open signup)
- [ ] Verify the privacy policy is live and linked from signup
- [ ] Verify the terms of use are live and linked from signup
- [ ] **Lee:** Record the new standing HeyGen avatar (dual-purposed with the Thursday Forefront session)
- [ ] Decide: be-mo Vercel project owns production and bemointel.ai (handoff)
- [ ] (blocked): Go live in beta posture, soft launch, no announcement fanfare
- [x] Turn on indexing (ALLOW_INDEXING=true) and gate orphan routes (done)
- [x] Beta copy pass: "Start free" to "Start beta," expectations line, grandfather commitment (done)

### Friday Aug 14: site-live day
- [ ] (blocked): Remove beta mode from signup
- [ ] Verify signup leads land where Jon can work them
- [ ] **Becky:** Publish the launch post on LinkedIn, nudge Bill to comment
- [ ] **Becky:** Publish reel 1 "Six Tools" (launch reel plus the 60-second hero share)
- [ ] **Becky:** Launch day content (the full launch-day set, soft by design)
- [ ] **Becky:** Ship the top things-to-try guide to every signup (draft and send-out plan ready for review: planning/things-to-try.md; manual founder email at launch, Lee automates via Resend the following week)
- [ ] **Becky:** Send sizzle and website to Jay, Mark, and Christian once live
- [ ] **Becky:** Restore dark mode on the latest site version
- [ ] **Becky** (blocked): Launch the $50/day LinkedIn telemetry experiment
- [ ] Start office hours: daily 30 to 60 minutes, same time each day
- [ ] **Lee:** Finish Kill-ES: blind relevance rating and the Wave 4 go/no-go decision
- [ ] Decide (**Becky**): Ratify 04-enterprise-pricing, amend doc 12, add the doc 17 entry
- [ ] Decide (blocked): Resolve pricing tier names before the pricing page publishes
- [ ] **Becky:** Week 29 anchor publishes (Maryellen's "It Told Her When It Was Guessing")
- [ ] **Becky:** Common Table press release video share cut ships
- [ ] **Becky:** LinkedIn Sizzle Series rollout launches
- [ ] Jon Kelley midpoint review, and write up the July 30 kickoff that never got recorded
- [ ] **Becky:** Close the open action items from the Aug 5-6 syncs

### Weekend Aug 15-16 (ahead of the Monday Bill meeting)
- [ ] Decide: Portfolio pricing model: enumerate scenarios, name it, propose pricing (Fable draft)
- [ ] **Becky:** Mock up the pricing page with portfolio/Allocate for the Bill meeting

---

## Week of Aug 17: proof, pipeline, and the decision stack

- [ ] Aug 17: Contracts and terms of service established (legal foundation)
- [ ] Aug 19 **Becky:** Meg Poe quote-card sign-off, then release the Meg story (opens the standing cadence)
- [ ] Aug 19 **Becky:** Brief Mark on Allocate before the Thursday Monica call
- [ ] Aug 21 **Becky:** Build the HubSpot Partner Claims view; log Jon's prospects first (unblocks Jon and Molly)
- [ ] Aug 21 **Becky:** Second customer story: check sign-off, queue two weeks after Meg
- [ ] Aug 21 **Becky:** White-glove onboard Jay's beta org (Daniel); credentials already sent the week of Aug 3 (Becky, Aug 11)
- [ ] Aug 21 **Becky:** Map the beta cohort into one live HubSpot pipeline
- [ ] Aug 21 **Becky:** Ecosystem contact map
- [ ] Aug 21 **Becky** (blocked): Molly onboarding: agreement, FirstPromoter account, disclosure rules, lanes call with Jon
- [ ] Aug 21: Create and configure FirstPromoter, verify attribution with one end-to-end test signup
- [ ] Aug 21: Submit the LinkedIn API application (approval takes weeks; every unsent week costs)
- [ ] Aug 21: Advisor loose ends close out (Bill's fractional role ends Aug 21)
- [ ] Aug 21: Ecosystem beyond Blackbaud: TAG, TechSoup, quarterly partner evaluations

**Decisions due Aug 21:**
- [ ] Ratify the Allocate pricing architecture (04-pricing-architecture)
- [ ] Decide which milestone declares GA, and the date (Lee, open since Jul 31)
- [ ] Decide Enterprise stub timing: launch vs GA (Lee)
- [ ] Decide Molly affiliate test timing vs paid LinkedIn (Lee)
- [ ] Decide Jon's commission duration: 6 vs 12 months (Lee)
- [ ] Set the paid budget ceiling and the reassessment point (Lee)

---

## Week of Aug 24: Wave 3 build and the pricing experiment (due Aug 28)

- [ ] **Lee:** Build Wave 3: the editor and the front page (THE remaining GA-gating build)
- [ ] **Lee:** Build the art desks: photo desk (Drive) and numbers desk (charts as citations)
- [ ] **Lee:** Create the staging environment for the GA release (nowhere to rehearse the cutover today)
- [ ] **Becky:** Run the ~100-person pricing experiment with Fable (feeds the GA pricing gate)
- [ ] **Becky:** Assemble the press kit and narrow media list
- [ ] **Becky:** Script reels 2 through 7: one specific use case each, weekly cadence through September
- [ ] **Becky:** Stand up report-card posts and the weekly beta newsletter from office-hours transcripts
- [ ] **Becky:** Follow through the Terrero foundation intros (Syracuse, Charleston, Nevada)
- [ ] **Becky:** Testimonials and case studies: build the bench

---

## Week of Aug 31: editions ship, month-end reviews (due Aug 31 to Sep 4)

- [ ] Aug 31 **Lee** (blocked): Ship the email edition; founders' Monday edition first (starts the dogfood validation clock)
- [ ] Aug 31 **Becky:** Define the BFG case-study pilot (needs review; an August commitment)
- [ ] Aug 31 (blocked): Partner follow-ups: Compliagence, BFG, Nonprofit Hive, Blackbaud
- [ ] Aug 31: Community foundation channel: pilot and pipeline targets (Q3 ends Sep 30)
- [ ] Aug 31: Beta Learning Review (monthly)
- [ ] Aug 31: Runway and capital decisions (the hardest constraint behind everything else)
- [ ] Sep 1: Monthly Financial Review
- [ ] Sep 1 **Becky:** Capture and ship the first-run homepage demo slot (the hero-slot capture)
- [ ] Sep 1 **Becky:** Academy lesson pipeline milestone check (2 of 270 delivered so far)
- [ ] Sep 1: Trademark filing
- [ ] Sep 2: Monthly LinkedIn analytics
- [ ] Sep 4 **Lee** (blocked): Build the report card (week-in-full)
- [ ] Sep 4 **Lee:** Build the conservator: freshness, decay, retirement with history
- [ ] Sep 4 **Lee** (blocked): Benchmark editions against hand-written month summaries (2 to 3 weekly cycles, so this spans into September)
- [ ] Sep 4 **Becky + Lee:** Origin story: run the two ~20-minute founder voice interviews (six things wait on these)
- [ ] Sep 4 **Becky:** Deliver the GA timeline with error bars to Bill (this document is the working draft)
- [ ] Sep 4: Decide: Ratify the collaboration proposal (gates the Team wave)

---

## Week of Sep 7: billing week (due Sep 7)

- [ ] **Lee** (blocked): Widen ga.home (Waves 1 through 3) to the beta cohort (GA wants one stable week on this)
- [ ] **Lee:** Configure products in Stripe (Free, Individual $100, Team $250 + seats)
- [ ] **Lee:** Integrate Stripe into the BeMo UI (plan selection, checkout, subscription management)
- [ ] **Lee:** Develop the upgrade flow (upgrading loses nothing)
- [ ] **Lee:** Configure webhooks for subscription events (entitlements track Stripe truth)
- [ ] **Lee:** Create the nonprofit-friendly cancellation flow (walk away anytime is a published promise)
- [ ] **Lee:** Run Stripe sandbox tests before switching to live keys
- [ ] **Lee:** Configure Stripe sales tax (including the New York State question)
- [ ] **Lee:** Develop upgrade prompt logic (undated on the board; rides this week)
- [ ] **Lee:** Develop weekly cap reset logic (undated on the board; rides this week)
- [ ] Write upgrade prompt copy and review against the voice and tone doc (undated; pairs with the prompt logic)

---

## Week of Sep 14: test everything (due Sep 14)

- [ ] Test password reset end to end (strangers cannot email a founder they have never met)
- [ ] Test app and feature availability by subscription tier
- [ ] Test all templates (structured sample across the ~112)
- [ ] Test all courses (sampled across ~2,700 files), plus the learner-seat UAT pass
- [ ] Test all document download modes (PDF, .docx, .rtf)
- [ ] Verify seeding and auto-capture of knowledge base items
- [ ] Test all conversation starters (first-session value for an empty knowledge base)
- [ ] Test the data deletion flow (can we delete, and can we prove we did)
- [ ] Validate GDPR/CCPA readiness
- [ ] Verify the data encryption posture (in transit and at rest, documented)
- [ ] Sep 11: Founders monthly meeting
- [ ] Sep 18: Decide: Ratify units-of-work plus slot pricing; pick the user-facing name (never "agents")

---

## Week of Sep 21: the GA gate

All of these hold before the sign changes. P50 is this week; P80 is by Oct 2.

- [ ] Language gate: ICP-fit strangers describe BeMo in the intended language
- [ ] ga.home widened to beta for at least one stable week, nothing on fire
- [ ] Pricing tested, tier names settled, page ready to switch on
- [ ] Billing verified end to end in live mode
- [ ] Legal verified: privacy and terms linked from signup, data deletion works
- [ ] **DECLARE GA: copy swap "Start beta" to "Start free," switch on pricing**

---

## Undated cards that need a week assigned

- [ ] **Becky:** Platform welcome videos and tours: GA-readiness review (do they get a new user to value without support)
- [ ] **Becky:** App-specific welcome videos and tours (assets do not exist yet; shaping decisions first)
- [ ] **Becky:** Video content: the walkthrough library for onboarding, support, and sales
- [ ] (blocked): Positioning and branding sweep: "Four apps. One product." plus the flagged claims
- [ ] Decide: Choose the first integration (research points to HubSpot first)
- [ ] **Lee:** Improve the document research phase (product polish, not explicitly gating)
- [ ] **Lee:** Add more context to the BeMo help skill
- [ ] **Lee:** Generic (fallback) template for the dispatcher

## Verify and close (shipped, needs a confirmation pass)

- [ ] Super-demo-60 VO recorded Aug 8 and in Bill's hands Aug 9: verify and close
- [ ] Google auth (shipped May, v2.4): verify and close
- [ ] Feature flag system (ga.home / ga.billing / ga.team live): verify and close
- [ ] Website copy (written, review rounds done Aug 6): verify and close
- [x] Stripe account created

## Standing cadence (runs the whole onramp)

- Office hours daily for the first two weeks, then Monday/Wednesday/Friday
- Never two weeks without published beta evidence (Meg first, second story two weeks behind)
- Kill underperforming ads within 14 days, no exceptions
- Two-strata outcome capture in every beta conversation (what changed, who did you tell)

## Deliberately after GA

Waves 4 through 7 of the build (Plan leaf, Team matched set, collaboration suite, integrations, standing behaviors), the whole data-and-funder track, the affiliate cohort at scale, social channel expansion, the post-GA Academy course rollout, and the parking lot (internationalization, Hello Chaos podcast, BBCON, Nonprofit Hive, Omatic, live webinar). None of it gates the gate.
