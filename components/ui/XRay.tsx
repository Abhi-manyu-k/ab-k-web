"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

/*
 * X-ray: the page shows the drawing of itself — its grid, the distances between its parts and what
 * each piece of type is. Hold X (desktop) or latch it with the footer toggle; Esc releases the latch.
 *
 * This file is only the switch. Measuring and drawing live in ./xray-draw, loaded with import() on
 * first use, so the overlay costs nothing until someone asks for it.
 */

// ─── A tiny store: held (X key) or latched (toggle) ───

let held = false;
let latched = false;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const setHeld = (v: boolean) => {
  if (held !== v) {
    held = v;
    emit();
  }
};
const setLatched = (v: boolean) => {
  if (latched !== v) {
    latched = v;
    emit();
  }
};

const isOn = () => held || latched;
const isLatched = () => latched;
const never = () => false;

function typingInto(t: EventTarget | null) {
  if (!(t instanceof HTMLElement)) return false;
  return t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName);
}

/** The overlay, mounted once in the layout. */
export function XRay() {
  const svgRef = useRef<SVGSVGElement>(null);
  const on = useSyncExternalStore(subscribe, isOn, never);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLatched(false);
        setHeld(false);
        return;
      }
      if ((e.key === "x" || e.key === "X") && !e.metaKey && !e.ctrlKey && !e.altKey && !typingInto(e.target)) {
        setHeld(true);
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === "x" || e.key === "X") setHeld(false);
    };
    const blur = () => setHeld(false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
    };
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!on || !svg) return;
    let stop: (() => void) | undefined;
    let cancelled = false;
    import("./xray-draw").then((m) => {
      if (!cancelled) stop = m.start(svg);
    });
    return () => {
      cancelled = true;
      stop?.();
    };
  }, [on]);

  return <svg ref={svgRef} aria-hidden="true" className={cn("xray", on && "xray-on")} />;
}

/** The footer switch: latches X-ray on until pressed again or Esc. */
export function XRayToggle({ className }: { className?: string }) {
  const pressed = useSyncExternalStore(subscribe, isLatched, never);
  return (
    <span className={cn("inline-flex flex-wrap items-baseline gap-x-3 gap-y-1", className)}>
      <button
        type="button"
        aria-pressed={pressed}
        onClick={() => setLatched(!latched)}
        className={cn(
          "-my-2.5 py-2.5 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors hover:text-signal",
          pressed ? "text-ink underline decoration-signal underline-offset-4" : "text-muted",
        )}
      >
        X-ray
      </button>
      <span className="xray-hint hidden font-mono text-[10px] normal-case tracking-normal text-muted">
        Hold X for the construction drawing.
      </span>
    </span>
  );
}
