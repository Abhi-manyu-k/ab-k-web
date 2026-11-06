# AB Kinetics

Personal site of **Abhimanyu Kanwar**, writing as **AB Kinetics** — service AI and agent governance for European industry: the ABK-AL autonomy framework, essays, talks and publications.

Built with Next.js (App Router, static export), Tailwind CSS, and Lucide React. Animations are CSS-only for a light bundle. Optimized for deployment on **Netlify free tier** with a custom **Ionos** domain.

## Tech Stack

- **Next.js 15** — App Router with `output: 'export'`
- **Tailwind CSS 4** — "Engineering drawing" design system: drafting paper, graphite, one safety-orange mark
- **Lucide React** — Icons
- **Netlify Forms** — Contact form (static-compatible)
- **TypeScript**

## Content

- `lib/content.ts` — framework levels, regulation table, track record, talks, about copy
- `content/writing/*.mdx` — essays (MDX). Each exports `metadata` (`number`, `title`, `abstract`, `topic`, `status`, `date`).
  Only `status: "Published"` essays with a `date` are built in production; drafts are excluded from pages, RSS and sitemap.
  Preview drafts with `npm run dev` or `SHOW_DRAFTS=true npm run build` (always `noindex`).
- Feed: `/rss.xml` · Sitemap: `/sitemap.xml`
- Fonts are self-hosted (`app/fonts`, `public/fonts`) — no request to Google at build or run time.
- Redirects (`/services` → `/framework`, `/case-studies` → `/about#track-record`) live in `netlify.toml`.

> **iCloud note:** this folder sits in iCloud Drive. If `npm run build` hangs, macOS has evicted
> `node_modules` files to the cloud — run `rm -rf node_modules && npm ci`, or build from a copy outside iCloud.

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
```

Static files are exported to the `out/` directory.

```bash
# Preview static export locally (optional)
npx serve out
```

## Lint

```bash
npm run lint
```

## Deploy to Netlify

### Option A: Git-based deploy (recommended)

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Log in to [Netlify](https://app.netlify.com) and click **Add new site → Import an existing project**.
3. Connect your repository.
4. Netlify reads [`netlify.toml`](netlify.toml) automatically:
   - **Build command:** `npm run build`
   - **Publish directory:** `out`
5. Deploy. Netlify will detect the contact form from `public/forms.html` and the live form on `/contact`.

### Option B: Manual deploy

```bash
npm run build
npx netlify deploy --prod --dir=out
```

## Connect Ionos Custom Domain

1. In Netlify, go to **Site configuration → Domain management → Add a domain**.
2. Enter your domain (e.g. `abkinetics.com`).
3. Choose one approach:

   **Use Netlify DNS (simplest):**
   - Copy Netlify's nameservers from the domain settings.
   - In Ionos, update nameservers for your domain to Netlify's values.
   - Wait for DNS propagation (up to 24–48 hours, often faster).

   **Keep Ionos DNS:**
   - In Ionos DNS settings, add the records Netlify shows for your domain.
   - Typically: an `A` record for the apex (`@`) pointing to Netlify's load balancer IP, and a `CNAME` for `www` pointing to your Netlify site URL.
   - **Copy exact values from your Netlify domain settings** — they are site-specific.

4. In Netlify, enable **HTTPS** (automatic once DNS is verified).
5. Set your primary domain (apex or `www`) in Netlify domain settings.

## Project Structure

```
app/
  layout.tsx          # Root layout, fonts, metadata
  page.tsx            # Home
  framework/          # ABK-AL autonomy framework
  governance/
  writing/            # Drawing register + [slug] essay pages
  talks/
  about/
  contact/
  impressum/ datenschutz/
  rss.xml/ sitemap.ts robots.ts
content/writing/      # MDX essays
components/
  layout/             # Header, Footer
  sections/           # Hero, Situation, Areas, Autonomy, Track record, CTA
  ui/                 # Ladder, drawing, timeline, annotations, form
lib/
  site.ts             # Site config, nav, constants
  content.ts          # Services, case studies, copy data
public/
  forms.html          # Netlify Forms detection helper
netlify.toml
next.config.mjs
```

## Before Public Launch

See [docs/LAUNCH-TODO.md](docs/LAUNCH-TODO.md) — every placeholder is marked `TODO(launch)` in the code.

## Netlify Forms

The contact form uses Netlify Forms with:

- `data-netlify="true"` on the form
- Hidden `form-name` input
- Honeypot spam field
- Static helper at `public/forms.html` for build-time detection

Submissions appear in **Netlify → Forms** after deploy. Configure email notifications in Netlify dashboard.

## License

Private — Abhimanyu Kanwar / AB Kinetics. Fonts: SIL Open Font License (see OFL-*.txt).
