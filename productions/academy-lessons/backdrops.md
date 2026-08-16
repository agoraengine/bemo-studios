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

Becky's five rooms were re-published 2026-08-11 against the v2 clear-logo backgrounds (see the v2 section below); their v2 IDs below supersede the morning's first-batch IDs, kept in parentheses for the record. The studio and Lee's rooms still carry first-batch backgrounds.

| Room | Presenter / look | HeyGen video |
|---|---|---|
| 01 Studio (wall logo) | Becky, blue sweater | 8109787eb93844f9a351af41091c7b59 |
| 01 Studio (golden hour) | Becky, blue sweater | 475b9ebc1e9249b9b439eb6441073c9b |
| 02 Reading room | Becky, striped oxford | ae3263247fcf4f5dbf14bdb4113b4fab (was 530f2d397c664ec79d3de83a0b4f97cb) |
| 03 Salon | Becky, blue sweater (was linen) | b9715e4efc894b6ca5b231f221025dc2 (was d41c193187cf468085d14247471cf297) |
| 04 Lounge | Becky, navy + denim collar | 7700d5bef3664b57b819c6563deafdca (was 40b849eb0ad749609794c6a874d8bce4) |
| 05 Nook | Becky, denim shirt | b00ac44a36b6448a84c8abc68976f146 (was 1b57b1aeec054f0c8ffad3af02dd3a0b) |
| 07 Back office | Lee | 62a158b3ed724847a4e7b79862cecc0b |
| 08 Workroom | Lee | 6ef265e813d44e22aac1c5751bd619ff |
| 09 Boardroom | Lee | 7f092cf17ea0468cb59f668cca79561c |
| 10 Loft | Becky, dark navy top | da577d129acc4de9aafbe9dd3b235dbb (real-wordmark fix; supersedes 43cc46191e274d8dbf3c85a89f34ac60 and b9e8a3cd710140879707ca5d282cb411) |

Look-per-room assignments come from Becky's 2026-08-11 direction (a different twin version per setting); Lee's rooms use his single cast look pending his own call on outfit variation. 06 Lab remains blocked on a clean export.

## v2: revised clear-logo backgrounds (2026-08-11, complete)

Becky downloaded a revised set of all eight rooms the morning of 2026-08-11 with a much clearer framed bemo logo per room. She directed a redo of her five rooms (reading room, salon, lounge, nook, loft); the salon look also changed from linen to a blue-sweater cutout. Lee's three rooms have revised backgrounds in the same set but have not been redone; his 2026-08-11 v1 links above stand.

Local files (originals, 16:9 crops, composites, and every presenter cutout) are salvaged to `capture/out/scenes/revised-2026-08-11/`; the first-batch 16:9 crops are in `capture/out/scenes/rooms16x9-2026-08-10/`. Crop recipe for the new portrait originals: `crop=1086:611:0:Y` then scale to 1920x1080, with Y = 300 (reading room), 280 (salon), 270 (lounge), 260 (nook), 270 (loft). Composite recipe unchanged from the room-test recipe; final overlay x positions: reading room 280, salon 750, lounge 800, nook 508, loft 620.

All ten v2 asset files (five mp4 composites plus extracted mp3s) are uploaded and completed in HeyGen, batch `1cf0f0e5b7004e50bf2edce12cac0569` ("Room tests v2 Becky"). Video creation was interrupted mid-batch by a HeyGen token expiry. State:

| Room | Video asset ID | Audio asset ID | Studio video |
|---|---|---|---|
| 02 Reading room | 4f8e1dbb84de41daac36415e463cf974 | 2b0cea63d8224011aeb61fa37a54e286 | **created:** ae3263247fcf4f5dbf14bdb4113b4fab |
| 03 Salon (blue sweater) | b53a5f8a247e4c88b2b052cc1eb92992 | 30a55549906d4399813fc367c97fc3bc | **created:** b9715e4efc894b6ca5b231f221025dc2 |
| 04 Lounge | 68788ae0e7e241c88b35f23a0a275067 | 357c23ba568942a6aa4cf4486fd01f8b | **created:** 7700d5bef3664b57b819c6563deafdca |
| 05 Nook | 1af20e5ee83f4d4e864072e05f90cd62 | b9c24a79559c4b678914a7cd600ed85c | **created:** b00ac44a36b6448a84c8abc68976f146 |
| 10 Loft | 2ea66a70e7d540088b29d4784047ee60 | b1035df163954c2faa922e6d2446bc61 | **created:** 43cc46191e274d8dbf3c85a89f34ac60 |

All five verified completed at full duration on 2026-08-11 (no 2-second truncation); the review table above carries the v2 links.

