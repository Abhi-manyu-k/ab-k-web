"use client";

import { useEffect, useReducer, useRef } from "react";
import { cn } from "@/lib/utils";

/* Top view of a wafer-processing cluster tool, drawn like an assembly drawing. */

const W = 640;
const H = 470;
const CX = 320;
const CY = 205;
const HEX_R = 76;
const FACE = HEX_R * Math.cos(Math.PI / 6);
const PM_HALF = 42;
const PM_DIST = FACE + 10 + PM_HALF;

const modules = [
  { id: "PM1", angle: 150 },
  { id: "PM2", angle: 210 },
  { id: "PM3", angle: 270 },
  { id: "PM4", angle: 330 },
  { id: "PM5", angle: 30 },
];
const FAULT = "PM3";
const FAULT_ANGLE = 270;
const IDLE_ROUTE = [150, 210, 330, 30, 90];
const HOP_MS = 1050;
const APPROVE_AT_MS = 1500;

const steps = [
  { id: "monitor", label: "Monitoring", detail: "5 modules · 142 signals", ms: 4200 },
  { id: "anomaly", label: "Anomaly", detail: "PM3 heater zone 2 · Δ +4.2 K vs. recipe", ms: 2400 },
  { id: "diagnose", label: "Diagnosis", detail: "Thermocouple drift · SOP 114 §3.2 · 3 similar tickets", ms: 2800 },
  { id: "propose", label: "Proposed action", detail: "Apply TC offset −4.0 K, run one dummy wafer", ms: 2600 },
  { id: "approve", label: "Approval", detail: "J. Schmidt, service lead", ms: 3000 },
  { id: "execute", label: "Executed & verified", detail: "Δ 0.3 K · ticket closed · audit #20931", ms: 3600 },
] as const;
const APPROVE = steps.findIndex((s) => s.id === "approve");
const EXECUTE = steps.findIndex((s) => s.id === "execute");

const hexPoints = Array.from({ length: 6 }, (_, i) => {
  const a = (Math.PI / 3) * i;
  return `${CX + HEX_R * Math.cos(a)},${CY + HEX_R * Math.sin(a)}`;
}).join(" ");

/* ─── Phase loop ─── */

type Event = "hop" | "approve" | "next";
type State = { phase: number; hop: number; approved: boolean; angle: number; still: boolean };
type Action = { type: Event } | { type: "still" } | { type: "reset" };

/** Events within one phase, as offsets (ms) from the phase start. The last one is always "next". */
function timeline(phase: number): { at: number; type: Event }[] {
  const ms = steps[phase].ms;
  if (phase === 0) {
    const hops = Array.from({ length: Math.ceil(ms / HOP_MS) - 1 }, (_, i) => ({ at: HOP_MS * (i + 1), type: "hop" as const }));
    return [...hops, { at: ms, type: "next" }];
  }
  if (phase === APPROVE) return [{ at: APPROVE_AT_MS, type: "approve" }, { at: ms, type: "next" }];
  return [{ at: ms, type: "next" }];
}

/** Turn the accumulated angle the short way round to `target` (degrees). */
function turnTo(angle: number, target: number) {
  const delta = ((((target - angle) % 360) + 540) % 360) - 180;
  return angle + delta;
}

const robotTarget = (phase: number, hop: number) => (phase === 0 ? IDLE_ROUTE[hop % IDLE_ROUTE.length] : FAULT_ANGLE);

const initialState: State = { phase: 0, hop: 0, approved: false, angle: IDLE_ROUTE[0], still: false };

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "hop": {
      const hop = s.hop + 1;
      return { ...s, hop, angle: turnTo(s.angle, robotTarget(s.phase, hop)) };
    }
    case "approve":
      return { ...s, approved: true };
    case "next": {
      const phase = (s.phase + 1) % steps.length;
      return { ...s, phase, approved: false, angle: turnTo(s.angle, robotTarget(phase, s.hop)) };
    }
    case "still":
      // Reduced motion: hold the approval step, everything visible.
      return { ...s, phase: APPROVE, approved: true, still: true, angle: turnTo(s.angle, FAULT_ANGLE) };
    case "reset":
      return { ...initialState, hop: s.hop, angle: turnTo(s.angle, robotTarget(0, s.hop)) };
  }
}

/* ─── Drawing parts ─── */

