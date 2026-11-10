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
const HOLD_ANGLE = 330; // PM4: where the lots go while PM3 is held
const IDLE_ROUTE = [150, 210, 330, 30, 90];
const HOP_MS = 1050;
const WAIT_S = 9; // the visitor's time to decide before the service lead does
const WAIT_MS = WAIT_S * 1000;
const APPROVED_HOLD_MS = 1500;
const REJECTED_HOLD_MS = 1200;

const PROPOSAL = {
  A: "Apply TC offset −4.0 K, run one dummy wafer",
  B: "Hold PM3, reroute lots to PM4, book on-site TC check",
} as const;

const SIGNOFF = {
  wait: "Awaiting sign-off · you are the service lead",
  lead: "J. Schmidt, service lead",
  approve: "Approved by you",
  reject: "Rejected by you",
} as const;

/** How the run ends, by proposal and verdict. */
const FINAL = {
  fixed: { label: "Executed & verified", detail: "Δ 0.3 K · ticket closed · audit #20931", ms: 3600 },
  held: { label: "Executed & verified", detail: "PM3 on hold · lots on PM4 · audit #20932", ms: 4500 },
  escalated: { label: "Escalated", detail: "No action taken · handed to J. Schmidt · audit #20933", ms: 4500 },
} as const;

/** Every label and detail a step can show: all are stacked in one cell, so the log never changes height. */
const steps = [
  { id: "monitor", labels: ["Monitoring"], details: ["5 modules · 142 signals"], ms: 4200 },
  { id: "anomaly", labels: ["Anomaly"], details: ["PM3 heater zone 2 · Δ +4.2 K vs. recipe"], ms: 2400 },
  { id: "diagnose", labels: ["Diagnosis"], details: ["Thermocouple drift · SOP 114 §3.2 · 3 similar tickets"], ms: 2800 },
  { id: "propose", labels: ["Proposed action"], details: [PROPOSAL.A, PROPOSAL.B], ms: 2600 },
  {
    id: "approve",
    labels: ["Approval"],
    details: [SIGNOFF.wait, SIGNOFF.lead, `${SIGNOFF.approve} · 00:00:00`, `${SIGNOFF.reject} · 00:00:00`],
    ms: WAIT_MS,
  },
  {
    id: "execute",
    labels: [FINAL.fixed.label, FINAL.escalated.label],
    details: [FINAL.fixed.detail, FINAL.held.detail, FINAL.escalated.detail],
    ms: FINAL.fixed.ms,
  },
] as const;
const PROPOSE = steps.findIndex((s) => s.id === "propose");
const APPROVE = steps.findIndex((s) => s.id === "approve");
const EXECUTE = steps.findIndex((s) => s.id === "execute");

const hexPoints = Array.from({ length: 6 }, (_, i) => {
  const a = (Math.PI / 3) * i;
  return `${CX + HEX_R * Math.cos(a)},${CY + HEX_R * Math.sin(a)}`;
}).join(" ");

/* ─── Phase loop ─── */

type Verdict = "approve" | "reject";
type Decision = { verdict: Verdict; by: "you" | "lead"; at?: string };
type State = {
  phase: number;
  hop: number;
  angle: number;
  rev: "A" | "B"; // the agent's proposal: A first, B after one rejection
  decision: Decision | null; // the sign-off on the current proposal
  left: number; // whole seconds the visitor has left to decide
};
type Event = "hop" | "tick" | "timeout" | "next";
type Action = { type: Event } | { type: "decide"; verdict: Verdict; at: string };
type Outcome = keyof typeof FINAL | "revise";

const initialState: State = { phase: 0, hop: 0, angle: IDLE_ROUTE[0], rev: "A", decision: null, left: WAIT_S };

const isWaiting = (s: State) => s.phase === APPROVE && !s.decision;

function outcome({ rev, decision }: State): Outcome | null {
  if (!decision) return null;
  if (decision.verdict === "approve") return rev === "A" ? "fixed" : "held";
  return rev === "A" ? "revise" : "escalated";
}

/** The run's ending; before a decision the execute step shows the Rev A copy. */
function final(s: State): keyof typeof FINAL {
  const o = outcome(s);
  return o === null || o === "revise" ? "fixed" : o;
}

const stepMs = (s: State, i: number) => (i === EXECUTE ? FINAL[final(s)].ms : steps[i].ms);

/**
 * The events of one plan, as offsets (ms) from its start. A phase is one plan, except the approval
 * step: it waits (one tick a second, then the timeout), and a decision starts a short closing plan.
 * The last event of every plan changes the state so that the next plan is read from it.
 */
