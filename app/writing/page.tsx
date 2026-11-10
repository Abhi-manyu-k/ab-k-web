import Link from "next/link";
import { Rss } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { pageMetadata } from "@/lib/metadata";
import { Annotation } from "@/components/ui/Annotation";
import { getAllEssays, getVisibleEssays, isPublished } from "@/lib/writing";

export const metadata = pageMetadata({
  title: "Writing",
  description:
    "Essays by Abhimanyu Kanwar on service agents, AI governance, machine data and AI in operations — written by an engineer who has serviced the machines.",
  path: "/writing",
});

const fmt = (d: string) => d.split("-").reverse().join(".");

export default async function WritingPage() {
  const essays = await getVisibleEssays();
  // Sheet numbers reserved for essays in preparation. Only the number is shown — never the title.
  const reserved = (await getAllEssays()).filter((e) => !essays.some((v) => v.slug === e.slug)).map((e) => e.number);

  return (
    <>
      <PageHero
        sheet="03"
        eyebrow="Writing"
        title={
          <>
            Drawing <em>register.</em>
          </>
        }
        description="Essays on service agents, governance, machine data and AI in operations. Each one is a sheet in the set."
      >
        <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3">
          <a href="/rss.xml" className="btn btn-line bg-paper">
            <Rss className="h-3.5 w-3.5" aria-hidden="true" />
            RSS feed
          </a>
          <Annotation rotate={-3}>first sheets are on the drawing board</Annotation>
        </div>
      </PageHero>

      <section className="py-20 lg:py-28">
        <Container>
          <div className="border border-ink">
            <div className="hidden grid-cols-[6rem_1fr_7rem_10rem] border-b border-ink bg-paper-2 font-mono text-[10px] uppercase tracking-[0.08em] text-muted md:grid">
              <span className="border-r border-ink px-4 py-2">No.</span>
              <span className="border-r border-ink px-4 py-2">Title</span>
              <span className="border-r border-ink px-4 py-2">Date</span>
              <span className="px-4 py-2">Topic</span>
            </div>

            {/* The register's frame holds still; its rows land in turn. */}
            {essays.length === 0 ? (
              <Reveal as="ol" stagger>
                {reserved.map((n) => (
                  <li
                    key={n}
                    className="sheet-reserved grid grid-cols-[5rem_1fr] border-b border-ink last:border-b-0 md:grid-cols-[6rem_1fr_7rem_10rem]"
                  >
                    <span className="border-r border-ink bg-paper px-4 py-5 font-mono text-[11px] text-muted">{n}</span>
                    <span className="flex items-center px-4 py-5 md:border-r md:border-ink">
                      <span className="bg-paper px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                        Sheet reserved · in preparation
                      </span>
                    </span>
                    <span className="hidden md:block md:border-r md:border-ink" />
                    <span className="hidden md:block" />
                  </li>
                ))}
              </Reveal>
            ) : (
              <Reveal as="ol" stagger>
                {essays.map((e) => (
                  <li key={e.slug} className="border-b border-ink last:border-b-0">
                    <Link
                      href={`/writing/${e.slug}`}
                      className="row-hover grid grid-cols-[5rem_1fr] md:grid-cols-[6rem_1fr_7rem_10rem]"
                    >
                      <span className="border-r border-ink px-4 py-5 font-mono text-[11px] text-muted">{e.number}</span>
                      <span className="px-4 py-5 md:border-r md:border-ink">
                        <span className="serif block text-2xl lg:text-3xl">{e.title}</span>
                        <span className="mt-2 block text-sm text-muted">{e.abstract}</span>
                        {!isPublished(e) && (
                          <span className="mt-3 inline-block border border-signal px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-signal">
                            Draft · not public
                          </span>
                        )}
                        <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.08em] text-muted md:hidden">
                          {e.date ? fmt(e.date) : "—"} · {e.topic}
                        </span>
                      </span>
                      <span className="hidden px-4 py-5 font-mono text-[11px] text-ink-2 md:block md:border-r md:border-ink">
                        {e.date ? fmt(e.date) : "—"}
                      </span>
                      <span className="hidden px-4 py-5 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-2 md:block">
                        {e.topic}
                      </span>
                    </Link>
                  </li>
                ))}
              </Reveal>
            )}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
