import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, MessageCircle, Phone, ArrowRight } from "lucide-react";

export default function ThankYouPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream-100 flex items-center justify-center px-4 py-32">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-cream-200 border border-cream-400 flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={28} className="text-gold" />
          </div>

          <p className="section-tag">Enquiry Received</p>
          <h1 className="font-display text-4xl text-charcoal mb-4">
            Thank You!
          </h1>
          <p className="text-base text-charcoal-muted font-body font-300 leading-relaxed mb-8">
            We&apos;ve received your details and will get in touch within 2 hours.
            Our design consultant will reach you on WhatsApp or phone.
          </p>

          <div className="bg-cream-200 border border-cream-300 p-6 mb-8 text-left">
            <p className="text-xs tracking-[0.15em] uppercase text-charcoal-muted font-body mb-3">
              What happens next
            </p>
            <ul className="space-y-3">
              {[
                "You'll receive a WhatsApp message from our team",
                "Our consultant will call to understand your vision",
                "We'll schedule a free site visit at your convenience",
              ].map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-charcoal font-body font-300">
                  <span className="w-5 h-5 bg-charcoal text-cream-100 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/917995758720"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 text-sm font-body hover:bg-[#1ebe5d] transition-colors"
              style={{ borderRadius: "2px" }}
            >
              <MessageCircle size={15} />
              Chat on WhatsApp
            </a>
            <a href="tel:+91XXXXXXXXXX" className="btn-outline inline-flex items-center gap-2 text-sm py-3">
              <Phone size={14} />
              Call Us Now
            </a>
          </div>

          <div className="mt-8">
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-1.5 text-xs text-charcoal-muted hover:text-gold transition-colors font-body"
            >
              Browse our portfolio while you wait
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
