import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { ResponsiveImage } from "@/components/responsive-image";
import { getCategoryMeta, getProjectsByCategory, type ProjectCategory } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";

const categories: ProjectCategory[] = ["komersial", "residential"];

export const metadata = buildMetadata({
  title: "Portfolio",
  description:
    "Browse Thuang Architect's commercial and residential portfolio with dedicated project pages and curated image galleries.",
  path: "/portfolio/"
});

export default function PortfolioPage() {
  const categoryMeta = getCategoryMeta();

  return (
    <div className="page-main">
      <SectionHeading eyebrow="Work" title="Portfolio" />
      {categories.map((category) => {
        const projects = getProjectsByCategory(category);
        const meta = categoryMeta[category];

        return (
          <section key={category} className="portfolio-section" aria-labelledby={`${category}-heading`}>
            <h2 id={`${category}-heading`} className="section-eyebrow">
              {meta.label}
            </h2>
            <p>{meta.subtitle}</p>
            <div className="portfolio-grid">
              {projects.map((project) => (
                <Link
                  key={`${project.category}-${project.slug}`}
                  href={`/portfolio/${project.category}/${project.slug}/`}
                  className="project-card"
                >
                  <figure>
                    <ResponsiveImage
                      image={project.cover}
                      className="project-card-image"
                      sizes="(max-width: 820px) 100vw, 50vw"
                    />
                    <figcaption>
                      <h3>{project.name}</h3>
                      <p>{project.categoryLabel}</p>
                    </figcaption>
                  </figure>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
