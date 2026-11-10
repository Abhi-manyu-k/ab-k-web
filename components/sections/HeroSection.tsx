import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MachineDrawing } from "@/components/ui/MachineDrawing";
import { Annotation } from "@/components/ui/Annotation";
import { siteConfig } from "@/lib/site";

const zonesX = ["1", "2", "3", "4", "5", "6", "7", "8"];
const zonesY = ["A", "B", "C", "D"];

/* Load sequence: `ms` is when the block starts landing, `rise` its travel in px (hero.css, html.js only). */
function at(ms: number, rise?: number): React.CSSProperties {
  const vars: Record<string, string> = { "--d": `${ms}ms` };
  if (rise !== undefined) vars["--rise"] = `${rise}px`;
  return vars as React.CSSProperties;
}

const generalNotes = [
  "Agents act only within their approved autonomy level (L0–L4).",
  "Every action is logged, attributable and reversible.",
  "Sensitive data stays on EU-hosted models by default.",
  "Designed against the AI Act, Machinery Regulation (EU) 2023/1230 and the Data Act.",
  "Written by an engineer who has serviced the machines.",
];

export function HeroSection() {
  return (
    <section className="pt-24 pb-16 sm:pt-28 lg:pb-24">
      <Container>
        <div className="frame frame-draw bg-paper">
          {/* Zone markers */}
          <div aria-hidden="true" className="pointer-events-none absolute -top-5 inset-x-0 hidden grid-cols-8 sm:grid">
            {zonesX.map((z, i) => (
              <span key={z} className="hero-fade text-center font-mono text-[9px] text-faint" style={at(300 + 30 * i)}>
                {z}
              </span>
            ))}
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute -left-5 inset-y-0 hidden grid-rows-4 sm:grid">
            {zonesY.map((z, i) => (
              <span
                key={z}
                className="hero-fade flex items-center font-mono text-[9px] text-faint"
                style={at(300 + 30 * (zonesX.length + i))}
              >
                {z}
              </span>
            ))}
          </div>

          {/* Headline + general notes */}
          <div className="grid border-b rule-ink lg:grid-cols-[1fr_19rem] xl:grid-cols-[1fr_22rem]">
            <div className="p-6 sm:p-10 lg:p-12 xl:p-14">
              <p className="hero-rise note mb-8 flex flex-wrap items-center gap-x-3 gap-y-1" style={at(100, 8)}>
                <span className="text-signal">●</span>
                {siteConfig.tagline}
              </p>
              <h1 className="display hero-title">
                <span className="hero-line block lg:whitespace-nowrap" style={at(180)}>
                  <span className="hero-line-ink block">
                    Agents that <em className="text-signal">act.</em>
                  </span>
                </span>
                <span className="hero-line block lg:whitespace-nowrap" style={at(300)}>
                  <span className="hero-line-ink block">
                    Governance that <em className="drafted drafted-hatch">holds.</em>
                  </span>
                </span>
              </h1>
              <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,26rem)_auto] xl:items-end xl:gap-10">
                <div>
                  <p className="hero-rise lead" style={at(550)}>
                    I build AI agents that diagnose machines, and the governance that lets you trust them
                    to act. Engineer from Aachen, working on service AI for semiconductor equipment.
                  </p>
                  <p
                    className="hero-rise mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted"
                    style={at(650)}
                  >
                    <span>Drawn by</span>
                    <Link href="/about" className="serif link text-xl normal-case tracking-normal text-ink">
                      {siteConfig.author}
                    </Link>
                    <Annotation className="normal-case tracking-normal" rotate={-4} delay={1500}>
                      hi — that&apos;s me
                    </Annotation>
                  </p>
                </div>
                <div className="hero-rise flex flex-wrap gap-3" style={at(750)}>
                  <Link href="/framework" className="btn btn-ink">
                    Read the autonomy framework
                    <ArrowRight className="arrow h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                  <Link href="/writing" className="btn btn-line">
                    Writing
                  </Link>
                </div>
              </div>
            </div>

            <aside className="flex flex-col border-t rule-ink lg:border-t-0 lg:border-l" aria-label="General notes">
              <p className="hero-rise border-b rule-ink px-5 py-3 note !text-ink" style={at(500, 6)}>
                General notes
              </p>
              <ol className="flex-1 space-y-4 px-5 py-5 font-mono text-[11.5px] leading-relaxed text-ink-2">
                {generalNotes.map((n, i) => (
                  <li key={n} className="hero-rise grid grid-cols-[1.25rem_1fr]" style={at(570 + 70 * i, 6)}>
                    <span className="text-faint">{i + 1}.</span>
                    <span>{n}</span>
                  </li>
                ))}
              </ol>
              <div
                className="hero-rise border-t rule-ink px-5 py-4 font-mono text-[10px] uppercase tracking-[0.1em] text-muted"
                style={at(570 + 70 * generalNotes.length, 6)}
              >
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
              ["Drawn", siteConfig.author],
              ["Location", "Aachen, DE"],
              ["Scale", "1 : 1"],
              ["Sheet", "00 / 06"],
            ].map(([k, v], i) => (
              <div
                key={k}
                style={at(900 + 50 * i)}
                className={`hero-fade border-b rule-ink px-4 py-2.5 lg:border-b-0 ${i > 0 ? "border-l" : ""} ${i === 0 ? "col-span-2 sm:col-span-4 lg:col-span-1" : ""} ${i === 1 || i === 3 ? "max-sm:border-l-0" : ""}`}
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
