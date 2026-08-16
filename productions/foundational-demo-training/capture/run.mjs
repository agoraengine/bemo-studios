#!/usr/bin/env node
// Capture for the foundational demo training video.
//
// Drives the live BeMo app (Cottage 2 harness: Becky's saved session in
// capture/.auth/profile) through shots S5-S18 of shot-list.md, one function
// per shot so any shot can be recaptured alone. Records at 2560x1440.
//
//   node run.mjs --probe          map the app first: routes, nav, org identity,
//                                 fact-sheet spot checks. Run this before any
//                                 recording pass, and after any app deploy.
//   node run.mjs --shot S10       capture one shot
//   node run.mjs --app            capture S5-S16 and S18 in order (one session)
//   node run.mjs --shot S17       capture the pricing page (website, no login;
//                                 uses WEBSITE_URL, default http://localhost:3000)
//
// SELECTOR NOTE: the SEL table below starts from the routes and patterns proven
// in productions/common-table-kb-load/capture/*.mjs. The probe verifies each
// one and writes out/probe/probe.json; fix SEL from that file before a full
// recording pass. Do not guess a selector into a recording.
//
// HARD RULES (CLAUDE.md 3, 4; cottage-2 conditions of use): Common Table capture
// org only, never a real org, never Jon's practice workspace. Session profile
// never leaves the machine. Best honest take on generations: no retrying until
// it flatters. If S10 comes back thin, keep it; S11 is the scripted recovery.

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PACE, sleep, waitForStable, scrollSmooth, endShot } from "../../../capture/lib/pacing.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
const REPO = path.join(HERE, "..", "..", "..");
const PROFILE = path.join(REPO, "capture", ".auth", "profile");
const APP = "https://app.bemointel.ai";
const WEBSITE = process.env.WEBSITE_URL || "http://localhost:3000";

fs.mkdirSync(OUT, { recursive: true });

// Routes and selectors. Verified fields are marked; everything else is the
// best hypothesis from prior captures and MUST be confirmed by --probe.
const SEL = {
  kbRoute: `${APP}/funderstorm/kb`,               // verified (kb-load run)
  chatHome: `${APP}/`,                            // verified: root has "New chat" (ask-run)
  newChat: "text=New chat",                       // verified (ask-run)
  chatInput: "textarea, [contenteditable='true'], input[type='text']", // verified (ask-run), use .last()
  compassRoute: `${APP}/compass`,                 // probe: does /compass exist, or is root chat Compass?
  funderstormRoute: `${APP}/funderstorm`,         // probe
  amplifyRoute: `${APP}/amplify`,                 // probe (templates route verified: /amplify/templates)
  academyRoute: `${APP}/academy`,                 // probe
  homeRoute: `${APP}/`,                           // probe: is the two-surfaces Home front page live?
  kbFunderPage: null,                             // probe: path to KB > Funders > Bright Harbor
  kbGapView: null,                                // probe: where gap flags surface
  kbBoardMinutes: null,                           // probe: March 2026 board minutes page
};

const COMPASS_QUESTION = "Should we restart the second Saturday mobile pantry site?";
const AMPLIFY_REQUEST = "Draft a short thank-you note to the nine donors who gave for the first time in June. Warm, specific to Common Table, ready to send.";

// Fact-sheet spot checks (demo-org/common-table/fact-sheet.md, published anchors).
const SPOT_CHECKS = ["Common Table", "Bright Harbor", "$60,000", "August 15", "18,240", "Dana Merritt"];

const t0 = Date.now();
const log = [];
const mark = (w) => { const t = (Date.now() - t0) / 1000; log.push({ t: +t.toFixed(2), what: w }); console.log(t.toFixed(1) + "s", w); };

// ---------- shared machinery ----------

