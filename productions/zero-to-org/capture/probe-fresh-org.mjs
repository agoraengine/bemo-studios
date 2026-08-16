// Rehearsal probe, step one: can a fresh organization be created through the
// front door? Looks at the account menu, the apps grid, and settings. Read-only:
// screenshots and menu text, no clicks on anything destructive or creative.

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out", "probe");
fs.mkdirSync(OUT, { recursive: true });

const context = await chromium.launchPersistentContext(
  "/Users/rebeccakern/Repositories/bemo-studios/capture/.auth/profile",
  { headless: true, viewport: { width: 1920, height: 1200 } }
);
const page = context.pages()[0] || (await context.newPage());

async function look(tag) {
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `${OUT}/${tag}.png` });
  const text = await page.evaluate(() => (document.body.innerText || "").slice(0, 1800));
  console.log(`\n=== ${tag} :: ${page.url()}\n${text}`);
}

await page.goto("https://app.bemointel.ai/amplify/templates", { waitUntil: "networkidle" }).catch(() => {});
await look("p1-landing");
const skip = page.locator("text=Skip for now").first();
if (await skip.count()) { await skip.click().catch(() => {}); await look("p1b-after-skip"); }

// the account menu
const acct = page.locator("text=account_circle").last();
if (await acct.count()) {
  await acct.click().catch(() => {});
  await look("p2-account-menu");
  await page.keyboard.press("Escape").catch(() => {});
}

// the apps grid
const apps = page.locator("text=apps").first();
if (await apps.count()) {
  await apps.click().catch(() => {});
  await look("p3-apps-menu");
  await page.keyboard.press("Escape").catch(() => {});
}

// settings, read-only
await page.goto("https://app.bemointel.ai/settings", { waitUntil: "networkidle" }).catch(() => {});
await look("p4-settings");

await context.close();
console.log("\nprobe complete");
