# Night sheet — redesign brief

Status: not started. Written 2026-11-10 as a brief for a later session.

## What this is

A redesign that moves the site toward the temperament of [ndea.com](https://ndea.com) while keeping its own
identity (an engineering drawing by someone who has serviced the machines).

What makes Ndea work, observed on its home page:

- Near-black background, off-white text. No panels, almost no borders.
- A lot of empty space. Two narrow columns, alternating text and one visual per screen.
- Quiet type: italic serif for statements, small serif body, tiny mono nav.
- One slow generative visual per section (a drifting point-and-line network, a dot field with a wave in it).
  They move on their own and never ask for attention.

Where this site differs today: light paper, dense boxed frames, many labels, tables and zone markers in every section.
It reads as busy next to Ndea. The goal is **the same drawing language at a tenth of the volume, on a dark sheet**.

## The idea in one line

A drawing viewed at night on a light table: dark sheet, thin light lines, one precise object (the machine drawing)
and slow fields of measured signals around it.

## Three changes, in order

### 1. Dark sheet (cheap)

Every colour is already a token in the `@theme` block of `app/globals.css`, so the flip is mostly redefining tokens.
Do it as the new default, not a toggle (a toggle doubles the QA).

| Token | Now | Night |
|---|---|---|
| `--color-paper` | `#f2efe7` | `#111110` |
| `--color-paper-2` | `#e9e5da` | `#181816` |
| `--color-paper-3` | `#faf8f3` | `#1d1c1a` |
| `--color-ink` | `#1c1b18` | `#ece8dd` |
| `--color-ink-2` | `#3b3934` | `#cfcabd` |
| `--color-muted` | `#5e5a52` | `#9e998e` |
| `--color-faint` | `#6e695f` | `#8a857a` |
| `--color-line` | `#d8d3c6` | `#2a2926` |
| `--color-line-strong` | `#b8b1a1` | `#45423c` |
| `--color-signal` | `#d4471a` | `#e5622f` |
| `--color-signal-ink` | `#b93b14` | `#e5622f` |
| `--color-ok` | `#2f6f50` | `#5fae86` |

Check every pair for WCAG AA (4.5:1 for small text) before settling; the earlier sessions were strict about this.

Things that are not tokenised and need a hand edit:

- `.plate` (the dark Track Record section) loses its contrast with the page. Make it a slightly lighter band
  (`paper-2`) or drop the band and separate it with space.
- The select chevron data-URI in `.form-select` has a hard-coded ink colour.
- Paper grain (`body::before`): dark specks on dark do nothing. Switch to light specks at about half the strength.
- `.btn-ink` hard shadow, `::selection`, `viewport.themeColor` in `app/layout.tsx`, the favicon, `design/og.svg`.
- `color-scheme: light` on `html` becomes `dark`.
- The hatch on "holds." and `.bg-hatch` are ink-on-paper mixes; confirm they still read.

### 2. Thinning (the real work, and the part that needs taste)

Rule: every frame, label and divider has to justify itself. Remove until it hurts, then put one thing back.

- Hero: keep the frame, headline, one lead sentence and the machine drawing. Move "General notes" out of the hero
  (it can become the opening of the next section) and drop the zone markers and the title-block strip, or keep one.
- Section headers: keep `§02 — Label` and the drawn rule. Drop "Sheet 02" on the right.
- Stat cards: remove the boxes. Three large numerals on the bare sheet with a hairline between them.
- Tables (parts list, revision table, writing register): keep rows and hairlines, drop the outer box and the header
  band fill. More row padding.
- `.bg-mm` millimetre grid: remove as a standing texture. Keep it only where the cursor lamp reveals it.
- Vertical rhythm: roughly double the space between sections (`py-20 lg:py-32` → `py-32 lg:py-48`), and narrow the
  text measure. Fewer things per screen is the point.
- Body copy can go one step larger and lighter. Consider Fraunces italic for the lead statements, as Ndea does.

### 3. Signal fields (the new creative element)

Ndea's generative visuals are abstract. Ours should be measurements, because that is the subject.

One reusable `<SignalField>` canvas component (2D canvas, no library, about 150 lines):

- A field of 40–80 thin horizontal traces, each a slow noisy sensor signal drifting right to left.
- Every 15–25 s one trace drifts out of tolerance, turns signal orange, and is pulled back inside two faint
  tolerance lines. That is the whole story of the site in one loop.
- Variants by prop for different sections: `traces` (above), `points` (a scatter that slowly settles into a
  control chart with ±3σ limits), `lattice` (a wafer map of dots where a few cells flag and clear).
- Use one per section at most, placed like Ndea's: alone in its column, no frame, no caption or a one-line mono caption.

Constraints, same as the existing motion rules in the codebase:

- Pause when off-screen or the tab is hidden. Cap at 30 fps. Size the canvas to `devicePixelRatio`.
- Under `prefers-reduced-motion`, draw one static frame (the owner's Mac has Reduce Motion on, so check this path looks
  good, not just acceptable).
- `aria-hidden`, decorative. No pointer interaction needed in the first version.
- Colours read from the CSS tokens, so they follow the palette.

## What must not change

- Copy, page structure, URLs, metadata, the legal pages.
- The machine drawing and its sign-off interaction: it stays the one dense, precise object. On the dark sheet it
  should look like the brightest thing on the page.
- The motion language already built: lines draw, ink lands, instruments respond. No glow, no gradients, no blur.
- Accessibility level: AA contrast, keyboard paths, visible focus.

## Suggested order and checkpoints

1. Dark tokens plus the hand edits above. Review every page at 1440 and 390. Stop and look before continuing.
2. Thin the home page only. Review. If it feels right, apply the same rules to the inner pages.
3. Build `SignalField` (`traces` first), place it in one home section. Review. Then the other variants.

Each step is shippable on its own, so it can go out as three small merges.

## Working in this repo

- The project sits in iCloud-synced Documents and its `node_modules` is evicted, so `next dev` hangs here. Mirror the
  source to a folder outside iCloud, `npm ci` there, and run dev/build from the mirror.
- The owner's Mac has Reduce Motion on. Review with it on, since that is what the owner sees.
- Work on a branch and push the branch; the owner merges to `main` to deploy (Netlify).
- The owner wants the lead model used for design decisions and review, with Opus subagents doing the implementation
  on disjoint files.

## Prompt to start with

> Read docs/NIGHT-SHEET.md and do step 1 (dark tokens and the hand edits) on a new branch. Show me the home page
> and one inner page before going further.
