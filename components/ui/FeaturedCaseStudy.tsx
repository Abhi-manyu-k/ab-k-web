import Image from "next/image";
import { caseStudies } from "@/lib/content";

type CaseStudy = (typeof caseStudies)[number];

interface FeaturedCaseStudyProps {
  study: CaseStudy;
}

export function FeaturedCaseStudy({ study }: FeaturedCaseStudyProps) {
  return (
    <article className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
      <div>
        <span className="mono-label text-amber-action/80">Featured engagement</span>
        <h3 className="mt-4 serif-heading gradient-text text-3xl lg:text-4xl">
          {study.title}
        </h3>

        <div className="mt-10 space-y-8">
          <div>
            <p className="mono-label">context</p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-text-muted">{study.context}</p>
          </div>
          <div>
            <p className="mono-label">challenge</p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-text-muted">{study.challenge}</p>
          </div>
          <div>
            <p className="mono-label">intervention</p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-text-muted">
              {study.intervention}
            </p>
          </div>
          <div className="border-l border-slate-border/50 pl-5">
            <p className="mono-label mb-3">impact</p>
            <p className="text-[0.9375rem] leading-relaxed text-warm-white">{study.impact}</p>
          </div>
        </div>
      </div>
      
      <div className="relative aspect-square w-full lg:aspect-auto lg:h-[600px] border border-slate-border/50 rounded-lg overflow-hidden">
         <Image
            src="/images/rag-whiteboard.png"
            alt="Agentic RAG architecture whiteboard diagram with hierarchical retrieval system"
            fill
            className="object-cover object-center grayscale opacity-80 mix-blend-screen"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
      </div>
    </article>
  );
}
