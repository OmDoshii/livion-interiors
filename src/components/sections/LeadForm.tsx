"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2, Send, Phone, MapPin, Home, Calendar, Wallet, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LeadFormData } from "@/types";

// ─── Validation Schema ─────────────────────────────────────────────────────────
const schema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name too long"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  projectLocation: z
    .string()
    .min(3, "Please enter your project location")
    .max(100),
  flatSize: z.enum(["1BHK", "2BHK", "3BHK", "4BHK", "Villa", "Duplex"], {
    errorMap: () => ({ message: "Please select your flat type" }),
  }),
  possessionDate: z.string().min(1, "Please select your possession timeframe"),
  budgetRange: z.enum(
    [
      "Under ₹5 Lakhs",
      "₹5–10 Lakhs",
      "₹10–15 Lakhs",
      "₹15–20 Lakhs",
      "₹20–30 Lakhs",
      "Above ₹30 Lakhs",
    ],
    { errorMap: () => ({ message: "Please select your budget range" }) }
  ),
  message: z.string().max(300).optional(),
});

type FormValues = z.infer<typeof schema>;

const flatSizeOptions = ["1BHK", "2BHK", "3BHK", "4BHK", "Villa", "Duplex"] as const;
const budgetOptions   = [
  "Under ₹5 Lakhs",
  "₹5–10 Lakhs",
  "₹10–15 Lakhs",
  "₹15–20 Lakhs",
  "₹20–30 Lakhs",
  "Above ₹30 Lakhs",
] as const;
const possessionOptions = [
  "Already have possession",
  "Within 3 months",
  "3–6 months",
  "6–12 months",
  "12+ months",
];

// ─── Field wrapper ─────────────────────────────────────────────────────────────
function FieldWrapper({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] tracking-[0.15em] uppercase text-charcoal-muted font-body">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500 font-body">{error}</p>
      )}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const selectedSize = watch("flatSize");

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success State ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="text-center py-12 px-6">
        <div className="w-16 h-16 bg-cream-200 border border-cream-400 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={28} className="text-gold" />
        </div>
        <h3 className="font-display text-3xl text-charcoal mb-3">
          We&apos;ve Received Your Enquiry!
        </h3>
        <p className="text-charcoal-muted font-body font-300 max-w-sm mx-auto mb-6">
          Our design consultant will reach out to you within 2 hours on WhatsApp. Keep an eye on your messages!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="https://wa.me/917995758720" className="btn-gold text-sm py-3 px-6">
            Chat on WhatsApp
          </a>
          <a href="#portfolio" className="btn-outline text-sm py-3 px-6">
            View Our Work
          </a>
        </div>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

      {/* Row 1: Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FieldWrapper label="Full Name *" error={errors.name?.message}>
          <div className="relative">
            <input
              {...register("name")}
              placeholder="e.g. Rahul Sharma"
              className={cn("input-field pl-10", errors.name && "border-red-400")}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-muted pointer-events-none">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
            </span>
          </div>
        </FieldWrapper>

        <FieldWrapper label="Phone Number *" error={errors.phone?.message}>
          <div className="relative">
            <input
              {...register("phone")}
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="10-digit mobile number"
              className={cn("input-field pl-10", errors.phone && "border-red-400")}
            />
            <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-muted pointer-events-none" />
          </div>
        </FieldWrapper>
      </div>

      {/* Row 2: Location */}
      <FieldWrapper label="Project Location *" error={errors.projectLocation?.message}>
        <div className="relative">
          <input
            {...register("projectLocation")}
            placeholder="e.g. Gachibowli, Hyderabad"
            className={cn("input-field pl-10", errors.projectLocation && "border-red-400")}
          />
          <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-muted pointer-events-none" />
        </div>
      </FieldWrapper>

      {/* Row 3: Flat Type */}
      <FieldWrapper label="Flat / Home Type *" error={errors.flatSize?.message}>
        <div className="grid grid-cols-3 gap-2">
          {flatSizeOptions.map((size) => (
            <label
              key={size}
              className={cn(
                "relative flex items-center justify-center py-3 px-2 border text-xs font-body cursor-pointer transition-all duration-200 text-center",
                selectedSize === size
                  ? "border-gold bg-gold/5 text-charcoal"
                  : "border-cream-300 text-charcoal-muted hover:border-cream-400"
              )}
              style={{ borderRadius: "2px" }}
            >
              <input
                {...register("flatSize")}
                type="radio"
                value={size}
                className="sr-only"
              />
              <Home size={11} className="mr-1.5 shrink-0" />
              {size}
            </label>
          ))}
        </div>
      </FieldWrapper>

      {/* Row 4: Possession + Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FieldWrapper label="Possession Date *" error={errors.possessionDate?.message}>
          <div className="relative">
            <select
              {...register("possessionDate")}
              className={cn("input-field pl-10 appearance-none cursor-pointer", errors.possessionDate && "border-red-400")}
            >
              <option value="">Select timeframe</option>
              {possessionOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-muted pointer-events-none" />
          </div>
        </FieldWrapper>

        <FieldWrapper label="Budget Range *" error={errors.budgetRange?.message}>
          <div className="relative">
            <select
              {...register("budgetRange")}
              className={cn("input-field pl-10 appearance-none cursor-pointer", errors.budgetRange && "border-red-400")}
            >
              <option value="">Select budget</option>
              {budgetOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <Wallet size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-muted pointer-events-none" />
          </div>
        </FieldWrapper>
      </div>

      {/* Row 5: Message (optional) */}
      <FieldWrapper label="Additional Notes (Optional)" error={errors.message?.message}>
        <div className="relative">
          <textarea
            {...register("message")}
            rows={3}
            placeholder="Any specific requirements, inspiration, or questions..."
            className="input-field pl-10 resize-none"
          />
          <MessageSquare size={14} className="absolute left-3 top-3.5 text-charcoal-muted pointer-events-none" />
        </div>
      </FieldWrapper>

      {/* Server Error */}
      {serverError && (
        <div className="bg-red-50 border border-red-200 px-4 py-3">
          <p className="text-sm text-red-600">{serverError}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="btn-gold w-full justify-center text-sm py-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            <Send size={16} />
            Get Free Consultation
          </>
        )}
      </button>

      <p className="text-[11px] text-center text-charcoal-muted font-body">
        By submitting, you consent to being contacted via WhatsApp &amp; phone. No spam, ever.
      </p>
    </form>
  );
}
