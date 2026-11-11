"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Sheet = "night" | "day";

const KEY = "sheet";
const THEME_COLOR: Record<Sheet, string> = { night: "#111110", day: "#f2efe7" };

const current = (): Sheet => (document.documentElement.dataset.sheet === "day" ? "day" : "night");

function apply(sheet: Sheet) {
  const root = document.documentElement;
  if (sheet === "day") root.dataset.sheet = "day";
  else delete root.dataset.sheet;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[sheet]);
  try {
    if (sheet === "day") localStorage.setItem(KEY, "day");
    else localStorage.removeItem(KEY);
  } catch {
    /* storage blocked: the choice lasts for this page only */
  }
}

/**
 * Day / Night: night is the default sheet; day is the original paper palette, for reading.
 * The attribute is set before first paint by the inline script in app/layout.tsx; every switch on the
 * page follows the attribute, so the footer and essay switches stay in step.
 */
export function SheetSwitch({ className }: { className?: string }) {
  const [sheet, setSheet] = useState<Sheet | null>(null);

  useEffect(() => {
    const sync = () => setSheet(current());
    sync();
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[current()]);
    const mo = new MutationObserver(sync);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-sheet"] });
    return () => mo.disconnect();
  }, []);

  return (
    <div
      role="group"
      aria-label="Sheet"
      className={cn("inline-flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[0.08em]", className)}
    >
      <span className="text-[9px] text-muted">Sheet</span>
      {(["day", "night"] as const).map((s, i) => (
        <span key={s} className="inline-flex items-baseline gap-2">
          {i > 0 && (
            <span className="text-faint" aria-hidden="true">
              /
            </span>
          )}
          <button
            type="button"
            aria-pressed={sheet === s}
            onClick={() => apply(s)}
            className={cn(
              // The negative margin keeps the line height; the padding makes a ≥36px tap target.
              "-my-2.5 py-2.5 uppercase transition-colors hover:text-signal",
              sheet === s ? "text-ink underline decoration-signal underline-offset-4" : "text-muted",
            )}
          >
            {s}
          </button>
        </span>
      ))}
    </div>
  );
}
