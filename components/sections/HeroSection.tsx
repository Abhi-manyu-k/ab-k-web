"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { NetworkBackground } from "@/components/ui/NetworkBackground";

import { siteConfig } from "@/lib/site";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[90vh] overflow-hidden pt-24 lg:pt-32">
      <div className="section-glow absolute inset-0" />
      <NetworkBackground />

      <Container className="relative z-10 flex min-h-[calc(90vh-6rem)] flex-col items-center justify-center py-16 text-center">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <p className="mb-6 font-heading text-sm font-medium uppercase tracking-[0.25em] text-cyan-neon">
            Agentic AI Consulting
          </p>

          <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
            From Passive AI Pilots to{" "}
            <span className="gradient-text">Active Agentic Systems</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-muted sm:text-xl">
            AB Kinetics helps organizations design, build, and operationalize AI systems
            that reason, call tools, interact with workflows, and integrate with real
            business and operational environments.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/contact" size="lg">
              {siteConfig.contact.formTitle}
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              Explore Services
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 flex items-center gap-2 text-sm text-text-muted"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-neon" />
          Bridging strategy, architecture, and shop-floor reality
        </motion.div>
      </Container>
    </section>
  );
}
