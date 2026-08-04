// Discovery probe for the in-app Academy section. Read-only: navigates, extracts, screenshots.
// Precondition: node capture/login.mjs (session expires ~1h).
// Output: capture/out/academy/lessons.json + one screenshot per lesson (gitignored).
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PROFILE = path.join(ROOT, "capture/.auth/profile");
const OUT = path.join(ROOT, "capture/out/academy");
const APP = "https://app.bemointel.ai";

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

// 1. Find the Academy section: try the direct route, fall back to a nav link.
await goto(`${APP}/academy`);
await assertLoggedIn();
let landed = /academy/i.test(page.url());
if (!landed) {
  await goto(APP);
  await assertLoggedIn();
  const nav = page.locator("a", { hasText: /academy/i }).first();
  if (await nav.count()) {
    await nav.click().catch(() => {});
    await page.waitForTimeout(2500);
    landed = true;
  }
}
if (!landed) {
  console.error("Could not find an Academy section from / or /academy. Landing dump follows.");
}
const landingUrl = page.url();
await page.screenshot({ path: path.join(OUT, "00-landing.png"), fullPage: true });

// 2. Enumerate candidate lesson links on the landing page.
const links = await page.$$eval("a[href]", (as) =>
  as.map((a) => ({
    href: a.href,
    text: (a.innerText || "").trim().replace(/\s+/g, " ").slice(0, 200),
  }))
);
const base = new URL(landingUrl);
const seen = new Set();
const candidates = links.filter((l) => {
  try {
    const u = new URL(l.href);
    if (u.origin !== base.origin) return false;
    if (!u.pathname.startsWith(base.pathname) || u.pathname === base.pathname) return false;
    if (seen.has(u.pathname)) return false;
    seen.add(u.pathname);
    return true;
  } catch {
    return false;
  }
});
console.log(`Landing: ${landingUrl}`);
console.log(`Candidate lesson links: ${candidates.length}`);

// 3. Visit each candidate, extract title and full text, screenshot.
const lessons = [];
for (const [i, c] of candidates.entries()) {
  await goto(c.href);
  await assertLoggedIn();
  const title =
    (await page.locator("h1").first().innerText().catch(() => "")) || c.text || `lesson-${i + 1}`;
  const text = await page.locator("main, body").first().innerText().catch(() => "");
  const slug = slugify(title) || `lesson-${i + 1}`;
  const shot = `${String(i + 1).padStart(2, "0")}-${slug}.png`;
  await page.screenshot({ path: path.join(OUT, shot), fullPage: true });
  lessons.push({
    slug,
    title: title.trim(),
    url: c.href,
    linkText: c.text,
    screenshot: shot,
    text,
  });
  console.log(`  [${i + 1}/${candidates.length}] ${title.trim()} (${c.href})`);
}

// 4. Write the dump. The roster in productions/academy-lessons/roster.md is seeded from this.
const dump = {
  discoveredAt: new Date().toISOString(),
  landingUrl,
  landingLinkDump: links,
  lessons,
};
fs.writeFileSync(path.join(OUT, "lessons.json"), JSON.stringify(dump, null, 2));
console.log(`\nWrote ${lessons.length} lessons to capture/out/academy/lessons.json`);
if (!lessons.length) {
  console.log("No lessons extracted. Check 00-landing.png and landingLinkDump to see what the page actually holds.");
}
await context.close();
