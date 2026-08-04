#!/usr/bin/env node
// Dry run of the Grant Progress Report flow on a throwaway document, no
// recording. Purpose: learn what the interview asks so the recorded take can
// answer from the fact sheet without hesitation on camera. Any answers typed
// here are identical to the take's answers and fact-sheet-true, because
// unlocked KB items can be updated during interviews.
import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PACE, sleep } from "../../../capture/lib/pacing.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = "/private/tmp/claude-501/-Users-rebeccakern-Repositories-bemo-studios/aef02867-fc9a-4cb4-90fc-6f326a43c532/scratchpad";
const PROFILE = path.join(HERE, "..", "..", "..", "capture", ".auth", "profile");

const context = await chromium.launchPersistentContext(PROFILE, {
  headless: true,
  viewport: { width: 1920, height: 1200 },
});
const page = context.pages()[0] || (await context.newPage());
const say = (...a) => console.log(((Date.now() - t0) / 1000).toFixed(1) + "s", ...a);
const t0 = Date.now();

async function stableText(sel, { quiet = 8000, max = 120000 } = {}) {
  let last = "", since = Date.now(), start = Date.now();
  while (Date.now() - start < max) {
    await sleep(2500);
    const now = await page.locator(sel).innerText().catch(() => "");
    if (now !== last) { last = now; since = Date.now(); }
    else if (Date.now() - since > quiet) break;
  }
  return last;
}

await page.goto("https://app.bemointel.ai/funderstorm/templates", { waitUntil: "networkidle" }).catch(() => {});
await sleep(3000);
await page.screenshot({ path: `${OUT}/dry-templates.png` });
say("templates page");

await page.locator("text=Grant Progress Report").first().click({ timeout: 10000 });
await sleep(2500);
await page.screenshot({ path: `${OUT}/dry-template-detail.png` });
say("template detail:", page.url());

// find the create button
const create = page.locator("button", { hasText: /New Grant Progress Report|Use template|Create|Start/i }).first();
if (await create.count()) {
  say("create button:", await create.innerText());
  await create.click();
} else {
  say("no create button found; page text follows");
  console.log((await page.locator("body").innerText()).slice(0, 1500));
  await context.close();
  process.exit(1);
}
await sleep(5000);
say("doc url:", page.url());
await page.screenshot({ path: `${OUT}/dry-step1.png` });

// step 1: KB inputs
const step1 = await stableText("main, body");
console.log("--- step1 text ---\n" + step1.slice(0, 1200));
const submit = page.locator("button:has-text('Submit')").first();
if (await submit.count()) { await submit.click(); say("submitted KB inputs"); }
await sleep(6000);
await page.screenshot({ path: `${OUT}/dry-step2.png` });

// after submit: dump whatever the next step asks, answer nothing yet
const step2 = await stableText("main, body", { quiet: 7000 });
console.log("--- step2 text ---\n" + step2.slice(0, 2500));
await page.screenshot({ path: `${OUT}/dry-step2-final.png` });
console.log("DOC_URL=" + page.url());
await context.close();
