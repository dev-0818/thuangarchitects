import content from "@/content/project-content.json";

export type ProjectImageContent = {
  alt?: string | null;
  caption?: string | null;
  credit?: string | null;
};

export type ProjectContent = {
  projectType?: string | null;
  location?: string | null;
  city?: string | null;
  province?: string | null;
  country?: string | null;
  year?: number | null;
  status?: string | null;
  siteArea?: string | null;
  buildingArea?: string | null;
  scope?: string[] | null;
  designStyle?: string | null;
  client?: string | null;
  architect?: string | null;
  interiorDesign?: string | null;
  landscape?: string | null;
  contractor?: string | null;
  photographer?: string | null;
  materials?: string[] | null;
  shortDescription?: string | null;
  designConcept?: string | null;
  designChallenge?: string | null;
  designResponse?: string | null;
  spatialStrategy?: string | null;
  projectNotes?: string[] | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  relatedProjects?: string[] | null;
  images?: Record<string, ProjectImageContent> | null;
};

export const PROJECT_CONTENT = content as Record<string, ProjectContent>;
