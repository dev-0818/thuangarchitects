import manifest from "@/generated/projects-manifest.json";

export type ProjectCategory = "komersial" | "residential";

export type ResponsiveSources = {
  w600: string;
  w1200: string;
  w1920: string;
};

export type ProjectImage = {
  id: string;
  alt: string;
  sources: ResponsiveSources;
};

export type Project = {
  category: ProjectCategory;
  categoryLabel: string;
  name: string;
  slug: string;
  description: string;
  cover: ProjectImage;
  images: ProjectImage[];
};

type Manifest = {
  generatedAt: string;
  logos: {
    wordmarkDark: string;
    wordmarkLight: string;
    markDark: string;
    markAccent: string;
  };
  projects: Project[];
};

const typedManifest = manifest as Manifest;

const CATEGORY_META: Record<ProjectCategory, { label: string; subtitle: string }> = {
  komersial: {
    label: "Komersial",
    subtitle: "High-function commercial architecture with disciplined detailing."
  },
  residential: {
    label: "Residential",
    subtitle: "Private homes designed for calm living and timeless character."
  }
};

export const getManifestGeneratedAt = () => typedManifest.generatedAt;

export const getBrandAssets = () => typedManifest.logos;

export const getAllProjects = () => typedManifest.projects;

export const getCategoryMeta = () => CATEGORY_META;

export const getProjectsByCategory = (category: ProjectCategory) =>
  typedManifest.projects.filter((project) => project.category === category);

export const getFeaturedProject = () => typedManifest.projects[0] ?? null;

export const getProjectByParams = (category: string, slug: string) =>
  typedManifest.projects.find(
    (project) => project.category === category && project.slug === slug
  );

export const getAllProjectParams = () =>
  typedManifest.projects.map((project) => ({
    category: project.category,
    project: project.slug
  }));

export const getAdjacentProjects = (category: ProjectCategory, slug: string) => {
  const projects = getProjectsByCategory(category);
  const currentIndex = projects.findIndex((project) => project.slug === slug);

  if (currentIndex === -1) {
    return {
      previous: null,
      next: null
    };
  }

  return {
    previous: projects[currentIndex - 1] ?? null,
    next: projects[currentIndex + 1] ?? null
  };
};

