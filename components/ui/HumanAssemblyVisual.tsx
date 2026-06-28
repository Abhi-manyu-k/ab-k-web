"use client";

import { motion, useReducedMotion } from "framer-motion";

const particles = [
  { cx: 100, cy: 28, r: 3, delay: 0 },
  { cx: 88, cy: 22, r: 2, delay: 0.1 },
  { cx: 112, cy: 22, r: 2, delay: 0.15 },
  { cx: 82, cy: 32, r: 1.5, delay: 0.2 },
  { cx: 118, cy: 32, r: 1.5, delay: 0.25 },
  { cx: 100, cy: 18, r: 1.5, delay: 0.05 },
  { cx: 100, cy: 55, r: 2.5, delay: 0.3 },
  { cx: 88, cy: 50, r: 2, delay: 0.35 },
  { cx: 112, cy: 50, r: 2, delay: 0.4 },
  { cx: 76, cy: 58, r: 1.5, delay: 0.45 },
  { cx: 124, cy: 58, r: 1.5, delay: 0.5 },
  { cx: 100, cy: 72, r: 2, delay: 0.55 },
  { cx: 100, cy: 95, r: 2.5, delay: 0.6 },
  { cx: 100, cy: 118, r: 2, delay: 0.65 },
  { cx: 82, cy: 105, r: 1.5, delay: 0.7 },
  { cx: 118, cy: 105, r: 1.5, delay: 0.75 },
  { cx: 72, cy: 88, r: 2, delay: 0.8 },
  { cx: 128, cy: 88, r: 2, delay: 0.85 },
  { cx: 68, cy: 72, r: 1.5, delay: 0.9 },
  { cx: 132, cy: 72, r: 1.5, delay: 0.95 },
  { cx: 100, cy: 140, r: 2, delay: 1.0 },
  { cx: 88, cy: 155, r: 1.5, delay: 1.05 },
  { cx: 112, cy: 155, r: 1.5, delay: 1.1 },
  { cx: 82, cy: 175, r: 2, delay: 1.15 },
  { cx: 118, cy: 175, r: 2, delay: 1.2 },
  { cx: 78, cy: 198, r: 1.5, delay: 1.25 },
  { cx: 122, cy: 198, r: 1.5, delay: 1.3 },
];

const connections = [
  [0, 1], [0, 2], [0, 5], [1, 3], [2, 4],
  [0, 6], [6, 7], [6, 8], [7, 9], [8, 10],
  [6, 11], [11, 12], [12, 13], [12, 14], [12, 15],
  [7, 16], [8, 17], [9, 18], [10, 19],
  [13, 20], [20, 21], [20, 22], [21, 23], [22, 24], [23, 25], [24, 26],
];

export function HumanAssemblyVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-xs" aria-hidden="true">
      <svg
        viewBox="0 0 200 220"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="glow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
          <filter id="blur-glow">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        <rect width="200" height="220" fill="url(#glow)" />

        {connections.map(([from, to], i) => (
          <motion.line
            key={`conn-${i}`}
            x1={particles[from].cx}
            y1={particles[from].cy}
            x2={particles[to].cx}
            y2={particles[to].cy}
            stroke="#67e8f9"
            strokeOpacity={0.25}
            strokeWidth={0.75}
            initial={shouldReduceMotion ? { opacity: 0.25 } : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.25 }}
            transition={{ duration: 0.8, delay: i * 0.03, ease: "easeOut" }}
          />
        ))}

        {particles.map((p, i) => (
          <motion.g key={`particle-${i}`}>
            <motion.circle
              cx={p.cx}
              cy={p.cy}
              r={p.r * 2.5}
              fill="#f59e0b"
              opacity={0.08}
              filter="url(#blur-glow)"
              initial={shouldReduceMotion ? { opacity: 0.08 } : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.08 }}
              transition={{ duration: 0.5, delay: p.delay, ease: "easeOut" }}
            />
            <motion.circle
              cx={p.cx}
              cy={p.cy}
              r={p.r}
              fill={i % 3 === 0 ? "#f59e0b" : "#67e8f9"}
              initial={shouldReduceMotion ? { opacity: 1 } : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: p.delay, ease: "easeOut" }}
            />
            {!shouldReduceMotion && (
              <motion.circle
                cx={p.cx}
                cy={p.cy}
                r={p.r}
                fill="none"
                stroke={i % 3 === 0 ? "#f59e0b" : "#67e8f9"}
                strokeWidth={0.5}
                opacity={0.6}
                animate={{ r: [p.r, p.r + 4], opacity: [0.6, 0] }}
                transition={{
                  duration: 2.5,
                  delay: p.delay + 1,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            )}
          </motion.g>
        ))}

        <motion.text
          x="100"
          y="215"
          textAnchor="middle"
          fill="#a1a1aa"
          fontSize="7"
          fontFamily="monospace"
          initial={shouldReduceMotion ? { opacity: 0.6 } : { opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          virtual_employee.assembled
        </motion.text>
      </svg>
    </div>
  );
}
