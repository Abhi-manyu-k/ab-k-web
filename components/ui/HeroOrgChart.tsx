"use client";

import { motion } from "framer-motion";
import { Activity, Shield, Zap, Database, GitMerge, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const Node = ({
  title,
  icon: Icon,
  glow = false,
  delay = 0,
}: {
  title: string;
  icon: any;
  glow?: boolean;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    className={cn(
      "relative flex w-32 flex-col items-center gap-3 rounded-xl border bg-onyx/90 p-4 backdrop-blur-md transition-colors",
      glow
        ? "border-amber-action/50 shadow-[0_0_25px_rgba(245,158,11,0.15)]"
        : "border-slate-border/50",
    )}
  >
    {/* Active Status Dot */}
    <div className="absolute -right-1.5 -top-1.5 flex h-3 w-3 items-center justify-center">
      <div className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
      <div className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
    </div>

    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-lg bg-slate-deep transition-colors",
        glow ? "text-amber-action shadow-[0_0_15px_rgba(245,158,11,0.2)]" : "text-text-muted",
      )}
    >
      <Icon className="h-5 w-5" />
    </div>
    <span
      className={cn(
        "text-center font-mono text-[0.6875rem] font-semibold tracking-wider",
        glow ? "text-warm-white" : "text-text-muted",
      )}
    >
      {title}
    </span>
  </motion.div>
);

export function HeroOrgChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-full w-full min-h-[400px]" />;

  return (
    <div className="relative flex h-full w-full items-center justify-center lg:justify-end lg:pr-8">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-action/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative flex flex-col items-center pt-8">
        {/* ─── LEVEL 1 ─── */}
        <Node title="ORCHESTRATOR" icon={Zap} glow delay={0.1} />

        {/* Vertical line from L1 to L2 */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 40 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="relative w-px bg-amber-action/50"
        >
          {/* Horizontal distributor for L2 */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.9, ease: "easeInOut" }}
            className="absolute bottom-0 h-px bg-amber-action/50 origin-center"
            style={{ left: "-152px", right: "-152px" }} 
            // 152px is exactly node width (128) + gap (24) to hit the centers of the outer branches
          />
        </motion.div>

        {/* ─── LEVEL 2 ─── */}
        <div className="flex gap-6">
          {/* Branch 1 */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 24 }}
              transition={{ duration: 0.3, delay: 1.5 }}
              className="w-px bg-amber-action/50"
            />
            <Node title="STRATEGY_NODE" icon={Activity} delay={1.8} />

            {/* Vertical line from L2 to L3 */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 24 }}
              transition={{ duration: 0.3, delay: 2.1 }}
              className="w-px bg-slate-border/60"
            />
            <Node title="DATA_SYNTH" icon={Database} delay={2.4} />
          </div>

          {/* Branch 2 (Center) */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 24 }}
              transition={{ duration: 0.3, delay: 1.5 }}
              className="w-px bg-amber-action/50"
            />
            <Node title="OPS_ROUTER" icon={GitMerge} glow delay={1.8} />
            
            {/* Vertical line from L2 to L3 */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 24 }}
              transition={{ duration: 0.3, delay: 2.1 }}
              className="w-px bg-amber-action/50"
            />
            <Node title="EXECUTION" icon={Zap} glow delay={2.4} />
          </div>

          {/* Branch 3 */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 24 }}
              transition={{ duration: 0.3, delay: 1.5 }}
              className="w-px bg-amber-action/50"
            />
            <Node title="GOVERNANCE" icon={Shield} delay={1.8} />

            {/* Vertical line from L2 to L3 */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 24 }}
              transition={{ duration: 0.3, delay: 2.1 }}
              className="w-px bg-slate-border/60"
            />
            <Node title="COMPLIANCE" icon={FileText} delay={2.4} />
          </div>
        </div>
      </div>
    </div>
  );
}
