// Amplify 30s feature reel: the donor email flow on the fundraising-appeal path.
//
// Mirrors Jennifer Allen's appeal letter story in the Week 30 anchor. Two beats
// are the reel: the editor saying it will read the brief before committing, and
// the editor volunteering a suggested donation amount nobody asked for.
//
//   node productions/li-product-feature-reels/capture/run.mjs
//
// Records 1920x1200 to match the existing Amplify footage and the 30s rig.
// Output and actions log land in capture/out/, which is gitignored.

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
fs.mkdirSync(OUT, { recursive: true });

const PROFILE = "/Users/rebeccakern/Repositories/bemo-studios/capture/.auth/profile";
const t0 = Date.now();
const actions = [];
const mark = (what) => {
  const t = +((Date.now() - t0) / 1000).toFixed(2);
  actions.push({ t, what });
  console.log(`[${t.toString().padStart(6)}s] ${what}`);
};

// Grounded in demo-org/common-table/fact-sheet.md. The deferred second Saturday
// site and its missing paid driver are real facts in that record, which is what
// makes this a true appeal rather than an invented one.
const BRIEF = `We are asking our recurring donors to fund the paid driver for a second Saturday Mobile Pantry site. The Mobile Pantry runs three sites a week and last year distributed 82,400 meals to 340 families. A second Saturday route has been ready since 2024 and has been held back for one reason: there is no driver and no route owner. Bright Harbor Foundation's year two funding covers part of the position. We are asking donors to close the gap so the route can open this fall.`;

const context = await chromium.launchPersistentContext(PROFILE, {
  headless: true,
  viewport: { width: 1920, height: 1200 },
  recordVideo: { dir: OUT, size: { width: 1920, height: 1200 } },
});
const page = context.pages()[0] || (await context.newPage());

const text = () =>
  page.evaluate(() => ((document.querySelector("main") || document.body).innerText || ""));

async function waitFor(re, label, tries = 24, gap = 5000) {
  for (let i = 0; i < tries; i++) {
    const body = await text();
    if (re.test(body)) {
      mark(`saw: ${label}`);
      return true;
    }
    await page.waitForTimeout(gap);
  }
  mark(`TIMEOUT waiting for: ${label}`);
  return false;
}

async function submit(label) {
  const btn = page.locator("button:has-text('Submit')").last();
  if (await btn.count()) {
    await btn.click().catch(() => {});
    mark(`submit: ${label}`);
  } else {
    mark(`no submit button at: ${label}`);
  }
}

// --- S1: open a fresh donor email from the template shelf
await page.goto("https://app.bemointel.ai/amplify/templates", { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(3000);
mark("templates shelf");
await page.click("text=New Donor Email", { timeout: 15000 });
await page.waitForTimeout(6000);
mark("donor email editor open");
await page.screenshot({ path: `${OUT}/s1-editor.png` });

// --- S2: accept the knowledge base inputs it found on its own
await waitFor(/Choose KB inputs|found in your knowledge base/i, "kb inputs step");
await page.waitForTimeout(2500);
await submit("kb inputs");

// --- S3: the purpose picker. This is the fork the whole reel turns on.
await waitFor(/Fundraising appeal/i, "purpose picker");
await page.waitForTimeout(2000);
await page.screenshot({ path: `${OUT}/s3-purpose-picker.png` });
await page.locator("text=Fundraising appeal").first().click().catch(() => {});
mark("chose: fundraising appeal");
await page.waitForTimeout(1200);
await page.locator("text=Recurring donors").first().click().catch(() => {});
mark("chose: recurring donors");
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}/s3b-appeal-chosen.png` });
await submit("purpose and segment");

// --- S4: it reads the brief before writing. Beat one of the reel.
await waitFor(/brief|interview guide|purpose|campaign|need/i, "next interview step", 24, 5000);
await page.waitForTimeout(2500);
await page.screenshot({ path: `${OUT}/s4-reads-brief.png` });

// Type the appeal brief at human speed wherever it asks for it.
const box = page.locator("textarea:visible").last();
if (await box.count()) {
  await box.click().catch(() => {});
  await box.type(BRIEF, { delay: 18 });
  mark("typed the appeal brief");
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/s4b-brief-typed.png` });
  await submit("appeal brief");
} else {
  mark("no textarea at the brief step; check s4-reads-brief.png");
}

// --- S5: the volunteered detail. Beat two, and the point of the reel.
const found = await waitFor(
  /suggested (donation|gift) amount|matching gift|donation amount/i,
  "volunteered donation amount",
  30,
  6000
);
await page.waitForTimeout(3000);
await page.screenshot({ path: `${OUT}/s5-volunteered-amount.png`, fullPage: false });
mark(found ? "captured the volunteered amount" : "amount beat not seen; review s5 shot");

// hold on the final frame so the edit has somewhere to cut
await page.waitForTimeout(4000);
mark("done");

fs.writeFileSync(`${OUT}/actions.json`, JSON.stringify(actions, null, 2));
console.log("\ndocument:", page.url());
await context.close();
console.log("video written to", OUT);
