# Project Content Guide

Project pages must describe verified work, not inferred intent.

## Required editorial input

For each project provide, where public and approved:

- project title and category;
- project type;
- city, province, country, or approved location wording;
- year, status, scope, site/building area;
- 5–10 factual architectural notes;
- verified materials and credits;
- photographer;
- approved hero image;
- approved alt text/captions for every image;
- 150–500 words of project-specific narrative when enough facts exist;
- 2–4 related projects.

## Source

Enter approved values in `src/content/project-content.json`, following `src/lib/project-content.ts`. Project keys use `category/slug`; image records use generated image IDs. Omit or set unknown values to `null`.

## Writing rules

- Describe actual project facts and documented decisions.
- Keep language concise and architectural.
- Distinguish every project through verified context.
- Avoid repeated templates, keyword stuffing, vague claims, and copied competitor language.
- Never infer location, materials, scope, credits, design intent, status, year, or client from a filename/image.
- Keep schema synchronized with visible content.

Run `npm run prepare:assets`; unresolved inputs are regenerated in `CONTENT_TODO.md`.
