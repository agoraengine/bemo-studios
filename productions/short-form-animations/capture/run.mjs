#!/usr/bin/env node
// Renders the ten-second cuts. Silent by design: no VO, no captions, and no
// music unless you ask for it (brief.md, format rules). See source.html for
// the timeline and reference-apple-short-form.md for why the shape is this.
//
//   node run.mjs --render                 record all three cuts
//   node run.mjs --render --cut 2         one cut
//   node run.mjs --finish                 encode to the 1920x1080 delivery
//   node run.mjs --finish --music ../../linkedin-sizzle-series/capture/out/sfx/music-D.wav
//   node run.mjs --finish --outtag v2     name the audition
//
// Output: capture/out/ (gitignored). Upload to Drive, link in assets.md.
//
// The delivered file carries a silent AAC track rather than no audio stream:
// LinkedIn and QuickTime both handle a track of silence better than they
// handle a video with no track at all.

import { chromium } from "playwright";
import ffmpegPath from "ffmpeg-static";
import { execFile } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const run = promisify(execFile);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
const SLUG = "bemo-short-form";
const TAIL = 1.2;

// Must match DUR in source.html.
const DUR = { 1: 15.0, 2: 12.4, 3: 12.3, 4: 6.5, 5: 7.5, 6: 6.5, 7: 6.5, 8: 6.5, 9: 6.5, 10: 6.5, 11: 6.5 };
const NAME = { 1: "the-only-one", 2: "where-did-they-go", 3: "seven-tabs", 4: "brand-build", 5: "nothing-falls",
  6: "whose-voice", 7: "how-many-tabs", 8: "five-things", 9: "who-knows", 10: "walks-out-the-door", 11: "from-scratch" };
const CAP = { w: 2560, h: 1440, scale: 2 };

function arg(name, dflt) {
  const i = process.argv.indexOf(name);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : dflt;
}
const CUTS = arg("--cut", "1,2,3").split(",").map((s) => s.trim());
// --aspect sq renders the 1080x1080 feed square (cut 5's stacked layout);
// default is the 16:9 primary. Square captures at 2160 and delivers 1080.
const SQ = arg("--aspect", "h") === "sq";
// --variant appeal swaps cut 6's noun (source.html ?variant=) and tags the
// output name (whose-voice-appeal-...). Default is the newsletter wording.
const VARIANT = arg("--variant", null);
const vTag = VARIANT ? `-${VARIANT}` : "";
const vQuery = VARIANT ? `&variant=${VARIANT}` : "";
const CAPD = () => SQ ? { w: 2160, h: 2160, scale: 2 } : CAP;
const sqTag = SQ ? "-sq" : "";
const rawPath = (cut) => path.join(OUT, `${SLUG}-${NAME[cut]}${vTag}${sqTag}-raw.webm`);

async function render() {
  fs.mkdirSync(OUT, { recursive: true });
  for (const cut of CUTS) {
    const dur = DUR[cut];
    if (!dur) throw new Error(`Unknown cut "${cut}"; use 1, 2, or 3.`);
    const D = CAPD();
    const browser = await chromium.launch();
    const context = await browser.newContext({
      viewport: { width: D.w, height: D.h },
      deviceScaleFactor: 2,
      colorScheme: "light",
      recordVideo: { dir: OUT, size: { width: D.w, height: D.h } },
    });
    const page = await context.newPage();
    await page.goto("file://" + path.join(HERE, "source.html") + `?cut=${cut}` + (SQ ? "&aspect=sq" : "") + vQuery);
    await page.addStyleTag({
      content: `
        html, body { background:#000 !important; overflow:hidden !important; margin:0 !important;
          padding:0 !important; display:block !important; width:${D.w}px !important; height:${D.h}px !important; }
        #stage { position:fixed !important; top:0 !important; left:0 !important;
          transform:scale(${D.scale}) !important; transform-origin: top left !important; margin:0 !important; }
      `,
    });
    await page.evaluate(() => document.fonts?.ready);
    await page.evaluate(() => window.restart());
    console.log(`Recording cut ${cut} (${NAME[cut]}${vTag}${sqTag}) for ${dur + TAIL}s at ${CAPD().w}x${CAPD().h}...`);
    await page.waitForTimeout((dur + TAIL) * 1000);
    await context.close();
    await browser.close();

    const webm = fs.readdirSync(OUT).filter((f) => f.endsWith(".webm") && !f.includes("-raw"))
      .map((f) => path.join(OUT, f))
      .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0];
    if (!webm) throw new Error("Playwright wrote no video; check the recordVideo dir.");
    fs.renameSync(webm, rawPath(cut));
    console.log(`Raw: ${rawPath(cut)}`);
  }
}

