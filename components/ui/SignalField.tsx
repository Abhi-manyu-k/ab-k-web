"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Signal field — a quiet, measured visual for a section (docs/NIGHT-SHEET.md, step 3).
 *
 * `traces`: a field of slow sensor signals drifting right to left. Every ~18 s one trace drifts out of
 * tolerance, turns signal orange, is pulled back inside its limits and confirmed. The site's story in one loop.
 *
 * `chart`: a control chart being written, one point every 600 ms; about every 45th point breaks the upper
 * control limit (a hollow signal diamond) and the next three step back toward the centre line.
 *
 * `wafer`: a wafer map of dies where, every 4–7 s, a small cluster flags signal, clears to ok, and settles.
 *
 * Decorative (aria-hidden), no pointer interaction. Colours come from the CSS tokens. Paused off-screen and
 * in hidden tabs, capped at 30 fps. Under reduced motion nothing drifts: two static frames (out of tolerance,
 * corrected) cross-fade every 6 s.
 */

type Variant = "traces" | "chart" | "wafer";

type Props = {
  variant: Variant;
  /** Sets the size; the canvas fills its box. */
  className?: string;
  /** Same seed, same picture. */
  seed?: number;
  /** Optional one-line mono caption under the canvas. */
  caption?: string;
};

type RGB = [number, number, number];
type Palette = { line: RGB; rule: RGB; ink2: RGB; faint: RGB; signal: RGB; ok: RGB; paper: RGB; font: string };

type EventState = {
  row: number;
  dev: number; // px above the baseline at the right end
  color: RGB;
  limits: number; // alpha of the tolerance lines
  label: { text: string; color: RGB; alpha: number } | null;
};

const FPS = 30;
const DRIFT = 12; // px/s
const STEP = 6; // px between samples
const AMP = 2.5; // px
const TOL = 8; // px, half-width of the tolerance band
const DEV = 14; // px, the excursion

// ─── Seeded randomness ───

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(row: number, k: number, seed: number) {
  let h = Math.imul(row + 1, 374761393) ^ Math.imul(k, 668265263) ^ Math.imul(seed, 2246822519);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return (((h ^ (h >>> 16)) >>> 0) / 4294967296) * 2 - 1;
}

function valueNoise(row: number, x: number, seed: number) {
  const k = Math.floor(x / 48);
  const f = x / 48 - k;
  const s = f * f * (3 - 2 * f);
  return hash(row, k, seed) * (1 - s) + hash(row, k + 1, seed) * s;
}

// ─── Colour helpers ───

