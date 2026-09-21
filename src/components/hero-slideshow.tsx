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
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null);
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
      setActiveIndex((current) => {
        setOutgoingIndex(current);
        return (current + 1) % normalizedSlides.length;
      });
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, normalizedSlides.length, reduceMotion]);

  useEffect(() => {
    if (outgoingIndex === null) {
      return;
    }

    const timer = window.setTimeout(() => setOutgoingIndex(null), 1500);
    return () => window.clearTimeout(timer);
  }, [outgoingIndex]);

  useEffect(() => {
    onSlideChange?.(activeIndex);
  }, [activeIndex, onSlideChange]);

  if (normalizedSlides.length === 0) {
    return null;
  }

  const nextIndex = (activeIndex + 1) % normalizedSlides.length;
  const renderedIndices = Array.from(
    new Set([
      ...(outgoingIndex === null ? [] : [outgoingIndex]),
      activeIndex,
      ...(reduceMotion || normalizedSlides.length === 1 ? [] : [nextIndex])
    ])
  );

  return (
    <div className="home-hero-media" aria-hidden="true">
      {renderedIndices.map((index) => {
        const slide = normalizedSlides[index];
        const isActive = index === activeIndex;
        const isOutgoing = index === outgoingIndex;
        const mobileSlideSource =
          index === 0
            ? slide.sources.w1200
            : normalizedMobileSlides.length > 0
              ? normalizedMobileSlides[index % normalizedMobileSlides.length]
              : slide.sources.w1200;

        return (
          <picture
            key={slide.id}
            className={`home-slide${isActive ? " is-active" : isOutgoing ? " is-exiting" : ""}`}
          >
            <source media="(max-width: 820px)" srcSet={mobileSlideSource} />
            <source media="(max-width: 1280px)" srcSet={slide.sources.w1200} />
            <img
              src={slide.sources.w1920}
              alt=""
              width={slide.width}
              height={slide.height}
              loading={isActive ? "eager" : "lazy"}
              fetchPriority={isActive && index === 0 ? "high" : "auto"}
              decoding="async"
            />
          </picture>
        );
      })}
    </div>
  );
};
