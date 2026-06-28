import {
  Wrench,
  GitBranch,
  Shield,
  Database,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { platformPillars } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
  Wrench,
  GitBranch,
  Shield,
  Database,
};

export function PlatformArchitectureSection() {
  return (
    <section className="border-b divider-subtle bg-slate-deep/20 py-16 lg:py-20">
      <Container>
        <FadeInOnScroll>
          <SectionHeading
            eyebrow="Platform"
            title="Governed from the ground up"
            description="Harnesses, model routing, GDPR controls, and scoped memory — one stack, not a chat wrapper."
            className="mb-10"
          />
        </FadeInOnScroll>

        <div className="grid gap-4 sm:grid-cols-2">
          {platformPillars.map((pillar, index) => {
            const Icon = iconMap[pillar.icon] ?? Wrench;
            return (
              <FadeInOnScroll key={pillar.id} delay={index * 60}>
                <Card className="flex h-full flex-row items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-deep text-amber-action">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-text-primary">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-text-muted">{pillar.summary}</p>
                  </div>
                </Card>
              </FadeInOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
