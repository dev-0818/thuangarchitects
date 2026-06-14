import type { Metadata, Viewport } from "next";
import { Convergence } from "next/font/google";
import { BrandMark } from "@/components/brand-mark";
import { SiteNav } from "@/components/site-nav";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SITE_CONFIG } from "@/lib/content";
import { buildMetadata, siteJsonLd } from "@/lib/seo";
import "./globals.css";

const convergence = Convergence({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-primary",
  display: "swap"
});

const baseMetadata = buildMetadata({
  title: `${SITE_CONFIG.name} | Arsitek Medan`,
  description: SITE_CONFIG.description,
  path: "/",
  keywords: [
    "arsitek medan",
    "architect medan",
    "jasa arsitek medan",
    "architecture studio medan",
    "residential architect medan",
    "commercial architect medan"
  ]
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.shortName}`
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png"
  },
  description: SITE_CONFIG.description,
  alternates: baseMetadata.alternates,
  openGraph: baseMetadata.openGraph,
  twitter: baseMetadata.twitter,
  keywords: [
    "architecture studio",
    "minimalist architecture",
    "arsitek medan",
    "architect medan",
    "jasa arsitek medan",
    "residential architecture",
    "commercial architecture",
    "Thuang Architect"
  ]
};

export const viewport: Viewport = {
  themeColor: "#4a484a"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={convergence.variable}>
        <ScrollToTop />
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <div className="site-wrapper">
          <header className="site-header">
            <div className="header-inner">
              <BrandMark />
              <SiteNav tone="dark" />
            </div>
          </header>
          <main id="content">{children}</main>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
      </body>
    </html>
  );
}
