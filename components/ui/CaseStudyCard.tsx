import { Card } from "@/components/ui/Card";
import { caseStudies } from "@/lib/content";

interface CaseStudyCardProps {
  study: (typeof caseStudies)[number];
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <h3 className="font-heading text-xl font-semibold text-text-primary">
        {study.title}
      </h3>
      <div className="mt-5 space-y-4 text-sm">
        <div>
          <p className="font-mono text-xs text-cyan-info">context</p>
          <p className="mt-1 text-text-muted">{study.context}</p>
        </div>
        <div>
          <p className="font-mono text-xs text-cyan-info">challenge</p>
          <p className="mt-1 text-text-muted">{study.challenge}</p>
        </div>
        <div>
          <p className="font-mono text-xs text-cyan-info">intervention</p>
          <p className="mt-1 text-text-muted">{study.intervention}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-amber-action">Impact</p>
          <p className="mt-1 text-text-muted">{study.impact}</p>
        </div>
      </div>
    </Card>
  );
}
