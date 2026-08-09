# Script: GA Sizzle Reel

**Status:** LOCKED (Monday cut)
**Version:** v1
**Runtime target:** 67 seconds
**Word count:** 114 narration words (about 46 seconds of speech across 67 seconds of runtime)

*Written against the July 30 artifact's existing scene timings, so the voiceover drops onto animation that already exists. Narration is deliberately sparse: roughly a third of the runtime is silence, which is the unhurried register `16-voice-and-tone.md` asks for and which a wall of narration destroys.*

**Locked means the VO has been generated against this text.** Locked 2026-08-01: seven segments generated with the HeyGen voice clone "Becky Kern -- 37" (`7fa742e991de4771a83eb35b53515833`), one file per narrated scene, in `capture/out/vo/`. Word-level timestamps came back with each segment if the edit needs them.

---

| Time | Narration | On screen | Shot |
|---|---|---|---|
| 0:00 | *(v1.1, in the 60s cut, where S0 follows the thesis)* Every week, BeMo writes your front page: what happened, what's moving, what needs you. Nothing falls on the floor. *(reworded from "drops" in the Aug 9 remaster)* | Front page of an org running on BeMo. Caption: "Monday morning. BeMo already knows your organization." | S0 |
| 0:05 | You've been trying the AI tools. They're good. But every conversation starts from nothing. You explain your mission again. And again. | Empty generic AI chat, cursor blinking. Then: "Every one starts from zero." | S1 |
| 0:14 | BeMo is where your organization's knowledge lives. Conversation first. Memory preserved. You never start over. | Thesis line. Three phrases resolve in beneath it. | S2 |
| 0:22 | An email. A call note. A spreadsheet. A message. Scattered on their own. Held together, they become what your organization knows. And it keeps building. | Four fragments drift in, then resolve into the front page. | S3 |
| 0:34 | So the work comes out finished, in your voice, with nothing re-explained. | Template output, a completed deliverable. | S3b |
| 0:41 | Ask it anything. A new board member starts Monday, catch her up. It answers from your own record, and shows you where every piece came from. | The ask, then the answer with sources cited. Caption: "No context pasted. No starting over. It already knew." | S4 |
| 0:52 | *(silence, let the quotes read)* | Two named quote cards: Meg Poe, Executive Director, Autoimmune Encephalitis Alliance ("BeMo is the best colleague"), then MaryEllen O'Donohue, Caigh It Forward Foundation (the Knowledge Base gaps quote). The artifact has no Jen Allen card; hers joins in the Wave 2 revision. | S5 |
| 0:59 | Four products. One memory. | Compass, FunderStorm, Amplify, Academy. | S6 |
| 1:03 | Nothing walks out the door. BeMo. Where missions gain momentum. | Wordmark, tagline, CTA. | S7 |

---

## Notes

**The opening is silent on purpose.** The first thing the viewer hears is the problem, not a company introducing itself. S0 is a five-second visual hook that gets paid off at the end, and the narration starts on "You've been trying the AI tools," which is the line the audience has lived.

**"They're good" is doing real work.** Conceding that ChatGPT and Claude are good buys permission for the sentence that follows. A video that opens by telling nonprofit staff their tools are bad loses them in three seconds, and it is also not true. Per `competitors/diy-ai/`, the argument was never that general AI is bad. It is that it has no memory of you.

**"And again" is its own sentence** because the pause before it is the point.

**S5 carries no narration.** Reading a quote aloud in a cloned voice would mean Becky's voice speaking Jen's words, which is exactly the recombination the permission rules forbid. Let them read on screen, in their own names.

**The close does not say "sign up."** For the Monday cut the CTA is the wordmark and the tagline. Jon's variant and the Wave 2 variant add their own final line.

## The voice-clone constraint

The narration is written to be spoken by a clone of Becky's voice. Everything above is in the product's register: it describes what BeMo does. Nothing in it is a personal claim, a memory, or a feeling, because a cloned voice asserting a lived experience its owner never spoke aloud is hard to defend afterward.

If a line ever needs "I" in it, Becky records that line herself.

## Claim trace

