#!/usr/bin/env node
// Recorded takes for the two capturable website demo slots.
//
//   node productions/website-demo-slots/capture/run.mjs            both takes
//   node productions/website-demo-slots/capture/run.mjs --take fs  funderstorm-cycle only
//   node productions/website-demo-slots/capture/run.mjs --take kwm knows-whats-missing only
//
// Run within an hour of `node capture/login.mjs` (sessions expire ~1h).
// Frame hygiene (shot-list.md): never Home, never the KB table, never Drive.
// Every take starts at /funderstorm/templates and starts a FRESH document.
//
// The Grant Progress Report flow does not auto-advance past its locked recap
// (findings.md, 2026-08-03): after "Yes, continue." it waits on a manual
// "Continue to Research" click. This run leaves the raw take there; a
// pickup script (not kept in the repo, easy to rewrite) can resume the same
// doc URL logged in *-actions.json if a further stage is ever wanted.
//
// After recording, cut with: node assemble.mjs <take>.plan.json
// The plan files used for the current clips are checked in alongside this
// script (funderstorm-cycle.plan.json, knows-whats-missing.plan.json).
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PACE, sleep } from "../../../capture/lib/pacing.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
const PROFILE = path.join(HERE, "..", "..", "..", "capture", ".auth", "profile");
fs.mkdirSync(OUT, { recursive: true });

const takeArg = process.argv.includes("--take") ? process.argv[process.argv.indexOf("--take") + 1] : "both";

// ---- shared helpers ----------------------------------------------------
async function newSession(name) {
  const context = await chromium.launchPersistentContext(PROFILE, {
    headless: true,
    viewport: { width: 1920, height: 1200 },
    recordVideo: { dir: OUT, size: { width: 1920, height: 1200 } },
  });
  const page = context.pages()[0] || (await context.newPage());
  const t0 = Date.now();
  const log = [];
  const mark = (what) => {
    const t = (Date.now() - t0) / 1000;
    log.push({ t: +t.toFixed(2), what });
    console.log(`[${name}] ${t.toFixed(1)}s ${what}`);
  };
  const finish = async () => {
    fs.writeFileSync(path.join(OUT, `${name}-actions.json`), JSON.stringify(log, null, 2));
    await context.close();
    // rename the newest page@*.webm to the take name
    const webm = fs.readdirSync(OUT).filter((f) => f.startsWith("page") && f.endsWith(".webm"))
      .map((f) => path.join(OUT, f))
      .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0];
    if (webm) fs.renameSync(webm, path.join(OUT, `${name}-raw.webm`));
    console.log(`[${name}] raw footage: ${name}-raw.webm`);
  };
  return { page, mark, finish, t0 };
}

async function stableAnswer(page, { quiet = 9000, max = 180000 } = {}) {
  let last = "", since = Date.now(), start = Date.now();
  while (Date.now() - start < max) {
    await sleep(2500);
    const now = await page.locator("body").innerText().catch(() => "");
    if (now !== last) { last = now; since = Date.now(); }
    else if (Date.now() - since > quiet) break;
  }
  return last;
}

async function typeAndSend(page, text, mark, label) {
  const input = page.locator("textarea, [contenteditable='true']").last();
  await input.click();
  await sleep(600);
  await input.pressSequentially(text, { delay: PACE.typing });
  mark(`typed: ${label}`);
  await sleep(PACE.beforeSubmit);
  await page.keyboard.press("Enter");
  mark(`sent: ${label}`);
}

// guard: if the session bounced to login, stop before recording junk
async function assertLoggedIn(page, mark) {
  const text = await page.locator("body").innerText().catch(() => "");
  if (/Sign in to your BeMo account/i.test(text)) {
    mark("SESSION EXPIRED: run `node capture/login.mjs` first");
    throw new Error("session expired");
  }
}

// ---- take 1: funderstorm-cycle -----------------------------------------
const ANSWERS = [
  ["grant basics", "This report covers our grant from the Bright Harbor Foundation for the Mobile Pantry: $60,000 over two years, awarded July 2025. This report covers year one, July 2025 through June 2026."],
  ["activities and numbers", "The award funded our refrigerated van and took the Mobile Pantry from one volunteer-run Saturday route to weekly distribution at three sites: Tuesdays at the Riverside Senior Center, Thursdays at Eastgate Elementary, and Saturdays in Lincoln Park, our largest stop at roughly 40 families. Through June we have distributed 41,600 meals this year, on pace with last year and steady through the summer months when school meals stop."],
  ["challenge", "The main challenge is our Saturday volunteer pool. We paused a second Saturday site in 2024 and deferred it again this March because we have no driver and no route owner. The renewal is the first funding that could change that."],
  ["the one new thing", "Still to come for this report: the year-one program report numbers are in, but Marcus owes three donor quotes for the donor voices section, due before the August 15 deadline."],
  ["budget and year two", "Year-one spending is on budget against the $30,000 year-one allocation, with the refrigerated van as the largest line item. For year two: recruit and fund the paid driver so the deferred second Saturday site can finally launch."],
];

