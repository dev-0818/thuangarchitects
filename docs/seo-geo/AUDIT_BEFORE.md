# Audit Before

Audit date: 2026-09-02

## Architecture baseline

- Next.js 15.5.19 App Router, React 19.2.4, TypeScript 5.9.3, Tailwind CSS 3.4.19.
- Static export, trailing-slash URLs, Netlify `out/`, Node 22.
- 19 project routes generated from `Images/` through `scripts/prepare-assets.mjs`.
- No CMS, category index routes, test suite, CI, or project documentation.

## Validation baseline

- `npm ci`: passed; 8 reported vulnerabilities (1 low, 7 high).
- Asset preparation: passed; 19 projects.
- TypeScript (`npx tsc --noEmit`): passed.
- `npm run lint`: passed with Next 15 deprecation warning.
- `npm run build`: passed; 29 static pages.
- Representative desktop/mobile screenshots captured outside the repository.
- Lighthouse homepage: Performance 51, Accessibility 100, Best Practices 100, SEO 92; LCP 3.8 seconds, CLS 0.001.

## SEO/GEO baseline

Present: canonical helper, page metadata, robots, sitemap, Organization/WebSite-like graph, static project pages, responsive WebP variants, first-gallery-image eager loading, basic semantic landmarks.

Problems:

- Generated formulaic project narratives and image alt text inferred unverified design qualities.
- Project model lacked optional factual/editorial fields.
- Homepage lacked H1 and explicit visible entity statement.
- No category index pages, breadcrumbs, project facts, related-project section, or project schema.
- Organization graph used `LocalBusiness` and deprecated/generic `ProfessionalService` without sufficient verified office data.
- OG images were absent on several pages; project titles were generic; homepage title could duplicate branding.
- Image dimensions were parsed but discarded; sitemap assigned build time as every URL's modification date.
- Reduced-motion support did not stop slideshow autoplay.
- Contact lacked visible Medan/North Sumatra/Indonesia context.
- No Playwright, SEO/schema regression checks, Lighthouse configuration, CI, or permanent operating documentation.
