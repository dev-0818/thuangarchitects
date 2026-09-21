# Audit After

Audit date: 2026-09-03

## End state

- Next.js 16.3.4 Active LTS, React 19.2.8, TypeScript 6.0.3, Tailwind CSS 4.3.3, Node.js 24 LTS.
- App Router, static export, trailing slashes, generated assets, and Netlify `out/` deployment preserved.
- 19 projects plus combined/category portfolio routes statically generated.
- `npm audit`: 0 known vulnerabilities after controlled upgrades and non-forced transitive fixes.

## SEO/GEO changes

- Homepage: unique absolute title, H1, explicit Medan studio statement, default social image.
- All major pages: unique title/description, canonical, index/follow, Open Graph, Twitter image.
- Sitemap: 26 canonical URLs; category routes included; fabricated build timestamps removed.
- Robots: wildcard and explicit `OAI-SearchBot` allow; sitemap declared.
- Content: formulaic generated claims removed; typed verified manual content source added; missing facts tracked.
- Projects: optional fact/editorial blocks, category links, three deterministic related projects, approved image content support.
- Schema: conservative Organization/WebSite, category/project breadcrumbs, project CreativeWork/ImageObject. `ProfessionalService` and unverified `LocalBusiness` removed.
- Contact and Medan authority pages expose/link verified location and portfolio context.

## Images, performance, accessibility

- Intrinsic dimensions retained and rendered.
- Hero mobile/tablet sources reduced to 1200-pixel variants.
- Likely LCP images remain eager/high priority; offscreen images remain lazy.
- Image caching headers added.
- Focus-visible, captions, semantic breadcrumbs, one H1 per major page, reduced-motion CSS, and slideshow autoplay suppression added.

## Automated validation

- Static SEO/schema: 6 passed.
- Playwright: 26 passed across desktop/mobile Chromium.
- Major static routes, navigation, images, JSON-LD, metadata, console, and reduced motion validated.
- Static export payload normalization checked to prevent Next 16 Windows prefetch 404s.

## Lighthouse final

Local production-like static server, mobile profile:

| Page | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
|---|---:|---:|---:|---:|---:|---:|
| Home | 87 | 100 | 100 | 100 | 3.7 s | 0.001 |
| Portfolio | 81 | 100 | 100 | 100 | 3.8 s | 0 |
| Lexington project | 87 | 96 | 100 | 100 | 3.3 s | 0 |
| Arsitek Medan | 90 | 96 | 100 | 100 | 3.1 s | 0 |

Raw reports are under `docs/seo-geo/lighthouse/`. Lighthouse emitted Windows temp-directory cleanup `EPERM` messages after producing valid reports; the runner verifies report JSON and works normally in CI/Linux. Scores are regression signals, not ranking guarantees.

## Remaining limitations and owner tasks

- Project-specific facts, narratives, and image descriptions remain empty pending owner-approved data; see `CONTENT_TODO.md`.
- Instagram ownership, public contact data, service claims, and broad location language should receive owner review.
- GPTBot policy remains undecided.
- Analytics/Search Console/Google Business Profile/WAF checks require owner credentials or external configuration.
- Production HTTP/redirect/crawler behavior requires post-deploy verification.
- Screenshot review confirmed layout, imagery, navigation, spacing, and responsive structure remain intact. The homepage copy changed intentionally to add the required H1/entity statement; project/category pages gained subtle factual navigation/content.
- Final local validation ran under installed Node 25.2.1 with an expected engine warning; CI/Netlify are pinned to Node 24 LTS. The last successful package audit reported zero vulnerabilities; two later audit retries failed only with npm registry `ECONNRESET`.
- Revisit Webpack build pin and static-export normalization after upstream Next fixes ship in a stable release.
