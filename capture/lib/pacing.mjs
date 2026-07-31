// Pacing for capture runs.
//
// Real UI moves faster than a viewer can read. Playwright's defaults are
// instant, which produces footage that is technically correct and unusable.
// Everything here is deliberately slower than the app actually is.

export const PACE = {
  // Hold on a screen before anything happens, so the viewer can orient
  settle: 1200,
  // Hold after an action completes, so the result registers
  beat: 1600,
  // Hold on the final frame of a shot, giving the edit somewhere to cut
  tail: 2000,
  // Per-character typing delay. Instant text in a field reads as fake.
  typing: 55,
  // Pause before submitting, the way a person checks their work
  beforeSubmit: 900,
};

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Wait for the thing the shot is actually about, then hold a beat.
 * Waiting for load fires mid-animation; waiting for the element does not.
 */
export async function waitForStable(page, selector, { hold = PACE.settle } = {}) {
  await page.waitForSelector(selector, { state: "visible" });
  await sleep(hold);
}

/** Type at human speed. Never use fill() for anything on camera. */
export async function typeHuman(page, selector, text, { submit = false } = {}) {
  await page.click(selector);
  await page.type(selector, text, { delay: PACE.typing });
  if (submit) {
    await sleep(PACE.beforeSubmit);
    await page.keyboard.press("Enter");
  }
}

/** Scroll slowly enough to follow. Instant scroll is unusable footage. */
export async function scrollSmooth(page, pixels, { steps = 30, delay = 24 } = {}) {
  const step = pixels / steps;
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, step);
    await sleep(delay);
  }
  await sleep(PACE.beat);
}

/** Close out a shot: hold the final frame so the edit has room. */
export async function endShot() {
  await sleep(PACE.tail);
}
