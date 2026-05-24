"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedCard({ children, className, delay = 0 }: AnimatedCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      className={cn(
        "rounded-2xl border border-slate-border bg-slate-card/60 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-cyan-neon/30 hover:bg-slate-card/80",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
