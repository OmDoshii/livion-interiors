"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { useScrollAnimation, animClass } from "@/hooks/useScrollAnimation";

interface Review {
  id: string; name: string; location: string; text: string;
  rating: number; image_url: string | null; initials: string;
}

const stats = [
  { value: "200+",  label: "Happy Families"    },
  { value: "8+",    label: "Years in Business" },
  { value: "4.9/5", label: "Google Rating"     },
  { value: "100%",  label: "Turnkey Projects"  },
];

function FlipCard({ t, idx, isVisible }: { t: Review; idx: number; isVisible: boolean }) {
  const [flipped, setFlipped] = useState(false);
  const isDark = idx === 1;

  return (
    <div
      className={`transition-all duration-700 ease-out
                  ${animClass(isVisible, idx === 0 ? "fade-left" : idx === 2 ? "fade-right" : "fade-up", idx * 120)}`}
      style={{ perspective: "1200px", minHeight: "340px" }}
    >
      <div
        className="relative w-full h-full cursor-pointer select-none"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          minHeight: "340px",
        }}
        onClick={() => setFlipped(!flipped)}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        role="button"
        aria-label={`${flipped ? "Hide" : "Show"} photo for ${t.name}`}
      >
        {/* FRONT */}
        <div
          className={`absolute inset-0 p-8 border flex flex-col justify-between
                       ${isDark ? "bg-charcoal border-charcoal" : "bg-white border-cream-200"}`}
          style={{ backfaceVisibility: "hidden", borderRadius: "2px" }}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-0.5">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={12} fill="#B8956A" className="text-gold" />
                ))}
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-body font-medium border-2
                               ${isDark ? "border-gold/40 text-gold bg-gold/10" : "border-cream-400 text-charcoal-muted bg-cream-100"}`}>
                {t.initials}
              </div>
            </div>
            <p className={`text-sm leading-relaxed font-body font-light mb-6
                           ${isDark ? "text-cream-300" : "text-charcoal-light"}`}>
              &ldquo;{t.text}&rdquo;
            </p>
          </div>
          <div>
            <div className={`h-px mb-4 ${isDark ? "bg-charcoal-light" : "bg-cream-200"}`} />
            <div className="flex items-end justify-between">
              <div>
                <p className={`font-display text-lg ${isDark ? "text-cream-100" : "text-charcoal"}`}>{t.name}</p>
                <p className={`text-xs tracking-wide ${isDark ? "text-gold" : "text-charcoal-muted"}`}>{t.location}</p>
              </div>
              <p className={`text-[10px] tracking-[0.1em] uppercase ${isDark ? "text-charcoal-light" : "text-cream-400"}`}>
                {t.image_url ? "Tap for photo →" : ""}
              </p>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", borderRadius: "2px" }}
        >
          <div className="relative w-full h-full min-h-[340px] bg-cream-300">
            {t.image_url ? (
              <Image
                src={t.image_url}
                alt={t.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-cream-200">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-charcoal flex items-center justify-center text-xl font-display text-cream-100 mx-auto mb-2">
                    {t.initials}
                  </div>
                  <p className="text-xs text-cream-400">No photo added</p>
                </div>
              </div>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/90 to-transparent p-6">
            <p className="font-display text-xl text-cream-100">{t.name}</p>
            <p className="text-xs text-gold tracking-wide mt-0.5">{t.location}</p>
            <div className="flex gap-0.5 mt-2">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} size={10} fill="#B8956A" className="text-gold" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef,  isVisible: cardsVisible  } = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    fetch("/api/admin/reviews")
      .then((r) => r.json())
      .then((d) => { if (d.success) setReviews(d.data); })
      .catch(console.error);
  }, []);

  return (
    <section className="py-section bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center max-w-lg mx-auto mb-14">
          <p className={`section-tag ${animClass(headerVisible, "fade-up", 0)}`}>Client Stories</p>
          <h2 className={`font-display text-charcoal ${animClass(headerVisible, "fade-up", 100)}`}>
            Homes They Love. Words They Share.
          </h2>
          <p className={`text-sm text-charcoal-muted font-body font-light mt-3 ${animClass(headerVisible, "fade-up", 180)}`}>
            Hover or tap a card to see the client
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.length === 0 ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="h-80 bg-cream-200 animate-pulse" style={{ borderRadius: "2px" }} />
            ))
          ) : (
            reviews.map((t, idx) => (
              <FlipCard key={t.id} t={t} idx={idx} isVisible={cardsVisible} />
            ))
          )}
        </div>

        <div className="mt-14 pt-10 border-t border-cream-300 flex flex-wrap justify-center gap-10">
          {stats.map((stat, idx) => {
            const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
            return (
              <div key={stat.label} ref={ref} className={`text-center ${animClass(isVisible, "fade-up", idx * 100)}`}>
                <p className="font-display text-3xl text-charcoal">{stat.value}</p>
                <p className="text-xs text-charcoal-muted tracking-wide font-body mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
