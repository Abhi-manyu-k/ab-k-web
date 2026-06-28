import {
  BarChart3,
  Headphones,
  Scale,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { enterpriseUseCases } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
  BarChart3,
  Headphones,
  Scale,
};

export function UseCasesSection() {
  return (
    <section className="border-b divider-subtle py-20 lg:py-28">
      <Container>
        <FadeInOnScroll>
          <SectionHeading
            eyebrow="Use cases"
            title="Virtual Employees across the enterprise"
            description="Department-specific agents with scoped tools, governed memory, and model routing policies — deployed where your teams need them, not where a vendor dictates."
            className="mb-12 lg:mb-16"
          />
        </FadeInOnScroll>

        <div className="grid gap-5 lg:grid-cols-3">
          {enterpriseUseCases.map((useCase, index) => {
            const Icon = iconMap[useCase.icon] ?? BarChart3;
            return (
              <FadeInOnScroll key={useCase.id} delay={index * 80}>
                <Card className="flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-deep text-amber-action">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <span className="rounded-full border border-slate-border/60 bg-slate-deep px-3 py-1 font-mono text-xs text-cyan-info">
                      {useCase.department}
                    </span>
                  </div>

                  <h3 className="mt-5 font-heading text-xl font-semibold text-text-primary">
                    {useCase.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">
                    {useCase.description}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {useCase.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="rounded-md border border-slate-border/40 bg-onyx/50 px-2.5 py-1 text-xs text-text-muted"
                      >
                        {cap}
                      </li>
                    ))}
                  </ul>
                </Card>
              </FadeInOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
