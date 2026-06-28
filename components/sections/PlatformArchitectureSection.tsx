import {
  Wrench,
  GitBranch,
  Shield,
  Database,
  BarChart3,
  Headphones,
  Scale,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VirtualEmployeeMark } from "@/components/ui/VirtualEmployeeMark";
import { enterpriseUseCases, platformPillars } from "@/lib/content";

const pillarIcons: Record<string, LucideIcon> = {
  Wrench,
  GitBranch,
  Shield,
  Database,
};

const useCaseIcons: Record<string, LucideIcon> = {
  BarChart3,
  Headphones,
  Scale,
};

export function PlatformArchitectureSection() {
  return (
    <section className="border-b divider-subtle bg-slate-deep/20 py-16 lg:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.7fr] lg:items-center lg:gap-16">
          <FadeInOnScroll>
            <SectionHeading
              eyebrow="Platform"
              title="Governed from the ground up"
              description="Harnesses, model routing, GDPR controls, and scoped memory — one stack, not a chat wrapper."
            />
          </FadeInOnScroll>

          <FadeInOnScroll delay={80} className="hidden justify-center lg:flex">
            <div className="flex h-48 w-48 items-center justify-center rounded-2xl border border-slate-border/30 bg-onyx/50">
              <VirtualEmployeeMark size="md" />
            </div>
          </FadeInOnScroll>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {platformPillars.map((pillar, index) => {
            const Icon = pillarIcons[pillar.icon] ?? Wrench;
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

        <div className="mt-16 border-t divider-subtle pt-12">
          <FadeInOnScroll>
            <SectionHeading
              eyebrow="Examples"
              title="Virtual Employees in practice"
              description="Department-specific agents with scoped tools and governed memory."
              className="mb-8"
            />
          </FadeInOnScroll>

          <div className="grid gap-4 lg:grid-cols-3">
            {enterpriseUseCases.map((useCase, index) => {
              const Icon = useCaseIcons[useCase.icon] ?? BarChart3;
              return (
                <FadeInOnScroll key={useCase.id} delay={index * 60}>
                  <Card className="flex h-full flex-col">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-deep text-amber-action">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="rounded-full border border-slate-border/50 bg-slate-deep px-2.5 py-0.5 font-mono text-[0.6875rem] text-cyan-info">
                        {useCase.department}
                      </span>
                    </div>
                    <h3 className="mt-4 font-heading text-base font-semibold text-text-primary">
                      {useCase.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-text-muted">{useCase.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {useCase.capabilities.map((cap) => (
                        <li
                          key={cap}
                          className="rounded-md border border-slate-border/40 bg-onyx/50 px-2 py-0.5 text-[0.6875rem] text-text-muted"
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
        </div>
      </Container>
    </section>
  );
}