async function launch({ record = true, forApp = true } = {}) {
  const opts = {
    headless: true,
    viewport: { width: 2560, height: 1440 },
    deviceScaleFactor: 1,
  };
  if (record) opts.recordVideo = { dir: OUT, size: { width: 2560, height: 1440 } };
  const context = forApp
    ? await chromium.launchPersistentContext(PROFILE, opts)
    : await (await chromium.launch({ headless: true })).newContext(opts);
  const page = context.pages()[0] || (await context.newPage());
  await installCursor(page);
  return { context, page };
}

// A visible cursor for hover choreography. Playwright recordings have no OS
// cursor; this draws one and eases it to each target.
async function installCursor(page) {
  await page.addInitScript(() => {
    const make = () => {
      if (document.getElementById("__cap_cursor")) return;
      const d = document.createElement("div");
      d.id = "__cap_cursor";
      d.style.cssText = "position:fixed;z-index:2147483647;width:22px;height:22px;border-radius:50%;background:rgba(26,42,58,.85);border:2.5px solid #fff;box-shadow:0 1px 6px rgba(0,0,0,.4);pointer-events:none;left:-50px;top:-50px;transition:none";
      document.documentElement.appendChild(d);
    };
    if (document.readyState !== "loading") make();
    else document.addEventListener("DOMContentLoaded", make);
  });
}

async function glideTo(page, x, y, { ms = 700 } = {}) {
  const steps = Math.max(12, Math.round(ms / 16));
  const pos = await page.evaluate(() => {
    const d = document.getElementById("__cap_cursor");
    if (!d) return { x: 100, y: 100 };
    const r = d.getBoundingClientRect();
    return { x: r.left + 11, y: r.top + 11 };
  }).catch(() => ({ x: 100, y: 100 }));
  for (let i = 1; i <= steps; i++) {
    const e = 0.5 - Math.cos((i / steps) * Math.PI) / 2; // ease in-out
    const nx = pos.x + (x - pos.x) * e, ny = pos.y + (y - pos.y) * e;
    await page.mouse.move(nx, ny);
    await page.evaluate(([px, py]) => {
      const d = document.getElementById("__cap_cursor");
      if (d) { d.style.left = px - 11 + "px"; d.style.top = py - 11 + "px"; }
    }, [nx, ny]).catch(() => {});
    await sleep(ms / steps);
  }
}

async function glideToText(page, text, opts) {
  const el = page.locator(`text=${text}`).first();
  if (!(await el.count())) { mark(`MISS glide target: ${text}`); return false; }
  const box = await el.boundingBox();
  if (!box) return false;
  await glideTo(page, box.x + box.width / 2, box.y + box.height / 2, opts);
  return true;
}

// Wait for a generation to finish: body text stable for 9s (ask-run pattern).
async function waitForAnswerStable(page, { maxMs = 180000 } = {}) {
  let last = "", stableSince = Date.now(), start = Date.now();
  while (Date.now() - start < maxMs) {
    await sleep(3000);
    const now = await page.evaluate(() => document.body.innerText.length).catch(() => 0);
    if (String(now) !== last) { last = String(now); stableSince = Date.now(); }
    else if (Date.now() - stableSince > 9000) return true;
  }
  return false;
}

async function finishShot(page, context, name) {
  await endShot();
  await page.screenshot({ path: path.join(OUT, `${name}-final.png`) });
  fs.writeFileSync(path.join(OUT, `${name}-actions.json`), JSON.stringify(log, null, 2));
  await context.close();
  // playwright names videos by hash; label the newest one
  const vids = fs.readdirSync(OUT).filter((f) => f.endsWith(".webm")).map((f) => ({ f, m: fs.statSync(path.join(OUT, f)).mtimeMs })).sort((a, b) => b.m - a.m);
  if (vids[0]) fs.renameSync(path.join(OUT, vids[0].f), path.join(OUT, `${name}.webm`));
  console.log(`shot ${name} recorded -> ${path.join(OUT, `${name}.webm`)}`);
}

async function requireSession(page) {
  await page.goto(APP + "/", { waitUntil: "networkidle" }).catch(() => {});
  await sleep(2500);
  if (page.url().includes("/auth/login")) {
    console.error("Session expired. Run: node capture/login.mjs (Becky logs in, checks 'remember me', closes the window). Then re-run.");
    process.exit(2);
  }
}

