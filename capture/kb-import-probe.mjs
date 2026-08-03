import { chromium } from "playwright";
const context = await chromium.launchPersistentContext("/Users/rebeccakern/Repositories/bemo-studios/capture/.auth/profile", { headless: true, viewport: { width: 1440, height: 900 } });
const page = context.pages()[0] || (await context.newPage());
await page.goto("https://app.bemointel.ai/funderstorm/kb", { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(2500);
await page.click("text=Seed Knowledge Base");
await page.waitForTimeout(800);
const chooserPromise = page.waitForEvent("filechooser", { timeout: 8000 }).catch(() => null);
await page.click("text=Import file");
const chooser = await chooserPromise;
if (chooser) {
  console.log("file chooser appeared; multiple:", chooser.isMultiple());
  await chooser.setFiles("/Users/rebeccakern/Repositories/bemo-studios/demo-org/upload/01-mission-vision-values.md");
} else {
  console.log("no native chooser; screenshotting whatever opened");
}
await page.waitForTimeout(2500);
await page.screenshot({ path: "/tmp/kb-import-1.png" });
await page.waitForTimeout(6000);
await page.screenshot({ path: "/tmp/kb-import-2.png" });
await context.close();
