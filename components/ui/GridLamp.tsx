"use client";

import { useEffect } from "react";

/**
 * Inspection lamp over .bg-mm grid paper: near the pointer the millimetre grid reads a little stronger
 * (the painting lives in app/styles/diagrams.css, `.bg-mm::before`).
 *
 * One passive pointermove listener on the document. Each move only resolves `closest('.bg-mm')` and stores the
 * coordinates; the style writes (`--mx`/`--my` in px relative to the sheet, plus `data-lamp`) happen at most once
 * per frame. Off a .bg-mm nothing is scheduled. Fine pointers with hover only, never under reduced motion.
 * Renders nothing.
 */
export function GridLamp() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    let lit: HTMLElement | null = null; // sheet currently lit
    let target: HTMLElement | null = null; // sheet under the pointer at the last move
    let x = 0;
    let y = 0;
    let raf = 0;

    const flush = () => {
      raf = 0;
      if (target !== lit) {
        // Leaving: drop the attribute and let the lamp fade out where it was. The coordinates are left in place
        // on purpose: clearing them would snap the light away mid-fade.
        lit?.removeAttribute("data-lamp");
        lit = target;
      }
      if (!lit) return;
      const r = lit.getBoundingClientRect();
      lit.style.setProperty("--mx", `${Math.round(x - r.left)}px`);
      lit.style.setProperty("--my", `${Math.round(y - r.top)}px`);
      if (!lit.hasAttribute("data-lamp")) lit.setAttribute("data-lamp", "");
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const sheet = e.target instanceof Element ? e.target.closest<HTMLElement>(".bg-mm") : null;
      if (!sheet && !lit && !target) return;
      target = sheet;
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(flush);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      lit?.removeAttribute("data-lamp");
    };
  }, []);

  return null;
}
