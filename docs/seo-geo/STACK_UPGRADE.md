# Stack Upgrade

| Component | Before | After | Reason |
|---|---:|---:|---|
| Next.js | 15.5.19 | 16.3.4 | Active LTS, security fixes |
| React / React DOM | 19.2.4 | 19.2.8 | Supported stable patch |
| TypeScript | 5.9.3 | 6.0.3 | Stable tooling update |
| Tailwind CSS | 3.4.19 | 4.3.3 | Stable major, modern PostCSS integration |
| Node build runtime | 22 | 24 LTS | Current production LTS |
| ESLint | 8.57.1 | 9.39.5 | Next 16-compatible flat config |

## Migration sources

Official Next.js support policy and Next.js 16 upgrade/static-export documentation, Tailwind CSS 4 upgrade documentation, Node.js release schedule, and Netlify Node dependency documentation were reviewed on 2026-09-02.

## Changes

- Replaced `next lint` with `eslint .` and flat config.
- Replaced Tailwind directives/PostCSS plugin; removed Autoprefixer and obsolete JS Tailwind config.
- Removed TypeScript `baseUrl`; retained alias via relative `paths` target.
- Accepted Next-generated React JSX and route type declarations.
- Pinned Node 24 in Netlify and package engines.
- Added Playwright 1.62.1, Lighthouse 13.4.1, and `serve` 14.2.6.

## Deliberate constraints

- Production build uses `next build --webpack`. Next 16 Turbopack compiled but failed project-route page data collection on Windows; Webpack completed static export. Re-evaluate after a later stable Next patch.
- `scripts/normalize-static-export.mjs` works around confirmed upstream Next 16 Windows static-export path normalization issue (#92339 / open fix #92340).
- React Compiler, Cache Components, PPR, server actions, and runtime rendering remain disabled.
- ESLint 10 was tested then rejected because Next's current transitive lint plugins still declare ESLint 9 compatibility.
- Tailwind visual behavior remains controlled by existing custom CSS; no utility-driven redesign occurred.

## Validation

Clean install, asset generation, typecheck, lint, static build/export, Node SEO tests, Playwright desktop/mobile checks, screenshots, dependency audit, and Lighthouse were run.
