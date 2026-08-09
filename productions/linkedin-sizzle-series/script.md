# Script: LinkedIn Sizzle Series

**Status:** Reel 1 LOCKED, both cuts (30s 2026-08-01, 60s 2026-08-02); later reels not started
**Version:** v1
**Runtime target:** 30 seconds per reel (v1.5 pace runs the 30s cut at 25s and the 60s cut at 52.5s, inside the vertical-cutdown band)
**Word count:** reel 1: 38 narration words in the 30s cut, 93 in the 60s (all VO at 1.12x, the GA close-scene pace, per Becky Aug 2)

*Locked means the VO has been generated against this text. Changes after lock require regenerating audio, so lock late and change deliberately.*

*One file, an open-ended series. Each reel gets its own table, claim trace rows, and lock status, because the reels ship on different weeks. Shot IDs are prefixed per reel (R1-S1) so `shot-list.md` and the capture script stay unambiguous across the series.*

---

## Reel 1: Starting From Zero

**Arc job:** feel the problem (stateless AI, the mission explained again and again). One pillar: Stop Starting Over.
**Format:** vertical (9:16) primary, 16:9 secondary. Written muted-first: the on-screen column carries the whole argument; narration reinforces.

| Time | Narration | On screen | Shot |
|---|---|---|---|
| 0:00 | You've been trying the AI tools. And they're good. | A generic AI chat. A hand types a mission explanation into the empty box: "We're a small nonprofit. Our mission is..." Caption: "Monday. A new chat." | R1-S1 |
| 0:06 | But every conversation starts from zero. You explain your mission again. | A different empty chat, same sentence being typed from the start. Caption: "Thursday. Explaining it again." | R1-S2 |
| 0:13 | And again. | A third empty chat. Nothing typed yet, cursor blinking. Text resolves: "Every one starts from zero." | R1-S3 |
| 0:17 | BeMo is where your organization's knowledge lives. You never start over. | The thesis headline, then "You never start over." resolves beneath it. | R1-S4 |
| 0:16.8 | Four apps. One product. | Icons cascade in: Compass, FunderStorm, Amplify, Academy, headline synced to land with the line. | R1-S10 |
| 0:21.1 | BeMo. Where missions gain momentum. | Wordmark and tagline, same words, "bemointel.ai" small beneath. Held to the end. | R1-S5 |

### Notes

**The opening is the concession.** "They're good" buys permission for everything after it, same reasoning as the GA sizzle: the argument was never that general AI is bad, it is that it has no memory of you (`competitors/diy-ai/`). A video that opens by insulting the viewer's tools loses them in three seconds.

**"And again." is its own beat, not just its own sentence.** In the GA sizzle it got a pause; here it gets four seconds of screen. The repetition is the argument, so the structure repeats: three chats, three starts, nothing carried.

**The typed mission text stays generic and unfinished.** "We're a small nonprofit. Our mission is..." names no organization, implies no customer, and cuts off because the viewer knows the rest. Rule 4 (no faked data implying a customer) is why it never gets specific.

**VO is generated; reel 1 is locked (2026-08-01).** Three segments, all the "Becky Kern -- 37" clone (`7fa742e991de4771a83eb35b53515833`):

- R1-S1 through R1-S3: reuse `../ga-sizzle-reel/capture/out/vo/s1-ai-tools.wav` (9.2s, the full S1 text at 1.0x), placed across the three scenes by its word timestamps ("And again." lands in R1-S3).
- R1-S4: `capture/out/vo/r1-s4-thesis.wav`, new generation at 1.06x (matching the GA sizzle's thesis-scene speed), 4.6s, timestamps in the `.json` sidecar.
- R1-S5: `capture/out/vo/r1-s5-beta-open-v2.wav` ("The beta is open. Come build something with us today.", Becky's revision 2026-08-02), 1.12x, 3.3s, sidecar likewise.

**Vertical safe area.** All text inside the middle 80% vertically; captions sit at the bottom of that band, not below it.

**No GA mention, no countdown.** Pre-GA arc guardrail, per the brief. The CTA is a fact about the beta, not an announcement.

### Reel 1, 60-second cut (LOCKED 2026-08-02)

**Why it exists:** Becky's call, Aug 2: a fuller version Bill and Jon can share and that posts on LinkedIn. Same single message as the 30s cut (Stop Starting Over; the build and finished-work beats are pillar 1's memory and voice expressions per the map). The extra 30 seconds show the payoff: what work looks like when nothing resets.

**Every narrated line is existing locked VO.** No new generation is needed; locking this cut is an assembly decision, not an audio one.

| Time | Narration | On screen | Shot |
|---|---|---|---|
| 0:00 | You've been trying the AI tools. And they're good. | As the 30s cut: generic chat, mission being typed. Caption: "Monday. A new chat." | R1-S1 |
| 0:06 | But every conversation starts from nothing. You explain your mission again. | Second chat, same sentence from the top. Caption: "Thursday. Explaining it again." | R1-S2 |
| 0:13 | And again. | Third empty chat, cursor blinking. "Every one starts from zero." | R1-S3 |
| 0:17 | BeMo is where your organization's knowledge lives. Conversation first. Memory preserved. You never start over. | Thesis headline; the three phrases resolve beneath it (the GA sizzle S2 scene, unchanged). | R1-S6 |
| 0:25 | An email. A call note. A spreadsheet. A message. Scattered on their own. Held together, they become what your organization knows. And it keeps building. | Four fragments drift in and resolve into one organized record (the GA sizzle S3 scene). | R1-S7 |
| 0:37 | So the work comes out finished, in your voice, with nothing re-explained. | A real finished Amplify appeal letter (demo org), cropped to the letter body. | R1-S8 |
| 0:44 | Your next grant cycle should start where your last one ended, not from scratch. | The line above a FunderStorm screen showing a cycle carrying forward. | R1-S9 |
| 0:41.5 | Four apps. One product. | Icons cascade in: Compass, FunderStorm, Amplify, Academy, headline synced to land with the line. | R1-S10 |
| 0:45.3 | BeMo. Where missions gain momentum. | Wordmark and tagline, same words, "bemointel.ai" small beneath. Held to the end plus tail. | R1-S5 |

**VO map (v13, the full upbeat pass):** every narrated line is a HeyGen Avatar V read on Becky's twin voice, `capture/out/vo/becky/hg-r1-{l1,l2,l3,l4a,l4b,l5,l6,l7,l8,fourapps}.wav`, one source end to end (Becky's Aug 4 evenness note). Words are verbatim from this script; upbeat delivery cues and the "Bee Mo" phonetic exist only in the generation text. Her recorded session takes (`becky/b2-r1-*.wav`) and the GA sizzle segments stay on disk as fallback.

**Generation path for future VO (Becky, Aug 4): audio-only.** No avatar video render is needed for voice work; HeyGen's speech endpoint (`create_speech`) takes her voice ID directly and returns word-level timestamps for the sync passes. Verified working with the twin voice the same day. Avatar renders are for when a presenter is on screen (Academy), not for narration. **Caution:** the speech endpoint reads `[pause]` literally (it said the word "pause" in v16; caught by Becky). Pauses in audio-only reads are built by generating around the beat and splicing real silence, never with the `[pause]` directive, which only the avatar-video path honors. **Amended (Becky, Aug 6, hero vH12):** one pipeline per track. The speech endpoint and Avatar V sound audibly different even on the same voice; never mix them in one reel. When a track reuses approved Avatar V segments (the `hg-r1-*` set), any new lines for that track generate through Avatar V as well.

**Word count:** 78 narration words, about 31 seconds of speech across 60 seconds; the half-silent density holds.

