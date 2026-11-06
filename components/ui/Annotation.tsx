import { cn } from "@/lib/utils";

type Arrow = "left" | "down-left" | "up-left" | "none";

/**
 * A red-pen margin note, as a checker would scribble on a drawing.
 * Pure CSS + inline SVG — no extra fonts or images.
 */
export function Annotation({
  children,
  arrow = "left",
  className,
  rotate = -3,
}: {
  children: React.ReactNode;
  arrow?: Arrow;
  className?: string;
  rotate?: number;
}) {
  return (
    <span
      className={cn("annotation pointer-events-none inline-flex select-none items-center gap-1.5", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {arrow !== "none" && (
        <svg
          aria-hidden="true"
          viewBox="0 0 48 24"
          className={cn("h-5 w-10 shrink-0", arrow === "down-left" && "rotate-[-25deg]", arrow === "up-left" && "rotate-[25deg]")}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path className="annotation-stroke" d="M46 13c-9-5-21-6-41-1" />
          <path className="annotation-stroke" d="M11 6 4 12l8 5" />
        </svg>
      )}
      <span>{children}</span>
    </span>
  );
}
