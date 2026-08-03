import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 2400 }, deviceScaleFactor: 2 });
await page.goto("file:///Users/rebeccakern/Repositories/bemo-os/docs/initiatives/website/mockups/ga-reference-build.html");
await page.evaluate(() => document.fonts?.ready);
await page.waitForTimeout(2500);
// find the front-page mock component
const fp = page.locator(".fp-masthead").first();
if (await fp.count()) {
  const container = page.locator("[class*='front-page'], .fp-card, .fp-wrap").first();
  const target = (await container.count()) ? container : fp.locator("xpath=ancestor::div[2]");
  await target.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await target.screenshot({ path: "/tmp/refbuild-frontpage.png" });
  console.log("front page captured");
} else { console.log("no fp-masthead found"); }
await browser.close();
