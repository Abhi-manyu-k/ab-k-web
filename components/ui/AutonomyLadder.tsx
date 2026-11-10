"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type RefObject } from "react";
import { autonomyLevels } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Marks the element `data-drawn` once it enters view, so the CSS entrance plays. No re-render. */
function useDrawnOnView(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.setAttribute("data-drawn", "true");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.setAttribute("data-drawn", "true");
          io.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
}

function PanelBody({ index, ghost = false }: { index: number; ghost?: boolean }) {
  const level = autonomyLevels[index];
  return (
    <>
      <p className="note">
        Level <span className="text-signal">{level.level}</span> · {level.name}
      </p>
      <dl className={cn("mt-4 space-y-4", !ghost && "fade-up")}>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted">Agent does</dt>
          <dd className="serif mt-1 text-2xl leading-snug text-ink">{level.agent}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted">Human does</dt>
          <dd className="mt-1 text-ink-2">{level.human}</dd>
        </div>
      </dl>
      <p className="note mt-8 mb-3">Controls required</p>
      <ul className="space-y-2">
        {autonomyLevels.slice(0, index + 1).flatMap((l, li) =>
          l.controls.map((c, ci) => {
            const n = autonomyLevels.slice(0, li).reduce((sum, p) => sum + p.controls.length, 0) + ci;
            return (
              <li
                key={c}
                className={cn("flex items-start gap-3 text-sm", !ghost && "ladder-ctl", li === index ? "text-ink" : "text-muted")}
                style={ghost ? undefined : ({ "--i": n } as CSSProperties)}
              >
                <span
                  className={cn(
                    "mt-1.5 h-2 w-2 shrink-0 rotate-45 border",
                    li === index ? "border-signal bg-signal" : "border-line-strong",
                  )}
                />
                <span>
                  {c}
                  {li !== index && <span className="ml-2 font-mono text-[10px]">({l.level})</span>}
                </span>
              </li>
            );
          }),
        )}
      </ul>
    </>
  );
}

export function AutonomyLadder() {
  const [selected, setSelected] = useState(2);
  const level = autonomyLevels[selected];
  const stairRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useDrawnOnView(stairRef);

  // WAI-ARIA tabs, automatic activation: arrows (wrapping), Home and End move selection and focus.
  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = autonomyLevels.length - 1;
    let next: number;
    switch (e.key) {
      case "ArrowRight":
        next = i === last ? 0 : i + 1;
        break;
      case "ArrowLeft":
        next = i === 0 ? last : i - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      default:
        return;
    }
    e.preventDefault();
    setSelected(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
      {/* Staircase */}
      <div>
        <div ref={stairRef} className="ladder relative">
          {/* Recommended-zone dimension */}
          <div aria-hidden="true" className="absolute -top-9 left-[20%] w-[40%]">
            <div className="flex items-center">
              <span className="ladder-dim-tick h-3 w-px bg-signal" />
              <span className="ladder-dim-line h-px flex-1 bg-signal" />
              <span className="ladder-dim-tick ladder-dim-tick--end h-3 w-px bg-signal" />
            </div>
            <p className="ladder-dim-label mt-1 text-center font-mono text-[10px] uppercase tracking-[0.06em] text-signal">
              Recommended start
            </p>
          </div>

          <div className="flex h-72 items-end sm:h-96" role="tablist" aria-label="Agent autonomy levels">
            {autonomyLevels.map((l, i) => {
              const active = i === selected;
              return (
                <button
                  key={l.level}
                  ref={(node) => {
                    tabRefs.current[i] = node;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="autonomy-panel"
                  id={`autonomy-tab-${l.level}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setSelected(i)}
                  onKeyDown={(e) => onTabKeyDown(e, i)}
                  className={cn(
                    "ladder-step group relative flex min-w-0 flex-1 flex-col justify-start border-t border-l border-ink px-1.5 pt-3 text-left sm:px-3",
                    i === autonomyLevels.length - 1 && "border-r",
                  )}
                  style={{ height: `${28 + i * 18}%`, "--i": i } as CSSProperties}
                >
                  <span className={cn("font-mono text-xs", active ? "text-signal" : "text-muted")}>{l.level}</span>
                  <span className="serif mt-1 hyphens-auto break-words text-[13px] leading-tight text-ink sm:text-xl">{l.name}</span>
                </button>
              );
            })}
          </div>
          <div className="h-px bg-ink" />
          <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
            <span>Human does</span>
            <span>→ Autonomy →</span>
            <span>Agent does</span>
          </div>
        </div>
      </div>

      {/* Detail */}
      <div
        className="border border-ink bg-paper-3 p-6"
        role="tabpanel"
        id="autonomy-panel"
        aria-labelledby={`autonomy-tab-${level.level}`}
        aria-live="polite"
        tabIndex={0}
      >
        {/* At lg every level is stacked invisibly in one grid cell, so the panel keeps the tallest height. */}
        <div className="grid">
          {autonomyLevels.map((l, i) => (
            <div key={`ghost-${l.level}`} aria-hidden="true" className="invisible col-start-1 row-start-1 hidden lg:block">
              <PanelBody index={i} ghost />
            </div>
          ))}
          {/* Keyed by level: the content re-enters (controls staggered) whenever the selection changes. */}
          <div key={level.level} className="col-start-1 row-start-1">
            <PanelBody index={selected} />
          </div>
        </div>
      </div>
    </div>
  );
}
