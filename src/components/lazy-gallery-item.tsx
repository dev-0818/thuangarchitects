"use client";

import { ResponsiveImage } from "@/components/responsive-image";
import { useLazyFade } from "@/components/use-lazy-fade";
import type { ProjectImage } from "@/lib/projects";

type LazyGalleryItemProps = {
    image: ProjectImage;
    index: number;
    eager?: boolean;
};

export const LazyGalleryItem = ({ image, index, eager = false }: LazyGalleryItemProps) => {
    const { ref, isVisible } = useLazyFade({
        threshold: 0.08,
        rootMargin: "0px 0px -60px 0px",
        delay: 100 + index * 120
    });

    return (
        <figure
            ref={ref as unknown as React.Ref<HTMLElement>}
            className={`project-gallery-item lazy-fade${isVisible ? " is-visible" : ""}`}
            style={{ transitionDelay: `${index * 80}ms` }}
        >
            <ResponsiveImage
                image={image}
                eager={eager}
                className="project-gallery-image"
                sizes="(max-width: 1024px) 92vw, 62vw"
            />
        </figure>
    );
};
