import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MachineDrawing } from "@/components/ui/MachineDrawing";
import { siteConfig } from "@/lib/site";

const zonesX = ["1", "2", "3", "4", "5", "6", "7", "8"];
const zonesY = ["A", "B", "C", "D"];

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

          {/* Headline */}
          <div className="grid gap-8 border-b rule-ink p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end lg:p-14">
            <div>
              <p className="note mb-8 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-signal">●</span>
                {siteConfig.tagline}
              </p>
              <h1 className="display text-[3.4rem] sm:text-[5.5rem] lg:text-[6.5rem] xl:text-[8rem]">
                Agents that <em className="text-signal">act.</em>
                <br />
                Governance that <em>holds.</em>
              </h1>
            </div>
            <div className="max-w-sm lg:pb-3">
              <p className="lead">
                We build AI agents that diagnose and fix machines — and the governance that lets you trust
                them to. Engineered in Aachen for industry facing the AI Act, the Machinery Regulation and
                the Data Act.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
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
