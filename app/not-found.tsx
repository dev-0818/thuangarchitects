import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-main">
      <section className="simple-section">
        <p className="section-eyebrow">404</p>
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link href="/portfolio/">Return to Portfolio</Link>
      </section>
    </div>
  );
}
