#!/usr/bin/env node
// Per-lesson capture runner for the Academy series.
//
//   node productions/academy-lessons/capture/run.mjs <lesson-slug>
//
// Run within an hour of `node capture/login.mjs` (sessions expire ~1h).
//
// If lessons/<slug>/capture.mjs exists it is imported and its default export
// is called as  run({ page, mark, helpers })  to drive the lesson's shot list.
// Without one, the fallback take opens the lesson's own page (URL from the
// probe dump) and scrolls through it, which covers lessons whose movement-2
// footage is the lesson content itself.
//
// Raw takes land in capture/out/<slug>/ (gitignored). Cut with:
//   node assemble.mjs ../lessons/<slug>/plan.json
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PACE, sleep, scrollSmooth } from "../../../capture/lib/pacing.mjs";
import { assertDemoOrg } from "../../../capture/lib/redact.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, "..", "..", "..");
const PROFILE = path.join(ROOT, "capture", ".auth", "profile");
const PROBE_DUMP = path.join(ROOT, "capture", "out", "academy", "lessons.json");

const slug = process.argv[2];
if (!slug) {
  console.error("usage: node run.mjs <lesson-slug>   (slugs come from roster.md)");
  process.exit(1);
}
const OUT = path.join(HERE, "out", slug);
fs.mkdirSync(OUT, { recursive: true });

// Headed: if the profile has no session, the operator signs in right here and
// the take continues in the same browser (the app's cookies do not survive
// browser restarts; see findings.md). The login moments are never inside any
// plan.json window, so they never reach a cut.
const context = await chromium.launchPersistentContext(PROFILE, {
  headless: false,
  viewport: { width: 1920, height: 1200 },
  recordVideo: { dir: OUT, size: { width: 1920, height: 1200 } },
});
const page = context.pages()[0] || (await context.newPage());

const t0 = Date.now();
const log = [];
const mark = (what) => {
  const t = (Date.now() - t0) / 1000;
  log.push({ t: +t.toFixed(2), what });
  console.log(`[${slug}] ${t.toFixed(1)}s ${what}`);
};

async function assertLoggedIn() {
  const text = await page.locator("body").innerText().catch(() => "");
  if (!/Sign in to your BeMo account/i.test(text)) return;
  mark("login page: sign in in this window, the take resumes by itself");
  const start = Date.now();
  while (Date.now() - start < 600000) {
    await sleep(2500);
    const t = await page.locator("body").innerText().catch(() => "");
    if (!/Sign in to your BeMo account/i.test(t) && !page.url().includes("/auth/")) {
      mark("signed in, resuming");
      return;
    }
  }
  throw new Error("waited 10 minutes for sign-in");
}

async function stableAnswer({ quiet = 9000, max = 180000 } = {}) {
  let last = "", since = Date.now(), start = Date.now();
  while (Date.now() - start < max) {
    await sleep(2500);
    const now = await page.locator("body").innerText().catch(() => "");
    if (now !== last) { last = now; since = Date.now(); }
    else if (Date.now() - since > quiet) break;
  }
  return last;
}

async function typeAndSend(text, label) {
  const input = page.locator("textarea, [contenteditable='true']").last();
  await input.click();
  await sleep(600);
  await input.pressSequentially(text, { delay: PACE.typing });
  mark(`typed: ${label}`);
  await sleep(PACE.beforeSubmit);
  await page.keyboard.press("Enter");
  mark(`sent: ${label}`);
}

const helpers = { PACE, sleep, scrollSmooth, assertLoggedIn, stableAnswer, typeAndSend, assertDemoOrg };

try {
  const custom = path.join(HERE, "..", "lessons", slug, "capture.mjs");
  if (fs.existsSync(custom)) {
    mark(`custom take: lessons/${slug}/capture.mjs`);
    const mod = await import(custom);
    await mod.default({ page, mark, helpers });
  } else {
    // fallback: walk the lesson's own page, top to bottom, at reading pace
    const dump = JSON.parse(fs.readFileSync(PROBE_DUMP, "utf8"));
    const lesson = dump.lessons.find((l) => l.slug === slug);
    if (!lesson) throw new Error(`${slug} not in probe dump; re-run capture/academy-probe.mjs`);
    await page.goto(lesson.url, { waitUntil: "networkidle" }).catch(() => {});
    await sleep(PACE.settle + 1500);
    await assertLoggedIn();
    await assertDemoOrg(page, "Common Table");
    mark(`lesson page: ${lesson.url}`);
    const height = await page.evaluate(() => document.body.scrollHeight - window.innerHeight);
    for (let y = 0; y < height; y += 600) {
      await scrollSmooth(page, 600, { steps: 24, delay: 40 });
      await sleep(PACE.beat + 1200);
    }
    mark("reached end of lesson");
    await sleep(PACE.tail);
  }
} finally {
  fs.writeFileSync(path.join(OUT, "actions.json"), JSON.stringify(log, null, 2));
  await context.close();
  const webm = fs.readdirSync(OUT).filter((f) => f.startsWith("page") && f.endsWith(".webm"))
    .map((f) => path.join(OUT, f))
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0];
  if (webm) fs.renameSync(webm, path.join(OUT, "take-raw.webm"));
  console.log(`[${slug}] raw footage: capture/out/${slug}/take-raw.webm`);
}
