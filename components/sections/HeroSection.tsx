"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { VirtualEmployeeMark } from "@/components/ui/VirtualEmployeeMark";
import { siteConfig } from "@/lib/site";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b divider-subtle pt-28 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.06),transparent)]" />

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-xl pb-12 lg:pb-16"
          >
            <Eyebrow>Virtual Employees</Eyebrow>

            <h1 className="display-heading text-4xl text-text-primary sm:text-5xl lg:text-[3.25rem]">
              Your next hire is{" "}
              <span className="text-amber-action">on the organigram</span>
            </h1>

            <p className="mt-5 max-w-md text-base text-text-muted">
              Governed AI teammates for German enterprises. GDPR controls, model routing,
              deep workflow integration.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/contact" size="lg">
                {siteConfig.contact.formTitle}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                {siteConfig.contact.secondaryCta}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="relative flex items-center justify-center pb-12 lg:pb-16"
          >
            <div className="relative flex aspect-square w-full max-w-sm items-center justify-center overflow-hidden rounded-2xl border border-slate-border/40 bg-gradient-to-b from-slate-deep/90 to-onyx">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(46,46,56,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(46,46,56,0.25)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
              <VirtualEmployeeMark size="lg" className="p-8" />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
