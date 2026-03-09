"use client";

import { useEffect, useRef, useState } from "react";

type UseLazyFadeOptions = {
  threshold?: number;
  rootMargin?: string;
};

export const useLazyFade = ({
  threshold = 0.15,
  rootMargin = "0px 0px -60px 0px"
}: UseLazyFadeOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

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

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible };
};
