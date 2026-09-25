"use client";

import { useEffect, useRef, useState } from "react";
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
const IDLE_ROUTE = [150, 210, 330, 30, 90];

const steps = [
  { id: "monitor", label: "Monitoring", detail: "5 modules · 142 signals", ms: 4200 },
  { id: "anomaly", label: "Anomaly", detail: "PM3 heater zone 2 · Δ +4.2 K vs. recipe", ms: 2400 },
  { id: "diagnose", label: "Diagnosis", detail: "Thermocouple drift · SOP 114 §3.2 · 3 similar tickets", ms: 2800 },
  { id: "propose", label: "Proposed action", detail: "Apply TC offset −4.0 K, run one dummy wafer", ms: 2600 },
  { id: "approve", label: "Approval", detail: "J. Schmidt, service lead", ms: 3000 },
  { id: "execute", label: "Executed & verified", detail: "Δ 0.3 K · ticket closed · audit #20931", ms: 3600 },
] as const;

const hexPoints = Array.from({ length: 6 }, (_, i) => {
  const a = (Math.PI / 3) * i;
  return `${CX + HEX_R * Math.cos(a)},${CY + HEX_R * Math.sin(a)}`;
}).join(" ");

function Balloon({ n, x, y, tx, ty }: { n: number; x: number; y: number; tx: number; ty: number }) {
  return (
    <g className="text-ink">
      <line x1={x} y1={y} x2={tx} y2={ty} stroke="currentColor" strokeWidth="0.6" />
      <circle cx={tx} cy={ty} r="1.8" fill="currentColor" />
      <circle cx={x} cy={y} r="10" fill="var(--color-paper)" stroke="currentColor" strokeWidth="0.8" />
      <text x={x} y={y + 3.2} textAnchor="middle" className="fill-current font-mono text-[9px]">
        {n}
      </text>
    </g>
  );
}

