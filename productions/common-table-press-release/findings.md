# Findings: Common Table Press Release

Raised 2026-08-06 while seeding the Harvest Supper press release (`doc_OvkWEuIjn0IO3z3h`, finished at Complete 5 of 5, quality score 90/100). Studios raises these; it fixes none of them in the siblings.

## Product findings (for Lee)

| Date | Finding | Raised |
|---|---|---|
| 2026-08-06 | **Amplify has a full template library; FunderStorm's shelf is thin.** Amplify lists roughly 25 templates (Press Release, Media Pitch, Op-Ed, Annual Report, Newsletter, Talking Points, Knowledge Article, and more); FunderStorm's Templates page shows only Grant Progress Report. The Press Release template exists and works end to end. | Open |
| 2026-08-06 | **Press Release Choose-KB-inputs found 5 items** (Organization name, Organization description, Service locations, Press boilerplate, Media contact): better than the Grant Progress Report's 1 and the Donor Email's 0, but still org-level only. The Harvest Supper KB item (loaded 8/3, and the subject of the release) did not surface at the inputs step; every event fact arrived via the interview instead. Fourth data point on narrow template KB keys. | Open |
| 2026-08-06 | **KB fact mis-mapped: the tagline arrived as the org description.** Collected Facts showed Organization Description = "A seat for every neighbor." (the tagline/vision), not the actual description. Harmless here because the boilerplate carried the real description, but a template that leaned on that field would misdescribe the org. | Open |
| 2026-08-06 | **Two manual-advance walls confirmed again**: "Continue to Research" after the interview locks, and "Continue to Editing" after the Drive scan. Same class as the GPR manual-click finding (2026-08-03), now on a second template. | Open (repeat) |
| 2026-08-06 | **The Research stage found nothing to research**: it browsed Drive, listed only the five untitled in-flight documents, attached 0, and said so honestly. With an empty Drive the stage is a pass-through click. | Open |
| 2026-08-06 | **The draft leaves honest [NEEDS:] markers instead of inventing**: [NEEDS: ticket purchase URL], [NEEDS: phone number], [NEEDS: email address]. This is the appeal-letter behavior the `amplify-in-flow` spec assumed, present in the Press Release template (the Donor Email template asks up front instead; behaviors differ per template). Strong capture beat: "it tells you what it doesn't know" inside a document. | Open |
| 2026-08-06 | **The chat assistant cannot rename the document** ("I'm not able to change the document title from here"); the title is a separate header input that only reveals itself on double-click. Also means every abandoned doc stays "Untitled Document" on Home unless a human finds that input, which is where the Untitled clutter comes from. | Open |
| 2026-08-06 | **The model drafts em dashes** (body prose and quote attributions), removable by instruction, and the quality-score panel's own critique copy uses them too. Same class as the chat em dash finding (2026-08-03), now in two more surfaces. | Open (repeat) |
| 2026-08-06 | **The quality score rubric assumes standard press conventions**: it scored 4/5 on factual accuracy and AP style specifically because the media contact has no phone/email, which was the org's deliberate choice. No way to tell the rubric "we do name-and-title only." Score was 90/100 overall with a six-dimension breakdown; the feature is real and demo-worthy. | Open |
| 2026-08-06 | **Interview form fields are flaky to automate but the chat path works.** The structured form (radio + text fields) mounts ~8s after page load and re-renders in and out of the DOM; Playwright form-fills timed out. Typing the same answers into the chat box committed all fields correctly ("Let me now commit the fields you just provided"). Capture scripts should drive interviews through chat, as the website-demo-slots runs did. | Open |

## Capture notes (for this production's shot list, when the brief ratifies)

- **KB-aware placeholders**: the interview form's example text is derived from the org's KB ("e.g. Common Table Food Pantry Hosts Annual Harvest Supper October 17" as the headline placeholder). The product knows the org before you type. Strong "sounds like you" beat.
- The Collected Facts panel counting up (8 from the KB at open, 14 by draft time) is the "it already knew" moment made visible.
- The [NEEDS:] markers and the quality score are the two most demo-worthy beats after the KB facts arriving.
- The shipping take starts a FRESH document (standing rule); this seeded doc is set dressing, not the take.

## Demo-org notes (this repo)

| Date | Note | Status |
|---|---|---|
| 2026-08-06 | Quote prose for Dana Merritt and Deb Fontaine invented for the release (recorded in `press-release-source.md`); no new proper nouns or numbers. The finished in-app document matches the acceptance sheet's trace table exactly; zero em dashes. | Done |
| 2026-08-06 | The finished release is a candidate for `demo-org/common-table/upload/` so the KB can cite it (open question in the brief, Becky to decide). | Open |
