import { ArrowRight } from "lucide-react";
import { Annotation } from "@/components/ui/Annotation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { mailto, siteConfig } from "@/lib/site";

const actions = [
  { label: "Invite me to speak", href: mailto("Speaking invitation"), primary: true },
  { label: "Collaborate on research", href: mailto("Research collaboration"), primary: false },
] as const;

export function CTASection() {
  return (
    <section className="py-20 lg:py-32">
      <Container>
        {/* The frame rises as one block, then the title-block rows on the right land in turn. */}
        <Reveal className="crop grid gap-12 border border-ink bg-paper-3 p-6 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:p-16">
          <div>
            <p className="note mb-6">Release for production</p>
            <h2 className="display text-6xl sm:text-7xl lg:text-8xl">
              Let&apos;s <em>talk.</em>
            </h2>
            <Annotation className="mt-3 ml-1" arrow="none" rotate={-2}>
              auf Deutsch geht&apos;s auch.
            </Annotation>
            <p className="lead mt-6 max-w-lg">
              Conference talks, research collaborations, or a question about the framework — email is the
              fastest way to reach me.
            </p>
          </div>

          <div className="flex flex-col justify-end">
            <Reveal as="dl" stagger delay={300} className="font-mono text-[11px] uppercase tracking-[0.08em]">
              {[
                ["Drawn", siteConfig.authorShort],
                ["Location", "Aachen, DE"],
                ["Languages", "English · Deutsch"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-end justify-between gap-4 border-b border-ink py-3">
                  <dt className="text-muted">{k}</dt>
                  <dd className="serif text-xl normal-case tracking-normal italic text-ink">{v}</dd>
                </div>
              ))}
            </Reveal>
            <div className="mt-8 flex flex-wrap gap-3">
              {actions.map((a) => (
                <a key={a.label} href={a.href} className={`btn ${a.primary ? "btn-ink" : "btn-line"}`}>
                  {a.label}
                  {a.primary && <ArrowRight className="arrow h-3.5 w-3.5" aria-hidden="true" />}
                </a>
              ))}
              <a href={mailto()} className="btn btn-line">
                Email me
                <span className="normal-case tracking-normal text-muted">{siteConfig.contact.email}</span>
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
