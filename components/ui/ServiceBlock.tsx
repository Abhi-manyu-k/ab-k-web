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
      <div className="overflow-hidden border border-slate-border/50">
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
      <div className="overflow-hidden border border-slate-border/50">
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
        "grid gap-10 border-t divider-subtle py-16 first:border-t-0 first:pt-0 lg:grid-cols-2 lg:items-start lg:gap-20 lg:py-24",
      )}
    >
      <div>
        <div className="flex items-start gap-5">
          <div className="pt-1 text-text-muted">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <span className="mono-label block mb-2 text-amber-action/80">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="serif-heading text-2xl text-warm-white lg:text-3xl">
              {service.title}
            </h3>
            <p className="mt-4 leading-relaxed text-text-muted">{service.summary}</p>
          </div>
        </div>

        <ul className="mt-10 space-y-4">
          {service.capabilities.map((cap) => (
            <li
              key={cap}
              className="flex items-start gap-3 border-l border-slate-border/50 pl-5 text-[0.9375rem] text-text-muted"
            >
              {cap}
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:pt-2">
        <p className="mono-label mb-4 text-text-muted">execution_artifact</p>
        <ServiceArtifact serviceId={service.id} />
      </div>
    </article>
  );
}
