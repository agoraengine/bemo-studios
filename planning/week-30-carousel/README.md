# Week 30 carousel: the questions worth asking

v2 · August 16, 2026

Seven-slide LinkedIn carousel for the Week 30 "AI slop button" story. The
slides carry the reader's questions about anything in their feed; they contain
no product screenshots, no numbers, no customer name, and no BeMo capability
claim, per the build brief.

## Publish slot

- **Wednesday, August 19, 2026:** carousel (the PDF) as a document post on
  Becky's LinkedIn profile, with the Wednesday post copy from the asset plan.
- **Thursday, August 20, 2026:** square PNG variant to Instagram.

## Copy source

Slide copy is verbatim from the ratified Week 30 asset plan, Wednesday
carousel section:
`../bemo-os/docs/communications/narrative-arc/anchors/2026-w30-asset-plan.md`

Do not edit copy in `build.mjs`; if the plan changes, re-quote it and re-run.
The QUESTION 01 through 04 eyebrows and the page index are labels permitted by
the build brief, not copy.

## Design

Schibsted Grotesk throughout, Geist Mono for eyebrows, pills, and the page
index. The cover and the close run on Deep Sapphire #05347E with white type
(the white knockout wordmark on the close); the five interior slides run on
white with Deep Sapphire type. The four question slides are a matched
top-anchored system: Verdant Soft #EAF7E3 eyebrow pill with Verdant Green 700
#378F10 mono text (green text on a light ground, the Week 26 fix), oversized
type, and an oversized ghost question mark in Verdant Soft bleeding off the
right edge (the reels' quote-card device; slide 2 carries the ghost quotation
mark instead). The green underline mark (#4CBB17, a graphic) lands on
"a better test" (slide 1), "unanswerable" (slide 2), and "more of that
person" (slide 7). Orange #FF8210 appears exactly once in the whole set: the
essay-pointer pill on the close, ink text per the Ink-on-Orange Rule, accent
never ground.

## Files

Rebuild everything with `node planning/week-30-carousel/build.mjs`.

| File | What |
|---|---|
| `w30-carousel.pdf` | 7 portrait pages, the LinkedIn document upload |
| `w30-carousel-s1..s7-portrait.png` | 1080x1350 stills, the PDF's source pages |
| `w30-carousel-s1..s7-square.png` | 1080x1080, the Instagram Thursday variant |
| `build.mjs` | renders all of the above |

Fonts and the wordmark are read from
`productions/common-table-press-release/capture/` at build time; nothing is
copied here.

---
v2 (August 16, 2026): bolder pass per Becky's note. Sapphire cover and close,
ghost glyphs, eyebrow pills, larger load-bearing type, one orange moment.
v1 (August 16, 2026): first render of the full set, for Becky's approval.
