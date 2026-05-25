import Image from "next/image";
import {
  Target,
  Network,
  Cpu,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/lib/content";
import { TerminalBlock } from "@/components/ui/TerminalBlock";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Target,
  Network,
  Cpu,
  Rocket,
};

const terminalArtifacts: Record<
  string,
  { type: "prompt" | "output" | "status" | "plain"; text: string }[]
> = {
  strategy: [
    { type: "prompt", text: "> roi_model.run(portfolio='enterprise_ai')" },
    { type: "output", text: "opportunities_mapped: 12" },
    { type: "output", text: "governance_gates: defined" },
    { type: "status", text: "status: board_ready" },
  ],
  production: [
    { type: "prompt", text: "> agent.deploy(mcp_pipeline)" },
    { type: "output", text: "environment: azure_prod" },
    { type: "output", text: "observability: enabled" },
    { type: "status", text: "status: live" },
  ],
};

interface ServiceBlockProps {
  service: (typeof services)[number];
  index: number;
}

function ServiceArtifact({ serviceId }: { serviceId: string }) {
  if (serviceId === "agentic") {
    return (
      <div className="overflow-hidden rounded-xl border border-slate-border/60 bg-white">
        <Image
          src="/images/rag-whiteboard.png"
          alt="Whiteboard diagram of Agentic RAG with hierarchical keyword, sentence, and chunk retrieval system"
          width={600}
          height={400}
          className="h-auto w-full object-cover object-top"
        />
      </div>
    );
  }

  if (serviceId === "integration") {
    return (
      <div className="overflow-hidden rounded-xl border border-slate-border/60">
        <Image
          src="/images/hero-artifact.png"
          alt="IDE with equipment agent code alongside field engineer on shop floor"
          width={600}
          height={380}
          className="h-auto w-full object-cover"
        />
      </div>
    );
  }

  const lines = terminalArtifacts[serviceId];
  if (lines) {
    return <TerminalBlock lines={lines} />;
  }

  return null;
}

export function ServiceBlock({ service, index }: ServiceBlockProps) {
  const Icon = iconMap[service.icon] ?? Target;

  return (
    <article
      className={cn(
        "card-trace grid gap-8 border-t divider-subtle py-12 first:border-t-0 first:pt-0 lg:grid-cols-2 lg:items-start lg:gap-16 lg:py-16",
      )}
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
              {service.title}
            </h3>
            <p className="mt-3 text-text-muted">{service.summary}</p>
          </div>
        </div>

        <ul className="mt-8 space-y-3">
          {service.capabilities.map((cap) => (
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
        <p className="mb-3 font-mono text-xs text-cyan-info">execution_artifact</p>
        <ServiceArtifact serviceId={service.id} />
      </div>
    </article>
  );
}
