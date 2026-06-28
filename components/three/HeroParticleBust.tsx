"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { VirtualEmployeeMark } from "@/components/ui/VirtualEmployeeMark";

const ParticleBustCanvas = dynamic(
  () =>
    import("@/components/three/ParticleBustCanvas").then((m) => m.ParticleBustCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-[#0a0a0c]" aria-hidden="true" />
    ),
  },
);

interface HeroParticleBustProps {
  className?: string;
}

export function HeroParticleBust({ className }: HeroParticleBustProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={className}>
        <VirtualEmployeeMark size="lg" animated={false} className="p-8" />
      </div>
    );
  }

  return <ParticleBustCanvas className={className} interactive />;
}
