"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Globe, LogOut, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingNav() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleGoToWebsite = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/");
  };

  return (
    <>
      {/* Backdrop — click outside to close */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Dock */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex items-stretch">

        {/* Sliding panel */}
        <div
          className={cn(
            "bg-charcoal flex flex-col justify-between overflow-hidden transition-all duration-300 ease-in-out shadow-2xl",
            open ? "w-44 opacity-100" : "w-0 opacity-0"
          )}
        >
          <div className="px-5 pt-6 pb-5 flex flex-col gap-0.5 min-w-[176px]">

            {/* Brand */}
            <div className="mb-5">
              <p className="font-display text-sm text-cream-100 leading-none tracking-wider">LIVION</p>
              <p className="text-[8px] tracking-[0.25em] uppercase text-charcoal-muted mt-0.5">CRM Dashboard</p>
            </div>

            {/* Nav items */}
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="group flex items-center gap-2.5 py-2.5 text-xs text-cream-400 hover:text-gold transition-colors font-body"
            >
              <LayoutDashboard size={12} className="shrink-0 group-hover:text-gold transition-colors" />
              Admin Panel
            </Link>

            <div className="h-px bg-charcoal-light my-2" />

            {/* Website + sign out */}
            <button
              onClick={handleGoToWebsite}
              className="group flex items-center gap-2.5 py-2.5 text-xs text-cream-400 hover:text-gold transition-colors font-body text-left w-full"
            >
              <Globe size={12} className="shrink-0 group-hover:text-gold transition-colors" />
              Go to Website
            </button>

            <button
              onClick={async () => {
                await fetch("/api/admin/login", { method: "DELETE" });
                router.push("/admin/login");
              }}
              className="group flex items-center gap-2.5 py-2.5 text-xs text-cream-400 hover:text-red-400 transition-colors font-body text-left w-full"
            >
              <LogOut size={12} className="shrink-0 group-hover:text-red-400 transition-colors" />
              Sign Out
            </button>
          </div>

          {/* Bottom accent line */}
          <div className="h-0.5 bg-gold/30 mx-5 mb-5" />
        </div>

        {/* Trigger tab — always visible */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Open navigation"
          className={cn(
            "flex flex-col items-center justify-center gap-1.5 w-7 transition-colors duration-200 shadow-xl",
            "bg-charcoal hover:bg-charcoal-light border-l border-charcoal-light/30",
            open ? "rounded-r-none" : ""
          )}
          style={{ minHeight: "88px", borderRadius: "0 2px 2px 0" }}
        >
          {/* Three tiny gold dots — Livion "monogram" motif */}
          <ChevronRight
            size={12}
            className={cn(
              "text-cream-400 transition-transform duration-300",
              open ? "rotate-180 text-gold" : ""
            )}
          />
          <div className="flex flex-col gap-[3px]">
            <span className="block w-[3px] h-[3px] rounded-full bg-gold/60" />
            <span className="block w-[3px] h-[3px] rounded-full bg-gold/40" />
            <span className="block w-[3px] h-[3px] rounded-full bg-gold/20" />
          </div>
        </button>
      </div>
    </>
  );
}
