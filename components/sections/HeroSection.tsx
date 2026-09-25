import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MachineDrawing } from "@/components/ui/MachineDrawing";
import { siteConfig } from "@/lib/site";

const zonesX = ["1", "2", "3", "4", "5", "6", "7", "8"];
const zonesY = ["A", "B", "C", "D"];

const generalNotes = [
  "Agents act only within their approved autonomy level (L0–L4).",
  "Every action is logged, attributable and reversible.",
  "Sensitive data stays on EU-hosted models by default.",
  "Designed against the AI Act, Machinery Regulation (EU) 2023/1230 and the Data Act.",
  "Built by engineers who have serviced the machines.",
];

export function HeroSection() {
  return (
    <section className="pt-24 pb-16 sm:pt-28 lg:pb-24">
      <Container>
        <div className="frame bg-paper">
          {/* Zone markers */}
          <div aria-hidden="true" className="pointer-events-none absolute -top-5 inset-x-0 hidden grid-cols-8 sm:grid">
            {zonesX.map((z) => (
              <span key={z} className="text-center font-mono text-[9px] text-faint">
                {z}
              </span>
            ))}
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute -left-5 inset-y-0 hidden grid-rows-4 sm:grid">
            {zonesY.map((z) => (
              <span key={z} className="flex items-center font-mono text-[9px] text-faint">
                {z}
              </span>
            ))}
          </div>

          {/* Headline + general notes */}
          <div className="grid border-b rule-ink lg:grid-cols-[1fr_19rem] xl:grid-cols-[1fr_22rem]">
            <div className="p-6 sm:p-10 lg:p-12 xl:p-14">
              <p className="note mb-8 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-signal">●</span>
                {siteConfig.tagline}
              </p>
              <h1 className="display hero-title">
                <span className="block lg:whitespace-nowrap">
                  Agents that <em className="text-signal">act.</em>
                </span>
                <span className="block lg:whitespace-nowrap">
                  Governance that <em className="drafted">holds.</em>
                </span>
              </h1>
              <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,26rem)_auto] xl:items-end xl:gap-10">
                <p className="lead">
                  We build AI agents that diagnose and fix machines — and the governance that lets you
                  trust them to. Engineered in Aachen for industry facing the AI Act, the Machinery
                  Regulation and the Data Act.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/contact" className="btn btn-ink">
                    {siteConfig.contact.formTitle}
                    <ArrowRight className="arrow h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                  <Link href="/services" className="btn btn-line">
                    Practices
                  </Link>
                </div>
              </div>
            </div>

            <aside className="flex flex-col border-t rule-ink lg:border-t-0 lg:border-l" aria-label="General notes">
              <p className="border-b rule-ink px-5 py-3 note !text-ink">General notes</p>
              <ol className="flex-1 space-y-4 px-5 py-5 font-mono text-[11.5px] leading-relaxed text-ink-2">
                {generalNotes.map((n, i) => (
                  <li key={n} className="grid grid-cols-[1.25rem_1fr]">
                    <span className="text-faint">{i + 1}.</span>
                    <span>{n}</span>
                  </li>
                ))}
              </ol>
              <div className="border-t rule-ink px-5 py-4 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                <p>Unless otherwise specified:</p>
                <p className="mt-1 text-ink">Human in the loop.</p>
                <p className="mt-3 flex justify-between border-t border-dashed rule pt-3">
                  <span>Tolerance</span>
                  <span className="text-signal">± 0 unlogged actions</span>
                </p>
              </div>
            </aside>
          </div>

          <MachineDrawing />

          {/* Title block */}
          <dl className="grid grid-cols-2 border-t rule-ink font-mono text-[10px] uppercase tracking-[0.08em] sm:grid-cols-4 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
            {[
              ["Title", "Service agent · governed action sequence"],
              ["Drawn", siteConfig.name],
              ["Location", "Aachen, DE"],
              ["Scale", "1 : 1"],
              ["Sheet", "01 / 05"],
            ].map(([k, v], i) => (
              <div
                key={k}
                className={`border-b rule-ink px-4 py-2.5 lg:border-b-0 ${i > 0 ? "border-l" : ""} ${i === 0 ? "col-span-2 sm:col-span-4 lg:col-span-1" : ""} ${i === 1 || i === 3 ? "max-sm:border-l-0" : ""}`}
              >
                <dt className="text-faint">{k}</dt>
                <dd className="mt-0.5 text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
