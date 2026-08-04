#!/usr/bin/env node
// Pickup for amplify-in-flow: the main take ended with two fields outstanding.
// Supply them from the fact sheet, click any continue affordance, and record
// the drafting stage (the spec's NEEDS-marker beat lives there).
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PACE, sleep } from "../../../capture/lib/pacing.mjs";

const DOC = "https://app.bemointel.ai/amplify/document/doc_OfwZnVUgLekVpJdZ";
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
const PROFILE = path.join(HERE, "..", "..", "..", "capture", ".auth", "profile");

const context = await chromium.launchPersistentContext(PROFILE, {
  headless: true,
  viewport: { width: 1920, height: 1200 },
  recordVideo: { dir: OUT, size: { width: 1920, height: 1200 } },
});
const page = context.pages()[0] || (await context.newPage());
const t0 = Date.now();
const mark = (w) => console.log(((Date.now() - t0) / 1000).toFixed(1) + "s", w);

await page.goto(DOC, { waitUntil: "networkidle" }).catch(() => {});
await sleep(PACE.settle + 2500);
const body0 = await page.locator("body").innerText().catch(() => "");
if (/Sign in to your BeMo account/i.test(body0)) { console.log("SESSION EXPIRED"); await context.close(); process.exit(1); }
mark("doc reopened");

const input = page.locator("textarea, [contenteditable='true']").last();
await input.click();
await sleep(600);
await input.pressSequentially(
  "Dana Merritt, Executive Director, signs it. Worth including: giving has risen three straight months this spring, and the Mobile Pantry has distributed 41,600 meals so far this year.",
  { delay: PACE.typing }
);
await sleep(PACE.beforeSubmit);
await page.keyboard.press("Enter");
mark("sent remaining fields");

async function stable(quiet = 8000, max = 120000) {
  let last = "", since = Date.now(), start = Date.now();
  while (Date.now() - start < max) {
    await sleep(2500);
    const now = await page.locator("body").innerText().catch(() => "");
    if (now !== last) { last = now; since = Date.now(); }
    else if (Date.now() - since > quiet) break;
  }
  return last;
}

await stable();
mark("response settled");

// click through any continue/advance affordance, up to three rounds
for (let round = 0; round < 3; round++) {
  const btn = page.locator("button", { hasText: /Continue to|Continue|Proceed|Next phase/i }).last();
  if (await btn.count()) {
    await sleep(PACE.beat);
    await btn.click().catch(() => {});
    mark("clicked continue affordance (round " + (round + 1) + ")");
    await stable(7000, 90000);
  } else break;
}

// watch stages for the draft, up to 6 minutes
let lastStage = "";
const start = Date.now();
while (Date.now() - start < 360000) {
  await sleep(4000);
  const text = await page.locator("body").innerText().catch(() => "");
  const m = text.match(/(Interviewing|Research|Outlining|Writing|Drafting|Editing|Review)\s*\n?\s*(\d of 5)?/);
  const stage = m ? (m[1] + " " + (m[2] || "")).trim() : "?";
  if (stage !== lastStage) { mark("stage: " + stage); lastStage = stage; }
  if (/Editing|Review/.test(stage)) break;
  const tail = text.slice(-1500);
  if (/Continue to|click the/i.test(tail)) {
    const btn = page.locator("button", { hasText: /Continue/i }).last();
    if (await btn.count()) { await btn.click().catch(() => {}); mark("clicked mid-flow continue"); }
  }
}
await sleep(12000);
mark("holding on result");
for (let i = 0; i < 30; i++) { await page.mouse.wheel(0, 55); await sleep(75); }
await sleep(PACE.tail + 2000);
mark("pickup complete");
await context.close();
const webm = fs.readdirSync(OUT).filter((f) => f.startsWith("page") && f.endsWith(".webm"))
  .map((f) => path.join(OUT, f))
  .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0];
if (webm) fs.renameSync(webm, path.join(OUT, "amplify-pickup-raw.webm"));
console.log("amplify pickup raw saved");
