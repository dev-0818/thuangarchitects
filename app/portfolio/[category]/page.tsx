import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { LazyProjectCard } from "@/components/lazy-project-card";
import { SectionHeading } from "@/components/section-heading";
import {
  getCategoryMeta,
  getProjectsByCategory,
  isProjectCategory,
  type ProjectCategory
} from "@/lib/projects";
import { buildBreadcrumbJsonLd, buildMetadata, type BreadcrumbItem } from "@/lib/seo";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export const dynamicParams = false;

export const generateStaticParams = () =>
  (["komersial", "residential"] satisfies ProjectCategory[]).map((category) => ({ category }));

export const generateMetadata = async ({ params }: CategoryPageProps): Promise<Metadata> => {
  const { category } = await params;
  if (!isProjectCategory(category)) {
    return buildMetadata({
      title: "Portfolio Category Not Found",
      description: "The requested portfolio category is unavailable.",
      path: "/portfolio/"
    });
  }
  const meta = getCategoryMeta()[category];
  return buildMetadata({
    title: meta.title,
    description: `${meta.subtitle} Browse project pages and image galleries.`,
    path: `/portfolio/${category}/`
  });
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  if (!isProjectCategory(category)) {
    notFound();
  }

  const meta = getCategoryMeta()[category];
  const projects = getProjectsByCategory(category);
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio/" },
    { name: meta.label, path: `/portfolio/${category}/` }
  ];

  return (
    <div className="page-main">
      <Breadcrumbs items={breadcrumbs} />
      <SectionHeading eyebrow="Portfolio" title={meta.title} />
      <section className="portfolio-section" aria-labelledby="category-intro">
        <h2 id="category-intro" className="sr-only">About this collection</h2>
        <p>{meta.subtitle}</p>
        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <LazyProjectCard key={`${project.category}-${project.slug}`} project={project} index={index} />
          ))}
        </div>
      </section>
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbs)} />
    </div>
  );
}