**The pillar card is spoken as well as shown** (Becky's consistency rule, Aug 2: the VO says what the words on screen say). Verbatim from the map's pillar table; it sits late, not as a headline, which keeps the grant-cycle guardrail (one instance of the pattern, never the frame).

**Distribution note:** one cut serves both uses pre-GA. Posted, the beta line is the CTA; sent by Jon or Bill, it opens a conversation rather than pushing a signup, which is what the standards ask of an affiliate-sent sizzle. The Wave 2 re-post swaps the end card.

### Claim trace: reel 1

| Line | Claim | Traces to |
|---|---|---|
| "You've been trying the AI tools. They're good." | Concession, not a claim about BeMo | `competitors/diy-ai/`; carried from the locked GA sizzle script |
| "every conversation starts from zero" | General AI tools are stateless | `messaging-assets-v1.md` differentiator 1 ("session 500 knows your organization; session 1 of ChatGPT never will") |
| "Every one starts from zero." (on screen) | Same claim, visual form | Same trace; also matches the live site FAQ ("a general chatbot starts from zero every session"), one voice confirmed |
| "BeMo is where your organization's knowledge lives." | The roof, verbatim | `messaging-assets-v1.md` section 1; site hero H1 |
| "You never start over." | Supporting phrase, verbatim | `messaging-assets-v1.md` (the three supporting phrases); matches website hero |
| "Where missions gain momentum." | Tagline | `messaging-assets-v1.md` line 77, ratified |
| "Conversation first. Memory preserved. You never start over." (60s cut) | The three supporting phrases | Locked GA sizzle S2; `messaging-assets-v1.md`; matches the website hero |
| "they become what your organization knows. And it keeps building." (60s cut) | Knowledge compounds | Locked GA sizzle S3 trace: `messaging-assets-v1.md` claim 3; `02-core-insight.md` |
| "finished, in your voice, with nothing re-explained" (60s cut) | Deliverable claim, not capability claim | Locked GA sizzle S3b trace: `messaging-assets-v1.md` claim 1 |
| "Your next grant cycle should start where your last one ended, not from scratch." (60s cut, on screen) | Pillar 1 converting message, verbatim | `ga-message-map.md` 3.2 (FunderStorm lead message); `messaging-assets-v1.md` pillar table |
| "Four apps. One product." (both cuts) | Category self-description; the four components are not bundled tools | Gestures at the unifying claim in `ga-message-map.md` 3.1 ("these are not bundled tools; they share organizational memory") but the exact phrase, and "apps" vs. "products" as the count noun, are not map language yet (flagged in `findings.md`) |

---

## Reel 1R: the punchline revision (DRAFT, 2026-08-05)

**Why it exists:** Becky's call, Aug 5, applying Bill's Aug 4 notes to the series cut itself. Bill's read of the original: a good intro that stays an intro, and its trio (knows you, no starting over, your voice) is claimable by too many tools. The revision keeps the arc job (feel the stateless problem) but spends one beat on it instead of three, then gets to what only BeMo can show: answers with the source attached. The locked 30s v13 and 60s v17 stay on disk as records; **1R supersedes them for posting** once approved. Jon keeps sending v17 until the reel 8 hero 60 replaces it.

**One message:** general AI starts from zero; BeMo starts from what your organization knows, and shows its sources.

| Time | Narration | On screen | Shot |
|---|---|---|---|
| 0:00 | Another blank chat. Explain your mission. Again. | One empty AI chat with the mission being typed; ghost duplicates stack behind it. "Every one starts from zero." | R1R-S1 |
| 0:07 | BeMo doesn't start from zero. It starts from everything your organization already knows. | The flip: the record assembles, facts landing in place. | R1R-S2 |
| 0:13 | Ask what the board decided in March. It answers, and shows you where the answer came from. | An ask typed; the answer composes with its source line visible. Caption: "Every fact, sourced." Provenance: "Illustrated · fictional organization". | R1R-S3 |
| 0:20 | That's not another chatbot. That's your organization's memory, at work. | Navy card: "Not a chatbot. Your organization's memory." | R1R-S4 |
| 0:25 | BeMo. Where missions gain momentum. | Brand close. | R1R-S5 |

**Notes.** The concession survives in compressed form (the ghost chats), so the opening still says "yes, that happens" without three beats of screen time. The differentiated substance is the sourced answer, which is the site's KB receipts story and stays out of reel 10's lane (the gaps message belongs to It Says So). "Not another chatbot" negates a category, which the anti-patterns doc bans as a self-description, not as a contrast; it is the site's own shipped line ("Not an AI chatbot that forgets you between sessions").

**Clock:** 52 narration words, ~22s of speech. Comfortable.

**Claim trace: reel 1R**

| Line | Claim | Traces to |
|---|---|---|
| "Every one starts from zero." (on screen) | Stateless AI | Carried from the locked reel 1; `messaging-assets-v1.md` differentiator 1; site FAQ, one voice |
| "starts from everything your organization already knows" | The roof, behavioral form | `messaging-assets-v1.md` section 1; map 2.1 |
| "what the board decided in March... where the answer came from" | Preserves decisions with sources | Claim map ("preserves the reasoning behind decisions"); site KB copy ("Every fact shows its source"); March board decision is Common Table canon (fact sheet) |
| "Not a chatbot. Your organization's memory." | Category contrast, negated | Site homepage ("Not an AI chatbot that forgets you between sessions"); `18-anti-patterns.md` positioning table (persistent and organizational vs stateless and generic) |

---

## Reel 1C: the commercial cut (director's pass, 2026-08-04)

**Why it exists:** Bill saw the approved 60s cut and it did not grab him the way the website does. Becky's direction: think like a commercial director and copywriter making a 60-second commercial. This cut keeps every ratified line and every scene asset, and changes the grammar: the approved cut explains; this one grabs.

**The craft moves, named:**

- **Cold open in the dark.** Act one plays on the navy world (the close's color), not the white one. Tension lives in the dark; the light is the reward for surviving it.
- **Accelerando.** Monday, Wednesday, Friday: three hard cuts, each chat typing faster than the last, then a wall of ghost windows piling up. The repetition is the argument, so the pacing performs it.
- **A held beat of silence.** Everything cuts to black, one breath, then "Every one starts from zero." slams in word by word. The quietest moment in the film is its loudest line.
- **The turn is a cut, not a fade.** Dark to light in one frame at the thesis. The whole color story is problem-dark, answer-light, brand-navy.
- **Punches, not rises.** Headlines land with scale-overshoot; fragments snap in on eighth-note spacing; icons hit on four beats. Nothing drifts in politely.
- **The wow beat gets a frame.** The streaming "catch her up" answer runs full-screen with a push-in, and "It already knew." gets its own card and its own beat of quiet.

| Time | VO | On screen |
|---|---|---|
| 0:00 | You've been trying the AI tools. | Dark. A chat window up instantly, mission typing fast. Chip: "Monday." |
| 0:02.6 | They're good. | CUT. Second window, same sentence, faster. "Wednesday." |
| 0:04.4 | But every conversation starts from zero. | CUT. Third window, faster still. "Friday." |
| 0:06.8 | You explain your mission again. And again. | Ghost windows pile up across the dark, all typing the same line. |
| 0:09.0 | *(silence)* | Black. A breath. Then, word by word: "Every one starts from zero." |
| 0:11.6 | BeMo is where your organization's knowledge lives. | HARD CUT to light. Thesis slams. |
| 0:15.2 | Conversation first. Memory preserved. You never start over. | Three phrase-punches on beats. |
| 0:18.2 | An email. A call note. A spreadsheet. A message. | Fragments snap in on the words. |
| 0:20.4 | Held together, they become what your organization knows. | Cards fly into the front page; warm pop; push-in. |
| 0:24.4 | Ask it anything. It answers from your own record, and shows you where every piece came from. | The streaming Common Table answer, full frame, slow push-in. |
| 0:30.4 | *(silence)* | Card: "It already knew." One beat. |
| 0:32.4 | So the work comes out finished, in your voice, with nothing re-explained. | The appeal letter writing itself. |
| 0:37.0 | Your next grant cycle should start where your last one ended, not from scratch. | Grant line over the FunderStorm capture. |
| 0:42.0 | Four apps. One product. | Icons punch in on four beats. |
| 0:46.0 | BeMo. Where missions gain momentum. | Navy slam; wordmark drops; tagline. |
| 0:50.2 | The beta is open. Come build something with us today. | CTA card: "The beta is open." bemointel.ai. Hold to end. |

**Claim trace:** every narrated line is already traced in the reel 1 table above (the montage line drops "Scattered on their own." for pace, same claim; "Ask it anything" and the record-and-sources line are the locked GA sizzle S4 text; the beta close is Becky's own ratified revision). No new claims.

**Files:** `capture/source-commercial.html`, `capture/run-commercial.mjs`, VO at `capture/out/vo/becky/hgc-*.wav`. Renders as `bemo-linkedin-sizzle-series-r1-60s-commercial-v<n>.mp4`.

## Reel 1D: The Last Day (storyline pass, 2026-08-04)

**Why it exists:** Becky's note on the commercial cut: it needs a different storyline to be even more attention grabbing. Three treatments were pitched (The Last Day, It Already Knew, An Hour Not Three Days); Becky picked The Last Day. It is the succession story: a person, a clock, and what leaves when she leaves. Same commercial grammar and ratified lines as Reel 1C; the film opens on loss and answers itself at the close.

| Time | VO | On screen |
|---|---|---|
| 0:00 | Maria retires Friday. | Dark. "FRIDAY" chip. Document cards punch in, every one tagged MARIA (Common Table world: Bright Harbor grant report, funder notes, board deck, Harvest Supper run sheet). |
| 0:02.4 | Fifteen years of how this place works. | The cards keep coming. |
| 0:05.2 | Where does it go when she goes? | All four hold. |
| 0:08.2 | When someone leaves, the organization starts over. | The drain: every card grays out and sinks. |
| 0:11.0 | *(silence)* | Black. "It walks out the door." slams in, "out the door." in orange. |
| 0:13.75 | Unless it lives somewhere. | HARD CUT to light, the line as an eyebrow. |
| 0:15.2 | BeMo is where your organization's knowledge lives. | Thesis slam. |
| 0:18.3 | You never start over. | Green punch beneath. |
| 0:20.2 | An email. A call note. A spreadsheet. A message. | Fragments snap on the words. |
| 0:24.0 | Held together, they become what your organization knows. | Cards fly into the front page. |
| 0:27.6 | Ask it anything. It answers from your own record, and shows you where every piece came from. | The new person catches up: the streaming Common Table answer, full frame. |
| 0:33.4 | *(silence)* | Card: "It already knew." |
| 0:35.7 | So the work comes out finished, in your voice, with nothing re-explained. | The appeal letter writing itself. |
| 0:40.4 | Your next grant cycle should start where your last one ended, not from scratch. | Grant line over the FunderStorm capture. |
| 0:45.2 | Nothing walks out the door. | Navy slam: the payoff answers the open, "Nothing" in green. |
| 0:48.0 | BeMo. Where missions gain momentum. | Wordmark drops; tagline. |
| 0:52.2 | The beta is open. Come build something with us today. | CTA card. Hold to end. |

**Claim trace:** the problem lines are the canonical structural-problem language ("When someone leaves, the organization starts over." is verbatim `messaging-assets-v1.md`; "Maria retires Friday" and its cards are fictional Common Table world, no customer implied; "It walks out the door." is the negation setup for the ratified GA sizzle close it answers). Everything from the turn onward is the locked copy already traced in the reel 1 and 1C tables. "What You Built Will Outlast You" (pillar 3) is the arc this expresses; no new claims.

**Files:** `capture/source-lastday.html`, `capture/run-lastday.mjs`, VO `capture/out/vo/becky/hgd-*.wav` plus reused `hgc-*`/`hg-r1-*` segments. Renders as `bemo-linkedin-sizzle-series-r1d-60s-v<n>.mp4`.

## Reel 1W: the website cut (2026-08-05)

**Why it exists:** Becky scrapped the built-scene direction and asked for a 60-second version developed from scratch out of the website build, which is the asset Bill responded to. Bill's advisory notes (2026-08-04 call, notes in Becky's Downloads) shaped it directly: get to a punchline early, deliver substance fast, and position BeMo as the comprehensive platform rather than touring named sub-modules.

**The method:** the film IS the live site. `capture/site-tour.mjs` films the local build (localhost:4000, 1080p native, dev chrome hidden) in one continuous choreographed take: hero settle, What BeMo is, the scroll-driven assembly, the network thesis, the quotes, How BeMo works, the conversation spread, the CTA panel. `capture/run-website60.mjs` cuts windows of that take into story order and mixes VO, music, and captions. Every narrated line is the site's shipped copy verbatim (the hero pair, the fragments line, the assembly intro, "Why do capable organizations stall? They stop remembering.", "Four apps. One memory. Everything gets easier.", "Not four tools that integrate...", the conversation section's lines, "From the people using it.", "Find out what your nonprofit knows.", "Free to start. Your real work. Your data stays yours."), so the claim trace is the website itself and video-to-site consistency is exact.

| Output | Scene (from the take) | VO |
|---|---|---|
| 0:00 | Hero settles, fragments drift | The hero pair, then the fragments line |
| 0:10 | The assembly: fragments snap into the funder page, the front page composes | "BeMo is where that knowledge lives..." / "Watch a scattered week become Monday morning." |
| 0:19 | "Nobody stops caring. They stop remembering." + the Mission Network drawing | The stall line |
| 0:25 | What BeMo is: four apps on one platform, over one Knowledge Base | "Four apps. One memory. Everything gets easier." |
| 0:29 | How BeMo works: the hub | "Not four tools that integrate..." |
| 0:37 | "No menus. No training. Just ask." with the cited Meridian answer | The conversation lines |
| 0:46 | From the people using it (Meg and Jen, the site's own cards) | "From the people using it." |
| 0:50 | The navy CTA panel | "Find out what your nonprofit knows." / "Free to start. Your real work. Your data stays yours." |

**Files:** `capture/site-tour.mjs` (the take), `capture/run-website60.mjs` (the cut), VO `capture/out/vo/becky/hgw-*.wav` + `hge-h1/h2`, renders as `bemo-linkedin-sizzle-series-r1w-60s-v<n>.mp4`.

**Known nit in vW1:** a dev-only DEMO SLOT placeholder (renders null in production) peeks into one bottom edge during the What-BeMo-is hold; hide `[class*="dashed"]` or recapture against a production build before shipping.

## Reel 1A: the app cut (2026-08-05)

**Why it exists:** Becky's note on the website cut: it was all website clips. She wants the website's punch without pulling directly from it: video assets from the app, with branded screenshots. Reel 1A keeps 1W's story and site-copy narration, and swaps the visuals: branded motion frames in the v6 system plus real app footage.

**Structure (58s + 2 tail):** the hero hook pair (branded dark card) -> the scattered week as branded cards using the site hero's own Common Table facts, snapping on the words of the fragments line, flying into the branded front page -> "Nobody stops caring. / They stop remembering." slam -> "Four apps. One memory." icons -> four real app clips ("Not four tools that integrate..." over the cited catch-her-up answer; "No training week. Day one is conversational." over Compass in flow, `website-demo-slots/capture/out/compass-in-flow-raw.webm`; the finished-work line over the Amplify letter; the grant-cycle line over the Grant Progress Report) -> the site's Jen Allen quote as a branded card ("From the people using it") -> close on the CTA panel's own headline "Find out what your nonprofit already knows." with wordmark, Start free, and the trust line.

**Claim trace:** narration is the site's shipped copy plus two locked lines (finished-work, grant-cycle). The Jen quote is the site's published quote, verbatim, inside her blanket approval. Provenance labels on every product visual. One known delta: the close slam shows the site's full "already knows." while the VO reads the shorter "Find out what your nonprofit knows."; regenerate the line with "already" if it grates.

**Files:** `capture/source-appcut.html`, `capture/run-appcut.mjs`, VO reuses `hgw-*`/`hge-*` plus `hgw-w13t.wav` (the close triplet with tightened gaps). Renders as `bemo-linkedin-sizzle-series-r1a-60s-v<n>.mp4`.

## Reels 2 through 7 (DRAFT, 2026-08-05)

Scripted as a batch per Becky's Aug 5 direction (the full roster built out, headline-led). Each keeps the arc job and proof assignment the brief ratified. Format rules identical to Batch 2 (16:9, 30.0s, muted-first, brand close, no GA mention, no urgency).

---

### Reel 2: The Reconstruction Tax (DRAFT)

**Arc job:** name the pattern. Pillar 1. The Week 23 anchor's argument in video form.
**One message:** the cost isn't the work; it's rebuilding the work you already did.

| Time | Narration | On screen | Shot |
|---|---|---|---|
| 0:00 | You know how to do the work. That was never the problem. | Headline: "Knowing what to do was never the problem." | R2-S1 |
| 0:07 | The problem is doing it again. The proposal rebuilt. The context re-explained. The file hunted down. | Ghost copies of the same document stack up; captions land: "rebuilt" / "re-explained" / "hunted down". Headline resolves: "The reconstruction tax." | R2-S2 |
| 0:15 | The work keeps happening. It just doesn't always build. | The signature line alone on a light card. | R2-S3 |
| 0:20 | BeMo is where the work builds instead. Nothing resets. | The stack collapses into one growing record (GA sizzle s3 grammar). "Nothing resets." beneath. | R2-S4 |
| 0:26 | BeMo. Where missions gain momentum. | Brand close. | R2-S5 |

**Clock:** 52 narration words, ~22s of speech. Comfortable.

**Claim trace: reel 2**

| Line | Claim | Traces to |
|---|---|---|
| "Knowing what to do was never the problem." | The Week 23 anchor headline, verbatim | Published arc anchor (brief's arc-pairing note); pillar 1 territory |
| "the reconstruction tax" | Named pattern, external-cleared vocabulary | `ga-message-map.md` 5.1 ("starting over / the reconstruction tax / reconstructing context": external yes) |
| "The work keeps happening. It just doesn't always build." | Signature line, verbatim | `ga-message-map.md` 2.1, established (Week 24) |
| "BeMo is where the work builds instead. Nothing resets." | The inverse claim | Topline language ("Nothing resets."); map 5.1 ("work that compounds") |

---

### Reel 3: It Already Knew (DRAFT)

**Arc job:** see it differently. The onboarding-archaeology rung; descends from Decision Moment.
**One message:** catching someone up stops being a month of digging, because the organization's knowledge is already in one place.

| Time | Narration | On screen | Shot |
|---|---|---|---|
| 0:00 | A new person starts Monday. Their first month? Archaeology. | Headline: "The first month is archaeology." Under it, a dig through folders: drives, inboxes, an old binder. | R3-S1 |
| 0:09 | Ask BeMo to catch them up instead. The mission. The funders. The voice. What the board decided, and why. | The ask, typed: "Our new board member starts Monday. Catch her up." The briefing composes beneath, each fact with its source line. Provenance: "Illustrated · fictional organization". | R3-S2 |
| 0:19 | It already knew. | The line alone on navy (the 1C card grammar). | R3-S3 |
| 0:22 | Because everything your organization has learned already lives in one place. | The roof line resolves: "BeMo is where your organization's knowledge lives." | R3-S4 |
| 0:26 | BeMo. Where missions gain momentum. | Brand close. | R3-S5 |

**Clock:** 55 narration words, ~23s of speech. Comfortable.

**Claim trace: reel 3**

| Line | Claim | Traces to |
|---|---|---|
| "Their first month? Archaeology." | The onboarding problem | Brief's arc pairing (the new board member rung); site Compass copy ("starts from understanding instead of archaeology"), one voice |
| "Ask BeMo to catch them up..." | Real product behavior, illustrated with fictional data | The site's demo ask pill ("Our new board member starts Monday. Catch her up."), shipped copy; KB catch-up is current behavior |
| "What the board decided, and why." | Preserves reasoning | Claim map ("preserves the reasoning behind decisions, not just the decisions") |
| "It already knew." | The reveal line | Locked GA sizzle script; 1C card |
| Roof line | Verbatim | `messaging-assets-v1.md` section 1 |

---

### Reel 4: An Hour, Not Three Days (DRAFT)

**Arc job:** proof from a peer. Pillar 1's Amplify expression. Beta evidence in video form (the arc's standing rule).
**One message:** the annual report took about an hour instead of three days, for a real named person.

| Time | Narration | On screen | Shot |
|---|---|---|---|
| 0:00 | Jennifer runs a library friends group. Her annual report used to take three days. | Headline: "The annual report took about an hour." Photo-free; her name and org in the eyebrow. | R4-S1 |
| 0:09 | This year she built it in BeMo, in her organization's own voice. About an hour. | The real Amplify annual-report flow (existing capture), provenance: "Captured from the product". | R4-S2 |
| 0:16 | (silent, music only) | Quote card: "The most painless report process I have ever experienced." Jennifer Allen, Friends of the Saratoga Springs Public Library. | R4-S3 |
| 0:22 | Every piece of content reflects who you actually are. Not who you were three drafts ago. | The Amplify lead message as the card. | R4-S4 |
| 0:26 | BeMo. Where missions gain momentum. | Brand close. | R4-S5 |

**Clock:** 48 narration words plus a silent proof beat, ~20s of speech. Roomy on purpose; the quote card carries the middle.

**Claim trace: reel 4**

| Line | Claim | Traces to |
|---|---|---|
| "annual report... about an hour instead of three days" | Individual, attributed time story (never a statistical claim) | `ga-message-map.md` 3.2 Amplify proof cell and 3.4 proof ledger; customer-stories overview: **blanket approval** (July 31) |
| Quote card | Verbatim, attributed | Jennifer Allen story file; blanket approval; quotes never composited |
| "in her organization's own voice" | Amplify behavior | Map 3.2 Amplify row |
| "Every piece of content reflects who you actually are, not who you were three drafts ago." | Amplify lead message, verbatim | `ga-message-map.md` 3.2 |

**Provenance rule:** her story is described as hers; the words "self-initiated" or "unsolicited" appear nowhere on screen or in narration (map 3.4: welcome, self-initiated, never "unsolicited"; neither term is customer-facing).

---

### Reel 5: Where It Lives (DRAFT; HOLDS for GA week per the brief)

**Arc job:** discover what exists; reveal register. The series' thesis reel, video companion to the platform launch post.
**One message:** the roof, verbatim.
**Gates:** ships GA week, not before (brief). The Meg card needs its own dated per-use line in the customer-stories overview before render (findings, Aug 1).

| Time | Narration | On screen | Shot |
|---|---|---|---|
| 0:00 | Everything your organization knows lives somewhere. Right now, most of it lives in people's heads. | Headline: "Where does what you know live?" | R5-S1 |
| 0:08 | Your processes. Your funders. Your voice. Your strategy. When someone leaves, it walks out the door. | Four labeled fragments drift apart and fade at the edges. | R5-S2 |
| 0:15 | BeMo is where your organization's knowledge lives. | The roof, alone, full weight. | R5-S3 |
| 0:20 | Four apps. One product. | Icons cascade (R1-S10 scene). | R5-S4 |
| 0:23 | (silent, music only) | Quote card: "I better understand what I've created because of BeMo." Meg Poe, Executive Director, Autoimmune Encephalitis Alliance, Inc. GATED: per-use line required. | R5-S5 |
| 0:27 | BeMo. Where missions gain momentum. | Brand close. | R5-S6 |

**Clock:** 49 narration words plus a silent proof beat, ~20s of speech.

**Claim trace: reel 5**

| Line | Claim | Traces to |
|---|---|---|
| "lives in people's heads... walks out the door" | The ratified problem statement, compressed | `ga-message-map.md` 2.1, ratified 15-second problem statement |
| Roof line | Verbatim | `messaging-assets-v1.md` section 1; map 2.1 |
| "Four apps. One product." | Category line | Map 3.1, ratified Aug 4 |
| Meg quote card | Cleared quote, gated placement | Map 3.4 ("best single line in the arsenal"); customer-stories overview: per-use approval required for this placement (findings) |

---

### Reel 6: The Colleague (DRAFT)

**Arc job:** pillar 2 lead. Compass's converting message, behavior-proofed.
**One message:** you don't have to be the only one who knows how this organization works.

| Time | Narration | On screen | Shot |
|---|---|---|---|
| 0:00 | Somewhere along the way, you became the only one who knows how this organization works. | Headline: "You're the only one who knows how this place runs." | R6-S1 |
| 0:09 | You don't have to be. | The turn, alone on a light card. | R6-S2 |
| 0:12 | BeMo works less like software and more like a colleague who's been in every meeting. | The line lands over a Compass thinking-partner exchange (real capture, compass-in-flow). Provenance: "Captured from the product · fictional organization". | R6-S3 |
| 0:19 | It remembers what you decided, and why. It picks up where you left off. And it's honest about what it doesn't know. | Three short captions land in turn over the exchange. | R6-S4 |
| 0:25 | (silent beat) | Quote card: "BeMo is the best colleague." Meg Poe. GATED: per-use line for this placement required. | R6-S5 |
| 0:27 | BeMo. Where missions gain momentum. | Brand close. | R6-S6 |

**Clock:** 60 narration words plus a short silent beat, ~25s of speech. The Meg card can drop without harming the cut if clearance lags; the reel stands on behavior.

**Claim trace: reel 6**

| Line | Claim | Traces to |
|---|---|---|
| "the only one who knows how this organization works" / "You don't have to be." | Compass lead message, inverted then verbatim | `ga-message-map.md` 3.2 Compass row |
| "less like software and more like a colleague who's been in every meeting" | The colleague frame, verbatim | Topline language (July 6, checked against approved GA hierarchy); map pillar 2 |
| "remembers... picks up... honest about what it doesn't know" | Colleague behavior triple | Claim map ("behaves the way a trusted colleague would behave: it remembers, it knows its role, it is honest about limits"); map 2.3 |
| Meg card | Cleared quote, gated placement | Approved for the GA sizzle quote card (Aug 1); this placement needs its own dated per-use line (customer-stories overview) |

---

### Reel 7: What You Built Outlasts You (DRAFT)

**Arc job:** pillar 3 lead; the succession rung. Anonymized TTP evidence per the Week 16 precedent.
**One message:** what you built should survive your leaving.

| Time | Narration | On screen | Shot |
|---|---|---|---|
| 0:00 | A nonprofit leader told us: we haven't created a system where someone else can easily step in. | The anonymized verbatim as the headline card, quote-marked, unattributed by design. | R7-S1 |
| 0:10 | Most organizations run on what's in one person's head. When that person leaves, the funder history, the reasoning, the voice, it all walks out the door. | The one-person diagram: threads from a single figure to every part of the org, then the figure steps away and threads snap. | R7-S2 |
| 0:19 | BeMo is where it lives instead. Sourced, current, and ready for whoever steps in. | The threads re-anchor into the record; the with/without inheritance panel (site problem-section grammar). | R7-S3 |
| 0:24 | What you built will outlast you. | The pillar line alone on navy. | R7-S4 |
| 0:27 | BeMo. Where missions gain momentum. | Brand close. | R7-S5 |

**Clock:** 65 narration words, ~27s of speech. Tight but inside; R7-S2's narration can shed "the funder history, the reasoning, the voice" to a caption-only list if the read runs hot.

**Claim trace: reel 7**

| Line | Claim | Traces to |
|---|---|---|
| "We haven't created a system where someone else can easily step in." | Anonymized pre-BeMo verbatim, listed in the map itself | `ga-message-map.md` (pillar 3 evidence); Week 16 precedent for anonymized TTP evidence (brief) |
| "walks out the door" | The problem statement's core image | Map 2.1, ratified |
| "BeMo is where it lives instead" | Roof application | Map 2.1 ("BeMo is where it lives instead," verbatim from the problem statement) |
| "ready for whoever steps in" | Memory through transitions | Claim map ("holds institutional memory through leadership transitions") |
| "What you built will outlast you." | Pillar 3, verbatim | Map 3.1 pillar table |

---

## Batch 2: the headline reels (DRAFT, 2026-08-05)

**Why this batch exists:** Becky's direction, Aug 5, after the Christian Varano call and debrief: 30-second reels with provocative headlines that capture how groundbreaking BeMo is, without underselling. The message map's v1.3 additions (Becky, same day) supply the sanctioned language for exactly this rerun: the six-tools problem line, the in-play/what's-missing pair, and the Copilot contrast, all marked "working language for the sizzle rerun; ratification pending use." Publishing a reel that carries one of these lines is the ratification event.

**What this batch deliberately does not use:** "headless," "operating system," "home screen," "everything opens into BeMo" (advisor register only, map 5.1 and Part 4), anything acquisition, and Christian's own words (uncleared; commitment rule, debrief action item). The groundbreaking register is carried instead by lines canon already sanctions: the anti-patterns doc's own model sentence ("the first platform where..."), the claim map's "building something the sector has not had access to before," and the compounding vocabulary.

**Format, all four reels:** 16:9 only, 1920x1080, 30.0s, muted-first (on-screen text carries the argument), captions per production standards, brand close standardized (wordmark + spoken tagline + bemointel.ai small). No GA mention, no countdown, no urgency. VO: Becky's twin, audio-only speech endpoint, splice real silence for beats (never `[pause]`).

---

### Reel 8: Six Tools (DRAFT)

**Arc job:** feel it, then see it differently. Pillar 1 with Home as the payoff. The Christian-call idea ("your at-a-glance of all work in play") in its external-safe form.
**One message:** you shouldn't have to hunt across tools to know your own organization; BeMo composes it for you.

| Time | Narration | On screen | Shot |
|---|---|---|---|
| 0:00 | How many tabs do you open just to find out what's happening in your own organization? | Generic tool windows pile up fast: mail, spreadsheet, docs, chat, calendar, folders. No vendor branding. Headline resolves over the pile: "You shouldn't have to open six tools to find out what's happening in your own organization." | R8-S1 |
| 0:08 | This is your organization's front page. What happened. What's moving. What needs you. | The site's front-page composition: fragments snap into the weekly edition (Common Table). The three phrases land as captions in sync. Small provenance line: "Illustrated · fictional organization". | R8-S2 |
| 0:17 | The front page shows what's in play. The knowledge base tells you what's missing. | The edition's "One thing worth a look" ask highlighted, then the grey invitation slot. Line on screen verbatim. | R8-S3 |
| 0:23 | Nothing falls on the floor. | Navy card, the line alone. | R8-S4 |
| 0:26 | BeMo. Where missions gain momentum. | Brand close, bemointel.ai small. Held to end. | R8-S5 |

**Notes.** The headline card is the map's ratification-pending problem line verbatim; the narration asks it as a question so the spoken register stays conversational (variant logged in findings). The front-page scene is the website build's animation, filmed the Reel 1W way; it is illustrated fiction and is labeled as such on screen, which keeps rule 4 clean while the two-surfaces build ships. Home language rides the map's 3.2 row: front page, what's in play, "Nothing falls on the floor." (reworded from "drops" Aug 6, Becky adopting Lee's note; the map row updated in bemo-os. The GA sizzle finals and all pre-vH13 audio carry the old "drops" read, so this line's VO is regenerated, not reused).

**Clock:** 57 narration words. At the production's measured pace (~2.4 w/s) that is ~24s of speech in 30s of film; the half-silent density holds.

**Claim trace: reel 8**

| Line | Claim | Traces to |
|---|---|---|
| "You shouldn't have to open six tools..." (on screen, verbatim) | The Home problem line | `ga-message-map.md` 3.2 Home row; still working language at v1.4 (Aug 6). The website hero is now the memory question ("How much of your nonprofit's memory lives only in your head?", ratified Aug 6); six-tools remains this reel's hook. Surface split logged in findings |
| "your organization's front page. What happened. What's moving. What needs you." | Home lead message | `ga-message-map.md` 3.2 Home row, verbatim |
| "The front page shows what's in play. The knowledge base tells you what's missing." | The gap-honesty pair | `ga-message-map.md` 3.2, ratified Aug 6 (v1.4), live on the site; 5.1 ("in play" external with Home); KB row ("it also tells you what's missing") |
| "Nothing falls on the floor." | Home outcome line | `ga-message-map.md` 3.2, ratified Aug 1 (Becky), reworded "drops" to "falls" Aug 6 (Becky, per Lee's note) |
| "Where missions gain momentum." | Tagline | `messaging-assets-v1.md`, ratified |

---

### Reel 8H: the 60-second hero cut (DRAFT, 2026-08-05)

**Why it exists:** the launch-week share asset (rollout plan v2): Six Tools extended to 60, merging Bill's one-platform note and the Christian call's day-in-BeMo energy into one video. Replaces reel 1's 60s v17 as the Bill/Jon send once rendered. Still a teaser: it shows the shape, the wow stays live.
**Structure:** the 30s cut's four beats unchanged, then the fold-ins: the first-platform thesis, the four-apps beat, finished work with the Jen receipt, and a paired close.
**The mini-story rule (Becky, Aug 6):** every reel is a story: set up the problem, hint at the solution, then name it. The narration already ran that arc (the hint is "Held together, they become what your organization knows"; BeMo is not spoken until 0:24), so the vH10 revision is visual orientation at the two turns: the "You're inside BeMo" chip lands with the front-page reveal, and the wordmark lands with the first spoken "BeMo" at the thesis. A cold viewer now knows what they are looking at at the moment it matters, without the name arriving early.

| Time | Narration | On screen | Shot |
|---|---|---|---|
| 0:00 | How many tabs do you open just to find out what's happening in your own organization? | As the 30s cut: tool windows pile; the six-tools line resolves verbatim. | R8-S1 |
| 0:08 | This is your organization's front page. What happened. What's moving. What needs you. | The site's front-page assembly, three phrases in sync; as the composed page holds, the orientation chip rises: "You're inside BeMo" (navy, Geist Mono, top right). Provenance: "Illustrated · fictional organization". | R8-S2 |
| 0:17 | The front page shows what's in play. The knowledge base tells you what's missing. | The one honest ask, then the grey invitation slot; the orientation chip holds through the beat. | R8-S3 |
| 0:23 | Behind it, BeMo is the first platform where your grant work, strategy, and communications share the same memory. | The thesis sentence as headline; the wordmark chip lands as "BeMo" is first spoken; the memory diagram draws beneath (R9-S2 scene). | R8H-S4 |
| 0:31 | Four apps. One product. | The four icons cascade (existing scene). | R8H-S5 |
| 0:35 | So the work comes out finished, in your voice, with nothing re-explained. | A real finished Amplify letter, cropped to the body (reel 1 60s scene, unchanged). | R8H-S6 |
| 0:41 | (silent, music rises) | Both receipts, one screen (vH15): eyebrow "From real users"; Jen's receipt rises left (headline "About an hour, instead of three days.", quote, attribution), a hairline rule and Maryellen's card join right ("I love that BeMo can tell you the 'gaps' that exist in your Knowledge Base." Maryellen Duggan, Caigh It Forward Foundation), both sink out together before the close. | R8H-S7 |
| 0:47 | Nothing falls on the floor. And nothing walks out the door. | The two lines land in turn on navy. | R8H-S8 |
| 0:52 | BeMo. Where missions gain momentum. | Brand close, bemointel.ai small, held to end plus tail. | R8H-S9 |

**Notes.** Beats one through three are the 30s cut verbatim, so the two renders share capture and VO. Three narrated lines already exist as locked audio: "So the work comes out finished..." (`hg-r1-l6`), "Four apps. One product." (`hg-r1-fourapps`, the upbeat B take), and the close pair (`hg-r1-l8` splice); only the six new-to-hero words around the thesis and the paired close need generation. The Jen receipt reuses the 1D quote-card scene with the hour-vs-three-days headline from the map's proof cell. The close pairs two ratified lines: Home's outcome line and the problem statement's inversion as the site hero states it.

**Clock:** 90 narration words plus a silent proof beat, ~37s of speech across 60s. Same half-silent density as the locked reel 1 60s (78 words), read unhurried.

**Claim trace: reel 8H** (rows new to the hero; beats 1-3 trace under reel 8)

| Line | Claim | Traces to |
|---|---|---|
| "the first platform where your grant work, strategy, and communications share the same memory" | Category-first claim, verbatim | `18-anti-patterns.md` sanctioned example; claim map qualification ("the combination is what is new"); reel 9's trace |
| "Four apps. One product." | Category line | Map 3.1, ratified Aug 4 |
| "finished, in your voice, with nothing re-explained" | Deliverable claim | Locked reel 1 60s trace (`messaging-assets-v1.md` claim 1) |
| Jen receipt card + "About an hour, instead of three days." | Individual, attributed time story | Map 3.2 Amplify proof cell; blanket approval July 31; story, never a statistical claim |
| Maryellen card: "I love that BeMo can tell you the 'gaps' that exist in your Knowledge Base." | Individual, attributed quote; proof for the reel's own honest-ask line | Map 3.2 Knowledge Base proof cell, verbatim; blanket approval July 31 (customer-stories 00-overview), no per-use gate |
| "Nothing falls on the floor." | Home outcome line | Map 3.2, ratified Aug 1, reworded Aug 6 |
| "And nothing walks out the door." | Memory through transitions, site-hero form | Site meta description (the phrase survives there after the Aug 6 hero change); claim map ("holds institutional memory through leadership transitions") |
| "You're inside BeMo" (on-screen chip, 0:17) | Orientation label, product name only | Demo register; the surface is simultaneously labeled "Illustrated · fictional organization" per rule 4; no capability claim |

---

### Reel 9: The First Platform (DRAFT)

**Arc job:** see it differently; the category claim at full strength. One unified platform message (map 3.1).
**One message:** BeMo is the first platform where the work shares one memory; that is a different kind of thing, not a better tool.

| Time | Narration | On screen | Shot |
|---|---|---|---|
| 0:00 | Your grant tool has never met your strategy. Your comms tool has never heard your voice. | Two disconnected app windows drift apart on a dark ground; a hairline between them never connects. Headline: "None of your tools have met." | R9-S1 |
| 0:08 | BeMo is the first platform where your grant work, strategy, and communications share the same memory. | The line resolves as the headline; beneath it the memory diagram draws: work flows in, one memory, work flows out. | R9-S2 |
| 0:16 | Four apps. One product. | The four icons cascade in (existing scene, R1-S10 grammar). | R9-S3 |
| 0:20 | Finish the annual report, and the next grant already knows what's in it. | Split beat: an Amplify finished report resolves left; a FunderStorm draft on the right pulls the same facts in, sourced. Provenance: "Illustrated · fictional data". | R9-S4 |
| 0:26 | BeMo. Where missions gain momentum. | Brand close. | R9-S5 |

**Notes.** The spine sentence is the anti-patterns doc's own sanctioned model ("Right:" example under "Never lead with features"), which is as close as canon comes to a pre-approved groundbreaking claim. The payoff beat states the shared-memory behavior as a deliverable, not a feature list. No named competitors anywhere; the opening indicts the category structure, not a vendor.

**Clock:** 66 narration words, ~27s of speech. Tight but inside; if a beat must go, R9-S4's narration compresses to "Finish one thing, and the next already knows."

**Claim trace: reel 9**

| Line | Claim | Traces to |
|---|---|---|
| "Your grant tool has never met your strategy..." | The disconnection problem | Problem statement, `ga-message-map.md` 2.1 ("scattered tools"); site how-it-works ("Not four tools packaged together") |
| "the first platform where your grant work, strategy, and communications share the same memory" | Category-first claim, verbatim | `18-anti-patterns.md`, sanctioned "Right" example; qualified backing: claim map ("building something the sector has not had access to before": the combination is what is new) |
| "Four apps. One product." | Category line | `ga-message-map.md` 3.1, ratified Aug 4 (Becky) |
| "the next grant already knows what's in it" | Shared memory moves context between apps | `ga-message-map.md` 3.1 ("they share organizational memory"); claim map ("a different starting point for every grant cycle") |

---

### Reel 10: It Says So (DRAFT)

**Arc job:** see it differently; the honesty differentiator. KB pillar-3 adjacency, proof fully cleared.
**One message:** BeMo tells you when it doesn't know, and tells you what's missing.

| Time | Narration | On screen | Shot |
|---|---|---|---|
| 0:00 | Every AI sounds confident. Here's something rarer: software that knows what it doesn't know. | Dark card. "Every AI sounds confident." then the headline replaces it: "Software that knows what it doesn't know." | R10-S1 |
| 0:08 | BeMo keeps your organization's knowledge with every fact sourced. | The site's KB receipts scene: the funder page with its source line and page history. Provenance: "Illustrated · fictional organization". | R10-S2 |
| 0:14 | Ask about something it doesn't have, and it says so. Then it helps you fill the gap. | Real capture: the knows-whats-missing clip (chat names what it has, names what it lacks, offers to record it). Provenance: "Captured from the product · fictional organization". | R10-S3 |
| 0:19 | (silent, music only) | Quote card: "I love that BeMo can tell you the 'gaps' that exist in your Knowledge Base." Attribution per canon record (see note). | R10-S4 |
| 0:24 | No confident guesses about your organization. BeMo. Where missions gain momentum. | Trust line, then brand close, held to end. | R10-S5 |

**Notes.** The behavior is validated in beta and publishable (map 2.3: "BeMo tells you when it doesn't know," validated Caigh It Forward). The quote is blanket-cleared (customer-stories overview, July 31). **Attribution resolved (Becky, Aug 5): the correct name is Maryellen Duggan**, Executive Director, Caigh It Forward Foundation, as the website credits it; the customer-stories overview's "MaryEllen O'Donohue" is the wrong record and needs Becky's correction in bemo-os (findings). S4 unblocked. R10-S3 reuses the real product capture already shipped on the website (`bemo-website/public/demos/knows-whats-missing.mp4`), so no new app capture is needed.

**Clock:** 58 narration words plus a silent proof beat, ~24s of speech. Comfortable.

**Claim trace: reel 10**

| Line | Claim | Traces to |
|---|---|---|
| "software that knows what it doesn't know" | The honesty differentiator, headline form | `ga-message-map.md` 2.3 ("BeMo tells you when it doesn't know," publishable, validated); 3.3 ("BeMo knows what's missing," cleared) |
| "every fact sourced" | KB provenance behavior | Site how-it-works ("Every fact shows its source"); map 3.2 KB row |
| "it says so. Then it helps you fill the gap." | Real current behavior | The shipped knows-whats-missing capture (real product, 2026-08-03); demo-slots findings record this as the current form of the behavior |
| Quote card | Cleared peer proof | Customer-stories overview: blanket approval July 31; quote verbatim, never composited |
| "No confident guesses about your organization." | Trust posture line | `ga-message-map.md` 2.3; site commitments list, verbatim |

---

### Reel 11: Backwards (DRAFT)

**Arc job:** see it differently; the compounding flip. Pillar 1's positive inverse as its own reel.
**One message:** every other tool depreciates; BeMo compounds.

| Time | Narration | On screen | Shot |
|---|---|---|---|
| 0:00 | Most software is at its best the day you buy it. Then it becomes the thing you put up with. | A bright generic app window slowly dims and gathers badge clutter. Headline: "Most software peaks on day one." | R11-S1 |
| 0:09 | BeMo runs the other direction. Every conversation, every draft, every decision makes it more useful. | The dim frame cuts to the memory build: fragments land, the record grows (GA sizzle S3 grammar). Headline: "BeMo runs the other direction." | R11-S2 |
| 0:17 | The hundredth interaction is more valuable than the first. | The line alone on a light card, the compounding curve drawing up behind it (site About-page curve grammar). | R11-S3 |
| 0:23 | Nothing resets. The work compounds. | The two sentences resolve on the navy ground. | R11-S4 |
| 0:26 | BeMo. Where missions gain momentum. | Brand close. | R11-S5 |

**Notes.** The opening names a structural truth about the category without naming a vendor; it is the anti-patterns-safe version of "don't undersell." All spine lines are ratified vocabulary. The curve visual borrows the site About page's "same people, with a system" chart grammar so the reel and site rhyme.

**Clock:** 55 narration words, ~23s of speech. Comfortable.

**Claim trace: reel 11**

| Line | Claim | Traces to |
|---|---|---|
| "Most software is at its best the day you buy it" | Category structure observation, not a vendor comparison | Positioning doctrine: BeMo is a different kind of thing (`18-anti-patterns.md`); the honest-contrast register of `09-overclaim-risk.md` |
| "Every conversation... makes it more useful" | Compounding behavior | Topline language ("It compounds. The more you use it, the more it knows"); `ga-message-map.md` 5.1 ("work that compounds," external yes) |
| "The hundredth interaction is more valuable than the first." | Compounding, verbatim | Site how-it-works, live copy; map pillar 1 territory |
| "Nothing resets. The work compounds." | Supporting phrases | Topline language ("Nothing resets."); map 5.1 |

---

### Reel 12: Your Organization Is Not an Inbox (DRAFT, vendor-blind per Becky Aug 5)

**Arc job:** see it differently; the unit-of-awareness contrast against the proactive-assistant wave. The Christian-call debrief's sharpest external-safe frame.
**One message:** assistant AI knows the person; BeMo knows the organization.
**Becky's call (Aug 5): no Copilot naming.** The reel runs vendor-blind; the map's 3.3 line stays available for sales conversations, and the published form is the category version below. Logged in findings for the map's record.

| Time | Narration | On screen | Shot |
|---|---|---|---|
| 0:00 | The new AI assistants know your inbox. BeMo knows your organization. | The line as the cold-open headline, two halves landing in turn. | R12-S1 |
| 0:07 | They know your calendar, your email, your day. That's you. Your organization is bigger than you. | Simple diagram: a small circle labeled "your day" inside a larger one labeled "your organization". | R12-S2 |
| 0:15 | BeMo's unit isn't the person. It's the organization. The mission. The funders. The voice. The decisions. | The larger circle fills: four labeled nodes connect into the memory graph (site Mission Network grammar). | R12-S3 |
| 0:23 | Built for the organization, not just the person in the chair. | The line alone. | R12-S4 |
| 0:26 | BeMo. Where missions gain momentum. | Brand close. | R12-S5 |

**Clock:** 60 narration words, ~25s of speech. Inside.

**Claim trace: reel 12**

| Line | Claim | Traces to |
|---|---|---|
| "The new AI assistants know your inbox. BeMo knows your organization." | Competitive one-liner, vendor-blind form | `ga-message-map.md` 3.3 (v1.3 working addition), published vendor-blind per Becky's Aug 5 decision; same architecture as the cleared DIY AI line |
| "their unit of awareness is the person; BeMo's is the organization" (paraphrased in beats) | The frame behind the line | `ga-message-map.md` 3.3, verbatim frame |
| "Built for the organization, not just the person in the chair." | The unit frame as the close | Same trace; "built for" is the sanctioned pattern (`16-voice-and-tone.md` language table) |

---

## Change log

| Version | Date | What changed and why |
|---|---|---|
| 8H-vH16 | 2026-08-09 | The is-this-a-10 pass on Becky's ask. One real fix: in vH15, Jen's column sat left against an empty right half for the two seconds before Maryellen arrived, reading as a layout waiting to fill rather than choreography. vH16 opens Jen centered (offset computed from layout at runtime, so it stays exact if the grid changes), then slides her left over 0.55s as the rule and Maryellen's card arrive at 43.35/43.45; the reveal is now a move, not a gap. Type nits with it: `text-wrap: balance` on both quote blocks and a no-break space in "three days." kills the widow; Jen's headline now breaks "About an hour, / instead of three days." Audio untouched. QA: 60.0s, -16.0 LUFS, -0.9 dBTP; frames verified (centered open, mid-slide, both held). vH15 superseded |
| 8H-vH15 | 2026-08-09 | Becky's three calls on the vH14 review, all landed same day. (1) The Maryellen quote ships: on "add the maryellen quote," the second testimonial is no longer an audition. (2) Same screen: her "could both quotes appear on same screen and animate in and out" replaces the sequential split with one composed proof scene (`sProofD`, the new default): shared "From real users" eyebrow, Jen's receipt (headline, quote, attribution) rises left at 41.3, a hairline rule and Maryellen's KB-gaps quote join right at 43.2, both sink out together at 46.45 before the paired close; each name gets breathing room instead of two cards in six seconds. The sequential auditions remain filmable (`--mel`, `--meg`). (3) The GA sizzle divergence closes on her order; see the ga-sizzle-reel registry (falls remaster). Audio is the vH14 track unchanged. QA: 60.0s, -16.0 LUFS, -0.9 dBTP; frames verified (Jen alone, rule + both quotes, sink-out, falls close). vH14/vH14mel superseded |
| 8H-vH14 / vH14mel | 2026-08-09 | Becky's evenness note: the track should sound like one recording. Root cause was threefold: per-segment gains matched whole-file integrated loudness, which each segment's differing silence padding skews; the VO bus dynaudnorm re-leveled every 250ms frame toward full scale (up to +12dB), pulling each segment's breaths, tails, and noise floor up by different amounts; and the dynamic master loudnorm's gain crept upward after quiet passages (it was also silently cancelling the scored Jen-beat duck). vH14 mix, all in `run-hero.mjs`: segments matched on speech-median momentary loudness (ebur128 frames within 12 LU of the segment's own peak) with a two-pass post-chain trim, 0.10 LU spread leaving the VO bus; one uniform compressor plus limiter replaces dynaudnorm; the master is a probe-measured fixed gain plus limiter to -15.8. The Jen-beat music rise (+0.12 over base, 41.2-46.2) is now scored deliberately, matching the level the old dynamic master produced by accident, which is the sound Becky approved by ear in vH13. Same raw, every frame identical to vH13. QA: 60.0s, -16.0 LUFS, -0.9 dBTP; VO beat spread 3.7 to 1.3 LU, and the remainder tracks the scored music, not the voice. vH14mel is the Maryellen second-testimonial audition on Becky's "maybe Maryellen": the silent proof beat splits Jen (40.9-43.4) then Maryellen's card (43.4-46.8, "Another real user" eyebrow, quote verbatim from the map's Knowledge Base proof cell: "I love that BeMo can tell you the 'gaps' that exist in your Knowledge Base.", attributed, green mark on 'gaps'); her blanket approval (July 31) means no permission gate, only Becky's pacing call. `--mel` flag in `run-hero.mjs` / `?mel=1` in the source; frames verified (Jen card, Maryellen card, falls close). vH13 superseded (audio only); vH13m still carries the old mix and re-finishes in one `--meg --finish` run if Meg's approval lands |
| 8H-vH13 / vH13m | 2026-08-06 | Lee's two hero notes, adopted by Becky. (1) "Nothing falls on the floor.": the Home outcome line reworded from "drops" in the map (bemo-os edit, uncommitted); navy card, caption, srt, and VO all updated; fresh Avatar V read installed as `hgh-l5` (-18 LUFS, speech 47.05-50.7s, same two-line cadence; "drops" read archived as `hgh-l5-drops.wav`); full re-record since the card text is in the take. The shipped GA sizzle keeps "drops" (divergence logged in findings). (2) Second testimonial: vH13m is the audition, `--meg` flag in `run-hero.mjs` / `?meg=1` in the source; the silent proof beat splits Jen (40.9-44.0, entrances compressed) then Meg's "BeMo is the best colleague." card (44.0-46.8, "Another real user" eyebrow, quote verbatim, attributed). INTERNAL ONLY pending Meg's per-use approval for this placement plus Becky's read on the pacing; two cards in six seconds is tight by design so the cost is visible. QA both: 60.0s, -15.8 LUFS, -1.2 dBTP; frames verified (falls card + caption, Jen card, Meg card). vH12 superseded; review links in assets.md |
| 8H-vH12 | 2026-08-06 | Becky's audio note: the track must be all HeyGen generated, no mixed sources you can hear. vH11 mixed two HeyGen pipelines: the four reused reel 1 segments are Avatar V renders (the sound Becky approved by ear Aug 4) but the five hero-only lines (`hgh-*`) were audio-only speech-endpoint reads, and the seam is audible. All five regenerated through the Avatar V path on her twin (avatar `c1b7e19979ca42d78cf0a1646497a2d7`, voice as reel 1, 1.12x, en-US, "Bee Mo" phonetic in generation text, no `[pause]`), audio extracted, trimmed to the standard 0.4s tail pad, pre-gained to -18.0 LUFS each; mix-time gains now land 1.9-2.5dB across all nine segments (within 0.6dB, the reel 1 evenness bar). Fit verified per segment: every speech end precedes the next line's start (tightest: l4 ends 31.2s against four-apps at 31.9s). The l3 caption end extended 24.2s to 24.4s to cover the new read. Speech-endpoint reads archived as `hgh-*-se.wav`. This amends the Aug 4 "audio-only for narration" note: one pipeline per track; when a track reuses Avatar V segments, new lines generate through Avatar V too. QA: 60.0s, -15.8 LUFS, -1.0 dBTP. vH11 superseded; new review link in assets.md |
| 8H-vH11 | 2026-08-06 | Becky's logo catch: the close's treatment (color wordmark boxed in a white chip on navy) is not a sanctioned variant. The canon (`bemo-os/docs/branding/03-logo.md`) specifies the white knockout directly on Deep Sapphire for dark grounds. Built `assets/wordmark-white.svg` from the canonical `logo-horizontal.svg` (brand fills to white, internal backings removed, viewBox cropped to the wordmark band; provenance noted in the file), close scene re-set: knockout at 128px, tagline clear space bumped to the b-height rule. The thesis beat's chip (color mark on white ground) is correct per canon and stays. Same treatment exists in `source-appcut.html` and `source-v2cut.html` closes: flagged in findings, not silently changed, since reel 1's v13/v17 are approved renders. QA: 60.0s, -16.2 LUFS, -1.3 dBTP, three by-design freezes. vH10 superseded; new review link in assets.md |
| 8H-vH10 | 2026-08-06 | The mini-story pass, from Becky's vH9 review: not clear the viewer is inside BeMo; set up the problem, hint before naming, every reel a mini story. Narration untouched (it already ran problem at 0:00, hint at 0:12, name at 0:24; all locked VO survives). The fix is visual orientation at the two turns: the "You're inside BeMo" chip (navy, Geist Mono) rises with "This is your organization's front page." and holds through the honest-ask beat (first placement collided with the masthead's WEEKLY EDITION label; moved below the masthead onto the quiet band), and the thesis scene gains the wordmark chip landing as "BeMo" is first spoken. Claim trace row added for the chip (orientation label, no capability claim, illustrated provenance on screen). Standing batch direction logged in findings: reels 8-12 audit against the mini-story rule before capture. QA: 60.0s, -16.2 LUFS, -1.3 dBTP, three by-design freezes, no black frames. vH9 superseded; new review link in assets.md |
| 8H-vH9 | 2026-08-06 | Becky's 0:07 note: the scattered artifacts sat low in the frame at the scene's open (the site stage rings its fragments around the funder page's landing spot, and the cloud rides low in the sticky viewport at early progress). Fix in the take, not the scene: `hero-front.mjs` gains an animated camera lift, the stage opens at translateY(-150px) scale(1.12) so the five artifacts fill the frame corner to corner, easing to identity by mid-crawl so the composed edition holds its exact framing (probed both endpoints against the live build before filming). Zoom stays 1.4: more page zoom would crop the held edition. New freeze at 17.8s is the held edition under the front-page VO line (the removed push no longer keeps pixels drifting); narrated, within the never-silent-AND-static rule. QA re-run end to end: artifacts fill at 0:07, edition edge to edge at 0:21, Amplify screen whole, no black frames. 60.0s, -16.2 LUFS, -1.3 dBTP. vH8 superseded; new review link in assets.md |
| 8H-vH8 | 2026-08-06 | Becky's aspect-ratio catch: screens were cut off. Root cause, twofold: the Amplify capture is 1920x1200 (16:10) inside a 16:9 frame with object-fit cover (top and bottom of the app screen lost outright), and vH6's push-ins scale past the stage edge (cover-cropping even 16:9 sources). Fix: the Amplify beat renders the whole 16:10 screen as a framed product window (1024x640, rule border, radius, shadow, snow ground, win grammar) with the push-in bounded (1.045 max, 1070x669 < stage); the site take (16:9 native) runs at exact fit with its push removed, the filmed assembly carrying the motion. Rule for the log: a push-in on a full-bleed video always crops; push framed elements, never the bleed. QA frame-by-frame at every beat: Amplify screen whole at rest and max push, site edition edge to edge uncropped, in-play pill centered, provenance labels intact; freeze sweep maps to narrated holds and the close; no black frames. 60.0s, 1080p30, -16.2 LUFS, -1.3 dBTP. vH7 superseded; new review link in assets.md |
| 8H-vH7 | 2026-08-06 | Becky's whitespace note: visuals now fill the frame. The site take refilmed at 1.4x page zoom (rect-based scroll math; the hidden rail's reserved grid column collapsed with a stagewrap override; crawl ends at 90% so the held edition shows masthead through the honest ask, edge to edge). Every card scene scaled up: the six tool windows grow to 400px and frame the edges, headline 54px over three lines, thesis 50px, app icons 108px, Jen card 56px with the quote at 33px, paired close 56px, close wordmark 84px. Lesson: capture-time page zoom beats post-zoom (crisp at native pixels, no upscale). 60.0s, -16.2 LUFS, -1.3 dBTP. vH6 superseded; new review link in assets.md |
| 8H-vH6 | 2026-08-06 | The make-it-a-10 pass, Becky's go on all five: (1) the site's beats rail hidden at capture (refilmed), so the assembly and held edition fill the frame with no site chrome; (2) the music is scored, not a bed: a small lift as the edition composes, a duck under the Jen silence, the existing swell into the close, plus typing sfx under the six-tools pile and a chime as the front page lands (appcut sfx set); (3) faster cold open, six windows in 1.5s, headline lands in two stages synced to the read's natural pause; (4) slow push-ins on the held edition (4%) and the real-work beat (6%); (5) green mark under "an hour" on the Jen card. 60.0s, -16.2 LUFS, -1.3 dBTP. New review link in assets.md; vH5 superseded |
| 8H-vH5 | 2026-08-06 | Becky's 0:07 note: the site take's recording included the page load, so scene two opened on a flash of the website home page. Root cause fixed by seeking past the load-and-jump frames (1.35s); the beat now opens directly on the scattered paper artifacts. Her second note (the audio should be what BeMo can do): the locked reel 1 assembly line ("An email. A call note... they become what your organization knows. And it keeps building.", `hg-r1-l5`) now narrates the crawl, so the fragments-to-front-page motion is described while it happens; the front-page and in-play lines shift onto the held edition, thesis and downstream beats cascade accordingly. Site take refilmed with an 8.6s hold. 60.0s, -16.1 LUFS, -1.2 dBTP. New review link in assets.md |
| 8H-vH4 | 2026-08-06 | Becky's vH3 review, three notes, all applied. (1) Sync: every scene retimed so narration starts on its visual, verified frame-by-frame at each VO start; the front-page line shortened to "This is your organization's front page." (new `hgh-l2s`) so it lands on the composed edition instead of mid-flight, with "what happened / what's moving / what needs you" carried by the edition itself. (2) The blank work screen: `live-appeal-letter.webm` is white for its first seconds (root cause of the blank beat); replaced with the real platform capture `amplify-in-flow` (Donor Email Editor, Common Table facts, "Captured from the product · fictional organization"). (3) The home page loads and holds: the site take refilmed with a compressed 8.6s assembly crawl and a 6.8s hold on the composed edition; the honest-ask panel and in-play card land on the held page. 60.0s, -16.4 LUFS, -1.4 dBTP |
| 8H-vH3 | 2026-08-06 | Reel 8H rendered: five new VO lines on Becky's twin (`hgh-l1..l5`, audio-only speech endpoint, tail-trimmed to the 0.4s pad) plus three approved hg-r1 segments; the front-page beat is a fresh 16s film of the preview build's assembly animation with the new paper artifacts (`hero-front.mjs`, skip-ahead chrome hidden, take opens inside the track so fragments are on screen from frame one); scenes in `source-hero.html`, pipeline in `run-hero.mjs` (appcut architecture). vH1 had the in-play pill overflowing the frame over the caption; vH2 fixed wrap but rise() clobbered its centering transform (lesson: never center an element with translateX if an entrance animation writes transform); vH3 centers by margin auto. Freeze sweep maps to narrated holds and the by-design silent Jen beat. 60.0s, 1080p30, -16.4 LUFS, -1.0 dBTP, captions burned. For Becky's review, not shipping until she calls it |
| 8H draft | 2026-08-05 | The hero 60 scripted on Becky's go (Reel 8H): Six Tools' beats verbatim plus the first-platform thesis, four-apps, the finished-work beat and Jen receipt, and the paired close. 90 words, three lines reuse locked VO; one capture serves both cuts of reel 8. Ships launch week, replaces v17 as the send asset |
| 1R draft + plan v2 | 2026-08-05 | Becky's two calls on the rollout review: the AI-tools reel gets Bill's treatment (Reel 1R drafted: one compressed problem beat, then the sourced-answer punchline; supersedes v13/v17 for posting, v17 stays Jon's send until the hero 60 lands) and the cadence doubles to Mondays and Thursdays (rollout-plan.md v2: five weeks plus GA instead of nine, Monday reels pair with the arc rung, Thursdays are the sharpener slot) |
| Roster complete draft | 2026-08-05 | Becky's same-day review of the batch report: Maryellen Duggan confirmed as the correct attribution (bemo-os overview is the wrong record; her fix), Reel 12 goes vendor-blind (no Copilot naming), and the full roster gets built out: reels 2-7 scripted as DRAFTs per their brief-ratified arc jobs and proofs (Reconstruction Tax, It Already Knew, An Hour Not Three Days, Where It Lives with its GA-week hold, The Colleague, What You Built Outlasts You). Meg cards in 5 and 6 gated on per-use lines. Shot lists appended; all twelve reels shared for review on the roster artifact page |
| Batch 2 draft | 2026-08-05 | Reels 8-12 scripted as DRAFTs per Becky's provocative-headlines direction after the Christian call: Six Tools (Home/front page, map v1.3 lines), The First Platform (the sanctioned category-first sentence), It Says So (KB honesty, MaryEllen proof; attribution blocked on a site/canon name conflict), Backwards (compounding flip), and Your Organization Is Not an Inbox (Copilot contrast, held for a founder call on the vendor-named frame). Christian's own words used nowhere (uncleared). Shot list appended, grouped by capture source; nothing captured yet |
| 1A-vA1 | 2026-08-05 | The app cut (see the Reel 1A section): Becky rejected the all-website-clips approach; same story and site-copy VO, visuals now branded v6 motion frames plus four real app clips, with the site hero's Common Table facts as the fragment cards and the site's Jen quote as the proof card. 60.0s, 1080p, -15.8 LUFS, -1.1 dBTP, sweep clean |
| 1W-vW1 | 2026-08-05 | The website cut (see the Reel 1W section): Becky scrapped the built-scene direction; the film is now the live site build, captured in one choreographed 80s take and cut to 60s in story order, narrated entirely in the site's shipped copy. Informed by Bill's Aug 4 advisory notes (punchline early, substance fast, comprehensive platform over sub-module naming: the per-product showcase is deliberately not in the cut). First capture attempt letterboxed (Playwright DSF-2 recording quirk); refilmed at native 1080p with dev chrome hidden. 60.0s, -15.9 LUFS, -1.3 dBTP, blank-frame sweep clean. Old cuts retired |
| 1D-vD4 | 2026-08-04 | Becky's vD3 review: a blank silent stretch (confirmed by frame sweep: a uniform second at 43-44s and a sparse quiet passage), Jen landing unframed, and the story not comprehensive. Rebuilt as four chapters: the problem (site hook, Maria, the walk-out wall), WHAT IT IS (thesis + "Four apps. One product." restored), WHAT YOU GET (answers with sources, finished work, the grant cycle, then the Jen receipt introduced by a new "From a real user." line and eyebrow), WHY NOW (payoff, Start free, trust line). New rule in the source: no second of the film both silent and static. Same day, Becky's brand-guidelines note: full pass against `bemo-website/DESIGN.md` v6. The serif display was off-brand (v6 is Schibsted Grotesk only, weight does the work): all display type now Schibsted 640, fonts pulled from the website build into `capture/fonts/`; green is now the underline mark (Inherited Mark Rule), never text color; Start free is ink-on-orange #1A2A3A at 6px (white-on-orange fails AA); Compass icon Sapphire, Amplify verdant-deep; palette corrected to tokens (ink-faint #5C6A82, verdant-deep #2F7D0D, navy grounds #05347E/#01143A); provenance labels on every product visual ("Captured from the product" / "Illustrated · fictional data") in Geist Mono, per the site's provenance rule. Known soft spot: the recording lags ~0.5s after the heavy capture scene, so "It already knew." lands late in its window. 60.0s, -16.0 LUFS, -1.4 dBTP |
| 1D-vD3 | 2026-08-04 | The conversion pass, from Becky's "compelling enough to join the beta?" question and her catch that the cuts weren't pulling from the website Bill found compelling. Three changes: (1) the cold open is now the live site hero verbatim ("Your nonprofit got smarter this week." then "Nobody wrote it down." in orange), so the click-through lands on the sentence the video promised; (2) the Jen Allen receipt after the finished-work beat (headline from the map's Amplify proof cell, quote verbatim, name and organization, inside her July 31 blanket approval), silent under the music; (3) the end card matches the site's ask: Start free, bemointel.ai, in beta now, plus the site's trust line ("Your data is never used to train models."). The grant-cycle beat dropped for time; the receipt carries the outcome claim better. Two new VO lines (`hge-h1/h2`, site hero verbatim). vD2 (receipt + Start free, Maria open) superseded same day. 60.0s, -16.1 LUFS, -1.1 dBTP |
| 1D-vD1 | 2026-08-04 | The Last Day storyline built (see the Reel 1D section): Becky asked for a different, more attention-grabbing story on top of the commercial grammar and picked the succession treatment from three pitched. Seven fresh audio-only VO lines (`hgd-*`), the rest reused from 1C's set; the four-apps beat dropped for story focus. Exactly 60.0s, 1080p, -15.9 LUFS, -1.2 dBTP. On the artifact page as candidate A beside 1C as candidate B |
| 1C-vC2 | 2026-08-04 | The commercial cut exists (see the Reel 1C section above). Becky's direction after Bill saw the approved cut and it didn't grab him: think like a commercial director, wow me. New grammar on the same ratified lines: dark cold open with a Monday/Wednesday/Friday accelerando, ghost-window pile, a held silence before "Every one starts from zero." slams in word by word, one hard dark-to-light cut at the thesis, fragments snapped to the narration's word timestamps, "It already knew." on its own navy card, punch typography throughout, flash-frame cuts, navy slam close with the beta CTA. New files: `source-commercial.html`, `run-commercial.mjs`, 14 fresh audio-only VO reads (`hgc-*`) plus the approved four-apps and close segments, all one source, one leveling. vC1 had a stuck flash overlay (only written during its window; the residue washed out whole scenes) and a reflowing zero wall; both fixed deterministically in vC2. Exactly 60.0s, 1080p, -16.0 LUFS, -1.3 dBTP. Candidate for Becky's review, not shipping until she calls it | Becky caught the v16/v12 close speaking the word "pause": the audio-only speech endpoint reads `[pause]` literally instead of honoring it (the avatar-video path honors it; lesson recorded in the VO notes). The close rebuilt as two speech-endpoint reads ("Bee Mo." and "Where missions gain momentum!") spliced with 0.55s of actual silence for the beat. Only l8 changed. 60s rendered v17, 30s rendered v13; both -16 LUFS, -1.3 dBTP |
| v14 | 2026-08-04 | Becky approved the v15 60s cut ("pass 15 take 2 works") with one note: BeMo mispronounced. The two BeMo lines (thesis l4a/l4b and close l8) regenerated with the "Bee Mo" phonetic through the audio-only speech endpoint per her same-day rule (no avatar renders for narration; `create_speech` accepts the twin voice and returns word timestamps, which confirm "Bee" and "Mo" as two syllables and the close's [pause] as a real 0.68s beat). All other segments untouched from the approved track. 60s rendered v16, share-ready; 30s rendered v12 to keep the pair consistent |
| v13 | 2026-08-04 | Per Becky, the v12 mix still had the four-apps line sounding unlike the rest (her phone-session takes around one Avatar V render), and she asked for the whole track more upbeat. The full upbeat pass: all nine narrated lines regenerated through the Avatar V path on her twin voice (words verbatim from the locked script; upbeat delivery cues and the "Bee Mo" phonetic live only in the generation text), each trimmed with the 0.4s tail pad and pre-gained to about -18 LUFS, so every segment now levels within 0.6dB before the mix. One render glitch caught by silence-mapping (l5's first take came back with a 9.8s hole; retake was clean but 0.75s long for its window, fixed by tightening its inter-phrase gaps, no words touched, 10.0s final). Verified fit: every segment ends before the next begins in both cuts. Narrated windows measure -14.8 to -16.2 LUFS across the 60s cut. The b2 session takes stay on disk as fallback. VO map now: all lines `becky/hg-r1-*.wav`. 30s rendered v11, 60s rendered v15 |
| v12 | 2026-08-04 | Per Becky, the v11 Avatar V read was too monotone; she asked for an upbeat, new-product-energy delivery, same voice, evenly leveled. Two Avatar V candidates rendered on her twin (delivery cues in the generation text only; the ratified wording and captions are unchanged): A "Four apps! One product!" and B a build into "one product!". Measured for pitch movement (the monotone symptom): B carries 14.0 semitones of F0 spread versus 10.0 (flat take) and 10.4 (A); Becky confirmed B ("upbeat B VO"). B trimmed with the standard tail pad, pre-gained +11dB (lands -18.5 LUFS; leveler settles it at +2.5dB with the rest), installed as `becky/hg-r1-fourapps.wav` (flat take archived as `hg-r1-fourapps-flat.wav`). Beat loudness -16.8/-17.3 LUFS in its windows, in family with every other narrated stretch. 30s rendered v10, 60s rendered v14 |
| v11 | 2026-08-04 | Becky ratified "Four apps. One product." ("YES, four apps. one product."), closing the wording finding; the phrase is recorded in `ga-message-map.md` 3.1 (bemo-os edit, uncommitted there). The line's VO regenerated per Becky through the Academy path: HeyGen Avatar V render on her digital twin (same voice ID as the reel's clone segments, 1.12x, locale en-US), audio extracted and trimmed with the standard 0.4s tail pad to `becky/hg-r1-fourapps.wav`, replacing `clone-r1-fourapps.dry.wav`. The render lands at -34 LUFS, past the leveler's 12dB cap, so the wav carries +16dB static pre-gain and the leveler settles it at target with the rest (+2.0dB at mix). Audio-only change over the existing raws; beat loudness within 1 LU of the track in both cuts. 30s rendered v9, 60s rendered v13 |
| v10 | 2026-08-03 | Per Becky: the four-apps line changed again, "Four apps. One memory." to "Four apps. One product." (headline, on-screen caption, burned caption, and clone VO all four, same voice ID, regenerated at 1.12x, gain-matched by the leveler). Third wording for this line in one session (platform, then memory, then product); flagged in `findings.md` since "one product" is not phrasing the message map uses anywhere. 30s rendered v8, 60s rendered v12 |
| v9 | 2026-08-03 | Per Becky: the four-apps line resynced to the visuals and matched to the rest of the track. It was firing 0.3-0.5s ahead of the s6 headline landing (both cuts) and, in the 60s cut, overlapping the tail of the FunderStorm line instead of sitting under its own scene; retimed to 16.85s (30s cut) and 41.5s (60s cut, with the tagline pushed to 45.3s so it lands on the end card instead of over s6). The line itself changed too, "Four apps. One platform." to "Four apps. One memory." (headline, caption, and VO all three); Becky's recorded sessions only hold the GA-era "Four products" take, so a clone read stands in (`clone-r1-fourapps.dry.wav`, same voice ID as the rest of reel 1's clone segments) until she records it fresh, gain-matched to +8.5dB by the per-segment leveler like the rest of the mix. 30s rendered v7, 60s rendered v11 |
| v8 | 2026-08-03 | Becky's workflow pass: the reel is now one world (Wrenfield) with the app in motion. The front-page card rebuilt as The Wrenfield Alliance in the v2 design (fact-sheet facts; "Good morning, Dana." holds since Wrenfield's ED is Dana Whitaker); fragment cards carry Wrenfield facts; the finished-work beat plays the real answer streaming (the orientation brief writing itself); the pillar beat plays the click into the Grant Progress Report; the ending narration changed per Becky to "Four apps. One platform." (headline matches; clone VO until she records; note: canon says "products", flagged in findings for a map decision) then the close. Rendered v8 |
| v7 | 2026-08-03 | Per Becky: actual platform on screen instead of screenshots. New live capture of the real app (templates gallery and the Grant Progress Report page, org-neutral, driven and recorded via the session pipeline) now plays inside the finished-work and grant-cycle beats as in-scene video; the Common Table front page stays a design card because that surface has not shipped (rule 4). Ending resynced to word timestamps: icons cascade on "Four products, one platform, one memory," wordmark lands on "BeMo," tagline on "Where missions." 60s rendered as v7 |
| v6 | 2026-08-03 | Per Becky: the build payoff updated to the latest Common Table content, rebuilt in the Aug 2 GA reference-build v2 design (warm-paper weekly edition, same established Common Table facts; art source `capture/frontpage-ct.html` in the shared capture dir, design quoted from the bemo-os mockup). 60s cut re-rendered as v6; the 30s cut has no front-page beat and stays v5 |
| v5.2 | 2026-08-03 | Render bug from the v5.1 scene port fixed: a dropped closing tag nested the end card inside the four-products scene, blanking the close and everything after s6 faded (Becky caught it). Div balance verified, both cuts re-rendered, close and four-products beat frame-checked against the VO |
| v5.1 | 2026-08-03 | Per Becky: the four-products beat restored to both cuts (the GA sizzle S6 scene, icons and all, inserted before the close; 30s runs 25s, 60s runs 51.5s). VO is her real GA-session take of "Four products, one memory." (`b-l10`), treated with the heavier chain to match the dry-room session; a fresh read is listed in the recording sheet for the next session. Claim: "Four products. One memory." traces to the locked GA sizzle S6 and the map's four-products rule (Allocate excluded) |
| v5 | 2026-08-03 | Music settled by audition (six candidates rendered on the real 30s cut, two families): Becky picked "energetic cinematic folk, driving percussion, uplifting strings and acoustic guitar" and asked for it louder; bed raised to 0.18 base, 0.28 swell. The 60s uses a 2s-crossfade extension of the same track. Note for `docs/02-production-standards.md`: launch-register music (driving, organic, no drop) is now the series precedent; the "calm ambient only" reading of the audio standard should be amended by Becky |
| v4.2 | 2026-08-03 | Word-final clipping fixed ("scratch" was cut): all nine slices rebuilt with a 0.4s tail pad, bounded 0.12s before the next line marker so nothing leaks in; l4b keeps its false-start trim. Audio-only change, re-encoded |
| v4.1 | 2026-08-03 | Becky's review of v4: the stray "b" found and excised at the source (a false start inside the single 4b take; real "BeMo" starts 0.9s in; slice re-cut and verified), the 30s thesis retimed to the cleaner take and its dead second closed (30s runs 20.8s); "Thursday. From the top." reworded to "Thursday. Explaining it again." so the caption echoes the narration; "Every one starts from zero." now lands on "again", not after it; the build's fragment cards fly into the front page on "held together" with a warm color pop behind the merge |
| v4 | 2026-08-03 | The craft pass, per Becky, 16:9 only (verticals retired from the deliverable set per her call): every landing synced to her word timestamps (fragment cards snap on "An email. A call note. A spreadsheet. A message.", thesis phrases on their syllables, wordmark on "BeMo", tagline on "Where missions"), slow Ken Burns drift on all three product screens instead of static holds, weighted scale-settle landings on the headlines and close, and the 16:9 pipeline upgraded to the standards spec: 2560x1440 capture, 1920x1080 delivery |
| v3 | 2026-08-03 | Per Becky's v2 review: pacing kept, music replaced (one warm acoustic track, "uplifting nonprofit tone," across both cuts for a single series identity; the corporate tracks retired), and the stray "b" sounds fixed at the source: all nine voice slices re-cut with tighter bounds and each verified by re-transcription to contain exactly its line |
| v2.5 | 2026-08-03 | Energy pass per Becky ("a bit sleepy"): new music per cut (30s: warm upbeat piano-and-drums; 60s: tension-to-optimistic build with confident close, both no-drop), bed raised about 5dB, inter-line gaps tightened by a third to a half (30s runs 21.5s, 60s runs 47s; her reads untouched), captions retimed. Outputs versioned -v2; the -v1 files kept for A/B |
| v2.4 | 2026-08-03 | Re-recorded VO session (drier room, two takes per line; second take of each sliced from `vo/becky/r2-pass-b`) replaces the first session in both cuts. Lighter treatment (no gate needed). Amplify beat re-cropped to show the app frame (editor header, Done toggle, checked inputs rail) per Becky. 30s thesis scene holds 0.4s longer for her new read |
| v2.3 | 2026-08-03 | The finished-work beat shows real product: Becky's Amplify appeal-letter screenshot (demo org), cropped to the letter body past the template placeholders, replacing the soft wide-editor raster. Her press-release screenshot was not used (real customer KB data on screen; logged in findings). Both payoff beats in the 60s cut now carry real app screens |
| v2.2 | 2026-08-02 | Per Becky: the grant-cycle beat shows real product. Her FunderStorm screenshot (Grant Progress Report template) cropped to the card and placed beneath the pillar line; real app, no customer data, sidebar cropped. The bell chime at the home-page reveal removed, also per Becky; typing bed and close swell stay |
| v2.2 | 2026-08-02 | Per Becky: the grant-cycle beat now shows product (FunderStorm slot beneath the pillar line; the approved funder-page art stands in until a real FunderStorm capture lands at `capture/assets/funderstorm.png`, tracked as a blocked screen shot in the shot list). The bell chime at the home-page reveal removed, also per Becky; typing bed and close swell stay |
| v2.1 | 2026-08-02 | The "make it a 10" pass, the two items not gated on externals: sound design (a quiet keyboard bed under both typing scenes, a soft bell resolve as the fragments become the front page, and the music swelling into the close) and the instant-start hook (typing begins on frame one instead of 0.7s in). SFX from the HeyGen library, mixed on a separate bed bus so the voice chain is untouched. Remaining to a 10, both external: re-record in a drier room, and real product screenshots when the two-surfaces build ships |
| v2 | 2026-08-02 | **Becky's real voice replaces the clone in both cuts.** Full session recorded per the flow sheet (two straight-through passes; the numbered pass sliced to `vo/becky/b-r1-l1..l8` via word-level transcription). Both timelines re-cut to her word timings; her read "And they're good." adopted into script and captions per the consistency rule. Reverb reduced per Becky: denoise tracking the room tail, inter-word gate, boxiness cut at 380Hz, slight presence lift (`.dry.wav` slices; raw slices kept). Runtimes: 23.5s and 50s plus tail |
| v1.5 | 2026-08-02 | Pace and close, per Becky. All VO regenerated at 1.12x (one batch, so the whole reel is one voice at one pace); timelines compressed (30s cut runs 25s, 60s runs 52.5s), scene beats resynced to the new word timestamps. The close is now the brand line, spoken and shown: "BeMo. Where missions gain momentum." with bemointel.ai small beneath; the beta CTA lines are retired from the reel (the post copy can carry the invitation). Captions rebuilt to the new times. Fast segments: `r1-s1-f` through `r1-s9-grant-cycle-f`, `r1-s7-close-f` |
| v1.4 | 2026-08-02 | Becky's consistency rule applied: the VO says what the words on screen say. "starts from nothing" retaken as "starts from zero" to match the on-screen headline and the site FAQ; the pillar card is now spoken (new segment, 1.06x); the end card shows the spoken CTA words with bemointel.ai beneath. The duplicated scene caption cards were removed (burned captions carry the narration verbatim, fixing the 0:33 collision), and the 60s build now resolves into the Home front page, whose content visibly composes the fragments |
| v1.3 | 2026-08-02 | CTA VO extended per Becky: "The beta is open. Come build something with us today." generated with the clone at 1.12x, both cuts and captions updated (on-screen end card unchanged). Mix evened: all VO segments now pass through one bus (75Hz highpass plus gentle dynamic normalization) before the music joins, so segments from different generation batches sit at one level |
| v1 | 2026-08-01 | Reel 1 drafted against the ratified brief; narration built from the GA sizzle's locked S1/S2 lines plus the ratified beta CTA |
| v1 | 2026-08-01 | Reel 1 locked: two new HeyGen segments generated ("Becky Kern -- 37" clone; thesis line at 1.06x, CTA at 1.12x, matching the GA sizzle's reviewed speed ramp); R1-S1 through S3 reuse the GA sizzle's `s1-ai-tools.wav`. Word timestamps saved as sidecars in `capture/out/vo/` |
| v1.1 | 2026-08-02 | 60-second cut of reel 1 added per Becky (shareable by Bill and Jon, postable on LinkedIn): same problem open and close, plus the full thesis, the fragments build, the finished-work beat, and a silent pillar-message card. All narration is existing locked VO; no new generation. DRAFT until Becky reads it |
| v1.1 | 2026-08-02 | 60s cut locked by Becky; both cuts sent to render |
| v1.2 | 2026-08-02 | Style pass per Becky: captions restyled to the Aug 1 GA sizzle standard (ink Geist on a soft white box, replacing the outlined-white subtitle look), Geist applied to all sans text in the scenes (day captions, chat UI, subline, CTA; serif stays the display voice), the third background glow restored for the full GA wash, and the audio master brought to -14 LUFS matching the GA delivery finish. All four outputs re-rendered and re-encoded. Remaining gap to the GA cuts: they carry Becky's real voice; reel 1 is still the clone. `vo-recording-sheet.md` lists the three lines that would close it |
| v1.1 | 2026-08-02 | Both cuts rendered end to end: new `capture/source.html` (vertical-native 1080x1920 primary plus 16:9, both cuts from one file), VO and music mixed at scene times (music bed reuses GA sizzle track 83197124, about -19dB, loudnorm to -16 LUFS), captions burned from the locked script plus `.srt` sidecars. S1 audio is the locked text regenerated one file per scene (`r1-s1/s2/s3-*.wav`) since the original segment had no word-timestamp sidecar to split by. Outputs: `bemo-linkedin-sizzle-series-r1-{30s,60s}[-vertical]-v1.mp4` |
