// Fills the appeal document's enrichment questions on video, for the
// "Nobody asked it for this" beat: the viewer watches the answers arrive.
//
//   DOC=doc_xagRGCuNm4IDZXhB node productions/li-product-feature-reels/capture/run-fill-enrichment.mjs

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out", "enrichfill");
fs.mkdirSync(OUT, { recursive: true });
const DOC = process.env.DOC || "doc_xagRGCuNm4IDZXhB";

const t0 = Date.now();
const mark = (w) => console.log(`[${((Date.now() - t0) / 1000).toFixed(2).padStart(7)}s] ${w}`);

// Grounded in the fact sheet. The amount is an ask, not an outcome claim.
const AMOUNT = "$25 a month, or $250 one-time";
const OUTCOME = "In FY2025 the Mobile Pantry delivered 82,400 meals to 340 families across three weekly sites.";

const context = await chromium.launchPersistentContext(
  "/Users/rebeccakern/Repositories/bemo-studios/capture/.auth/profile",
  {
    headless: true,
    viewport: { width: 1920, height: 1200 },
    recordVideo: { dir: OUT, size: { width: 1920, height: 1200 } },
  }
);
const page = context.pages()[0] || (await context.newPage());
await page.goto(`https://app.bemointel.ai/amplify/document/${DOC}`, { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(6000);
mark("document open");
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(2500);
await page.screenshot({ path: `${OUT}/e1-before.png` });

async function fill(phRe, value, label) {
  const el = page.locator(`textarea:not([disabled]):visible, input:not([disabled]):visible`).filter({ hasNot: page.locator("nothing") });
  const n = await el.count();
  for (let i = 0; i < n; i++) {
    const ph = (await el.nth(i).getAttribute("placeholder")) || "";
    if (/ask anything/i.test(ph)) continue;
    if (phRe.test(ph)) {
      await el.nth(i).scrollIntoViewIfNeeded().catch(() => {});
      await page.waitForTimeout(700);
      await el.nth(i).click().catch(() => {});
      await el.nth(i).type(value, { delay: 34 }); // slow enough to read
      mark(`typed: ${label}`);
      await page.waitForTimeout(900);
      return true;
    }
  }
  mark(`field not found: ${label}`);
  return false;
}

await fill(/\$50\/month|\$250 one-time|donation amount/i, AMOUNT, "suggested amount");
await fill(/1,400 families|program outcome|20% jump/i, OUTCOME, "program outcome");
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/e2-filled.png` });

const submit = page.locator("button:has-text('Submit')").last();
if (await submit.count()) { await submit.click().catch(() => {}); mark("submitted enrichment"); }
await page.waitForTimeout(8000);
await page.screenshot({ path: `${OUT}/e3-after.png` });
mark("done");
console.log("document:", page.url());
await context.close();
