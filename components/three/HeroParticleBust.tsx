"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

const ParticleBustCanvas = dynamic(
  () =>
    import("@/components/three/ParticleBustCanvas").then((m) => m.ParticleBustCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-[#0a0a0c]" aria-hidden="true" />
    ),
  },
);

interface HeroParticleBustProps {
  className?: string;
}

export function HeroParticleBust({ className }: HeroParticleBustProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <ParticleBustCanvas
      className={className}
      interactive={!shouldReduceMotion}
      lowMotion={!!shouldReduceMotion}
    />
  );
}
