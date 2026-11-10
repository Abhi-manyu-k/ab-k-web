"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type HTMLAttributes, type ReactNode } from "react";

/*
 * One shared IntersectionObserver for every reveal on the page. It only writes `data-inview="true"`
 * on the element (no React state, no re-render); globals.css does the rest. Hidden poses live under
 * `html.js` + `prefers-reduced-motion: no-preference`, so without JS or with reduced motion nothing
 * is ever hidden.
 *
 * - Fires once per element, then stops watching it.
 * - Elements already in view on mount are revealed by the observer's first callback.
 * - Elements so tall that 15% of them can never fit in the viewport use a second observer that
 *   fires as soon as their top edge is well inside the viewport, so they cannot stay hidden.
 */

const THRESHOLD = 0.15;
const ROOT_MARGIN = "0px 0px -8% 0px";

let observer: IntersectionObserver | null = null;
let tallObserver: IntersectionObserver | null = null;
let printHooked = false;
const pending = new Set<Element>();

function show(el: Element) {
  el.setAttribute("data-inview", "true");
  pending.delete(el);
  observer?.unobserve(el);
  tallObserver?.unobserve(el);
}

function onIntersect(entries: IntersectionObserverEntry[]) {
  for (const entry of entries) {
    // The first callback also reports elements that barely touch the viewport; wait for the threshold.
    if (entry.isIntersecting && entry.intersectionRatio >= THRESHOLD * 0.98) show(entry.target);
  }
}

function onIntersectTall(entries: IntersectionObserverEntry[]) {
  for (const entry of entries) {
    if (entry.isIntersecting) show(entry.target);
  }
}

function observe(el: Element) {
  if (
    typeof IntersectionObserver === "undefined" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    el.setAttribute("data-inview", "true");
    return;
  }

  if (!printHooked) {
    printHooked = true;
    // Never print a half-revealed sheet.
    window.addEventListener("beforeprint", () => [...pending].forEach(show));
  }

  pending.add(el);
  const viewport = window.innerHeight * 0.92;
  if (el.getBoundingClientRect().height * THRESHOLD > viewport * 0.6) {
    tallObserver ??= new IntersectionObserver(onIntersectTall, { threshold: 0, rootMargin: "0px 0px -25% 0px" });
    tallObserver.observe(el);
  } else {
    observer ??= new IntersectionObserver(onIntersect, { threshold: [0, THRESHOLD], rootMargin: ROOT_MARGIN });
    observer.observe(el);
  }
}

function unobserve(el: Element) {
  pending.delete(el);
  observer?.unobserve(el);
  tallObserver?.unobserve(el);
}

export interface RevealProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  children?: ReactNode;
  /** `rise` (default): fade + 16px rise. `mask`: rises out of a clip (no overflow allowed). `none`: only sets data-inview, for CSS that choreographs descendants. */
  variant?: "rise" | "mask" | "none";
  /** Delay in ms before the reveal starts once in view. */
  delay?: number;
  /** The element holds still and its direct children rise one after another (--stagger-row). */
  stagger?: boolean;
  as?: ElementType;
}

export function Reveal({
  children,
  variant = "rise",
  delay = 0,
  stagger = false,
  as: Component = "div",
  style,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    observe(el);
    return () => unobserve(el);
  }, []);

  return (
    <Component
      ref={ref}
      data-reveal={stagger ? "none" : variant}
      data-stagger={stagger ? "" : undefined}
      // Always set, so a nested reveal never inherits its parent's delay.
      style={{ "--reveal-delay": `${delay}ms`, ...style } as CSSProperties}
      {...rest}
    >
      {children}
    </Component>
  );
}
