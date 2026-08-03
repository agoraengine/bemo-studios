import { chromium } from "playwright";
const context = await chromium.launchPersistentContext("/Users/rebeccakern/Repositories/bemo-studios/capture/.auth/profile", { headless: true, viewport: { width: 1440, height: 900 } });
const page = context.pages()[0] || (await context.newPage());
await page.goto("https://app.bemointel.ai/funderstorm/kb", { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(2500);
// open the Seed Knowledge Base menu
await page.click("text=Seed Knowledge Base").catch(e => console.log("seed click failed:", e.message));
await page.waitForTimeout(1200);
await page.screenshot({ path: "/tmp/kb-seed-menu.png" });
await page.keyboard.press("Escape");
await page.waitForTimeout(600);
// open the first row's actions kebab
const kebabs = page.locator("table [aria-haspopup], table button");
console.log("row buttons:", await kebabs.count());
await kebabs.last().click().catch(e => console.log("kebab click failed:", e.message));
await page.waitForTimeout(1000);
await page.screenshot({ path: "/tmp/kb-row-menu.png" });
await context.close();
