import {
  Wrench,
  GitBranch,
  Shield,
  Database,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TerminalBlock } from "@/components/ui/TerminalBlock";
import { platformPillars } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
  Wrench,
  GitBranch,
  Shield,
  Database,
};

export function PlatformArchitectureSection() {
  return (
    <section className="border-b divider-subtle bg-slate-deep/20 py-20 lg:py-28">
      <Container>
        <FadeInOnScroll>
          <SectionHeading
            eyebrow="Platform architecture"
            title="Governed agentic infrastructure"
            description="A full-stack platform for deploying Virtual Employees — not a wrapper around a chat API. Every layer is designed for enterprise control, compliance, and deep structural integration."
            className="mb-12 lg:mb-16"
          />
        </FadeInOnScroll>

        <div className="space-y-0">
          {platformPillars.map((pillar, index) => {
            const Icon = iconMap[pillar.icon] ?? Wrench;
            const isReversed = index % 2 === 1;

            return (
              <FadeInOnScroll key={pillar.id} delay={index * 60}>
                <article
                  className={`card-trace grid gap-8 border-t divider-subtle py-12 first:border-t-0 first:pt-0 lg:grid-cols-2 lg:items-start lg:gap-16 lg:py-16 ${isReversed ? "lg:[&>div:first-child]:order-2 lg:[&>div:last-child]:order-1" : ""}`}
                >
                  <div>
                    <div className="flex items-start gap-5">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-deep text-amber-action">
                        <Icon className="h-7 w-7" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="font-mono text-xs font-medium tabular-nums text-amber-action">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="mt-1 font-heading text-xl font-semibold text-text-primary lg:text-2xl">
                          {pillar.title}
                        </h3>
                        <p className="mt-3 text-text-muted">{pillar.summary}</p>
                      </div>
                    </div>

                    <ul className="mt-8 space-y-3">
                      {pillar.capabilities.map((cap) => (
                        <li
                          key={cap}
                          className="flex items-start gap-3 border-l-2 border-amber-action/30 pl-4 text-sm text-text-muted"
                        >
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:pt-2">
                    <p className="mb-3 font-mono text-xs text-cyan-info">
                      platform.{pillar.id}
                    </p>
                    <TerminalBlock lines={pillar.terminal} />
                  </div>
                </article>
              </FadeInOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
