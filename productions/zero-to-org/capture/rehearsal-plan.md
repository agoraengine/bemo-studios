# Zero to Org: timed rehearsal protocol

**Purpose:** Answer the brief's first open question: how long does a cold Common Table knowledge-base load actually run, end to end, on the live app? The result sets the take's length target. This is a feasibility probe, not production capture; no footage from this run ships.

**Scheduled:** weekend of August 15-16, 2026 (Becky, Aug 13). Deliberately after launch day so the run does not consume AI usage while launch traffic lands.

## Method

Cottage 2, by the book: probe first with small throwaway scripts (screenshot each step), then one deterministic timed run. Harness and saved session in `capture/` at the repo root; Common Table fixture documents and fact sheet in `demo-org/common-table/` (the fact sheet is the source of truth; the site wins for Common Table facts).

## The timed path

Clock every stage boundary into `actions.json`:

1. Start from logged-in, empty starting state.
2. Create or reset the clean workspace for the run. **Probe question: can a fresh organization be created through the front door?** If it cannot, record that as the finding; that is the one thing that would need Lee, and it changes the take's opening beat.
3. Seed the Knowledge Base: upload the Common Table document set.
4. Extraction review and commit, as a user would actually do it.
5. First sourced answer: ask one real question and clock time-to-answer-with-sources.
6. The gaps view: what the Knowledge Base says is missing. This is the take's honest closing beat; confirm it renders on a fresh org.

## Output

- `rehearsal-report.md` in the production folder: total wall-clock, per-stage table, the honest "one take" runtime estimate, and a recommendation for the length target (keep 2 to 3 minutes, or change the target, never the honesty).
- Product findings (anything broken, slow, or awkward on a fresh org) go to `findings.md`; they are launch-week-relevant even if the video changes.
- Raw probe screenshots and any test recording stay in `capture/out/`, never in git.

## Constraints

- One run. Do not loop or retry the full load; a failed run gets diagnosed, not repeated blindly.
- Live production app on Becky's session: touch nothing outside the rehearsal workspace, and leave the workspace clearly named as a test (per the fixture naming rules) so it cannot read as a real customer.
- Session profile stays on this machine. No media in git. Method never described in anything external.
