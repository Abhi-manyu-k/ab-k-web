import { cn } from "@/lib/utils";

type Arrow = "left" | "down-left" | "up-left" | "up-right" | "none";

/**
 * A red-pen margin note, as a checker would scribble on a drawing.
 * Pure CSS + inline SVG — no extra fonts or images.
 *
 * `delay` (ms) times the note: the arrow draws at that moment and the words fade in with it.
 * Without it the note keeps its default behaviour (arrow draws at 0.6s, words always visible).
 */
export function Annotation({
  children,
  arrow = "left",
  className,
  rotate = -3,
  delay,
}: {
  children: React.ReactNode;
  arrow?: Arrow;
  className?: string;
  rotate?: number;
  delay?: number;
}) {
  const style: React.CSSProperties & Record<string, string> = { transform: `rotate(${rotate}deg)` };
  if (delay !== undefined) style["--annotation-delay"] = `${delay}ms`;

  return (
    <span
      className={cn(
        "annotation pointer-events-none inline-flex select-none items-center gap-1.5",
        delay !== undefined && "annotation-timed",
        className,
      )}
      style={style}
    >
      {arrow !== "none" && arrow !== "up-right" && (
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
      <span className="annotation-text">{children}</span>
      {/* up-right: the same stroke mirrored, set after the words so its tip is the note's right end. */}
      {arrow === "up-right" && (
        <svg
          aria-hidden="true"
          viewBox="0 0 48 24"
          className="h-5 w-10 shrink-0 -scale-x-100 rotate-[-25deg]"
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
    </span>
  );
}
