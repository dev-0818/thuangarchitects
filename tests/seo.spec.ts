import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/about/",
  "/contact/",
  "/arsitek-medan/",
  "/portfolio/",
  "/portfolio/residential/",
  "/portfolio/komersial/",
  "/portfolio/residential/lexington/",
  "/portfolio/komersial/cbd-polonia/"
];

test.describe("SEO rendering", () => {
  for (const route of routes) {
    test(`${route} renders indexable metadata`, async ({ page }) => {
      const severeErrors: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") severeErrors.push(message.text());
      });
      page.on("pageerror", (error) => severeErrors.push(error.message));

      const response = await page.goto(route);
      expect(response?.ok()).toBeTruthy();
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page).toHaveTitle(/Thuang/);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        new RegExp(`https://www\\.thuangarchitect\\.com${route === "/" ? "/" : route}`)
      );
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /^https:/);
      expect(severeErrors).toEqual([]);
    });
  }

  test("homepage exposes the organization entity", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Architecture Studio in Medan and Jakarta");
    const graphs = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(graphs.map((graph) => JSON.parse(graph)).some((value) => JSON.stringify(value).includes('"Organization"'))).toBeTruthy();
  });

  test("project exposes breadcrumbs, project schema, and images", async ({ page }) => {
    await page.goto("/portfolio/residential/lexington/");
    await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
    await expect(page.getByRole("link", { name: "All Residential Projects" })).toBeVisible();
    const graphs = await page.locator('script[type="application/ld+json"]').allTextContents();
    const serialized = graphs.map((graph) => JSON.stringify(JSON.parse(graph))).join("");
    expect(serialized).toContain("BreadcrumbList");
    expect(serialized).toContain("CreativeWork");
    const images = page.locator(".project-gallery img");
    expect(await images.count()).toBeGreaterThan(0);
    await expect(images.first()).toHaveAttribute("width", /\d+/);
    await expect(images.first()).toHaveAttribute("height", /\d+/);
  });

  test("category navigation reaches a project", async ({ page }) => {
    await page.goto("/portfolio/residential/");
    await page.locator(".project-card").first().click();
    await expect(page).toHaveURL(/\/portfolio\/residential\/[^/]+\/$/);
  });

  test("reduced motion disables slideshow changes", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const firstSlide = page.locator(".home-slide.is-active");
    const initialSource = await firstSlide.locator("img").getAttribute("src");
    await page.waitForTimeout(5500);
    await expect(page.locator(".home-slide.is-active img")).toHaveAttribute("src", initialSource ?? "");
  });
});
