import { chromium } from "playwright";
const PROFILE = "/Users/rebeccakern/Repositories/bemo-studios/capture/.auth/profile";
const OUT = "/private/tmp/claude-501/-Users-rebeccakern-Repositories-bemo-studios/aef02867-fc9a-4cb4-90fc-6f326a43c532/scratchpad";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const context = await chromium.launchPersistentContext(PROFILE, {
  headless: true,
  viewport: { width: 1920, height: 1080 },
});
const page = context.pages()[0] || (await context.newPage());

const stops = [
  ["compass-home", "https://app.bemointel.ai/compass/home"],
  ["amplify-home", "https://app.bemointel.ai/amplify/home"],
  ["academy-home", "https://app.bemointel.ai/academy/home"],
  ["fs-kb", "https://app.bemointel.ai/funderstorm/knowledge-base"],
];

for (const [name, url] of stops) {
  await page.goto(url, { waitUntil: "networkidle" }).catch(() => {});
  await sleep(3000);
  console.log(name, "->", page.url());
  await page.screenshot({ path: `${OUT}/probe-${name}.png` });
}

// open the Board Gala Budget chat to see whether answers carry source chips
await page.goto("https://app.bemointel.ai/funderstorm/home", { waitUntil: "networkidle" }).catch(() => {});
await sleep(2500);
const gala = page.locator("text=Board Gala Budget").first();
try {
  await gala.click({ timeout: 8000 });
  await sleep(3500);
  console.log("gala chat ->", page.url());
  await page.screenshot({ path: `${OUT}/probe-gala-chat.png` });
  await page.mouse.wheel(0, 1200);
  await sleep(1500);
  await page.screenshot({ path: `${OUT}/probe-gala-chat-2.png` });
} catch (e) {
  console.log("gala chat not clickable:", e.message);
}

// knowledge base tree
await page.goto("https://app.bemointel.ai/funderstorm/knowledge-base", { waitUntil: "networkidle" }).catch(() => {});
await sleep(3000);
const bh = page.locator("text=Bright Harbor").first();
try {
  await bh.click({ timeout: 8000 });
  await sleep(3000);
  console.log("bright harbor ->", page.url());
  await page.screenshot({ path: `${OUT}/probe-bright-harbor.png` });
} catch (e) {
  console.log("bright harbor not found on kb page:", e.message);
}

await context.close();
