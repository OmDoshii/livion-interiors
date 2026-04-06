"use client";

import React from "react";
import { useScrollAnimation, animClass } from "@/hooks/useScrollAnimation";

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale-up";
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function AnimatedSection({
  children,
  animation = "fade-up",
  delay = 0,
  className = "",
  as: Tag = "div",
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation();

  const props = {
    ref,
    className: `${animClass(isVisible, animation, delay)} ${className}`,
  };

  return React.createElement(Tag, props, children);
}