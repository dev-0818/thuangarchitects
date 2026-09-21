import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/content";
import type { Project } from "@/lib/projects";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

type SocialImage = {
  url: string;
  width: number;
  height: number;
  alt?: string;
};

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: SocialImage;
  keywords?: string[];
  absoluteTitle?: boolean;
};

export const toCanonical = (path: string) =>
  new URL(path.replace(/\/?$/, "/"), SITE_CONFIG.siteUrl).toString();

const toSiteUrl = (path: string) => new URL(path, SITE_CONFIG.siteUrl).toString();

const defaultImage: SocialImage = {
  url: SITE_CONFIG.defaultSocialImage,
  width: 1920,
  height: 1280,
  alt: "Thuang Architect portfolio"
};

export const buildMetadata = ({
  title,
  description,
  path,
  image = defaultImage,
  keywords,
  absoluteTitle = false
}: MetadataInput): Metadata => {
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_CONFIG.name}`;
  const imageUrl = toSiteUrl(image.url);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: {
      canonical: toCanonical(path)
    },
    robots: {
      index: true,
      follow: true
    },
    openGraph: {
      title: socialTitle,
      description,
      type: "website",
      url: toCanonical(path),
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: imageUrl,
          width: image.width,
          height: image.height,
          alt: image.alt ?? socialTitle
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [imageUrl]
    }
  };
};

const organizationId = `${SITE_CONFIG.siteUrl}/#organization`;
const websiteId = `${SITE_CONFIG.siteUrl}/#website`;

export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: SITE_CONFIG.name,
      url: `${SITE_CONFIG.siteUrl}/`,
      logo: toSiteUrl("/favicon.png"),
      image: toSiteUrl(SITE_CONFIG.defaultSocialImage),
      description: SITE_CONFIG.description,
      email: SITE_CONFIG.contactEmail,
      telephone: SITE_CONFIG.whatsappNumber,
      areaServed: [
        { "@type": "City", name: "Medan" },
        { "@type": "City", name: "Jakarta" }
      ],
      sameAs: [SITE_CONFIG.instagramUrl]
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: SITE_CONFIG.name,
      url: `${SITE_CONFIG.siteUrl}/`,
      publisher: {
        "@id": organizationId
      },
      inLanguage: "en"
    }
  ]
};

export const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_CONFIG.siteUrl}/about/#webpage`,
  url: toCanonical("/about/"),
  name: "About Thuang Architect",
  description:
    "Thuang Architect is an architecture studio based in Medan and Jakarta, creating thoughtful residential and commercial spaces.",
  isPartOf: { "@id": websiteId },
  about: { "@id": organizationId },
  inLanguage: "en"
};

export const arsitekMedanPageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.siteUrl}/arsitek-medan/#webpage`,
      url: toCanonical("/arsitek-medan/"),
      name: "Arsitek Medan | Thuang Architect",
      description: "Residential and commercial architecture services in Medan.",
      isPartOf: { "@id": websiteId },
      about: { "@id": organizationId },
      inLanguage: "id"
    },
    {
      "@type": "Service",
      "@id": `${SITE_CONFIG.siteUrl}/arsitek-medan/#service`,
      name: "Jasa Arsitek Medan",
      serviceType: "Residential and commercial architecture",
      provider: { "@id": organizationId },
      areaServed: [
        { "@type": "City", name: "Medan" },
        { "@type": "City", name: "Jakarta" }
      ],
      description: "Architecture services for residential and commercial projects."
    }
  ]
};

const buildBreadcrumbNode = (items: BreadcrumbItem[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: toCanonical(item.path)
  }))
});

export const buildBreadcrumbJsonLd = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  ...buildBreadcrumbNode(items)
});

const projectLocation = (project: Project) => {
  const parts = [project.location, project.city, project.province, project.country].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : null;
};

export const buildProjectJsonLd = (project: Project) => {
  const path = `/portfolio/${project.category}/${project.slug}/`;
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio/" },
    { name: project.categoryLabel, path: `/portfolio/${project.category}/` },
    { name: project.name, path }
  ];
  const location = projectLocation(project);
  const creativeWork: Record<string, unknown> = {
    "@type": "CreativeWork",
    "@id": `${toCanonical(path)}#project`,
    name: project.name,
    url: toCanonical(path),
    description: project.description,
    creator: { "@id": organizationId },
    provider: { "@id": organizationId },
    image: {
      "@type": "ImageObject",
      contentUrl: toSiteUrl(project.cover.sources.w1920),
      width: project.cover.width,
      height: project.cover.height,
      caption: project.cover.caption ?? project.cover.alt
    }
  };

  if (location) {
    creativeWork.contentLocation = { "@type": "Place", name: location };
  }
  if (project.year) {
    creativeWork.dateCreated = String(project.year);
  }

  return {
    "@context": "https://schema.org",
    "@graph": [buildBreadcrumbNode(breadcrumbItems), creativeWork]
  };
};