| Line | Claim | Traces to |
|---|---|---|
| "every conversation starts from nothing" | General AI tools are stateless | `messaging-assets-v1.md` differentiator 1; `competitors/diy-ai/` |
| "BeMo is where your organization's knowledge lives" | Core value proposition, verbatim | `messaging-assets-v1.md` section 1 |
| "Conversation first. Memory preserved. You never start over." | The three supporting phrases | `messaging-assets-v1.md`; matches the website hero |
| "they become what your organization knows. And it keeps building." | Knowledge compounds | `messaging-assets-v1.md` claim 3; `02-core-insight.md` |
| "finished, in your voice, with nothing re-explained" | Deliverable claim, not capability claim | `messaging-assets-v1.md` claim 1 |
| "answers from your own record, and shows you where every piece came from" | Evidence-cited, no unsourced assertion | Good Work guardrails, receipts or silence |
| "Nothing walks out the door." | What you built will outlast you | `messaging-assets-v1.md` claim 3 |
| "Where missions gain momentum." | Tagline | Carried from the July 30 draft |
| "Every week, BeMo writes your front page: what happened, what's moving, what needs you." | The Home surface, verbatim idiom | `ga-message-map.md` line 105 (Home row); line 107 clears the front-page idiom for teasers pre-ship |
| "Nothing falls on the floor." | Outcome claim, Becky's line, Aug 1 | Ratified into the message map's Home row, Aug 1, 2026 (Becky); reworded from "drops" Aug 6 (Lee's note, Becky's adoption), carried into the finals by the Aug 9 remaster |
| "You finally have a colleague. Hear it from our real users." | Pillar 2 stated as the quote-section claim; Meg's card is its proof | `ga-message-map.md` 3.1, pillar 2 ("You Finally Have a Colleague") |
| "A mission accelerator, not a tool bundle." | Category self-description, verbatim | `ga-message-map.md` 2.1, category row |

**Flag before lock:** resolved 2026-08-01. "Where missions gain momentum." is the ratified tagline, `messaging-assets-v1.md` line 77 ("The tagline: Where missions gain momentum.").

## Change log

