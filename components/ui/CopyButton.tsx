"use client";

import { useState } from "react";

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — the text stays selectable */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="border border-ink px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-ink transition-colors hover:bg-ink hover:text-paper"
    >
      <span aria-live="polite">{copied ? "Copied ✓" : label}</span>
    </button>
  );
}
