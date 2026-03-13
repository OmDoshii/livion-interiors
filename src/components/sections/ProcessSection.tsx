"use client";

import { useScrollAnimation, animClass } from "@/hooks/useScrollAnimation";

const steps = [
  { number: "01", title: "Free Consultation",     desc: "Share your requirements through our form or call. We understand your vision, budget, and timeline before anything else.", duration: "Day 1" },
  { number: "02", title: "Site Visit & Measurement", desc: "Our design consultant visits your home, takes precise measurements, and assesses the space for design possibilities.", duration: "Day 2–3" },
  { number: "03", title: "Design Presentation",   desc: "We present 2D layouts, 3D visualisations, and material samples — so you can see exactly what your home will look like.", duration: "Week 1–2" },
  { number: "04", title: "Quotation & Approval",  desc: "Detailed, transparent cost breakdown. No hidden charges. We finalise designs and materials together before execution begins.", duration: "Week 2" },
  { number: "05", title: "Execution & Delivery",  desc: "Our skilled craftsmen bring your design to life with factory-made furniture, quality materials, and professional installation.", duration: "6–10 Weeks" },
  { number: "06", title: "Handover & Support",    desc: "We do a detailed walkthrough, address any punch-list items, and provide post-handover support so you settle in comfortably.", duration: "Final Day" },
];

function StepCard({ step, idx }: { step: typeof steps[0]; idx: number }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`border-b border-r border-charcoal-light p-8 group cursor-default
                  hover:bg-charcoal-light/20 transition-colors duration-300
                  ${animClass(isVisible, "fade-up", idx * 80)}`}
      style={{
        borderRight:  (idx + 1) % 3 === 0 ? "none" : undefined,
        borderBottom: idx >= 3 ? "none" : undefined,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        {/* Number — counts up feel via scale */}
        <span className="font-display text-5xl text-charcoal-light group-hover:text-gold
                         transition-all duration-300 group-hover:scale-110 origin-left inline-block">
          {step.number}
        </span>
        <span className="text-[10px] tracking-[0.15em] uppercase text-gold border border-charcoal-light px-2 py-1
                         group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
          {step.duration}
        </span>
      </div>

      <h3 className="font-display text-xl text-cream-100 mb-3 group-hover:text-gold transition-colors duration-300">
        {step.title}
      </h3>
      <p className="text-sm text-cream-300 font-body font-light leading-relaxed">
        {step.desc}
      </p>

      {/* Progress line that grows on hover */}
      <div className="mt-6 h-px bg-charcoal-light relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-0 group-hover:w-full bg-gold
                        transition-all duration-600 ease-out" />
      </div>
    </div>
  );
}

export default function ProcessSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <section id="process" className="py-section bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div ref={headerRef} className="max-w-xl mb-14">
          <p className={`section-tag text-gold ${animClass(headerVisible, "fade-up", 0)}`}>How We Work</p>
          <h2 className={`font-display text-cream-100 ${animClass(headerVisible, "fade-up", 100)}`}>
            A Process Designed for Clarity
          </h2>
          <p className={`mt-4 text-base text-cream-300 font-body font-light leading-relaxed ${animClass(headerVisible, "fade-up", 200)}`}>
            From first conversation to final handover — every step is transparent,
            collaborative, and focused on your vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {steps.map((step, idx) => (
            <StepCard key={step.number} step={step} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}