"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Our Work",  href: "#portfolio" },
  { label: "Services",  href: "#services"  },
  { label: "Process",   href: "#process"   },
  { label: "About",     href: "#about"     },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-cream-100/95 backdrop-blur-md border-b border-cream-300 py-2 shadow-soft"
            : "bg-transparent py-4"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-transparent.png"
              alt="Livion Interiors"
              width={180}
              height={72}
              className="h-14 w-auto object-contain sm:h-16"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs tracking-[0.15em] uppercase text-charcoal-light font-body hover:text-gold transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+91XXXXXXXXXX"
              className="flex items-center gap-2 text-xs text-charcoal-muted hover:text-charcoal transition-colors duration-200"
            >
              <Phone size={13} />
              <span className="tracking-wide">+91 XXXX XXX XXX</span>
            </a>
            <a href="#contact" className="btn-primary text-xs py-3 px-6">
              Free Consultation
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 text-charcoal hover:text-gold transition-colors"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-cream-100 flex flex-col justify-center px-8 transition-all duration-400",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Logo inside mobile menu */}
        <div className="absolute top-4 left-4 sm:left-6">
          <Image
            src="/images/logo-transparent.png"
            alt="Livion Interiors"
            width={150}
            height={60}
            className="h-14 w-auto object-contain"
          />
        </div>

        <ul className="space-y-6 mb-12">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
              className={cn(
                "transition-all duration-300",
                menuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
              )}
            >
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-4xl text-charcoal hover:text-gold transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="divider-line mb-8" />

        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          className="btn-primary self-start"
        >
          Free Consultation
        </a>

        <a
          href="tel:+91XXXXXXXXXX"
          className="flex items-center gap-2 mt-4 text-sm text-charcoal-muted"
        >
          <Phone size={14} />
          +91 XXXX XXX XXX
        </a>
      </div>
    </>
  );
}