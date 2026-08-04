import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1000, height: 900 }, deviceScaleFactor: 2.5 });
await page.goto("file:///Users/rebeccakern/Repositories/bemo-studios/capture/frontpage-wr.html");
await page.evaluate(() => document.fonts?.ready);
await page.waitForTimeout(2500);
await page.locator(".paperframe").screenshot({ path: "/Users/rebeccakern/Repositories/bemo-studios/productions/linkedin-sizzle-series/capture/assets/home-wr.png" });
await browser.close();
console.log("captured");
