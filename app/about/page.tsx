import aboutImage from "../../Images/logo png/aboutimg3.jpeg";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { ABOUT_CONTENT } from "@/lib/content";
import { aboutPageJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Learn about Thuang Architect, a Medan and Jakarta architecture studio creating thoughtful residential and commercial spaces.",
  path: "/about/",
  keywords: [
    "Thuang Architect Medan",
    "arsitek medan",
    "architect medan",
    "architecture studio medan"
  ]
});

export default function AboutPage() {
  return (
    <div className="page-main">
      <SectionHeading eyebrow="Studio" title="About" />
      <div className="about-editorial">
        <figure className="about-editorial-portrait">
          <img
            src={aboutImage.src}
            alt="Thuang Architect Studio"
            width={aboutImage.width}
            height={aboutImage.height}
          />
        </figure>

        <div className="about-editorial-content">
          <article className="about-editorial-copy" id="about-overview">
            <p className="about-editorial-label">Architecture studio</p>
            <div className="about-editorial-prose">
              {ABOUT_CONTENT.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>

          <section
            className="about-editorial-section about-editorial-services"
            id="about-services"
            aria-labelledby="about-services-heading"
          >
            <header className="about-editorial-section-header">
              <h2 id="about-services-heading">Services</h2>
              <p>Scope of practice</p>
            </header>
            <div className="about-editorial-service-list">
              {ABOUT_CONTENT.services.map((service, index) => (
                <details key={service.title} open={index === 0}>
                  <summary>
                    <span>{service.title}</span>
                    <span className="about-editorial-service-icon" aria-hidden="true" />
                  </summary>
                  <p>{service.description}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
      <JsonLd data={aboutPageJsonLd} />
    </div>
  );
}