// ---------- probe ----------

async function probe() {
  const { context, page } = await launch({ record: false });
  await requireSession(page);
  const dir = path.join(OUT, "probe");
  fs.mkdirSync(dir, { recursive: true });
  const report = { at: null, routes: {}, nav: [], spotChecks: {}, notes: [] };

  const shoot = async (name, url) => {
    await page.goto(url, { waitUntil: "networkidle" }).catch(() => {});
    await sleep(3500);
    const finalUrl = page.url();
    await page.screenshot({ path: path.join(dir, `${name}.png`) });
    const text = await page.evaluate(() => document.body.innerText.slice(0, 4000)).catch(() => "");
    report.routes[name] = { asked: url, landed: finalUrl, textHead: text.slice(0, 600) };
    return text;
  };

  const rootText = await shoot("root", APP + "/");
  report.nav = await page.evaluate(() =>
    [...document.querySelectorAll("a, [role=link], nav *, [class*=nav] *")].map((e) => e.textContent?.trim()).filter((t) => t && t.length < 40)
  ).catch(() => []);
  report.nav = [...new Set(report.nav)].slice(0, 80);

  for (const [name, url] of [
    ["kb", SEL.kbRoute], ["compass", SEL.compassRoute], ["funderstorm", SEL.funderstormRoute],
    ["amplify", SEL.amplifyRoute], ["academy", SEL.academyRoute],
  ]) await shoot(name, url);

  // org identity + fact spot checks against the KB
  const kbText = await shoot("kb-again", SEL.kbRoute);
  for (const s of SPOT_CHECKS) report.spotChecks[s] = kbText.includes(s) || rootText.includes(s);
  if (kbText.includes("Wrenfield")) report.notes.push("WRENFIELD LEAKAGE VISIBLE ON KB ROUTE: wrong org loaded or org switcher needed");
  if (!report.spotChecks["Common Table"]) report.notes.push("Common Table not visible at KB route: check org switcher before any recording");

  fs.writeFileSync(path.join(dir, "probe.json"), JSON.stringify(report, null, 2));
  await context.close();
  console.log("Probe written to", path.join(dir, "probe.json"), "- screenshots alongside. Fix SEL in run.mjs from it, then record.");
}

// ---------- shots ----------

async function S5() { // Home at rest, bridge spoken over it
  const { context, page } = await launch();
  await requireSession(page);
  await page.goto(SEL.homeRoute, { waitUntil: "networkidle" }).catch(() => {});
  await sleep(PACE.settle + 2000);
  mark("S5 hold on home/root");
  await sleep(24000); // bridge narration ~25s
  await finishShot(page, context, "S5");
}

async function S6() { // Home walkthrough: three hovers, then hold
  const { context, page } = await launch();
  await requireSession(page);
  await page.goto(SEL.homeRoute, { waitUntil: "networkidle" }).catch(() => {});
  await sleep(PACE.settle + 1500);
  await glideToText(page, "Bright Harbor"); await sleep(4500);
  await glideToText(page, "Teen Kitchen"); await sleep(4500);
  await glideToText(page, "18,240"); await sleep(4500);
  mark("S6 hovers done, holding for line to land");
  await glideTo(page, 2350, 1350, { ms: 900 }); // park the cursor
  await sleep(9000);
  await finishShot(page, context, "S6");
}

async function S7() { // KB: Bright Harbor funder page, reading-pace scroll
  const { context, page } = await launch();
  await requireSession(page);
  await page.goto(SEL.kbRoute, { waitUntil: "networkidle" }).catch(() => {});
  await sleep(PACE.settle + 1500);
  mark("S7 at KB root");
  const found = await glideToText(page, "Bright Harbor", { ms: 900 });
  if (found) { await page.locator("text=Bright Harbor").first().click().catch(() => {}); await sleep(PACE.beat + 1000); }
  else mark("S7 FALLBACK: Bright Harbor page not reachable by text; fix SEL.kbFunderPage from probe");
  await scrollSmooth(page, 900, { steps: 45, delay: 40 });
  await sleep(PACE.beat);
  await scrollSmooth(page, 700, { steps: 40, delay: 40 });
  await sleep(6000);
  await finishShot(page, context, "S7");
}

