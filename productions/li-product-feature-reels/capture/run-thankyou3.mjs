// Continues the clean thank-you document: signer, then the optional questions,
// then the letter generating.
//
//   DOC=doc_KRvSB9HRtVcD9wVp node productions/li-product-feature-reels/capture/run-thankyou3.mjs

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out", "thankyou2");
fs.mkdirSync(OUT, { recursive: true });
const DOC = process.env.DOC || "doc_KRvSB9HRtVcD9wVp";

const t0 = Date.now();
const mark = (what) => console.log(`[${((Date.now() - t0) / 1000).toFixed(2).padStart(7)}s] ${what}`);

const context = await chromium.launchPersistentContext(
  "/Users/rebeccakern/Repositories/bemo-studios/capture/.auth/profile",
  {
    headless: true,
    viewport: { width: 1920, height: 1200 },
    recordVideo: { dir: OUT, size: { width: 1920, height: 1200 } },
  }
);
const page = context.pages()[0] || (await context.newPage());
const text = () => page.evaluate(() => ((document.querySelector("main") || document.body).innerText || ""));
const shot = async (n) => { await page.screenshot({ path: `${OUT}/${n}.png` }); mark(`shot ${n}`); };
const bottom = () => page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

await page.goto(`https://app.bemointel.ai/amplify/document/${DOC}`, { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(5000);
mark("document open");

// the signer field
const signer = page.locator('input[placeholder*="Maria Lopez"]:not([disabled]):visible, input[placeholder*="Executive Director"]:not([disabled]):visible').last();
if (await signer.count()) {
  await signer.click();
  await signer.type("Dana Merritt, Executive Director", { delay: 28 });
  mark("typed signer");
  await page.waitForTimeout(800);
  await page.locator("button:has-text('Submit')").last().click().catch(() => {});
  mark("submitted signer");
}

// the optional questions: this is the beat, so give it time and capture it
for (let i = 0; i < 24; i++) {
  const body = await text();
  if (/optional|especially meaningful|stronger|personal detail|anything else/i.test(body.slice(-1800))) break;
  await page.waitForTimeout(5000);
}
await bottom(); await page.waitForTimeout(2500);
await shot("c11-optional-questions");

// answer whatever personal-detail field it offers, from the fact sheet's world
const extra = page.locator("textarea:not([disabled]):visible").last();
if (await extra.count()) {
  const ph = (await extra.getAttribute("placeholder")) || "";
  if (!/ask anything/i.test(ph)) {
    await extra.click().catch(() => {});
    await extra.type("Deb rode along on a Tuesday Mobile Pantry route the week before she increased her gift.", { delay: 20 });
    mark("typed the personal detail");
    await page.waitForTimeout(800);
    await page.locator("button:has-text('Submit')").last().click().catch(() => {});
    mark("submitted optional detail");
  }
}

// the letter generating
for (let i = 0; i < 30; i++) {
  const body = await text();
  if (/Dear Deb|Dear Ms\.|Drafting|Writing your letter|Thank you for/i.test(body.slice(-2500))) { mark("letter appearing"); break; }
  await page.waitForTimeout(5000);
}
await page.waitForTimeout(8000);
await bottom(); await page.waitForTimeout(2500);
await shot("c12-letter");
await page.waitForTimeout(5000);
await shot("c13-final");
mark("done");
console.log("\ndocument:", page.url());
await context.close();
