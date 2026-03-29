"use client";

import { useEffect, useState } from "react";

const LETTERS = ["L", "I", "V", "I", "O", "N"];

type Phase = "loading" | "animate" | "exiting" | "done";

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [lettersIn, setLettersIn] = useState(false);
  const [subtitleIn, setSubtitleIn] = useState(false);
  const [separatorIn, setSeparatorIn] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock scroll while preloader is active
    document.body.style.overflow = "hidden";

    // Stagger the entrance animations
    const t1 = setTimeout(() => setLettersIn(true), 80);
    const t2 = setTimeout(() => setSeparatorIn(true), 620);
    const t3 = setTimeout(() => setSubtitleIn(true), 780);

    // Progress bar: increments to 100 over ~2s
    let pct = 0;
    const interval = setInterval(() => {
      pct += 1;
      setProgress(pct);
      if (pct >= 100) clearInterval(interval);
    }, 21); // ~100 steps × 21ms ≈ 2100ms

    // Begin exit
    const tExit = setTimeout(() => {
      window.dispatchEvent(new CustomEvent("preloader-exit"));
      setPhase("exiting");
      document.body.style.overflow = "";
    }, 2300);

    // Remove from DOM after slide-up completes
    const tDone = setTimeout(() => setPhase("done"), 3050);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tExit);
      clearTimeout(tDone);
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  const isExiting = phase === "exiting";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#F9F8F6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: isExiting ? "translateY(-100%)" : "translateY(0)",
        transition: isExiting
          ? "transform 0.75s cubic-bezier(0.76, 0, 0.24, 1)"
          : "none",
      }}
      aria-hidden="true"
    >
      {/* Ambient radial gradient — top right */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle at 70% 30%, rgba(184,149,106,0.14) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Vertical accent lines — left side */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "10%",
          display: "flex",
          gap: "12px",
          opacity: lettersIn ? 0.5 : 0,
          transition: "opacity 1s ease 0.8s",
        }}
      >
        <div
          style={{
            width: "1px",
            backgroundColor: "#C9B59C",
            height: lettersIn ? "80px" : "0px",
            transition: "height 0.9s ease 0.7s",
          }}
        />
        <div
          style={{
            width: "1px",
            backgroundColor: "#D9CFC7",
            height: lettersIn ? "52px" : "0px",
            transition: "height 0.9s ease 0.9s",
          }}
        />
      </div>

      {/* Vertical accent lines — right side */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          display: "flex",
          gap: "12px",
          opacity: lettersIn ? 0.5 : 0,
          transition: "opacity 1s ease 1s",
        }}
      >
        <div
          style={{
            width: "1px",
            backgroundColor: "#D9CFC7",
            height: lettersIn ? "52px" : "0px",
            transition: "height 0.9s ease 0.9s",
          }}
        />
        <div
          style={{
            width: "1px",
            backgroundColor: "#C9B59C",
            height: lettersIn ? "80px" : "0px",
            transition: "height 0.9s ease 1.1s",
          }}
        />
      </div>

      {/* Core content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Brand letters */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              style={{ overflow: "hidden", display: "inline-block" }}
            >
              <span
                style={{
                  display: "inline-block",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(3rem, 8vw, 6rem)",
                  fontWeight: 300,
                  lineHeight: 1,
                  color: "#2C2825",
                  letterSpacing: "0.1em",
                  transform: lettersIn
                    ? "translateY(0)"
                    : "translateY(110%)",
                  transition: `transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${i * 70}ms`,
                }}
              >
                {letter}
              </span>
            </span>
          ))}
        </div>

        {/* Gold separator */}
        <div
          style={{
            height: "1px",
            width: "56px",
            backgroundColor: "#B8956A",
            transformOrigin: "center",
            transform: separatorIn ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
            marginBottom: "14px",
          }}
        />

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "10px",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "#7A736E",
            opacity: subtitleIn ? 1 : 0,
            transform: subtitleIn ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          Interiors
        </p>
      </div>

      {/* Progress bar at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1.5px",
          backgroundColor: "#EFE9E3",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#B8956A",
            width: `${progress}%`,
            transition: "width 80ms linear",
          }}
        />
      </div>

      {/* Loading label */}
      <div
        style={{
          position: "absolute",
          bottom: "24px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          opacity: lettersIn ? 1 : 0,
          transition: "opacity 0.6s ease 1s",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "9px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#C9B59C",
          }}
        >
          Loading
        </span>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "9px",
            letterSpacing: "0.15em",
            color: "#B8956A",
          }}
        >
          {progress}%
        </span>
      </div>
    </div>
  );
}
