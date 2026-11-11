# Roadmap and honest review

Written 2026-11-11. Replaces the earlier version of this file. It is meant to be handed to an implementing agent,
one numbered priority at a time, and to be read by the owner first.

Read `docs/NIGHT-SHEET.md` for the **working setup** (the project's own `node_modules` does not work; build in a mirror
outside iCloud), the **rules that apply to every step**, and the notes on Reduce Motion and git. They apply here unchanged.

Ground rule for any agent: do not invent facts about the owner, his employer, his company, his projects or his legal
details. Where a fact is missing, keep or add the `<Tbd>` placeholder and list it in `docs/LAUNCH-TODO.md`.

How to read the verdicts below: they are judgments, not measurements. The site has no analytics and has had no user
testing, so nothing here is backed by visitor data. Where that matters, it says so.

---

## 1. Where the site stands

**Strong**

- A distinctive visual identity that matches the subject (an engineering drawing about machines).
- The hero drawing with the Approve / Reject sign-off: a visitor experiences the whole argument in ten seconds.
- A named framework (ABK-AL) with levels and controls: something concrete to cite, teach and be invited to speak about.
- Careful engineering underneath: self-hosted fonts, no cookies, no tracking, accessible contrast, static export.

**Weak (in order of how much it costs)**

1. **Legal pages are live with empty placeholders.** Impressum: 9 placeholders. Datenschutz: 11. In Germany an
   incomplete Impressum on a public site is a real exposure, independent of anything else in this file.
2. **There is nothing to read.** All four essays are drafts, so the Writing page is empty in production. The framework
   PDF is a one-page placeholder and its level examples are unwritten. Two talks lack titles, dates and links.
3. **A visible placeholder on the home page**: the orange `[TBD: date]` chip under the regulation table.
4. **Mixed identity**: a company name on the door, a first-person voice underneath.
5. **Unverified on Safari and Firefox**, and performance has not been measured since the motion, canvas and
   interaction work was added.

The last two days went into design and motion. The site is now better designed than it is filled. The next hours are
worth far more spent on items 1–3 than on any new feature.

---

## 2. Review of the decisions so far

Both the owner's pushes and the lead's suggestions, judged the same way.

| Decision | Whose | Verdict | What to do |
|---|---|---|---|
| Motion pass ("cooler and smoother") | owner asked, lead designed | **Keep.** It is restrained and on-theme. | Nothing. Note the owner's Mac has Reduce Motion on, so he sees the reduced version. |
| Freezing the hero loop under Reduce Motion | lead | **Was a mistake**, fixed. | Nothing. Lesson: review on the owner's settings. |
| Night sheet, after ndea.com | owner's taste, lead's design | **Keep, with two cautions.** It is calmer and looks more expensive. But (a) dark, sparse and generative is the house style of AI labs, so the site is now less unusual among AI sites than the paper version was, though still unusual among industrial ones; (b) long essays are harder to read light-on-dark for many people, and dark pages project and print badly. | Add a day sheet for reading (P4). Do not add more generative visuals; three is the limit. |
| Visitor signs off the agent's action | lead proposed, owner chose | **Keep. Best single piece on the site.** | Finish testing: the Approve click, phone layout, Safari. |
| Signal fields | lead | **Keep at three.** | No more instances. |
| Autonomy dial for the whole site | lead | **Wrong as pitched.** The owner's objection was right: visitors want the point, and a site-wide mode asks them to play first. | Scoped to `/framework`, off until "Run" is pressed (P5). Build only after the framework content is finished. |
| X-ray mode | lead proposed, owner liked | **Easter egg.** Fun, cheap, and maybe one visitor in fifty finds it. It wins no invitations. | Last (P6), or skip. |
| Company name as protection against sounding self-absorbed | owner | **Change.** A one-person company front with "I build…" under it reads as more self-important than a name, looks more like a side business to an employer, and costs findability by name. Self-absorption is a matter of tone and of what the pages are about. | Personal name on the door, modestly; AB Kinetics as one line of affiliation; a tone pass (P2). Reverse this only if AB Kinetics is meant to become a real firm with clients within a year or two. |
| Turn the site into a portfolio with essays | owner | **Yes. The most valuable idea so far.** Essays, talks and project sheets are what earn invitations. | P1 and P2. |
| "No idea is too bold" | owner | **The boldest useful move is finishing the content.** Rejected for now: a live model behind the agent (needs a backend, a budget and abuse handling; only if the site becomes a product demo); a site-wide audit log (charming, low value); injecting faults into the drawing (fun, medium value, later); a signed PDF of the visitor's approval (a gimmick next to a properly typeset framework PDF). | See "Later". |
| Pushing to the live site in order to look at changes | owner | **Keep; owner's call.** This is a pet project, and having unfinished work visible is what pushes him to finish it (the essays above all). The cost is that visitors sometimes see unreviewed work; he accepts that. | Merge and push to `main` when he says so, without a preview step. The one exception is the legal pages (P0): those are not a matter of taste. |
| Repository inside iCloud Documents | circumstance | **Change.** iCloud evicts `node_modules`, creates conflict copies (42 stray ` 2` files) and has put broken duplicate refs inside `.git`, which breaks `git fetch`. | Owner: push everything, then make a fresh clone outside iCloud (for example `~/Developer/ab-k-web`) and work there. Agents must not delete the stray files or refs themselves. |

