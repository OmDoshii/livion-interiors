"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone, MapPin, Home, Calendar, Wallet,
  RefreshCw, ChevronDown, Search, Filter,
  TrendingUp, Users, CheckCircle, Clock
} from "lucide-react";
import { cn, getStatusColor, getStatusLabel, formatDate } from "@/lib/utils";
import type { Lead, LeadStatus } from "@/types";

const STATUSES: { id: LeadStatus; label: string; color: string }[] = [
  { id: "new",        label: "New Leads",     color: "border-blue-400"   },
  { id: "contacted",  label: "Contacted",      color: "border-amber-400"  },
  { id: "site_visit", label: "Site Visit",     color: "border-purple-400" },
  { id: "quotation",  label: "Quotation Sent", color: "border-orange-400" },
  { id: "confirmed",  label: "Confirmed",      color: "border-green-400"  },
];

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, color }: {
  icon: React.ElementType; label: string; value: number | string;
  sub?: string; color: string;
}) {
  return (
    <div className="bg-white border border-cream-200 p-5 flex gap-4 items-center shadow-card" style={{ borderRadius: "2px" }}>
      <div className={`w-10 h-10 flex items-center justify-center ${color}`} style={{ borderRadius: "2px" }}>
        <Icon size={18} className="text-white" />
      </div>
      <div>
        <p className="font-display text-2xl text-charcoal leading-none">{value}</p>
        <p className="text-xs text-charcoal-muted font-body mt-0.5">{label}</p>
        {sub && <p className="text-[10px] text-charcoal-muted opacity-60">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Lead Card ────────────────────────────────────────────────────────────────
function LeadCard({ lead, onStatusChange }: { lead: Lead; onStatusChange: (id: string, status: LeadStatus) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border border-cream-200 p-4 shadow-card hover:shadow-lifted transition-all duration-200" style={{ borderRadius: "2px" }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-display text-base text-charcoal">{lead.name}</p>
          <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-xs text-gold hover:underline mt-0.5">
            <Phone size={10} /> {lead.phone}
          </a>
        </div>
        <span className={cn("text-[10px] tracking-wide px-2 py-0.5 border font-body uppercase", getStatusColor(lead.status))}>
          {getStatusLabel(lead.status)}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-1.5 mb-3">
        <div className="flex items-center gap-2 text-xs text-charcoal-muted">
          <MapPin size={10} className="text-cream-400 shrink-0" />
          {lead.projectLocation}
        </div>
        <div className="flex items-center gap-2 text-xs text-charcoal-muted">
          <Home size={10} className="text-cream-400 shrink-0" />
          {lead.flatSize}
        </div>
        <div className="flex items-center gap-2 text-xs text-charcoal-muted">
          <Wallet size={10} className="text-cream-400 shrink-0" />
          {lead.budgetRange}
        </div>
        <div className="flex items-center gap-2 text-xs text-charcoal-muted">
          <Calendar size={10} className="text-cream-400 shrink-0" />
          {lead.possessionDate}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-cream-200 mb-3" />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] text-charcoal-muted">{formatDate(lead.createdAt)}</p>

        {/* Status selector */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1 text-xs text-charcoal-light border border-cream-300 px-2 py-1 hover:border-gold transition-colors"
            style={{ borderRadius: "2px" }}
          >
            Move to <ChevronDown size={10} />
          </button>
          {open && (
            <div
              className="absolute right-0 bottom-full mb-1 bg-white border border-cream-200 shadow-lifted z-20 min-w-[140px]"
              style={{ borderRadius: "2px" }}
            >
              {STATUSES.filter((s) => s.id !== lead.status).map((s) => (
                <button
                  key={s.id}
                  onClick={() => { onStatusChange(lead.id, s.id); setOpen(false); }}
                  className="w-full text-left px-3 py-2 text-xs text-charcoal hover:bg-cream-100 transition-colors font-body"
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [leads,    setLeads]    = useState<Lead[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState("");
  const [view,     setView]     = useState<"pipeline" | "table">("pipeline");

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/leads?limit=100");
      const data = await res.json();
      if (data.success) setLeads(data.data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const handleStatusChange = async (id: string, status: LeadStatus) => {
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  };

  const filtered = leads.filter((l) =>
    search === "" ||
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.phone.includes(search) ||
    l.projectLocation.toLowerCase().includes(search.toLowerCase())
  );

  const byStatus = (status: LeadStatus) =>
    filtered.filter((l) => l.status === status);

  const stats = {
    total:     leads.length,
    new:       leads.filter((l) => l.status === "new").length,
    confirmed: leads.filter((l) => l.status === "confirmed").length,
    thisWeek:  leads.filter((l) => {
      const d = new Date(l.createdAt);
      const now = new Date();
      const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    }).length,
  };

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Top Bar */}
      <header className="bg-white border-b border-cream-200 sticky top-0 z-30">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image
                src="/images/logo-transparent.png"
                alt="Livion Interiors"
                width={110}
                height={44}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <span className="text-[9px] tracking-[0.2em] uppercase text-charcoal-muted hidden sm:block border-l border-cream-300 pl-3">
              CRM Dashboard
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden sm:block">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-muted pointer-events-none" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search leads…"
                className="pl-8 pr-4 py-2 text-xs border border-cream-300 bg-cream-100 focus:outline-none focus:border-gold w-52"
                style={{ borderRadius: "2px" }}
              />
            </div>

            {/* View toggle */}
            <div className="flex border border-cream-300" style={{ borderRadius: "2px" }}>
              {(["pipeline", "table"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={cn(
                    "px-3 py-2 text-xs capitalize font-body transition-colors",
                    view === v ? "bg-charcoal text-cream-100" : "text-charcoal-muted hover:bg-cream-100"
                  )}
                >
                  {v}
                </button>
              ))}
            </div>

            <button
              onClick={fetchLeads}
              className="p-2 border border-cream-300 hover:border-gold text-charcoal-muted hover:text-gold transition-colors"
              style={{ borderRadius: "2px" }}
              aria-label="Refresh"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard icon={Users}       label="Total Leads"   value={stats.total}     color="bg-charcoal"        />
          <StatCard icon={Filter}      label="New This Week" value={stats.thisWeek}  color="bg-blue-500"        />
          <StatCard icon={TrendingUp}  label="Active Leads"  value={stats.new}       color="bg-amber-500"       />
          <StatCard icon={CheckCircle} label="Confirmed"     value={stats.confirmed} color="bg-green-500"       />
        </div>

        {/* Pipeline View */}
        {view === "pipeline" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {STATUSES.map((col) => (
              <div key={col.id} className="flex flex-col gap-3">
                {/* Column header */}
                <div className={cn("border-t-2 pt-3 flex items-center justify-between", col.color)}>
                  <p className="text-xs font-body font-normal text-charcoal tracking-wide">{col.label}</p>
                  <span className="text-[10px] bg-cream-200 text-charcoal-muted px-1.5 py-0.5 font-body">
                    {byStatus(col.id).length}
                  </span>
                </div>
                {/* Cards */}
                {loading ? (
                  <div className="bg-cream-200 animate-pulse h-24 rounded" />
                ) : byStatus(col.id).length === 0 ? (
                  <div className="border border-dashed border-cream-300 p-4 text-center">
                    <p className="text-xs text-charcoal-muted font-body">No leads</p>
                  </div>
                ) : (
                  byStatus(col.id).map((lead) => (
                    <LeadCard key={lead.id} lead={lead} onStatusChange={handleStatusChange} />
                  ))
                )}
              </div>
            ))}
          </div>
        )}

        {/* Table View */}
        {view === "table" && (
          <div className="bg-white border border-cream-200 overflow-x-auto shadow-card" style={{ borderRadius: "2px" }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cream-200">
                  {["Name", "Phone", "Location", "Flat", "Budget", "Possession", "Status", "Date", "Action"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[10px] tracking-[0.12em] uppercase text-charcoal-muted font-body font-normal">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="border-b border-cream-100">
                      {[...Array(9)].map((_, j) => (
                        <td key={j} className="px-4 py-3">
                          <div className="h-3 bg-cream-200 animate-pulse rounded w-20" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : filtered.map((lead) => (
                  <tr key={lead.id} className="border-b border-cream-100 hover:bg-cream-50 transition-colors">
                    <td className="px-4 py-3 font-display text-base text-charcoal">{lead.name}</td>
                    <td className="px-4 py-3">
                      <a href={`tel:${lead.phone}`} className="text-xs text-gold hover:underline">{lead.phone}</a>
                    </td>
                    <td className="px-4 py-3 text-xs text-charcoal-muted">{lead.projectLocation}</td>
                    <td className="px-4 py-3 text-xs text-charcoal-muted">{lead.flatSize}</td>
                    <td className="px-4 py-3 text-xs text-charcoal-muted">{lead.budgetRange}</td>
                    <td className="px-4 py-3 text-xs text-charcoal-muted">{lead.possessionDate}</td>
                    <td className="px-4 py-3">
                      <span className={cn("text-[10px] px-2 py-0.5 border font-body uppercase tracking-wide", getStatusColor(lead.status))}>
                        {getStatusLabel(lead.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-charcoal-muted">{formatDate(lead.createdAt)}</td>
                    <td className="px-4 py-3">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                        className="text-xs border border-cream-300 bg-cream-100 px-2 py-1 focus:outline-none focus:border-gold cursor-pointer"
                        style={{ borderRadius: "2px" }}
                      >
                        {STATUSES.map((s) => (
                          <option key={s.id} value={s.id}>{s.label}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!loading && filtered.length === 0 && (
              <div className="text-center py-12">
                <p className="text-charcoal-muted font-body text-sm">No leads found.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}