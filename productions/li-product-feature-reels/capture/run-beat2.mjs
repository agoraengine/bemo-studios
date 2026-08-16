// Catches beat two on its own: the editor volunteering enrichment details it
// was never asked for, including a suggested donation amount.
//
//   DOC=doc_xxx node productions/li-product-feature-reels/capture/run-beat2.mjs

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
fs.mkdirSync(OUT, { recursive: true });
const DOC = process.env.DOC || "doc_xagRGCuNm4IDZXhB";

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
await page.waitForTimeout(5000);

// only the new question carries these phrases
const TARGET = /suggested donation amount|matching gift|recent program outcome|brief story about someone/i;

for (let i = 0; i < 40; i++) {
  const body = await page.evaluate(() => ((document.querySelector("main") || document.body).innerText || ""));
  if (TARGET.test(body)) {
    console.log(`beat two visible on poll ${i}`);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `${OUT}/beat2.png` });
    const m = body.match(/[^.]*(?:suggested donation amount|matching gift)[^.]*\./gi);
    console.log("\n--- the volunteered line ---\n", (m || []).join("\n"));
    await page.waitForTimeout(4000);
    break;
  }
  if (i % 4 === 0) console.log(`poll ${i}: waiting…`);
  await page.waitForTimeout(5000);
}

await page.screenshot({ path: `${OUT}/beat2-final.png` });
await context.close();
console.log("done");