**Loft logo fix (v3, same day):** Becky flagged the loft logo as still wrong; the generator had redrawn the mark (arc floating between the m and o, doubled-orange rainbow bands) instead of reproducing it. Fixed per the 2026-08-05 ruling: `delogo` erased the AI mark from the sign, and the real wordmark (rasterized from `../bemo-website/public/logo-horizontal.svg`, white ground keyed out) was composited in its place. The other four rooms' marks checked clean. Fixed background is `capture/out/scenes/revised-2026-08-11/bg-10_Loft-fixed.png`, composite `v3room-10_Loft.mp4/.mp3`, HeyGen assets c94d7eb100e345caaf319c4087deec13 (video) and ca48e872653f4371853bb45a5ffc1ff7 (audio), batch d5f1ce8a0a78445081f7409758452642, final video da577d129acc4de9aafbe9dd3b235dbb.

## New candidate: the lobby (Becky's test image, 2026-08-12)

Becky supplied a generated backdrop outside the brick-loft system: cream plaster wall, warm wood slat panel with edge lighting on the right, light wood floor, potted palm, and the full-color bemo wordmark applied directly to the wall upper-left. Composited and published as a HeyGen test the same day, per the room-test recipe (blue-sweater cutout `cutv03b`, centered, 0.85 scale bottom-anchored).

- The generator-drawn logo **checked clean** against `../bemo-website/public/logo-horizontal.svg` (arc bands orange, green, cyan in the right order; letterforms match), so no delogo pass was needed. First generated mark to survive the 2026-08-05 ruling inspection unedited.
- Note for ratification: this room breaks the continuity rules above (no brick, no black steel, and a full-color wall mark where the system uses white-painted or framed marks). If adopted it is a new look direction, not an eleventh room in the loft building.
- Source image: `~/Downloads/ChatGPT Image Aug 12, 2026, 12_58_14 PM.png` (1672x941), cropped and scaled to `capture/out/scenes/lobby-2026-08-12/bg-11_Lobby.png` (1920x1080), composite `room-11_Lobby.mp4/.mp3`.
- HeyGen: video asset `c7ed2fec2539431bb21d8e03777ebfb0`, audio asset `cf3e3a19ea6049188c48c2c4f7c80a2d`, studio video **95fb6cb0c3b1417aba75c72f94426091** (completed, full 8.4s duration): https://app.heygen.com/videos/95fb6cb0c3b1417aba75c72f94426091

**Scale fix (same day):** Becky flagged the presenter as too small; the wide empty wall makes the recipe's 0.85 scale (612px) read distant. Two fix variants rendered, both with the cutout upscaled to 900px wide (1.25x native, lanczos):

| Variant | Background | Composite | HeyGen asset | Studio video |
|---|---|---|---|---|
| v2: bigger presenter, full room | `bg-11_Lobby.png` (unchanged; keeps logo, slats, plant) | `room-11_Lobby-v2.mp4` | ed670c73df224d87929744cded451b65 | ab5ebfb0a1f8417da2890bc558ec6a73 |
| v3: punched in, tightest framing | `bg-11_Lobby-tight.png` (`crop=1450:816:60:90` then 1920x1080; drops the plant, enlarges logo) | `room-11_Lobby-v3.mp4` | 98b0b803f5584b47acec990f13f396d4 | 3cc75fa261f64addaf03fc5ad22ee743 |

Both reuse the original test's audio asset. Lesson for this room if adopted: the 0.85-scale rule is calibrated for the loft rooms' closer camera; wide-room backdrops need either a presenter upscale or a background punch-in chosen at composite time.

**Fresh-source v4 (same day):** Becky compared the composites against the Aug 10 pacing-test control (4d43b55f239f4758a5a49164d2ba83e0, a first-generation Avatar V render) and asked if a different engine was involved. It is the same Avatar V engine; the difference was generational loss in the composite chain (720px cutout from Aug 11, upscaled 1.25x, double re-encode). Fix: a fresh Avatar V render of the twin (`c1b7e19979ca42d78cf0a1646497a2d7`) lip-syncing the same audio asset, requested as `outputFormat: webm` at 1080p, which returns a native transparent cutout directly (1080x1098, same 60:61 framing as the old cutouts at 1.5x resolution) with no chroma keying or app-side matting step. HeyGen render 7df47dc455e34516a081304f17e24760, local `cutv-lobby-1080.webm`, composited identically to v2 (900px is now a downscale, not an upscale): `room-11_Lobby-v4.mp4`, asset da27338693c54668ba149c90f3036a7d, studio video **cfc859b59f2a47c0b9b2477477945d17**.

Recipe upgrade for ratification: request cutouts as 1080p alpha webm at generation time and keep them at or below native size in composites. The Aug 11 720px cutout library is fine for the brick rooms at 0.85 scale but below its quality floor at wide-room presenter sizes.

## Open questions

- Does Featured keep the loft, or does the flagship deserve its own room and the loft retires to Communications & Marketing (its current cm-02 use)?
- The audition round 3 question (founders' twins vs stock cast) is still open. This system is presenter-agnostic: rooms bind to categories, so a recast category keeps its room.
