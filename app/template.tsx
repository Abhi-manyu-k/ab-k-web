"use client";

import { useEffect } from "react";

/*
 * A4. The template remounts on every navigation, so the new sheet settles in each time
 * (globals.css, .route-in). The first page load is left alone: it has its own load sequences,
 * and the server HTML must match the first client render.
 */
let navigated = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const animate = navigated;

  useEffect(() => {
    navigated = true;
  }, []);

  return <div className={animate ? "route-in" : undefined}>{children}</div>;
}
