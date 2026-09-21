# Architecture

## Application

The website uses Next.js 16 App Router, React 19, strict TypeScript 6, Tailwind CSS 4, and custom global CSS. `output: "export"` creates a static `out/` directory. All canonical routes use trailing slashes. Netlify serves `out/` using Node.js 24 LTS during builds.

Routes:

```text
/
/about/
/contact/
/arsitek-medan/
/portfolio/
/portfolio/residential/
/portfolio/komersial/
/portfolio/{category}/{project}/
/robots.txt
/sitemap.xml
```

Project and category routes use `generateStaticParams`; no request-time server is required.

## Content and asset flow

```text
Images/
  ↓
scripts/prepare-assets.mjs
  ↓
src/generated/projects-manifest.json + public responsive assets
  ↓
src/content/project-content.json merged by src/lib/projects.ts
  ↓
static project records and generateStaticParams
  ↓
Next.js build
  ↓
scripts/normalize-static-export.mjs
  ↓
out/
  ↓
Netlify
```

Generated manifest data covers discovered projects, slugs, categories, responsive paths, dimensions, orientation, and conservative image fallbacks. Manual content covers verified facts, editorial text, metadata overrides, related projects, alt text, captions, and credits. Missing values are omitted from HTML/schema and listed in `docs/seo-geo/CONTENT_TODO.md`.

## SEO

`src/lib/seo.ts` owns canonical generation, metadata, Open Graph/Twitter cards, `Organization`, `WebSite`, `BreadcrumbList`, `CreativeWork`, and `ImageObject` data. Organization IDs are stable. `sameAs` accepts only verified official profiles. `LocalBusiness` is intentionally absent until public-office data justifies it. `ProfessionalService` is not used.

`app/sitemap.ts` lists canonical public routes without fabricated modification dates. `app/robots.ts` permits public crawling, explicitly permits `OAI-SearchBot`, and declares the sitemap. GPTBot policy remains an owner decision.

## Images

The generator copies WebP variants at 600, 1200, and 1920 pixels, strips embedded metadata, records intrinsic dimensions, and selects stable covers. Components use `<picture>`, explicit width/height, eager/high-priority loading for likely LCP images, and lazy loading elsewhere. Approved alt/caption/credit values come from manual project content.

## Static-export normalization

Next.js 16.3.4 has an upstream Windows path-normalization defect for App Router static prefetch payloads. `scripts/normalize-static-export.mjs` copies nested payloads to the requested dotted filenames after build. `tests/seo-static.test.mjs` protects the workaround. Remove it only after upgrading Next.js and confirming static client navigation on Windows and Netlify.
