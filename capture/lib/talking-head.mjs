// Repair chain for founder-to-camera footage.
//
// A webcam take in a real room arrives underexposed, colour-cast, and far too
// quiet, because the settings that fix those live in three different places and
// nobody finds all three. See ../../docs/04-founder-to-camera.md for the capture
// checklist that makes most of this unnecessary.
//
// Filter order here is load-bearing. Exposure lifts BEFORE white balance,
// because correcting colour and then brightening re-warms everything the
// correction just removed.

import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
export const FF = require.resolve("ffmpeg-static").replace(/index\.js$/, "ffmpeg");

/** Run ffmpeg and hand back stderr, which is where every measurement lands. */
export function ff(args) {
  const r = spawnSync(FF, ["-hide_banner", ...args], { encoding: "utf8", maxBuffer: 1 << 26 });
  return (r.stderr || "") + (r.stdout || "");
}

// ---------------------------------------------------------------- picture ---

/**
 * Exposure lift, luma only, applied before white balance.
 * `strength` moves the midpoint: 0.565 is a gentle lift, 0.635 is the Week 31
 * setting that took a 120 YAVG face to 140.
 */
export const lift = (strength = 0.635) => {
  // Derived from the two hand-tuned Week 31 curves (0.565 gentle, 0.635 shipped),
  // so `strength` moves the whole curve rather than only its midpoint. Setting
  // the midpoint alone leaves the upper midtones behind and the face reads dark.
  const p = (a, b) => (a + b * strength).toFixed(3);
  return `curves=master='0/${p(-0.1316, 0.286)} 0.25/${p(-0.0784, 0.714)} 0.5/${strength.toFixed(3)} 0.75/${p(0.4267, 0.643)} 1/1'`;
};

/**
 * White balance. Higher kelvin cools the image.
 * Find the value empirically: sample something actually white in the frame and
 * sweep until U and V both sit near 128. Do not sample a wall.
 */
export const whiteBalance = (kelvin = 8500) =>
  `colortemperature=temperature=${kelvin}:mix=1`;

/**
 * Optical diffusion: a blurred copy screen-blended back at low opacity, which
 * is what a Black Pro-Mist does on a real lens. Lifts shadow out of creases,
 * leaves edges sharp.
 *
 * Do not substitute smartblur or any skin-smoothing filter. They cannot tell
 * skin from eyes and take the eyes, hair edge, and glasses with them, which is
 * the look viewers now read as AI-generated.
 */
export const diffusion = (opacity = 0.12, sigma = 14) =>
  `split[d0][d1];[d1]gblur=sigma=${sigma}[d2];[d0][d2]blend=all_mode=screen:all_opacity=${opacity}`;

export const pictureChain = ({ strength, kelvin, glow } = {}) =>
  [lift(strength), whiteBalance(kelvin), diffusion(glow)].join(",");

// ------------------------------------------------------------------ audio ---

const PRE = "highpass=f=80,afftdn=nr=10:nf=-50";

/**
 * Pass one of loudnorm. Measures AFTER the cleanup filters, because denoising
 * changes the numbers pass two depends on.
 */
export function measureLoudness(file, { ss, to, target = -14 } = {}) {
  const seek = [...(ss != null ? ["-ss", String(ss)] : []), ...(to != null ? ["-to", String(to)] : [])];
  const out = ff([...seek, "-i", file,
    "-af", `${PRE},loudnorm=I=${target}:TP=-1.5:LRA=11:print_format=json`, "-f", "null", "-"]);
  const m = out.match(/\{[\s\S]*?\}/);
  if (!m) throw new Error(`loudnorm measurement failed for ${file}`);
  return JSON.parse(m[0]);
}

/**
 * Pass two. Denoise runs first so that lifting a very quiet track does not
 * bring the whole room up with it.
 */
export function audioChain(measured, target = -14) {
  const { input_i, input_tp, input_lra, input_thresh, target_offset } = measured;
  return `${PRE},loudnorm=I=${target}:TP=-1.5:LRA=11` +
    `:measured_I=${input_i}:measured_TP=${input_tp}:measured_LRA=${input_lra}` +
    `:measured_thresh=${input_thresh}:offset=${target_offset}:linear=true` +
    `,alimiter=limit=0.891:level=false`;
}

// ------------------------------------------------------------------ probe ---

/** Mean luma and chroma over a crop. Pass the face box, not the whole frame. */
export function stats(file, { at = 0, crop } = {}) {
  const vf = [crop && `crop=${crop}`, "signalstats", "metadata=print"].filter(Boolean).join(",");
  const out = ff(["-ss", String(at), "-t", "1", "-i", file, "-vf", vf, "-f", "null", "-"]);
  const pick = (k) => {
    const m = out.match(new RegExp(`signalstats\\.${k}=([\\d.]+)`));
    return m ? +m[1] : null;
  };
  return { YLOW: pick("YLOW"), YAVG: pick("YAVG"), YHIGH: pick("YHIGH"), YMAX: pick("YMAX"), UAVG: pick("UAVG"), VAVG: pick("VAVG") };
}

/** Targets from docs/04-founder-to-camera.md, so a build can assert on them. */
export const TARGETS = {
  loudness: -14, truePeak: -1.5,
  faceYAVG: [138, 145], faceYLOW: 100, faceVAVG: [135, 140],
  whiteUV: [128, 128], maxYMAX: 250,
};

export const ENCODE = [
  "-c:v", "libx264", "-crf", "17", "-preset", "slow", "-pix_fmt", "yuv420p",
  "-profile:v", "high", "-level", "4.0", "-r", "30",
  "-c:a", "aac", "-b:a", "192k", "-ac", "2", "-ar", "48000", "-movflags", "+faststart",
];
