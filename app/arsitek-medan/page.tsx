import { SectionHeading } from "@/components/section-heading";
import { MEDAN_SERVICE_CONTENT } from "@/lib/content";
import { arsitekMedanPageJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Arsitek Medan",
  description:
    "Jasa arsitek Medan untuk rumah tinggal, bangunan komersial, dan interior. Thuang Architect berbasis di Medan dan dapat menangani proyek di luar Medan.",
  path: "/arsitek-medan/",
  keywords: [
    "arsitek medan",
    "architect medan",
    "jasa arsitek medan",
    "arsitek rumah medan",
    "desain rumah medan",
    "interior design medan",
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
          </article>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(arsitekMedanPageJsonLd) }} />
    </div>
  );
}
