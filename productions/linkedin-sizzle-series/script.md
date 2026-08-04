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

**VO map:** R1-S1 to S3 `s1-ai-tools.wav`; R1-S6 `s2-thesis-v2.wav`; R1-S7 `s3-fragments-fast.wav`; R1-S8 `s3b-finished-work-v2.wav`; R1-S10 `clone-r1-fourapps.dry.wav` (clone placeholder, see recording sheet); R1-S5 `r1-s5-beta-open-v2.wav`. All GA sizzle paths are `../ga-sizzle-reel/capture/out/vo/`.

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

## Reels 2 and beyond

Not started. Written one at a time as their arc-week pairings firm up, per the brief. The series is open-ended (brief amendment, 2026-08-02); currently planned: The Reconstruction Tax, It Already Knew, An Hour Not Three Days (Jen Allen proof), Where It Lives (holds for GA week; Meg card pending clearance recording), The Colleague (pillar 2 lead), What You Built Outlasts You (pillar 3 lead). The candidate backlog lives in the brief.

## Change log

| Version | Date | What changed and why |
|---|---|---|
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