function timeline(s: State): { at: number; type: Event }[] {
  if (s.phase === 0) {
    const ms = steps[0].ms;
    const hops = Array.from({ length: Math.ceil(ms / HOP_MS) - 1 }, (_, i) => ({ at: HOP_MS * (i + 1), type: "hop" as const }));
    return [...hops, { at: ms, type: "next" }];
  }
  if (s.phase === APPROVE) {
    if (!s.decision) {
      const ticks = Array.from({ length: WAIT_S - 1 }, (_, i) => ({ at: 1000 * (i + 1), type: "tick" as const }));
      return [...ticks, { at: WAIT_MS, type: "timeout" }];
    }
    return [{ at: s.decision.verdict === "approve" ? APPROVED_HOLD_MS : REJECTED_HOLD_MS, type: "next" }];
  }
  return [{ at: stepMs(s, s.phase), type: "next" }];
}

/** Turn the accumulated angle the short way round to `target` (degrees). */
function turnTo(angle: number, target: number) {
  const delta = ((((target - angle) % 360) + 540) % 360) - 180;
  return angle + delta;
}

function robotTarget(s: State) {
  if (s.phase === 0) return IDLE_ROUTE[s.hop % IDLE_ROUTE.length];
  if (s.phase === EXECUTE && outcome(s) === "held") return HOLD_ANGLE;
  return FAULT_ANGLE;
}

/** Entering a phase: a fresh countdown, and the robot turns to where the phase needs it. */
const enter = (s: State): State => ({ ...s, left: WAIT_S, angle: turnTo(s.angle, robotTarget(s)) });

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "hop": {
      const hop = s.hop + 1;
      return { ...s, hop, angle: turnTo(s.angle, robotTarget({ ...s, hop })) };
    }
    case "tick":
      return isWaiting(s) ? { ...s, left: Math.max(1, s.left - 1) } : s;
    case "timeout":
      return isWaiting(s) ? { ...s, decision: { verdict: "approve", by: "lead" } } : s;
    case "decide":
      return isWaiting(s) ? { ...s, decision: { verdict: a.verdict, by: "you", at: a.at } } : s;
    case "next":
      if (isWaiting(s)) return s; // only a decision ends the approval step
      if (s.phase === EXECUTE) return enter({ ...initialState, hop: s.hop, angle: s.angle });
      // First rejection: the agent re-proposes.
      if (outcome(s) === "revise") return enter({ ...s, phase: PROPOSE, rev: "B", decision: null });
      return enter({ ...s, phase: s.phase + 1 });
  }
}

function labelOf(s: State, i: number): string {
  return i === EXECUTE ? FINAL[final(s)].label : steps[i].labels[0];
}

function detailOf(s: State, i: number): string {
  if (i === PROPOSE) return PROPOSAL[s.rev];
  if (i === EXECUTE) return FINAL[final(s)].detail;
  if (i === APPROVE) {
    const d = s.decision;
    if (!d) return SIGNOFF.wait;
    if (d.by === "lead") return SIGNOFF.lead;
    return `${SIGNOFF[d.verdict]} · ${d.at}`;
  }
  return steps[i].details[0];
}

/** What the log's live region says: the request while waiting, then the outcome. */
function announcement(s: State): string {
  if (isWaiting(s)) {
    const ask = "Approval needed: approve or reject the proposed action";
    return s.rev === "B" ? `Revised proposal: ${PROPOSAL.B}. ${ask}` : ask;
  }
  const d = s.decision;
  if (!d) return "";
  const who = d.by === "you" ? `${d.verdict === "approve" ? "Approved" : "Rejected"} by you.` : "J. Schmidt, service lead, approved.";
  switch (outcome(s)) {
    case "fixed":
      return `${who} The agent applies the offset and verifies it.`;
    case "held":
      return `${who} PM3 is held and its lots are rerouted to PM4.`;
    case "revise":
      return `${who} The agent is revising its proposal.`;
    default:
      return `${who} No action taken; handed to J. Schmidt.`;
  }
}

/** The visitor's local time, 24 h. */
function clock() {
  const d = new Date();
  return [d.getHours(), d.getMinutes(), d.getSeconds()].map((n) => String(n).padStart(2, "0")).join(":");
}

function setFlag(el: HTMLElement, name: string, on: boolean) {
  if (on) el.dataset[name] = "";
  else delete el.dataset[name];
}

type Controller = { decide: (verdict: Verdict) => void; hold: (by: "pointer" | "focus", on: boolean) => void };

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

/** Shows `text` over invisible copies of every variant, so the cell is always as big as the largest. */
function Slot({ text, reserve, className }: { text: string; reserve: readonly string[]; className?: string }) {
  return (
    <span className={cn("grid", className)}>
      {reserve.map((r, i) => (
        <span key={i} aria-hidden="true" className="invisible col-start-1 row-start-1">
          {r}
        </span>
      ))}
      <span className="col-start-1 row-start-1">{text}</span>
    </span>
  );
}

