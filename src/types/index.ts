// ─── Lead Types ───────────────────────────────────────────────────────────────

export type FlatSize = "1BHK" | "2BHK" | "3BHK" | "4BHK" | "Villa" | "Duplex";

export type BudgetRange =
  | "Under ₹5 Lakhs"
  | "₹5–10 Lakhs"
  | "₹10–15 Lakhs"
  | "₹15–20 Lakhs"
  | "₹20–30 Lakhs"
  | "Above ₹30 Lakhs";

export type LeadStatus =
  | "new"
  | "contacted"
  | "site_visit"
  | "quotation"
  | "confirmed"
  | "lost";

export interface LeadFormData {
  name: string;
  phone: string;
  projectLocation: string;
  flatSize: FlatSize;
  possessionDate: string;
  budgetRange: BudgetRange;
  message?: string;
}

export interface Lead extends LeadFormData {
  id: string;
  status: LeadStatus;
  source: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

// ─── API Response Types ───────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ─── Dashboard Types ──────────────────────────────────────────────────────────

export interface DashboardStats {
  total: number;
  new: number;
  contacted: number;
  siteVisit: number;
  quotation: number;
  confirmed: number;
}

export interface PipelineColumn {
  id: LeadStatus;
  label: string;
  color: string;
  leads: Lead[];
}
