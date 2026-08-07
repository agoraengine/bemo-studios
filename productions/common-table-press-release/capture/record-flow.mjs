#!/usr/bin/env node
// Reference recording of the press release flow, start to finish, on a FRESH
// document (standing rule; the Aug 6 seeded doc is set dressing, not a take).
// This is a preview reel for Becky, not the shipping clip: the brief is not
// ratified, so no VO, no titles, no end card. Raw webm + actions.json land in
// out/ (gitignored); cut per website-demo-slots/capture/assemble.mjs.
//
//   node record-flow.mjs
//
// Run within an hour of login (sessions expire ~1h). Frame hygiene: starts at
// Amplify templates, never Home, never the KB table.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PACE, sleep, scrollSmooth } from "../../../capture/lib/pacing.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
const PROFILE = path.join(HERE, "..", "..", "..", "capture", ".auth", "profile");
fs.mkdirSync(OUT, { recursive: true });

const NAME = "press-release-flow";
const context = await chromium.launchPersistentContext(PROFILE, {
  headless: true,
  viewport: { width: 1920, height: 1080 },
  recordVideo: { dir: OUT, size: { width: 1920, height: 1080 } },
});
const page = context.pages()[0] || (await context.newPage());
const t0 = Date.now();
const log = [];
const mark = (what) => {
  const t = (Date.now() - t0) / 1000;
  log.push({ t: +t.toFixed(2), what });
  console.log(`[${NAME}] ${t.toFixed(1)}s ${what}`);
};

async function stable({ quiet = 9000, max = 240000 } = {}) {
  let last = "", since = Date.now(), start = Date.now();
  while (Date.now() - start < max) {
    await sleep(2500);
    const now = await page.locator("body").innerText().catch(() => "");
    if (now !== last) { last = now; since = Date.now(); }
    else if (Date.now() - since > quiet) break;
  }
}

// chat messages go ONLY through the Ask-anything box; the interview form has
// its own textarea and the two must never be confused (the 8/6 scrap take)
async function say(text, label) {
  const input = page.locator("textarea[placeholder='Ask anything']").last();
  await input.click();
  await sleep(600);
  await input.pressSequentially(text, { delay: PACE.typing });
  mark(`typed: ${label}`);
  await sleep(PACE.beforeSubmit);
  await page.keyboard.press("Enter");
  // confirm it actually left the box; Enter can no-op mid-render
  await sleep(1500);
  if ((await input.inputValue().catch(() => "")).length > 0) {
    await page.keyboard.press("Enter");
    await sleep(1500);
  }
  mark(`sent: ${label}`);
  await stable();
  mark(`app settled after: ${label}`);
}

