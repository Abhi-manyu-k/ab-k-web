import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a strategy sync with AB Kinetics to accelerate your AI transition.",
};

export default function ContactPage() {
  return (
    <>
      <section className="section-glow pt-32 pb-16 lg:pt-40 lg:pb-24">
        <Container>
          <SectionHeading
            eyebrow="Get in Touch"
            title="Book a Strategy Sync"
            description="Tell us where you are in your AI journey. We'll respond with a focused conversation on strategy, architecture, or operational integration—whichever moves you forward fastest."
          />
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-electric/20 text-cyan-neon">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">Email</p>
                    <a
                      href={`mailto:${siteConfig.contactEmail}`}
                      className="text-text-muted transition-colors hover:text-cyan-neon"
                    >
                      {siteConfig.contactEmail}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-electric/20 text-cyan-neon">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">Engagement Model</p>
                    <p className="text-text-muted">
                      Remote-first with on-site availability for industrial and operational
                      contexts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glow-border rounded-2xl border border-slate-border bg-slate-card/40 p-8 lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
