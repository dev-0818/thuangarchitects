import { SectionHeading } from "@/components/section-heading";
import { SITE_CONFIG } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Contact Thuang Architect for residential and commercial architecture consultations.",
  path: "/contact/"
});

export default function ContactPage() {
  return (
    <div className="page-main">
      <SectionHeading eyebrow="Connect" title="Contact" />
      <section className="simple-section">
        <p>
          For project inquiries and collaborations, contact us directly using the
          details below.
        </p>

        <div className="contact-card">
          <span className="contact-label">Email</span>
          <a className="contact-value" href={`mailto:${SITE_CONFIG.contactEmail}`}>
            {SITE_CONFIG.contactEmail}
          </a>

          <span className="contact-label">WhatsApp</span>
          <a
            className="contact-value"
            href={SITE_CONFIG.whatsappUrl}
            target="_blank"
            rel="noreferrer"
          >
            {SITE_CONFIG.whatsappNumber}
          </a>

          <span className="contact-label">Instagram</span>
          <a
            className="contact-value"
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noreferrer"
          >
            {SITE_CONFIG.instagramUrl}
          </a>
        </div>
      </section>
    </div>
  );
}
