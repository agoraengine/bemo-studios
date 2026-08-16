import { chromium } from "playwright";

const SHOT = process.env.SHOT_DIR || "/private/tmp/claude-501/-Users-rebeccakern-Repositories-bemo-studios/99bafb8e-f500-451b-aab8-3dba398a2a34/scratchpad/probe";
const context = await chromium.launchPersistentContext(
  "/Users/rebeccakern/Repositories/bemo-studios/capture/.auth/profile",
  { headless: true, viewport: { width: 1920, height: 1200 } }
);
const page = context.pages()[0] || (await context.newPage());
await page.goto("https://app.bemointel.ai/amplify/templates", { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(4000);
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1500);

const cards = await page.evaluate(() => {
  const body = (document.querySelector("main") || document.body).innerText || "";
  return body.split("\n").map((l) => l.trim()).filter(Boolean);
});
console.log(cards.join("\n"));

await page.screenshot({ path: `${SHOT}/templates-full.png`, fullPage: true });
await context.close();
