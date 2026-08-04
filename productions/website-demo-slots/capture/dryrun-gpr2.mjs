#!/usr/bin/env node
// Continue the GPR dry run: answer the interview from the fact sheet, dump
// each subsequent question. node dryrun-gpr2.mjs <doc-url>
import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PACE, sleep } from "../../../capture/lib/pacing.mjs";

const DOC = process.argv[2];
if (!DOC) { console.error("pass doc url"); process.exit(1); }
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = "/private/tmp/claude-501/-Users-rebeccakern-Repositories-bemo-studios/aef02867-fc9a-4cb4-90fc-6f326a43c532/scratchpad";
const PROFILE = path.join(HERE, "..", "..", "..", "capture", ".auth", "profile");

const ANSWERS = [
  "This report covers our grant from the Bright Harbor Foundation for the Mobile Pantry: $60,000 over two years, awarded July 2025. This report covers year one, July 2025 through June 2026.",
  "The award funded our refrigerated van and took the Mobile Pantry from one volunteer-run Saturday route to weekly distribution at three sites: Tuesdays at the Riverside Senior Center, Thursdays at Eastgate Elementary, and Saturdays in Lincoln Park, our largest stop at roughly 40 families. Through June we have distributed 41,600 meals this year, on pace with last year and steady through the summer months when school meals stop.",
  "The main challenge is our Saturday volunteer pool. We paused a second Saturday site in 2024 and deferred it again this March because we have no driver and no route owner. The renewal is the first funding that could change that.",
  "Still to come for this report: the year-one program report numbers are in, but Marcus owes three donor quotes for the donor voices section, due before the August 15 deadline.",
];

const context = await chromium.launchPersistentContext(PROFILE, {
  headless: true,
  viewport: { width: 1920, height: 1200 },
});
const page = context.pages()[0] || (await context.newPage());
const t0 = Date.now();
const say = (...a) => console.log(((Date.now() - t0) / 1000).toFixed(1) + "s", ...a);

async function stableText({ quiet = 8000, max = 150000 } = {}) {
  let last = "", since = Date.now(), start = Date.now();
  while (Date.now() - start < max) {
    await sleep(2500);
    const now = await page.locator("body").innerText().catch(() => "");
    if (now !== last) { last = now; since = Date.now(); }
    else if (Date.now() - since > quiet) break;
  }
  return last;
}

await page.goto(DOC, { waitUntil: "networkidle" }).catch(() => {});
await sleep(4000);

for (let i = 0; i < ANSWERS.length; i++) {
  const input = page.locator("textarea, [contenteditable='true']").last();
  await input.click();
  await input.pressSequentially(ANSWERS[i], { delay: 8 });
  await sleep(500);
  await page.keyboard.press("Enter");
  say("sent answer", i + 1);
  const text = await stableText();
  console.log(`--- after answer ${i + 1} ---\n` + text.slice(-2200));
  await page.screenshot({ path: `${OUT}/dry2-round${i + 1}.png` });
  if (/Editing|3 of 5|Writing the draft/i.test(text)) { say("advanced past interviewing"); break; }
}
const finalText = await page.locator("body").innerText().catch(() => "");
console.log("=== FINAL STAGE MARKERS ===", (finalText.match(/\d of 5|Interviewing|Editing|Review/g) || []).join(", "));
await context.close();
