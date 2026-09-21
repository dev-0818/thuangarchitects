# Development

## Prerequisites

- Node.js 24 LTS
- npm

## Commands

```bash
npm ci
npm run dev
npm run prepare:assets
npm run typecheck
npm run lint
npm run build
npm run test:seo
npm run test:e2e
npm run lighthouse
```

`npm run build` creates and normalizes `out/`. Build before static SEO, Playwright, or Lighthouse checks. Install Chromium once locally with `npx playwright install chromium`.

## Adding a new portfolio project

1. Add WebP source images under the existing category/size structure in `Images/`.
2. Run `npm run prepare:assets`.
3. Confirm the generated project/asset paths; do not edit generated output.
4. Add the matching `category/slug` object to `src/content/project-content.json`.
5. Add only verified facts and approved editorial copy.
6. Add approved per-image alt text, captions, and credits keyed by generated image ID.
7. Run preparation again; review `docs/seo-geo/CONTENT_TODO.md`.
8. Verify project/category metadata and routes.
9. Run typecheck, lint, build, static SEO tests, and Playwright.

Do not manually edit `src/generated/projects-manifest.json`, `public/images/`, `public/logos/`, `.next/`, or `out/`.

## Manual content shape

See `src/lib/project-content.ts`. Every field is optional. Use `null` or omit unknown values. Related project keys use `category/slug`. Image overrides use generated image IDs such as `"01"`.

## Dependency upgrades

Use stable releases. Read version-matched official migration documentation. Upgrade one major subsystem at a time, regenerate assets, run validation, compare visuals, then proceed. Keep static export and Netlify compatibility.

## Schema validation

`npm run test:seo` parses local JSON-LD and validates required entity types. After deployment, also use Schema.org Validator and Google Rich Results Test where relevant. Schema validity does not guarantee rich results.
