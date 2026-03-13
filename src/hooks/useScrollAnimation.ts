"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;   // 0–1, how much of element must be visible
  once?: boolean;       // trigger only once (default true)
  rootMargin?: string;  // e.g. "0px 0px -80px 0px"
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.15, once = true, rootMargin = "0px 0px -60px 0px" } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once, rootMargin]);

  return { ref, isVisible };
}

// ─── Helper to build animation className strings ───────────────────────────────
export function animClass(
  isVisible: boolean,
  animation: "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale-up",
  delay: number = 0
): string {
  const base = "transition-all duration-700 ease-out";
  const delayClass = delay > 0 ? `delay-[${delay}ms]` : "";

  const hidden: Record<string, string> = {
    "fade-up":    "opacity-0 translate-y-8",
    "fade-in":    "opacity-0",
    "fade-left":  "opacity-0 -translate-x-8",
    "fade-right": "opacity-0 translate-x-8",
    "scale-up":   "opacity-0 scale-95",
  };

  const visible = "opacity-100 translate-y-0 translate-x-0 scale-100";

  return `${base} ${delayClass} ${isVisible ? visible : hidden[animation]}`;
}