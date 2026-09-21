import Link from "next/link";
import type { Project } from "@/lib/projects";

type RelatedProjectsProps = {
  projects: Project[];
};

export const RelatedProjects = ({ projects }: RelatedProjectsProps) => {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="related-projects" aria-labelledby="related-projects-heading">
      <h2 id="related-projects-heading" className="section-eyebrow">Related Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={`${project.category}/${project.slug}`}>
            <Link href={`/portfolio/${project.category}/${project.slug}/`}>{project.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
