"use client";

import { useEffect, useState } from "react";
import { regulations } from "@/lib/content";
import { cn } from "@/lib/utils";

const START = Date.UTC(2025, 0, 1);
const END = Date.UTC(2029, 0, 1);
const YEARS = [2025, 2026, 2027, 2028, 2029];
const DAY = 86_400_000;

const pos = (t: number) => ((t - START) / (END - START)) * 100;
const parse = (d: string) => Date.parse(`${d}T00:00:00Z`);
const fmt = (d: string) => d.split("-").reverse().join(".");

export function RegulationTimeline({ compact = false }: { compact?: boolean }) {
  // Only known after mount, so static HTML never goes stale.
  const [now, setNow] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => setNow(Date.now()), []);

  const rows = compact ? regulations.filter((r) => parse(r.date) >= Date.UTC(2026, 0, 1)) : regulations;

  return (
    <div>
      {/* Strip */}
      <div className="relative mb-4 hidden h-20 sm:block" aria-hidden="true">
        <div className="absolute inset-x-0 top-10 h-px bg-ink" />
        {YEARS.map((y) => (
          <div key={y} className="absolute top-10" style={{ left: `${pos(Date.UTC(y, 0, 1))}%` }}>
            <div className="h-3 w-px bg-ink" />
            <span className="absolute top-4 -translate-x-1/2 font-mono text-[10px] text-muted">{y}</span>
          </div>
        ))}
        {rows.map((r, i) => {
          const t = parse(r.date);
          const past = now !== null && t <= now;
          return (
            <div
              key={r.date + r.instrument}
              className="absolute top-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pos(t)}%` }}
            >
              <span
                className={cn(
                  "block h-2.5 w-2.5 rotate-45 border border-ink transition-transform",
                  past ? "bg-ink" : "bg-paper",
                  hovered === i && "scale-150 border-signal",
                )}
              />
            </div>
          );
        })}
        {now !== null && now > START && now < END && (
          <div className="absolute inset-y-0" style={{ left: `${pos(now)}%` }}>
            <div className="h-full w-px bg-signal" />
            <span className="absolute -top-0.5 left-1.5 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.08em] text-signal">
              Today
            </span>
          </div>
        )}
      </div>

      {/* Revision table */}
      <div className="border-t rule-ink">
        <div className="hidden grid-cols-[2.5rem_6.5rem_10rem_1fr_7rem] gap-4 border-b rule-ink py-2 font-mono text-[10px] uppercase tracking-[0.08em] text-faint md:grid">
          <span>Rev.</span>
          <span>Date</span>
          <span>Instrument</span>
          <span>What changes</span>
          <span className="text-right">Status</span>
        </div>
        <ul>
          {rows.map((r, i) => {
            const t = parse(r.date);
            const days = now === null ? null : Math.ceil((t - now) / DAY);
            return (
              <li
                key={r.date + r.instrument}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="grid grid-cols-[2.5rem_1fr_auto] gap-x-4 gap-y-1 border-b rule py-3.5 transition-colors hover:bg-paper-2/60 md:grid-cols-[2.5rem_6.5rem_10rem_1fr_7rem] md:items-baseline"
              >
                <span className="font-mono text-[11px] text-faint">{String.fromCharCode(65 + i)}</span>
                <span className="font-mono text-xs text-ink">{fmt(r.date)}</span>
                <span className="hidden text-sm font-medium text-ink md:block">{r.instrument}</span>
                <span className="col-span-3 pl-[3.5rem] text-sm text-muted md:col-span-1 md:pl-0">
                  <span className="font-medium text-ink md:hidden">{r.instrument} · </span>
                  {r.change}
                  <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.06em] text-faint">
                    {r.affects}
                  </span>
                </span>
                <span className="row-start-1 col-start-3 text-right md:row-auto md:col-auto">
                  {days !== null && (
                    <span
                      className={cn(
                        "inline-block border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em]",
                        days <= 0 ? "border-ink bg-ink text-paper" : days < 180 ? "border-signal text-signal" : "border-line-strong text-muted",
                      )}
                    >
                      {days <= 0 ? "In force" : `in ${days} d`}
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
