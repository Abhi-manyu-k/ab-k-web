import {
  Users,
  MessageSquare,
  Brain,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { coreConceptPoints } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
  Users,
  MessageSquare,
  Brain,
};

export function CoreConceptSection() {
  return (
    <section className="border-b divider-subtle py-16 lg:py-20">
      <Container>
        <FadeInOnScroll>
          <SectionHeading
            eyebrow="The shift"
            title="From tools to teammates"
            description="AI on the org chart — with roles, scoped access, and accountability."
            className="mb-10"
          />
        </FadeInOnScroll>

        <div className="grid gap-5 lg:grid-cols-3">
          {coreConceptPoints.map((point, index) => {
            const Icon = iconMap[point.icon] ?? Users;
            return (
              <FadeInOnScroll key={point.title} delay={index * 80}>
                <Card className="flex h-full flex-col">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-deep text-amber-action">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-semibold text-text-primary">
                    {point.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">
                    {point.description}
                  </p>
                </Card>
              </FadeInOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
