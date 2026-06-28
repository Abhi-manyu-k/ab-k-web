"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ParticleBust } from "@/components/three/ParticleBust";
import { WebGLErrorBoundary } from "@/components/three/WebGLErrorBoundary";

interface ParticleBustCanvasProps {
  className?: string;
  interactive?: boolean;
  lowMotion?: boolean;
}

function Scene({
  interactive,
  lowMotion,
}: {
  interactive: boolean;
  lowMotion: boolean;
}) {
  return (
    <>
      <color attach="background" args={["#0a0a0c"]} />
      <fog attach="fog" args={["#0a0a0c", 2.2, 5.5]} />
      <ambientLight intensity={0.2} />
      <ParticleBust interactive={interactive} lowMotion={lowMotion} />
    </>
  );
}

export function ParticleBustCanvas({
  className,
  interactive = true,
  lowMotion = false,
}: ParticleBustCanvasProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`absolute inset-0 bg-[#0a0a0c] ${className ?? ""}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <WebGLErrorBoundary>
      <div className={`absolute inset-0 ${className ?? ""}`}>
        <Canvas
          className="h-full w-full"
          camera={{ position: [0, 0.22, 2.35], fov: 42, near: 0.1, far: 20 }}
          dpr={[1, 1.75]}
          gl={{
            alpha: false,
            antialias: true,
            powerPreference: "high-performance",
          }}
          style={{ width: "100%", height: "100%", background: "#0a0a0c" }}
          onCreated={({ gl }) => {
            gl.debug.checkShaderErrors = true;
          }}
        >
          <Suspense fallback={null}>
            <Scene interactive={interactive} lowMotion={lowMotion} />
          </Suspense>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
