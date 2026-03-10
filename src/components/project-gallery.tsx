import { ProjectImage } from "@/lib/projects";
import { LazyGalleryItem } from "@/components/lazy-gallery-item";

type ProjectGalleryProps = {
  images: ProjectImage[];
};

export const ProjectGallery = ({ images }: ProjectGalleryProps) => (
  <section aria-label="Project gallery" className="project-gallery">
    {images.map((image, index) => (
      <LazyGalleryItem
        key={image.id}
        image={image}
        index={index}
        eager={index === 0}
      />
    ))}
  </section>
);

