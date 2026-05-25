"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
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
} {
  const match = value.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { prefix: "", number: null, suffix: value };
  }
  return {
    prefix: match[1],
    number: parseFloat(match[2]),
    suffix: match[3],
  };
}

export function CountUp({ value, className, duration = 800 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const [hasAnimated, setHasAnimated] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { prefix, number, suffix } = parseValue(value);

  useEffect(() => {
    if (shouldReduceMotion || hasAnimated) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated) return;
        setHasAnimated(true);
        observer.disconnect();

        if (number === null) {
          let i = 0;
          const chars = value.split("");
          const interval = setInterval(() => {
            i++;
            setDisplay(chars.slice(0, i).join(""));
            if (i >= chars.length) clearInterval(interval);
          }, 60);
          return;
        }

        const start = performance.now();
        const animate = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(number * eased);
          setDisplay(`${prefix}${current}${suffix}`);
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, number, prefix, suffix, duration, hasAnimated, shouldReduceMotion]);

  return (
    <span ref={ref} className={cn("font-mono tabular-nums", className)}>
      {display}
    </span>
  );
}
