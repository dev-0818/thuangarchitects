import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectGallery } from "@/components/project-gallery";
import {
  getAdjacentProjects,
  getAllProjectParams,
  getProjectByParams,
  type ProjectCategory
} from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";

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
    title: project.name,
    description: project.description,
    path: `/portfolio/${project.category}/${project.slug}/`,
    image: project.cover.sources.w1920
  });
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const routeParams = await params;
  const project = getProjectByParams(routeParams.category, routeParams.project);

  if (!project) {
    notFound();
  }

  const adjacent = getAdjacentProjects(project.category as ProjectCategory, project.slug);

  return (
    <div className="page-main">
      <section className="project-layout">
        <aside className="project-sidebar">
          <p className="section-eyebrow">{project.categoryLabel}</p>
          <h1 className="project-title">{project.name}</h1>
          <p className="project-description">{project.description}</p>
          <div className="project-nav">
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
          </div>
        </aside>
        <ProjectGallery images={project.images} />
      </section>
    </div>
  );
}