function Balloon({ n, x, y, tx, ty, delay }: { n: number; x: number; y: number; tx: number; ty: number; delay: number }) {
  const len = Math.ceil(Math.hypot(x - tx, y - ty)) + 1;
  return (
    <g className="text-ink" style={{ ["--d" as string]: `${delay}ms` }}>
      {/* The leader is drawn from the part out to its balloon. */}
      <line
        x1={tx}
        y1={ty}
        x2={x}
        y2={y}
        stroke="currentColor"
        strokeWidth="0.6"
        className="md-leader"
        style={{ ["--len" as string]: len }}
      />
      <circle cx={tx} cy={ty} r="1.8" fill="currentColor" className="md-leader-dot" />
      <g className="md-balloon">
        <circle cx={x} cy={y} r="10" fill="var(--color-paper)" stroke="currentColor" strokeWidth="0.8" />
        <text x={x} y={y + 3.2} textAnchor="middle" className="fill-current font-mono text-[9px]">
          {n}
        </text>
      </g>
    </g>
  );
}

export function MachineDrawing() {
  const [{ phase, approved, angle, still }, dispatch] = useReducer(reducer, initialState);
  const rootRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const crossRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef(0);

  // Phase loop: one timer at a time, paused off-screen / in a hidden tab, none with reduced motion.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let phase = 0; // mirrors the reducer's phase
    let idx = 0; // next event in timeline(phase)
    let elapsed = 0; // ms of the current phase run before the last resume
    let resumedAt = 0;
    let running = false;
    let inView = false;
    let timer: number | undefined;

    const schedule = () => {
      window.clearTimeout(timer);
      const ev = timeline(phase)[idx];
      const spent = elapsed + (performance.now() - resumedAt);
      timer = window.setTimeout(fire, Math.max(0, ev.at - spent));
    };

    const fire = () => {
      timer = undefined;
      if (!running) return;
      const ev = timeline(phase)[idx];
      dispatch({ type: ev.type });
      if (ev.type === "next") {
        phase = (phase + 1) % steps.length;
        idx = 0;
        elapsed = 0;
        resumedAt = performance.now();
      } else {
        idx += 1;
      }
      schedule();
    };

    const start = () => {
      if (running) return;
      running = true;
      resumedAt = performance.now();
      root.dataset.running = "";
      schedule();
    };

    const stop = () => {
      if (!running) return;
      running = false;
      window.clearTimeout(timer);
      timer = undefined;
      elapsed += performance.now() - resumedAt;
      delete root.dataset.running;
    };

    const update = () => {
      if (inView && document.visibilityState === "visible" && !motion.matches) start();
      else stop();
    };

    const onMotionChange = () => {
      stop();
      phase = 0;
      idx = 0;
      elapsed = 0;
      dispatch({ type: motion.matches ? "still" : "reset" });
      update();
    };

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    io.observe(root);
    document.addEventListener("visibilitychange", update);
    motion.addEventListener("change", onMotionChange);
    if (motion.matches) dispatch({ type: "still" });

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  // CAD crosshair: written straight to the DOM, no re-render.
  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const box = boxRef.current;
      const cross = crossRef.current;
      const label = labelRef.current;
      if (!box || !cross || !label) return;
      const r = box.getBoundingClientRect();
      const px = clientX - r.left;
      const py = clientY - r.top;
      cross.style.setProperty("--cx", `${px}px`);
      cross.style.setProperty("--cy", `${py}px`);
      label.textContent = `X ${((px / r.width) * W).toFixed(1)} Y ${((py / r.height) * H).toFixed(1)}`;
      cross.dataset.on = "";
    });
  }

  function onLeave() {
    cancelAnimationFrame(frameRef.current);
    if (crossRef.current) delete crossRef.current.dataset.on;
  }

  const faultOn = phase >= 1;
  const resolved = phase === EXECUTE;
  const pm3State = resolved ? "ok" : faultOn ? "fault" : "idle";

  return (
    <div
      ref={rootRef}
      data-still={still || undefined}
      className="md grid gap-0 border-t rule-ink lg:grid-cols-[1fr_minmax(16rem,20rem)] lg:border-t-0"
    >
      {/* Drawing */}
      <div
        ref={boxRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="relative cursor-crosshair select-none overflow-hidden"
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full"
          role="img"
          aria-label="Illustrative technical drawing of a semiconductor cluster tool, not a live system. In the animation an AI service agent detects a temperature deviation in process module 3, diagnoses it, proposes a fix, waits for engineer approval, then executes and verifies it."
        >
          <defs>
            <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="var(--color-signal)" strokeWidth="1" />
            </pattern>
            <marker id="arr" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 2 L10 5 L0 8 z" fill="var(--color-ink)" />
            </marker>
            {/* The centre lines are dash-dot, so they are drawn through a solid line in a mask. */}
            <mask id="md-centre-pen" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
              <g stroke="#fff" strokeWidth="4" fill="none">
                <line x1={CX} y1="12" x2={CX} y2={H - 60} className="md-pen" style={{ ["--len" as string]: H - 72 }} />
                <line x1="40" y1={CY} x2={W - 40} y2={CY} className="md-pen" style={{ ["--len" as string]: W - 80 }} />
              </g>
            </mask>
          </defs>

          {/* Centre lines */}
          <g stroke="var(--color-line-strong)" strokeWidth="0.6" strokeDasharray="16 3 2 3" mask="url(#md-centre-pen)">
            <line x1={CX} y1="12" x2={CX} y2={H - 60} />
            <line x1="40" y1={CY} x2={W - 40} y2={CY} />
          </g>

          <g fill="none" stroke="var(--color-ink)" strokeLinejoin="round">
            {/* Transfer chamber */}
            <polygon points={hexPoints} strokeWidth="1.4" className="draw" style={{ ["--len" as string]: 480 }} />
            <circle cx={CX} cy={CY} r="46" strokeWidth="0.6" strokeDasharray="3 3" />

            {/* Process modules */}
            {modules.map((m, i) => {
              const isFault = m.id === FAULT;
              return (
                <g
                  key={m.id}
                  transform={`translate(${CX} ${CY}) rotate(${m.angle}) translate(${PM_DIST} 0)`}
                  className={isFault ? "md-pm3" : undefined}
                  data-state={isFault ? pm3State : undefined}
                  data-pulse={isFault && faultOn && phase <= APPROVE ? "" : undefined}
                >
                  {isFault && <circle r="44" strokeWidth="1" stroke="var(--color-signal)" className="md-pulse" />}
                  <rect x={-PM_HALF - 10} y="-13" width="10" height="26" strokeWidth="1" fill="var(--color-paper)" />
                  <rect
                    x={-PM_HALF}
                    y={-PM_HALF}
                    width={PM_HALF * 2}
                    height={PM_HALF * 2}
                    rx="3"
                    strokeWidth="1.4"
                    className={cn("draw", isFault && "md-pm3-body")}
                    style={{ ["--len" as string]: 360, ["--delay" as string]: `${0.15 * i}s` }}
                    fill="var(--color-paper)"
                    stroke="var(--color-ink)"
                  />
                  {isFault && (
                    <rect
                      x={-PM_HALF}
                      y={-PM_HALF}
                      width={PM_HALF * 2}
                      height={PM_HALF * 2}
                      rx="3"
                      stroke="none"
                      fill="url(#hatch)"
                      className="md-pm3-hatch"
                    />
                  )}
                  <circle r="30" strokeWidth="1" fill="var(--color-paper)" />
                  <circle r="25" strokeWidth="0.5" strokeDasharray="2 2" />
                  {[0, 120, 240].map((a) => (
                    <circle
                      key={a}
                      cx={15 * Math.cos((a * Math.PI) / 180)}
                      cy={15 * Math.sin((a * Math.PI) / 180)}
                      r="5"
                      strokeWidth="0.6"
                    />
                  ))}
                  <text
                    transform={`rotate(${-m.angle})`}
                    textAnchor="middle"
                    y="3"
                    stroke="none"
                    className={cn("fill-ink font-mono text-[8px]", isFault && "md-pm3-label")}
                  >
                    {m.id}
                  </text>
                </g>
              );
            })}

            {/* Load locks */}
            <g transform={`translate(${CX} ${CY}) rotate(90) translate(${FACE + 8 + 26} 0)`}>
              <rect x="-26" y="-40" width="52" height="80" strokeWidth="1.4" fill="var(--color-paper)" />
              <line x1="-26" y1="0" x2="26" y2="0" strokeWidth="1" />
              <circle cx="0" cy="-20" r="12" strokeWidth="0.6" />
              <circle cx="0" cy="20" r="12" strokeWidth="0.6" />
            </g>

            {/* EFEM + FOUPs */}
            <rect x="196" y="346" width="248" height="44" strokeWidth="1.4" fill="var(--color-paper)" />
            <line x1="206" y1="368" x2="434" y2="368" strokeWidth="0.6" strokeDasharray="5 3" />
            <circle cx="320" cy="368" r="7" strokeWidth="1" fill="var(--color-paper)" />
            {[222, 302, 382].map((x) => (
              <rect key={x} x={x} y="398" width="36" height="26" strokeWidth="1" fill="var(--color-paper)" />
            ))}
          </g>

          {/* Transfer robot: the accumulated angle always turns the short way round. */}
          <g className="md-robot" style={{ transform: `rotate(${angle}deg)`, transformOrigin: `${CX}px ${CY}px` }}>
            <g fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="1.2">
              <rect x={CX} y={CY - 5} width="58" height="10" rx="5" />
              <path d={`M${CX + 58} ${CY - 9} h26 M${CX + 58} ${CY + 9} h26 M${CX + 56} ${CY - 9} v18`} fill="none" />
              <circle cx={CX} cy={CY} r="16" />
              <circle cx={CX} cy={CY} r="5" />
            </g>
          </g>

          {/* Fault callout */}
          <g className="md-callout" data-on={faultOn || undefined} data-state={resolved ? "ok" : undefined}>
            <line x1="278" y1="66" x2="236" y2="34" stroke="var(--color-signal)" strokeWidth="0.8" />
            <line x1="236" y1="34" x2="130" y2="34" stroke="var(--color-signal)" strokeWidth="0.8" />
            <text x="132" y="28" className="md-callout-text font-mono text-[9px]">
              {resolved ? "PM3 · Δ 0.3 K ✓" : "PM3 · Δ +4.2 K"}
            </text>
          </g>

          {/* Dimensions */}
          <g stroke="var(--color-ink)" strokeWidth="0.6">
            <line x1="196" y1="440" x2="196" y2="452" />
            <line x1="444" y1="440" x2="444" y2="452" />
            <line x1="198" y1="448" x2="442" y2="448" markerStart="url(#arr)" markerEnd="url(#arr)" />
          </g>
          <text x={CX} y="462" textAnchor="middle" className="fill-ink font-mono text-[9px]">
            1 850
          </text>

          {/* Balloons */}
          <Balloon n={1} x={446} y={16} tx={338} ty={188} delay={900} />
          <Balloon n={2} x={60} y={70} tx={196} ty={128} delay={1020} />
          <Balloon n={3} x={560} y={330} tx={352} ty={312} delay={1140} />
          <Balloon n={4} x={60} y={372} tx={196} ty={368} delay={1260} />
          <Balloon n={5} x={560} y={412} tx={418} ty={411} delay={1380} />
        </svg>

        {/* CAD crosshair */}
        <div ref={crossRef} aria-hidden="true" className="md-cross pointer-events-none absolute inset-0">
          <div className="md-cross-x absolute inset-y-0 left-0 w-px bg-signal/40" />
          <div className="md-cross-y absolute inset-x-0 top-0 h-px bg-signal/40" />
          <span ref={labelRef} className="md-cross-label absolute left-0 top-0 bg-paper px-1 font-mono text-[10px] text-signal" />
        </div>

        <p className="px-3 pb-3 font-mono text-[9px] uppercase tracking-[0.12em] text-faint sm:absolute sm:bottom-2 sm:left-3 sm:p-0">
          1 transfer robot · 2 process module · 3 load lock · 4 EFEM · 5 FOUP
        </p>
      </div>

      {/* Agent log */}
      <div className="flex flex-col border-t rule-ink lg:border-l lg:border-t-0">
        <div className="flex items-center justify-between border-b rule-ink px-4 py-2.5">
          <span className="note !text-ink">Service agent · log</span>
          <span
            className="flex items-center gap-1.5 border border-ink px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-ink"
            title="An illustrative animation, not a live production system"
          >
            <span className="h-1.5 w-1.5 bg-signal animate-blink" aria-hidden="true" />
            Illustrative
          </span>
        </div>
        <ol className="flex-1 divide-y divide-line">
          {steps.map((s, i) => {
            const state = i < phase ? "done" : i === phase ? "active" : "todo";
            const signed = state === "done" || approved;
            return (
              <li
                key={s.id}
                data-state={state}
                className="md-step relative grid grid-cols-[1.5rem_1fr] gap-2 px-4 py-2.5"
                style={{ ["--ms" as string]: `${s.ms}ms` }}
              >
                <span className="md-check mt-0.5 flex h-4 w-4 items-center justify-center border font-mono text-[9px]">
                  {state === "done" ? "✓" : i + 1}
                </span>
                <span className="min-w-0">
                  <span className="md-label block text-[0.8125rem] font-medium">{s.label}</span>
                  {/* Always in the layout, so the log never changes height. */}
                  <span className="md-detail block">
                    <span className="block font-mono text-[10px] leading-snug text-muted">{s.detail}</span>
                    {i === APPROVE && (
                      <span
                        className="md-signoff mt-2 inline-grid border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em]"
                        data-signed={signed || undefined}
                      >
                        <span className="md-signoff-wait col-start-1 row-start-1" aria-hidden={signed}>
                          Awaiting sign-off
                        </span>
                        <span className="md-signoff-ok col-start-1 row-start-1" aria-hidden={!signed}>
                          ✓ Approved
                        </span>
                      </span>
                    )}
                  </span>
                </span>
                <span aria-hidden="true" className="md-progress" />
              </li>
            );
          })}
        </ol>
        <div className="border-t rule-ink px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
          Autonomy <span className="text-ink">L2</span> · acts with approval
        </div>
      </div>
    </div>
  );
}
