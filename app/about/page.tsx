import { SectionHeading } from "@/components/section-heading";
import { ResponsiveImage } from "@/components/responsive-image";
import { ABOUT_CONTENT } from "@/lib/content";
import { getFeaturedProject } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Learn about Thuang Architect's approach, services, and design principles for high-end architectural projects.",
  path: "/about/"
});

export default function AboutPage() {
  const featured = getFeaturedProject();
  const aboutImage = featured?.images[1] ?? featured?.cover ?? null;

  return (
    <div className="page-main">
      <SectionHeading eyebrow="Studio" title="About" />
      <section className="about-layout">
        <aside className="about-aside">
          {aboutImage ? (
            <div className="about-panel">
              <ResponsiveImage
                image={aboutImage}
                className="about-panel-image"
                sizes="(max-width: 1100px) 100vw, 320px"
              />
            </div>
          ) : null}
          <nav className="about-links" aria-label="About page quick links">
            <a href="#about-overview">About</a>
            <a href="#about-services">Services</a>
            <a href="#about-what-we-do">What We Do</a>
          </nav>
        </aside>
        <div className="about-content">
          <article id="about-overview">
            <h2 className="section-eyebrow">About</h2>
            <p>{ABOUT_CONTENT.intro}</p>
          </article>

          <article id="about-services" className="about-services">
            <h2 className="section-eyebrow">Services</h2>
            <ul>
              {ABOUT_CONTENT.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </article>

          <article id="about-what-we-do" className="about-details">
            <h2 className="section-eyebrow">What We Do</h2>
            <details>
              <summary>Construction</summary>
              <p>{ABOUT_CONTENT.construction}</p>
            </details>
            <details>
              <summary>Soft Furnishings</summary>
              <p>{ABOUT_CONTENT.softFurnishings}</p>
            </details>
          </article>
        </div>
      </section>
    </div>
  );
}