function parseColor(value: string, fallback: RGB): RGB {
  const v = value.trim();
  const m = /^#([0-9a-f]{6})$/i.exec(v);
  if (m) {
    const n = parseInt(m[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  return fallback;
}

const mix = (a: RGB, b: RGB, t: number): RGB => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];
const rgba = (c: RGB, a = 1) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const easeOut = (t: number) => 1 - (1 - t) ** 3;

function readPalette(el: HTMLElement): Palette {
  const css = getComputedStyle(document.documentElement);
  const get = (name: string, fb: RGB) => parseColor(css.getPropertyValue(name), fb);
  return {
    line: get("--color-line-strong", [69, 66, 60]),
    rule: get("--color-line", [42, 41, 38]),
    ink2: get("--color-ink-2", [207, 202, 189]),
    faint: get("--color-faint", [138, 133, 122]),
    signal: get("--color-signal", [229, 98, 47]),
    ok: get("--color-ok", [95, 174, 134]),
    paper: get("--color-paper", [17, 17, 16]),
    font: getComputedStyle(el).fontFamily || "ui-monospace, monospace",
  };
}

// ─── The traces field ───

type Trace = { f1: number; f2: number; p1: number; p2: number; amp: number };

function makeTraces(count: number, seed: number): Trace[] {
  const rnd = mulberry32(seed);
  return Array.from({ length: count }, () => ({
    f1: 0.008 + rnd() * 0.008,
    f2: 0.03 + rnd() * 0.02,
    p1: rnd() * Math.PI * 2,
    p2: rnd() * Math.PI * 2,
    amp: 0.8 + rnd() * 0.4,
  }));
}

function rowCount(h: number) {
  return Math.min(64, Math.max(24, Math.round(h / 9)));
}

function drawTraces(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  traces: Trace[],
  offset: number,
  ev: EventState | null,
  pal: Palette,
  seed: number,
) {
  ctx.clearRect(0, 0, w, h);
  const gap = h / (traces.length + 1);
  const value = (i: number, x: number) => {
    const t = traces[i];
    const X = x + offset;
    const v = 0.55 * Math.sin(X * t.f1 + t.p1) + 0.3 * Math.sin(X * t.f2 + t.p2) + 0.45 * valueNoise(i, X, seed);
    return v * AMP * t.amp;
  };

  const path = (i: number, dev: number) => {
    const base = gap * (i + 1);
    ctx.beginPath();
    for (let x = 0; x <= w + STEP; x += STEP) {
      const y = base - value(i, x) - dev * smoothstep(w * 0.3, w * 0.75, x);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  };

  ctx.lineWidth = 1;
  ctx.lineJoin = "round";
  ctx.strokeStyle = rgba(pal.line);
  for (let i = 0; i < traces.length; i++) {
    if (ev && i === ev.row) continue;
    path(i, 0);
  }

  if (!ev) return;
  const base = gap * (ev.row + 1);

  if (ev.limits > 0) {
    ctx.save();
    ctx.setLineDash([2, 4]);
    ctx.strokeStyle = rgba(pal.faint, ev.limits);
    for (const y of [base - TOL, base + TOL]) {
      const py = Math.round(y) + 0.5;
      ctx.beginPath();
      ctx.moveTo(0, py);
      ctx.lineTo(w, py);
      ctx.stroke();
    }
    ctx.restore();
  }

  ctx.strokeStyle = rgba(ev.color);
  path(ev.row, ev.dev);

  if (ev.label && ev.label.alpha > 0) {
    ctx.font = `10px ${pal.font}`;
    ctx.textAlign = "right";
    ctx.textBaseline = "bottom";
    const y = Math.max(12, base - ev.dev - value(ev.row, w) - 5);
    const tw = ctx.measureText(ev.label.text).width;
    ctx.fillStyle = rgba(pal.paper, ev.label.alpha);
    ctx.fillRect(w - tw - 6, y - 12, tw + 6, 13);
    ctx.fillStyle = rgba(ev.label.color, ev.label.alpha);
    ctx.fillText(ev.label.text, w - 2, y);
  }
}

// Event timeline (seconds from the event's start).
const T_RISE = 2.5;
const T_HOLD = T_RISE + 2;
const T_BACK = T_HOLD + 1.8;
const T_OK = T_BACK + 1.5;
const T_END = T_OK + 0.6;

const OUT = "Δ +4.2 K";
const BACK = "Δ 0.3 K ✓";

function eventAt(row: number, s: number, pal: Palette): EventState {
  if (s < T_RISE) {
    const k = easeInOut(s / T_RISE);
    return { row, dev: DEV * k, color: mix(pal.line, pal.signal, k), limits: k, label: null };
  }
  if (s < T_HOLD) {
    const a = clamp01((s - T_RISE) / 0.3);
    return { row, dev: DEV, color: pal.signal, limits: 1, label: { text: OUT, color: pal.signal, alpha: a } };
  }
  if (s < T_BACK) {
    const k = easeOut((s - T_HOLD) / (T_BACK - T_HOLD));
    return {
      row,
      dev: DEV * (1 - k),
      color: mix(pal.signal, pal.ok, k),
      limits: 1,
      label: { text: OUT, color: pal.signal, alpha: 1 - k },
    };
  }
  if (s < T_OK) {
    const a = clamp01((s - T_BACK) / 0.3);
    return { row, dev: 0, color: pal.ok, limits: 1, label: { text: BACK, color: pal.ok, alpha: a } };
  }
  const k = clamp01((s - T_OK) / (T_END - T_OK));
  return { row, dev: 0, color: mix(pal.ok, pal.line, k), limits: 1 - k, label: { text: BACK, color: pal.ok, alpha: 1 - k } };
}

// ─── Scenes: one per variant. `frame` draws the moving picture at running time t (s); `still` draws the
// two reduced-motion frames (the story, out of tolerance; and the corrected one). ───

type Ctx = CanvasRenderingContext2D;
type Scene = {
  resize: (w: number, h: number) => void;
  frame: (ctx: Ctx, t: number, pal: Palette) => void;
  still: (ctx: Ctx, which: "story" | "corrected", pal: Palette) => void;
};

function tracesScene(seed: number): Scene {
  const rnd = mulberry32(seed * 7919 + 1);
  let w = 0;
  let h = 0;
  let traces: Trace[] = [];
  let evRow = 0;
  let evStart = 4; // first event shortly after the field is seen

  // The event happens in the middle band of the field (never the top or bottom three rows), where the eye rests.
  const pickRow = () => {
    const lo = Math.max(3, Math.floor(traces.length * 0.3));
    const hi = Math.min(traces.length - 4, Math.ceil(traces.length * 0.7));
    return lo + Math.floor(rnd() * Math.max(1, hi - lo + 1));
  };

  return {
    resize(nw, nh) {
      w = nw;
      h = nh;
      const n = rowCount(h);
      if (n !== traces.length) {
        traces = makeTraces(n, seed);
        evRow = pickRow();
      }
    },
    frame(ctx, t, pal) {
      let ev: EventState | null = null;
      const s = t - evStart;
      if (s >= 0 && s < T_END) ev = eventAt(evRow, s, pal);
      else if (s >= T_END) {
        evStart += 13 + rnd() * 10; // 18 s ± 5 from one event's start to the next
        evRow = pickRow();
      }
      drawTraces(ctx, w, h, traces, t * DRIFT, ev, pal, seed);
    },
    still(ctx, which, pal) {
      const ev = eventAt(evRow, which === "story" ? T_HOLD - 0.01 : T_OK - 0.01, pal);
      drawTraces(ctx, w, h, traces, 0, ev, pal, seed);
    },
  };
}

// Control chart
const CH_EVERY = 0.6; // s per point
const CH_DX = 14; // px between points
const CH_LIMIT = 0.38; // control limits at ±38% of the height
const CH_CYCLE = 45; // about every 45th point breaks the upper limit: one on screen at a time
const CH_OUT = 13; // position of the out-of-control point in the cycle

function chartScene(seed: number): Scene {
  let w = 0;
  let h = 0;

  // Value of point n in units of the limit distance (±1 = the control limits). Deterministic per seed.
  const value = (n: number) => {
    const k = ((n % CH_CYCLE) + CH_CYCLE) % CH_CYCLE;
    if (k === CH_OUT) return 1.14 + 0.05 * hash(n, 1, seed);
    if (k === CH_OUT + 1) return 0.72 + 0.06 * hash(n, 2, seed);
    if (k === CH_OUT + 2) return 0.42 + 0.06 * hash(n, 3, seed);
    if (k === CH_OUT + 3) return 0.12 + 0.08 * hash(n, 4, seed);
    // Approximately normal (sum of three uniforms), σ = 1/3 of the limit, kept inside the limits.
    const z = (hash(n, 5, seed) + hash(n, 6, seed) + hash(n, 7, seed)) * 0.58; // σ ≈ 1
    return Math.max(-0.92, Math.min(0.92, z / 3));
  };

  const draw = (ctx: Ctx, t: number, pal: Palette) => {
    ctx.clearRect(0, 0, w, h);
    const mid = Math.round(h / 2) + 0.5;
    const lim = h * CH_LIMIT;
    const ucl = Math.round(mid - lim) + 0.5;
    const lcl = Math.round(mid + lim) + 0.5;
    const right = w - 10;

    ctx.lineWidth = 1;
    ctx.strokeStyle = rgba(pal.line);
    ctx.beginPath();
    ctx.moveTo(0, mid);
    ctx.lineTo(w, mid);
    ctx.stroke();

    ctx.save();
    ctx.setLineDash([2, 4]);
    ctx.strokeStyle = rgba(pal.faint);
    ctx.beginPath();
    ctx.moveTo(0, ucl);
    ctx.lineTo(w, ucl);
    ctx.moveTo(0, lcl);
    ctx.lineTo(w, lcl);
    ctx.stroke();
    ctx.restore();

    // Points: the newest sits at the right edge and the record slides left as new ones arrive.
    const newest = Math.floor(t / CH_EVERY);
    const slide = ((t - newest * CH_EVERY) / CH_EVERY) * CH_DX;
    const count = Math.ceil(w / CH_DX) + 2;
    const pts: { x: number; y: number; n: number }[] = [];
    for (let i = count; i >= 0; i--) {
      const n = newest - i;
      if (n < 0) continue;
      pts.push({ x: right - i * CH_DX - slide, y: mid - value(n) * lim, n });
    }

    ctx.strokeStyle = rgba(pal.line);
    ctx.beginPath();
    pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    ctx.stroke();

    for (const p of pts) {
      const out = Math.abs(value(p.n)) > 1;
      if (out) {
        // Hollow diamond, cut out of the connecting line.
        ctx.fillStyle = rgba(pal.paper);
        ctx.strokeStyle = rgba(pal.signal);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - 5);
        ctx.lineTo(p.x + 5, p.y);
        ctx.lineTo(p.x, p.y + 5);
        ctx.lineTo(p.x - 5, p.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillStyle = rgba(pal.ink2);
        ctx.fillRect(Math.round(p.x) - 1.5, Math.round(p.y) - 1.5, 3, 3);
      }
    }

    // Limit labels, on the sheet colour so the record passes under them.
    ctx.font = `10px ${pal.font}`;
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    for (const [label, y] of [
      ["UCL", ucl],
      ["LCL", lcl],
    ] as const) {
      const tw = ctx.measureText(label).width;
      ctx.fillStyle = rgba(pal.paper);
      ctx.fillRect(0, y - 13, tw + 6, 12);
      ctx.fillStyle = rgba(pal.faint);
      ctx.fillText(label, 0, y - 2);
    }
  };

  // Start partway into the first cycle so the field opens full and the first excursion comes in ~4 s.
  const T0 = (CH_CYCLE * 3 + CH_OUT - 7) * CH_EVERY;

  return {
    resize(nw, nh) {
      w = nw;
      h = nh;
    },
    frame(ctx, t, pal) {
      draw(ctx, T0 + t, pal);
    },
    still(ctx, which, pal) {
      // Story: the breaking point has just been written, a little in from the edge. Corrected: three more later.
      const n = CH_CYCLE * 4 + CH_OUT + (which === "story" ? 1 : 4);
      draw(ctx, n * CH_EVERY, pal);
    },
  };
}

// Wafer map
const WF_PITCH = 10;

type Die = { x: number; y: number; i: number; j: number };

function waferScene(seed: number): Scene {
  const rnd = mulberry32(seed * 104729 + 3);
  let w = 0;
  let h = 0;
  let dies: Die[] = [];
  let index = new Map<string, number>();
  let cx = 0;
  let cy = 0;
  let r = 0;
  let cluster: number[] = [];
  let evStart = 2;

  const pickCluster = () => {
    if (!dies.length) return [];
    // Start well inside the wafer; grow through 4-neighbours.
    const inner = dies.filter((d) => Math.hypot(d.x - cx, d.y - cy) < r * 0.7);
    const startDie = inner[Math.floor(rnd() * inner.length)] ?? dies[0];
    const size = 3 + Math.floor(rnd() * 4);
    const set = [index.get(`${startDie.i},${startDie.j}`)!];
    let guard = 0;
    while (set.length < size && guard++ < 50) {
      const from = dies[set[Math.floor(rnd() * set.length)]];
      const [di, dj] = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ][Math.floor(rnd() * 4)];
      const k = index.get(`${from.i + di},${from.j + dj}`);
      if (k !== undefined && !set.includes(k)) set.push(k);
    }
    return set;
  };

  // Colour of the flagged cluster at s seconds into its event: signal 3 s, ok 1 s, then back (250 ms responses).
  const clusterColor = (s: number, pal: Palette): RGB | null => {
    if (s < 0 || s > 4.25) return null;
    if (s < 0.25) return mix(pal.line, pal.signal, s / 0.25);
    if (s < 3) return pal.signal;
    if (s < 3.25) return mix(pal.signal, pal.ok, (s - 3) / 0.25);
    if (s < 4) return pal.ok;
    return mix(pal.ok, pal.line, (s - 4) / 0.25);
  };

  const draw = (ctx: Ctx, color: RGB | null, pal: Palette) => {
    ctx.clearRect(0, 0, w, h);

    // Outline with the orientation notch at the bottom, in the faint rule colour.
    const notch = Math.asin(Math.min(1, 6 / (r + 6)));
    ctx.lineWidth = 1;
    ctx.strokeStyle = rgba(pal.rule);
    ctx.beginPath();
    ctx.arc(cx, cy, r + 6, Math.PI / 2 + notch, Math.PI / 2 - notch + Math.PI * 2);
    ctx.lineTo(cx, cy + r);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = rgba(pal.line);
    const flagged = new Set(color ? cluster : []);
    dies.forEach((d, k) => {
      if (!flagged.has(k)) ctx.fillRect(d.x - 1, d.y - 1, 2, 2);
    });
    if (color) {
      ctx.fillStyle = rgba(color);
      for (const k of cluster) {
        const d = dies[k];
        ctx.fillRect(d.x - 1.5, d.y - 1.5, 3, 3);
      }
    }
  };

  return {
    resize(nw, nh) {
      if (nw === w && nh === h) return;
      w = nw;
      h = nh;
      cx = Math.round(w / 2);
      cy = Math.round(h / 2);
      r = 0.45 * Math.min(w, h);
      dies = [];
      index = new Map();
      const n = Math.floor(r / WF_PITCH);
      for (let i = -n; i <= n; i++) {
        for (let j = -n; j <= n; j++) {
          const x = cx + i * WF_PITCH;
          const y = cy + j * WF_PITCH;
          if (Math.hypot(x - cx, y - cy) > r - 3) continue;
          if (Math.hypot(x - cx, y - (cy + r)) < 9) continue; // the notch
          index.set(`${i},${j}`, dies.length);
          dies.push({ x, y, i, j });
        }
      }
      cluster = pickCluster();
    },
    frame(ctx, t, pal) {
      const s = t - evStart;
      if (s > 4.25) {
        evStart = t + 4 + rnd() * 3 - 4.25; // a new event 4–7 s after the last one began
        cluster = pickCluster();
      }
      draw(ctx, clusterColor(t - evStart, pal), pal);
    },
    still(ctx, which, pal) {
      draw(ctx, which === "story" ? pal.signal : pal.ok, pal);
    },
  };
}

const SCENES: Record<Variant, (seed: number) => Scene> = {
  traces: tracesScene,
  chart: chartScene,
  wafer: waferScene,
};

// ─── Component ───

export function SignalField({ variant, className, seed = 7, caption }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const aRef = useRef<HTMLCanvasElement>(null);
  const bRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const a = aRef.current;
    const b = bRef.current;
    if (!box || !a || !b) return;
    const ctxA = a.getContext("2d");
    const ctxB = b.getContext("2d");
    if (!ctxA || !ctxB) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = SCENES[variant](seed);
    let pal = readPalette(a);

    let raf = 0;
    let last = 0;
    let t = 0; // running seconds (only advances while visible)
    let onScreen = false;
    let fadeTimer = 0;
    let showCorrected = false;

    const size = () => {
      const rect = box.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      for (const [c, ctx] of [
        [a, ctxA],
        [b, ctxB],
      ] as const) {
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      pal = readPalette(a);
      scene.resize(w, h);
    };

    const drawStill = () => {
      // The story frame and the corrected frame, stacked for a cross-fade.
      scene.still(ctxA, "story", pal);
      scene.still(ctxB, "corrected", pal);
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (now - last < 1000 / FPS - 2) return;
      const dt = last ? Math.min(now - last, 100) / 1000 : 0;
      last = now;
      t += dt;
      scene.frame(ctxA, t, pal);
    };

    const start = () => {
      if (raf || reduced || !onScreen || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    size();
    if (reduced) {
      drawStill();
      fadeTimer = window.setInterval(() => {
        showCorrected = !showCorrected;
        b.style.opacity = showCorrected ? "1" : "0";
      }, 6000);
    } else {
      scene.frame(ctxA, 0, pal);
    }

    const ro = new ResizeObserver(() => {
      size();
      if (reduced) drawStill();
      else scene.frame(ctxA, t, pal);
    });
    ro.observe(box);

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) start();
        else stop();
      },
      { rootMargin: "100px" },
    );
    io.observe(box);

    // The reader switched sheets (day / night): re-read the tokens and repaint.
    const mo = new MutationObserver(() => {
      pal = readPalette(a);
      if (reduced) drawStill();
      else scene.frame(ctxA, t, pal);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-sheet"] });

    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      window.clearInterval(fadeTimer);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [variant, seed]);

  return (
    <div aria-hidden="true" className="pointer-events-none select-none">
      <div ref={boxRef} className={cn("relative", className)}>
        <canvas ref={aRef} className="absolute inset-0 h-full w-full font-mono" />
        <canvas
          ref={bRef}
          className="absolute inset-0 h-full w-full font-mono opacity-0"
          style={{ transition: "opacity 600ms var(--ease-draw)" }}
        />
      </div>
      {caption && (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.08em] text-faint">{caption}</p>
      )}
    </div>
  );
}
