import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/content";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

const toCanonical = (path: string) =>
  new URL(path.replace(/\/?$/, "/"), SITE_CONFIG.siteUrl).toString();

export const buildMetadata = ({ title, description, path, image }: MetadataInput): Metadata => ({
  title,
  description,
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