export function MachineDrawing() {
  const [phase, setPhase] = useState(0);
  const [hop, setHop] = useState(0);
  const [approved, setApproved] = useState(false);
  const [cursor, setCursor] = useState<{ x: number; y: number; px: number; py: number } | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // Phase loop.
  useEffect(() => {
    const t = window.setTimeout(() => {
      setPhase((p) => (p + 1) % steps.length);
      setApproved(false);
    }, steps[phase].ms);
    let a: number | undefined;
    if (steps[phase].id === "approve") a = window.setTimeout(() => setApproved(true), 1500);
    return () => {
      window.clearTimeout(t);
      if (a) window.clearTimeout(a);
    };
  }, [phase]);

  // Robot hops between modules while monitoring.
  useEffect(() => {
    if (phase !== 0) return;
    const id = window.setInterval(() => setHop((h) => h + 1), 1050);
    return () => window.clearInterval(id);
  }, [phase]);

  const faultOn = phase >= 1;
  const robotAngle = phase === 0 ? IDLE_ROUTE[hop % IDLE_ROUTE.length] : 270;
  const resolved = phase === steps.length - 1;

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || !boxRef.current) return;
    const r = boxRef.current.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    setCursor({ px, py, x: (px / r.width) * W, y: (py / r.height) * H });
  }

  return (
    <div className="grid gap-0 border-t rule-ink lg:grid-cols-[1fr_minmax(16rem,20rem)] lg:border-t-0">
      {/* Drawing */}
      <div
        ref={boxRef}
        onPointerMove={onMove}
        onPointerLeave={() => setCursor(null)}
        className="relative cursor-crosshair select-none overflow-hidden"
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full"
          role="img"
          aria-label="Technical drawing of a semiconductor cluster tool. An AI service agent detects a temperature deviation in process module 3, diagnoses it, proposes a fix, waits for engineer approval, then executes and verifies it."
        >
          <defs>
            <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="var(--color-signal)" strokeWidth="1" />
            </pattern>
            <marker id="arr" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 2 L10 5 L0 8 z" fill="var(--color-ink)" />
            </marker>
          </defs>

          {/* Centre lines */}
          <g stroke="var(--color-line-strong)" strokeWidth="0.6" strokeDasharray="16 3 2 3">
            <line x1={CX} y1="12" x2={CX} y2={H - 60} />
            <line x1="40" y1={CY} x2={W - 40} y2={CY} />
          </g>

          <g fill="none" stroke="var(--color-ink)" strokeLinejoin="round">
            {/* Transfer chamber */}
            <polygon points={hexPoints} strokeWidth="1.4" className="draw" style={{ ["--len" as string]: 480 }} />
            <circle cx={CX} cy={CY} r="46" strokeWidth="0.6" strokeDasharray="3 3" />

            {/* Process modules */}
            {modules.map((m, i) => {
              const isFault = m.id === FAULT && faultOn;
              return (
                <g key={m.id} transform={`translate(${CX} ${CY}) rotate(${m.angle}) translate(${PM_DIST} 0)`}>
                  <rect x={-PM_HALF - 10} y="-13" width="10" height="26" strokeWidth="1" fill="var(--color-paper)" />
                  <rect
                    x={-PM_HALF}
                    y={-PM_HALF}
                    width={PM_HALF * 2}
                    height={PM_HALF * 2}
                    rx="3"
                    strokeWidth="1.4"
                    className="draw"
                    style={{ ["--len" as string]: 360, ["--delay" as string]: `${0.15 * i}s` }}
                    fill={isFault && !resolved ? "url(#hatch)" : "var(--color-paper)"}
                    stroke={isFault && !resolved ? "var(--color-signal)" : "var(--color-ink)"}
                  />
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
                    className={cn("font-mono text-[8px]", isFault && !resolved ? "fill-signal" : "fill-ink")}
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

          {/* Transfer robot */}
          <g
            style={{
              transform: `rotate(${robotAngle}deg)`,
              transformOrigin: `${CX}px ${CY}px`,
              transition: "transform 0.9s cubic-bezier(0.65, 0, 0.35, 1)",
            }}
          >
            <g fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="1.2">
              <rect x={CX} y={CY - 5} width="58" height="10" rx="5" />
              <path d={`M${CX + 58} ${CY - 9} h26 M${CX + 58} ${CY + 9} h26 M${CX + 56} ${CY - 9} v18`} fill="none" />
              <circle cx={CX} cy={CY} r="16" />
              <circle cx={CX} cy={CY} r="5" />
            </g>
          </g>

          {/* Fault callout */}
          {faultOn && (
            <g className="fade-up" key={`callout-${phase >= 1}`}>
              <line x1="278" y1="66" x2="236" y2="34" stroke="var(--color-signal)" strokeWidth="0.8" />
              <line x1="236" y1="34" x2="130" y2="34" stroke="var(--color-signal)" strokeWidth="0.8" />
              <text x="132" y="28" className={cn("font-mono text-[9px]", resolved ? "fill-ok" : "fill-signal")}>
                {resolved ? "PM3 · Δ 0.3 K ✓" : "PM3 · Δ +4.2 K"}
              </text>
            </g>
          )}

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
          <Balloon n={1} x={446} y={16} tx={338} ty={188} />
          <Balloon n={2} x={60} y={70} tx={196} ty={128} />
          <Balloon n={3} x={560} y={330} tx={352} ty={312} />
          <Balloon n={4} x={60} y={372} tx={196} ty={368} />
          <Balloon n={5} x={560} y={412} tx={418} ty={411} />
        </svg>

        {/* CAD crosshair */}
        {cursor && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute inset-y-0 w-px bg-signal/40" style={{ left: cursor.px }} />
            <div className="absolute inset-x-0 h-px bg-signal/40" style={{ top: cursor.py }} />
            <span
              className="absolute bg-paper px-1 font-mono text-[10px] text-signal"
              style={{ left: cursor.px + 8, top: cursor.py + 6 }}
            >
              X {cursor.x.toFixed(1)} Y {cursor.y.toFixed(1)}
            </span>
          </div>
        )}

        <p className="px-3 pb-3 font-mono text-[9px] uppercase tracking-[0.12em] text-faint sm:absolute sm:bottom-2 sm:left-3 sm:p-0">
          1 transfer robot · 2 process module · 3 load lock · 4 EFEM · 5 FOUP
        </p>
      </div>

      {/* Agent log */}
      <div className="flex flex-col border-t rule-ink lg:border-l lg:border-t-0">
        <div className="flex items-center justify-between border-b rule-ink px-4 py-2.5">
          <span className="note !text-ink">Service agent · log</span>
          <span className="note flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 bg-signal animate-blink" />
            Live
          </span>
        </div>
        <ol className="flex-1 divide-y divide-line">
          {steps.map((s, i) => {
            const state = i < phase ? "done" : i === phase ? "active" : "todo";
            return (
              <li
                key={s.id}
                className={cn(
                  "grid grid-cols-[1.5rem_1fr] gap-2 px-4 py-2.5 transition-colors duration-300",
                  state === "active" && "bg-paper-3",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex h-4 w-4 items-center justify-center border font-mono text-[9px]",
                    state === "done" && "border-ink bg-ink text-paper",
                    state === "active" && "border-signal text-signal",
                    state === "todo" && "border-line-strong text-faint",
                  )}
                >
                  {state === "done" ? "✓" : i + 1}
                </span>
                <span className="min-w-0">
                  <span className={cn("block text-[0.8125rem] font-medium", state === "todo" ? "text-faint" : "text-ink")}>
                    {s.label}
                  </span>
                  {state !== "todo" && (
                    <span key={`${s.id}-${phase}`} className="fade-up block font-mono text-[10px] leading-snug text-muted">
                      {s.detail}
                    </span>
                  )}
                  {s.id === "approve" && state === "active" && (
                    <span
                      className={cn(
                        "fade-up mt-2 inline-flex items-center gap-2 border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors",
                        approved ? "border-ok bg-ok text-paper" : "border-ink text-ink",
                      )}
                    >
                      {approved ? "✓ Approved" : "Awaiting sign-off"}
                    </span>
                  )}
                </span>
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
