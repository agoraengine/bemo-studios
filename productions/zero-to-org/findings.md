# Findings: zero-to-org

Product findings from the August 15, 2026 rehearsal probe, for Lee. Observed through the front door on Becky's account; nothing here was worked around or forced.

## 1. Accounts are single-organization today; multi-organization and sharing land at GA

No organizations section in settings, no workspace switcher in the app chrome, and onboarding writes one organization profile onto the account. **Confirmed by Becky, August 15: consultant multi-account support and sharing ship at GA**, so this is sequencing, not a gap. Two consequences:

- **For this production:** a cold-start film cannot stage a fresh organization on an existing account before GA. Paths and a recommendation are in `rehearsal-report.md`.
- **For the calendar:** the consultant reel, Your Expertise Stays, sits in the post-GA queue, and it should stay there. Its claim (your work staying with the client across engagements) rests on the sharing model that arrives at GA, so pulling it forward, which the content plan floated as an option for Molly's consultant targeting, would show a promise ahead of the product. Consultant paid targeting before GA, if wanted, should lean on the /partners page copy rather than product behaviour.

## 2. The onboarding form intercepts the app root for an established account

`app.bemointel.ai/` redirects to `/onboarding` ("You've been using BeMo for a while — these answers help sharpen your funder matches"), and "Skip for now" did not dismiss it during the probe: the form re-presented on the next visit to the root. Direct routes into apps (for example the Amplify templates shelf) work normally. A long-standing account being asked introductory questions on every visit to the front door, with a skip that does not stick, reads as a state bug around the new signup capture fields.

## 3. Capture-session lifetime, recurring

The saved browser session expired three times in roughly forty-eight hours (August 14 twice, August 15 once), each with "Remember me" ticked. Beyond the harness inconvenience, real users on the same policy are being logged out daily. Recorded here because this run needed a fresh login too.

## 4. Timing reference for whatever ships

The August 3 cold load of the thirteen-document Common Table set ran 4 minutes 39 seconds end to end through import, extraction review, and commit. If day-one time-to-value is a GA talking point, that is the current number for a small organization's starter set, and it is honest and defensible. It is also slower than the film's original 2-to-3-minute target, which the report adjusts for.
