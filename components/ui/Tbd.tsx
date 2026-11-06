import { cn } from "@/lib/utils";

/**
 * A visibly marked placeholder ("to be defined"), drawn like an open dimension on a drawing.
 * Every use is a TODO(launch) item for the author.
 */
export function Tbd({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block border border-dashed border-signal px-1.5 py-px font-mono text-[0.85em] normal-case tracking-normal text-signal",
        className,
      )}
    >
      [TBD: {children}]
    </span>
  );
}
