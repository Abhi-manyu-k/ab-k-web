/*
 * X-ray, the drawing half (loaded on first use by XRay.tsx). One full-viewport SVG, rebuilt at most
 * once per frame while X-ray is on: no React, no per-frame state.
 *
 *   1. Container content edges, dashed, with the content width as a dimension across the top.
 *   2. Vertical gaps between consecutive [data-xray] parts (and a part's inset from its parent part).
 *   3. Type callouts for visible h1, h2 and .lead, from computed style.
 *   4. Token legend, bottom left.            5. Title block, bottom right.
 *
 * Below 640px only 2 and 3 are drawn.
 */

const MIN_GAP = 24;
const MAX_GAPS = 12;
const MAX_CALLOUTS = 6;
const MONO = 0.6; // IBM Plex Mono advance, in em

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
const r1 = (n: number) => Math.round(n * 2) / 2; // half pixels keep 1px strokes crisp
const textW = (s: string, size: number) => s.length * size * MONO;

/** A label on a sheet-coloured backing so it reads over anything. */
function label(x: number, y: number, s: string, opts: { size?: number; anchor?: "start" | "end" | "middle"; cls?: string } = {}) {
  const size = opts.size ?? 10;
  const anchor = opts.anchor ?? "start";
  const w = textW(s, size) + 8;
  const bx = anchor === "start" ? x - 4 : anchor === "end" ? x - w + 4 : x - w / 2;
  return (
    `<rect class="xr-bg" x="${r1(bx)}" y="${r1(y - size - 2)}" width="${Math.ceil(w)}" height="${size + 7}"/>` +
    `<text class="${opts.cls ?? "xr-t"}" x="${r1(x)}" y="${r1(y)}" font-size="${size}" text-anchor="${anchor}">${esc(s)}</text>`
  );
}

/** A vertical dimension line from y1 to y2 at x, ticks at both ends, the value beside it. */
function vDim(x: number, y1: number, y2: number, side: "left" | "right", top: number, vh: number) {
  const v = String(Math.round(y2 - y1));
  const lx = side === "left" ? x - 7 : x + 7;
  // Only the part of the line on screen (below the header) is drawn; ticks mark the ends that are in view.
  const a = Math.max(y1, top);
  const b = Math.min(y2, vh);
  const ly = (a + b) / 2;
  const ticks = (y1 >= top ? `M${r1(x - 4)} ${r1(y1)}h8` : "") + (y2 <= vh ? `M${r1(x - 4)} ${r1(y2)}h8` : "");
  return (
    `<path class="xr-dim xr-draw" pathLength="1" d="M${r1(x)} ${r1(a)}V${r1(b)}"/>` +
    (ticks ? `<path class="xr-dim" d="${ticks}"/>` : "") +
    label(lx, ly + 4, v, { anchor: side === "left" ? "end" : "start", cls: "xr-t xr-sig" })
  );
}

function family(ff: string) {
  if (/fraunces/i.test(ff)) return "Fraunces";
  if (/code|mono/i.test(ff)) return "Plex Mono";
  return "Plex Sans";
}

function typeSpec(el: Element) {
  const cs = getComputedStyle(el);
  const size = parseFloat(cs.fontSize);
  const lh = cs.lineHeight === "normal" ? size * 1.2 : parseFloat(cs.lineHeight);
  const lsPx = cs.letterSpacing === "normal" ? 0 : parseFloat(cs.letterSpacing);
  const em = Math.round((lsPx / size) * 1000) / 1000;
  const ls = em === 0 ? "0" : `${em < 0 ? "−" : ""}${Math.abs(em)}em`;
  const tag = el.matches(".lead") ? "lead" : el.tagName.toLowerCase();
  return `${tag} · ${family(cs.fontFamily)} ${cs.fontWeight} · ${Math.round(size)}/${Math.round(lh)} · ${ls}`;
}

function tokenHex(name: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || "—";
}

