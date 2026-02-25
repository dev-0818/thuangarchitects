Got it. We’re going for "Quiet Luxury"—that ultra-minimalist, high-end architectural vibe where the whitespace does as much talking as the photos. Since you explicitly want to avoid a Single Page Application (SPA) in favor of a traditional multi-page structure, the focus will be on crisp load times and a very deliberate typographic hierarchy.



Here is the updated \*\*Product Requirements Document (PRD)\*\* tailored specifically to your visual references and site architecture.



---



\# PRD: Thuang Architect Digital Presence



\*\*Brand Aesthetic:\*\* Minimalist / High-End Architectural / CJH Studio Inspired



\*\*Architecture:\*\* Multi-Page Website (Traditional Navigation)



---



\## 1. Visual Identity \& Design System



\### 1.1 Color Palette



| Element | Hex Code | Usage |

| --- | --- | --- |

| \*\*Primary\*\* | `#4a484a` | Solid backgrounds, footer, or primary branding. |

| \*\*Secondary\*\* | `#ae8c68` | Active links, button accents, or subtle dividers. |

| \*\*Accent\*\* | `#757575` | Secondary text, captions, or image descriptions. |



\### 1.2 Typography Hierarchy



\* \*\*Brand Display (Headings):\*\* \*\*Engravers Gothic Bold\*\*

\* \*\*System/Detail Font:\*\* \*\*Convergence Regular\*\*



\*\*Legibility Rules:\*\*



\* \*\*On `#4a484a` Background:\*\* Text must be \*\*Pure White (#FFFFFF)\*\*.

\* \*\*On Light/Image Backgrounds:\*\* Text must be \*\*Dark Grey (`#4a484a`)\*\* or \*\*Grey (`#757575`)\*\*.



---



\## 2. Page-by-Page Specifications



\### 2.1 Home Page (The "Hero" Statement)



\* \*\*Layout:\*\* Full-screen minimalist hero.

\* \*\*Elements:\*\* \* Minimalist Header: "thuang ——— architect" (using the signature line-break style from CJH).

\* Large, high-resolution hero image (full bleed or with a wide margin).

\* Navigation: Portfolio, About, Press, Instagram, Contact.





\* \*\*Function:\*\* Purely visual. No scrolling on the home page if possible—just a single, striking "entry" image.



\### 2.2 About Page (The "Narrative" Layout)



\* \*\*Layout:\*\* 2-Column split (As seen in your reference).

\* \*\*Left Column:\*\* \* Vertical navigation menu.

\* One vertical portrait or studio image.





\* \*\*Right Column:\*\* \* \*\*ABOUT:\*\* (Engravers Gothic Bold Header). Body text in Convergence Regular.

\* \*\*SERVICES:\*\* List of core competencies.

\* \*\*WHAT WE DO:\*\* Expandable accordions for "CONSTRUCTION" and "SOFT FURNISHINGS" to keep the page clean but informative.







\### 2.3 Portfolio (The "Gallery" Layout)



\* \*\*Layout:\*\* Vertical focus with high whitespace.

\* \*\*Structure:\*\* \* Left-aligned menu.

\* A single, large vertical image (center-right) that acts as a gateway to specific projects.

\* Project titles appear on hover or as a minimal caption in `#757575`.





\* \*\*Interaction:\*\* Clicking an image loads a new dedicated project page (no pop-ups).



---



\## 3. Technical \& Functional Requirements



\### 3.1 Site Architecture (Non-SPA)



\* \*\*Traditional Routing:\*\* Every click (e.g., from Portfolio to an individual project) triggers a standard page load to assist with SEO and browser history.

\* \*\*Performance:\*\* All images must be optimized (WebP format) to ensure that the "white space" doesn't feel like a "loading space."



\### 3.2 Navigation Behavior



\* \*\*Static Sidebar/Header:\*\* The navigation should remain consistent across all pages to provide a grounded sense of place for the user.

\* \*\*Hover States:\*\* Subtle color shift to `#ae8c68` (Secondary Color) when hovering over menu items.



\### 3.3 Mobile Responsiveness



\* The 2-column "About" layout must stack into a single column on mobile, maintaining the Engravers Gothic headers at a smaller scale for legibility.



---



\## 4. Content Requirements



\* \*\*Imagery:\*\* Only high-resolution, professionally shot architectural photography.

\* \*\*Copy:\*\* Minimalist, professional, and sophisticated.

\* \*\*Contact:\*\* Direct email link and Instagram integration.



---



\## 5. Summary Table for Developers



| Feature | Requirement |

| --- | --- |

| \*\*Framework\*\* | Static Site (HTML/CSS) or CMS (Webflow/WordPress) |

| \*\*Navigation\*\* | Multi-page (Standard links) |

| \*\*Font Loading\*\* | Custom `@font-face` for Engravers Gothic |

| \*\*Transitions\*\* | Simple CSS Opacity Fade (0.3s) on page load |

| \*\*Backgrounds\*\* | Alternating between White and `#4a484a` |



---



