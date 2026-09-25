import Image from "next/image";
import { Target, Network, Cpu, Rocket, type LucideIcon } from "lucide-react";
import { services } from "@/lib/content";
import { TerminalBlock } from "@/components/ui/TerminalBlock";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";

const iconMap: Record<string, LucideIcon> = { Target, Network, Cpu, Rocket };

const terminalArtifacts: Record<
  string,
  { type: "prompt" | "output" | "status" | "plain"; text: string }[]
> = {
  strategy: [
    { type: "prompt", text: "$ roi_model.run(portfolio='enterprise_ai')" },
    { type: "output", text: "  opportunities_mapped   12" },
    { type: "output", text: "  governance_gates       defined" },
    { type: "output", text: "  payback_estimate       < 9 months" },
    { type: "status", text: "✓ status: board_ready" },
  ],
  production: [
    { type: "prompt", text: "$ agent.deploy(mcp_pipeline)" },
    { type: "output", text: "  environment            azure_prod" },
    { type: "output", text: "  observability          enabled" },
    { type: "output", text: "  audit_log              streaming" },
    { type: "status", text: "✓ status: live" },
  ],
};

const images: Record<string, { src: string; alt: string }> = {
  agentic: {
    src: "/images/rag-whiteboard.webp",
    alt: "Whiteboard diagram of Agentic RAG with hierarchical keyword, sentence, and chunk retrieval system",
  },
  integration: {
    src: "/images/hero-artifact.webp",
    alt: "IDE with equipment agent code alongside field engineer on shop floor",
  },
};

interface ServiceBlockProps {
  service: (typeof services)[number];
  index: number;
}

function ServiceArtifact({ serviceId }: { serviceId: string }) {
  const image = images[serviceId];
  if (image) {
    return (
      <div className="overflow-hidden rounded-2xl border hairline">
        <Image
          src={image.src}
          alt={image.alt}
          width={1200}
          height={800}
          className="h-auto w-full object-cover opacity-90 transition-[transform,opacity] duration-700 hover:scale-[1.02] hover:opacity-100"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    );
  }

  const lines = terminalArtifacts[serviceId];
  return lines ? <TerminalBlock lines={lines} /> : null;
}

export function ServiceBlock({ service, index }: ServiceBlockProps) {
  const Icon = iconMap[service.icon] ?? Target;

  return (
    <article className="grid gap-10 border-t hairline py-16 first:border-t-0 first:pt-0 lg:grid-cols-2 lg:items-start lg:gap-20 lg:py-24">
      <FadeInOnScroll className="lg:sticky lg:top-32">
        <div className="flex items-center gap-4">
          <span className="display text-6xl text-ink-3 [-webkit-text-stroke:1px_var(--color-line-strong)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border hairline text-signal">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
        <h2 className="serif mt-6 text-3xl text-paper lg:text-[2.75rem]">{service.title}</h2>
        <p className="mt-5 max-w-lg leading-relaxed text-muted">{service.summary}</p>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-xl border hairline bg-line">
          {service.capabilities.map((cap) => (
            <li key={cap} className="flex items-start gap-3 bg-ink px-5 py-3.5 text-sm text-paper">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden="true" />
              {cap}
            </li>
          ))}
        </ul>
      </FadeInOnScroll>

      <FadeInOnScroll delay={120} className="lg:pt-24">
        <p className="label mb-4">Execution artifact</p>
        <ServiceArtifact serviceId={service.id} />
      </FadeInOnScroll>
    </article>
  );
}
