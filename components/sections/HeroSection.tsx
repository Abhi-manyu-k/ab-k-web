"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HumanAssemblyVisual } from "@/components/ui/HumanAssemblyVisual";
import { siteConfig } from "@/lib/site";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b divider-subtle pt-28 lg:pt-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.08),transparent)]" />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl pb-16 lg:pb-24"
          >
            <Eyebrow>Virtual Employees for the Enterprise</Eyebrow>

            <h1 className="display-heading text-4xl text-text-primary sm:text-5xl lg:text-6xl">
              Your next hire is{" "}
              <span className="text-amber-action">on the organigram</span>
            </h1>

            <p className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-text-muted sm:text-base">
              AB Kinetics deploys governed Virtual Employees — organigram-level AI
              teammates with built-in GDPR governance, model routing, and custom harnesses
              integrated into your enterprise workflows.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/contact" size="lg">
                {siteConfig.contact.formTitle}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                {siteConfig.contact.secondaryCta}
              </Button>
            </div>

            <p className="mt-10 flex items-center gap-2 text-sm text-text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-action" />
              Built for German Mittelstand and enterprise compliance requirements
            </p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="relative flex items-center justify-center pb-8 lg:pb-24"
          >
            <div className="overflow-hidden rounded-xl border border-slate-border/60 bg-slate-deep/80 p-8 lg:p-12">
              <HumanAssemblyVisual />
            </div>
            <p className="absolute bottom-0 left-0 right-0 text-center font-mono text-xs text-text-muted lg:bottom-8">
              <span className="text-cyan-info">agentic_workforce</span>
              {" | "}
              organigram-level placement
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
