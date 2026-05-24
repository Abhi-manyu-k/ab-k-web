import {
  Target,
  Network,
  Cpu,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/lib/content";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Target,
  Network,
  Cpu,
  Rocket,
};

interface ServiceBlockProps {
  service: (typeof services)[number];
  index: number;
}

export function ServiceBlock({ service, index }: ServiceBlockProps) {
  const Icon = iconMap[service.icon] ?? Target;
  const isReversed = index % 2 === 1;

  return (
    <article
      className={cn(
        "grid gap-8 border-t divider-subtle py-12 first:border-t-0 first:pt-0 lg:grid-cols-2 lg:items-start lg:gap-16 lg:py-16",
        isReversed && "lg:[&>div:first-child]:order-2",
      )}
    >
      <div className="flex items-start gap-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-deep text-cyan-neon">
          <Icon className="h-7 w-7" aria-hidden="true" />
        </div>
        <div>
          <span className="text-xs font-medium tabular-nums text-amber-action">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-1 font-heading text-xl font-semibold text-text-primary lg:text-2xl">
            {service.title}
          </h3>
          <p className="mt-3 text-text-muted">{service.summary}</p>
        </div>
      </div>

      <ul className="space-y-3 lg:pt-2">
        {service.capabilities.map((cap) => (
          <li
            key={cap}
            className="flex items-start gap-3 border-l-2 border-slate-border/60 pl-4 text-sm text-text-muted"
          >
            {cap}
          </li>
        ))}
      </ul>
    </article>
  );
}
