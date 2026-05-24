import {
  Target,
  Network,
  Cpu,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { services } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
  Target,
  Network,
  Cpu,
  Rocket,
};

interface ServiceCardProps {
  service: (typeof services)[number];
  index?: number;
}

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const Icon = iconMap[service.icon] ?? Target;

  return (
    <AnimatedCard delay={index * 0.1} className="flex h-full flex-col">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-electric/20 to-cyan-neon/20 text-cyan-neon">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="font-heading text-xl font-semibold text-text-primary">
        {service.title}
      </h3>
      <p className="mt-3 flex-1 text-text-muted">{service.summary}</p>
      <ul className="mt-5 space-y-2 border-t border-slate-border pt-5">
        {service.capabilities.map((cap) => (
          <li key={cap} className="flex items-start gap-2 text-sm text-text-muted">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-neon" />
            {cap}
          </li>
        ))}
      </ul>
    </AnimatedCard>
  );
}
