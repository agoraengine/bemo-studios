import { chromium } from "playwright";
const context = await chromium.launchPersistentContext("/Users/rebeccakern/Repositories/bemo-studios/capture/.auth/profile", { headless: true, viewport: { width: 1440, height: 900 } });
const page = context.pages()[0] || (await context.newPage());
await page.goto("https://app.bemointel.ai/funderstorm/kb", { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(2500);
for (const name of ["Organization name", "Website"]) {
  const row = page.locator("tr", { hasText: name });
  if (await row.count() === 0) { console.log(name, ": not found"); continue; }
  await row.locator("button").last().click();
  await page.waitForTimeout(700);
  await page.click("text=Move to trash");
  await page.waitForTimeout(1500);
  console.log(name, ": moved to trash");
}
await page.waitForTimeout(1000);
await page.screenshot({ path: "/tmp/kb-after-cleanup.png" });
await context.close();
