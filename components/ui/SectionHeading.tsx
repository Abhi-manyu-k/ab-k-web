import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-3xl text-center",
        align === "center" && "[&_.eyebrow]:justify-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="display-heading text-3xl text-text-primary sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-text-muted sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
