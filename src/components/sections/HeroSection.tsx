"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, Star } from "lucide-react";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const anim = (delay: number) =>
    `transition-all duration-700 ease-out ${
      loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`;

  return (
    <section className="relative min-h-screen flex flex-col grain-overlay overflow-hidden bg-cream-100">

      {/* Ambient gold orb — top right */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 70% 30%, rgba(201,181,156,0.18) 0%, transparent 65%)",
          animation: "pulse 6s ease-in-out infinite",
        }}
      />

      {/* Subtle left accent lines */}
      <div className={`absolute top-36 left-8 sm:left-16 flex gap-3 transition-all duration-1000 delay-700
                       ${loaded ? "opacity-60" : "opacity-0"}`}>
        <div className="w-px bg-cream-400" style={{ height: loaded ? "96px" : "0px", transition: "height 0.8s ease 0.8s" }} />
        <div className="w-px bg-cream-300" style={{ height: loaded ? "64px" : "0px", transition: "height 0.8s ease 1s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-[70vh]">

          {/* Left — Text */}
          <div className="order-2 lg:order-1">

            {/* Tag */}
            <div className={`flex items-center gap-3 mb-6 ${anim(200)}`}
                 style={{ transitionDelay: "200ms" }}>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} fill="#B8956A" className="text-gold"
                        style={{ opacity: loaded ? 1 : 0, transition: `opacity 0.3s ease ${300 + i * 60}ms` }} />
                ))}
              </div>
              <span className="section-tag mb-0">Live Your Vision</span>
            </div>

            {/* Headline — word by word */}
            <h1 className="font-display text-charcoal mb-6">
              {["Your Home,", "Perfectly", "Designed."].map((word, wi) => (
                <span
                  key={word}
                  className={`block transition-all duration-700 ease-out
                               ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                               ${wi === 1 ? "text-gold italic" : ""}`}
                  style={{ transitionDelay: `${300 + wi * 120}ms` }}
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* Subtext */}
            <p className={`text-sub text-charcoal-light max-w-md mb-8 ${anim(0)}`}
               style={{ transitionDelay: "680ms" }}>
              Livion Interiors transforms 2BHK, 3BHK &amp; Villa spaces into
              beautiful, liveable homes — with turnkey execution across Hyderabad.
            </p>

            {/* Stats */}
            <div className="flex gap-8 mb-10">
              {[
                { value: "200+", label: "Projects Delivered"  },
                { value: "8+",   label: "Years Experience"    },
                { value: "98%",  label: "Client Satisfaction" },
              ].map((stat, si) => (
                <div
                  key={stat.label}
                  className={`transition-all duration-700 ease-out
                               ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${780 + si * 100}ms` }}
                >
                  <p className="font-display text-3xl text-charcoal">{stat.value}</p>
                  <p className="text-xs text-charcoal-muted tracking-wide font-body">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className={`flex flex-col sm:flex-row gap-4 ${anim(0)}`}
                 style={{ transitionDelay: "1000ms" }}>
              <a href="#contact"
                 className="btn-primary hover:gap-3 transition-all duration-300">
                Get Free Consultation
              </a>
              <a href="#portfolio" className="btn-outline">
                View Our Work
              </a>
            </div>
          </div>

          {/* Right — Image block */}
          <div className={`order-1 lg:order-2 relative transition-all duration-1000 ease-out
                           ${loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
               style={{ transitionDelay: "300ms" }}>
            <div className="relative">

              {/* Image container with subtle zoom on load */}
              <div
                className={`relative bg-cream-200 overflow-hidden transition-transform duration-1200 ease-out
                             ${loaded ? "scale-100" : "scale-105"}`}
                style={{ aspectRatio: "4/5", borderRadius: "2px" }}
              >
                <div className="absolute inset-0 flex items-center justify-center bg-cream-200">
                  <div className="text-center">
                    <div className="w-16 h-16 border border-cream-400 flex items-center justify-center mx-auto mb-4">
                      <span className="font-display text-2xl text-cream-400">L</span>
                    </div>
                    <p className="text-xs text-cream-400 tracking-widest uppercase">Hero Image</p>
                    <p className="text-xs text-cream-300 mt-1">1200 × 1500px recommended</p>
                  </div>
                </div>
              </div>

              {/* Floating card — bottom right */}
              <div
                className={`absolute -bottom-5 -right-4 bg-charcoal text-cream-100 p-4 shadow-lifted
                             hidden sm:block z-10 max-w-[200px]
                             transition-all duration-700 ease-out
                             ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: "900ms" }}
              >
                <p className="font-display text-lg font-light">2BHK to Villas</p>
                <p className="text-xs text-cream-400 tracking-wide mt-1">All residential sizes covered</p>
              </div>

              {/* Gold accent squares */}
              <div className={`absolute -top-4 -right-4 w-12 h-12 bg-gold opacity-25 hidden lg:block
                               transition-all duration-700 ${loaded ? "opacity-25 scale-100" : "opacity-0 scale-75"}`}
                   style={{ transitionDelay: "1100ms" }} />
              <div className={`absolute -top-2 -right-2 w-12 h-12 border border-cream-400 hidden lg:block
                               transition-all duration-700 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
                   style={{ transitionDelay: "1200ms" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`relative z-10 flex justify-center pb-8 transition-all duration-700
                       ${loaded ? "opacity-100" : "opacity-0"}`}
           style={{ transitionDelay: "1400ms" }}>
        <a href="#services" aria-label="Scroll down"
           className="flex flex-col items-center gap-2 text-charcoal-muted hover:text-gold transition-colors duration-200 group">
          <span className="text-[10px] tracking-[0.2em] uppercase">Explore</span>
          <ArrowDown size={16} className="animate-bounce" />
        </a>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.05); opacity: 0.8; }
        }
      `}</style>
    </section>
  );
}