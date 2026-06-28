"use client";

import { useId } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NeuralNetworkVisualProps {
  className?: string;
  size?: "sm" | "lg";
}

const nodes: { x: number; y: number; r: number; accent?: "cyan" | "amber" }[] = [
  { x: 200, y: 58, r: 5, accent: "amber" },
  { x: 158, y: 88, r: 4 },
  { x: 242, y: 88, r: 4 },
  { x: 132, y: 118, r: 3.5 },
  { x: 178, y: 112, r: 4, accent: "cyan" },
  { x: 222, y: 112, r: 4, accent: "cyan" },
  { x: 268, y: 118, r: 3.5 },
  { x: 148, y: 148, r: 3.5 },
  { x: 200, y: 142, r: 5, accent: "amber" },
  { x: 252, y: 148, r: 3.5 },
  { x: 118, y: 172, r: 3 },
  { x: 168, y: 178, r: 3.5 },
  { x: 200, y: 188, r: 4, accent: "cyan" },
  { x: 232, y: 178, r: 3.5 },
  { x: 282, y: 172, r: 3 },
  { x: 140, y: 208, r: 3 },
  { x: 200, y: 228, r: 4 },
  { x: 260, y: 208, r: 3 },
  { x: 168, y: 252, r: 3 },
  { x: 232, y: 252, r: 3 },
];

const edges: [number, number][] = [
  [0, 1], [0, 2], [0, 4], [0, 5],
  [1, 3], [1, 4], [2, 5], [2, 6],
  [3, 7], [4, 7], [4, 8], [5, 8], [5, 9], [6, 9],
  [7, 10], [7, 11], [8, 11], [8, 12], [8, 13], [9, 13], [9, 14],
  [10, 15], [11, 15], [11, 16], [12, 16], [13, 16], [13, 17], [14, 17],
  [15, 18], [16, 18], [16, 19], [17, 19],
];

export function NeuralNetworkVisual({
  className,
  size = "lg",
}: NeuralNetworkVisualProps) {
  const uid = useId().replace(/:/g, "");
  const shouldReduceMotion = useReducedMotion();

  const glowId = `nn-glow-${uid}`;
  const cyanId = `nn-cyan-${uid}`;
  const amberId = `nn-amber-${uid}`;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-[#0a0a0c]",
        size === "lg" ? "h-full w-full" : "h-full w-full",
        className,
      )}
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(245,158,11,0.07),transparent_62%)]" />

      <svg
        viewBox="0 0 400 320"
        className={cn(
          "relative h-auto w-full",
          size === "lg" ? "max-w-[340px]" : "max-w-[200px]",
        )}
        fill="none"
      >
        <defs>
          <filter id={glowId} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id={cyanId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="1" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.2" />
          </radialGradient>
          <radialGradient id={amberId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="1" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {edges.map(([from, to], i) => {
          const a = nodes[from];
          const b = nodes[to];
          const isAccent = i % 5 === 0;
          return (
            <g key={`e-${from}-${to}`}>
              <line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={isAccent ? "#67e8f9" : "#3f3f46"}
                strokeOpacity={isAccent ? 0.35 : 0.45}
                strokeWidth={isAccent ? 1 : 0.75}
              />
              {!shouldReduceMotion && isAccent && (
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={`url(#${cyanId})`}
                  strokeWidth={1.2}
                  strokeDasharray="3 14"
                  strokeOpacity={0.9}
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-34"
                    dur={`${2.2 + (i % 4) * 0.4}s`}
                    repeatCount="indefinite"
                  />
                </line>
              )}
            </g>
          );
        })}

        {nodes.map((node, i) => {
          const fill =
            node.accent === "amber"
              ? `url(#${amberId})`
              : node.accent === "cyan"
                ? `url(#${cyanId})`
                : "#71717a";

          return (
            <g key={`n-${i}`} filter={node.accent ? `url(#${glowId})` : undefined}>
              <circle cx={node.x} cy={node.y} r={node.r + 3} fill={fill} opacity={0.12} />
              <circle cx={node.x} cy={node.y} r={node.r} fill={fill} opacity={node.accent ? 1 : 0.7}>
                {!shouldReduceMotion && node.accent && (
                  <animate
                    attributeName="opacity"
                    values="0.55;1;0.55"
                    dur={`${2.5 + (i % 3) * 0.6}s`}
                    repeatCount="indefinite"
                  />
                )}
              </circle>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
