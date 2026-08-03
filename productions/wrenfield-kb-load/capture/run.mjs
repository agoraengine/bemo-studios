#!/usr/bin/env node
// Recorded load of the Wrenfield demo org into the live BeMo Knowledge Base.
// Drives the real app with the saved session, imports demo-org/upload/01-13,
// approves extracted facts, commits each, and records the whole thing.
// Output: capture/out/ (gitignored). Action log: capture/out/actions.json.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PACE, sleep } from "../../../capture/lib/pacing.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
const REPO = path.join(HERE, "..", "..", "..");
const UPLOADS = path.join(REPO, "demo-org", "upload");
const PROFILE = path.join(REPO, "capture", ".auth", "profile");

fs.mkdirSync(OUT, { recursive: true });
const t0 = Date.now();
const log = [];
const mark = (what) => { const t = (Date.now() - t0) / 1000; log.push({ t: +t.toFixed(2), what }); console.log(t.toFixed(1) + "s", what); };

const context = await chromium.launchPersistentContext(PROFILE, {
  headless: true,
  viewport: { width: 1920, height: 1080 },
  recordVideo: { dir: OUT, size: { width: 1920, height: 1080 } },
});
const page = context.pages()[0] || (await context.newPage());
await page.goto("https://app.bemointel.ai/funderstorm/kb", { waitUntil: "networkidle" }).catch(() => {});
await sleep(PACE.settle + 1500);
mark("kb empty state");

const skip = Number(process.argv[process.argv.indexOf("--skip") + 1] || 0);
const files = fs.readdirSync(UPLOADS).filter((f) => f.endsWith(".md")).sort().slice(skip);

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
  mark("uploading: " + f);
  // wait for the review panel (extraction takes 10-30s)
  await page.waitForSelector("text=/facts found/", { timeout: 120000 });
  await sleep(PACE.beat);
  mark("facts found: " + f);
  const approveAll = page.locator("text=Approve all high-confidence");
  if (await approveAll.count()) { await approveAll.click(); await sleep(PACE.beat); mark("approved high-confidence"); }
  // accept whatever remains until Commit enables
  for (let i = 0; i < 40; i++) {
    const commit = page.locator("button:has-text('Commit')");
    if (await commit.count() && await commit.isEnabled()) break;
    const accept = page.locator("button:has-text('Accept')").first();
    if (!(await accept.count())) break;
    await accept.click();
    await sleep(450);
  }
  const commit = page.locator("button:has-text('Commit')");
  await commit.click();
  mark("committed: " + f);
  await sleep(PACE.beat + 1000);
  await clearOverlays();
  await page.waitForSelector(".cdk-overlay-backdrop", { state: "detached", timeout: 30000 }).catch(() => {});
  await sleep(PACE.beat);
}
await sleep(PACE.tail + 2000);
mark("done: KB loaded");
await page.screenshot({ path: path.join(OUT, "kb-final.png") });
fs.writeFileSync(path.join(OUT, "actions.json"), JSON.stringify(log, null, 2));
await context.close();
console.log("Recorded. Footage in", OUT);
