import { Wrench, GitBranch, Shield, Database, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { complianceFeatures, platformPillars } from "@/lib/content";

const pillarIcons: Record<string, LucideIcon> = { Wrench, GitBranch, Shield, Database };
const layerTags = ["integration", "routing", "governance", "memory"];

export function PlatformSection() {
  return (
    <section className="relative border-t hairline bg-ink-2/40 py-24 lg:py-36">
      <Container>
        <FadeInOnScroll>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              index="02"
              eyebrow="Platform"
              title={
                <>
                  One governed stack —
                  <br />
                  <em className="accent-italic">not a chat wrapper.</em>
                </>
              }
            />
            <p className="max-w-sm text-muted">
              Every Virtual Employee runs on the same four layers. Swap models, add departments, pass audits —
              without rebuilding.
            </p>
          </div>
        </FadeInOnScroll>

        <ol className="mt-16 border-t hairline">
          {platformPillars.map((pillar, index) => {
            const Icon = pillarIcons[pillar.icon] ?? Wrench;
            return (
              <FadeInOnScroll key={pillar.id} delay={index * 70}>
                <li className="group relative grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-2 border-b hairline py-8 transition-colors hover:bg-ink-3/40 sm:grid-cols-[4rem_1.1fr_1.4fr_auto] sm:px-4 lg:py-10">
                  <span className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-signal transition-transform duration-500 group-hover:scale-y-100" aria-hidden="true" />
                  <span className="font-mono text-xs text-faint transition-colors group-hover:text-signal">
                    L{index + 1}
                  </span>
                  <h3 className="serif text-3xl text-paper lg:text-4xl">{pillar.title}</h3>
                  <p className="col-span-2 text-muted sm:col-span-1">{pillar.summary}</p>
                  <span className="hidden items-center gap-3 sm:flex">
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-faint">
                      {layerTags[index]}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border hairline text-muted transition-colors group-hover:border-signal group-hover:text-signal">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </span>
                </li>
              </FadeInOnScroll>
            );
          })}
        </ol>

        <FadeInOnScroll>
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border hairline bg-line sm:grid-cols-2 lg:grid-cols-4">
            {complianceFeatures.map((feature) => (
              <div key={feature.title} className="bg-ink p-6">
                <p className="flex items-center gap-2 text-sm font-medium text-paper">
                  <span className="h-1.5 w-1.5 rounded-full bg-live" />
                  {feature.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-faint">{feature.description}</p>
              </div>
            ))}
          </div>
        </FadeInOnScroll>
      </Container>
    </section>
  );
}
