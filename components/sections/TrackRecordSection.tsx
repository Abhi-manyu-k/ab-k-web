import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { SheetHeader } from "@/components/ui/SheetHeader";
import { fieldMetrics, trackRecord } from "@/lib/content";

export function TrackRecordSection({
  id,
  sheet = "05",
  showLink = true,
}: {
  id?: string;
  sheet?: string;
  showLink?: boolean;
}) {
  return (
    <section id={id} className="plate scroll-mt-14 py-20 lg:py-32">
      <Container>
        <SheetHeader
          sheet={sheet}
          label="Track record"
          tone="plate"
          title={
            <>
              Built by someone who has <em>held the wrench.</em>
            </>
          }
          intro="Before building agents, I trained engineers on the machines and serviced them on the shop floor. That's why I know what an agent is touching."
        />

        {/* Cell lines hold still; each metric's ink lands, one after another. */}
        <ul className="mt-16 grid border-t border-plate-line sm:grid-cols-3">
          {fieldMetrics.map((m, i) => (
            <Reveal
              as="li"
              stagger
              delay={i * 120}
              key={m.label}
              className="border-b border-plate-line py-8 sm:border-b-0 sm:border-r sm:px-8 sm:first:pl-0 sm:last:border-r-0"
            >
              <p className="display text-7xl text-paper lg:text-8xl">
                <CountUp value={m.value} />
              </p>
              <p className="mt-4 max-w-xs text-sm text-paper/70">{m.label}</p>
            </Reveal>
          ))}
        </ul>

        {/* The card pair: card surfaces stay (no plate-line flash through the gaps), their contents land in turn. */}
        <div className="mt-16 grid gap-px bg-plate-line lg:grid-cols-2">
          {trackRecord.map((n, i) => (
            <Reveal as="article" stagger delay={i * 120} key={n.id} className="flex h-full flex-col bg-plate p-6 lg:p-10">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.08em]">
                <span className="text-paper/60">N-{String(i + 1).padStart(2, "0")}</span>
                <span className="text-paper/70">{n.tag}</span>
              </div>
              <h3 className="serif mt-10 text-3xl text-paper lg:text-4xl">{n.title}</h3>
              <p className="mt-4 text-paper/85">{n.context}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-paper/70">{n.detail}</p>
              <p className="mt-8 border-t border-plate-line pt-4 font-mono text-[11px] leading-relaxed text-paper">
                → {n.impact}
              </p>
            </Reveal>
          ))}
        </div>

        {showLink && (
          <Reveal className="mt-10">
            <Link href="/talks" className="note link inline-flex items-center gap-2 !text-paper">
              Talks & publications <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
