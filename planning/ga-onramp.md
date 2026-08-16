# GA Onramp: Plan on a Page

Working timeline, built 2026-08-11 from the BeMo GTM and BeMo Strategic Tasks Trello boards. Trello stays the system of record; this page is the at-a-glance view. It also doubles as the working draft for "Deliver the GA timeline with error bars to Bill" (due Sep 4).

**The shape of it:** site live in beta posture Thursday Aug 13 (confirmed by Becky the evening of Aug 12; the board's Aug 14 date is superseded, and Aug 14 is a Friday), launch-week content and the pricing decisions clear through Aug 21, Lee builds Wave 3 (the editor and front page) while the pricing experiment runs through Aug 28, editions ship and get benchmarked through Sep 4, billing gets built the week of Sep 7, everything gets tested the week of Sep 14, then the GA gate. **GA date model per the board: P50 = week of Sep 21, P80 = by Oct 2.** GA itself is deliberately small: "Start beta" becomes "Start free" and pricing switches on, on a page that is already proven.

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

### Thursday Aug 13, continued: site-live day (moved up from Friday Aug 14, Becky's call the evening of Aug 12)
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
- [x] Meg Poe story sign-off: arrived early, August 13 (recorded in bemo-os, `docs/customer-stories/meg-poe-aea-sponsorship-program.md`)
- **Moved (Becky, Aug 13): the Meg case study is not available until the week of Aug 31.** Release rescheduled to that week's section below; nothing Meg-related runs this week.
- [ ] **Becky:** Publish the appeal letter story as this week's beta evidence (added Aug 13; covers the first of the two dark weeks). **Named, not unnamed (superseded Aug 16):** the Week 30 anchor's ruling 1 (Becky, Aug 13, recorded in bemo-os `docs/communications/narrative-arc/anchors/2026-w30-seems-like-ai-slop.md`) runs Jen named, and that ruling explicitly supersedes the unnamed handling below. The story now publishes as the Week 30 anchor itself ("Seems Like AI Slop," Monday Aug 17), which quotes her heavily and names her employer; the asset plan is bemo-os `docs/communications/narrative-arc/anchors/2026-w30-asset-plan.md`. The unnamed reasoning below is kept for the record. Source: `docs/customer-stories/jennifer-allen-sspl-appeal-letter.md` in bemo-os. The claim it carries: an annual appeal letter that used to take a few hours took about 30 minutes, and came out "more clear and concise" (her words, Aug 13). The story beats underneath it: chat routed her to the template without her knowing its name, the questions were the kind "a seasoned development professional would ask," it held a space for a quote she didn't have yet, and it produced a gift-level list she never asked for, sized right for her organization.
  - **Why unnamed, and it is Becky's call to reverse:** Jen has blanket approval, so unnamed is less than she has already granted and can never be an overstep. The reason is bench optics, not permission. Her name carried the July annual report post and is now attached to the McGovern submission; Landis leads named the week of Aug 31 and Meg follows named Sep 7. A third Jen appearance inside six weeks makes a four-org bench read as a one-org bench. Unnamed here keeps the named cadence reading as three different organizations in three releases. Precedent for anonymized use is the commitment rule in bemo-os `docs/internal/initiatives/message-house.md`.
  - **The cost of going unnamed:** peer trust runs on the name (`docs/initiatives/trust-framework/06-peer-trust-as-distribution.md`), so this lands as a weaker signal than a named story. Mitigation: keep it specific and verifiable in principle (the executive director of a library friends group, the actual deliverable, the actual numbers), never generic. If it reads thin without the name, name her; nothing blocks it.
  - Optional courtesy: tell Jen it is running and that it is unnamed for pacing reasons, not privacy. She may well prefer to be named, and that answer is worth having before the next placement.
- [ ] Aug 19 **Becky:** Brief Mark on Allocate before the Thursday Monica call
- [ ] Aug 21 **Becky:** Build the HubSpot Partner Claims view; log Jon's prospects first (unblocks Jon and Molly)
- [ ] Aug 21 **Becky:** Landis Andrews customer story check-in: she builds it in BeMo during her heavy-usage week starting ~Aug 16 (yes received Aug 13, DM thread in bemo-os `docs/source-files/`). **Story order swapped (Becky, Aug 13): Landis releases first, week of Aug 31; Meg follows the week of Sep 7.** When the story arrives: her edits are the approval of the words; confirm the specific placement in the thank-you reply
  - **May land a week early (Becky, Aug 13): Landis possibly back in time for the week of Aug 24.** This check-in is the decision point. The gate does not move: story in hand with her edits, placement confirmed in the thank-you reply. If all three hold by Aug 21, release Aug 24; if not, it stays Aug 31 and nothing is lost. Treat Aug 24 as a gate, never a date, because she starts building ~Aug 16 and a release that week asks her to finish inside about a week
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

- [ ] **Becky (conditional, Becky's Aug 13 read):** Release the Landis Andrews case study here instead of Aug 31 if her story is in hand with her edits by the Aug 21 check-in. Same gate, same story, one week earlier. Two things get better if it lands: the customer-story cadence runs four consecutive weeks (Maryellen Aug 10, appeal letter Aug 17, Landis Aug 24), and the spacing to Meg on Sep 7 widens to two weeks, which **retires the one-week exception** recorded against the Landis/Meg pair below and puts the pair back inside the message-house at-least-two-weeks guidance. If it slips, it stays Aug 31 with no cost

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

- [ ] **Becky:** Release the Landis Andrews case study (order swap, Becky's call Aug 13: Landis leads, built in BeMo in her own words during the week of Aug 16; multi-client consultant ICP, the organizational-memory register). Opens the standing customer-story cadence. Gate: the story is in hand with her edits, and placement confirmed in the thank-you reply. **This is now the fallback week:** if her story clears the gate by the Aug 21 check-in it releases the week of Aug 24 instead (see that section), and this line closes.
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

- [ ] **Becky:** Release the Meg Poe case study (pushed one week from Aug 31, Becky's call Aug 13, so Landis leads; sign-off in hand since Aug 13, curation instruction in the story file). Second story in the cadence. **Meg stays here either way**, whether Landis runs Aug 24 or Aug 31; moving her up to chase Landis would only recreate the one-week spacing this is meant to avoid. Note: one week behind Landis, which amends the message-house at-least-two-weeks spacing guidance for this pair; Becky's call. **The amendment self-retires if Landis lands the week of Aug 24**, since the gap widens to two weeks and the pair no longer needs an exception
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
- Never two weeks without published beta evidence (order per Becky's Aug 13 calls: Landis releases the week of Aug 31, Meg the week of Sep 7). **Gap now covered (Becky, Aug 13):** Maryellen's story ran Aug 10 and the weeks of Aug 17 and Aug 24 were dark, which breached this rule. The appeal letter story (unnamed) takes the week of Aug 17, and the report-card posts plus the weekly beta newsletter stand up the week of Aug 24, so the cadence runs unbroken into Landis on Aug 31. Held in reserve if either slips: a Patti Connolly quote card (needs her ok) or a Maryellen derivative (her blanket covers her name and words; naming the foundation needs her look).

  **If Landis lands the week of Aug 24** (Becky's Aug 13 read, gated on the Aug 21 check-in): Aug 10 Maryellen, Aug 17 appeal letter unnamed, Aug 24 Landis, Aug 31 report cards and newsletter, Sep 7 Meg. Four straight weeks of story evidence and no week over the line. Note what this does to the Aug 17 slot: with Landis on Aug 24 the dark stretch was only ever one week, so the appeal letter stops being required and becomes a choice. Keep it anyway. It is the only release on this board that depends on nobody else, the story is finished and permissioned today, and if it holds the week then Landis slipping costs a week of polish instead of the cadence rule.
- Kill underperforming ads within 14 days, no exceptions
- Two-strata outcome capture in every beta conversation (what changed, who did you tell)

## Deliberately after GA

Waves 4 through 7 of the build (Plan leaf, Team matched set, collaboration suite, integrations, standing behaviors), the whole data-and-funder track, the affiliate cohort at scale, social channel expansion, the post-GA Academy course rollout, and the parking lot (internationalization, Hello Chaos podcast, BBCON, Nonprofit Hive, Omatic, live webinar). None of it gates the gate.