---

## 3. Order of work

| # | What | Who | Why this position |
|---|---|---|---|
| P0 | Legal pages and visible placeholders | owner supplies facts; agent wires them in | Exposure today. Nothing else matters more. |
| P1 | Content: two essays, the real framework PDF, level examples, talk details, regulation table check | owner writes; agent edits and typesets | A portfolio is judged on what there is to read. |
| P2 | Identity: personal name, tone pass, Work section, organiser kit | agent, with owner answers | Depends on P1 content existing. |
| P3 | Quality gate: browsers, performance, phone, forms | agent | Must pass before the site is promoted anywhere. |
| P4 | Day sheet for reading | agent | Only useful once essays exist. |
| P5 | Autonomy dial on `/framework` | agent | Explains the main piece of work; needs that work finished. |
| P6 | X-ray mode | agent | Optional. |

"Market ready" means P0 to P3 are done. P4 to P6 are improvements.

---

## 4. Specifications

### P0 — Legal pages and visible placeholders

- Owner provides every item under "Legal" in `docs/LAUNCH-TODO.md`. Agent fills them in and removes the `<Tbd>`s.
- Impressum structure: the service provider is the natural person by default (name, address, two contact channels).
  A company line appears only if the owner says the company operates the site.
- Have both legal texts checked by someone qualified. Nothing in this file is legal advice.
- Home page: set `regulationLastReviewed` in `lib/content.ts` after the owner has verified the table (rows A and G are
  flagged in `LAUNCH-TODO.md`). Until then, **hide** the "Last reviewed" stamp in production instead of showing a placeholder.
- Visible placeholders outside the legal pages are allowed while the owner uses them as reminders to finish the work.
  Add a build-time step in `scripts/postbuild.mjs` that **lists** every page whose exported HTML contains the
  placeholder marker (a warning, not a failure), so each deploy shows what is still open.

### P1 — Content

Owner's work; an agent may structure, edit and typeset, and must not invent claims, numbers or experiences.

- **Two essays published** before the site is promoted. Suggested first two, because the home page already links to
  them: W-003 (MCP for log-file analysis) and W-001 (Data Act). 900–1,400 words each, one diagram each in the site's
  drawing style, one concrete example from practice, a plain conclusion.
- **Framework**: the typeset PDF replacing `public/framework/abk-al-v1.pdf`; one worked example per level L0–L4;
  confirm the publication date.
- **Talks**: exact titles, dates, links or DOIs for the three entries.
- **Regulation table**: verify, then set the reviewed date. Confirm the Bitkom source for both statistics.

### P2 — Identity: a personal site that does not sound like one

**P2.1 Name**

- `lib/site.ts`: `name` → `"Abhimanyu Kanwar"`. Add
  `company: { name: "AB Kinetics", line: "Advisory work is handled through AB Kinetics, my own company." }`.
  `tagline` → `"Notes and drawings on service AI and agent governance"`.
- Header wordmark: `ABHIMANYU KANWAR` in the same small mono as today, `A. KANWAR` below 400px. Same size and weight
  as the current wordmark: it is a label, not a banner. Logo mark unchanged unless the owner decides otherwise.
- Default title `Abhimanyu Kanwar — Agents that act. Governance that holds.`; page template `%s · Abhimanyu Kanwar`;
  Open Graph `siteName` the person. Regenerate the OG image and favicon if they carry the company name.
