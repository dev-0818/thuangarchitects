"use client";

import { ResponsiveImage } from "@/components/responsive-image";
import { useLazyFade } from "@/components/use-lazy-fade";
import type { ProjectImage } from "@/lib/projects";

type LazyGalleryItemProps = {
    image: ProjectImage;
    eager?: boolean;
};

export const LazyGalleryItem = ({ image, eager = false }: LazyGalleryItemProps) => {
    const { ref, isVisible } = useLazyFade({ threshold: 0.08, rootMargin: "0px 0px -60px 0px" });

    return (
        <figure
            ref={ref}
            className={`project-gallery-item lazy-fade${isVisible ? " is-visible" : ""}`}
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
