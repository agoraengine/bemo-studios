# Script: Common Table Press Release, Becky's share cut

**Status:** LOCKED (2026-08-10)
**Version:** v4
**Runtime target:** ~55 seconds (primary), ~30 seconds (feature cutdown)
**Word count:** 117 (narration only; about 150 words per minute)

*Scope note (2026-08-09): Becky asked for a shorter reel on the press release build with her VO, for sharing this week, opening on her own career with press releases. This is her personal share cut from the 2026-08-06 preview footage, not the series reel 12 clip; the brief stays DRAFT and the reel 12 open questions stay open. VO is Becky's approved HeyGen voice (founder narration), swappable for a live Voice Memos read if she prefers.*

*Locked means the VO has been generated against this text. Changes after lock require regenerating audio, so lock late and change deliberately.*

---

| Time | Narration | On screen | Shot |
|---|---|---|---|
| 0:00 | Drafting a press release never begins with the writing. It begins with the hunt: numbers in a spreadsheet, history in someone's head, boilerplate in whichever doc used it last. | Typographic card, snow ground. "Drafting a press release never begins with the writing." Three scattered items land one by one: a spreadsheet, someone's head, whichever doc used it last. | S2 |
| 0:12 | So here's one taking shape inside BeMo, where the organization's knowledge already lives. | Footage: Amplify templates page, New Press Release clicked, editor opens (raw 11.5 to 21.5, sidebar cropped). Provenance chip on from here through all footage: CAPTURED FROM THE PRODUCT · COMMON TABLE IS A FICTIONAL DEMO ORG. | S3 |
| 0:20 | Before anyone types a word, the boilerplate, the media contact, the organization's own facts show up on their own. | Footage: Choose KB inputs, "Found 5 relevant items in your knowledge base," items listed, submitted (raw 31 to 41). | S4 |
| 0:29 | You answer the questions only a person can answer: what you're announcing, and why it matters. | Footage: the interview question and radio grid, Event selected, the announcement field (raw 82 to 97, cropped to the form region, above the chat prose). | S5 |
| 0:35 | And the draft comes back sounding like the organization: its programs, its numbers, its own words. | The seeded Harvest Supper release as a paper document on snow, slow push-in. Orientation chip, hero grammar: "Amplify · BeMo's communications app · Press Release editor" (surface naming for a cold viewer; the spoken close stays on the brand line, CTA lives in post-copy.md). | S6 |
| 0:43 | Every piece of content reflects who you actually are, not who you were three drafts ago. | Typographic card: the Amplify lead message, green underline mark on "who you actually are." | S7 |
| 0:50 | BeMo. Where missions gain momentum. | End card, BeMo blue (Deep Sapphire) ground: white knockout wordmark, "Where missions gain momentum.", www.bemointel.ai. Standing rule (Becky, 2026-08-09): every video's last screen carries this ground, logo, and URL. | S8 |

---

## Notes

**Opening:** problem first, org-first (Becky, 2026-08-10): the personal career line is out of the video and lives in `post-copy.md`, where her own voice belongs. The film opens on the problem statement itself; the product does not appear until 0:12, after the problem is named. S1 is retired; shot numbers keep their old names so the change log stays readable.

**Pacing:** timings above are targets; the finish script places each VO segment by its measured duration and the captions follow the VO verbatim.

**Screen hygiene applied:** S3 crops the left sidebar (old chat titles, including a "Gala" one). S5 crops to the form region because the app's chat prose above it drafts em dashes (known product finding). S6 (from cut v5) shows the seeded Harvest Supper document, reshot after login via `capture/reshoot-draft.mjs`: it matches the acceptance sheet with zero em dashes, so nothing on screen carries one. No Owner column, no Wrenfield, no pre-wipe docs appear.

**Muted autoplay:** every narration line is burned as a caption (series contract), so the argument carries with sound off.

## Claim trace

| Line | Claim | Traces to |
|---|---|---|
| S2 | The work begins with reassembling, not writing | "Most work isn't creating, it's reconstructing" (messaging-assets-v1, supporting claim 1); brief message 2, ratified 15-second problem statement |
| S3 | BeMo is where the organization's knowledge lives | The roof, GA message map; shown on screen as the KB feeding the template |
| S4 | KB facts arrive before typing | Screen truth: the Choose KB inputs step found 5 items (findings.md, 2026-08-06); narration names only what is visible (boilerplate, media contact, org facts) |
| S5 | The person supplies announcement and rationale | Screen truth: the interview's own question text ("What are you announcing, and why does it matter?") |
| S6 | The draft is in the organization's voice, from its own facts | Amplify lead message, GA message map 3.2; on screen: Common Table's programs, numbers, and quote in the draft |
| S7 | "Every piece of content reflects who you actually are, not who you were three drafts ago." | GA message map 3.2, Amplify lead message, verbatim |
| S8 | "Where missions gain momentum." | Brand close as shipped in the locked hero reel (R8H) |