- AB Kinetics appears in exactly four places: About (affiliations), the footer strip ("Advisory via: AB Kinetics"),
  the contact topic list, and the Impressum if applicable. Audit every use of `siteConfig.name`.

**P2.2 Tone pass (propose, do not apply)**

Read every page and give the owner a list of proposed copy edits. Change no copy without approval. Rules:

- The subject of a sentence is the work, the machine or the reader wherever that reads naturally.
  "I led delivery of X" can become "X: prototype to production, in daily use by 100+ field engineers."
- At most one first-person sentence per home section. About and essays may be first person throughout.
- No "we", no "our", no services language ("offer", "solutions", "clients"), no superlatives.
- Numbers describe the work, not the person.
- Keep the dry humour already there ("hi — that's me", "auf Deutsch geht's auch"). It is what stops the site reading like a CV.
- No portrait in the hero, no "thought leader" vocabulary, no third-person bio outside the organiser kit.

**P2.3 Navigation**: `Work · Framework · Writing · Talks · About`, Contact as the button. "Governance" leaves the top
nav; the page stays at `/governance`, linked from Framework, the home Situation section and the footer.

**P2.4 Work**: `/work` index and `/work/[slug]` sheets from MDX (`content/work/*.mdx`, `lib/work.ts` mirroring
`lib/writing.ts`, same draft/published switch).

- Seed two sheets from the existing Track Record cards, using only text already on the site; everything else `<Tbd>`.
  Ask the owner whether unfinished sheets go live with their placeholders showing or stay drafts.
- Sheet order: Context · My role · What was built · Result · What I would do differently · Stack. One line where
  details are withheld for confidentiality.
- Index in the register row style. Home Track Record cards link to published sheets only.
- `netlify.toml`: `/case-studies` and `/case-studies/*` redirect to `/work`.

**P2.5 Organiser kit on `/talks`** (useful, and the one place a bio belongs): a short section "For organisers" with a
50-word and a 100-word bio, a downloadable headshot, three talk topics with one-line abstracts, languages (English,
German), formats, and the contact link. All text from the owner; placeholders keep the section hidden in production.

**P2.6 About**: add **Affiliations** (current role from `siteConfig.role`; the company line; `Views here are my own.`)
and **Open to** (`Conference talks · research collaborations · selected advisory work.`).

**P2.7 Small additions**: "Latest writing" on home listing up to three published essays and rendering nothing while
there are none; optional `siteConfig.links.cv`; README and `LAUNCH-TODO.md` updated.

**Do not change**: the framework content, the regulation table, essay text, existing URLs, the RSS path.

**Done when**: his name is on the door in small type and in every title; AB Kinetics appears only in the four places
above; no page says "we"; `/work` builds with drafts hidden in production; old `/case-studies` URLs land on `/work`;
the owner has approved or rejected each proposed tone edit; `tsc`, `eslint`, `next build` pass.

### P3 — Quality gate (before the site is promoted)

- **Deploy previews (optional)**: Netlify can build a preview URL per branch. Not required; the owner is content to
  review on the live site.
- **Browsers**: Safari (macOS and iOS) and Firefox. Features at risk: the hatched "holds." (`background-clip: text`
  with `-webkit-text-stroke`), the scroll-progress line (`animation-timeline`), the grid lamp (`@property`),
  `clip-path` animations, the canvas signal fields, the hover-pause on the sign-off row.
- **Performance** (Lighthouse, mobile profile, production build): Performance ≥ 90, LCP < 2.5 s, CLS < 0.05.
  Specific risk: hero and page-hero text is hidden until its load animation under `html.js`; confirm this does not
  delay LCP, and if it does, make the headline visible from first paint. Check CPU with all three signal fields running.
- **Phone**: every page at 375px, no sideways scroll, tap targets ≥ 36px, the sign-off buttons usable with a thumb.
- **Keyboard and screen reader**: tab through every page; the sign-off, the staircase tabs and the mobile menu.
- **Plumbing**: submit the Netlify contact form for real; check the 404 page; validate the RSS feed and sitemap;
  check the link preview in LinkedIn's Post Inspector.
- **Analytics (owner decision)**: none today, so nothing about the site can be measured. If wanted, use a cookieless
  service hosted in the EU and update the Datenschutz page first. If not wanted, leave it; do not add anything silently.

