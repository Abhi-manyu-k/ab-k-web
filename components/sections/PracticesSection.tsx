import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { SheetHeader } from "@/components/ui/SheetHeader";
import { practices } from "@/lib/content";

export function PracticesSection() {
  return (
    <section className="border-t rule-ink py-20 lg:py-32">
      <Container>
        <FadeInOnScroll>
          <SheetHeader
            sheet="03"
            label="Parts list"
            title={
              <>
                Four practices, <em>one assembly.</em>
              </>
            }
            intro="Each practice works alone. Together they take an agent from first idea to governed production — on the machine and in the office."
          />
        </FadeInOnScroll>

        <FadeInOnScroll>
          <div className="mt-16 border border-ink">
            <div className="hidden grid-cols-[4rem_1.1fr_1.6fr_1fr_3rem] border-b border-ink bg-paper-2 font-mono text-[10px] uppercase tracking-[0.08em] text-muted md:grid">
              <span className="border-r border-ink px-3 py-2">Pos.</span>
              <span className="border-r border-ink px-3 py-2">Designation</span>
              <span className="border-r border-ink px-3 py-2">Scope</span>
              <span className="border-r border-ink px-3 py-2">Format</span>
              <span className="px-3 py-2" />
            </div>
            {practices.map((p, i) => (
              <Link
                key={p.id}
                href={`/services#${p.id}`}
                className="group grid grid-cols-[3rem_1fr_2.5rem] border-b border-ink transition-colors last:border-b-0 hover:bg-ink hover:text-paper md:grid-cols-[4rem_1.1fr_1.6fr_1fr_3rem]"
              >
                <span className="flex items-start justify-center border-r border-ink pt-6 group-hover:border-paper/30">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-current font-mono text-[11px]">
                    {i + 1}
                  </span>
                </span>
                <span className="px-4 py-6 md:border-r md:border-ink md:group-hover:border-paper/30">
                  <span className="block font-mono text-[10px] text-faint">{p.code}</span>
                  <span className="serif mt-1 block text-3xl lg:text-4xl">{p.title}</span>
                  <span className="mt-3 block text-sm text-muted group-hover:text-paper/70 md:hidden">{p.summary}</span>
                </span>
                <span className="hidden px-4 py-6 text-sm text-ink-2 group-hover:text-paper/80 md:block md:border-r md:border-ink md:group-hover:border-paper/30">
                  <span className="serif block text-lg italic text-ink group-hover:text-paper">{p.headline}</span>
                  <span className="mt-2 block">{p.summary}</span>
                </span>
                <span className="hidden px-4 py-6 font-mono text-[11px] leading-relaxed text-muted group-hover:text-paper/70 md:block md:border-r md:border-ink md:group-hover:border-paper/30">
                  {p.format}
                </span>
                <span className="flex items-start justify-center pt-7">
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </FadeInOnScroll>
      </Container>
    </section>
  );
}
