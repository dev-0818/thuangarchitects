import { HomeHero } from "@/components/home-hero";
import { getAllProjects, getBrandAssets, getFeaturedProject } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Quiet Luxury Architecture",
  description:
    "A curated portfolio of residential and commercial architecture shaped by minimal forms, crafted materials, and controlled light.",
  path: "/"
});

export default function HomePage() {
  const featured = getFeaturedProject();
  const brandAssets = getBrandAssets();
  const projects = getAllProjects();
  const slides = projects
    .slice(0, 10)
    .map((project) => project.cover);
  const mobilePortraitSlides = projects
    .flatMap((project) => project.images)
    .filter((image) => image.orientation === "portrait")
    .slice(0, 10)
    .map((image) => image.sources.w1200);

  if (!featured) {
    return (
      <div className="page-main">
        <p>No project images are available yet.</p>
      </div>
    );
  }

  return (
    <div className="page-main hero-main">
      <HomeHero
        slides={slides}
        mobilePortraitSlides={mobilePortraitSlides}
        featuredName={featured.name}
        featuredHref={`/portfolio/${featured.category}/${featured.slug}/`}
        homeLogo={brandAssets.homeLogoB}
      />
    </div>
  );
}
