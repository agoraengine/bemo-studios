// Continues an in-progress donor email document through the required fields,
// so the editor reaches the enrichment step where it volunteers a suggested
// donation amount. That volunteered detail is beat two of the Amplify reel.
//
//   DOC=doc_xxx node productions/li-product-feature-reels/capture/run-continue.mjs

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
fs.mkdirSync(OUT, { recursive: true });
const DOC = process.env.DOC || "doc_xagRGCuNm4IDZXhB";

const t0 = Date.now();
const actions = [];
const mark = (what) => {
  const t = +((Date.now() - t0) / 1000).toFixed(2);
  actions.push({ t, what });
  console.log(`[${t.toString().padStart(7)}s] ${what}`);
};

// Common Table's executive director, per the demo org record.
const SENDER = "Dana Merritt, Executive Director";
const KEY_MESSAGE =
  "Your monthly giving is why the van goes out three times a week. A fourth route is ready and waiting on one thing: a driver.";

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
    if (re.test(await text())) {
      mark(`saw: ${label}`);
      return true;
    }
    await page.waitForTimeout(gap);
  }
  mark(`TIMEOUT: ${label}`);
  return false;
}

await page.goto(`https://app.bemointel.ai/amplify/document/${DOC}`, { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(6000);
mark("document open");

// clear anything parked in the chat composer from an earlier pass
const composer = page.locator("textarea").last();
if (await composer.count()) {
  await composer.click().catch(() => {});
  await page.keyboard.press("Meta+A").catch(() => {});
  await page.keyboard.press("Backspace").catch(() => {});
  mark("composer cleared");
}

// --- the three required fields, filled at human speed
const sender = page.locator('input[placeholder*="Executive Director"]:not([disabled]), input[placeholder*="Maria"]:not([disabled])').last();
if (await sender.count()) {
  await sender.click();
  await sender.type(SENDER, { delay: 32 });
  mark("typed sender");
  await page.waitForTimeout(900);
}

const keyMsg = page.locator('textarea[placeholder*="ongoing support"]:not([disabled]), textarea[placeholder*="winter"]:not([disabled])').last();
if (await keyMsg.count()) {
  await keyMsg.click();
  await keyMsg.type(KEY_MESSAGE, { delay: 22 });
  mark("typed key message");
  await page.waitForTimeout(900);
}

await page.locator("text=Donate").last().click().catch(() => {});
mark("chose call to action: donate");
await page.waitForTimeout(1600);
await page.screenshot({ path: `${OUT}/c1-required-filled.png` });

const submit = page.locator("button:has-text('Submit')").last();
await submit.click().catch(() => {});
mark("submitted required fields");

// --- beat two: the enrichment step, where it volunteers the donation amount
const found = await waitFor(
  /suggested (donation|gift) amount|matching gift|enrichment|anything you.?d like to include/i,
  "volunteered enrichment details",
  36,
  5000
);
await page.waitForTimeout(3500);
await page.screenshot({ path: `${OUT}/c2-volunteered-amount.png` });
mark(found ? "captured beat two" : "beat two not seen; review c2 shot");

await page.waitForTimeout(4000);
mark("done");
fs.writeFileSync(`${OUT}/actions-continue.json`, JSON.stringify(actions, null, 2));
console.log("\ndocument:", page.url());
await context.close();
