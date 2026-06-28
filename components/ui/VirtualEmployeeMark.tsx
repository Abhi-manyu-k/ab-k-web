"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const nodes: { x: number; y: number; accent?: boolean }[] = [
  { x: 100, y: 24, accent: true },
  { x: 82, y: 38 },
  { x: 118, y: 38 },
  { x: 72, y: 58 },
  { x: 128, y: 58 },
  { x: 68, y: 78 },
  { x: 132, y: 78 },
  { x: 78, y: 96 },
  { x: 122, y: 96 },
  { x: 100, y: 104, accent: true },
  { x: 90, y: 112 },
  { x: 110, y: 112 },
  { x: 58, y: 128 },
  { x: 142, y: 128 },
  { x: 72, y: 148 },
  { x: 128, y: 148 },
  { x: 100, y: 168, accent: true },
  { x: 84, y: 188 },
  { x: 116, y: 188 },
];

const edges: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [2, 4], [1, 2],
  [3, 5], [4, 6], [3, 4], [5, 7], [6, 8],
  [7, 9], [8, 9], [5, 7], [7, 9], [8, 9],
  [9, 10], [9, 11], [10, 11],
  [10, 12], [11, 13], [12, 14], [13, 15],
  [12, 13], [14, 16], [15, 16],
  [14, 17], [15, 18], [16, 17], [16, 18], [17, 18],
  [0, 3], [0, 4], [3, 7], [4, 8],
  [10, 14], [11, 15], [12, 14], [13, 15],
];

interface VirtualEmployeeMarkProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

const sizeMap = {
  sm: "h-24 w-24",
  md: "h-40 w-40",
  lg: "h-full w-full max-h-[320px] max-w-[320px]",
};

export function VirtualEmployeeMark({
  className,
  size = "lg",
  animated = true,
}: VirtualEmployeeMarkProps) {
  const shouldReduceMotion = useReducedMotion();
  const motionEnabled = animated && !shouldReduceMotion;

  return (
    <div
      className={cn("relative flex items-center justify-center", sizeMap[size], className)}
      aria-hidden="true"
    >
      <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.1),transparent_70%)]" />

      <svg viewBox="0 0 200 210" className="relative h-full w-full" fill="none">
        <defs>
          <linearGradient id="vem-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#a1a1aa" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="vem-accent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#67e8f9" />
          </linearGradient>
          <filter id="vem-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {edges.map(([from, to], i) => {
          const a = nodes[from];
          const b = nodes[to];
          return (
            <motion.line
              key={`e-${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="url(#vem-stroke)"
              strokeWidth={0.75}
              initial={motionEnabled ? { pathLength: 0, opacity: 0 } : { opacity: 0.5 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.015, ease: "easeOut" }}
            />
          );
        })}

        {nodes.map((node, i) => (
          <motion.g key={`n-${i}`}>
            {node.accent && (
              <circle
                cx={node.x}
                cy={node.y}
                r={6}
                fill="url(#vem-accent)"
                opacity={0.12}
              />
            )}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.accent ? 2.8 : 1.8}
              fill={node.accent ? "url(#vem-accent)" : "#fafafa"}
              fillOpacity={node.accent ? 1 : 0.55}
              filter={node.accent ? "url(#vem-glow)" : undefined}
              initial={motionEnabled ? { scale: 0, opacity: 0 } : { opacity: 1 }}
              animate={{ scale: 1, opacity: node.accent ? 1 : 0.55 }}
              transition={{ duration: 0.35, delay: 0.4 + i * 0.03, ease: "easeOut" }}
            />
          </motion.g>
        ))}

        <motion.ellipse
          cx={100}
          cy={105}
          rx={58}
          ry={72}
          stroke="url(#vem-stroke)"
          strokeWidth={0.5}
          strokeOpacity={0.2}
          fill="none"
          strokeDasharray="4 6"
          initial={motionEnabled ? { opacity: 0 } : { opacity: 0.2 }}
          animate={{ opacity: 0.2, rotate: 360 }}
          transition={{
            opacity: { duration: 0.8, delay: 0.6 },
            rotate: { duration: 90, repeat: Infinity, ease: "linear" },
          }}
          style={{ transformOrigin: "100px 105px" }}
        />
      </svg>
    </div>
  );
}

/** @deprecated Use VirtualEmployeeMark */
export const HumanAssemblyVisual = VirtualEmployeeMark;
