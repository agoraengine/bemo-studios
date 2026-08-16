// Captures the remaining template flows in one session: Annual Report,
// Impact Story, Fact Sheet, Elevator Pitch. One document each, fields filled
// by meaning, every step screenshotted and logged.
//
//   node productions/li-product-feature-reels/capture/run-slate.mjs

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));

// All content grounded in demo-org/common-table/fact-sheet.md. No invented
// proper nouns: people who appear (Dana Merritt, Priya Menon, Deb Fontaine)
// are already on the fact sheet. Beneficiaries stay unnamed.
const TEMPLATES = [
  {
    slug: "annualreport",
    card: "New Annual Report",
    answers: [
      [/year|period|fiscal/i, "FY2025, January through December 2025"],
      [/highlight|accomplish|achievement|proud/i,
       "The Mobile Pantry delivered 82,400 meals to 340 families across three weekly sites. Teen Kitchen ran two full semesters. The Harvest Supper netted $36,000 from 210 guests."],
      [/audience|who.*read/i, "Donors, volunteers and community partners"],
      [/financial|revenue|budget/i, "Individual giving led our FY2025 revenue, with the Harvest Supper netting $36,000 and the Bright Harbor Foundation grant funding the Mobile Pantry's year one"],
      [/programs overview|description and key outcome|each program/i,
       "The Mobile Pantry: weekly groceries at three sites, 82,400 meals to 340 families. Teen Kitchen: a semester cooking program for local teens, two semesters run. Harvest Supper: our one fundraising event, 210 guests."],
      [/signer|sender|letter from|director/i, "Dana Merritt, Executive Director"],
      [/theme|message|feel/i, "Neighbors showing up for neighbors, week after week"],
    ],
  },
  {
    slug: "impactstory",
    card: "New Impact Story",
    answers: [
      [/program|initiative/i, "The Mobile Pantry, the Saturday route in Lincoln Park"],
      [/who|subject|beneficiary|person/i,
       "A neighbor who first came to the Saturday Lincoln Park distribution last winter and now volunteers on the same route. She has asked not to be named, so the story should keep her anonymous."],
      [/outcome|change|impact|different/i,
       "The Saturday site serves roughly 40 families a week, and about a third of our monthly donors first met us at a distribution or the Harvest Supper"],
      [/quote/i, "No direct quote available; please write around it"],
      [/before|situation|previous/i,
       "She had recently lost steady work and was stretching groceries across three weeks. A neighbor told her about the Saturday distribution."],
      [/audience|where.*appear/i, "The website and a funder report"],
    ],
  },
  {
    slug: "factsheet",
    card: "New Fact Sheet",
    answers: [
      [/purpose|audience|use/i, "Board packets and funder meetings"],
      [/focus|emphasi|include/i, "Programs, reach, and how to help"],
      [/contact/i, "Dana Merritt, Executive Director"],
    ],
  },
  {
    slug: "elevatorpitch",
    card: "New Elevator Pitch",
    answers: [
      [/mission/i, "Common Table Food Pantry makes sure no household in Corbin Falls has to choose between rent and groceries."],
      [/audience|who/i, "A community foundation program officer at a local event"],
      [/length|long|seconds/i, "30 seconds"],
      [/goal|outcome|want/i, "A follow-up meeting about the Mobile Pantry's second Saturday site"],
      [/tone|feel/i, "Warm and direct"],
    ],
  },
];

for (const T of TEMPLATES) {
  const OUT = path.join(HERE, "out", T.slug + "-video");
  fs.mkdirSync(OUT, { recursive: true });
  const context = await chromium.launchPersistentContext(
    "/Users/rebeccakern/Repositories/bemo-studios/capture/.auth/profile",
    { headless: true, viewport: { width: 1920, height: 1200 },
      recordVideo: { dir: OUT, size: { width: 1920, height: 1200 } } }
  );
  const page = context.pages()[0] || (await context.newPage());
  // per-template video via CDP is unavailable with persistent context recordVideo,
  // so each template gets its own page and we record with screencast frames from
  // the video option set at context level being unavailable; instead rely on a
  // second pass for motion if a beat needs it. Screenshots drive beat selection.
  const t0 = Date.now();
  const actions = [];
  const mark = (what) => {
    const t = +((Date.now() - t0) / 1000).toFixed(2);
    actions.push({ t, what });
    console.log(`[${T.slug} ${t.toString().padStart(7)}s] ${what}`);
  };
  const text = () => page.evaluate(() => ((document.querySelector("main") || document.body).innerText || ""));
  const shot = async (n) => { await page.screenshot({ path: `${OUT}/${n}.png` }); mark(`shot ${n}`); };
  const submit = async (label) => {
    const b = page.locator("button:has-text('Submit')").last();
    if (await b.count()) { await b.click().catch(() => {}); mark(`submit: ${label}`); return true; }
    return false;
  };
  const fillByMeaning = async () => {
    const fields = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll("input:not([disabled]), textarea:not([disabled])").forEach((el, idx) => {
        if (el.offsetParent === null) return;
        const ph = el.getAttribute("placeholder") || "";
        if (/ask anything/i.test(ph)) return;
        let label = "";
        let n = el.closest("div");
        for (let hop = 0; hop < 4 && n; hop++) {
          const prev = n.previousElementSibling;
          if (prev && prev.innerText && prev.innerText.length < 110) { label = prev.innerText; break; }
          n = n.parentElement;
        }
        out.push({ idx, ph, label });
      });
      return out;
    });
    let filled = 0;
    for (const f of fields) {
      const key = `${f.label} ${f.ph}`;
      const hit = T.answers.find(([re]) => re.test(key));
      const loc = page.locator("input:not([disabled]):visible, textarea:not([disabled]):visible").nth(f.idx);
      const current = await loc.inputValue().catch(() => "");
      if (current) continue;
      if (!hit) { mark(`no answer for: "${key.trim().slice(0, 70)}"`); continue; }
      await loc.click().catch(() => {});
      await loc.type(hit[1], { delay: 14 }).catch(() => {});
      filled++;
      mark(`filled "${(f.label || f.ph).trim().slice(0, 55)}"`);
      await page.waitForTimeout(400);
    }
    return filled;
  };

  try {
    await page.goto("https://app.bemointel.ai/amplify/templates", { waitUntil: "networkidle" }).catch(() => {});
    await page.waitForTimeout(3500);
    await page.click(`text=${T.card}`, { timeout: 15000 });
    await page.waitForTimeout(7000);
    mark(`editor: ${page.url()}`);
    await shot("s1-editor");
    await submit("kb inputs");

    for (let round = 1; round <= 4; round++) {
      await page.waitForTimeout(20000);
      await shot(`s${round + 1}-questions`);
      const body = await text();
      if (/optional|enrichment|much stronger|especially|two or more|make this .* (stronger|meaningful|compelling)/i.test(body.slice(-2000))) {
        mark("volunteered-detail step");
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(2500);
        await shot("s9-volunteered");
        break;
      }
      const filled = await fillByMeaning();
      await shot(`s${round + 1}b-filled`);
      if (!(await submit(`round ${round}`)) && filled === 0) break;
    }
    await page.waitForTimeout(15000);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2500);
    await shot("s10-final");
    mark(`done: ${page.url()}`);
  } catch (e) {
    mark(`ERROR: ${e.message.split("\n")[0]}`);
    await shot("s99-error").catch(() => {});
  }
  fs.writeFileSync(`${OUT}/actions.json`, JSON.stringify(actions, null, 2));
  await context.close();
}
console.log("\nall templates probed");
