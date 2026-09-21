# Implementation

Implemented 2026-09-02/03.

## Stack and build

- Upgraded to Next.js 16.3.4 Active LTS, React 19.2.8, TypeScript 6.0.3, Tailwind CSS 4.3.3, Node.js 24 LTS.
- Migrated `next lint`/legacy ESLint to ESLint 9 flat configuration.
- Migrated Tailwind PostCSS integration; removed obsolete Autoprefixer and legacy configs.
- Retained App Router, static export, trailing slashes, responsive asset generation, and Netlify deployment.
- Pinned production build to documented Next 16 Webpack fallback after Turbopack failed page-data collection for the dynamic project route on this Windows environment.
- Added postbuild normalization for the confirmed Next 16 Windows static-prefetch path defect.

## Content foundation

- Removed generated marketing narratives.
- Added `src/content/project-content.json` for verified manual facts/editorial content.
- Added optional typed content fields and merged them with generated asset metadata.
- Added neutral project description/alt fallbacks with no inferred architecture claims.
- Persisted intrinsic width/height, captions, credits, and orientation.
- Generated `CONTENT_TODO.md` from missing fields.

## SEO/GEO

- Corrected title templates and homepage title handling.
- Added complete canonical, robots, OG, and Twitter metadata with a portfolio social image.
- Added `/portfolio/residential/` and `/portfolio/komersial/`.
- Removed fabricated sitemap modification dates.
- Added homepage H1/entity statement, contact location context, Medan-page contextual links, category links, project facts, related projects, and subtle breadcrumbs.
- Replaced `LocalBusiness`/`ProfessionalService` with conservative `Organization` and `WebSite` entities.
- Added `BreadcrumbList`, `CreativeWork`, and `ImageObject`; optional location/year appear only when manual content supplies them.
- Explicitly allowed `OAI-SearchBot`; left GPTBot undecided and documented.

## Performance/accessibility

- Added intrinsic image dimensions and smaller hero mobile/tablet sources.
- Preserved eager loading for likely LCP images and lazy loading elsewhere.
- Added image caching headers.
- Added visible focus styles, caption semantics, complete reduced-motion CSS, and disabled slideshow autoplay under reduced motion.

## Regression protection

- Added Node static-export SEO/schema tests.
- Added Playwright desktop/mobile route, metadata, schema, navigation, image, console, and reduced-motion checks.
- Added Lighthouse runner/reports.
- Added GitHub Actions validation; Lighthouse is initially report-only.
