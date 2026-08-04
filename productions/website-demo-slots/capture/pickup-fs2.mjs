#!/usr/bin/env node
// Final leg: confirm "continue" so the flow advances into drafting on camera.
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
const mark = (w) => console.log(((Date.now() - t0) / 1000).toFixed(1) + "s", w);

await page.goto(DOC, { waitUntil: "networkidle" }).catch(() => {});
await sleep(PACE.settle + 2500);
const body = await page.locator("body").innerText().catch(() => "");
if (/Sign in to your BeMo account/i.test(body)) { console.log("SESSION EXPIRED"); await context.close(); process.exit(1); }
mark("doc reopened");

const input = page.locator("textarea, [contenteditable='true']").last();
await input.click();
await sleep(600);
await input.pressSequentially("Yes, continue.", { delay: PACE.typing });
await sleep(PACE.beforeSubmit);
await page.keyboard.press("Enter");
mark("sent continue");

let lastStage = "";
const start = Date.now();
while (Date.now() - start < 420000) {
  await sleep(4000);
  const text = await page.locator("body").innerText().catch(() => "");
  const m = text.match(/(Interviewing|Research|Outlining|Writing|Drafting|Editing|Review)\s*\n?\s*(\d of 5)?/);
  const stage = m ? (m[1] + " " + (m[2] || "")).trim() : "?";
  if (stage !== lastStage) { mark("stage: " + stage); lastStage = stage; }
  if (/Editing|Review|5 of 5/.test(stage)) break;
}
await sleep(15000);
mark("holding on result");
for (let i = 0; i < 30; i++) { await page.mouse.wheel(0, 50); await sleep(80); }
await sleep(PACE.tail + 2000);
mark("leg complete");
await context.close();
const webm = fs.readdirSync(OUT).filter((f) => f.startsWith("page") && f.endsWith(".webm"))
  .map((f) => path.join(OUT, f))
  .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0];
if (webm) fs.renameSync(webm, path.join(OUT, "funderstorm-pickup2-raw.webm"));
console.log("pickup2 raw saved");
