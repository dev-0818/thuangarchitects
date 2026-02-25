"use client";

import { useEffect, useMemo, useState } from "react";
import type { ProjectImage } from "@/lib/projects";

type HeroSlideshowProps = {
  slides: ProjectImage[];
  intervalMs?: number;
};

export const HeroSlideshow = ({ slides, intervalMs = 5200 }: HeroSlideshowProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const normalizedSlides = useMemo(() => slides.filter(Boolean), [slides]);

  useEffect(() => {
    if (normalizedSlides.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % normalizedSlides.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, normalizedSlides.length]);

  if (normalizedSlides.length === 0) {
    return null;
  }

  return (
    <div className="home-hero-media" aria-hidden="true">
      {normalizedSlides.map((slide, index) => (
        <picture
          key={`${slide.id}-${index}`}
          className={`home-slide ${index === activeIndex ? "is-active" : ""}`}
        >
          <source media="(max-width: 767px)" srcSet={slide.sources.w600} />
          <source media="(max-width: 1279px)" srcSet={slide.sources.w1200} />
          <img
            src={slide.sources.w1920}
            alt={slide.alt}
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding="async"
          />
        </picture>
      ))}
    </div>
  );
};

