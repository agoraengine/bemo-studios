# Week 31 tagged links

v1 · August 21, 2026

**What this is:** the paste-ready UTM set for the week of August 23, one row per placement, generated against the Week 31 asset plan (bemo-os `docs/communications/narrative-arc/anchors/2026-w31-asset-plan.md`) and the tagging convention (bemo-os `docs/communications/content-engine/01-utm-and-attribution.md`). This is the first week on the four-field scheme; Week 30 ran the older medium-holds-format version, so nothing below is copied from the Week 30 pull.

**Scheme, stated once:** `utm_source` is the platform, `utm_medium` is `organic-social` everywhere except the newsletter (`email`), `utm_campaign=w31-third-monitor` on every link, `utm_content` opens with the franchise token. All lowercase, hyphens not spaces, tags only on inbound links from outside.

## The set

Every link below is `https://bemointel.ai/` plus the query string shown.

| Day | Placement | Link |
|---|---|---|
| Sun | Field Notes video, first comment | `https://bemointel.ai/?utm_source=linkedin&utm_medium=organic-social&utm_campaign=w31-third-monitor&utm_content=field-notes-video` |
| Mon | Article footer (the essay's only conversion element) | `https://bemointel.ai/?utm_source=linkedin&utm_medium=organic-social&utm_campaign=w31-third-monitor&utm_content=anchor` |
| Mon | Anchor post, first comment | `https://bemointel.ai/?utm_source=linkedin&utm_medium=organic-social&utm_campaign=w31-third-monitor&utm_content=anchor-first-comment` |
| Tue | Extension post, first comment | `https://bemointel.ai/?utm_source=linkedin&utm_medium=organic-social&utm_campaign=w31-third-monitor&utm_content=anchor-extension` |
| Tue | Compass reel (company page), first comment | `https://bemointel.ai/?utm_source=linkedin&utm_medium=organic-social&utm_campaign=w31-third-monitor&utm_content=reel-product-compass-15s` |
| Tue | Compass 30s parent, YouTube description | `https://bemointel.ai/?utm_source=youtube&utm_medium=organic-social&utm_campaign=w31-third-monitor&utm_content=reel-product-compass-30s-description` |
| Wed | Carousel, first comment | `https://bemointel.ai/?utm_source=linkedin&utm_medium=organic-social&utm_campaign=w31-third-monitor&utm_content=carousel` |
| Thu | Gaps feature reel (Becky's profile), first comment | `https://bemointel.ai/?utm_source=linkedin&utm_medium=organic-social&utm_campaign=w31-third-monitor&utm_content=reel-feature-gaps-15s` |
| Thu | Gaps 30s parent, YouTube description | `https://bemointel.ai/?utm_source=youtube&utm_medium=organic-social&utm_campaign=w31-third-monitor&utm_content=reel-feature-gaps-30s-description` |
| Fri | Question poster (company page), first comment | `https://bemointel.ai/?utm_source=linkedin&utm_medium=organic-social&utm_campaign=w31-third-monitor&utm_content=poster-where-did-they-go` |
| Fri | Newsletter CTA block | `https://bemointel.ai/?utm_source=newsletter&utm_medium=email&utm_campaign=w31-third-monitor&utm_content=anchor` |
| Fri | Facebook adaptation, closing line | `https://bemointel.ai/?utm_source=facebook&utm_medium=organic-social&utm_campaign=w31-third-monitor&utm_content=anchor-extension` |
| Sat | Product still (company page), first comment | `https://bemointel.ai/?utm_source=linkedin&utm_medium=organic-social&utm_campaign=w31-third-monitor&utm_content=still-product` |

## Deliberately untagged

- **Monday's group share** to "AI for Nonprofit Organizations": bare article URL, no UTM, no beta pitch, per the convention's community-posts rule and the Week 30 precedent.
- **Instagram, Thursday and Saturday:** both run on the bio link with no per-post UTM, the Week 30 precedent. Confirm the bio points at the live site.
- **Lee's placements** (Edition #7, the Friday poster repost): his bylined posts stay CTA-free per the asset plan's conversion layer, so no link and nothing to tag.

## Two judgment calls, so review is a check rather than a rebuild

1. **The YouTube description tokens.** The asset plan's `utm_content` list names the 15-second cores only. The convention says YouTube description links run `utm_content=<franchise>-description`, so the two parents take `reel-product-compass-30s-description` and `reel-feature-gaps-30s-description`: franchise prefix first, then the variant, then the placement. If Becky prefers the plan's shorter enumeration, drop the `-description` suffix; the franchise rollup works either way.
2. **The Facebook content token.** The adaptation compresses the Tuesday arrangement argument, so it carries `anchor-extension`, staying inside the asset plan's enumerated set. `utm_source=facebook` keeps it separate from the LinkedIn extension post in every report.

## Before Monday

- [ ] **The field test:** open one tagged link in a browser, then in Plausible filter Sources by campaign `w31-third-monitor` and confirm the visit shows all four fields as filterable rows. One test click validates the pipeline before anything posts.
- [ ] **Fix 1 with Lee:** as of August 21 the site has no conversion event (no `plausible()` call anywhere in bemo-website) and all 24 beta CTAs are hardcoded without the query string. The convention says the `StartBeta` event should land before this rollout. Without it the week produces clean click counts and no conversion data, which the Friday close should then say plainly.
- [ ] **Ratification:** the convention is still PROPOSED, pending Becky, an open row in the content-engine decision log. Posting this set on the new scheme is a de facto ratification; record it in bemo-os if that is the intent.
- [ ] The Friday close checklist already carries the scheme's field test: record whether Plausible reads all four cleanly and whether the franchise prefixes roll up as designed.

---

*v1, August 21, 2026: first version, generated from the Week 31 asset plan's edcal ahead of the Sunday build.*
