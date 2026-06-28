"use client";

import { motion, useReducedMotion } from "framer-motion";

const silhouette = [
  "....###....",
  "...#####...",
  "..#######..",
  "..#######..",
  "...#####...",
  "....###....",
  "...#####...",
  "..#######..",
  ".#########.",
  ".#########.",
  "..#######..",
  "...#####...",
  "...#####...",
  "....###....",
  "....###....",
];

const highlights = new Set(["2,3", "4,3", "5,2", "5,6", "7,4", "8,3", "8,5", "10,4"]);

function buildCells() {
  const cells: { x: number; y: number; highlight: boolean; delay: number }[] = [];
  silhouette.forEach((row, rowIndex) => {
    [...row].forEach((cell, colIndex) => {
      if (cell === "#") {
        cells.push({
          x: colIndex,
          y: rowIndex,
          highlight: highlights.has(`${rowIndex},${colIndex}`),
          delay: (rowIndex + colIndex) * 0.04,
        });
      }
    });
  });
  return cells;
}

const cells = buildCells();
const cellSize = 14;
const gap = 3;
const gridWidth = 11 * (cellSize + gap);
const gridHeight = silhouette.length * (cellSize + gap);

export function HumanAssemblyVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative flex aspect-square w-full max-w-[280px] items-center justify-center" aria-hidden="true">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(245,158,11,0.12),transparent_65%)]" />
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_60%,rgba(103,232,249,0.06),transparent_55%)]" />

      <motion.div
        className="absolute inset-8 rounded-full border border-slate-border/30"
        animate={shouldReduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-14 rounded-full border border-dashed border-amber-action/15"
        animate={shouldReduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 64, repeat: Infinity, ease: "linear" }}
      />

      <svg
        viewBox={`0 0 ${gridWidth} ${gridHeight}`}
        className="relative h-auto w-[58%] max-w-[200px]"
        fill="none"
      >
        <defs>
          <linearGradient id="cell-fill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fafafa" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#a1a1aa" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="cell-accent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#67e8f9" />
          </linearGradient>
        </defs>

        {cells.map((cell, i) => {
          const x = cell.x * (cellSize + gap);
          const y = cell.y * (cellSize + gap);
          return (
            <motion.rect
              key={i}
              x={x}
              y={y}
              width={cellSize}
              height={cellSize}
              rx={3}
              fill={cell.highlight ? "url(#cell-accent)" : "url(#cell-fill)"}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: cell.highlight ? 0.95 : 0.55, scale: 1 }}
              transition={{ duration: 0.35, delay: cell.delay, ease: "easeOut" }}
            />
          );
        })}
      </svg>

      {!shouldReduceMotion &&
        [
          { top: "18%", left: "22%", size: 6 },
          { top: "28%", right: "20%", size: 4 },
          { top: "62%", left: "16%", size: 5 },
          { top: "55%", right: "18%", size: 4 },
        ].map((shard, i) => (
          <motion.span
            key={i}
            className="absolute rounded-sm bg-cyan-info/40"
            style={{
              top: shard.top,
              left: shard.left,
              right: shard.right,
              width: shard.size,
              height: shard.size,
            }}
            animate={{ opacity: [0.2, 0.7, 0.2], y: [0, -4, 0] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
    </div>
  );
}
