# Findings: Short-Form Animations

Things discovered during this production that belong to someone else's surface. Raised here, fixed there.

## Canon and site

- **The Compass line exists in two wordings, and they disagree.** The message map and messaging-assets (`ga-message-map.md` 3.2, `messaging-assets-v1.md`) say "You don't have to be the only one who knows how **this** organization works." The live site hero for that section (`bemo-website/public/preview/index-beta.html`) says "...how **your** organization works," and puts the green mark on the whole closing clause. Checked 2026-08-14. Cut 1 follows the map, because hard rule 7 traces claims to the map, and marks "the only one" (the phrase the animation just dramatized) rather than the site's clause. Named here rather than silently picked: if the site wording is the ratified one, the map should say so and the cut re-renders in minutes. Raise to whoever owns the message map.
- **The captions standard has no rule for silent video.** `docs/02-production-standards.md` requires burned-in captions with no exceptions; a cut with no speech has nothing to transcribe, and doubling the on-screen type into a caption bar was already rejected on Aug 9 for the share cuts. Proposed amendment is in the brief's open questions. Studios-side decision (Becky), then a standards edit.

- **The narrative-arc docs are stale on dates.** `bemo-os/docs/communications/narrative-arc/05-ga-arc.md` and siblings still assume the old July 6 GA; the current plan is P50 the week of September 21. The arc's structure transfers, but anyone reading the docs cold gets the wrong calendar. Checked 2026-08-15 during the question-poster alignment pass; raise to bemo-os.

## Reference gaps

- **The Apple source video itself was not retrievable**; LinkedIn served the post shell only. The analysis in `reference-apple-short-form.md` is grounded in the confirmed post copy plus Apple's known social grammar, and says so. If Becky saves the mp4 to `capture/ref/`, the shot-by-shot gets added and anything it contradicts gets revised.

## Production notes for the next batch

- An early version of cut 3 collapsed the seven tabs into one surviving tab. It looked good and quietly implied "BeMo is the one tab," a product claim this format is explicitly barred from making (brief: no product, at all). The collapse is cut; the frame just empties. If a future cut wants that move, it is a feature-reel move, not a short-form move.
- `.mk` underline draw, `window.seek()` still-probe, and the scene/max-width gotcha are all documented inline in `capture/source.html`; reuse from there rather than rediscovering.
