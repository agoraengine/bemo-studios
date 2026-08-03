#!/usr/bin/env node
// Post-load verification per demo-org/common-table/README.md.
// CAVEAT (2026-08-03): the KB page's search box does not filter the table, so
// the per-term counts below all return the total item count and prove nothing.
// The sound leak check is at the source: grep the upload set for banned terms
// (the KB is wiped to zero before load, so items can only contain what the
// uploads contain). Kept for the screenshots and as a harness for when search
// works; treat its PASS/FAIL as noise until then.
import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PROFILE = path.join(HERE, "..", "..", "..", "capture", ".auth", "profile");

const MUST_BE_ABSENT = ["Wrenfield", "Kessler", "Whitaker", "Copperline", "Prairie Light", "Hartwell", "Meg Poe", "Saratoga"];
const MUST_BE_PRESENT = ["Corbin Falls", "Bright Harbor", "Teen Kitchen", "Mobile Pantry", "Merritt"];

const context = await chromium.launchPersistentContext(PROFILE, {
  headless: true,
  viewport: { width: 1440, height: 900 },
});
const page = context.pages()[0] || (await context.newPage());
await page.goto("https://app.bemointel.ai/funderstorm/kb", { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(2500);

const search = page.locator("input[placeholder*='Search'], input[type='search']").first();
async function countFor(term) {
  await search.click();
  await search.fill("");
  await search.fill(term);
  await page.waitForTimeout(1800);
  const n = await page.locator("tbody tr:has(button)").count();
  await search.fill("");
  await page.waitForTimeout(800);
  return n;
}

let ok = true;
for (const term of MUST_BE_ABSENT) {
  const n = await countFor(term);
  if (n > 0) { ok = false; console.log("LEAK:", term, "->", n, "items"); }
  else console.log("clean:", term);
}
for (const term of MUST_BE_PRESENT) {
  const n = await countFor(term);
  if (n === 0) { ok = false; console.log("MISSING:", term, "-> 0 items"); }
  else console.log("present:", term, "->", n);
}
console.log(ok ? "VERIFY PASS" : "VERIFY FAIL");
await context.close();
