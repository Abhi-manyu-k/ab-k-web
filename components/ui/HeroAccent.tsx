export function HeroAccent() {
  return (
    <div
      className="relative hidden h-full min-h-[280px] lg:block"
      aria-hidden="true"
    >
      <div className="absolute inset-0 dot-grid opacity-60" />
      <svg
        className="absolute right-0 top-1/2 h-[min(420px,90%)] w-auto -translate-y-1/2 text-slate-border/40"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="1" />
        <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <circle cx="200" cy="200" r="80" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="200" y1="40" x2="200" y2="360" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="40" y1="200" x2="360" y2="200" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <rect
          x="140"
          y="140"
          width="120"
          height="120"
          stroke="var(--color-amber-action)"
          strokeWidth="2"
          opacity="0.7"
          transform="rotate(12 200 200)"
        />
        <circle cx="200" cy="200" r="6" fill="var(--color-cyan-neon)" opacity="0.9" />
      </svg>
    </div>
  );
}
