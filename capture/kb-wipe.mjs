#!/usr/bin/env node
// Full Knowledge Base reset: moves every KB item to trash, one row at a time.
// Used when switching the app between demo orgs (demo-org/README.md); the KB
// holds one org at a time, so the outgoing org's items all go before the next
// load. Same row/kebab/trash pattern as kb-cleanup.mjs, which is the proven one.
//
//   node capture/kb-wipe.mjs            wipe, with before/after screenshots
import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const context = await chromium.launchPersistentContext(path.join(HERE, ".auth", "profile"), {
  headless: true,
  viewport: { width: 1440, height: 900 },
});
const page = context.pages()[0] || (await context.newPage());
await page.goto("https://app.bemointel.ai/funderstorm/kb", { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(3000);
await page.screenshot({ path: "/tmp/kb-before-wipe.png" });

const dataRows = () => page.locator("tbody tr:has(button)");
let count = await dataRows().count();
console.log("rows at start:", count);

let removed = 0;
for (let i = 0; i < 120 && count > 0; i++) {
  const row = dataRows().first();
  const name = (await row.textContent().catch(() => "?"))?.trim().slice(0, 60);
  await row.locator("button").last().click();
  await page.waitForTimeout(700);
  const trash = page.locator("text=Move to trash");
  if (!(await trash.count())) {
    console.log("no trash option for row:", name, "- stopping for a look");
    await page.screenshot({ path: "/tmp/kb-wipe-stuck.png" });
    break;
  }
  await trash.click();
  await page.waitForTimeout(1200);
  // clear any confirm dialog, whatever its verb
  const confirm = page.locator("button:has-text('Move to trash'), button:has-text('Confirm'), button:has-text('Delete')").last();
  if (await confirm.count()) { await confirm.click().catch(() => {}); await page.waitForTimeout(800); }
  removed++;
  console.log("trashed:", name);
  // re-sync with the table every few rows in case the list rerenders
  if (removed % 10 === 0) {
    await page.goto("https://app.bemointel.ai/funderstorm/kb", { waitUntil: "networkidle" }).catch(() => {});
    await page.waitForTimeout(2000);
  }
  count = await dataRows().count();
}

console.log("rows remaining:", count, "| removed:", removed);
await page.screenshot({ path: "/tmp/kb-after-wipe.png" });
await context.close();
