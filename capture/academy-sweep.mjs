// Companion to academy-probe.mjs: visits courses by direct URL
// (/academy/course/<CODE>, discovered 2026-08-04) for every code the probe
// enumerated but could not click (the library lazy-loads sections on return).
// Merges results into capture/out/academy/lessons.json and records the
// library's category section headings. Same session rules as the probe.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PROFILE = path.join(ROOT, "capture/.auth/profile");
const OUT = path.join(ROOT, "capture/out/academy");
const APP = "https://app.bemointel.ai";
const DUMP = path.join(OUT, "lessons.json");

const dump = JSON.parse(fs.readFileSync(DUMP, "utf8"));
const have = new Set(dump.lessons.map((l) => l.code));
const missing = dump.courseCodes.filter((c) => !have.has(c));
console.log(`Have ${have.size}, sweeping ${missing.length} by direct URL`);

// Headed on purpose: if the profile has no session, the operator signs in
// right here and the crawl continues in the same browser. No restart, so the
// session cannot be lost between login and crawl (see findings.md on
// session-only cookies).
const context = await chromium.launchPersistentContext(PROFILE, {
  headless: false,
  viewport: { width: 1920, height: 1200 },
});
const page = context.pages()[0] || (await context.newPage());

async function assertLoggedIn() {
  const text = await page.locator("body").innerText().catch(() => "");
  if (!/Sign in to your BeMo account/i.test(text)) return;
  console.log("Login page detected. Sign in IN THIS WINDOW; the sweep continues by itself.");
  const start = Date.now();
  while (Date.now() - start < 600000) {
    await new Promise((r) => setTimeout(r, 2500));
    const t = await page.locator("body").innerText().catch(() => "");
    if (!/Sign in to your BeMo account/i.test(t) && !page.url().includes("/auth/")) {
      console.log("Signed in. Continuing.");
      return;
    }
  }
  throw new Error("Waited 10 minutes for sign-in; giving up.");
}

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);

// title lives in the course player text right after the "Course Player" line
const titleFrom = (text, code) => {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const i = lines.findIndex((l) => /^Course Player$/i.test(l));
  return (i >= 0 && lines[i + 1]) || code;
};

try {
  // categories come from the course-code prefixes and the library screenshot;
  // the heading grab proved unreliable (it once captured the Home greeting)
  delete dump.categories;

  await page.goto(`${APP}/academy/courses/library`, { waitUntil: "networkidle" }).catch(() => {});
  await page.waitForTimeout(2500);
  await assertLoggedIn();

  for (const [i, code] of missing.entries()) {
    await page.goto(`${APP}/academy/course/${code}`, { waitUntil: "networkidle" }).catch(() => {});
    await page.waitForTimeout(2500);
    await assertLoggedIn();
    const text = await page.locator("main, body").first().innerText().catch(() => "");
    const title = titleFrom(text, code);
    const slug = slugify(`${code}-${title}`) || code.toLowerCase();
    // screenshots are nice-to-have; a hung font load must not kill the crawl
    let shot = null;
    try {
      shot = `sweep-${slug}.png`;
      await page.screenshot({ path: path.join(OUT, shot), fullPage: true, timeout: 15000 });
    } catch {
      shot = null;
    }
    dump.lessons.push({ code, slug, title, url: `${APP}/academy/course/${code}`, screenshot: shot, text });
    console.log(`  [${i + 1}/${missing.length}] ${code} ${title}`);
  }
} finally {
  dump.sweptAt = new Date().toISOString();
  fs.writeFileSync(DUMP, JSON.stringify(dump, null, 2));
  console.log(`\nDump now holds ${dump.lessons.length} of ${dump.courseCodes.length} courses`);
  await context.close();
}
