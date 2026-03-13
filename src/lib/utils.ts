import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.startsWith("91") ? `+${cleaned}` : `+91${cleaned}`;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatCurrency(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} L`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    new:        "bg-blue-50 text-blue-700 border-blue-200",
    contacted:  "bg-amber-50 text-amber-700 border-amber-200",
    site_visit: "bg-purple-50 text-purple-700 border-purple-200",
    quotation:  "bg-orange-50 text-orange-700 border-orange-200",
    confirmed:  "bg-green-50 text-green-700 border-green-200",
    lost:       "bg-gray-50 text-gray-500 border-gray-200",
  };
  return colors[status] ?? colors.new;
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    new:        "New Lead",
    contacted:  "Contacted",
    site_visit: "Site Visit",
    quotation:  "Quotation Sent",
    confirmed:  "Confirmed",
    lost:       "Lost",
  };
  return labels[status] ?? status;
}
