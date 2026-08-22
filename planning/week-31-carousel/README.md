# Week 31 carousel: the departments you do not have

v1 · August 22, 2026

**Slot:** Wednesday, August 26, 2026, Becky's profile. Square resize runs on Instagram
Thursday. Copy is verbatim from the Week 31 asset plan's Wednesday carousel section in
bemo-os (`docs/communications/narrative-arc/anchors/2026-w31-asset-plan.md`), which was
**rebuilt August 21** after the anchor's v2 revision.

**Why the set changed.** The original seven slides were the questions you stop asking when
there is nobody to ask them to. The v2 anchor now owns that ground outright in its own
section, "The questions you never asked," so running it Wednesday would have restated the
essay rather than extended it. This set takes the essay's other new passage, the one about
doing jobs that would be spread across whole departments, which the essay states once in a
paragraph and never unpacks.

## The slides

| # | Copy |
|---|---|
| 1 | In a bigger organization, these are different people. |
| 2 | Strategy. Where the organization is actually going. |
| 3 | Fundraising. The funders, the calendar, the asks. |
| 4 | Communications. How all of it sounds. |
| 5 | Operations and finance. Making the week actually run. |
| 6 | The board and the technology. The room, and everything that keeps breaking. |
| 7 | In a small nonprofit that is one person. And the hard part was never the workload. It is that there is nobody to think any of it through with. |

**Slide 7 is the whole point and must not read as a workload complaint.** Every nonprofit
feed already carries the you-wear-many-hats post; BeMo's diagnosis is that the missing
thing is a thinking partner, not more hours. That is why the green mark sits on "nobody"
and deliberately not on "workload".

## Build

```
node planning/week-31-carousel/build.mjs
```

Outputs next to the script: seven portrait PNGs (1080x1350, the LinkedIn document ratio),
seven square PNGs (1080x1080, the Instagram adaptation), and both PDFs. The PDFs are
assembled from the reviewed PNGs so their pages are pixel-identical to the stills.

## What differs from the Week 30 rig

Built on the Week 30 rig at its v3 settings, which Becky signed off. Two deliberate
departures, both because this set is a list of roles rather than a set of questions:

- **No ghost glyphs and no numbering pills.** Week 30 counted its questions; these do not
  need counting, and the plan's build brief says no numbers on any slide. One role per
  card, repeated, is what makes them read as a set.
- **No orange pointer pill on the close.** This carousel's link lives in the first comment,
  so the close carries the wordmark alone.

## Checks run

No em dashes on any slide. No numbers, no product screenshots, no customer names, no
product claim on any slide, which is what makes this the week's non-product slot and one
half of the anchor's ruling 4.

---

*v1, August 22, 2026: first build, from the August 21 rebuilt slide set.*
