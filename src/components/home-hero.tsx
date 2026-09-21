"use client";

import Link from "next/link";
import { HeroSlideshow } from "@/components/hero-slideshow";
import type { ProjectImage } from "@/lib/projects";

type HomeHeroProps = {
  slides: ProjectImage[];
  mobilePortraitSlides: string[];
  featuredName: string;
  featuredHref: string;
  homeLogo: string;
};

export const HomeHero = ({
  slides,
  mobilePortraitSlides,
  featuredName,
  featuredHref,
  homeLogo
}: HomeHeroProps) => {
  return (
    <section className="home-hero" aria-label="Featured project">
      <HeroSlideshow slides={slides} mobilePortraitSlides={mobilePortraitSlides} />
      <div className="home-overlay">
        <img
          src={homeLogo}
          alt="Thuang Architect"
          width="3842"
          height="233"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="home-brand-logo"
        />
        <h1>Architecture Studio in Medan and Jakarta</h1>
        <p>We create thoughtful residential and commercial spaces.</p>
        <div className="home-actions">
          <Link className="button-link" href="/portfolio/">
            Explore Portfolio
          </Link>
          <Link className="button-link" href={featuredHref}>
            View {featuredName}
          </Link>
        </div>
      </div>
    </section>
  );
};