async function finish() {
  const music = arg("--music", null);
  const sfx = process.argv.includes("--sfx") ? null : undefined;  // resolved per cut below
  const outtag = arg("--outtag", "v1");
  for (const cut of CUTS) {
    const raw = rawPath(cut);
    if (!fs.existsSync(raw)) throw new Error(`Missing ${raw}; render first.`);
    const dur = DUR[cut] + TAIL;
    const final = path.join(OUT, `${SLUG}-${NAME[cut]}${vTag}${sqTag}-${outtag}.mp4`);
    const cutSfx = sfx === null ? path.join(OUT, "sfx", `${NAME[cut]}${vTag}-sfx.wav`) : null;
    if (cutSfx && !fs.existsSync(cutSfx)) throw new Error(`Missing ${cutSfx}; run --soundtrack first.`);

    const inputs = [];
    let audio;
    if (cutSfx) {
      // foley at unity; its levels are set in soundtrack()
      inputs.push("-i", cutSfx);
      audio = `[1:a]apad=whole_dur=${dur},atrim=0:${dur}[aout]`;
    } else if (music) {
      // Optional bed only. Calm, well under the type, out before the tail, and
      // no swell: there is no voice for it to lift into (standards, Audio).
      inputs.push("-i", music);
      audio = `[1:a]atrim=0:${dur},asetpts=PTS-STARTPTS,volume=0.14,` +
        `afade=t=in:d=0.8,afade=t=out:st=${(dur - 2.2).toFixed(2)}:d=2.2[aout]`;
    } else {
      inputs.push("-f", "lavfi", "-t", String(dur), "-i", "anullsrc=r=48000:cl=stereo");
      audio = `[1:a]anull[aout]`;
    }

    await run(ffmpegPath, [
      "-nostdin", "-y", "-i", raw, ...inputs,
      "-filter_complex", `[0:v]scale=${SQ ? "1080:1080" : "1920:1080"}[vout];${audio}`,
      "-map", "[vout]", "-map", "[aout]",
      "-t", String(dur),
      "-c:v", "libx264", "-preset", "slow", "-crf", "20",
      "-pix_fmt", "yuv420p", "-r", "30",
      "-c:a", "aac", "-b:a", "128k",
      "-movflags", "+faststart",
      final,
    ]);
    console.log(`Final: ${final}${music ? " (with bed)" : " (silent)"}`);
  }
}

// Contact sheet for review: one still per beat, so a timing note can point at
// a frame instead of a stopwatch.
async function frames() {
  for (const cut of CUTS) {
    const raw = rawPath(cut);
    if (!fs.existsSync(raw)) throw new Error(`Missing ${raw}; render first.`);
    const dir = path.join(OUT, "frames", NAME[cut] + vTag);
    fs.mkdirSync(dir, { recursive: true });
    const at = arg("--at", null);
    const stamps = at ? at.split(",").map(Number)
      : Array.from({ length: Math.floor(DUR[cut]) }, (_, i) => i + 0.5);
    for (const s of stamps) {
      await run(ffmpegPath, [
        "-nostdin", "-y", "-ss", String(s), "-i", raw,
        "-frames:v", "1", "-vf", "scale=960:540",
        path.join(dir, `t${s.toFixed(1).replace(".", "-")}.png`),
      ]);
    }
    console.log(`Frames: ${dir}`);
  }
}

// Stills straight off the live page at exact times. Unlike --frames these are
// uncompressed, so a layout question gets answered without arguing with the
// webm encoder about whether that edge is real.
async function stills() {
  const at = arg("--at", "1,5,9").split(",").map(Number);
  for (const cut of CUTS) {
    const dir = path.join(OUT, "stills", NAME[cut] + vTag);
    fs.mkdirSync(dir, { recursive: true });
    const W = SQ ? 1080 : 1280, H = SQ ? 1080 : 720;
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: W, height: H }, colorScheme: "light" });
    await page.goto("file://" + path.join(HERE, "source.html") + `?cut=${cut}` + (SQ ? "&aspect=sq" : "") + vQuery);
    await page.addStyleTag({
      content: `html, body { background:#000 !important; overflow:hidden !important; margin:0 !important;
        padding:0 !important; display:block !important; width:${W}px !important; height:${H}px !important; }
        #stage { position:fixed !important; top:0 !important; left:0 !important;
          transform:none !important; margin:0 !important; }`,
    });
    await page.evaluate(() => document.fonts?.ready);
    for (const s of at) {
      await page.evaluate((v) => window.seek(v), s);
      await page.screenshot({ path: path.join(dir, `t${s.toFixed(1).replace(".", "-")}.png`) });
    }
    await browser.close();
    console.log(`Stills: ${dir}`);
  }
}


