"use client";

import { useEffect, useRef, useState } from "react";

type UseLazyFadeOptions = {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
};

export const useLazyFade = ({
  threshold = 0.15,
  rootMargin = "0px 0px -60px 0px",
  delay = 0
}: UseLazyFadeOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const timeoutId = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(element);
          }
        },
        { threshold, rootMargin }
      );

      observer.observe(element);

      element.dataset.observer = "active";
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (element.dataset.observer === "active") {
        // cleanup handled by React unmount
      }
    };
  }, [threshold, rootMargin, delay]);

  return { ref, isVisible };
};
