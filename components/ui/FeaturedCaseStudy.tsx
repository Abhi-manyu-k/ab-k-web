import Image from "next/image";
import { caseStudies } from "@/lib/content";

type CaseStudy = (typeof caseStudies)[number];

interface FeaturedCaseStudyProps {
  study: CaseStudy;
}

export function FeaturedCaseStudy({ study }: FeaturedCaseStudyProps) {
  return (
    <article className="card-trace surface-elevated overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="p-8 lg:p-12">
          <span className="text-xs font-medium text-amber-action">Featured engagement</span>
          <h3 className="mt-3 font-heading text-2xl font-semibold text-text-primary lg:text-3xl">
            {study.title}
          </h3>

          <div className="mt-8 space-y-6">
            <div>
              <p className="font-mono text-xs text-cyan-info">context</p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{study.context}</p>
            </div>
            <div>
              <p className="font-mono text-xs text-cyan-info">challenge</p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{study.challenge}</p>
            </div>
            <div>
              <p className="font-mono text-xs text-cyan-info">intervention</p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {study.intervention}
              </p>
            </div>
            <div className="rounded-lg border-l-2 border-amber-action/60 pl-4">
              <p className="font-mono text-xs text-amber-action">impact</p>
              <p className="mt-2 text-sm leading-relaxed text-text-primary">{study.impact}</p>
            </div>
          </div>
        </div>

        <div className="relative min-h-[280px] border-t divider-subtle bg-white lg:min-h-full lg:border-t-0 lg:border-l">
          <Image
            src="/images/rag-whiteboard.png"
            alt="Agentic RAG architecture whiteboard diagram with hierarchical retrieval system"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </article>
  );
}