// Sound design for the poster (the "-s" variants): quiet foley on the three
// beats, no music bed. A bed on a 7.5s loop reads as an ad sting and seams
// audibly; foley rewards sound-on viewers and vanishes politely when muted.
// Levels sit low on purpose (about -26 LUFS integrated): charm, not startle.
async function soundtrack() {
  // Real foley (Becky, Aug 15: it needs to sound real or it does not work).
  // Samples are licensed pulls from the HeyGen sound catalog on Becky's plan,
  // saved to out/sfx/ext/. The crash lands as "falls" slips, the real thud
  // and latch land as the door shuts, and the arc reveal keeps the series
  // chime Becky approved.
  const sfxDir = path.join(OUT, "sfx");
  const ext = path.join(sfxDir, "ext");
  const chime = path.join(HERE, "..", "..", "linkedin-sizzle-series", "capture", "out", "sfx", "chime.mp3");
  const outWav = path.join(sfxDir, "nothing-falls-sfx.wav");
  const dur = DUR[5] + TAIL;
  for (const f of ["glass-shatter.mp3", "door-thud.mp3", "latch-click.mp3"])
    if (!fs.existsSync(path.join(ext, f))) throw new Error(`Missing ${f} in out/sfx/ext/`);
  // --sfxvariant crash (default) plays the glass crash as the word bottoms
  // out; --sfxvariant catch withholds it: the slip builds the expectation and
  // the crash never comes, only the soft catch. The absence is the line.
  const variant = arg("--sfxvariant", "catch");   // Becky, Aug 15: the word is fall, not crash
  const fallLayer = variant === "catch"
    ? `[1:a]atrim=0:0.01,asetpts=PTS-STARTPTS,volume=0[crash];[5:a]atrim=0:0.08,asetpts=PTS-STARTPTS,afade=t=out:st=0.02:d=0.06,volume=0.5,adelay=2280|2280[catch]`
    : `[1:a]asetpts=PTS-STARTPTS,volume=0.55,afade=t=out:st=1.0:d=0.5,adelay=1840|1840[crash];[5:a]atrim=0:0.01,asetpts=PTS-STARTPTS,volume=0[catch]`;
  const fc = [
    // the slip, 1.4: a breath of movement before the drop
    `[0:a]atrim=0:0.45,asetpts=PTS-STARTPTS,lowpass=f=700,afade=t=in:d=0.12,afade=t=out:st=0.25:d=0.2,volume=0.20,adelay=1400|1400[slip]`,
    fallLayer,
    // the shut, 5.62: a real door body (peak at 0.07) with the latch right after
    `[2:a]asetpts=PTS-STARTPTS,volume=0.85,adelay=5560|5560[shut]`,
    `[3:a]asetpts=PTS-STARTPTS,volume=0.45,adelay=5760|5760[latch]`,
    // the signal coming up, 6.35: the approved chime
    `[4:a]atrim=0:1.3,asetpts=PTS-STARTPTS,afade=t=out:st=0.9:d=0.4,volume=0.30,adelay=6350|6350[sig]`,
    `[slip][crash][catch][shut][latch][sig]amix=inputs=6:normalize=0,alimiter=limit=0.7:level=false[aout]`,
  ].join(";");
  await run(ffmpegPath, [
    "-nostdin", "-y",
    "-f", "lavfi", "-t", String(dur), "-i", "anoisesrc=color=pink:seed=7:sample_rate=48000",
    "-i", path.join(ext, "glass-shatter.mp3"),
    "-i", path.join(ext, "door-thud.mp3"),
    "-i", path.join(ext, "latch-click.mp3"),
    "-i", chime,
    "-f", "lavfi", "-t", "1", "-i", "sine=frequency=130:sample_rate=48000",
    "-filter_complex", fc,
    "-map", "[aout]", "-t", String(dur),
    "-c:a", "pcm_s16le", outWav,
  ]);
  console.log(`SFX track: ${outWav}`);
}


