# Repository Instructions

<!-- BEGIN:nextjs-agent-rules -->

## Next.js version rules

This repository uses Next.js 16. Read version-matched documentation in `node_modules/next/dist/docs/` before changing framework behavior. Heed deprecations and preserve the static-export constraints below.

<!-- END:nextjs-agent-rules -->

## Non-negotiable rules

- Inspect existing patterns before changing architecture.
- Preserve the minimalist visual identity, typography, spacing, colors, image proportions, navigation, transitions, and responsive behavior.
- Preserve App Router, `output: "export"`, trailing-slash URLs, static project generation, and Netlify deployment unless explicitly instructed otherwise.
- Do not add server/runtime features incompatible with static export.
- Never manually edit `src/generated/projects-manifest.json`, `public/images/`, `public/logos/`, `.next/`, or `out/`.
- Change `Images/`, `src/content/project-content.json`, or `scripts/prepare-assets.mjs`, then regenerate assets.
- Never invent business or project facts. Unknown values remain absent or `null` and must be tracked in `docs/seo-geo/CONTENT_TODO.md`.
- Use `src/content/project-content.json` for verified facts, editorial copy, related projects, alt text, captions, and credits.
- Use generated manifest data only for discovered project/category names and image metadata.
- Do not add fake reviews, ratings, awards, credentials, statistics, testimonials, addresses, locations, credits, materials, or design decisions.
- Add dependencies only when native APIs and installed tooling are insufficient. Use stable compatible releases.
- Do not enable React Compiler, Cache Components, PPR, server actions, or other framework features merely because they exist.
- Preserve metadata, canonical, sitemap, robots, JSON-LD, accessibility, focus behavior, and `prefers-reduced-motion` support.
- Next 16 static export on Windows needs `scripts/normalize-static-export.mjs`; keep its postbuild check until the upstream path issue is fixed and validated.

## Generated artifacts

- `src/generated/projects-manifest.json`
- `public/images/`
- `public/logos/`
- `public/favicon.png`
- `docs/seo-geo/CONTENT_TODO.md`
- `.next/`
- `out/`

## Required validation

For relevant changes run:

```bash
npm run prepare:assets
npm run typecheck
npm run lint
npm run build
npm run test:seo
npm run test:e2e
```

Run `npm run lighthouse` for SEO, performance, layout, font, image, or rendering changes. Compare desktop/mobile screenshots when visual code changes.
