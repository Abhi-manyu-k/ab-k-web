"use client";

import { useEffect, useState } from "react";
import { activityLog, orgChart } from "@/lib/content";
import { cn } from "@/lib/utils";

const VISIBLE_LINES = 4;
const TICK_MS = 2800;
const BASE_SECONDS = 9 * 3600 + 41 * 60 + 7;

function clock(step: number) {
  const t = BASE_SECONDS + step * 7;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(Math.floor(t / 3600) % 24)}:${pad(Math.floor(t / 60) % 60)}:${pad(t % 60)}`;
}

export function LiveOrganigram() {
  // `step` is the index of the newest entry; deterministic so SSR and hydration match.
  const [step, setStep] = useState(VISIBLE_LINES - 1);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setStep((s) => s + 1);
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, []);

  const lines = Array.from({ length: VISIBLE_LINES }, (_, i) => {
    const s = step - i;
    return { step: s, entry: activityLog[s % activityLog.length] };
  });
  const activeAgent = lines[0].entry.agent;

  return (
    <div className="panel relative overflow-hidden shadow-[0_40px_120px_-40px_rgba(255,106,61,0.25)]">
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b hairline px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          </div>
          <span className="font-mono text-[0.6875rem] text-muted">
            organigram<span className="text-faint">/</span>{orgChart.company.toLowerCase().replace(" ", "-")}
          </span>
        </div>
        <span className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-live">
          <span className="h-1.5 w-1.5 rounded-full bg-live animate-pulse-dot" />
          Live
        </span>
      </div>

      {/* Chart */}
      <div className="bg-dots relative px-2 pb-5 pt-6 sm:px-6 sm:pt-8" role="img" aria-label="Organisation chart showing human department leads, each paired with a Virtual Employee, all connected through a governed model gateway.">
        <div className="flex justify-center">
          <HumanNode name={orgChart.board.name} role={orgChart.board.role} />
        </div>

        <svg className="block h-8 w-full text-line-strong" viewBox="0 0 300 32" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M150 0 V16 M50 32 V16 H250 V32 M150 16 V32"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="grid grid-cols-3">
          {orgChart.departments.map((dept) => {
            const active = activeAgent === dept.id;
            return (
              <div key={dept.id} className="flex flex-col items-center px-1 sm:px-2">
                <HumanNode name={dept.lead.name} role={dept.lead.role} caption={dept.department} />
                <svg className="block h-7 w-2 overflow-visible" viewBox="0 0 2 28" aria-hidden="true">
                  <line
                    x1="1"
                    y1="0"
                    x2="1"
                    y2="28"
                    className={cn("flow-line transition-colors", active ? "stroke-signal" : "stroke-line-strong")}
                    strokeWidth="1.5"
                  />
                </svg>
                <VirtualNode code={dept.ve.code} title={dept.ve.title} active={active} />
                <svg className="block h-5 w-2 overflow-visible" viewBox="0 0 2 20" aria-hidden="true">
                  <line x1="1" y1="0" x2="1" y2="20" className="stroke-line-strong" strokeWidth="1" strokeDasharray="2 3" />
                </svg>
              </div>
            );
          })}
        </div>

        <div
          className={cn(
            "mx-1 flex items-center justify-between rounded-lg border px-3 py-2 transition-colors duration-500 sm:mx-2",
            activeAgent === "gateway" ? "border-signal/60 bg-signal/10" : "hairline bg-ink/60",
          )}
        >
          <span className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-muted sm:text-[0.625rem]">
            Model gateway
          </span>
          <span className="font-mono text-[0.5625rem] text-faint sm:text-[0.625rem]">
            EU-hosted · audited · routed
          </span>
        </div>
      </div>

      {/* Activity log */}
      <div className="border-t hairline bg-ink/70 px-4 py-3 sm:px-5" aria-live="off">
        <ul className="space-y-1.5 font-mono text-[0.625rem] leading-relaxed sm:text-[0.6875rem]">
          {lines.map(({ step: s, entry }, i) => (
            <li
              key={s}
              className={cn(
                "flex gap-3 truncate",
                i === 0 ? "log-in text-paper" : "text-faint",
                i === 1 && "text-muted",
              )}
            >
              <span className="shrink-0 text-faint">{clock(s)}</span>
              <span className={cn("shrink-0", i === 0 && "text-signal")}>{entry.actor}</span>
              <span className="hidden shrink-0 text-faint sm:inline">→ {entry.system}</span>
              <span className="truncate">{entry.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function HumanNode({ name, role, caption }: { name: string; role: string; caption?: string }) {
  return (
    <div className="flex w-full max-w-[11rem] flex-col items-center">
      {caption && (
        <span className="mb-2 truncate font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-faint sm:text-[0.625rem]">
          {caption}
        </span>
      )}
      <div className="flex w-full items-center justify-center gap-2 rounded-lg border border-line bg-ink-2 px-2 py-2 sm:px-3 xl:justify-start">
        <span className="hidden h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-3 xl:flex font-mono text-[0.5625rem] text-muted" aria-hidden="true">
          {name
            .split(/[\s.]+/)
            .filter(Boolean)
            .map((p) => p[0])
            .join("")
            .slice(0, 2)}
        </span>
        <span className="min-w-0 text-center xl:text-left">
          <span className="block text-[0.6875rem] font-medium leading-tight text-paper sm:text-xs xl:truncate">{name}</span>
          <span className="block text-[0.625rem] leading-tight text-faint xl:truncate">{role}</span>
        </span>
      </div>
    </div>
  );
}

function VirtualNode({ code, title, active }: { code: string; title: string; active: boolean }) {
  return (
    <div
      className={cn(
        "relative w-full max-w-[11rem] rounded-lg border border-dashed px-2 py-2 text-center transition-[border-color,background-color,box-shadow] duration-500 sm:px-3",
        active
          ? "border-signal bg-signal/10 shadow-[0_0_30px_-6px_rgba(255,106,61,0.55)]"
          : "border-line-strong bg-ink/80",
      )}
    >
      <span
        className={cn(
          "absolute -right-1 -top-1 h-2 w-2 rounded-full",
          active ? "bg-signal text-signal animate-pulse-dot" : "bg-live/70",
        )}
      />
      <span className={cn("block font-mono text-[0.5625rem] tracking-[0.1em]", active ? "text-signal" : "text-faint")}>
        {code}
      </span>
      <span className="serif mt-0.5 block text-[0.8125rem] italic leading-tight text-paper sm:text-base">{title}</span>
    </div>
  );
}
