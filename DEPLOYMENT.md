# Deployment

## Netlify

- Build runtime: Node.js 24 LTS
- Build command: `npm run build`
- Publish directory: `out`
- Required secrets: none

The prebuild hook regenerates assets. The postbuild hook normalizes Next.js static prefetch payloads generated on Windows. Netlify serves only static files; no Next.js server/functions are required.

## Host and caching

The canonical host is `https://www.thuangarchitect.com/`. `netlify.toml` permanently redirects the apex hostname to `www`. Generated images receive browser/CDN caching headers. Security headers apply site-wide.

## Production checks

After deploy verify:

1. `/`, `/about/`, `/contact/`, `/arsitek-medan/`, portfolio/category pages, and representative projects return 200.
2. Apex HTTP/HTTPS variants redirect once to the canonical HTTPS `www` URL.
3. `/robots.txt` and `/sitemap.xml` return 200.
4. Canonicals, titles, descriptions, OG images, and JSON-LD use the production host.
5. Project images and client-side navigation load without 404/console errors.
6. `OAI-SearchBot` is not blocked by Netlify, CDN, WAF, or robots rules.
7. No preview/development route is indexed.

## WAF and crawler policy

No WAF configuration exists in this repository. Verify external CDN/security settings manually. GPTBot policy is intentionally not set pending owner preference; it is independent from `OAI-SearchBot` search discovery.

## Rollback

Redeploy the last known-good Netlify deploy or revert the relevant repository change, rebuild, and rerun smoke checks. Never recover by editing generated `out/` files directly.