// Sound for the question posters (Becky's Aug 15 grammar: the sound IS the
// action, or there is no sound; every poster shares the chime on the arc
// reveal as the campaign's one sonic signature). Cuts 8, 9, 11 have
// near-silent actions (a fade, a blink, a strike) and carry chime only.
async function qsoundtracks() {
  const sfxDir = path.join(OUT, "sfx");
  fs.mkdirSync(sfxDir, { recursive: true });
  const ext = path.join(sfxDir, "ext");
  const chime = path.join(HERE, "..", "..", "linkedin-sizzle-series", "capture", "out", "sfx", "chime.mp3");
  const typing = path.join(HERE, "..", "..", "linkedin-sizzle-series", "capture", "out", "sfx", "typing.mp3");
  const dur = 6.5 + TAIL;
  const CH = (idx) => `[${idx}:a]atrim=0:1.3,asetpts=PTS-STARTPTS,afade=t=out:st=0.9:d=0.4,volume=0.30,adelay=4350|4350[sig]`;
  const JOBS = {
    "whose-voice": {
      inputs: [typing, chime],
      fc: [
        `[0:a]atrim=2.0:2.9,asetpts=PTS-STARTPTS,afade=t=out:st=0.7:d=0.2,volume=0.30,adelay=1550|1550[bs]`,
        `[0:a]atrim=10.0:10.95,asetpts=PTS-STARTPTS,afade=t=out:st=0.75:d=0.2,volume=0.30,adelay=2950|2950[rt]`,
        CH(1),
        `[bs][rt][sig]amix=inputs=3:normalize=0,alimiter=limit=0.7:level=false[aout]`,
      ] },
    // the appeal-letter variant (Becky, Aug 16): same gag, same beats, so the
    // same track under its own name for --variant appeal --finish --sfx
    "whose-voice-appeal": {
      inputs: [typing, chime],
      fc: [
        `[0:a]atrim=2.0:2.9,asetpts=PTS-STARTPTS,afade=t=out:st=0.7:d=0.2,volume=0.30,adelay=1550|1550[bs]`,
        `[0:a]atrim=10.0:10.95,asetpts=PTS-STARTPTS,afade=t=out:st=0.75:d=0.2,volume=0.30,adelay=2950|2950[rt]`,
        CH(1),
        `[bs][rt][sig]amix=inputs=3:normalize=0,alimiter=limit=0.7:level=false[aout]`,
      ] },
    "how-many-tabs": {
      inputs: [path.join(ext, "latch-click.mp3"), chime],
      fc: [
        ...Array.from({ length: 7 }, (_, i) =>
          `[0:a]atrim=0:0.15,asetpts=PTS-STARTPTS,volume=0.13,adelay=${1550 + i * 265}|${1550 + i * 265}[t${i}]`),
        CH(1),
        `[t0][t1][t2][t3][t4][t5][t6][sig]amix=inputs=8:normalize=0,alimiter=limit=0.7:level=false[aout]`,
      ] },
    "walks-out-the-door": {
      inputs: [path.join(ext, "door-thud.mp3"), path.join(ext, "latch-click.mp3"), chime],
      fc: [
        `[0:a]asetpts=PTS-STARTPTS,volume=0.85,adelay=3520|3520[shut]`,
        `[1:a]asetpts=PTS-STARTPTS,volume=0.45,adelay=3720|3720[latch]`,
        CH(2),
        `[shut][latch][sig]amix=inputs=3:normalize=0,alimiter=limit=0.7:level=false[aout]`,
      ] },
    "five-things": { inputs: [chime], fc: [CH(0), `[sig]alimiter=limit=0.7:level=false[aout]`] },
    "who-knows": { inputs: [chime], fc: [CH(0), `[sig]alimiter=limit=0.7:level=false[aout]`] },
    "from-scratch": { inputs: [chime], fc: [CH(0), `[sig]alimiter=limit=0.7:level=false[aout]`] },
  };
  for (const [name, job] of Object.entries(JOBS)) {
    const args = ["-nostdin", "-y"];
    job.inputs.forEach((f) => args.push("-i", f));
    if (job.noise) args.push("-f", "lavfi", "-t", String(dur), "-i", "anoisesrc=color=pink:seed=7:sample_rate=48000");
    args.push("-filter_complex", job.fc.join(";"),
      "-map", "[aout]", "-t", String(dur), "-c:a", "pcm_s16le",
      path.join(sfxDir, `${name}-sfx.wav`));
    await run(ffmpegPath, args);
    console.log(`SFX: ${name}-sfx.wav`);
  }
}

const mode = process.argv.includes("--qsoundtracks") ? qsoundtracks
  : process.argv.includes("--soundtrack") ? soundtrack
  : process.argv.includes("--finish") ? finish
  : process.argv.includes("--frames") ? frames
  : process.argv.includes("--stills") ? stills
  : render;
Promise.resolve(mode()).catch((e) => { console.error(e); process.exit(1); });
