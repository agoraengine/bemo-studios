#!/usr/bin/env node
// Recorded ask against the loaded Common Table KB. Question comes from argv
// so one script serves both captures:
//   node ask-run.mjs gala    -> the site's ask-with-sources question
//   node ask-run.mjs board   -> the board-member catch-up (super-demo v2)
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PACE, sleep } from "../../../capture/lib/pacing.mjs";

const QUESTIONS = {
  gala: "What did the board decide about the gala budget?",
  board: "Our new board member starts Monday. Catch her up: who are we, what do we run, and what should she read first?",
  supper: "Where does the Harvest Supper stand this year: date, budget, and what the board signed off on?",
};
const key = process.argv[2] || "gala";
const QUESTION = QUESTIONS[key];
if (!QUESTION) { console.error("unknown question key:", key); process.exit(1); }

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
const PROFILE = path.join(HERE, "..", "..", "..", "capture", ".auth", "profile");

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
await page.screenshot({ path: path.join(OUT, `ask-${key}-final.png`), fullPage: false });
fs.writeFileSync(path.join(OUT, `ask-${key}-actions.json`), JSON.stringify(log, null, 2));
await context.close();
console.log("Recorded ask:", key, "-> footage in", OUT);
