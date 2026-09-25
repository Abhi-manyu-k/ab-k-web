import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/ui/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `${siteConfig.contact.formTitle} with AB Kinetics to accelerate your AI transition.`,
};

const nextSteps = [
  ["Day 0", "You tell us about one department and one bottleneck."],
  ["Day 2", "A 30-minute call to scope the role, systems, and governance needs."],
  ["Week 2", "A pilot Virtual Employee, running on your data, under your controls."],
] as const;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title={
          <>
            Let&apos;s staff your <em className="accent-italic">first role.</em>
          </>
        }
        description="Tell us where you are in your AI journey. We'll respond with a focused conversation on whatever moves you forward fastest."
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-5 lg:gap-20">
            <div className="lg:col-span-2">
              <p className="label mb-3">Email</p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="serif link-underline text-3xl text-paper transition-colors hover:text-signal"
              >
                {siteConfig.contact.email}
              </a>

              <p className="label mt-14 mb-6">What happens next</p>
              <ol className="relative space-y-7 border-l hairline pl-7">
                {nextSteps.map(([when, what], i) => (
                  <li key={when} className="relative">
                    <span
                      className={`absolute -left-[2.05rem] top-1.5 h-2.5 w-2.5 rounded-full ${i === 0 ? "bg-signal" : "border border-line-strong bg-ink"}`}
                    />
                    <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">{when}</p>
                    <p className="mt-1 text-sm leading-relaxed text-paper">{what}</p>
                  </li>
                ))}
              </ol>

              <p className="mt-14 text-sm leading-relaxed text-muted">
                Remote-first, with on-site availability for industrial and operational contexts.
              </p>
            </div>

            <div className="panel p-6 sm:p-10 lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