export function MachineDrawing() {
  const [s, dispatch] = useReducer(reducer, initialState);
  const rootRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const crossRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef(0);
  const ctlRef = useRef<Controller | null>(null);

  /*
   * Phase loop: one timer at a time. It runs a mirror of the reducer, so the next plan is always read
   * from the same state React renders. It pauses off-screen, in a hidden tab, and — while the visitor
   * is deciding — when the pointer or focus is on the approval step; a pause keeps the plan's remaining
   * time. A decision cancels the pending timer and starts the closing plan at once.
   */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let model = initialState;
    let plan = timeline(model);
    let idx = 0; // next event in plan
    let elapsed = 0; // ms of the current plan run before the last resume
    let resumedAt = 0;
    let running = false; // a timer is armed
    let inView = false;
    let pointer = false;
    let focus = false;
    let timer: number | undefined;

    const apply = (a: Action) => {
      model = reducer(model, a);
      dispatch(a);
    };

    const begin = () => {
      plan = timeline(model);
      idx = 0;
      elapsed = 0;
      resumedAt = performance.now();
    };

    const schedule = () => {
      window.clearTimeout(timer);
      const ev = plan[idx];
      const spent = elapsed + (performance.now() - resumedAt);
      timer = window.setTimeout(fire, Math.max(0, ev.at - spent));
    };

    /** Start or pause the timer to match visibility and the visitor's hold. */
    const sync = () => {
      const visible = inView && document.visibilityState === "visible";
      const held = isWaiting(model) && (pointer || focus);
      setFlag(root, "running", visible);
      setFlag(root, "hold", held);
      const run = visible && !held;
      if (run && !running) {
        running = true;
        resumedAt = performance.now();
        schedule();
      } else if (!run && running) {
        running = false;
        window.clearTimeout(timer);
        timer = undefined;
        elapsed += performance.now() - resumedAt;
      }
    };

    /** The plan was replaced: re-arm for it, unless sync() just paused or (re)started the timer. */
    const replan = () => {
      const was = running;
      sync();
      if (was && running) schedule();
    };

    const fire = () => {
      timer = undefined;
      if (!running) return;
      apply({ type: plan[idx].type });
      if (idx === plan.length - 1) {
        begin();
        replan();
      } else {
        idx += 1;
        schedule();
      }
    };

    ctlRef.current = {
      decide(verdict) {
        if (!isWaiting(model)) return;
        apply({ type: "decide", verdict, at: clock() });
        focus = false; // the buttons are gone, and focus with them
        begin();
        replan();
      },
      hold(by, on) {
        if (by === "pointer") pointer = on;
        else focus = on;
        sync();
      },
    };

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    io.observe(root);
    document.addEventListener("visibilitychange", sync);

    return () => {
      ctlRef.current = null;
      inView = false;
      sync();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
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

  // Approval-step hold: pointer over it or focus inside it pauses the countdown.
  const holdOn = () => ctlRef.current?.hold("pointer", true);
  const holdOff = () => ctlRef.current?.hold("pointer", false);
  const focusIn = () => ctlRef.current?.hold("focus", true);
  const focusOut = (e: React.FocusEvent<HTMLLIElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) ctlRef.current?.hold("focus", false);
  };
  const decide = (verdict: Verdict) => ctlRef.current?.decide(verdict);

  const { phase, angle, decision } = s;
  const waiting = isWaiting(s);
  const faultOn = phase >= 1;
  const ending = phase === EXECUTE ? final(s) : null;
  const pm3State = ending === "fixed" ? "ok" : ending === "held" ? "held" : faultOn ? "fault" : "idle";
  const callout = ending === "fixed" ? "PM3 · Δ 0.3 K ✓" : ending === "held" ? "PM3 · ON HOLD" : "PM3 · Δ +4.2 K";
  const escalated = ending === "escalated";

  return (
    <div
      ref={rootRef}
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
          aria-label="Illustrative technical drawing of a semiconductor cluster tool, not a live system. In the animation an AI service agent detects a temperature deviation in process module 3, diagnoses it and proposes a fix. You act as the service lead: approve or reject the proposal in the log next to the drawing. Only an approved action is executed and verified."
        >
          <defs>
            <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="var(--color-signal)" strokeWidth="1" />
            </pattern>
            <pattern id="hatch-held" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="var(--color-muted)" strokeWidth="1" />
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
                  {/* Fault hatch (signal) and held hatch (muted) cross-fade. */}
                  {isFault &&
                    (["hatch", "hatch-held"] as const).map((id) => (
                      <rect
                        key={id}
                        x={-PM_HALF}
                        y={-PM_HALF}
                        width={PM_HALF * 2}
                        height={PM_HALF * 2}
                        rx="3"
                        stroke="none"
                        fill={`url(#${id})`}
                        className={id === "hatch" ? "md-pm3-hatch" : "md-pm3-hatch-held"}
                      />
                    ))}
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
          <g
            className="md-callout"
            data-on={faultOn || undefined}
            data-state={ending === "fixed" ? "ok" : ending === "held" ? "held" : undefined}
          >
            <line x1="278" y1="66" x2="236" y2="34" stroke="var(--color-signal)" strokeWidth="0.8" />
            <line x1="236" y1="34" x2="130" y2="34" stroke="var(--color-signal)" strokeWidth="0.8" />
            <text x="132" y="28" className="md-callout-text font-mono text-[9px]">
              {callout}
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
          {steps.map((step, i) => {
            const state = i < phase ? "done" : i === phase ? "active" : "todo";
            const isApprove = i === APPROVE;
            const alert = i === EXECUTE && escalated;
            const verdict = isApprove ? decision?.verdict : undefined;
            return (
              <li
                key={step.id}
                data-state={state}
                data-decided={isApprove && decision ? "" : undefined}
                data-alert={alert || undefined}
                className="md-step relative grid grid-cols-[1.5rem_1fr] gap-2 px-4 py-2.5"
                style={{ ["--ms" as string]: `${stepMs(s, i)}ms` }}
                onPointerEnter={isApprove ? holdOn : undefined}
                onPointerLeave={isApprove ? holdOff : undefined}
                onFocus={isApprove ? focusIn : undefined}
                onBlur={isApprove ? focusOut : undefined}
              >
                <span className="md-check mt-0.5 flex h-4 w-4 items-center justify-center border font-mono text-[9px]">
                  {state === "done" ? "✓" : alert ? "!" : i + 1}
                </span>
                <span className="min-w-0">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="md-label flex min-w-0 items-baseline gap-2 text-[0.8125rem] font-medium">
                      <Slot text={labelOf(s, i)} reserve={step.labels} />
                      {i === PROPOSE && (
                        <span
                          aria-hidden={s.rev !== "B"}
                          className={cn(
                            "border border-signal px-1 font-mono text-[9px] font-normal text-signal-ink",
                            s.rev !== "B" && "invisible",
                          )}
                        >
                          REV B
                        </span>
                      )}
                    </span>
                    {isApprove && (
                      <span className={cn("whitespace-nowrap font-mono text-[9px] text-muted", !waiting && "invisible")}>
                        J. Schmidt decides in <span className="inline-block w-[1ch] text-right">{s.left}</span> s
                      </span>
                    )}
                  </span>
                  {/* Always in the layout, so the log never changes height. */}
                  <span className="md-detail block">
                    <Slot
                      text={detailOf(s, i)}
                      reserve={step.details}
                      className="font-mono text-[10px] leading-snug text-muted"
                    />
                    {isApprove && (
                      <span className="mt-2 grid min-h-9 items-start">
                        <span
                          className="md-signoff col-start-1 row-start-1 inline-grid justify-self-start border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em]"
                          data-verdict={verdict}
                          aria-hidden={!verdict}
                        >
                          <span className="md-signoff-ok col-start-1 row-start-1" aria-hidden={verdict !== "approve"}>
                            ✓ Approved
                          </span>
                          <span className="md-signoff-no col-start-1 row-start-1" aria-hidden={verdict !== "reject"}>
                            ✕ Rejected
                          </span>
                        </span>
                        {waiting && (
                          <span className="col-start-1 row-start-1 flex gap-2">
                            <button
                              type="button"
                              aria-label="Approve proposed action"
                              className="md-btn md-btn-approve inline-flex min-h-9 items-center gap-1.5 px-3 font-mono text-[10px] uppercase tracking-[0.08em]"
                              onClick={() => decide("approve")}
                            >
                              <span className="h-1.5 w-1.5 bg-signal animate-blink" aria-hidden="true" />
                              Approve
                            </button>
                            <button
                              type="button"
                              aria-label="Reject proposed action"
                              className="md-btn md-btn-reject inline-flex min-h-9 items-center px-3 font-mono text-[10px] uppercase tracking-[0.08em]"
                              onClick={() => decide("reject")}
                            >
                              Reject
                            </button>
                          </span>
                        )}
                      </span>
                    )}
                  </span>
                </span>
                <span aria-hidden="true" className="md-progress" />
              </li>
            );
          })}
        </ol>
        <p className="sr-only" aria-live="polite">
          {announcement(s)}
        </p>
        <div className="border-t rule-ink px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
          <p>
            Autonomy <span className="text-ink">L2</span> · acts with approval
          </p>
          {/* Reserved on every step, shown only for the escalation. */}
          <p className={cn("mt-1 text-signal-ink", !escalated && "invisible")}>Nothing executes without sign-off.</p>
        </div>
      </div>
    </div>
  );
}
