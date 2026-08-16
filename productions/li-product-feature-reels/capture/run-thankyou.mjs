// Donor Thank You Letter: reel 1 of the Amplify template slate.
//
//   node productions/li-product-feature-reels/capture/run-thankyou.mjs
//
// Records the flow and logs every step, so a stall can be resumed with the
// document id rather than starting over and spending app time twice.

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out", "thankyou");
fs.mkdirSync(OUT, { recursive: true });

const t0 = Date.now();
const actions = [];
const mark = (what) => {
  const t = +((Date.now() - t0) / 1000).toFixed(2);
  actions.push({ t, what });
  console.log(`[${t.toString().padStart(7)}s] ${what}`);
};

const context = await chromium.launchPersistentContext(
  "/Users/rebeccakern/Repositories/bemo-studios/capture/.auth/profile",
  {
    headless: true,
    viewport: { width: 1920, height: 1200 },
    recordVideo: { dir: OUT, size: { width: 1920, height: 1200 } },
  }
);
const page = context.pages()[0] || (await context.newPage());
const text = () =>
  page.evaluate(() => ((document.querySelector("main") || document.body).innerText || ""));

async function waitFor(re, label, tries = 30, gap = 5000) {
  for (let i = 0; i < tries; i++) {
    if (re.test(await text())) { mark(`saw: ${label}`); return true; }
    await page.waitForTimeout(gap);
  }
  mark(`TIMEOUT: ${label}`);
  return false;
}
const shot = async (n) => { await page.screenshot({ path: `${OUT}/${n}.png` }); mark(`shot ${n}`); };
async function submit(label) {
  const b = page.locator("button:has-text('Submit')").last();
  if (await b.count()) { await b.click().catch(() => {}); mark(`submit: ${label}`); }
  else mark(`no submit at: ${label}`);
}

await page.goto("https://app.bemointel.ai/amplify/templates", { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(3500);
mark("templates shelf");
await page.click("text=New Donor Thank You Letter", { timeout: 15000 });
await page.waitForTimeout(6000);
mark(`editor open: ${page.url()}`);
await shot("t1-editor");

// step 1: whatever it found in the knowledge base on its own
await waitFor(/knowledge base|KB inputs/i, "kb inputs");
await page.waitForTimeout(2500);
await shot("t2-kb-inputs");
await submit("kb inputs");

// step 2: the first interview round. Fill whatever it asks, at human speed.
await page.waitForTimeout(20000);
await shot("t3-first-questions");

const GIFT = "A recurring monthly donor increased her June gift to support the Mobile Pantry. She has given monthly since 2023 and this is her largest single gift so far.";

for (let round = 1; round <= 3; round++) {
  // radio-style choices first
  for (const choice of ["Recurring donors", "Recurring Donors", "Thank you", "Donate"]) {
    const c = page.locator(`text=${choice}`).last();
    if (await c.count()) { await c.click().catch(() => {}); mark(`chose: ${choice}`); await page.waitForTimeout(600); break; }
  }
  // then any open field that is actually enabled
  const inputs = page.locator("input:not([disabled]):visible, textarea:not([disabled]):visible");
  const n = await inputs.count();
  let typed = 0;
  for (let i = 0; i < n && typed < 3; i++) {
    const el = inputs.nth(i);
    const ph = (await el.getAttribute("placeholder")) || "";
    if (/ask anything/i.test(ph)) continue;           // that is the chat composer
    if (/Executive Director|Maria/i.test(ph)) { await el.click().catch(()=>{}); await el.type("Dana Merritt, Executive Director", { delay: 30 }); typed++; mark("typed sender"); continue; }
    if (ph) { await el.click().catch(()=>{}); await el.type(GIFT, { delay: 16 }); typed++; mark(`typed into: ${ph.slice(0, 40)}`); }
  }
  await page.waitForTimeout(900);
  await shot(`t4-round${round}-filled`);
  await submit(`round ${round}`);
  await page.waitForTimeout(22000);
  await shot(`t5-round${round}-after`);
  const body = await text();
  if (/optional|enrichment|much stronger|would you like/i.test(body)) { mark("reached the volunteered-detail step"); break; }
}

await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(3000);
await shot("t6-final");
mark("done");

fs.writeFileSync(`${OUT}/actions.json`, JSON.stringify(actions, null, 2));
console.log("\ndocument:", page.url());
await context.close();
