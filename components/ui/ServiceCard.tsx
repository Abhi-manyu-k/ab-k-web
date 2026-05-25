import {
  Target,
  Network,
  Cpu,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { services } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
  Target,
  Network,
  Cpu,
  Rocket,
};

interface ServiceCardProps {
  service: (typeof services)[number];
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon] ?? Target;

  return (
    <Card className="flex h-full flex-col">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-deep text-amber-action">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="font-heading text-xl font-semibold text-text-primary">
        {service.title}
      </h3>
      <p className="mt-3 flex-1 text-text-muted">{service.summary}</p>
      <ul className="mt-5 space-y-2 border-t divider-subtle pt-5">
        {service.capabilities.map((cap) => (
          <li key={cap} className="flex items-start gap-2 text-sm text-text-muted">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-action" />
            {cap}
          </li>
        ))}
      </ul>
    </Card>
  );
}
