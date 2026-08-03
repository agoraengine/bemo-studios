import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";
const HERE = path.dirname(fileURLToPath(import.meta.url));
const PROFILE = path.join(HERE, "..", "..", "..", "capture", ".auth", "profile");
const QUESTION = process.argv.slice(2).join(" ") || "What did the board decide in March about the Harvest Supper budget?";
const context = await chromium.launchPersistentContext(PROFILE, { headless: true, viewport: { width: 1920, height: 1080 } });
const page = context.pages()[0] || (await context.newPage());
await page.goto("https://app.bemointel.ai/", { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(4000);
await page.click("text=New chat");
await page.waitForTimeout(2500);
const input = page.locator("textarea, [contenteditable='true'], input[type='text']").last();
await input.click();
await input.fill(QUESTION);
await page.keyboard.press("Enter");
let last = "", stableSince = Date.now();
const t0 = Date.now();
for (let i = 0; i < 40; i++) {
  await page.waitForTimeout(3000);
  const now = await page.evaluate(() => document.body.innerText.length).catch(() => 0);
  if (String(now) !== last) { last = String(now); stableSince = Date.now(); }
  else if (Date.now() - stableSince > 8000) break;
  if ((Date.now() - t0) > 120000) break;
}
const body = await page.locator("body").innerText();
const i = body.indexOf(QUESTION);
console.log(body.slice(Math.max(0, i), i + 2200));
await context.close();
