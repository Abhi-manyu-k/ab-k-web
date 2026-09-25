import { cn } from "@/lib/utils";

interface SheetHeaderProps {
  sheet: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: "paper" | "plate";
  className?: string;
}

export function SheetHeader({ sheet, label, title, intro, tone = "paper", className }: SheetHeaderProps) {
  return (
    <div className={className}>
      <div
        className={cn(
          "mb-10 flex items-baseline justify-between gap-4 border-b pb-3 lg:mb-14",
          tone === "plate" ? "border-paper/30" : "rule-ink",
        )}
      >
        <span className={cn("note", tone === "plate" ? "!text-paper" : "!text-ink")}>
          <span className="text-signal">§{sheet}</span> — {label}
        </span>
        <span className="note hidden sm:inline">Sheet {sheet}</span>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
        <h2 className="display text-[2.75rem] sm:text-6xl lg:text-[4.75rem]">{title}</h2>
        {intro && (
          <div className={cn("lead max-w-md", tone === "plate" && "!text-paper/70")}>{intro}</div>
        )}
      </div>
    </div>
  );
}