### P4 — Day sheet for reading

- Night stays the default for everyone. A small "Day / Night" switch sits in the footer on every page and at the top of
  each essay. The choice is remembered in `localStorage`. Print always uses the day sheet.
- Mechanism: `html[data-sheet="day"]` redefines the colour tokens to the original paper palette
  (paper `#f2efe7`, paper-2 `#e9e5da`, paper-3 `#faf8f3`, ink `#1c1b18`, ink-2 `#3b3934`, muted `#5e5a52`,
  faint `#6e695f`, line `#d8d3c6`, line-strong `#b8b1a1`, signal `#d4471a`, signal-ink `#b93b14`, ok `#2f6f50`).
  Set the attribute from a tiny inline script in `<head>` so there is no flash. `color-scheme` follows the sheet.
- Everything not driven by tokens needs both variants: grain, the select chevron, `theme-color`, canvas colours
  (re-read tokens when the attribute changes), the hatch on "holds.".
- Scope of care: essays, legal pages and `/framework` must be right in both. Elsewhere "correct and legible" is enough.
- Done when an essay reads comfortably in both, switching never flashes, and AA contrast holds in both.

### P5 — Autonomy dial on `/framework`

**Scope.** Not site-wide. It lives on `/framework` and does nothing until the visitor presses Run.

**Idea.** The visitor picks a level in the existing staircase and presses **Run this page at L2**. A small page agent
guides them through that page at exactly that level. The page is the plant; scrolling to a section is the action.

The agent's stops are the page's main sections, marked `data-agent-stop="<title>"`, in document order.

| Level | What the agent does | What it never does |
|---|---|---|
| **L0 Informs** | When a stop scrolls into view, logs `You are at "<title>" · <n> of <total>.` | anything else |
| **L1 Recommends** | When the visitor passes a stop, logs `Recommended next: "<title>"` with a **Go** link | scroll by itself |
| **L2 Acts with approval** | Asks `Scroll to "<title>"?` with **Approve** / **Reject** (the hero sign-off buttons). Approve scrolls. Reject, or no answer in 9 s, means no action, logged as `No approval · no action.` | act on silence |
| **L3 Acts within policy** | Shows its policy once: `May scroll within this page. May not leave the page, open links or start downloads.` Then moves stop to stop, 6 s each, logging each move. At the "Download PDF" stop it halts: `Outside policy: a download needs approval.` and asks | step outside the policy |
| **L4 Acts and reports** | Runs the whole tour without asking, inside the same policy, then posts `Report: <n> sections in <s> s · 1 download offered, not taken · 0 actions outside policy.` | leave the page or download |

Controls that hold at every level:

- **Kill switch:** `Esc` or **Stop** halts at once and logs `Stopped by operator.`
- **Operator override:** any wheel, touch, key-scroll or scrollbar use pauses the agent and logs
  `Operator took control.` It resumes only on **Resume**.
- **Everything is logged** with local time in a panel fixed bottom-right on this page only (`Page agent · log`, the
  level, the last 6 entries, Stop / Resume, close). Nothing is stored or sent. Closing or leaving ends the run.

Entry points: a `Run this page at L<n>` button in the staircase's detail panel on `/framework` (optional callback prop,
default no button, so the home page is unaffected); one link under the home staircase,
`Try it: run the framework page at L2 →`, to `/framework?run=L2`, which selects L2 and focuses Run but does not start.

Implementation: `components/ui/PageAgent.tsx`, `app/styles/agent.css`, edits in `app/framework/page.tsx`,
`AutonomyLadder.tsx`, `AutonomySection.tsx`. One reducer and one timer, modelled on `MachineDrawing.tsx`. Scroll with
`scrollIntoView` (`smooth`, or `auto` under reduced motion) and a 1px signal outline on arrival that fades in 1.2 s.
Tell the agent's own scrolling from the visitor's with a flag during programmatic scrolls; treat `wheel`, `touchstart`,
scroll keys and scrollbar `pointerdown` as operator input. The log is `aria-live="polite"`; focus is never moved by the
agent; scroll targets get `scroll-margin-top` for the fixed header; at 375px the panel docks full-width at the bottom.

