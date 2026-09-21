import manifest from "@/generated/projects-manifest.json";
import { PROJECT_CONTENT, type ProjectContent } from "@/lib/project-content";

export type ProjectCategory = "komersial" | "residential";

export type ResponsiveSources = {
  w600: string;
  w1200: string;
  w1920: string;
};

export type ProjectImage = {
  id: string;
  alt: string;
  caption: string | null;
  credit: string | null;
  width: number;
  height: number;
  orientation: "landscape" | "portrait";
  sources: ResponsiveSources;
};

type GeneratedProject = {
  category: ProjectCategory;
  categoryLabel: string;
  name: string;
  slug: string;
  cover: ProjectImage;
  images: ProjectImage[];
};

export type Project = GeneratedProject & Omit<ProjectContent, "images"> & {
  description: string;
};

type Manifest = {
  logos: {
    navDefault: string;
    navInnerDefault: string;
    navHover: string;
    homeLogoA: string;
    homeLogoB: string;
    homeLogoC: string;
  };
  projects: GeneratedProject[];
};

const typedManifest = manifest as unknown as Manifest;

const CATEGORY_META: Record<ProjectCategory, { label: string; title: string; subtitle: string }> = {
  komersial: {
    label: "Komersial",
    title: "Commercial Architecture",
    subtitle: "A selection of commercial projects from the Thuang Architect portfolio."
  },
  residential: {
    label: "Residential",
    title: "Residential Architecture",
    subtitle: "A selection of residential projects from the Thuang Architect portfolio."
  }
};

const mergeProject = (project: GeneratedProject): Project => {
  const key = `${project.category}/${project.slug}`;
  const manual = PROJECT_CONTENT[key] ?? {};
  const images = project.images.map((image) => {
    const imageContent = manual.images?.[image.id];
    return {
      ...image,
      alt: imageContent?.alt || image.alt,
      caption: imageContent?.caption || null,
      credit: imageContent?.credit || null
    };
  });
  const cover = images.find((image) => image.id === project.cover.id) ?? images[0];
  const categoryDescription =
    project.category === "residential" ? "residential project" : "commercial project";

  return {
    ...project,
    ...manual,
    description:
      manual.shortDescription ??
      `${project.name} is a ${categoryDescription} in the Thuang Architect portfolio.`,
    cover,
    images
  };
};

const projects = typedManifest.projects.map(mergeProject);

export const getBrandAssets = () => typedManifest.logos;

export const getAllProjects = () => projects;

export const getCategoryMeta = () => CATEGORY_META;

export const isProjectCategory = (category: string): category is ProjectCategory =>
  category === "komersial" || category === "residential";

export const getProjectsByCategory = (category: ProjectCategory) =>
  projects.filter((project) => project.category === category);

export const getFeaturedProject = () => projects[0] ?? null;

export const getProjectByParams = (category: string, slug: string) =>
  projects.find((project) => project.category === category && project.slug === slug);

export const getAllProjectParams = () =>
  projects.map((project) => ({
    category: project.category,
    project: project.slug
  }));

export const getAdjacentProjects = (category: ProjectCategory, slug: string) => {
  const categoryProjects = getProjectsByCategory(category);
  const currentIndex = categoryProjects.findIndex((project) => project.slug === slug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: categoryProjects[currentIndex - 1] ?? null,
    next: categoryProjects[currentIndex + 1] ?? null
  };
};
