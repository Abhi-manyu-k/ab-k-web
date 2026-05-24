# AB Kinetics

Premium marketing website for **AB Kinetics** — an elite AI consulting firm focused on agentic AI, vertical integration, and production-grade systems.

Built with Next.js (App Router, static export), Tailwind CSS, Framer Motion, and Lucide React. Optimized for deployment on **Netlify free tier** with a custom **Ionos** domain.

## Tech Stack

- **Next.js 15** — App Router with `output: 'export'`
- **Tailwind CSS 4** — Dark-first design system
- **Framer Motion** — Kinetic animations and scroll reveals
- **Lucide React** — Icons
- **Netlify Forms** — Contact form (static-compatible)
- **TypeScript**

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
  about/page.tsx
  services/page.tsx
  case-studies/page.tsx
  contact/page.tsx
  contact/success/page.tsx
components/
  layout/             # Header, Footer
  sections/           # Hero, TrustStrip, Teasers, CTA
  ui/                 # Button, Container, cards, form, background
lib/
  site.ts             # Site config, nav, constants
  content.ts          # Services, case studies, copy data
public/
  forms.html          # Netlify Forms detection helper
netlify.toml
next.config.mjs
```

## Before Public Launch

Replace the following placeholders:

| Item | Location |
|------|----------|
| Impact metrics in case studies | `lib/content.ts` — marked with `[Replace with real metric]` |
| Contact email | `lib/site.ts` — `contactEmail` |
| Site URL | `lib/site.ts` — `url` |
| Logo | Header/Footer use text mark "AB" — swap for SVG/logo asset if available |
| Founder bio | Add to About page if desired |
| Tagline | `lib/site.ts` — `tagline` |

## Netlify Forms

The contact form uses Netlify Forms with:

- `data-netlify="true"` on the form
- Hidden `form-name` input
- Honeypot spam field
- Static helper at `public/forms.html` for build-time detection

Submissions appear in **Netlify → Forms** after deploy. Configure email notifications in Netlify dashboard.

## License

Private — AB Kinetics.