try {
  await page.goto("https://app.bemointel.ai/amplify/templates", { waitUntil: "networkidle" }).catch(() => {});
  await sleep(PACE.settle + 1500);
  const bodyText = await page.locator("body").innerText().catch(() => "");
  if (/Sign in to your BeMo account/i.test(bodyText)) throw new Error("session expired: run node capture/login.mjs");
  mark("amplify templates page");
  await sleep(PACE.beat);

  await page.waitForSelector("text=New Press Release", { timeout: 45000 });
  await sleep(PACE.beat);
  await page.locator("text=New Press Release").first().click({ timeout: 15000 });
  await sleep(5000);
  mark("fresh document: " + page.url());
  fs.writeFileSync(path.join(OUT, `${NAME}-doc-url.txt`), page.url());

  // stage 1: KB inputs found and accepted. Verify the submit actually took
  // ("Submitted" / "items used" appears); re-click if the app re-presents.
  await stable({ quiet: 7000, max: 90000 });
  mark("kb inputs listed");
  await sleep(PACE.beat + 800);
  for (let i = 0; i < 4; i++) {
    await page.locator("button:has-text('Submit')").last().click({ timeout: 15000 }).catch(() => {});
    await sleep(4000);
    const body = await page.locator("body").innerText().catch(() => "");
    if (/Submitted|items used/i.test(body)) { mark("kb inputs submitted (verified)"); break; }
    mark(`kb submit retry ${i + 1}`);
  }
  // the interview question follows; wait for its radio group, not just quiet
  await page.waitForSelector("button:has-text('Event')", { timeout: 120000 });
  mark("interview question 1 up (radios visible)");
  await sleep(PACE.beat);

  // stage 2: the interview form (radio + description + Submit), then chat.
  // The form mounts ~8s after the question appears and re-renders; wait long
  // and verify the radio actually took before moving on.
  await page.waitForSelector("button:has-text('Event')", { timeout: 60000 });
  await sleep(PACE.beat + 1000);
  for (let i = 0; i < 3; i++) {
    await page.locator("button:has-text('Event')").first().click({ timeout: 10000 }).catch(() => {});
    await sleep(1200);
    const took = await page.locator("button:has-text('Event') >> text=check_circle").count().catch(() => 0);
    if (took) { mark("Event radio selected"); break; }
    if (i === 2) mark("Event radio never confirmed; continuing");
  }
  // the interview form's fields carry "e.g. ..." example placeholders; the
  // chat box says "Ask anything"; hidden stray textareas have neither
  let desc = page.locator("textarea[placeholder^='e.g.']").first();
  const found = await desc.waitFor({ state: "visible", timeout: 30000 }).then(() => true).catch(() => false);
  if (!found) {
    mark("no e.g. textarea; falling back to visible non-chat textarea");
    desc = page.locator("textarea:visible:not([placeholder='Ask anything'])").first();
    await desc.waitFor({ state: "visible", timeout: 20000 });
  }
  await desc.click();
  await sleep(600);
  await desc.pressSequentially(
    "We are announcing the 2026 Harvest Supper, our annual community dinner and our one fundraising event of the year, on Saturday, October 17 at the Lincoln Park Pavilion. One seating at long tables, food from the same suppliers who stock the Mobile Pantry van, cooked partly by Teen Kitchen graduates. Last year 210 neighbors came and it raised $36,000 after expenses; this year's goal is $40,000 without raising the ticket price. About a third of our monthly donors first showed up as Supper guests.",
    { delay: PACE.typing }
  );
  mark("typed: what and why (form)");
  await sleep(PACE.beforeSubmit);
  await page.locator("button:has-text('Submit')").first().click({ timeout: 15000 });
  mark("form submitted");
  await stable();
  mark("app settled after form");
  await sleep(PACE.beat);
  await say(
    'Announcement date: August 6, 2026. Headline: The Harvest Supper returns October 17. Primary spokesperson: Dana Merritt, Executive Director. Her quote: "The van runs every week because of this night. If you have ever wanted to see what your neighbors can do when they sit at the same table, this is the night."',
    "date, headline, spokesperson, quote"
  );

  // advance walls: research, then editing
  await page.waitForSelector("button:has-text('Continue to Research')", { timeout: 120000 });
  await sleep(PACE.beat);
  await page.locator("button:has-text('Continue to Research')").first().click();
  mark("continue to research");
  await stable();
  await sleep(PACE.beat);
  await page.waitForSelector("button:has-text('Continue to Editing')", { timeout: 120000 });
  await sleep(PACE.beat);
  await page.locator("button:has-text('Continue to Editing')").first().click();
  mark("continue to editing; draft writing");
  await stable({ quiet: 12000, max: 300000 });
  mark("draft settled");

  // read the draft on camera
  await sleep(PACE.beat);
  await scrollSmooth(page, 900, { steps: 45, delay: 40 });
  mark("scrolled draft");
  await sleep(PACE.beat);

  // quality score beat
  await page.waitForSelector("button:has-text('Generate Score')", { timeout: 60000 }).catch(() => {});
  await page.locator("button:has-text('Generate Score')").first().click({ timeout: 10000 }).catch(() => mark("no score button"));
  mark("generate score clicked");
  await stable({ quiet: 10000, max: 180000 });
  mark("score shown");
  await sleep(PACE.tail + 1500);
  mark("take complete");
} catch (e) {
  mark("ERROR: " + e.message);
} finally {
  fs.writeFileSync(path.join(OUT, `${NAME}-actions.json`), JSON.stringify(log, null, 2));
  await context.close();
  const webm = fs.readdirSync(OUT).filter((f) => f.startsWith("page") && f.endsWith(".webm"))
    .map((f) => path.join(OUT, f))
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0];
  if (webm) fs.renameSync(webm, path.join(OUT, `${NAME}-raw.webm`));
  console.log(`[${NAME}] raw footage: out/${NAME}-raw.webm`);
}
