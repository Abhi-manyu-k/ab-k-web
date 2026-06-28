interface TerminalBlockProps {
  lines: readonly { type: "prompt" | "output" | "status" | "plain"; text: string }[];
  className?: string;
}

export function TerminalBlock({ lines, className }: TerminalBlockProps) {
  return (
    <div className={className}>
      <pre className="terminal-block overflow-x-auto">
        {lines.map((line, i) => (
          <div key={i} className={line.type === "plain" ? "" : line.type}>
            {line.text}
          </div>
        ))}
      </pre>
    </div>
  );
}
