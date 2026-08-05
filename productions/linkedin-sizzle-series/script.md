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

**Generation path for future VO (Becky, Aug 4): audio-only.** No avatar video render is needed for voice work; HeyGen's speech endpoint (`create_speech`) takes her voice ID directly and returns word-level timestamps for the sync passes. Verified working with the twin voice the same day. Avatar renders are for when a presenter is on screen (Academy), not for narration. **Caution:** the speech endpoint reads `[pause]` literally (it said the word "pause" in v16; caught by Becky). Pauses in audio-only reads are built by generating around the beat and splicing real silence, never with the `[pause]` directive, which only the avatar-video path honors.

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

## Reels 2 and beyond

Not started. Written one at a time as their arc-week pairings firm up, per the brief. The series is open-ended (brief amendment, 2026-08-02); currently planned: The Reconstruction Tax, It Already Knew, An Hour Not Three Days (Jen Allen proof), Where It Lives (holds for GA week; Meg card pending clearance recording), The Colleague (pillar 2 lead), What You Built Outlasts You (pillar 3 lead). The candidate backlog lives in the brief.

## Change log

| Version | Date | What changed and why |
|---|---|---|
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
