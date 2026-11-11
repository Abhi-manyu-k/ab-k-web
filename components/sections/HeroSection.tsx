import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MachineDrawing } from "@/components/ui/MachineDrawing";
import { Annotation } from "@/components/ui/Annotation";
import { siteConfig } from "@/lib/site";

/* Load sequence: `ms` is when the block starts landing, `rise` its travel in px (hero.css, html.js only). */
function at(ms: number, rise?: number): React.CSSProperties {
  const vars: Record<string, string> = { "--d": `${ms}ms` };
  if (rise !== undefined) vars["--rise"] = `${rise}px`;
  return vars as React.CSSProperties;
}

export function HeroSection() {
  return (
    <section data-xray="Hero" className="pt-24 pb-16 sm:pt-28 lg:pb-24">
      <Container>
        {/* Headline: on the bare sheet */}
        <div data-xray="Headline block">
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

        {/* The frame wraps only the machine drawing, its log and the title block. MachineDrawing's own
            mobile top rule would double the frame edge, so it is dropped here. */}
        <div data-xray="Drawing frame" className="frame frame-draw mt-16 bg-paper [&>.md]:border-t-0">
          <MachineDrawing />

          {/* Title block */}
          <dl className="grid grid-cols-2 border-t rule-ink font-mono text-[10px] uppercase tracking-[0.08em] sm:grid-cols-[2fr_1fr_1fr]">
            {[
              ["Title", "Service agent · governed action sequence"],
              ["Drawn", siteConfig.author],
              ["Scale", "1 : 1"],
            ].map(([k, v], i) => (
              <div
                key={k}
                style={at(900 + 50 * i)}
                className={`hero-fade rule-ink px-4 py-2.5 ${i === 0 ? "col-span-2 max-sm:border-b sm:col-span-1" : "border-l"} ${i === 1 ? "max-sm:border-l-0" : ""}`}
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
