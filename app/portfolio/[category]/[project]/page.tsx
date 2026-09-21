import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { ProjectFacts } from "@/components/project-facts";
import { ProjectGallery } from "@/components/project-gallery";
import { RelatedProjects } from "@/components/related-projects";
import {
  getAdjacentProjects,
  getAllProjectParams,
  getProjectByParams,
  getRelatedProjects,
  type ProjectCategory
} from "@/lib/projects";
import { buildMetadata, buildProjectJsonLd, type BreadcrumbItem } from "@/lib/seo";

type ProjectPageProps = {
  params: Promise<{
    category: string;
    project: string;
  }>;
};

export const dynamicParams = false;

export const generateStaticParams = () => getAllProjectParams();

export const generateMetadata = async ({ params }: ProjectPageProps): Promise<Metadata> => {
  const routeParams = await params;
  const project = getProjectByParams(routeParams.category, routeParams.project);

  if (!project) {
    return buildMetadata({
      title: "Project Not Found",
      description: "The project you requested is not available.",
      path: "/portfolio/"
    });
  }

  return buildMetadata({
    title: project.metaTitle ?? project.name,
    description: project.metaDescription ?? project.description,
    path: `/portfolio/${project.category}/${project.slug}/`,
    image: {
      url: project.cover.sources.w1920,
      width: project.cover.width,
      height: project.cover.height,
      alt: project.cover.alt
    }
  });
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const routeParams = await params;
  const project = getProjectByParams(routeParams.category, routeParams.project);

  if (!project) {
    notFound();
  }

  const adjacent = getAdjacentProjects(project.category as ProjectCategory, project.slug);
  const relatedProjects = getRelatedProjects(project);
  const path = `/portfolio/${project.category}/${project.slug}/`;
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio/" },
    { name: project.categoryLabel, path: `/portfolio/${project.category}/` },
    { name: project.name, path }
  ];
  const location = [project.location, project.city, project.province, project.country]
    .filter(Boolean)
    .join(", ");

  return (
    <article className="page-main">
      <Breadcrumbs items={breadcrumbs} />
      <section className="project-layout">
        <aside className="project-sidebar">
          <p className="section-eyebrow">{project.categoryLabel}</p>
          <h1 className="project-title">{project.name}</h1>
          <p className="project-description">{project.description}</p>
          <ProjectFacts
            facts={[
              { label: "Project Type", value: project.projectType },
              { label: "Location", value: location || null },
              { label: "Year", value: project.year },
              { label: "Scope", value: project.scope },
              { label: "Status", value: project.status },
              { label: "Design Style", value: project.designStyle },
              { label: "Client", value: project.client },
              { label: "Site Area", value: project.siteArea },
              { label: "Building Area", value: project.buildingArea },
              { label: "Architect", value: project.architect },
              { label: "Interior Design", value: project.interiorDesign },
              { label: "Landscape", value: project.landscape },
              { label: "Contractor", value: project.contractor },
              { label: "Photographer", value: project.photographer }
            ]}
          />
          {project.designConcept || project.spatialStrategy || project.designResponse ? (
            <section className="project-editorial" aria-label="Project description">
              {project.designConcept ? <><h2>Design Approach</h2><p>{project.designConcept}</p></> : null}
              {project.spatialStrategy ? <><h2>Spatial Strategy</h2><p>{project.spatialStrategy}</p></> : null}
              {project.designResponse ? <><h2>Design Response</h2><p>{project.designResponse}</p></> : null}
            </section>
          ) : null}
          <nav className="project-nav" aria-label="Project navigation">
            <Link href={`/portfolio/${project.category}/`}>All {project.categoryLabel} Projects</Link>
            <Link href="/portfolio/">Back to Portfolio</Link>
            {adjacent.previous ? (
              <Link href={`/portfolio/${adjacent.previous.category}/${adjacent.previous.slug}/`}>
                Previous: {adjacent.previous.name}
              </Link>
            ) : null}
            {adjacent.next ? (
              <Link href={`/portfolio/${adjacent.next.category}/${adjacent.next.slug}/`}>
                Next: {adjacent.next.name}
              </Link>
            ) : null}
          </nav>
          <RelatedProjects projects={relatedProjects} />
        </aside>
        <ProjectGallery images={project.images} />
      </section>
      <JsonLd data={buildProjectJsonLd(project)} />
    </article>
  );
}
