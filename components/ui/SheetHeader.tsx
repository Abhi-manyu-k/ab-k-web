import { Reveal } from "@/components/ui/Reveal";
import { SplitWords } from "@/components/ui/SplitWords";
import { cn } from "@/lib/utils";

interface SheetHeaderProps {
  sheet: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: "paper" | "plate";
  /** Optional quiet figure (e.g. a SignalField) above the intro, shown from lg up. */
  figure?: React.ReactNode;
  className?: string;
}

/*
 * Entering view (globals.css, .sheet-head): the top rule is drawn left → right; the §0X note fades
 * in at once; the title words land from 150ms and the intro rises at 350ms.
 */
export function SheetHeader({ sheet, label, title, intro, tone = "paper", figure, className }: SheetHeaderProps) {
  return (
    <Reveal variant="none" data-xray="Sheet header" className={cn("sheet-head", className)}>
      <div className="relative mb-10 flex items-baseline gap-4 border-b border-transparent pb-3 lg:mb-14">
        <span className={cn("note sheet-label", "!text-ink")}>
          <span className="text-signal">§{sheet}</span> — {label}
        </span>
        <span aria-hidden="true" className={cn("sheet-rule", tone === "plate" ? "bg-ink/40" : "bg-ink")} />
      </div>
      <div className={cn("grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:gap-16", figure ? "lg:items-start" : "lg:items-end")}>
        <h2 className="display sheet-title text-[2.75rem] sm:text-6xl lg:text-[3.125rem] xl:text-[4rem]">
          <SplitWords>{title}</SplitWords>
        </h2>
        {(intro || figure) && (
          <div>
            {figure && <div className="sheet-intro mb-12 hidden lg:block">{figure}</div>}
            {intro && <div className={cn("lead sheet-intro max-w-md", tone === "plate" && "!text-ink-2")}>{intro}</div>}
          </div>
        )}
      </div>
    </Reveal>
  );
}
