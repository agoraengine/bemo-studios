// Donor Thank You Letter, clean run. Fields are filled by what each one asks
// for, read from its label and placeholder, never by position.
//
// The donor is Deb Fontaine, who already exists on the Common Table fact
// sheet as a board member and Harvest Supper chair: no new proper noun, so
// no collision check needed.
//
//   node productions/li-product-feature-reels/capture/run-thankyou2.mjs

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out", "thankyou2");
fs.mkdirSync(OUT, { recursive: true });

const t0 = Date.now();
const actions = [];
const mark = (what) => {
  const t = +((Date.now() - t0) / 1000).toFixed(2);
  actions.push({ t, what });
  console.log(`[${t.toString().padStart(7)}s] ${what}`);
};

// What each kind of field gets. Keys are matched against label + placeholder.
const ANSWERS = [
  [/donor.*name|name of.*donor/i, "Deb Fontaine"],
  [/signer|sender|sending/i, "Dana Merritt, Executive Director"],
  [/amount|description of.*gift|in-kind/i, "$250 monthly gift, increased from $200"],
  [/date/i, "June 12, 2026"],
  [/program|fund|campaign|supports/i, "The Mobile Pantry"],
  [/relationship|history|context|anything else|personal/i,
   "Deb has given monthly since 2023 and serves on our board. This increase came the week after she rode along on a Tuesday Mobile Pantry route."],
];

const context = await chromium.launchPersistentContext(
  "/Users/rebeccakern/Repositories/bemo-studios/capture/.auth/profile",
  {
    headless: true,
    viewport: { width: 1920, height: 1200 },
    recordVideo: { dir: OUT, size: { width: 1920, height: 1200 } },
  }
);
const page = context.pages()[0] || (await context.newPage());
const text = () =>
  page.evaluate(() => ((document.querySelector("main") || document.body).innerText || ""));
const shot = async (n) => { await page.screenshot({ path: `${OUT}/${n}.png` }); mark(`shot ${n}`); };
async function submit(label) {
  const b = page.locator("button:has-text('Submit')").last();
  if (await b.count()) { await b.click().catch(() => {}); mark(`submit: ${label}`); return true; }
  mark(`no submit at: ${label}`); return false;
}

// Fill every enabled field in the newest form block by meaning, not position.
async function fillByMeaning() {
  const fields = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll("input:not([disabled]), textarea:not([disabled])").forEach((el, idx) => {
      if (el.offsetParent === null) return;
      const ph = el.getAttribute("placeholder") || "";
      if (/ask anything/i.test(ph)) return; // the chat composer
      // label: walk up to the field container, grab preceding text
      let label = "";
      let n = el.closest("div");
      for (let hop = 0; hop < 4 && n; hop++) {
        const prev = n.previousElementSibling;
        if (prev && prev.innerText && prev.innerText.length < 90) { label = prev.innerText; break; }
        n = n.parentElement;
      }
      out.push({ idx, ph, label });
    });
    return out;
  });
  let filled = 0;
  for (const f of fields) {
    const key = `${f.label} ${f.ph}`;
    const hit = ANSWERS.find(([re]) => re.test(key));
    if (!hit) { mark(`no answer for: "${key.trim().slice(0, 60)}"`); continue; }
    const locator = page.locator("input:not([disabled]):visible, textarea:not([disabled]):visible").nth(f.idx);
    const current = await locator.inputValue().catch(() => "");
    if (current) continue;
    await locator.click().catch(() => {});
    await locator.type(hit[1], { delay: 24 }).catch((e) => mark(`type failed: ${e.message}`));
    filled++;
    mark(`filled "${key.trim().slice(0, 50)}"`);
    await page.waitForTimeout(500);
  }
  return filled;
}

await page.goto("https://app.bemointel.ai/amplify/templates", { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(3500);
mark("templates shelf");
await page.click("text=New Donor Thank You Letter", { timeout: 15000 });
await page.waitForTimeout(7000);
mark(`editor open: ${page.url()}`);
await shot("c1-editor");
await submit("kb inputs");

for (let round = 1; round <= 4; round++) {
  await page.waitForTimeout(20000);
  await shot(`c${round + 1}-questions`);
  const body = await text();
  if (/optional|enrichment|much stronger|make this .* stronger|two or more/i.test(body)) {
    mark("reached the volunteered-detail step");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2500);
    await shot("c9-volunteered");
    break;
  }
  const filled = await fillByMeaning();
  await shot(`c${round + 1}b-filled`);
  if (!(await submit(`round ${round}`))) break;
  if (filled === 0 && round > 1) { mark("nothing left to fill"); }
}

// let generation land if it started
await page.waitForTimeout(25000);
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(2500);
await shot("c10-final");
mark("done");

fs.writeFileSync(`${OUT}/actions.json`, JSON.stringify(actions, null, 2));
console.log("\ndocument:", page.url());
await context.close();
