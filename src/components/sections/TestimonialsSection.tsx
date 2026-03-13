"use client";

import { Quote, Star } from "lucide-react";
import { useScrollAnimation, animClass } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    name:     "Priya & Rahul Sharma",
    location: "3BHK · Gachibowli",
    text:     "Livion transformed our bare apartment into a home we love. The team was professional, the designs were stunning, and delivery was on time. Best decision we made.",
    rating: 5,
  },
  {
    name:     "Vikram Reddy",
    location: "Villa · Jubilee Hills",
    text:     "I was impressed by how well they understood our lifestyle and translated it into the design. Every corner of our villa feels intentional and luxurious.",
    rating: 5,
  },
  {
    name:     "Anita Mehta",
    location: "2BHK · Kondapur",
    text:     "The cost estimator tool gave me confidence before committing. The actual execution exceeded the 3D renders. Very happy with the modular kitchen especially!",
    rating: 5,
  },
];

const stats = [
  { value: "200+", label: "Happy Families"    },
  { value: "8+",   label: "Years in Business" },
  { value: "4.9/5",label: "Google Rating"     },
  { value: "100%", label: "Turnkey Projects"  },
];

function StatCounter({ stat, idx }: { stat: typeof stats[0]; idx: number }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  return (
    <div ref={ref} className={`text-center ${animClass(isVisible, "fade-up", idx * 100)}`}>
      <p className="font-display text-3xl text-charcoal">{stat.value}</p>
      <p className="text-xs text-charcoal-muted tracking-wide font-body mt-1">{stat.label}</p>
    </div>
  );
}

export default function TestimonialsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <section className="py-section bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="text-center max-w-lg mx-auto mb-14">
          <p className={`section-tag ${animClass(headerVisible, "fade-up", 0)}`}>Client Stories</p>
          <h2 className={`font-display text-charcoal ${animClass(headerVisible, "fade-up", 100)}`}>
            Homes They Love. Words They Share.
          </h2>
        </div>

        {/* Cards — alternating directions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => {
            const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
            const anim = idx === 0 ? "fade-left" : idx === 2 ? "fade-right" : "fade-up";
            return (
              <div
                key={t.name}
                ref={ref}
                className={`p-8 border border-cream-200 group
                            hover:-translate-y-1 hover:shadow-lifted transition-all duration-400
                            ${idx === 1 ? "bg-charcoal text-cream-100 border-charcoal" : "bg-white"}
                            ${animClass(isVisible, anim, idx * 120)}`}
                style={{ borderRadius: "2px" }}
              >
                {/* Animated quote icon */}
                <Quote
                  size={24}
                  className={`mb-6 transition-all duration-300 group-hover:scale-110 group-hover:text-gold
                              ${idx === 1 ? "text-gold" : "text-cream-400"}`}
                />

                {/* Stars with stagger */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      fill="#B8956A"
                      className="text-gold"
                      style={{
                        animationDelay: `${i * 80}ms`,
                        opacity: isVisible ? 1 : 0,
                        transition: `opacity 0.4s ease ${i * 80 + 300}ms`,
                      }}
                    />
                  ))}
                </div>

                <p className={`text-sm leading-relaxed font-body font-light mb-6
                               ${idx === 1 ? "text-cream-300" : "text-charcoal-light"}`}>
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className={`h-px mb-5 ${idx === 1 ? "bg-charcoal-light" : "bg-cream-200"}`} />

                <div>
                  <p className={`font-display text-lg ${idx === 1 ? "text-cream-100" : "text-charcoal"}`}>
                    {t.name}
                  </p>
                  <p className={`text-xs tracking-wide ${idx === 1 ? "text-gold" : "text-charcoal-muted"}`}>
                    {t.location}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Animated stats */}
        <div className="mt-14 pt-10 border-t border-cream-300 flex flex-wrap justify-center gap-10">
          {stats.map((stat, idx) => (
            <StatCounter key={stat.label} stat={stat} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}