// Discovery probe for the in-app Academy section. Read-only: navigates, extracts, screenshots.
// Precondition: node capture/login.mjs (sessions are fragile: one browser launch per login,
// see productions/academy-lessons/findings.md).
//
// The lessons live under /academy/courses (Becky, 2026-08-04); bare /academy is an empty
// shell. Course cards are click targets, not anchors, so the probe clicks each card's
// code badge (AC-01, PL-06, ...) in the Course Library and extracts the course page.
//
// Output: capture/out/academy/lessons.json + one screenshot per course (gitignored).
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PROFILE = path.join(ROOT, "capture/.auth/profile");
const OUT = path.join(ROOT, "capture/out/academy");
const APP = "https://app.bemointel.ai";
const CODE = /^[A-Z]{2,3}-\d+$/;

fs.mkdirSync(OUT, { recursive: true });

const context = await chromium.launchPersistentContext(PROFILE, {
  headless: true,
  viewport: { width: 1920, height: 1200 },
});
const page = context.pages()[0] || (await context.newPage());

async function assertLoggedIn() {
  const text = await page.locator("body").innerText().catch(() => "");
  if (/Sign in to your BeMo account/i.test(text)) {
    console.error("SESSION EXPIRED: run `node capture/login.mjs` first");
    await context.close();
    process.exit(1);
  }
}

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);

async function goto(url) {
  await page.goto(url, { waitUntil: "networkidle" }).catch(() => {});
  await page.waitForTimeout(2500);
}

// 1. Land on the courses view, then open the full Course Library if present.
await goto(`${APP}/academy/courses`);
await assertLoggedIn();
const library = page.locator("text=Course Library").first();
if (await library.count()) {
  await library.click().catch(() => {});
  await page.waitForTimeout(2500);
}
const libraryUrl = page.url();
await page.screenshot({ path: path.join(OUT, "00-landing.png"), fullPage: true });

// 2. Enumerate course cards from the DOM: leaf elements whose text is a code
// badge (AC-01 style), each paired with its category section heading.
const cards = await page.$$eval("*", (els) => {
  const CODE = /^[A-Z]{2,3}-\d+$/;
  const out = [];
  for (const el of els) {
    if (el.children.length) continue;
    const t = (el.textContent || "").trim();
    if (!CODE.test(t) || out.some((c) => c.code === t)) continue;
    out.push({ code: t });
  }
  return out;
});
const codes = cards.map((c) => c.code);
console.log(`Library: ${libraryUrl}`);
console.log(`Course cards found: ${codes.length} (${codes.join(", ")})`);

// 3. Open each course by clicking its code badge; extract and screenshot.
// Dump is written in the finally block so a mid-crawl session death keeps
// everything gathered so far.
const lessons = [];
try {
  for (const [i, code] of codes.entries()) {
    if (!page.url().startsWith(libraryUrl)) await goto(libraryUrl);
    const badge = page.getByText(code, { exact: true }).first();
    if (!(await badge.count())) {
      console.log(`  [${i + 1}/${codes.length}] ${code}: badge not found after return, skipped`);
      continue;
    }
    await badge.click().catch(() => {});
    await page.waitForTimeout(3000);
    await assertLoggedIn();
    const url = page.url();
    const title =
      (await page.locator("h1, h2").first().innerText().catch(() => "")) || code;
    const text = await page.locator("main, body").first().innerText().catch(() => "");
    const slug = slugify(`${code}-${title}`) || code.toLowerCase();
    const shot = `${String(i + 1).padStart(2, "0")}-${slug}.png`;
    await page.screenshot({ path: path.join(OUT, shot), fullPage: true });
    lessons.push({ code, slug, title: title.trim(), url, screenshot: shot, text });
    console.log(`  [${i + 1}/${codes.length}] ${code} ${title.trim()} (${url})`);
  }
} finally {

  // 4. Write the dump. The roster in productions/academy-lessons/roster.md is seeded from this.
  const dump = {
    discoveredAt: new Date().toISOString(),
    libraryUrl,
    courseCodes: codes,
    lessons,
  };
  fs.writeFileSync(path.join(OUT, "lessons.json"), JSON.stringify(dump, null, 2));
  console.log(`\nWrote ${lessons.length} courses to capture/out/academy/lessons.json`);
  if (!lessons.length) {
    console.log("Nothing extracted. Check 00-landing.png to see what the library page holds.");
  }
  await context.close();
}
