"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface CountUpProps {
  value: string;
  className?: string;
  duration?: number;
}

function parseValue(value: string): {
  prefix: string;
  number: number | null;
  suffix: string;
  decimals: number;
} {
  const match = value.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { prefix: "", number: null, suffix: value, decimals: 0 };
  }
  return {
    prefix: match[1],
    number: parseFloat(match[2]),
    suffix: match[3],
    decimals: match[2].split(".")[1]?.length ?? 0,
  };
}

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * The final value is always in the markup (server, no-JS, reduced motion, screen readers). While counting it is
 * kept in the flow but transparent, reserving its exact width, and an aria-hidden overlay pinned to its right edge
 * shows the running value. Fraunces ships without tabular figures here, so pinning the right edge keeps the
 * suffix still while the digits change. Text is written through a ref: no re-render per frame.
 */
export function CountUp({ value, className, duration = 1400 }: CountUpProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const runRef = useRef<HTMLSpanElement>(null);
  const { prefix, number, suffix, decimals } = parseValue(value);
  const start = number === null ? "" : `${prefix}${(0).toFixed(decimals)}${suffix}`;

  useEffect(() => {
    const root = rootRef.current;
    const run = runRef.current;
    if (!root || !run) return;

    const done = () => root.setAttribute("data-counted", "true");
    if (!("IntersectionObserver" in window)) {
      done();
      return;
    }

    let raf = 0;
    let timer: ReturnType<typeof setInterval> | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();

        if (number === null) {
          const chars = Array.from(value);
          let i = 0;
          timer = setInterval(() => {
            i++;
            run.textContent = chars.slice(0, i).join("");
            if (i >= chars.length) {
              clearInterval(timer);
              done();
            }
          }, 60);
          return;
        }

        const t0 = performance.now();
        const step = (t: number) => {
          const progress = Math.min((t - t0) / duration, 1);
          run.textContent = `${prefix}${(number * easeOutExpo(progress)).toFixed(decimals)}${suffix}`;
          if (progress < 1) raf = requestAnimationFrame(step);
          else done();
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.3 },
    );

    observer.observe(root);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      if (timer) clearInterval(timer);
    };
  }, [value, number, prefix, suffix, decimals, duration]);

  return (
    <span ref={rootRef} className={cn("countup tabular-nums", className)}>
      <span className="countup-final">{value}</span>
      <span ref={runRef} aria-hidden="true" className={cn("countup-run", number === null && "countup-run--text")}>
        {start}
      </span>
    </span>
  );
}
