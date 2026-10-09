# Chintan Vadi — Portfolio

Personal portfolio for **Chintan Vadi**, Full Stack Developer & Frontend Lead.
Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4** and **Motion**.

## Highlights

- **Live product browser** in the hero that cycles through recreated UIs of shipped products (tilt on hover, click to open the case study)
- **Filterable case studies** with a slide-over drawer (challenge, deliverables, metrics, stack, integrations, keyboard ← → navigation)
- **Experience section** — clickable career timeline (2018 → today), a role explorer (tabs on desktop, accordion on mobile) with every role's highlights and stack, plus education
- **Command palette** — press `Ctrl K` / `⌘ K` to jump anywhere, open a case study, copy email or download the CV
- Bento skills grid, integrations marquee, process section and contact with live Ahmedabad time
- Respects `prefers-reduced-motion`, fully keyboard accessible, generated Open Graph image

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content

All copy lives in [`src/data/portfolio.ts`](src/data/portfolio.ts) — profile, projects, skills, integrations and process.
Replace `public/Chintan-Vadi-Resume.docx` with a PDF if you prefer (and update `profile.resume`).

## Deploy

1. Push to GitHub.
2. Import the repo on [Vercel](https://vercel.com/new) — no configuration needed.
3. Optionally set `NEXT_PUBLIC_SITE_URL` (e.g. `https://chintanvadi.dev`) so social previews use your custom domain.

## Project structure

```
src/
  app/            layout, page, icon, Open Graph image, global styles
  components/     hero, browser mock, experience, work, skills, process, contact, command palette, drawer
  data/           portfolio.ts — single source of truth for all content
```
