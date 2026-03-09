import { SectionHeading } from "@/components/section-heading";
import { LazyProjectCard } from "@/components/lazy-project-card";
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
              {projects.map((project, index) => (
                <LazyProjectCard
                  key={`${project.category}-${project.slug}`}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
