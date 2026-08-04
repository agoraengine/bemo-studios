// AC-01 capture: the course player itself is the footage. One take covers the
// shot list: the Reading from the top (A2), a slow scroll through it (A3), and
// the course outline with Knowledge Check visible (A8). BeMo's own course
// content is on screen, no org data, so no demo-org gate applies here.
export default async function run({ page, mark, helpers }) {
  const { PACE, sleep, scrollSmooth, assertLoggedIn } = helpers;
  await page.goto("https://app.bemointel.ai/academy/course/AC-01", { waitUntil: "networkidle" }).catch(() => {});
  await sleep(PACE.settle + 2000);
  await assertLoggedIn();
  // a sign-in redirect lands on Home (never filmable); always re-navigate and
  // verify the course player is actually on screen before any recording beat
  if (!page.url().includes("/academy/course/AC-01")) {
    await page.goto("https://app.bemointel.ai/academy/course/AC-01", { waitUntil: "networkidle" }).catch(() => {});
    await sleep(PACE.settle + 2000);
  }
  const onPlayer = await page.locator("text=Course Player").first().count();
  if (!onPlayer) throw new Error(`not on the course player (at ${page.url()}); take aborted before filming the wrong surface`);
  mark("course player open (Reading)");
  await sleep(3000); // A2 hold: the Reading top

  // A3: read-pace scroll through the Reading
  for (let i = 0; i < 14; i++) {
    await scrollSmooth(page, 500, { steps: 22, delay: 40 });
    await sleep(PACE.beat + 800);
  }
  mark("reading scrolled");

  // A8: the outline's Knowledge Check
  const kc = page.locator("text=Knowledge Check").first();
  if (await kc.count()) {
    await kc.click().catch(() => {});
    await sleep(PACE.settle + 3000);
    mark("knowledge check open");
    await sleep(4000);
  }
  await sleep(PACE.tail);
}
