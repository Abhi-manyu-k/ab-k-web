import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SheetHeader } from "@/components/ui/SheetHeader";
import { autonomyLevels, framework } from "@/lib/content";

/** Home §04 — a static elevation of the staircase; the interactive version lives on /framework. */
export function AutonomySection() {
  return (
    <section data-xray="Autonomy" className="bg-mm py-28 lg:py-44">
      <Container>
        <SheetHeader
          sheet="04"
          label="Section A–A · Autonomy"
          title={
            <>
              An agent <em>earns</em> the right to act.
            </>
          }
          intro="Autonomy is a staircase, not a switch. My framework defines five levels, what the agent and the human do at each, and the controls every step up requires."
        />

        {/* The steps land L0 → L4 on a baseline that is already drawn. */}
        <Reveal as="ol" stagger className="mt-20 flex h-56 items-end sm:h-64" aria-label="Autonomy levels L0 to L4">
          {autonomyLevels.map((l, i) => (
            <li
              key={l.level}
              className="flex min-w-0 flex-1 flex-col border-t border-l border-ink bg-paper/70 px-1.5 pt-3 last:border-r sm:px-3"
              style={{ height: `${28 + i * 18}%` }}
            >
              <span className="font-mono text-xs text-muted">{l.level}</span>
              <span className="serif mt-1 hyphens-auto break-words text-[13px] leading-tight text-ink sm:text-xl">{l.name}</span>
            </li>
          ))}
        </Reveal>
        <div className="h-px bg-ink" />

        <Reveal delay={200}>
          <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
            <span>Human does</span>
            <span>→ Autonomy →</span>
            <span>Agent does</span>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t rule pt-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-2">
              {framework.code} v{framework.version} · {framework.title}
            </p>
            <Link href="/framework" className="btn btn-ink">
              Read the autonomy framework
              <ArrowRight className="arrow h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