async function S8() { // a flagged gap, cursor resting on it
  const { context, page } = await launch();
  await requireSession(page);
  const target = SEL.kbGapView || SEL.kbRoute;
  await page.goto(target, { waitUntil: "networkidle" }).catch(() => {});
  await sleep(PACE.settle + 1500);
  const found = (await glideToText(page, "missing", { ms: 900 })) || (await glideToText(page, "gap", { ms: 900 }));
  if (!found) mark("S8 BLOCKED CANDIDATE: no visible gap flag; confirm from probe where gaps surface");
  mark("S8 resting on gap");
  await sleep(16000); // narration + line to land
  await finishShot(page, context, "S8");
}

async function S9S10() { // Compass question: S9 empty input, S10 typed + generation + trace
  const { context, page } = await launch();
  await requireSession(page);
  await page.goto(SEL.chatHome, { waitUntil: "networkidle" }).catch(() => {});
  await sleep(PACE.settle + 1200);
  await page.click(SEL.newChat).catch(() => mark("S9 no 'New chat' control; probe the chat entry"));
  await sleep(PACE.settle);
  mark("S9 empty chat");
  await sleep(6000);
  const input = page.locator(SEL.chatInput).last();
  await input.click();
  await sleep(600);
  await input.pressSequentially(COMPASS_QUESTION, { delay: PACE.typing });
  mark("S10 question typed");
  await sleep(PACE.beforeSubmit);
  await page.keyboard.press("Enter");
  mark("S10 sent; recording the real wait");
  await waitForAnswerStable(page);
  mark("S10 answer stable");
  await sleep(PACE.beat);
  // cursor traces the three recalled elements if present
  for (const t of ["March", "2024", "Bright Harbor"]) { await glideToText(page, t, { ms: 800 }); await sleep(3500); }
  await sleep(10000); // line to land hold
  await finishShot(page, context, "S9S10");
}

async function S11() { // click-through to the board minutes
  const { context, page } = await launch();
  await requireSession(page);
  const target = SEL.kbBoardMinutes || SEL.kbRoute;
  await page.goto(target, { waitUntil: "networkidle" }).catch(() => {});
  await sleep(PACE.settle + 1500);
  const found = await glideToText(page, "Board minutes", { ms: 900 }) || await glideToText(page, "board", { ms: 900 });
  if (found) { await page.locator("text=/[Bb]oard/").first().click().catch(() => {}); await sleep(PACE.beat + 1200); }
  await glideToText(page, "deferred", { ms: 900 }).catch(() => {});
  await sleep(12000);
  await finishShot(page, context, "S11");
}

async function S12() { // FunderStorm funding view, three funders in order
  const { context, page } = await launch();
  await requireSession(page);
  await page.goto(SEL.funderstormRoute, { waitUntil: "networkidle" }).catch(() => {});
  await sleep(PACE.settle + 2000);
  for (const t of ["Bright Harbor", "Meridian", "Amberline"]) { await glideToText(page, t, { ms: 900 }); await sleep(5000); }
  mark("S12 funders traced");
  await sleep(12000);
  await finishShot(page, context, "S12");
}

