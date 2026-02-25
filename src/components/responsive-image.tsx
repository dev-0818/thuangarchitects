import { ProjectImage } from "@/lib/projects";

type ResponsiveImageProps = {
  image: ProjectImage;
  className?: string;
  sizes?: string;
  eager?: boolean;
};

export const ResponsiveImage = ({
  image,
  className = "",
  sizes = "100vw",
  eager = false
}: ResponsiveImageProps) => (
  <picture>
    <source media="(max-width: 767px)" srcSet={image.sources.w600} />
    <source media="(max-width: 1279px)" srcSet={image.sources.w1200} />
    <img
      src={image.sources.w1920}
      alt={image.alt}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      className={className}
    />
  </picture>
);

