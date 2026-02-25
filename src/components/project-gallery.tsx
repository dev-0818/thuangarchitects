import { ProjectImage } from "@/lib/projects";
import { ResponsiveImage } from "@/components/responsive-image";

type ProjectGalleryProps = {
  images: ProjectImage[];
};

export const ProjectGallery = ({ images }: ProjectGalleryProps) => (
  <section aria-label="Project gallery" className="project-gallery">
    {images.map((image, index) => (
      <figure key={image.id} className="project-gallery-item">
        <ResponsiveImage
          image={image}
          eager={index === 0}
          className="project-gallery-image"
          sizes="(max-width: 1024px) 100vw, 76vw"
        />
      </figure>
    ))}
  </section>
);

