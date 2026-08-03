import { chromium } from "playwright";
const context = await chromium.launchPersistentContext("/Users/rebeccakern/Repositories/bemo-studios/capture/.auth/profile", { headless: true, viewport: { width: 1440, height: 900 } });
const page = context.pages()[0] || (await context.newPage());
await page.goto("https://app.bemointel.ai/funderstorm/kb", { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(2500);
await page.click("text=Seed Knowledge Base");
await page.waitForTimeout(800);
await page.click("text=Import file");
await page.waitForTimeout(1200);
const chooserPromise = page.waitForEvent("filechooser", { timeout: 8000 }).catch(() => null);
await page.click("text=browse");
const chooser = await chooserPromise;
if (!chooser) { console.log("no chooser on browse either"); process.exit(1); }
await chooser.setFiles("/Users/rebeccakern/Repositories/bemo-studios/demo-org/wrenfield/upload/01-mission-vision-values.md");
await page.waitForTimeout(1200);
await page.screenshot({ path: "/tmp/kb-probe2-selected.png" });
await page.click("button:has-text('Upload')");
console.log("uploading...");
for (let i = 1; i <= 6; i++) {
  await page.waitForTimeout(5000);
  await page.screenshot({ path: `/tmp/kb-probe2-t${i * 5}.png` });
}
await context.close();
