"use client";

import { Home, Layers, Sofa, UtensilsCrossed, Ruler, CheckCircle2 } from "lucide-react";
import { useScrollAnimation, animClass } from "@/hooks/useScrollAnimation";

const services = [
  {
    icon: Home,
    title: "2BHK Interiors",
    desc: "Complete interior solutions for 2-bedroom apartments — from modular kitchens to living spaces.",
    features: ["Modular Kitchen", "Master Bedroom", "Living & Dining", "Wardrobes"],
  },
  {
    icon: Layers,
    title: "3BHK Interiors",
    desc: "Comprehensive design and execution for spacious 3-bedroom homes with premium finishes.",
    features: ["All 3 Bedrooms", "2 Bathrooms", "Study Room", "Balcony Design"],
  },
  {
    icon: Home,
    title: "Villa Interiors",
    desc: "Luxury villa interior design spanning multiple floors with bespoke furniture and custom elements.",
    features: ["Full Home Design", "Custom Furniture", "Landscaping Input", "Premium Materials"],
  },
  {
    icon: Sofa,
    title: "Turnkey Execution",
    desc: "End-to-end delivery — we handle design, procurement, and execution so you don't have to.",
    features: ["Single Point of Contact", "On-time Delivery", "Quality Assurance", "Post-handover Support"],
  },
  {
    icon: UtensilsCrossed,
    title: "Modular Kitchens",
    desc: "Functional, beautiful kitchens with premium finishes, smart storage, and durable materials.",
    features: ["L / U / Parallel layouts", "Branded Hardware", "Quartz Countertops", "Smart Storage"],
  },
  {
    icon: Ruler,
    title: "Custom Furniture",
    desc: "Bespoke furniture crafted to fit your space perfectly — wardrobes, beds, TV units, and more.",
    features: ["100% Customised", "Factory Made", "ISI Certified Ply", "10 Year Warranty"],
  },
];

function ServiceCard({ service, idx }: { service: typeof services[0]; idx: number }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const Icon = service.icon;

  return (
    <div
      ref={ref}
      className={`group bg-white border border-cream-200 p-8 hover:border-cream-400 hover:shadow-card
                  transition-all duration-500 cursor-default
                  ${animClass(isVisible, "fade-up", idx * 80)}`}
      style={{ borderRadius: "2px" }}
    >
      <div className="w-10 h-10 border border-cream-300 group-hover:border-gold flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110">
        <Icon size={18} className="text-charcoal-muted group-hover:text-gold transition-colors duration-300" />
      </div>

      <p className="text-[10px] tracking-[0.2em] text-cream-400 uppercase mb-2">0{idx + 1}</p>

      <h3 className="font-display text-xl text-charcoal mb-3 group-hover:text-gold transition-colors duration-300">
        {service.title}
      </h3>

      <p className="text-sm text-charcoal-muted font-body font-light leading-relaxed mb-6">
        {service.desc}
      </p>

      <ul className="space-y-2">
        {service.features.map((f, fi) => (
          <li
            key={f}
            className="flex items-center gap-2 text-xs text-charcoal-light font-body translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
            style={{ transitionDelay: `${fi * 30}ms` }}
          >
            <CheckCircle2 size={12} className="text-gold shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-6 h-px bg-cream-200 relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-0 group-hover:w-full bg-gold transition-all duration-500 ease-out" />
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <section id="services" className="py-section bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="max-w-xl mb-14">
          <p className={`section-tag ${animClass(headerVisible, "fade-up", 0)}`}>What We Do</p>
          <h2 className={`font-display text-charcoal mb-4 ${animClass(headerVisible, "fade-up", 100)}`}>
            Interior Services Built Around Your Life
          </h2>
          <p className={`text-base text-charcoal-muted font-body font-light leading-relaxed ${animClass(headerVisible, "fade-up", 200)}`}>
            From compact 2BHK apartments to expansive villas — we design and deliver
            interiors that are beautiful, practical, and built to last.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <ServiceCard key={service.title} service={service} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}