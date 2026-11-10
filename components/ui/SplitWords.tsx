import { Children, Fragment, cloneElement, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from "react";

/*
 * Wraps every word of every text node in `<span class="w"><span class="wi">word</span></span>` so
 * headlines can land word by word out of a mask (see globals.css). Pure and server-safe: no hooks,
 * no client code.
 *
 * - Whitespace stays plain text between the words, so lines break exactly where they did. Only
 *   breaking whitespace splits; no-break spaces and soft hyphens stay inside their word.
 * - Host elements (`<em>`, `<span className>`, …) and fragments are cloned with split children,
 *   keeping their props. Components are left untouched (their children are theirs to render).
 * - Each word gets `--w`, its index across the whole headline, for the stagger.
 */

const BREAKING_SPACE = /([ \t\n\r\f]+)/;

type Counter = { n: number };

function splitText(text: string, counter: Counter, key: string): ReactNode[] {
  return text.split(BREAKING_SPACE).map((part, i) => {
    if (i % 2 === 1) return part; // the whitespace between words
    if (part === "") return null;
    const index = counter.n++;
    return (
      <span key={`${key}-${i}`} className="w" style={{ "--w": String(index) } as CSSProperties}>
        <span className="wi">{part}</span>
      </span>
    );
  });
}

function splitNode(node: ReactNode, counter: Counter, key: string): ReactNode {
  if (typeof node === "string" || typeof node === "number" || typeof node === "bigint") {
    return splitText(String(node), counter, key);
  }

  if (Array.isArray(node)) {
    return node.map((child, i) => <Fragment key={`${key}.${i}`}>{splitNode(child, counter, `${key}.${i}`)}</Fragment>);
  }

  if (isValidElement(node)) {
    const element = node as ReactElement<{ children?: ReactNode }>;
    const isHost = typeof element.type === "string";
    if (!isHost && element.type !== Fragment) return node;
    const { children } = element.props;
    if (children === undefined || children === null || typeof children === "function") return node;
    return cloneElement(element, undefined, splitNode(Children.toArray(children), counter, key));
  }

  return node;
}

/** Returns `children` with every word wrapped for the word-mask animation. */
export function splitWords(children: ReactNode): ReactNode {
  return splitNode(children, { n: 0 }, "w");
}

/** Component form of `splitWords`. */
export function SplitWords({ children }: { children: ReactNode }) {
  return <>{splitWords(children)}</>;
}
