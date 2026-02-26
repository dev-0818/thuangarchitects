"use client";

import { useEffect, useMemo, useState } from "react";
import type { ProjectImage } from "@/lib/projects";

type HeroSlideshowProps = {
  slides: ProjectImage[];
  mobilePortraitSlides?: string[];
  intervalMs?: number;
  onSlideChange?: (index: number) => void;
};

export const HeroSlideshow = ({
  slides,
  mobilePortraitSlides = [],
  intervalMs = 5200,
  onSlideChange
}: HeroSlideshowProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const normalizedSlides = useMemo(() => slides.filter(Boolean), [slides]);
  const normalizedMobileSlides = useMemo(() => mobilePortraitSlides.filter(Boolean), [mobilePortraitSlides]);

  useEffect(() => {
    if (normalizedSlides.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % normalizedSlides.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, normalizedSlides.length]);

  useEffect(() => {
    onSlideChange?.(activeIndex);
  }, [activeIndex, onSlideChange]);

  if (normalizedSlides.length === 0) {
    return null;
  }

  return (
    <div className="home-hero-media" aria-hidden="true">
      {normalizedSlides.map((slide, index) => {
        const mobileSlideSource =
          index === 0
            ? slide.sources.w1920
            : normalizedMobileSlides.length > 0
            ? normalizedMobileSlides[index % normalizedMobileSlides.length]
            : slide.sources.w1920;

        return (
          <picture
            key={`${slide.id}-${index}`}
            className={`home-slide ${index === activeIndex ? "is-active" : ""}`}
          >
            <source media="(max-width: 820px)" srcSet={mobileSlideSource} />
            <source media="(max-width: 1280px)" srcSet={slide.sources.w1920} />
            <img
              src={slide.sources.w1920}
              alt={slide.alt}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
            />
          </picture>
        );
      })}
    </div>
  );
};