async function takeFunderstormCycle() {
  const { page, mark, finish } = await newSession("funderstorm-cycle");
  try {
    await page.goto("https://app.bemointel.ai/funderstorm/templates", { waitUntil: "networkidle" }).catch(() => {});
    await sleep(PACE.settle + 1500);
    await assertLoggedIn(page, mark);
    mark("templates page");

    await page.locator("text=Grant Progress Report").first().click({ timeout: 15000 });
    await sleep(PACE.beat + 1000);
    mark("template detail");

    await page.locator("button", { hasText: /New Grant Progress Report/i }).first().click({ timeout: 15000 });
    await sleep(5000);
    mark("fresh document created: " + page.url());

    // step 1: KB inputs found
    await stableAnswer(page, { quiet: 6000, max: 60000 });
    await sleep(PACE.beat);
    mark("kb inputs shown");
    await page.locator("button:has-text('Submit')").first().click({ timeout: 15000 });
    mark("kb inputs submitted");

    // interview
    await stableAnswer(page);
    mark("first interview question up");
    for (const [label, text] of ANSWERS) {
      await typeAndSend(page, text, mark, label);
      await stableAnswer(page);
      mark(`app responded after: ${label}`);
      await sleep(PACE.beat);
    }

    // let the flow advance as far as it will go in ~5 minutes, logging stages
    const start = Date.now();
    let lastStage = "";
    while (Date.now() - start < 300000) {
      await sleep(4000);
      const text = await page.locator("body").innerText().catch(() => "");
      const m = text.match(/(Choose KB inputs|Interviewing|Outlining|Writing|Drafting|Editing|Review)\s*\n?\s*(\d of 5)?/);
      const stage = m ? (m[1] + " " + (m[2] || "")).trim() : "?";
      if (stage !== lastStage) { mark("stage: " + stage); lastStage = stage; }
      if (/Editing|Review|5 of 5/.test(stage)) break;
      // if it asks another optional question, move it along honestly
      if (/If you'd prefer to move forward without them|advance to the next phase/i.test(text.slice(-1500))) {
        await typeAndSend(page, "That covers everything on file. Please move ahead to the draft.", mark, "advance");
        await stableAnswer(page);
      }
    }

    // hold on whatever stage we reached; scroll the document if one exists
    await sleep(PACE.tail);
    const doc = page.locator(".ProseMirror, article, [class*='editor']").first();
    if (await doc.count()) {
      for (let i = 0; i < 20; i++) { await page.mouse.wheel(0, 60); await sleep(60); }
      mark("scrolled draft");
    }
    await sleep(PACE.tail + 1500);
    mark("take complete");
  } catch (e) {
    mark("ERROR: " + e.message);
  } finally {
    await finish();
  }
}

// ---- take 2: knows-whats-missing ---------------------------------------
async function takeKnowsWhatsMissing() {
  const { page, mark, finish } = await newSession("knows-whats-missing");
  try {
    await page.goto("https://app.bemointel.ai/funderstorm/templates", { waitUntil: "networkidle" }).catch(() => {});
    await sleep(PACE.settle + 1500);
    await assertLoggedIn(page, mark);
    mark("templates page (start point, never Home)");

    await page.locator("text=New chat").first().click({ timeout: 15000 });
    await sleep(PACE.settle + 800);
    mark("new chat");

    await typeAndSend(
      page,
      "Where does the Harvest Supper stand this year: date, budget, and what the board signed off on?",
      mark,
      "supper question"
    );
    await stableAnswer(page);
    mark("answer complete (names the gap, invites adding it)");
    await sleep(PACE.beat + 1200);

    await typeAndSend(
      page,
      "Yes, add it: at the March 12 meeting the board held the Harvest Supper budget at $16,000 against a $40,000 net goal.",
      mark,
      "gap fill reply"
    );
    await stableAnswer(page);
    mark("app confirmed (or responded to) the addition");
    await sleep(PACE.tail + 1500);
    mark("take complete");
  } catch (e) {
    mark("ERROR: " + e.message);
  } finally {
    await finish();
  }
}

// ---- run ---------------------------------------------------------------
if (takeArg === "fs" || takeArg === "both") await takeFunderstormCycle();
if (takeArg === "kwm" || takeArg === "both") await takeKnowsWhatsMissing();
console.log("Done. Raw footage in", OUT);
