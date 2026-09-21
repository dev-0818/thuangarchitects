# Schema Reference

## Entity graph

### Organization

Stable ID: `https://www.thuangarchitect.com/#organization`.

Includes only visible/verified identity, URL, logo/image, description, published contact methods, broad service area, and verified official `sameAs`. `ProfessionalService` was removed because it is generic and unnecessary. `LocalBusiness` was removed because no approved public office/address/business-hours dataset is available. Add it only when public local-office facts justify it.

### WebSite

Stable ID: `https://www.thuangarchitect.com/#website`. It links to Organization through `publisher`.

### BreadcrumbList

Rendered on portfolio category and project pages. Items mirror the subtle visible breadcrumb trail and canonical routes.

### CreativeWork

Each project uses a URL-scoped `#project` ID. Name, URL, neutral/approved description, Organization creator/provider, and project images are present. Location and year appear only when manual verified content also renders them.

### ImageObject

Project images expose production URL, intrinsic width/height, and approved caption or conservative alt fallback. Credits are never inferred.

## Rules

- JSON-LD is escaped before inline rendering.
- Stable IDs and canonical `www` URLs are mandatory.
- Unknown values are omitted.
- Visible HTML and schema must agree.
- Never add reviews, ratings, awards, people, addresses, materials, dates, or locations without verified public content.
- Structural parsing/tests do not guarantee search-engine rich results.
