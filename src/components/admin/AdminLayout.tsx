"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Star, Images, Users, LogOut, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin",           icon: LayoutDashboard, label: "Overview"   },
  { href: "/admin/reviews",   icon: Star,            label: "Reviews"    },
  { href: "/admin/portfolio", icon: Images,          label: "Portfolio"  },
  { href: "/dashboard",       icon: Users,           label: "Leads CRM"  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-cream-100 flex">

      {/* ── Sidebar ────────────────────────────────────── */}
      <aside className="w-56 bg-charcoal flex flex-col fixed inset-y-0 left-0 z-30">

        {/* Logo */}
        <div className="p-5 border-b border-charcoal-light">
          <Image
            src="/images/logo-transparent.png"
            alt="Livion Interiors"
            width={130}
            height={52}
            className="h-12 w-auto object-contain brightness-0 invert"
          />
          <p className="text-[9px] tracking-[0.2em] uppercase text-charcoal-muted mt-2">
            Admin Panel
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon    = item.icon;
            const active  = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 text-sm font-body transition-all duration-200",
                  active
                    ? "bg-gold/20 text-gold border-l-2 border-gold"
                    : "text-cream-300 hover:bg-charcoal-light/50 hover:text-cream-100 border-l-2 border-transparent"
                )}
                style={{ borderRadius: "2px" }}
              >
                <Icon size={15} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-charcoal-light space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 text-xs text-cream-400 hover:text-cream-100 transition-colors"
          >
            <ExternalLink size={13} />
            View Website
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-cream-400 hover:text-red-400 transition-colors"
          >
            <LogOut size={13} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main content ───────────────────────────────── */}
      <main className="flex-1 ml-56 min-h-screen">
        {children}
      </main>
    </div>
  );
}
