#!/usr/bin/env node
// Swap the live KB world: trash all current items, then load the Common Table
// demo org (demo-org/common-table/upload). Recorded; action log alongside.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PACE, sleep } from "../../../capture/lib/pacing.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
const REPO = path.join(HERE, "..", "..", "..");
const UPLOADS = path.join(REPO, "demo-org", "common-table", "upload");
const PROFILE = path.join(REPO, "capture", ".auth", "profile");

const t0 = Date.now();
const log = [];
const mark = (w) => { const t = (Date.now() - t0) / 1000; log.push({ t: +t.toFixed(2), what: w }); console.log(t.toFixed(1) + "s", w); };

const context = await chromium.launchPersistentContext(PROFILE, {
  headless: true,
  viewport: { width: 1920, height: 1080 },
  recordVideo: { dir: OUT, size: { width: 1920, height: 1080 } },
});
const page = context.pages()[0] || (await context.newPage());

async function clearOverlays() {
  for (let i = 0; i < 10; i++) {
    const backdrop = page.locator(".cdk-overlay-backdrop");
    if (!(await backdrop.count())) return;
    const close = page.locator("button:has-text('Close'), button:has-text('Done')").last();
    if (await close.count()) { await close.click().catch(() => {}); }
    else { await page.keyboard.press("Escape").catch(() => {}); }
    await sleep(900);
  }
}

await page.goto("https://app.bemointel.ai/funderstorm/kb", { waitUntil: "networkidle" }).catch(() => {});
await sleep(3000);

// trash everything currently in the KB
for (let i = 0; i < 80; i++) {
  const rows = page.locator("table tr").filter({ has: page.locator("button") });
  if (!(await rows.count())) break;
  const row = rows.first();
  const name = (await row.innerText().catch(() => "?")).split("\n")[0];
  await row.locator("button").last().click().catch(() => {});
  await sleep(500);
  const trash = page.locator("text=Move to trash");
  if (!(await trash.count())) { await page.keyboard.press("Escape"); break; }
  await trash.click();
  await sleep(900);
  mark("trashed: " + name);
}
mark("kb cleared");
await sleep(PACE.beat);

// load Common Table
const files = fs.readdirSync(UPLOADS).filter((f) => f.endsWith(".md")).sort();
for (const f of files) {
  await clearOverlays();
  mark("import start: " + f);
  await page.click("text=Seed Knowledge Base");
  await sleep(900);
  await page.click("text=Import file");
  await sleep(1200);
  const chooserPromise = page.waitForEvent("filechooser", { timeout: 10000 });
  await page.click("text=browse");
  const chooser = await chooserPromise;
  await chooser.setFiles(path.join(UPLOADS, f));
  await sleep(PACE.beforeSubmit);
  await page.click("button:has-text('Upload')");
  await page.waitForSelector("text=/facts found/", { timeout: 120000 });
  await sleep(PACE.beat);
  const approveAll = page.locator("text=Approve all high-confidence");
  if (await approveAll.count()) { await approveAll.click(); await sleep(PACE.beat); }
  for (let i = 0; i < 40; i++) {
    const commit = page.locator("button:has-text('Commit')");
    if (await commit.count() && await commit.isEnabled()) break;
    const accept = page.locator("button:has-text('Accept')").first();
    if (!(await accept.count())) break;
    await accept.click();
    await sleep(450);
  }
  await page.locator("button:has-text('Commit')").click();
  mark("committed: " + f);
  await sleep(PACE.beat + 1000);
  await clearOverlays();
  await page.waitForSelector(".cdk-overlay-backdrop", { state: "detached", timeout: 30000 }).catch(() => {});
  await sleep(PACE.beat);
}
await sleep(PACE.tail);
mark("done: Common Table loaded");
await page.screenshot({ path: path.join(OUT, "kb-common-table.png") });
fs.writeFileSync(path.join(OUT, "swap-actions.json"), JSON.stringify(log, null, 2));
await context.close();
console.log("Swap complete.");
