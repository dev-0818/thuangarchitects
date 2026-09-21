import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { MEDAN_SERVICE_CONTENT } from "@/lib/content";
import { arsitekMedanPageJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Arsitek Medan",
  description:
    "Residential and commercial architecture services in Medan by Thuang Architect.",
  path: "/arsitek-medan/",
  keywords: [
    "arsitek medan",
    "architect medan",
    "jasa arsitek medan",
    "arsitek rumah medan",
    "desain rumah medan",
    "commercial architect medan"
  ]
});

export default function ArsitekMedanPage() {
  return (
    <div className="page-main">
      <SectionHeading eyebrow="Architecture Service" title="Arsitek Medan" />
      <section className="about-layout">
        <aside className="about-aside">
          <div className="about-panel">
            <img
              src="/images/aboutimg3.jpeg"
              alt="Thuang Architect studio based in Medan"
              className="about-panel-image"
            />
          </div>
          <nav className="about-links" aria-label="Arsitek Medan page quick links">
            <a href="#arsitek-medan-overview">Overview</a>
            <a href="#arsitek-medan-services">Services</a>
            <a href="#arsitek-medan-scope">Scope</a>
          </nav>
        </aside>
        <div className="about-content">
          <article id="arsitek-medan-overview">
            <h2 className="section-eyebrow">Overview</h2>
            <p className="about-intro">{MEDAN_SERVICE_CONTENT.intro}</p>
          </article>

          <article id="arsitek-medan-services" className="about-services">
            <h2 className="section-eyebrow">Services</h2>
            <ul>
              {MEDAN_SERVICE_CONTENT.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </article>

          <article id="arsitek-medan-scope">
            <h2 className="section-eyebrow">Scope</h2>
            <p>{MEDAN_SERVICE_CONTENT.approach}</p>
            <p>{MEDAN_SERVICE_CONTENT.areas}</p>
            <nav className="context-links" aria-label="Related pages">
              <Link href="/portfolio/">Portfolio</Link>
              <Link href="/portfolio/residential/">Residential</Link>
              <Link href="/portfolio/komersial/">Commercial</Link>
              <Link href="/about/">About</Link>
              <Link href="/contact/">Contact</Link>
            </nav>
          </article>
        </div>
      </section>
      <JsonLd data={arsitekMedanPageJsonLd} />
    </div>
  );
}
