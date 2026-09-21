"use client";

import Link from "next/link";
import { HeroSlideshow } from "@/components/hero-slideshow";
import type { ProjectImage } from "@/lib/projects";

type HomeHeroProps = {
  slides: ProjectImage[];
  mobilePortraitSlides: string[];
  homeLogo: string;
};

export const HomeHero = ({ slides, mobilePortraitSlides, homeLogo }: HomeHeroProps) => {
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
        <div className="home-actions">
          <Link className="button-link" href="/portfolio/">
            Explore Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
};
