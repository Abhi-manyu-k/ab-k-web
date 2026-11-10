import { Download } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CopyButton } from "@/components/ui/CopyButton";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SheetHeader } from "@/components/ui/SheetHeader";
import { AutonomyLadder } from "@/components/ui/AutonomyLadder";
import { Tbd } from "@/components/ui/Tbd";
import { Annotation } from "@/components/ui/Annotation";
import { CTASection } from "@/components/sections/CTASection";
import { autonomyLevels, framework, frameworkChangelog } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

const fullTitle = `${framework.title} (${framework.code} v${framework.version})`;
const year = framework.date.slice(0, 4);
const url = `${siteConfig.url}${framework.path}`;
const fmt = (d: string) => d.split("-").reverse().join(".");

export const metadata = pageMetadata({
  title: `${framework.code} v${framework.version} — Autonomy levels for service agents`,
  ogTitle: fullTitle,
  description:
    "My framework for how much an industrial service agent may do on its own: five autonomy levels (L0–L4), what the agent and the human do at each, and the controls every level requires.",
  path: framework.path,
  type: "article",
});

const citation = `Kanwar, A. (${year}). ${fullTitle}. AB Kinetics. ${url}`;
const bibtex = `@misc{kanwar${year}abkal,
  author       = {Kanwar, Abhimanyu},
  title        = {${framework.title}},
  howpublished = {AB Kinetics},
  note         = {${framework.code} version ${framework.version}},
  year         = {${year}},
  url          = {${url}}
}`;

