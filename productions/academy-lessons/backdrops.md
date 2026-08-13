# Backdrop system: one room per Academy category

**Status:** EXPLORATION (Becky requested 2026-08-10). Not ratified. If adopted, this supersedes two treatment rulings: "one scene per series" (2026-08-04) and "each presenter keeps one scene" (2026-08-05). It also folds in the blocked logo-free work: every new room generates in a logo and a logo-free variant, which unblocks the "wall logo appears once" ruling without a separate regeneration pass.

## The idea

One building, ten rooms. Every category gets its own room, but all ten rooms live in the same brick-and-timber loft building the series already inhabits, so a viewer moving between categories changes rooms, not universes. The category read comes from what the room is for (a boardroom reads governance, a workroom reads programs), never from color-coding: DESIGN.md's rule that color carries meaning belongs to the product UI, and set dressing stays out of that system.

Why this holds up against the one-scene ruling it replaces: a category never changes presenters, so a viewer binging one category still sees one presenter in one room every time. Continuity moves from the series level to the category level, where viewers actually binge.

## Continuity rules (constant across all ten rooms)

- Same architectural DNA: exposed brick, warm timber, black steel window frames, tall windows, wood or polished concrete floors. No glass-tower offices, no home interiors.
- Camera at standing chest height, wide-normal lens, slight depth of field. The presenter zone (center for Becky's rooms, center-right for Lee's) keeps an uncluttered background at head height.
- Light direction is per presenter and never varies: Becky's rooms take window light from the right (matches the loft and her cutout shading), Lee's rooms from the left (matches the boardroom).
- Each room renders twice from the same composition: once with the bemo wordmark on the main wall upper-left (welcome beat only) and once logo-free (every other beat). No other brand marks in the set.
- 1920x1080 minimum, 16:9, no people, no readable text anywhere in the room besides the wordmark variant.

## The rooms

| Category | Presenter | Room | Signature elements |
|---|---|---|---|
| Featured | Becky | The loft (current scene, kept) | Long desks, city windows. The flagship room stays the brand's front door. |
| Communications & Marketing | Becky | The studio | Pinboard wall with blank cards and swatches, a long layout table, an easel by the window. |
| Advocacy & Civic Engagement | Becky | The reading room | Tall bookshelf wall, a long shared table with green-shaded lamps, public-library warmth. |
| Fund Development | Becky | The salon | Round meeting table, two armchairs, a sideboard with coffee service, the most hospitable room in the building. |
| People & Leadership | Becky | The lounge | Low sofas around a wood coffee table, warm floor lamp, softer rug. |
| Personal Growth | Becky | The nook | Smallest room, window seat, plants, morning light, one armchair. |
| Strategy & Governance | Lee | The boardroom (current scene, kept) | Long table, bookcase wall. |
| AI for Nonprofits | Lee | The lab | Glass partition wall, standing desks, one large dark display on the far wall (off, unreadable). |
| Finance & Operations | Lee | The back office | Ledger shelving, flat-file cabinets, a tidy desk, the most orderly room. |
| Program Impact | Lee | The workroom | Large whiteboard wall (blank), corkboard with unreadable field photos, sturdy work tables. |

## Generation prompts

Base prompt, shared by every room (append the room clause, then the variant clause):

> Interior photograph of a {room clause} inside a converted brick loft building. Exposed red-orange brick feature wall, warm timber furniture, black steel-framed windows, {light direction} through tall windows casting soft geometric light on the wall. Camera at standing chest height, wide-normal lens, slight depth of field, natural warm daylight, photorealistic architectural photography, no people, no readable text or signage. 16:9.

- Light direction: "afternoon sun from the right" for Becky's rooms, "afternoon sun from the left" for Lee's rooms.
- Logo variant clause: "A large flat white painted wordmark reading 'bemo' in a rounded lowercase sans-serif with a small wifi-style arc over the final o, upper left on the brick feature wall." Generate the logo-free version first and add the mark for the second render; if the generator warps the mark, composite the real wordmark SVG over the logo-free image instead (an AI-warped logo is worse than none, per the 2026-08-05 ruling).

Room clauses:

1. **The studio:** "creative studio with a pinboard wall of blank white cards, a long wooden layout table, and an artist's easel near the window"
2. **The reading room:** "quiet reading room with a full-height bookshelf wall, a long shared oak table, and brass lamps with green glass shades"
3. **The salon:** "welcoming meeting salon with a round wooden table, two upholstered armchairs, and a wooden sideboard with a coffee service"
4. **The lounge:** "comfortable lounge with two low fabric sofas around a wooden coffee table, a warm floor lamp, and a soft area rug"
5. **The nook:** "small quiet corner room with a cushioned window seat, several potted plants, and a single armchair in soft morning light"
6. **The lab:** "modern workspace with a glass partition wall, wooden standing desks, and one large dark display screen switched off on the far wall"
7. **The back office:** "orderly office with wooden ledger shelving, wide flat-file cabinets, and a single tidy desk"
8. **The workroom:** "project workroom with a large blank whiteboard wall, a corkboard of small pinned photographs, and sturdy wooden work tables"

## Pipeline notes

- Files land in `capture/out/scenes/` as `<room>-logo.png` and `<room>.png` (gitignored like all media; Drive copies per the assets manifest).
- Each image uploads to HeyGen as an asset once (`create_asset_upload`); asset ids get recorded in this file's table when they exist. Local compositing via `plan.json` `avatarBg`/`bg` keys is unchanged; only the image path per lesson changes, driven by the lesson's category.
- Review path before ratification: composite one still of the category's presenter cutout over each candidate room and show the set side by side. No treatment change until Becky approves the composited set, not the bare rooms.