| Version | Date | What changed and why |
|---|---|---|
| v7 renders | 2026-08-03 | Front-page art in both sources updated to the latest Common Table content in the Aug 2 reference-build v2 design (per Becky; art at `../linkedin-sizzle-series/capture/assets/home-ct.png`, built from `capture/frontpage-ct.html` at repo root). Raw renders and encodes produced as `-60s-v7` and `-30s-v7`. The voiced and captioned finals (v6, Becky's real voice) still carry the old art; re-running that assembly pass is pending a decision on whether these cuts still ship anywhere |
| v1 | 2026-07-31 | Initial draft, written to the July 30 artifact's scene timings for the Monday cut |
| v1 | 2026-08-01 | Locked: VO generated per scene with the "Becky Kern -- 37" clone; tagline flag resolved against `messaging-assets-v1.md` |
| v2.1 | 2026-08-01 | The "what is BeMo" fix, pulled from the message map per Becky's review: two lines added in her voice. "You finally have a colleague. Hear it from our real users." replaces the generic quote intro (pillar 2 stated, Meg's card as proof); "A mission accelerator, not a tool bundle." follows "Four products, one memory." (category line, both cuts). The findings item on the "memory tool" impression is addressed for these cuts; the deeper messaging session with Fable stays open for future assets. Runtimes grew to 69.7s and 33.9s. Outputs re-rendered end to end: `-final-captioned` files are current. |
| v2 | 2026-08-01 | Caption restyle per Becky: navy Geist on a soft white box (brand ink on the video's own bubble language; real Geist pulled to `capture/fonts/`), replacing the outlined-white subtitle look. Colliding cues render top-of-frame. All four finals re-rendered. |
| v2.1 | 2026-08-09 | **The falls remaster, Becky's order.** The 60s close reworded to "Nothing falls on the floor." matching the map's Aug 6 rewording and the hero reel. `capture/remaster-falls.mjs` (new, persisted): patches the v7 vo-music master's audio in the [36.42, 38.14] window (music from stem at the locally measured ducked gain, the sentence as the hero's Avatar V read `hgh-l5` sliced at its inter-sentence gap and RMS-matched to the old read, 25ms fades, length preserved), then re-burns captions from the updated `-burn.srt` and reapplies the shipped loudness as a converged fixed gain. Outputs `bemo-ga-sizzle-reel-60s-final-captioned-falls[-vertical].mp4` at -14.5 LUFS / 0.12 dBTP (shipped: -14.2 / 0.13); seam trace within ~1 LU of the original through the sentence; caption style frame-matched, vertical placement corrected to the shipped position. The spliced sentence is the one non-live-voice moment in the track; Becky's pickup (line 6b, recording sheet) replaces it in one re-run. 30s finals untouched (no close line). Both srts updated |
| v2 | 2026-08-01 | Delivery finish: burned-in captions on all four outputs (cue text is the script's, timed to Becky's recorded words; `.srt` sidecars alongside) and a loudness master to -14 LUFS integrated with true-peak limiting. Meg's sizzle-quote approval recorded in bemo-os (`00-overview.md` synced to the dated line in her story file) and "Nothing drops on the floor." ratified into the message map's Home row (bemo-os edits uncommitted there). Final deliverables: `bemo-ga-sizzle-reel-{60s,30s}-final-captioned[-vertical].mp4`. |
| v2 | 2026-08-01 | **Becky's real voice replaces the clone in both cuts.** She recorded all 12 lines (`vo/becky/sizzle-vo-raw.m4a`, sliced to `b-l1..12.wav` via word-level transcription; best take per line, leveled to -20dB mean, 75Hz highpass). Both timelines re-cut to her word timings; every synced beat (thesis phrases, fragments, answer/sources, icons, close cascade) now lands on her words. The voice-clone takes remain in `vo/` as fallback. Outputs: `-60s-v6-` and `-30s-v6-` (+verticals). |
| v1.2 | 2026-08-01 | Becky's restructure, both cuts. **Order** (both): build now precedes the front page, so "memory compounds into that front page" pays off on the next screen; ask stays before four products. **30s**: a short line on each of six screens: "You've been trying the AI tools." (subset of S1), the thesis headline (trimmed from the S2 take), "Your weekly snapshot, built from your Knowledge Base." (new; front-page and KB idioms cleared for teasers per `ga-message-map.md:105-107`), "Ask it anything." (subset of S4), the S6 line, and the full close. The fragment build was dropped from the 30s; its story is carried by the snapshot line. **60s**: added "Here's what our real users are saying." as the quote-section intro (announcer line; does not read anyone's quote, so the no-recombination rule holds; music swell moved after it). Outputs: `-60s-v5-` and `-30s-v5-` (+verticals). |
| v1.1 | 2026-08-01 | S6 delivery settled by audition: three takes cut into the scene, Becky picked the SSML moderate-emphasis comma read ("one memory" lifted but not exclaimed), breath trimmed to 0.24s (`s6-four-products-v5.wav`). Final outputs at `-60s-v4-` and `-30s-v4-`. |
| v1.1 | 2026-08-01 | Per Becky: the two halves of "Four products. One memory." needed to land as one conversational phrase. Retaken with a comma read plus exclamation, then the remaining mid-phrase breath trimmed to 0.24s from the word timestamps (`s6-four-products-v4.wav`, 2.07s). On-screen line unchanged. Outputs at `-60s-v3-` and `-30s-v3-`. |
| v1.1 | 2026-08-01 | Per Becky: "One memory" was trailing off, so S6 was retaken with an exclamation for lift (audio only; the on-screen line keeps its period), placed so "Four" lands on the first icon. The 30s cut dropped the quote card for a compressed silent ask-and-answer beat ("It already knew" caption as the proof), making it product-forward. Outputs now at `-60s-v2-` and `-30s-v2-`. |
| v1.1 | 2026-08-01 | Becky added narration over the Monday-morning front page (S0). Line built on the ratified Home idiom (`ga-message-map.md:105`) plus her "nothing drops on the floor" close, flagged in findings. Two delivery cuts produced: **60s** (S1, S2, S0, S3, S4, S6, quotes, S7; S3b cut for time, its claim carried by S4; runs 62s content) and **30s** (narration is S2, S6, S7 only; chat open, fragment build, and one quote card, Meg's, carried visually; `source-30.html`). Outputs: `bemo-ga-sizzle-reel-60s-v1[-vertical]-vo-music.mp4`, `bemo-ga-sizzle-reel-30s-v1[-vertical]-vo-music.mp4`. The 70s v4 remains the full-length version. |
| v1 | 2026-08-01 | Render v4, per Becky's review of v3: word-level sync (visual beats retimed to the VO's word timestamps: thesis phrases, fragment cards, answer/sources, product icons, close cascade), VO regenerated with a speed ramp for build (S2 1.06x, S3b 1.08x, S4 1.10x, S6 and S7 1.12x; S1 stays calm at 1.0x), and music added: HeyGen library track 83197124 ("minimal sparse ambient building to confident corporate"), ducked ~19dB under narration, swelling over the silent quote section and the end card. Same narration text; the lock stands. Outputs: `-primary-v4-vo-music.mp4`, `-vertical-v4-vo-music.mp4`. |
| v1 | 2026-08-01 | Render v3, per Becky's review of v2: scenes now hold 0.3-0.5s past each segment's last word before fading, and S3's VO was regenerated at 1.12x (same clone, `s3-fragments-fast.wav`, 11.1s vs 13.0s) because the fragment listing dragged. Same narration text; the lock stands. Outputs: `-primary-v3-vo.mp4`, `-vertical-v3-vo.mp4`. |
| v1 | 2026-08-01 | Render v2: the July 31 render had drifted from this table (no silent S0 open; front page follows the thesis; Four products precedes the quotes; S3, S3b, and S4 windows too short for the locked VO). Fixed on the render side: `capture/source.html` widened S3 +3.5s, S3b +1s, S4 +0.7s, runtime 64.2s plus tail. VO mixed at scene times; quotes stay silent. Output: `capture/out/bemo-ga-sizzle-reel-primary-v2-vo.mp4` and `-vertical-v2-vo.mp4`. The table's Time column reflects the July 30 artifact; the render order above is what ships. |