Done when each level matches its row and the "never does" column holds under deliberate abuse (rapid clicks, switching
level mid-run, pressing Run twice, hiding the tab); `Esc` stops within a frame; manual scrolling always wins; without
pressing Run the page behaves exactly as today; an L2 run and an L4 run have been shown to the owner.

### P6 — X-ray mode (optional)

The page shows the drawing of itself: its grid, the distances between its parts, and what each piece of type is.

- **On:** hold `X` (ignored while focus is in a form field), or the footer toggle "X-ray" (`aria-pressed`, latches until
  pressed again or `Esc`). Footer hint in muted mono: `Hold X for the construction drawing.` Touch devices: toggle only.
- **Overlay** (one fixed full-viewport SVG, `pointer-events: none`, `aria-hidden`):
  1. Container edges as dashed verticals, with the container width as a dimension line across the top.
  2. Vertical gaps between consecutive visible `data-xray` elements as signal-coloured dimension lines with px values (minimum 24px).
  3. Type callouts for visible `h1`, `h2`, `.lead` from computed style, for example `Fraunces 300 · 64/61 · −0.045em`.
  4. Token legend bottom left (paper, ink, line, signal, ok with hex values read from the CSS variables).
  5. Title block bottom right: `X-RAY · viewport 1440 × 900 · DPR 2 · sheet <pathname>`.
- Tag with `data-xray="<label>"`: each home section, `SheetHeader`, `PageHero`, the hero headline block, the drawing
  frame, the stat rows, the footer. At most 12 gaps and 6 callouts on screen; at 375px gaps and callouts only.
- `components/ui/XRay.tsx` mounted once in the layout; measuring and drawing in a module loaded with dynamic `import()`
  on first use. Measure on activation, scroll and resize, one pass per frame, no React state per frame. Lines draw with
  `stroke-dashoffset`; under reduced motion they fade. CSS in `app/styles/xray.css`. Hidden in print.
- Done when it appears within a frame or two anywhere, tracks scrolling, costs nothing when off, the numbers match
  DevTools on three gaps and two labels, and typing "x" in the contact form does nothing.

---

## 5. What only the owner can give

1. Every legal fact in `LAUNCH-TODO.md`, and who legally operates the site (himself or AB Kinetics).
2. Whether his employer's side-activity rules allow "selected advisory work" and a consulting contact topic to be public.
3. Whether AB Kinetics is meant to become a real firm soon. If yes, the name decision in P2.1 reverses.
4. The essays, the framework PDF and examples, the talk details, the verified regulation table.
5. Bios, a headshot and talk topics for the organiser kit; project details for the Work sheets; a CV if wanted.
6. E-mail address: keep `strategy@ab-k.com` or change it (the mailbox must exist first).
7. Analytics: yes or no.
8. Footer "Material: graphite on paper" on a dark sheet: keep or change.
9. Moving the repository out of iCloud.

## 6. Later, worth considering

- **A German summary of the framework** (one page, PDF and web). Much of the audience is German machine builders; the
  site is English only. Real upkeep cost, so decide deliberately.
- Injecting faults into the hero drawing; a site-wide session log reusing the P5 log panel.
- A live model behind the agent: only if the site is to become a product demo, with a budget and abuse handling.

## 7. Prompts

> Read docs/NEXT-PORTFOLIO-XRAY-DIAL.md and docs/NIGHT-SHEET.md (working setup and rules). Do P0: here are my legal
> details: […]. Hide the "Last reviewed" stamp until I confirm the table, and add the build check for placeholders.

> Read docs/NEXT-PORTFOLIO-XRAY-DIAL.md and docs/NIGHT-SHEET.md. Do P2 on a new branch. First ask me the questions in
> section 5 that P2 needs, and give me the list of proposed tone edits for approval. When it builds, push it live.

> Read docs/NEXT-PORTFOLIO-XRAY-DIAL.md and docs/NIGHT-SHEET.md. Run the P3 quality gate and report what fails, with
> screenshots. Fix only what is clearly a bug; list everything else for me.

> Read docs/NEXT-PORTFOLIO-XRAY-DIAL.md and docs/NIGHT-SHEET.md. Do P4 (day sheet) on a new branch.

> Read docs/NEXT-PORTFOLIO-XRAY-DIAL.md and docs/NIGHT-SHEET.md. Do P5 (autonomy dial on /framework) on a new branch.
> Show me an L2 run and an L4 run before merging.
