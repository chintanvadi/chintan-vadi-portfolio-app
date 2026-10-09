# Chintan Vadi — Portfolio

Personal portfolio for **Chintan Vadi**, Full Stack Developer & Frontend Lead.
Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4** and **Motion**.

## Highlights

- **Bento hero** — intro, live product browser, a "Now" card (current role) and a live Ahmedabad clock, plus animated stats
- **Experience timeline** built from the resume — roles grouped into career chapters, a scroll-progress line, Frontend/Backend filters, expandable highlights and a sticky chapter rail on desktop
- **Stacking case-study cards** for flagship products (sticky stack on desktop, plain list on phones), plus a compact grid for earlier work, all opening a slide-over drawer
- **Stack explorer** — tap any technology to see which products it shipped in (matching lives in `projectsUsing()` in `src/data/portfolio.ts`)
- **Brief builder** contact — pick needs and timeline, get a pre-filled email in one tap
- **Mobile-first navigation** — full-screen menu sheet, bottom quick-nav dock, and a command palette (`Ctrl K` / `⌘ K`)
- Fluid type and spacing (`clamp()`), 44px+ touch targets, respects `prefers-reduced-motion`, keyboard accessible, generated Open Graph image

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
