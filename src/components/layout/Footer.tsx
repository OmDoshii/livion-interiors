import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";
 
export default function Footer() {
  const year = new Date().getFullYear();
 
  return (
    <footer className="bg-charcoal text-cream-200">
 
      {/* Top CTA Strip */}
      <div className="border-b border-charcoal-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="section-tag text-gold">Start Your Project</p>
            <h3 className="font-display text-3xl text-cream-100 font-light">
              Ready to design your dream home?
            </h3>
          </div>
          <a href="#contact" className="btn-gold whitespace-nowrap shrink-0">
            Get Free Consultation
          </a>
        </div>
      </div>
 
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
 
        {/* Brand — bigger logo */}
        <div className="lg:col-span-1">
          <div className="mb-5">
            <Image
              src="/images/logo-transparent1.png"
              alt="Livion Interiors"
              width={200}
              height={80}
              className="h-20 w-auto object-contain brightness-0 invert"
            />
          </div>
          <p className="text-sm text-cream-300 font-body font-light leading-relaxed mb-6">
            Premium residential interior design in Hyderabad. Crafting spaces that reflect your lifestyle.
          </p>
          <div className="flex gap-3">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
               aria-label="Instagram"
               className="w-9 h-9 border border-charcoal-light flex items-center justify-center text-cream-300 hover:border-gold hover:text-gold transition-all duration-200">
              <Instagram size={15} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
               aria-label="Facebook"
               className="w-9 h-9 border border-charcoal-light flex items-center justify-center text-cream-300 hover:border-gold hover:text-gold transition-all duration-200">
              <Facebook size={15} />
            </a>
          </div>
        </div>
 
        {/* Services */}
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-gold mb-5">Services</p>
          <ul className="space-y-3">
            {["2BHK Interior Design", "3BHK Interior Design", "Villa Interiors", "Turnkey Execution", "Kitchen Design", "Modular Furniture"].map((s) => (
              <li key={s}>
                <a href="#services" className="text-sm text-cream-300 hover:text-cream-100 transition-colors duration-200 font-body font-light">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
 
        {/* Quick Links */}
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-gold mb-5">Quick Links</p>
          <ul className="space-y-3">
            {[
              { label: "Our Portfolio",   href: "#portfolio" },
              { label: "Our Process",     href: "#process"   },
              { label: "About Founder",   href: "#about"     },
              { label: "Get a Quote",     href: "#contact"   },
              { label: "Admin Panel",  href: "/admin/login" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-cream-300 hover:text-cream-100 transition-colors duration-200 font-body font-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
 
        {/* Contact */}
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-gold mb-5">Contact</p>
          <ul className="space-y-4">
            <li className="flex gap-3 items-start">
              <MapPin size={14} className="text-gold mt-1 shrink-0" />
              <span className="text-sm text-cream-300 font-body font-light leading-relaxed">Hyderabad, Telangana, India</span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone size={14} className="text-gold shrink-0" />
              <a href="tel:+91XXXXXXXXXX" className="text-sm text-cream-300 hover:text-cream-100 transition-colors duration-200">
                +91 XXXX XXX XXX
              </a>
            </li>
            <li className="flex gap-3 items-center">
              <Mail size={14} className="text-gold shrink-0" />
              <a href="mailto:hello@livioninteriors.com" className="text-sm text-cream-300 hover:text-cream-100 transition-colors duration-200">
                hello@livioninteriors.com
              </a>
            </li>
          </ul>
        </div>
      </div>
 
      {/* Bottom Bar */}
      <div className="border-t border-charcoal-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-cream-400 font-body font-light">
            © {year} Livion Interiors. All rights reserved.
          </p>
          <p className="text-xs text-cream-400 font-body font-light">
            Hyderabad&apos;s Premium Residential Interior Studio
          </p>
        </div>
      </div>
    </footer>
  );
}