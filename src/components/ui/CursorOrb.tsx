"use client";

import { useEffect, useRef } from "react";

export default function CursorOrb() {
  const orbRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -300, y: -300 });
  const smoothRef = useRef({ x: -300, y: -300 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only enable on devices with a fine pointer (mouse/trackpad)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const loop = () => {
      const lerp = 0.08;
      smoothRef.current.x +=
        (posRef.current.x - smoothRef.current.x) * lerp;
      smoothRef.current.y +=
        (posRef.current.y - smoothRef.current.y) * lerp;

      if (orbRef.current) {
        orbRef.current.style.transform = `translate(${
          smoothRef.current.x - 150
        }px, ${smoothRef.current.y - 150}px)`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={orbRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(184,149,106,0.09) 0%, transparent 70%)",
        filter: "blur(40px)",
        pointerEvents: "none",
        zIndex: 0,
        willChange: "transform",
      }}
      aria-hidden="true"
    />
  );
}
