import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { caseStudies } from "@/lib/content";

interface CaseStudyCardProps {
  study: (typeof caseStudies)[number];
  index?: number;
}

export function CaseStudyCard({ study, index = 0 }: CaseStudyCardProps) {
  return (
    <AnimatedCard delay={index * 0.1} className="flex h-full flex-col">
      <h3 className="font-heading text-xl font-semibold text-text-primary">
        {study.title}
      </h3>
      <div className="mt-5 space-y-4 text-sm">
        <div>
          <p className="font-medium uppercase tracking-wider text-cyan-neon">Context</p>
          <p className="mt-1 text-text-muted">{study.context}</p>
        </div>
        <div>
          <p className="font-medium uppercase tracking-wider text-cyan-neon">Challenge</p>
          <p className="mt-1 text-text-muted">{study.challenge}</p>
        </div>
        <div>
          <p className="font-medium uppercase tracking-wider text-cyan-neon">Intervention</p>
          <p className="mt-1 text-text-muted">{study.intervention}</p>
        </div>
        <div>
          <p className="font-medium uppercase tracking-wider text-cyan-neon">Impact</p>
          <p className="mt-1 text-text-muted">{study.impact}</p>
          {study.isPlaceholder && (
            <p className="mt-2 text-xs italic text-amber-action/80">
              Replace with real metric before public launch
            </p>
          )}
        </div>
      </div>
    </AnimatedCard>
  );
}
