"use client";
 
import Image from "next/image";
import { useScrollAnimation, animClass } from "@/hooks/useScrollAnimation";
import { Award, GraduationCap, Quote } from "lucide-react";
 
const highlights = [
  { icon: GraduationCap, label: "B.Arch", sub: "GITAM University, Hyderabad" },
  { icon: Award,         label: "2+ Years",  sub: "Hands-on Interior Projects"  },
];
 
export default function FounderSection() {
  const { ref: imgRef,  isVisible: imgVisible  } = useScrollAnimation({ threshold: 0.15 });
  const { ref: txtRef,  isVisible: txtVisible  } = useScrollAnimation({ threshold: 0.15 });
 
  return (
    <section id="about" className="py-section bg-cream-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
 
          {/* ── Left — Photo block ─────────────────────────── */}
          <div
            ref={imgRef}
            className={`relative ${animClass(imgVisible, "fade-left", 0)}`}
          >
            {/* Decorative background rectangle */}
            <div
              className={`absolute -top-4 -left-4 w-full h-full border border-cream-400 transition-all duration-1000
                           ${imgVisible ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 translate-x-4 translate-y-4"}`}
              style={{ transitionDelay: "300ms", borderRadius: "2px" }}
            />
 
            {/* Gold fill block behind image */}
            <div
              className={`absolute -bottom-4 -right-4 w-32 h-32 bg-gold/15 transition-all duration-1000
                           ${imgVisible ? "opacity-100" : "opacity-0"}`}
              style={{ transitionDelay: "400ms", borderRadius: "2px" }}
            />
 
            {/* Photo */}
            <div className="relative overflow-hidden" style={{ borderRadius: "2px", aspectRatio: "4/5" }}>
              <Image
                src="/images/founder.png"
                alt="Ar. Nimitesh Chaturvedi — Founder, Livion Interiors"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {/* Subtle warm overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
            </div>
 
            {/* Floating name card */}
            <div
              className={`absolute -bottom-6 left-6 bg-white border border-cream-200 px-6 py-4 shadow-lifted
                           transition-all duration-700
                           ${imgVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "500ms", borderRadius: "2px" }}
            >
              <p className="font-display text-xl text-charcoal leading-tight">Ar. Nimitesh Chaturvedi</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-gold mt-1">Founder — Livion Interiors</p>
            </div>
          </div>
 
          {/* ── Right — Text block ─────────────────────────── */}
          <div
            ref={txtRef}
            className={`pt-8 lg:pt-0 ${animClass(txtVisible, "fade-right", 0)}`}
          >
            {/* Tag */}
            <p className={`section-tag ${animClass(txtVisible, "fade-up", 0)}`}>
              Meet the Founder
            </p>
 
            {/* Headline */}
            <h2
              className={`font-display text-charcoal mb-6 ${animClass(txtVisible, "fade-up", 80)}`}
            >
              Designing with Clarity.<br />
              <span className="text-gold italic">Executing with Precision.</span>
            </h2>
 
            {/* Bio paragraphs */}
            <div className="space-y-4 mb-8">
              {[
                "Ar. Nimitesh Chaturvedi is the founder of Livion Interiors, specialising in residential interior design and execution. With 2 years of hands-on experience, he focuses on delivering practical, budget-conscious, and well-executed spaces.",
                "A graduate of GITAM University, Hyderabad (Bachelor of Architecture), his approach combines design understanding with on-site execution, material knowledge, and client coordination.",
                "At Livion Interiors, every project is handled with attention to detail, clear communication, and a strong focus on delivering what is designed without unnecessary complications.",
              ].map((para, i) => (
                <p
                  key={i}
                  className={`text-base text-charcoal-muted font-body font-light leading-relaxed
                               transition-all duration-700 ease-out
                               ${txtVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${160 + i * 80}ms` }}
                >
                  {para}
                </p>
              ))}
            </div>
 
            {/* Highlights row */}
            <div
              className={`flex gap-8 mb-8 pb-8 border-b border-cream-300
                           transition-all duration-700 ease-out
                           ${txtVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "420ms" }}
            >
              {highlights.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-start gap-3 group">
                  <div className="w-9 h-9 border border-cream-400 group-hover:border-gold flex items-center justify-center shrink-0 transition-colors duration-300">
                    <Icon size={15} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-display text-lg text-charcoal leading-tight">{label}</p>
                    <p className="text-xs text-charcoal-muted font-body">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
 
            {/* Quote */}
            <div
              className={`flex gap-4 items-start transition-all duration-700 ease-out
                           ${txtVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "500ms" }}
            >
              <Quote size={20} className="text-gold shrink-0 mt-1" />
              <p className="font-display text-xl text-charcoal-light italic leading-snug">
                &ldquo;Every space we design is a reflection of the people who live in it.&rdquo;
              </p>
            </div>
          </div>
 
        </div>
      </div>
    </section>
  );
}
 