"use client";

import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Container } from "@/components/ui/Container";
import { trustStripItems } from "@/lib/site";

export function TrustStrip() {
  return (
    <section className="border-y border-slate-border bg-slate-deep/30 py-12 lg:py-16">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustStripItems.map((item, index) => (
            <AnimatedCard key={item.title} delay={index * 0.08} className="text-center lg:text-left">
              <h3 className="font-heading text-base font-semibold text-text-primary">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-text-muted">{item.description}</p>
            </AnimatedCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
