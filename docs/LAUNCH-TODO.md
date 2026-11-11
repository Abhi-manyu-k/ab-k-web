# Launch checklist — placeholders left for Abhimanyu

Every item is marked `TODO(launch)` in the code (`grep -rn "TODO(launch)" app components lib content`).
Visible placeholders render as an orange dashed `[TBD: …]` box on the page.

## Legal (do these first — the pages are live with placeholders)

- [ ] **Impressum** (`app/impressum/page.tsx`): full name, street + no., postcode + city, e-mail, second fast contact channel (e.g. phone), VAT ID (or delete that section), name + address of the person responsible under § 18 Abs. 2 MStV.
- [ ] **Datenschutz** (`app/datenschutz/page.tsx`): controller name + address + e-mail; Netlify's postal address; confirm Netlify DPA and its EU-U.S. DPF / SCC status; Netlify log retention period; deletion period for contact-form messages; name + address of the e-mail provider for strategy@ab-k.com; competent supervisory authority (LDI NRW if your address is in NRW); "Stand" date.
- [ ] Have both texts checked — they are a structure, not legal advice.

## Regulation table (home §02, /governance)

- [ ] Row A (`lib/content.ts`, AI Act 02.08.2026): verify whether the Art. 50(2) marking duties were deferred to 2 Dec 2026.
- [ ] Row G (`lib/content.ts`, AI Act 02.08.2028): verify the Machinery Regulation moved to Annex I Section B under Reg. (EU) 2026/1744 and reword.
- [ ] Set `regulationLastReviewed` (`lib/content.ts`) to the date you checked the table — this fills the "Last reviewed" stamp.
- [ ] Confirm the Bitkom URL (`BITKOM_KI_2026` in `lib/content.ts`) is the release both the 57 % and 56 % figures come from.

## Framework (/framework)

- [ ] Check the five drafted example scenarios (`scenario` in `lib/content.ts` → `autonomyLevels`): numbers and wording.
- [ ] Confirm the v1.0 publication date (`framework.date`, currently 2026-11-06; also drives the citation year and changelog).
- [ ] Replace `public/framework/abk-al-v1.pdf` (one-page placeholder) with the typeset PDF, then set `framework.pdfReady` to `true` (`lib/content.ts`) — the download button is hidden until then.

## Talks & publications (/talks, `lib/content.ts` → `talks`)

- [ ] AIRSI 2025: confirm the paper title (taken from the LinkedIn publication entry), date, DOI or PDF link. These also feed the ScholarlyArticle JSON-LD.
- [ ] Karlstad University Industry Day: date, exact title, slides link.
- [ ] Cambridge Service Alliance webinars: dates, exact series title, recording link(s).

## Writing (/writing, `content/writing/*.mdx`)

- [ ] Write the four essays. To publish one: set `date: "YYYY-MM-DD"` and `status: "Published"` in its `metadata`.
  Drafts never appear in production (register, pages, RSS, sitemap). Preview drafts with `SHOW_DRAFTS=true npm run build` or `npm run dev`; they always carry `noindex`.
  - W-001 The Data Act turns machine data into a service battleground
  - W-002 A one-page ROI gate for vendor AI tools
  - W-003 MCP for log-file analysis: a pattern for service agents
  - W-004 Statistical process control meets LLM agents: notes from the fab floor
- [ ] Once W-003 / W-001 / W-002 are published, the "Read more" links on home §03 switch to them automatically.

## Nice to check

- [ ] Share https://www.ab-k.com in LinkedIn's Post Inspector after deploy to refresh its cached preview.
