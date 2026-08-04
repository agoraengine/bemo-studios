import { chromium } from "playwright";
const PROFILE = "/Users/rebeccakern/Repositories/bemo-studios/capture/.auth/profile";
const OUT = "/private/tmp/claude-501/-Users-rebeccakern-Repositories-bemo-studios/aef02867-fc9a-4cb4-90fc-6f326a43c532/scratchpad";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const context = await chromium.launchPersistentContext(PROFILE, {
  headless: true,
  viewport: { width: 1920, height: 1080 },
});
const page = context.pages()[0] || (await context.newPage());

// 1. the scissors icon on a chat answer: does it hand off into a document?
await page.goto("https://app.bemointel.ai/funderstorm/home", { waitUntil: "networkidle" }).catch(() => {});
await sleep(2500);
await page.locator("text=Harvest Supper Event Status").first().click({ timeout: 8000 }).catch((e) => console.log("chat open failed:", e.message));
await sleep(3000);
const snip = page.locator("mat-icon:has-text('content_cut'), button:has(mat-icon:has-text('content_cut'))").last();
if (await snip.count()) {
  await snip.click().catch((e) => console.log("snip click failed:", e.message));
  await sleep(2500);
  console.log("after snip:", page.url());
  await page.screenshot({ path: `${OUT}/probe2-snip.png` });
  await page.keyboard.press("Escape").catch(() => {});
  await sleep(800);
} else {
  console.log("no content_cut icon found");
  await page.screenshot({ path: `${OUT}/probe2-chat-icons.png` });
}

// 2. the in-flight Grant Progress Report: what do the five steps look like?
await page.goto("https://app.bemointel.ai/funderstorm/home", { waitUntil: "networkidle" }).catch(() => {});
await sleep(2500);
await page.locator("text=Grant Progress Report").first().click({ timeout: 8000 }).catch((e) => console.log("gpr open failed:", e.message));
await sleep(3500);
console.log("gpr doc:", page.url());
await page.screenshot({ path: `${OUT}/probe2-gpr-step1.png` });

// 3. an Editing-stage doc: does the draft mark what it still needs?
await page.goto("https://app.bemointel.ai/funderstorm/home", { waitUntil: "networkidle" }).catch(() => {});
await sleep(2500);
await page.locator("text=Board Meeting Agenda").first().click({ timeout: 8000 }).catch((e) => console.log("agenda open failed:", e.message));
await sleep(3500);
console.log("editing doc:", page.url());
await page.screenshot({ path: `${OUT}/probe2-editing-doc.png` });
await page.mouse.wheel(0, 900);
await sleep(1200);
await page.screenshot({ path: `${OUT}/probe2-editing-doc-2.png` });

// 4. Academy courses: catalogue or in-flow?
await page.goto("https://app.bemointel.ai/academy/home", { waitUntil: "networkidle" }).catch(() => {});
await sleep(2500);
await page.locator("text=Courses").first().click({ timeout: 8000 }).catch((e) => console.log("courses failed:", e.message));
await sleep(3000);
console.log("courses:", page.url());
await page.screenshot({ path: `${OUT}/probe2-academy-courses.png` });

await context.close();
