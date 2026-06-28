import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { legacyExpertise } from "@/lib/content";

export function LegacyExpertiseSection() {
  return (
    <section className="border-b divider-subtle bg-slate-deep/20 py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeInOnScroll>
            <div className="overflow-hidden rounded-xl border border-slate-border/60 bg-slate-deep">
              <Image
                src="/images/rag-whiteboard.png"
                alt="Hierarchical knowledge graph architecture diagram showing agentic RAG with keyword, sentence, and chunk retrieval layers"
                width={700}
                height={500}
                className="h-auto w-full object-cover object-top"
              />
            </div>
            <p className="mt-3 font-mono text-xs text-text-muted">
              <span className="text-cyan-info">knowledge_graph.py</span>
              {" | "}
              hierarchical agentic RAG
            </p>
          </FadeInOnScroll>

          <FadeInOnScroll delay={100}>
            <SectionHeading
              eyebrow={legacyExpertise.eyebrow}
              title={legacyExpertise.title}
              description={legacyExpertise.description}
            />

            <dl className="mt-10 grid grid-cols-3 gap-6">
              {legacyExpertise.metrics.map((metric) => (
                <div key={metric.label}>
                  <dt className="display-heading text-2xl text-amber-action lg:text-3xl">
                    {metric.value}
                  </dt>
                  <dd className="mt-1 text-xs text-text-muted">{metric.label}</dd>
                </div>
              ))}
            </dl>

            <Link
              href="/case-studies"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-amber-action transition-all hover:gap-3"
            >
              View deployment track record
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </FadeInOnScroll>
        </div>
      </Container>
    </section>
  );
}
