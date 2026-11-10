import { Reveal } from "@/components/ui/Reveal";
import { SplitWords } from "@/components/ui/SplitWords";
import { cn } from "@/lib/utils";

interface SheetHeaderProps {
  sheet: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: "paper" | "plate";
  className?: string;
}

/*
 * Entering view (globals.css, .sheet-head): the top rule is drawn left → right; the §0X note fades
 * in at once, SHEET 0X when the pen arrives (~700ms); the title words land from 150ms and the
 * intro rises at 350ms.
 */
export function SheetHeader({ sheet, label, title, intro, tone = "paper", className }: SheetHeaderProps) {
  return (
    <Reveal variant="none" className={cn("sheet-head", className)}>
      <div className="relative mb-10 flex items-baseline justify-between gap-4 border-b border-transparent pb-3 lg:mb-14">
        <span className={cn("note sheet-label", "!text-ink")}>
          <span className="text-signal">§{sheet}</span> — {label}
        </span>
        <span className="note sheet-no hidden sm:inline">Sheet {sheet}</span>
        <span aria-hidden="true" className={cn("sheet-rule", tone === "plate" ? "bg-ink/40" : "bg-ink")} />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
        <h2 className="display sheet-title text-[2.75rem] sm:text-6xl lg:text-[4.75rem]">
          <SplitWords>{title}</SplitWords>
        </h2>
        {intro && (
          <div className={cn("lead sheet-intro max-w-md", tone === "plate" && "!text-ink-2")}>{intro}</div>
        )}
      </div>
    </Reveal>
  );
}
