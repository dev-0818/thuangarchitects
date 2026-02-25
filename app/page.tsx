import Link from "next/link";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { getAllProjects, getFeaturedProject } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Quiet Luxury Architecture",
  description:
    "A curated portfolio of residential and commercial architecture shaped by minimal forms, crafted materials, and controlled light.",
  path: "/"
});

export default function HomePage() {
  const featured = getFeaturedProject();
  const slides = getAllProjects()
    .slice(0, 10)
    .map((project) => project.cover);

  if (!featured) {
    return (
      <div className="page-main">
        <p>No project images are available yet.</p>
      </div>
    );
  }

  return (
    <div className="page-main hero-main">
      <section className="home-hero" aria-label="Featured project">
        <HeroSlideshow slides={slides} />
        <div className="home-overlay">
          <h1>Thuang - Architect</h1>
          <p>
            Minimalist architecture for private and commercial spaces, balancing proportion,
            material integrity, and timeless calm.
          </p>
          <div className="home-actions">
            <Link className="button-link" href="/portfolio/">
              Explore Portfolio
            </Link>
            <Link className="button-link" href={`/portfolio/${featured.category}/${featured.slug}/`}>
              View {featured.name}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
