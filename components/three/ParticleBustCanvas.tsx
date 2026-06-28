"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ParticleBust } from "@/components/three/ParticleBust";

interface ParticleBustCanvasProps {
  className?: string;
  interactive?: boolean;
}

function Scene({ interactive }: { interactive: boolean }) {
  return (
    <>
      <color attach="background" args={["#0a0a0c"]} />
      <fog attach="fog" args={["#0a0a0c", 2.2, 5.5]} />
      <ambientLight intensity={0.15} />
      <ParticleBust interactive={interactive} />
    </>
  );
}

export function ParticleBustCanvas({
  className,
  interactive = true,
}: ParticleBustCanvasProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={className} style={{ background: "#0a0a0c" }} aria-hidden="true" />;
  }

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0.22, 2.35], fov: 42, near: 0.1, far: 20 }}
        dpr={[1, 2]}
        gl={{
          alpha: false,
          antialias: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "#0a0a0c" }}
      >
        <Suspense fallback={null}>
          <Scene interactive={interactive} />
        </Suspense>
      </Canvas>
    </div>
  );
}
