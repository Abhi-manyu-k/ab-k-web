import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index?: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-3xl text-center", className)}>
      {eyebrow && (
        <p className={cn("label mb-5 flex items-center gap-3", align === "center" && "justify-center")}>
          {index && <span className="text-signal">§{index}</span>}
          <span>{eyebrow}</span>
        </p>
      )}
      <h2 className="serif text-[2.25rem] sm:text-5xl lg:text-[3.5rem]">{title}</h2>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-xl text-base leading-relaxed text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
