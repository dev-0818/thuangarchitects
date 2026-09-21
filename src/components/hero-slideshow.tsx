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
  const [reduceMotion, setReduceMotion] = useState(true);

  const normalizedSlides = useMemo(() => slides.filter(Boolean), [slides]);
  const normalizedMobileSlides = useMemo(() => mobilePortraitSlides.filter(Boolean), [mobilePortraitSlides]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReduceMotion(media.matches);
    updateMotionPreference();
    media.addEventListener("change", updateMotionPreference);
    return () => media.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (normalizedSlides.length <= 1 || reduceMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % normalizedSlides.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, normalizedSlides.length, reduceMotion]);

  useEffect(() => {
    onSlideChange?.(activeIndex);
  }, [activeIndex, onSlideChange]);

  if (normalizedSlides.length === 0) {
    return null;
  }

  const activeSlide = normalizedSlides[activeIndex];
  const mobileSlideSource =
    activeIndex === 0
      ? activeSlide.sources.w1200
      : normalizedMobileSlides.length > 0
        ? normalizedMobileSlides[activeIndex % normalizedMobileSlides.length]
        : activeSlide.sources.w1200;

  return (
    <div className="home-hero-media" aria-hidden="true">
      <picture key={`${activeSlide.id}-${activeIndex}`} className="home-slide is-active">
        <source media="(max-width: 820px)" srcSet={mobileSlideSource} />
        <source media="(max-width: 1280px)" srcSet={activeSlide.sources.w1200} />
        <img
          src={activeSlide.sources.w1920}
          alt=""
          width={activeSlide.width}
          height={activeSlide.height}
          loading="eager"
          fetchPriority={activeIndex === 0 ? "high" : "auto"}
          decoding="async"
        />
      </picture>
    </div>
  );
};
