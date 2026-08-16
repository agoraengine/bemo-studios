# Zero to Org: rehearsal report

**Run:** Saturday, August 15, 2026, through the Cottage 2 harness on Becky's session. Product findings from the same probe are in `findings.md` alongside this file.
**Result: stopped at the probe gate, per the plan.** The timed load did not run, and the reason is itself the finding the plan named as the thing to catch.

## The finding

**A fresh organization cannot be created through the front door on this account today.** Becky confirmed the same day that consultant multi-account support and sharing ship at GA, so this is sequencing, not a surprise; the point for this production is only that the film cannot stage its cold start before then without one of the paths below.

Evidence, all read-only:

- Settings contains Profile, Billing and Plans, Usage, Integrations, Support, Preferences, About. No organizations section, no workspace management.
- The onboarding form ("A few details about your organization") writes a single organization profile onto the account. One account, one organization.
- The app chrome (Amplify, checked from the templates shelf) has no organization switcher anywhere: home, chats, search, templates, Knowledge Base, Drive.

The account's one Knowledge Base is the standing Common Table load that the live demos depend on. Wiping it to stage a cold load would touch shared demo infrastructure, which the rehearsal plan forbids. So the run stopped.

## What we still know about timing

The August 3 load is an honest proxy, and its action log survives: **the cold Common Table load, thirteen documents through import, extraction review, and commit, took 279 seconds, about 4 minutes 39 seconds, end to end.** (`productions/common-table-kb-load/capture/out/actions.json`, final entry "done: KB loaded" at t=279.11.)

Consequence for the film: **the 2-to-3-minute one-take target is not achievable uncut at current product speed.** The honest options are a longer take (about five minutes, which suits the YouTube full version), or the visible-elapsed-clock treatment inside a shorter film, which the brief already permits as long as no speed-up is presented as real time.

## What this needs from Lee

One decision and two triage items; everything else here is context.

1. **The decision:** bless the fresh-signup path below (with the timing and the lead-flow marker as you prefer), or provision a test organization instead. Either unblocks the film.
2. **Triage:** the onboarding form intercepts the app root for Becky's established account and its "Skip for now" does not stick. Detail in `findings.md`.
3. **Triage:** saved sessions are expiring within a day even with "Remember me," three re-logins in two days. Also in `findings.md`.

## Paths to the fresh organization the film needs

1. **A fresh signup.** Signups are open since launch, so the true front door exists: a new account arrives with an empty organization. This is also the honest opening for the film itself, since it is exactly a new user's day one. Two things need Becky's say before anyone does it: it creates a real account on production, and during launch week a test signup lands in the live lead flow to Jon, so it needs a marker or a heads-up so it does not pollute the funnel.
2. **Lee provisions a test organization.** The single ask of him this production has, if the signup path is not wanted.

Recommendation: path 1, after launch week settles, with Jon told first. It costs nothing, needs no engineering, and gives the film its truthful first scene.

## For the length target

Hold the brief's target open until the fresh-organization decision lands. Working assumption from the August 3 proxy: **full take about five minutes, feed cutdown 30 seconds with the elapsed clock on screen.**
