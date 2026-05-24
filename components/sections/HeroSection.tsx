"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeroAccent } from "@/components/ui/HeroAccent";
import { siteConfig } from "@/lib/site";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b divider-subtle pt-28 lg:pt-36">
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl pb-16 lg:pb-24"
          >
            <Eyebrow>Agentic AI consulting</Eyebrow>

            <h1 className="display-heading text-4xl text-text-primary sm:text-5xl lg:text-6xl">
              From passive pilots to{" "}
              <span className="gradient-text">systems that ship</span>
            </h1>

            <p className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-text-muted sm:text-base">
              We help enterprises design agentic workflows—tool-calling agents, governed
              integrations, and production paths that connect strategy to shop-floor data.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/contact" size="lg">
                {siteConfig.contact.formTitle}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href="/services" variant="secondary" size="lg">
                Explore services
              </Button>
            </div>

            <p className="mt-10 flex items-center gap-2 text-sm text-text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-action" />
              Strategy, architecture, and operational reality in one practice
            </p>
          </motion.div>

          <HeroAccent />
        </div>
      </Container>
    </section>
  );
}
