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
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
    <section className="border-t divider-subtle py-20 lg:py-32">
      <Container>
        <div className="mb-16">
          <FadeInOnScroll>
            <SectionHeading
              eyebrow="Platform"
              title="Governed from the ground up"
              description="Harnesses, model routing, GDPR controls, and scoped memory — one stack, not a chat wrapper."
            />
          </FadeInOnScroll>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:gap-16">
          {platformPillars.map((pillar, index) => {
            const Icon = pillarIcons[pillar.icon] ?? Wrench;
            return (
              <FadeInOnScroll key={pillar.id} delay={index * 60}>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-text-muted" aria-hidden="true" />
                    <h3 className="serif-heading text-xl text-warm-white">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-[0.9375rem] leading-relaxed text-text-muted pl-8">{pillar.summary}</p>
                </div>
              </FadeInOnScroll>
            );
          })}
        </div>

        <hr className="hr-editorial my-16 lg:my-24" />

        <div className="mb-12">
          <FadeInOnScroll>
            <SectionHeading
              eyebrow="Examples"
              title="Virtual Employees in practice"
              description="Department-specific agents with scoped tools and governed memory."
            />
          </FadeInOnScroll>
        </div>

        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          {enterpriseUseCases.map((useCase, index) => {
            const Icon = useCaseIcons[useCase.icon] ?? BarChart3;
            return (
              <FadeInOnScroll key={useCase.id} delay={index * 60}>
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <Icon className="h-5 w-5 text-text-muted" aria-hidden="true" />
                    <span className="mono-label text-amber-action/80">
                      {useCase.department}
                    </span>
                  </div>
                  <h3 className="serif-heading text-xl text-warm-white">
                    {useCase.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-text-muted">
                    {useCase.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {useCase.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="text-xs text-text-muted border border-slate-border/50 px-2 py-1 rounded-md"
                      >
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
