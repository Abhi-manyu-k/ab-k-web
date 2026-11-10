import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SheetHeader } from "@/components/ui/SheetHeader";
import { RegulationTimeline } from "@/components/ui/RegulationTimeline";
import { CTASection } from "@/components/sections/CTASection";
import { autonomyLevels, framework, regulationBriefs, sources } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "AI governance for industry",
  description:
    "How I read the AI Act, Machinery Regulation, Data Act and Cyber Resilience Act as an engineer: the dates that matter and the controls they imply for AI agents on machines.",
  path: "/governance",
});

export default function GovernancePage() {
  return (
    <>
      <PageHero
        sheet="02"
        eyebrow="AI governance for industry"
        title={
          <>
            Regulation, translated into <em>controls you can build.</em>
          </>
        }
        description="Four EU regulations now touch AI on machines. I translate them into autonomy levels, approval gates and audit trails — so compliance speeds agents up instead of freezing them."
      />

      <section className="py-20 lg:py-28">
        <Container>
          <SheetHeader
            sheet="01"
            label="Revision history"
            title={
              <>
                The dates that <em>matter.</em>
              </>
            }
            intro="Reflects the Digital Omnibus on AI (Regulation (EU) 2026/1744), which deferred the high-risk deadlines. Status is calculated live from today's date."
          />
          {/* The timeline draws itself on view. */}
          <div className="mt-14">
            <RegulationTimeline />
          </div>
        </Container>
      </section>

      <section className="border-t rule py-20 lg:py-28">
        <Container>
          <SheetHeader
            sheet="02"
            label="Questions machine builders ask"
            title={
              <>
                Three questions, <em>straight answers.</em>
              </>
            }
          />
          {/* Hairlines hold still between the answers; their contents land one after another. */}
          <div className="mt-14 grid gap-y-10 lg:grid-cols-3 lg:gap-y-0">
            {regulationBriefs.map((b, i) => (
              <Reveal
                as="article"
                stagger
                delay={i * 120}
                key={b.instrument}
                className={`rule flex h-full flex-col ${i > 0 ? "border-t pt-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8" : ""} ${i === regulationBriefs.length - 1 ? "" : "lg:pr-8"}`}
              >
                <p className="note">
                  <span className="text-signal">Q{i + 1}</span> · {b.instrument}
                </p>
                <h3 className="serif mt-8 text-3xl text-ink">{b.question}</h3>
                <p className="mt-4 text-ink-2">{b.answer}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-mm border-t rule py-20 lg:py-28">
        <Container>
          <SheetHeader
            sheet="03"
            label="The framework"
            title={
              <>
                Autonomy, <em>by level.</em>
              </>
            }
            intro="The core of the governance question: decide how much an agent may do, then build exactly the controls that level requires — no more, no less."
          />
          {/* Hairlines hold still between the levels; each level's ink lands L0 → L4. */}
          <ul className="mt-14 grid sm:grid-cols-5">
            {autonomyLevels.map((l, i) => (
              <li
                key={l.level}
                className={`rule py-4 sm:py-0 ${i > 0 ? "border-t sm:border-t-0 sm:border-l sm:pl-4" : ""} ${i === autonomyLevels.length - 1 ? "" : "sm:pr-4"}`}
              >
                <Reveal delay={i * 60}>
                  <Link href={`/framework#${l.level.toLowerCase()}`} className="group block">
                    <span className="font-mono text-xs text-signal">{l.level}</span>
                    <span className="serif mt-1 block text-xl text-ink group-hover:underline">{l.name}</span>
                    <span className="mt-2 block text-sm text-muted">{l.controls.join(" · ")}</span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal className="mt-10" delay={360}>
            <Link href="/framework" className="btn btn-ink">
              {framework.code} v{framework.version} — read the framework
              <ArrowRight className="arrow h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </Reveal>
        </Container>
      </section>

      <section className="border-t rule py-20 lg:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <p className="text-sm text-muted">
              I am an engineer, not a lawyer. I write about turning regulation into technical and
              organisational controls; legal assessment belongs with counsel and, where required, notified
              bodies. Nothing here is legal advice.
            </p>
            <div>
              <p className="note mb-3">Sources</p>
              <Reveal as="ol" stagger className="space-y-1.5 text-sm">
                {sources.map((s, i) => (
                  <li key={s.href} className="flex gap-3">
                    <span className="font-mono text-[11px] text-muted">[{i + 1}]</span>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="link text-ink-2">
                      {s.label}
                    </a>
                  </li>
                ))}
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
