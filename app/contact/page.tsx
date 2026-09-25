import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/ui/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `${siteConfig.contact.formTitle} with AB Kinetics — service agents and AI governance for European industry.`,
};

const nextSteps = [
  ["Day 0", "You describe one machine, one department or one compliance question."],
  ["Day 2", "A 30-minute call in German or English to scope data, systems and risk."],
  ["Week 2", "A written proposal: fixed scope, autonomy level, controls, timeline."],
] as const;

export default function ContactPage() {
  return (
    <>
      <PageHero
        sheet="06"
        eyebrow="Contact"
        title={
          <>
            Send us the <em>problem,</em> not a brief.
          </>
        }
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <div>
              <p className="note mb-3">Direct</p>
              <a href={`mailto:${siteConfig.contact.email}`} className="serif link text-3xl text-ink sm:text-4xl">
                {siteConfig.contact.email}
              </a>

              <p className="note mt-14 mb-6">What happens next</p>
              <ol className="border-t border-ink">
                {nextSteps.map(([when, what]) => (
                  <li key={when} className="grid grid-cols-[5rem_1fr] border-b rule py-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-signal">{when}</span>
                    <span className="text-sm text-ink-2">{what}</span>
                  </li>
                ))}
              </ol>

              <p className="mt-10 text-sm text-muted">
                Based in {siteConfig.location}. Remote-first, on site where machines are involved.
              </p>
            </div>

            <div className="crop border border-ink bg-paper-3 p-6 sm:p-10">
              <p className="note mb-8 flex justify-between">
                <span>Form ABK-06 · Inquiry</span>
                <span>1 / 1</span>
              </p>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
