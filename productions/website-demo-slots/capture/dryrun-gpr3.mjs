#!/usr/bin/env node
// Final dry-run leg: budget answer, then watch the flow advance through
// drafting so the recorded take knows the stage timings.
import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sleep } from "../../../capture/lib/pacing.mjs";

const DOC = process.argv[2];
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = "/private/tmp/claude-501/-Users-rebeccakern-Repositories-bemo-studios/aef02867-fc9a-4cb4-90fc-6f326a43c532/scratchpad";
const PROFILE = path.join(HERE, "..", "..", "..", "capture", ".auth", "profile");

const context = await chromium.launchPersistentContext(PROFILE, {
  headless: true,
  viewport: { width: 1920, height: 1200 },
});
const page = context.pages()[0] || (await context.newPage());
const t0 = Date.now();
const say = (...a) => console.log(((Date.now() - t0) / 1000).toFixed(1) + "s", ...a);

await page.goto(DOC, { waitUntil: "networkidle" }).catch(() => {});
await sleep(4000);

const input = page.locator("textarea, [contenteditable='true']").last();
await input.click();
await input.pressSequentially(
  "Year-one spending is on budget against the $30,000 year-one allocation, with the refrigerated van as the largest line item. For year two: recruit and fund the paid driver so the deferred second Saturday site can finally launch.",
  { delay: 8 }
);
await sleep(500);
await page.keyboard.press("Enter");
say("budget + year-two answer sent");

// watch stages for up to 6 minutes, logging stage transitions
let lastStage = "";
const start = Date.now();
while (Date.now() - start < 360000) {
  await sleep(4000);
  const text = await page.locator("body").innerText().catch(() => "");
  const m = text.match(/(Choose KB inputs|Interviewing|Outlining|Planning|Writing|Drafting|Editing|Review|Done)[^\n]*\n?\s*(\d of 5)?/);
  const stage = m ? (m[1] + " " + (m[2] || "")).trim() : "?";
  if (stage !== lastStage) { say("stage:", stage); lastStage = stage; await page.screenshot({ path: `${OUT}/dry3-${stage.replace(/\W+/g, "-")}.png` }); }
  if (/5 of 5|Done/.test(text) || /Editing/.test(stage)) { say("reached editing/done"); break; }
}
await sleep(8000);
await page.screenshot({ path: `${OUT}/dry3-final.png` });
console.log("final url:", page.url());
await context.close();