function build(): string {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const narrow = vw < 640;
  const top = Math.max(0, document.querySelector("header")?.getBoundingClientRect().bottom ?? 0);
  const visible = (r: DOMRect) => r.height > 0 && r.bottom > top && r.top < vh;
  let out = "";

  // ─── 1. Container edges ───
  let L = 20;
  let R = vw - 20;
  const containers = [...document.querySelectorAll<HTMLElement>("main [data-container], footer [data-container]")];
  const c = containers.find((el) => visible(el.getBoundingClientRect()));
  if (c) {
    const r = c.getBoundingClientRect();
    const cs = getComputedStyle(c);
    L = r.left + parseFloat(cs.paddingLeft);
    R = r.right - parseFloat(cs.paddingRight);
  }
  if (!narrow) {
    const y = top + 22;
    out +=
      `<path class="xr-edge" d="M${r1(L)} ${r1(top)}V${vh}M${r1(R)} ${r1(top)}V${vh}"/>` +
      `<path class="xr-dim xr-draw" pathLength="1" d="M${r1(L)} ${y}H${r1(R)}"/>` +
      `<path class="xr-dim" d="M${r1(L)} ${y - 4}v8M${r1(R)} ${y - 4}v8"/>` +
      label((L + R) / 2, y + 4, `${Math.round(R - L)} · container`, { anchor: "middle", cls: "xr-t xr-sig" });
  }

  // ─── 2. Gaps ───
  const parts = [...document.querySelectorAll<HTMLElement>("[data-xray]")]
    .map((el) => ({ el, r: el.getBoundingClientRect() }))
    .filter((p) => p.r.height > 0)
    .sort((a, b) => a.r.top - b.r.top);
  type Gap = { y1: number; y2: number; side: "left" | "right" };
  const gaps: Gap[] = [];
  const seen = new Set<string>();
  const add = (y1: number, y2: number, side: Gap["side"]) => {
    if (y2 - y1 < MIN_GAP) return;
    const a = Math.max(y1, top);
    const b = Math.min(y2, vh);
    if (b - a < 12) return; // too little of it on screen to read
    const key = `${Math.round(y1)}:${Math.round(y2)}`;
    if (seen.has(key)) return;
    seen.add(key);
    gaps.push({ y1, y2, side });
  };
  for (const a of parts) {
    // The next part that starts below this one and is not inside it.
    const b = parts.find((p) => p !== a && !a.el.contains(p.el) && !p.el.contains(a.el) && p.r.top >= a.r.bottom - 0.5);
    if (b) add(a.r.bottom, b.r.top, "right");
    // Inset from the enclosing part (a section's top padding).
    const parent = a.el.parentElement?.closest<HTMLElement>("[data-xray]");
    if (parent) add(parent.getBoundingClientRect().top, a.r.top, "left");
  }
  gaps.sort((a, b) => a.y1 - b.y1);
  for (const g of gaps.slice(0, MAX_GAPS)) {
    const x = g.side === "right" ? (narrow ? R - 4 : R + 18) : narrow ? L + 4 : L - 18;
    // Labels face the content on wide screens and away from the edge on narrow ones; either way, inwards.
    out += vDim(x, g.y1, g.y2, g.side === "right" ? "left" : "right", top, vh);
  }

  // ─── 3. Type callouts ───
  let n = 0;
  for (const el of document.querySelectorAll<HTMLElement>("main h1, main h2, main .lead")) {
    if (n >= MAX_CALLOUTS) break;
    const range = document.createRange();
    range.selectNodeContents(el);
    const b = range.getBoundingClientRect();
    if (!visible(b) || b.width === 0) continue;
    n++;
    const spec = typeSpec(el);
    const ly = b.top - 8 > top + 36 ? b.top - 8 : b.bottom + 16;
    out +=
      `<rect class="xr-box" x="${r1(b.left)}" y="${r1(b.top)}" width="${Math.round(b.width)}" height="${Math.round(b.height)}"/>` +
      label(Math.max(L, b.left), ly, spec);
  }

  if (!narrow) {
    // ─── 4. Token legend ───
    const tokens = ["paper", "ink", "line", "signal", "ok"].map((t) => [t, tokenHex(`--color-${t}`)] as const);
    const rowH = 16;
    const lw = 128;
    const lh = tokens.length * rowH + 26;
    const lx = 16;
    const ly = vh - 16 - lh;
    out += `<rect class="xr-panel" x="${lx}.5" y="${ly}.5" width="${lw}" height="${lh}"/>`;
    out += `<text class="xr-t xr-mut" x="${lx + 10}" y="${ly + 16}" font-size="9">TOKENS</text>`;
    tokens.forEach(([name, hex], i) => {
      const y = ly + 26 + i * rowH;
      out +=
        `<rect class="xr-sw" x="${lx + 10}.5" y="${y}.5" width="9" height="9" style="fill:var(--color-${name})"/>` +
        `<text class="xr-t" x="${lx + 26}" y="${y + 9}" font-size="10">${name}</text>` +
        `<text class="xr-t xr-mut" x="${lx + lw - 10}" y="${y + 9}" font-size="10" text-anchor="end">${esc(hex)}</text>`;
    });

    // ─── 5. Title block ───
    const dpr = Math.round((window.devicePixelRatio || 1) * 100) / 100;
    const tb = `X-RAY · viewport ${vw} × ${vh} · DPR ${dpr} · sheet ${location.pathname}`;
    const tw = Math.ceil(textW(tb, 10)) + 20;
    const tx = vw - 16 - tw;
    const ty = vh - 16 - 26;
    out +=
      `<rect class="xr-panel" x="${tx}.5" y="${ty}.5" width="${tw}" height="26"/>` +
      `<text class="xr-t" x="${tx + 10}" y="${ty + 17}" font-size="10">${esc(tb)}</text>`;
  }

  return out;
}

/** Draws now and on every scroll / resize (one pass per frame) until the returned stop() is called. */
export function start(svg: SVGSVGElement): () => void {
  let raf = 0;
  const draw = () => {
    raf = 0;
    svg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);
    svg.innerHTML = build();
  };
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(draw);
  };

  // The first drawing is plotted (lines draw in); redraws while scrolling are instant.
  svg.classList.add("xray-intro");
  const intro = window.setTimeout(() => svg.classList.remove("xray-intro"), 700);
  draw();

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  return () => {
    cancelAnimationFrame(raf);
    window.clearTimeout(intro);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    svg.classList.remove("xray-intro");
    svg.innerHTML = "";
  };
}
