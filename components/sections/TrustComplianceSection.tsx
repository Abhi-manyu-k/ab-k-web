import {
  Lock,
  FileText,
  Globe,
  Server,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { NeuralNetworkVisual } from "@/components/ui/NeuralNetworkVisual";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { complianceFeatures } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
  Lock,
  FileText,
  Globe,
  Server,
};

export function TrustComplianceSection() {
  return (
    <section className="relative overflow-hidden border-b divider-subtle py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_50%,rgba(103,232,249,0.06),transparent)]" />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <FadeInOnScroll className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="overflow-hidden rounded-xl border border-slate-border/60 bg-slate-deep/60 p-6 lg:p-10">
                <NeuralNetworkVisual size="sm" />
              </div>
              <div className="absolute -right-2 -top-2 rounded-md border border-amber-action/30 bg-onyx px-3 py-1.5 font-mono text-xs text-amber-action">
                EU / DE
              </div>
            </div>
          </FadeInOnScroll>

          <div className="order-1 lg:order-2">
            <FadeInOnScroll>
              <SectionHeading
                eyebrow="Trust & compliance"
                title="Built for Germany. Built for the EU."
                description="German enterprises don't need more AI demos — they need governed systems their compliance teams can approve. Every layer of our platform is designed for data sovereignty, auditability, and regulatory confidence."
              />
            </FadeInOnScroll>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {complianceFeatures.map((feature, index) => {
                const Icon = iconMap[feature.icon] ?? Lock;
                return (
                  <FadeInOnScroll key={feature.title} delay={index * 60}>
                    <div className="surface-card rounded-xl p-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-deep text-cyan-info">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="mt-4 font-heading text-sm font-semibold text-text-primary">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">
                        {feature.description}
                      </p>
                    </div>
                  </FadeInOnScroll>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
