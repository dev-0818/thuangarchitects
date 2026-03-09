"use client";

import Link from "next/link";
import { ResponsiveImage } from "@/components/responsive-image";
import { useLazyFade } from "@/components/use-lazy-fade";
import type { Project } from "@/lib/projects";

type LazyProjectCardProps = {
    project: Project;
    index: number;
};

export const LazyProjectCard = ({ project, index }: LazyProjectCardProps) => {
    const { ref, isVisible } = useLazyFade({ threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    return (
        <div
            ref={ref}
            className={`lazy-fade${isVisible ? " is-visible" : ""}`}
            style={{ transitionDelay: `${index * 80}ms` }}
        >
            <Link
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
        </div>
    );
};