export default function FrameworkPage() {
  return (
    <>
      <PageHero
        sheet="01"
        eyebrow={`Framework · ${framework.code} v${framework.version}`}
        title={
          <>
            Autonomy levels for <em>industrial service agents.</em>
          </>
        }
        description="How much may a service agent do on its own? My answer is a staircase of five levels. Each level says what the agent does, what the human does, and which controls must be in place before the agent is allowed to climb."
      >
        <dl className="mt-12 grid max-w-3xl grid-cols-2 font-mono text-[10px] uppercase tracking-[0.08em] sm:grid-cols-4">
          {[
            ["Document", framework.code],
            ["Version", framework.version],
            ["Date", fmt(framework.date)],
            ["Author", siteConfig.authorShort],
          ].map(([k, v], i) => (
            <div
              key={k}
              className={`rule py-2.5 ${i % 2 === 1 ? "border-l px-4" : "pr-4"} ${i >= 2 ? "border-t sm:border-t-0" : ""} ${i === 2 ? "sm:border-l sm:pl-4" : ""}`}
            >
              <dt className="text-muted">{k}</dt>
              <dd className="mt-0.5 text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={framework.pdf} className="btn btn-ink" download>
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Download PDF
          </a>
          <a href="#cite" className="btn btn-line">
            Cite this
          </a>
        </div>
      </PageHero>

      {/* Interactive staircase */}
      <section className="py-20 lg:py-28">
        <Container>
          <SheetHeader
            sheet="01"
            label="Section A–A · Elevation"
            title={
              <>
                An agent <em>earns</em> the right to act.
              </>
            }
            intro="Autonomy is decided per class of action, not per agent: the same agent can recommend a recipe change (L1) and run a log export on its own (L3). Pick a level to see what it takes."
          />
          {/* The staircase builds itself on view. */}
          <div className="mt-24">
            <AutonomyLadder />
          </div>
          <Reveal as="p" delay={400} className="mt-6 lg:mt-2">
            <Annotation arrow="up-left" rotate={-2}>
              the hard step is L2 → L3: from approving actions to approving policy
            </Annotation>
          </Reveal>
        </Container>
      </section>

      {/* Level-by-level specification */}
      <section className="border-t rule py-20 lg:py-28">
        <Container>
          <SheetHeader
            sheet="02"
            label="Specification"
            title={
              <>
                Level by <em>level.</em>
              </>
            }
            intro="Controls are cumulative: an agent at L3 needs everything L0 to L2 require, plus its own."
          />

          <ol className="rule mt-14 border-t">
            {autonomyLevels.map((l, li) => (
              <li key={l.level} id={l.level.toLowerCase()} className="rule scroll-mt-20 border-b">
                {/* Each level is taller than a list row, so each lands as you reach it. */}
                <Reveal as="article" className="grid gap-8 py-10 lg:grid-cols-[9rem_1fr_1fr_1fr] lg:gap-10 lg:py-14">
                  <header>
                    <p className="font-mono text-xs text-signal">{l.level}</p>
                    <h3 className="serif mt-2 text-3xl text-ink">{l.name}</h3>
                  </header>
                  <div>
                    <p className="note mb-2">What the agent does</p>
                    <p className="text-ink-2">{l.agent}</p>
                    <p className="note mt-6 mb-2">What the human does</p>
                    <p className="text-ink-2">{l.human}</p>
                  </div>
                  <div>
                    <p className="note mb-2">Required controls</p>
                    <ul className="space-y-2">
                      {autonomyLevels.slice(0, li + 1).flatMap((prev, pi) =>
                        prev.controls.map((c) => (
                          <li key={c} className={`flex items-start gap-3 text-sm ${pi === li ? "text-ink" : "text-muted"}`}>
                            <span
                              aria-hidden="true"
                              className={`mt-1.5 h-2 w-2 shrink-0 rotate-45 border ${pi === li ? "border-signal bg-signal" : "border-line-strong"}`}
                            />
                            <span>
                              {c}
                              {pi !== li && <span className="ml-2 font-mono text-[10px]">({prev.level})</span>}
                            </span>
                          </li>
                        )),
                      )}
                    </ul>
                  </div>
                  <div>
                    <p className="note mb-2">Example scenario</p>
                    {/* TODO(launch): add an example scenario for this level. */}
                    <div className="border-t border-dashed rule pt-4 text-sm text-muted">
                      <Tbd>example scenario for {l.level}</Tbd>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Cite + changelog */}
      <section id="cite" className="bg-mm scroll-mt-14 border-t rule py-20 lg:py-28">
        <Container>
          <SheetHeader
            sheet="03"
            label="Cite this · Revisions"
            title={
              <>
                Use it, <em>cite it.</em>
              </>
            }
            intro="If the framework is useful in your own work, please cite the version you used. Later revisions are listed below."
          />

          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <div className="rule flex items-center justify-between border-b py-2.5">
                <p className="note !text-ink">Cite this</p>
                <CopyButton text={citation} label="Copy citation" />
              </div>
              <dl className="grid grid-cols-[6rem_1fr] font-mono text-[11px]">
                {[
                  ["Author", siteConfig.author],
                  ["Title", framework.title],
                  ["Version", `${framework.code} v${framework.version}`],
                  ["Year", year],
                  ["URL", url],
                ].map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="border-b rule py-2.5 pr-4 uppercase tracking-[0.08em] text-muted">{k}</dt>
                    <dd className="break-words border-b rule py-2.5 text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="py-4 text-sm text-ink-2">{citation}</p>
              <div className="rule border-t">
                <div className="flex items-center justify-between py-2.5">
                  <p className="note">BibTeX</p>
                  <CopyButton text={bibtex} label="Copy BibTeX" />
                </div>
                <pre className="overflow-x-auto pb-4 font-mono text-[11px] leading-relaxed text-ink-2">{bibtex}</pre>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p className="py-2.5 note !text-ink">Revision table — {framework.code}</p>
              <div className="hidden grid-cols-[3.5rem_6.5rem_1fr_5rem] gap-4 border-b rule-ink py-2 font-mono text-[10px] uppercase tracking-[0.08em] text-muted sm:grid">
                <span>Rev.</span>
                <span>Date</span>
                <span>Description</span>
                <span>By</span>
              </div>
              <Reveal as="ul" stagger delay={300}>
                {frameworkChangelog.map((r) => (
                  <li
                    key={r.rev}
                    className="grid grid-cols-[3.5rem_1fr] gap-x-4 gap-y-1 border-b rule py-8 sm:grid-cols-[3.5rem_6.5rem_1fr_5rem]"
                  >
                    <span className="font-mono text-[11px] text-signal">{r.rev}</span>
                    <span className="font-mono text-xs text-ink">{fmt(r.date)}</span>
                    <span className="col-span-2 text-sm text-ink-2 sm:col-span-1">{r.change}</span>
                    <span className="col-span-2 font-mono text-[11px] text-muted sm:col-span-1">{r.by}</span>
                  </li>
                ))}
              </Reveal>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
