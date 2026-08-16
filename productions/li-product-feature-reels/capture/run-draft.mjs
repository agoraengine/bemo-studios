// Advances the appeal document to the drafted letter and records it appearing.
// The missing payoff beat: the work existing.
//
//   DOC=doc_xagRGCuNm4IDZXhB node productions/li-product-feature-reels/capture/run-draft.mjs

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out", "draft");
fs.mkdirSync(OUT, { recursive: true });
const DOC = process.env.DOC || "doc_xagRGCuNm4IDZXhB";

const t0 = Date.now();
const mark = (w) => console.log(`[${((Date.now() - t0) / 1000).toFixed(2).padStart(7)}s] ${w}`);

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

await page.goto(`https://app.bemointel.ai/amplify/document/${DOC}`, { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(6000);
mark("document open");

// advance through the phase gates to the draft
for (let hop = 0; hop < 4; hop++) {
  const btn = page.locator("button:has-text('Continue'), button:has-text('Draft'), button:has-text('Write'), button:has-text('Skip')").last();
  if (await btn.count()) {
    const label = (await btn.innerText().catch(() => "")) || "button";
    await btn.click().catch(() => {});
    mark(`clicked: ${label.trim()}`);
    await page.waitForTimeout(15000);
  } else break;
  const b = await text();
  if (/Dear Deb|Dear friend|Subject:|Dear neighbor/i.test(b.slice(-4000))) break;
}

// wait for the letter, then scroll through it slowly on camera
for (let i = 0; i < 40; i++) {
  const b = await text();
  if (/Dear Deb|Dear friend|Subject:|Dear neighbor/i.test(b.slice(-4000))) { mark("letter appearing"); break; }
  await page.waitForTimeout(5000);
}
await page.waitForTimeout(6000);
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(2000);
await page.screenshot({ path: `${OUT}/d1-letter.png` });

// slow scroll up through the letter, then back down: usable motion either direction
await page.evaluate(async () => {
  const total = 900;
  for (let y = 0; y < total; y += 6) { window.scrollBy(0, -6); await new Promise(r => setTimeout(r, 24)); }
});
await page.waitForTimeout(1500);
await page.evaluate(async () => {
  const total = 900;
  for (let y = 0; y < total; y += 6) { window.scrollBy(0, 6); await new Promise(r => setTimeout(r, 24)); }
});
await page.waitForTimeout(3000);
await page.screenshot({ path: `${OUT}/d2-final.png` });
mark("done");
console.log("document:", page.url());
await context.close();