async function S13S14() { // Amplify: request typed, generation, scroll, voice-guide click-through, hold
  const { context, page } = await launch();
  await requireSession(page);
  await page.goto(SEL.amplifyRoute, { waitUntil: "networkidle" }).catch(() => {});
  await sleep(PACE.settle + 1500);
  const newDoc = page.locator("text=/New (draft|document|chat)/i").first();
  if (await newDoc.count()) { await newDoc.click(); await sleep(PACE.beat); }
  else mark("S13 no obvious new-draft control; probe Amplify's entry");
  const input = page.locator(SEL.chatInput).last();
  await input.click().catch(() => {});
  await sleep(600);
  await input.pressSequentially(AMPLIFY_REQUEST, { delay: PACE.typing }).catch(() => mark("S13 input not typeable; fix from probe"));
  await sleep(PACE.beforeSubmit);
  await page.keyboard.press("Enter");
  mark("S14 request sent; recording the real wait");
  await waitForAnswerStable(page);
  mark("S14 draft stable");
  await scrollSmooth(page, 700, { steps: 40, delay: 40 });
  await sleep(PACE.beat);
  // voice-guide click-through is probe-dependent; if not found, hold the draft
  const vg = page.locator("text=/voice/i").first();
  if (await vg.count()) { await glideToText(page, "voice", { ms: 900 }); await vg.click().catch(() => {}); await sleep(4000); await page.goBack().catch(() => {}); await sleep(PACE.beat); }
  await sleep(22000); // Jennifer Allen story + line to land
  await finishShot(page, context, "S13S14");
}

async function S15() { // Academy, one screen
  const { context, page } = await launch();
  await requireSession(page);
  await page.goto(SEL.academyRoute, { waitUntil: "networkidle" }).catch(() => {});
  await sleep(PACE.settle + 2000);
  mark("S15 academy hold");
  await sleep(14000);
  await finishShot(page, context, "S15");
}

async function S16() { // back to Home, hold for "Four apps. One product."
  const { context, page } = await launch();
  await requireSession(page);
  await page.goto(SEL.homeRoute, { waitUntil: "networkidle" }).catch(() => {});
  await sleep(PACE.settle + 1500);
  mark("S16 home hold");
  await sleep(18000);
  await finishShot(page, context, "S16");
}

async function S17() { // the pricing page: local website build, no login
  const { context, page } = await launch({ forApp: false });
  await page.goto(WEBSITE + "/pricing", { waitUntil: "networkidle" }).catch(() => {});
  await sleep(PACE.settle + 2000);
  mark("S17 pricing top");
  await scrollSmooth(page, 800, { steps: 45, delay: 40 });
  await sleep(PACE.beat + 1500);
  await scrollSmooth(page, 800, { steps: 45, delay: 40 });
  await sleep(PACE.beat);
  const gf = page.locator("text=/beta|grandfather/i").first();
  if (await gf.count()) { const b = await gf.boundingBox(); if (b) await glideTo(page, b.x + b.width / 2, b.y + b.height / 2, { ms: 900 }); }
  await sleep(8000);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" })).catch(() => {});
  await sleep(3000);
  mark("S17 holding tier table");
  await sleep(12000);
  await finishShot(page, context, "S17");
}

async function S18() { // back in the app, Home, calm
  const { context, page } = await launch();
  await requireSession(page);
  await page.goto(SEL.homeRoute, { waitUntil: "networkidle" }).catch(() => {});
  await sleep(PACE.settle + 1500);
  mark("S18 calm hold");
  await sleep(16000);
  await finishShot(page, context, "S18");
}

// ---------- cli ----------

const SHOTS = { S5, S6, S7, S8, S9: S9S10, S10: S9S10, S9S10, S11, S12, S13: S13S14, S14: S13S14, S13S14, S15, S16, S17, S18 };
const argv = process.argv.slice(2);

if (argv.includes("--probe")) await probe();
else if (argv.includes("--shot")) {
  const id = argv[argv.indexOf("--shot") + 1];
  if (!SHOTS[id]) { console.error("unknown shot:", id); process.exit(1); }
  await SHOTS[id]();
} else if (argv.includes("--app")) {
  for (const fn of [S5, S6, S7, S8, S9S10, S11, S12, S13S14, S15, S16, S18]) await fn();
} else {
  console.log("usage: node run.mjs --probe | --shot <ID> | --app   (S17 is the website shot; WEBSITE_URL overrides localhost:3000)");
}
