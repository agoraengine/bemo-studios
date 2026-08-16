# Reference: Apple's short-form social animations

**Status:** Reference analysis, 2026-08-14. Becky flagged the Apple post as a model to follow.
**Source:** [LinkedIn post by Apple](https://www.linkedin.com/posts/guess-which-computer-is-a-business-fave-ugcPost-7487911886433370112-ShcB/), posted ~late July 2026, 263 reactions and 47 comments.

## What the video actually is (measured 2026-08-14)

Retrieved by driving the LinkedIn post in a browser and stepping the player frame by frame. This supersedes the first version of this file, which analyzed the post copy without the media and inferred a multi-beat structure the video does not have.

**Format facts:** 6.0 seconds, 720x720 square, loops. Silent-native.

**It is a poster, not a sequence.** Everything is on screen from frame one and nothing cuts:

- Headline, huge black type, upper left, holding the entire runtime: "MacBook Air is the world's #1 laptop for business."
- A giant Apple mark embossed tone-on-tone in the brushed-silver ground, bleeding off the right edge.
- Support line small, lower left: "Find out why it's the lightweight heavyweight." with a "Learn more" chip.
- **Exactly one element animates:** the "1" in "#1" rolls like an odometer through other digits and clicks into place by about the 3-second mark. Then the poster simply holds.

The post copy ("Guess which computer is a business fave?") carries the tease; the rolling digit is the payoff of that guess. One claim, one gag, four seconds of stillness.

- Poster: Apple, 18.3M followers. Engagement: 263 reactions, 47 comments, mostly an argument about Mac in enterprise rather than about the creative.

## The grammar, corrected against the real frames

The Apple short is not a compressed commercial, and it is also not a sequence of beats. It is **an animated poster**, and five properties define it:

1. **One idea, and no second one.** A single claim in a single composition. No feature list, no scene changes, no build.
2. **Everything present from frame one.** The composition never assembles and never resolves. A viewer who catches any random second of the loop has seen the whole thing.
3. **Exactly one element animates, and the animation is the wit.** Their rolling "#1" answers the post copy's "guess which." The motion is not decoration on the message; it is the message's punchline. Everything else is perfectly still.
4. **Silence is the design, not the fallback.** No narration, nothing to caption. The type is the whole argument.
5. **The brand is the ground, not a closing card.** The giant embossed mark bleeds off the edge as texture. There is no end card because a poster does not end.

The first version of this file guessed at an ask-withhold-resolve arc. The real video has no arc. The withholding lives in the post copy above the video, and the video is the reveal, looping.

## The part that does not transfer, and why

Apple's riddle works because the audience already knows the answer. "Guess which computer" is only a game if the brand is the punchline the viewer can supply. This is the same wall the Google Workspace reference hit from the other direction: Google can abstract its apps into gray rectangles because everybody recognizes them, and **nobody recognizes BeMo**.

A straight transplant produces "guess which platform nonprofits love," which is not a riddle, it is a stranger asking to be guessed. It would also break hard rule 2 by making the product the subject of the opening frame.

**The translation that keeps the mechanism: move the guessing game off the brand and onto the viewer's own pattern.** The riddle is still a riddle, but the answer the viewer supplies from memory is something true about their week rather than something true about our logo. "Guess who knows how your organization actually works" is a question every ED can answer in under a second, and the answer is the problem BeMo exists for. Apple's structure survives intact: ask, withhold, resolve, mark. Only the thing being recognized changes, and changing it is what makes the format problem-first instead of brand-first.

## What we adopt (the poster translation, Becky's direction 2026-08-14)

Cut 5 ("Nothing falls") is the direct translation and the template for the format:

| Apple property | How it lands here |
|---|---|
| One idea | One line, one composition. The approved paired close carries cut 5. |
| Present from frame one | The poster opens complete: headline, embossed mark, support line, URL pill. No build, no close card. |
| One animated element, and it is the wit | "falls" slips off the baseline and is caught. The word that says nothing falls is the thing that does not fall. |
| Silence as medium | No VO, no music, nothing to caption. |
| Brand as ground | The wordmark embossed tone-on-tone in the Sapphire ground, bleeding off the edge, arcs visible. |
| Copy carries the tease | The LinkedIn post copy above the video does the "guess," the poster is the reveal. |

## What we do not adopt

- **Opening on the product.** Apple's frame can hold a laptop at second one. Ours opens on the viewer's pattern (hard rule 2, `18-anti-patterns.md`).
- **Brand as the answer.** The recognition target is the viewer's problem, per the translation above.
- **Zero text.** Apple can run near-wordless because the object is self-identifying. Our cuts are type-led; the type is doing the recognition work an image cannot do for an unknown brand.
- **The confident-guess tone.** "A business fave" is a market leader's voice. Ours is a question asked without the answer implied, which is also the voice-and-tone register.

## The open question this format raises

`docs/02-production-standards.md` says burned-in captions on every video, no exceptions, because the audience watches muted. **A cut with no speech has nothing to caption.** Burning a caption bar under a type card would double the on-screen text, which the Aug 9 no-doubling ruling already rejected for the share cuts. The proposal in `brief.md` is that the standard reads "every video with speech," and that a silent cut ships the `.srt` as an empty file or none at all. That is Becky's call, not an assumption made in the render.