No customer names, quotes, or outcomes appear. Common Table is fictional and labeled as such on screen the whole time footage is up.

## Change log

| Version | Date | What changed and why |
|---|---|---|
| v1 | 2026-08-09 | Initial draft for Becky's personal share cut; VO generated same day (HeyGen speech endpoint, Becky's voice), reel cut as `capture/out/common-table-press-release-becky-v1.mp4` via `capture/run-press.mjs` |
| v2 | 2026-08-09 | S2 reworded per Becky: "And the work never begins with the writing. It begins with the hunt: ..." replaces the "release day" line on card and VO both; L2 audio regenerated. |
| v2 (cut v5) | 2026-08-09 | S6 reshot against the seeded document after Becky's login; the on-screen release now has zero em dashes. |
| v2 (cut v7) | 2026-08-09 | VO bus gets warm tone EQ (Becky's pick from a rendered warm/warmer audition, answering her tinny note). S6 gains the Amplify orientation chip; Becky's CTA question resolved as chip on screen + link in post-copy.md, close unchanged. |
| v2 (cut v8) | 2026-08-09 | S8 end card per Becky's standing rule: Deep Sapphire ground (#05347E, the site's footer/CTA ground), white knockout wordmark, tagline, www.bemointel.ai. |
| v4 (cuts motionE, 30s v2) | 2026-08-10 | Two notes from Becky's review. S2 opens by naming the work: "Drafting a press release never begins with the writing" replaces "The work never begins..."; `pr-l2c.wav` regenerated (speech endpoint, +6dB pre-gain baked in because the raw file exceeded the leveler's clamp), the 30s open `pr-l2s2.wav` trimmed from its first sentence, everything after shifts +0.7s (54s cut) / +0.8s (30s). And the app footage is recut: the mixed window shapes read as a wrong aspect ratio, so every app shot now uses a 16:10 crop (`seg3-*`, from the raw preview recording) in one consistent 900x562 stage window; the crops are downscales now, so they are also sharper. The 30s iterated to v3 same day (one generous KB crop with push-depth shot changes, full-width draft, VO time-compressed 8%). Becky's same-day ruling on the 30s v1: the 30-second format and the upbeat bed win, and all product-feature videos go 30 seconds (recorded in `docs/02-production-standards.md`). |
| v3 (cuts motionD, 30s v1) | 2026-08-10 | Narration unchanged. The "is this a 10" pass, per Becky: footage block recut into sub-shots from the raw preview recording (no hold over ~4s; templates 2 shots, KB 3 including the Submitted landing, interview 2 including real typing, draft 2 regions of the still), interview beat gains its chip pair ("what you're announcing" / "why it matters", the VO's own words), card type up a step, and a low tick (the series chime's attack) under each pill/chip landing, ~14dB under the bed. Also `common-table-press-release-motion30-v1.mp4`: a 30s cutdown from the locked narration at sentence boundaries (problem line via `pr-l2s.wav`, a trim of l2b's first sentence; l4; l6; l8) over the series' 30s bed, flat envelope. Interview and thesis beats sit out of the 30s; templates too. Rig: `capture/run-motion30.mjs`. |
| v3 | 2026-08-10 | Personal references removed from the video per Becky: S1 (the career line) is cut, and that framing moves to `post-copy.md` where she shares it in her own voice. S2 regenerated without the leading "And" (`capture/out/vo/pr-l2b.wav`, speech endpoint, same voice; word timestamps drive the card timings). Everything after shifts up 4.4s; runtime ~54s. Rendered against the motion-grammar audition rig (`capture/run-motion.mjs`, cut motionB), which is pending Becky's approval as the batch standard. |
| v1 (cut v3) | 2026-08-09 | Narration unchanged. Cut polish per Becky's notes: eyebrow removed from S1; tighter crops and push-ins on S3/S4; captions burn only where they add words beyond the on-screen cards (full track stays in the .srt); music stays the series music-D bed after a rendered audition against warm-acoustic and 60-build. Becky ratified generated-voice VO for these cuts (no live recording) so the format scales. |
