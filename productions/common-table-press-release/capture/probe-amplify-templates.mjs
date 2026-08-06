import { chromium } from "playwright";
const SHOT = process.env.SHOT_DIR || "/private/tmp/claude-501/-Users-rebeccakern-Repositories-bemo-studios/80be43f1-83d5-4567-9def-5602501b5ce0/scratchpad";
const context = await chromium.launchPersistentContext("/Users/rebeccakern/Repositories/bemo-studios/capture/.auth/profile", { headless: true, viewport: { width: 1440, height: 900 } });
const page = context.pages()[0] || (await context.newPage());
await page.goto("https://app.bemointel.ai/amplify/templates", { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(4000);
console.log("url:", page.url());
await page.screenshot({ path: `${SHOT}/nav-04-amplify-templates.png`, fullPage: true });
const text = await page.evaluate(() => {
  const main = document.querySelector("main") || document.body;
  return main.innerText.slice(0, 6000);
});
console.log("--- amplify templates ---");
console.log(text);
await context.close();
