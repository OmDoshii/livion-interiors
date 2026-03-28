import AdminLayout from "@/components/admin/AdminLayout";
import { Star, Images, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const quickLinks = [
  {
    href:  "/admin/reviews",
    icon:  Star,
    title: "Manage Reviews",
    desc:  "Add, edit or remove client testimonials and photos",
    color: "bg-amber-500",
  },
  {
    href:  "/admin/portfolio",
    icon:  Images,
    title: "Manage Portfolio",
    desc:  "Upload project images and update project details",
    color: "bg-blue-500",
  },
  {
    href:  "/dashboard",
    icon:  Users,
    title: "Lead CRM",
    desc:  "View and manage all incoming leads and enquiries",
    color: "bg-green-500",
  },
];

export default function AdminOverviewPage() {
  return (
    <AdminLayout>
      <div className="p-8">

        {/* Header */}
        <div className="mb-8">
          <p className="text-[11px] tracking-[0.2em] uppercase text-gold font-body mb-1">
            Admin Panel
          </p>
          <h1 className="font-display text-3xl text-charcoal">Welcome, Nimitesh</h1>
          <p className="text-sm text-charcoal-muted font-body mt-1">
            Manage your website content from here
          </p>
        </div>

        {/* Quick action cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {quickLinks.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group bg-white border border-cream-200 p-6 hover:border-cream-400
                           hover:shadow-card transition-all duration-300"
                style={{ borderRadius: "2px" }}
              >
                <div className={`w-10 h-10 ${card.color} flex items-center justify-center mb-4`}
                     style={{ borderRadius: "2px" }}>
                  <Icon size={18} className="text-white" />
                </div>
                <h3 className="font-display text-lg text-charcoal mb-1 group-hover:text-gold transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-charcoal-muted font-body leading-relaxed mb-4">
                  {card.desc}
                </p>
                <div className="flex items-center gap-1 text-xs text-gold font-body">
                  Open <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Instructions box */}
        <div className="bg-cream-200 border border-cream-300 p-6" style={{ borderRadius: "2px" }}>
          <p className="text-[10px] tracking-[0.2em] uppercase text-gold mb-3">How to update your website</p>
          <ul className="space-y-2">
            {[
              "Go to Reviews to add or update client testimonials with their photos",
              "Go to Portfolio to upload new project images — they appear on the website instantly",
              "Go to Leads CRM to see all enquiries received from the website form",
              "Changes are live immediately — no need to contact your developer",
            ].map((tip, i) => (
              <li key={i} className="flex gap-3 text-sm text-charcoal font-body font-light">
                <span className="w-5 h-5 bg-charcoal text-cream-100 flex items-center justify-center
                                 text-[10px] shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
