# Thuang Architect Website

Static portfolio website for Thuang Architect, an architecture studio based in Medan.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript 6
- Tailwind CSS 4 and custom CSS
- Static export to `out/`
- Netlify, Node.js 24 LTS

## Setup

```bash
npm ci
npm run dev
```

Asset preparation runs automatically before development and production builds.

## Validation

```bash
npm run typecheck
npm run lint
npm run build
npm run test:seo
npm run test:e2e
npm run lighthouse
```

Run `npm run build` before static and browser tests.

## Structure

- `app/` — App Router routes and global styles
- `src/components/` — shared UI
- `src/content/project-content.json` — verified manual project content
- `src/lib/` — project/content/SEO composition
- `scripts/prepare-assets.mjs` — generated responsive asset pipeline
- `Images/` — source images
- `docs/seo-geo/` — SEO/GEO audits and operating guidance

See [ARCHITECTURE.md](ARCHITECTURE.md), [DEVELOPMENT.md](DEVELOPMENT.md), and [DEPLOYMENT.md](DEPLOYMENT.md).
