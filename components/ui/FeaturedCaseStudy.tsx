import Image from "next/image";
import { caseStudies } from "@/lib/content";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";

type CaseStudy = (typeof caseStudies)[number];

interface FeaturedCaseStudyProps {
  study: CaseStudy;
}

export function FeaturedCaseStudy({ study }: FeaturedCaseStudyProps) {
  const steps = [
    ["Context", study.context],
    ["Challenge", study.challenge],
    ["Intervention", study.intervention],
  ] as const;

  return (
    <article className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
      <FadeInOnScroll>
        <span className="label flex items-center gap-3">
          <span className="text-signal">01</span> Featured engagement
        </span>
        <h2 className="serif mt-5 text-4xl text-paper lg:text-5xl">{study.title}</h2>

        <ol className="relative mt-12 space-y-8 border-l hairline pl-8">
          {steps.map(([label, text]) => (
            <li key={label} className="relative">
              <span className="absolute -left-[2.3rem] top-1.5 h-2.5 w-2.5 rounded-full border border-line-strong bg-ink" />
              <p className="label">{label}</p>
              <p className="mt-2 leading-relaxed text-muted">{text}</p>
            </li>
          ))}
          <li className="relative">
            <span className="absolute -left-[2.3rem] top-1.5 h-2.5 w-2.5 rounded-full bg-signal" />
            <p className="label !text-signal">Impact</p>
            <p className="serif mt-2 text-2xl leading-snug text-paper">{study.impact}</p>
          </li>
        </ol>
      </FadeInOnScroll>

      <FadeInOnScroll delay={120} className="lg:sticky lg:top-32">
        <div className="panel overflow-hidden p-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="/images/rag-whiteboard.webp"
              alt="Agentic RAG architecture whiteboard diagram with hierarchical retrieval system"
              fill
              className="object-cover grayscale-[0.4]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <p className="px-2 pt-3 pb-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-faint">
            Fig. 1 — Hierarchical retrieval architecture
          </p>
        </div>
      </FadeInOnScroll>
    </article>
  );
}
