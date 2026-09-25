"use client";

import { useState } from "react";
import { autonomyLevels } from "@/lib/content";
import { cn } from "@/lib/utils";

export function AutonomyLadder() {
  const [selected, setSelected] = useState(2);
  const level = autonomyLevels[selected];

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
      {/* Staircase */}
      <div>
        <div className="relative">
          {/* Recommended-zone dimension */}
          <div aria-hidden="true" className="absolute -top-9 left-[20%] w-[40%]">
            <div className="flex items-center">
              <span className="h-3 w-px bg-signal" />
              <span className="h-px flex-1 bg-signal" />
              <span className="h-3 w-px bg-signal" />
            </div>
            <p className="mt-1 text-center font-mono text-[10px] uppercase tracking-[0.06em] text-signal">
              Start here in 2026
            </p>
          </div>

          <div className="flex h-64 items-end sm:h-72" role="tablist" aria-label="Agent autonomy levels">
            {autonomyLevels.map((l, i) => {
              const active = i === selected;
              return (
                <button
                  key={l.level}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelected(i)}
                  className={cn(
                    "group relative flex min-w-0 flex-1 flex-col justify-start border-t border-l border-ink px-1.5 pt-3 text-left transition-colors sm:px-3",
                    i === autonomyLevels.length - 1 && "border-r",
                    active ? "bg-hatch" : "hover:bg-paper-2",
                  )}
                  style={{ height: `${28 + i * 18}%` }}
                >
                  <span className={cn("font-mono text-xs", active ? "text-signal" : "text-muted")}>{l.level}</span>
                  <span className="serif mt-1 hyphens-auto break-words text-[13px] leading-tight text-ink sm:text-xl">{l.name}</span>
                </button>
              );
            })}
          </div>
          <div className="h-px bg-ink" />
          <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.08em] text-faint">
            <span>Human does</span>
            <span>→ Autonomy →</span>
            <span>Agent does</span>
          </div>
        </div>
      </div>

      {/* Detail */}
      <div className="border border-ink bg-paper-3 p-6" role="tabpanel" aria-live="polite">
        <p className="note">
          Level <span className="text-signal">{level.level}</span> · {level.name}
        </p>
        <p key={level.level} className="fade-up serif mt-4 text-2xl leading-snug text-ink">
          {level.example}
        </p>
        <p className="note mt-8 mb-3">Controls required</p>
        <ul className="space-y-2">
          {autonomyLevels.slice(0, selected + 1).flatMap((l, li) =>
            l.controls.map((c) => (
              <li
                key={c}
                className={cn(
                  "flex items-start gap-3 text-sm",
                  li === selected ? "text-ink" : "text-faint",
                )}
              >
                <span
                  className={cn(
                    "mt-1.5 h-2 w-2 shrink-0 rotate-45 border",
                    li === selected ? "border-signal bg-signal" : "border-line-strong",
                  )}
                />
                <span>
                  {c}
                  {li !== selected && <span className="ml-2 font-mono text-[10px]">({l.level})</span>}
                </span>
              </li>
            )),
          )}
        </ul>
      </div>
    </div>
  );
}
