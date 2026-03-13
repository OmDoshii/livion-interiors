"use client";

import LeadForm from "./LeadForm";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { useScrollAnimation, animClass } from "@/hooks/useScrollAnimation";

const contactDetails = [
  { icon: Phone,   label: "Call / WhatsApp", value: "+91 XXXX XXX XXX",          href: "tel:+91XXXXXXXXXX"                },
  { icon: Mail,    label: "Email",            value: "hello@livioninteriors.com",  href: "mailto:hello@livioninteriors.com" },
  { icon: MapPin,  label: "Studio",           value: "Hyderabad, Telangana",       href: null                              },
  { icon: Clock,   label: "Working Hours",    value: "Mon – Sat, 9:00 AM – 7:00 PM", href: null                           },
];

export default function ContactSection() {
  const { ref: leftRef,  isVisible: leftVisible  } = useScrollAnimation({ threshold: 0.1 });
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="contact" className="py-section bg-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* Left Info */}
          <div ref={leftRef} className={`lg:col-span-2 ${animClass(leftVisible, "fade-left", 0)}`}>
            <p className="section-tag">Get In Touch</p>
            <h2 className="font-display text-charcoal mb-5">
              Let&apos;s Design Your Dream Home
            </h2>
            <p className="text-base text-charcoal-muted font-body font-light leading-relaxed mb-8">
              Fill in the form and our design consultant will reach out within
              2 hours — on WhatsApp or phone, whichever you prefer.
            </p>

            <ul className="space-y-5 mb-8">
              {contactDetails.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.label}
                    className={`flex gap-4 items-start transition-all duration-500
                                ${leftVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                    style={{ transitionDelay: `${200 + idx * 80}ms` }}
                  >
                    <div className="w-9 h-9 border border-cream-400 flex items-center justify-center shrink-0 mt-0.5
                                    hover:border-gold hover:bg-gold/5 transition-all duration-300">
                      <Icon size={14} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.15em] uppercase text-charcoal-muted mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-charcoal font-body text-sm hover:text-gold transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-charcoal font-body text-sm">{item.value}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            <a
              href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%27m%20interested%20in%20interior%20design%20for%20my%20home."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 text-sm font-body
                         hover:bg-[#1ebe5d] hover:gap-3 transition-all duration-300"
              style={{ borderRadius: "2px" }}
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Right Form */}
          <div
            ref={rightRef}
            className={`lg:col-span-3 bg-white border border-cream-200 p-6 sm:p-8 shadow-soft
                        ${animClass(rightVisible, "fade-right", 100)}`}
            style={{ borderRadius: "2px" }}
          >
            <div className="mb-7">
              <h3 className="font-display text-2xl text-charcoal mb-1">Free Consultation Request</h3>
              <p className="text-sm text-charcoal-muted font-body font-light">
                Takes less than 2 minutes · No commitment required
              </p>
            </div>
            <LeadForm />
          </div>

        </div>
      </div>
    </section>
  );
}