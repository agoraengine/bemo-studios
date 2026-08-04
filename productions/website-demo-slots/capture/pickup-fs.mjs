#!/usr/bin/env node
// Pickup for the funderstorm-cycle take: the main take ended with one required
// field outstanding (reporting period; see findings, the app did not parse it
// from the first answer). Resume the same document on camera, supply the
// period, and record the flow advancing through drafting to the editor.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PACE, sleep } from "../../../capture/lib/pacing.mjs";

const DOC = "https://app.bemointel.ai/funderstorm/document/doc_Bk6xd82U52sXErbj";
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
const log = [];
const mark = (what) => { const t = (Date.now() - t0) / 1000; log.push({ t: +t.toFixed(2), what }); console.log(t.toFixed(1) + "s", what); };

await page.goto(DOC, { waitUntil: "networkidle" }).catch(() => {});
await sleep(PACE.settle + 2500);
mark("doc reopened");

const input = page.locator("textarea, [contenteditable='true']").last();
await input.click();
await sleep(600);
await input.pressSequentially("The reporting period is July 1, 2025 through June 30, 2026.", { delay: PACE.typing });
mark("typed reporting period");
await sleep(PACE.beforeSubmit);
await page.keyboard.press("Enter");
mark("sent");

// watch stages up to 8 minutes; log every transition
let lastStage = "";
const start = Date.now();
while (Date.now() - start < 480000) {
  await sleep(4000);
  const text = await page.locator("body").innerText().catch(() => "");
  const m = text.match(/(Choose KB inputs|Interviewing|Outlining|Writing|Drafting|Editing|Review)\s*\n?\s*(\d of 5)?/);
  const stage = m ? (m[1] + " " + (m[2] || "")).trim() : "?";
  if (stage !== lastStage) { mark("stage: " + stage); lastStage = stage; }
  if (/Editing|Review/.test(stage)) break;
}

// let the draft render, then scroll it slowly
await sleep(12000);
mark("holding on draft");
for (let i = 0; i < 30; i++) { await page.mouse.wheel(0, 50); await sleep(80); }
await sleep(PACE.tail + 2000);
mark("pickup complete");

fs.writeFileSync(path.join(OUT, "funderstorm-pickup-actions.json"), JSON.stringify(log, null, 2));
await context.close();
const webm = fs.readdirSync(OUT).filter((f) => f.startsWith("page") && f.endsWith(".webm"))
  .map((f) => path.join(OUT, f))
  .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0];
if (webm) fs.renameSync(webm, path.join(OUT, "funderstorm-pickup-raw.webm"));
console.log("pickup raw saved");
