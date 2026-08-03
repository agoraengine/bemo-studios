#!/usr/bin/env node
// The centerpiece ask: a new chat against the loaded Wrenfield KB, recorded.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PACE, sleep } from "../../../capture/lib/pacing.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
const PROFILE = path.join(HERE, "..", "..", "..", "capture", ".auth", "profile");
const QUESTION = "Our new board member starts Monday. Catch her up: who are we, what do we run, and what should she read first?";

const t0 = Date.now();
const log = [];
const mark = (w) => { const t = (Date.now() - t0) / 1000; log.push({ t: +t.toFixed(2), what: w }); console.log(t.toFixed(1) + "s", w); };

const context = await chromium.launchPersistentContext(PROFILE, {
  headless: true,
  viewport: { width: 1920, height: 1080 },
  recordVideo: { dir: OUT, size: { width: 1920, height: 1080 } },
});
const page = context.pages()[0] || (await context.newPage());
await page.goto("https://app.bemointel.ai/", { waitUntil: "networkidle" }).catch(() => {});
await sleep(PACE.settle + 1000);
await page.click("text=New chat");
mark("new chat opened");
await sleep(PACE.settle);
const input = page.locator("textarea, [contenteditable='true'], input[type='text']").last();
await input.click();
await sleep(600);
await input.pressSequentially(QUESTION, { delay: PACE.typing });
mark("question typed");
await sleep(PACE.beforeSubmit);
await page.keyboard.press("Enter");
mark("sent");
// wait for the answer to finish streaming: body text stable for 9s, cap 150s
let last = "", stableSince = Date.now();
for (let i = 0; i < 50; i++) {
  await sleep(3000);
  const now = await page.evaluate(() => document.body.innerText.length).catch(() => 0);
  if (String(now) !== last) { last = String(now); stableSince = Date.now(); }
  else if (Date.now() - stableSince > 9000) break;
  if ((Date.now() - t0) > 150000) break;
}
mark("answer stable");
await sleep(PACE.tail + 2000);
await page.screenshot({ path: path.join(OUT, "ask-final.png"), fullPage: false });
fs.writeFileSync(path.join(OUT, "ask-actions.json"), JSON.stringify(log, null, 2));
await context.close();
console.log("Recorded ask. Footage in", OUT);
