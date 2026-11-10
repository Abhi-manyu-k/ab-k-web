import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SheetHeader } from "@/components/ui/SheetHeader";
import { workAreas } from "@/lib/content";
import { essayHref, getAllEssays } from "@/lib/writing";

/** §03 — Four areas I work on (parts-list layout). */
export async function PracticesSection() {
  const essays = await getAllEssays();
  const rows = await Promise.all(
    workAreas.map(async (a) => {
      if ("href" in a.readMore) return { ...a, href: a.readMore.href, linkLabel: a.readMore.label };
      const { essay, fallback } = a.readMore;
      const href = await essayHref(essay, fallback);
      const title = essays.find((e) => e.slug === essay)?.title;
      const linkLabel = href === fallback ? (fallback === "/governance" ? "Governance notes" : "Writing") : (title ?? "Essay");
      return { ...a, href, linkLabel };
    }),
  );

  return (
    <section className="py-28 lg:py-44">
      <Container>
        <SheetHeader
          sheet="03"
          label="Parts list"
          title={
            <>
              Four areas <em>I work on.</em>
            </>
          }
          intro="Each area stands on its own. Together they take an agent from first idea to something you can trust on a real machine."
        />

        {/* The header rule holds still; the header row, then each part, lands in turn. */}
        <Reveal stagger className="mt-20">
          <div className="hidden grid-cols-[4rem_1.1fr_1.6fr_1fr_3rem] border-b rule-ink font-mono text-[10px] uppercase tracking-[0.08em] text-muted md:grid">
            <span className="px-3 py-2">Pos.</span>
            <span className="px-4 py-2">Designation</span>
            <span className="px-4 py-2">Scope</span>
            <span className="px-4 py-2">Read more</span>
            <span className="px-3 py-2" />
          </div>
          {rows.map((p, i) => (
            <Link
              key={p.id}
              href={p.href}
              className="row-hover grid grid-cols-[3rem_1fr_2.5rem] border-b rule py-8 md:grid-cols-[4rem_1.1fr_1.6fr_1fr_3rem]"
            >
              <span className="flex items-start justify-center">
                <span className="row-pos flex h-7 w-7 items-center justify-center rounded-full border border-current font-mono text-[11px]">
                  {i + 1}
                </span>
              </span>
              <span className="px-4">
                <span className="block font-mono text-[10px] text-muted">{p.code}</span>
                <span className="serif mt-1 block text-3xl lg:text-4xl">{p.title}</span>
                <span className="mt-3 block text-sm text-muted md:hidden">{p.summary}</span>
                <span className="mt-3 block font-mono text-[11px] text-ink-2 md:hidden">Read more → {p.linkLabel}</span>
              </span>
              <span className="hidden px-4 text-sm text-ink-2 md:block">
                <span className="serif block text-lg italic text-ink">{p.headline}</span>
                <span className="mt-2 block">{p.summary}</span>
              </span>
              <span className="hidden px-4 font-mono text-[11px] leading-relaxed text-ink-2 md:block">
                <span className="link">{p.linkLabel}</span>
              </span>
              <span className="flex items-start justify-center pt-1.5">
                <ArrowUpRight className="row-arrow h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
