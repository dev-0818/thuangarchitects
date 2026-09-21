import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const out = path.resolve("out");
const read = (relativePath) => readFile(path.join(out, relativePath), "utf8");
const htmlRoutes = [
  "index.html",
  "about/index.html",
  "contact/index.html",
  "arsitek-medan/index.html",
  "portfolio/index.html",
  "portfolio/residential/index.html",
  "portfolio/komersial/index.html",
  "portfolio/residential/lexington/index.html",
  "portfolio/komersial/cbd-polonia/index.html"
];

const extractJsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((match) => JSON.parse(match[1]));

test("robots permits search crawlers and references sitemap", async () => {
  const robots = await read("robots.txt");
  assert.match(robots, /User-Agent: OAI-SearchBot\s+Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/www\.thuangarchitect\.com\/sitemap\.xml/);
});

test("sitemap contains canonical routes without artificial dates", async () => {
  const sitemap = await read("sitemap.xml");
  assert.match(sitemap, /https:\/\/www\.thuangarchitect\.com\/portfolio\/residential\//);
  assert.match(sitemap, /https:\/\/www\.thuangarchitect\.com\/portfolio\/komersial\//);
  assert.doesNotMatch(sitemap, /<lastmod>/);
  assert.equal((sitemap.match(/<loc>/g) ?? []).length, 26);
});

test("major pages contain one H1, metadata, canonical, and valid JSON-LD", async () => {
  for (const route of htmlRoutes) {
    const html = await read(route);
    assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1, route);
    assert.match(html, /<meta name="description" content="[^"]+"/, route);
    assert.match(html, /<link rel="canonical" href="https:\/\/www\.thuangarchitect\.com\//, route);
    assert.match(html, /<meta property="og:image" content="https:\/\//, route);
    extractJsonLd(html);
    assert.doesNotMatch(html, /noindex/, route);
  }
});

test("homepage and projects expose conservative schema", async () => {
  const homepage = JSON.stringify(extractJsonLd(await read("index.html")));
  const project = JSON.stringify(extractJsonLd(await read("portfolio/residential/lexington/index.html")));
  assert.match(homepage, /"Organization"/);
  assert.doesNotMatch(homepage, /ProfessionalService|LocalBusiness/);
  assert.match(project, /BreadcrumbList/);
  assert.match(project, /CreativeWork/);
  assert.match(project, /ImageObject/);
});

test("Windows static export payloads are normalized for static hosting", async () => {
  const aboutEntries = await readdir(path.join(out, "about"));
  const projectEntries = await readdir(path.join(out, "portfolio", "residential", "lexington"));
  assert(aboutEntries.includes("__next.about.__PAGE__.txt"));
  assert(projectEntries.includes("__next.portfolio.$d$category.$d$project.__PAGE__.txt"));
});

test("all generated project routes exist and have intrinsic image dimensions", async () => {
  for (const category of ["residential", "komersial"]) {
    const entries = await readdir(path.join(out, "portfolio", category), { withFileTypes: true });
    for (const entry of entries.filter((candidate) => candidate.isDirectory() && !candidate.name.startsWith("__next"))) {
      const html = await read(`portfolio/${category}/${entry.name}/index.html`);
      assert.match(html, /<img[^>]+width="\d+"[^>]+height="\d+"/, `${category}/${entry.name}`);
    }
  }
});
