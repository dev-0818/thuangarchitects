import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/content";
import { getAllProjects } from "@/lib/projects";

export const dynamic = "force-static";

const staticRoutes = ["/", "/about/", "/portfolio/", "/contact/"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = staticRoutes.map((route) => ({
    url: new URL(route, SITE_CONFIG.siteUrl).toString(),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.8
  }));

  const projectEntries = getAllProjects().map((project) => ({
    url: new URL(`/portfolio/${project.category}/${project.slug}/`, SITE_CONFIG.siteUrl).toString(),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  return [...staticEntries, ...projectEntries];
}
