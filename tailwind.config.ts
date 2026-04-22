import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Livion Brand Palette
        cream: {
          50:  "#FFFFFF",
          100: "#F9F8F6",  // lightest — page background
          200: "#EFE9E3",  // subtle sections
          300: "#D9CFC7",  // borders, dividers
          400: "#C9B59C",  // primary accent / warm tan
        },
        charcoal: {
          DEFAULT: "#2C2825",
          light:   "#4A4441",
          muted:   "#7A736E",
        },
        gold: {
          DEFAULT: "#B8956A",
          light:   "#D4B48C",
          dark:    "#8B6F4E",
        },
      },
      fontFamily: {
        display: ["'Raleway'", "sans-serif"],
        body:    ["'DM Sans'", "sans-serif"],
        accent:  ["'Raleway'", "sans-serif"],
      },
      fontSize: {
        "hero":  ["clamp(3rem, 7vw, 6rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "title": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.1",  letterSpacing: "-0.015em" }],
        "sub":   ["clamp(1.1rem, 2vw, 1.35rem)", { lineHeight: "1.5" }],
      },
      spacing: {
        "section": "7rem",
        "section-sm": "4rem",
      },
      borderRadius: {
        "brand": "2px",
        "card":  "8px",
      },
      boxShadow: {
        "soft":   "0 4px 32px rgba(44, 40, 37, 0.08)",
        "card":   "0 2px 16px rgba(44, 40, 37, 0.06)",
        "lifted": "0 12px 48px rgba(44, 40, 37, 0.14)",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        "fade-up":            "fadeUp 0.7s ease forwards",
        "fade-in":            "fadeIn 0.5s ease forwards",
        "line-grow":          "lineGrow 0.8s ease forwards",
        "float":              "floatY 4s ease-in-out infinite",
        "marquee":            "marquee 28s linear infinite",
        "preloader-progress": "preloaderProgress 2.2s linear forwards",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        lineGrow: {
          "0%":   { width: "0%" },
          "100%": { width: "100%" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        preloaderProgress: {
          "0%":   { width: "0%" },
          "100%": { width: "100%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
