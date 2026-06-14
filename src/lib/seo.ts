import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/content";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
};

const toCanonical = (path: string) =>
  new URL(path.replace(/\/?$/, "/"), SITE_CONFIG.siteUrl).toString();

const toSiteUrl = (path: string) => new URL(path, SITE_CONFIG.siteUrl).toString();

const localAreaServed = [
  {
    "@type": "City",
    name: "Medan",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Medan",
      addressRegion: "North Sumatra",
      addressCountry: "ID"
    }
  },
  {
    "@type": "AdministrativeArea",
    name: "North Sumatra",
    address: {
      "@type": "PostalAddress",
      addressRegion: "North Sumatra",
      addressCountry: "ID"
    }
  },
  {
    "@type": "Country",
    name: "Indonesia"
  }
];

export const buildMetadata = ({ title, description, path, image, keywords }: MetadataInput): Metadata => ({
  title,
  description,
  keywords,
  alternates: {
    canonical: toCanonical(path)
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: toCanonical(path),
    siteName: SITE_CONFIG.name,
    images: image
      ? [
          {
            url: image,
            width: 1920,
            height: 1080,
            alt: title
          }
        ]
      : undefined
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: image ? [image] : undefined
  }
});

export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${SITE_CONFIG.siteUrl}/#organization`,
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.siteUrl,
      logo: toSiteUrl("/favicon.png"),
      image: toSiteUrl("/favicon.png"),
      description: SITE_CONFIG.description,
      email: SITE_CONFIG.contactEmail,
      telephone: SITE_CONFIG.whatsappNumber,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Medan",
        addressRegion: "North Sumatra",
        addressCountry: "ID"
      },
      areaServed: localAreaServed,
      sameAs: [SITE_CONFIG.instagramUrl],
      knowsAbout: [
        "Arsitek Medan",
        "Architect Medan",
        "Residential architecture",
        "Commercial architecture",
        "Interior design",
        "Spatial planning",
        "Material direction"
      ],
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Architecture and Interior Design",
            serviceType: "Architecture and interior design"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Residential and Commercial Architecture",
            serviceType: "Residential and commercial architecture"
          }
        }
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_CONFIG.siteUrl}/#website`,
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.siteUrl,
      publisher: {
        "@id": `${SITE_CONFIG.siteUrl}/#organization`
      },
      inLanguage: ["en", "id"]
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
    "Thuang Architect is based in Medan and works on residential and commercial architecture projects in Medan and outside Medan.",
  isPartOf: {
    "@id": `${SITE_CONFIG.siteUrl}/#website`
  },
  about: {
    "@id": `${SITE_CONFIG.siteUrl}/#organization`
  },
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
      description:
        "Jasa arsitek di Medan untuk proyek rumah tinggal, komersial, dan interior. Thuang Architect berbasis di Medan dan dapat menangani proyek di luar Medan.",
      isPartOf: {
        "@id": `${SITE_CONFIG.siteUrl}/#website`
      },
      about: {
        "@id": `${SITE_CONFIG.siteUrl}/#organization`
      },
      inLanguage: "id"
    },
    {
      "@type": "Service",
      "@id": `${SITE_CONFIG.siteUrl}/arsitek-medan/#service`,
      name: "Jasa Arsitek Medan",
      serviceType: "Architecture and interior design",
      provider: {
        "@id": `${SITE_CONFIG.siteUrl}/#organization`
      },
      areaServed: localAreaServed,
      description:
        "Layanan arsitektur dan interior dari Medan untuk proyek residential dan commercial di Medan, Sumatera Utara, dan luar Medan berdasarkan kebutuhan proyek."
    }
  ]
};

