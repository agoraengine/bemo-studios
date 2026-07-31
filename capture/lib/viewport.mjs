// Standard capture viewport for BeMo Studios.
//
// Capture at 2560x1440 and downscale on export. Capturing at delivery
// resolution leaves no room to crop or push in, and the edit always wants some.

export const CAPTURE_VIEWPORT = { width: 2560, height: 1440 };

export const CAPTURE_OPTIONS = {
  viewport: CAPTURE_VIEWPORT,
  deviceScaleFactor: 2,
  colorScheme: "light",
  reducedMotion: "no-preference",
};

/**
 * Browser context options with video recording enabled.
 * @param {string} outDir - where recordings land (gitignored)
 */
export function recordingContext(outDir) {
  return {
    ...CAPTURE_OPTIONS,
    recordVideo: { dir: outDir, size: CAPTURE_VIEWPORT },
  };
}

/**
 * Hide the elements that make footage look like a test run rather than a
 * product: dev banners, cookie bars, notification toasts. Add selectors here
 * as they turn up; do not work around them in the edit.
 */
export const HIDE_SELECTORS = [
  "[data-testid='dev-banner']",
  "#cookie-banner",
  "[role='status']",
];

export async function hideChrome(page, extra = []) {
  const selectors = [...HIDE_SELECTORS, ...extra];
  await page.addStyleTag({
    content: `${selectors.join(", ")} { visibility: hidden !important; }`,
  });
}