## Approved set and HeyGen asset IDs (Lee approved all backgrounds, 2026-08-10)

Two batches uploaded 2026-08-10: thumbnail comps (batch `ee0d80e820ee4cfdb107f93ad800933f`, ~300x400 px, reference only) and the **full-size production set** (batch `798a8202b6d442c3b4f0edac907b7c36`, 1536px wide portrait, verified). Production compositing uses the full-size IDs below; each room needs a per-room 16:9 crop window chosen at composite time (portrait sources), keeping the framed logo and the presenter wall in frame. The approved set replaces the original boardroom and loft scenes (supersedes the "kept rooms" note above), and carries the logo as a framed navy-on-white picture per room rather than the painted wall treatment; welcome-wall usage to be settled at grade time. Studio (01) was approved earlier via the two rendered tests; lab (06) is still awaiting a clean export without the glowing zone rectangle.

| Room | Size | Full-size asset ID (production) | Comp asset ID |
|---|---|---|---|
| 02 Reading room | 1536x2329 | 1425b23957ed4410bc25b97a6c790558 | 92bde76739574520b9aafa0b5663183f |
| 03 Salon | 1536x2152 | b00004da329a4979a83ef169b0fa73d4 | 15b24fce56d7401aa08093f66fc6f474 |
| 04 Lounge | 1536x2145 | 2110d1e891c14da4a52f56cfc5995ef4 | 44400006c06641cd83c27973fcfcedd2 |
| 05 Nook | 1536x2145 | c145a66e229946cb9fed4ce950ac5746 | 07b9cedba3fd476593b894b4c962344b |
| 07 Back office | 1536x1913 | 5f2d7f6cb8784ab291d423fa5f2bf2a0 | 5f25c9dca12043779099c645fda9c264 |
| 08 Workroom | 1536x1768 | b7192f9f15a444c4ae0bb712d91a3e9e | 6bede11d029543c7a720c8aad6b7e469 |
| 09 Boardroom (new, replaces existing) | 1536x1763 | 177b11fbe7a04aabb70ee3eda34c1f3d | 8ade465546fd4b0bb443674d3c237823 |
| 10 Loft (new, replaces existing) | 1536x1763 | c2df7c233d354231a8c93b2798f71b9c | 4fac9c72815a4c0abf489f8a6ee6bb56 |

Local full-size files: `~/Downloads/BeMo_8_Rooms_Full_Size_1536px/` (copy to Drive per the assets manifest before they age out of Downloads).

## Room-test recipe (proven on the studio, 2026-08-10)

Per room: crop any annotation header off the export (finals should arrive clean; the safe-zone dashes are review-board markup, never asset content), composite the presenter's existing transparent webm cutout over the room at 0.85 scale bottom-anchored (Becky centered in the safe zone, Lee center-right), then publish to HeyGen for a shareable link. One cutout per presenter reuses across all their rooms; no per-room avatar render needed.

Publishing caveat: HeyGen's studio API v1 truncates a clip-only scene to 2 seconds. Working recipe: upload the composite mp4 and its extracted audio as separate assets, then create the studio video with the audio asset as the scene's voiceover (`audio_asset_id`) and the clip muted (`playback: {mode: fit_to_scene, mute: true}`). The voiceover drives the correct duration. Wait for each `complete_asset_upload` to settle before creating the video.

First proven output: The Studio with Becky, HeyGen video `af0ad595b65f4de0b59d78f5e611ec7a`.

Wall wordmark for welcome variants: rasterize `../bemo-website/public/logo-horizontal.svg` (qlmanage renders it at 1600px), key out the white ground, fill the glyphs white, and overlay at ~85% opacity on the brick upper area, clear of the presenter zone. Never use a generator-drawn logo (2026-08-05 ruling). Proven on The Studio: videos `8109787eb93844f9a351af41091c7b59` (wall logo) and `475b9ebc1e9249b9b439eb6441073c9b` (golden-hour variant, pinned-sheet logo).

## Published room tests (2026-08-11, for Becky and Lee's review)

Full board of composited tests, one per approved room, each with the category's narration, break-tag pacing, and (Becky's rooms) a distinct twin look per room. All published as HeyGen studio videos via the recipe above.

| Room | Presenter / look | HeyGen video |
|---|---|---|
| 01 Studio (wall logo) | Becky, blue sweater | 8109787eb93844f9a351af41091c7b59 |
| 01 Studio (golden hour) | Becky, blue sweater | 475b9ebc1e9249b9b439eb6441073c9b |
| 02 Reading room | Becky, striped oxford | 530f2d397c664ec79d3de83a0b4f97cb |
| 03 Salon | Becky, linen | d41c193187cf468085d14247471cf297 |
| 04 Lounge | Becky, navy + denim collar | 40b849eb0ad749609794c6a874d8bce4 |
| 05 Nook | Becky, denim shirt | 1b57b1aeec054f0c8ffad3af02dd3a0b |
| 07 Back office | Lee | 62a158b3ed724847a4e7b79862cecc0b |
| 08 Workroom | Lee | 6ef265e813d44e22aac1c5751bd619ff |
| 09 Boardroom | Lee | 7f092cf17ea0468cb59f668cca79561c |
| 10 Loft | Becky, dark navy top | b9e8a3cd710140879707ca5d282cb411 |

Look-per-room assignments come from Becky's 2026-08-11 direction (a different twin version per setting); Lee's rooms use his single cast look pending his own call on outfit variation. 06 Lab remains blocked on a clean export.

## Open questions

- Does Featured keep the loft, or does the flagship deserve its own room and the loft retires to Communications & Marketing (its current cm-02 use)?
- The audition round 3 question (founders' twins vs stock cast) is still open. This system is presenter-agnostic: rooms bind to categories, so a recast category keeps its room.
