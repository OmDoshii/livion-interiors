"use client";

import { useState, useEffect, useCallback } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ImageUploader from "@/components/admin/ImageUploader";
import { Plus, Pencil, Trash2, Star, Eye, EyeOff, Loader2, X, Check } from "lucide-react";

interface Review {
  id:         string;
  name:       string;
  location:   string;
  text:       string;
  rating:     number;
  image_url:  string | null;
  initials:   string;
  is_active:  boolean;
  sort_order: number;
}

const emptyForm = {
  name: "", location: "", text: "", rating: 5,
  image_url: null as string | null, initials: "", is_active: true, sort_order: 0,
};

// ─── Review Form Modal ────────────────────────────────────────────
function ReviewModal({
  review,
  onSave,
  onClose,
}: {
  review: Review | null;
  onSave: (data: typeof emptyForm) => Promise<void>;
  onClose: () => void;
}) {
  const [form,    setForm]    = useState(review ?? emptyForm);
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  // Auto-generate initials from name
  const handleNameChange = (name: string) => {
    const initials = name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 3);
    setForm((f) => ({ ...f, name, initials }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-lifted"
           style={{ borderRadius: "2px" }}>

        {/* Modal header */}
        <div className="flex items-center justify-between p-6 border-b border-cream-200">
          <h2 className="font-display text-xl text-charcoal">
            {review ? "Edit Review" : "Add New Review"}
          </h2>
          <button onClick={onClose} className="text-charcoal-muted hover:text-charcoal transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Photo */}
          <ImageUploader
            currentUrl={form.image_url}
            folder="livion/reviews"
            label="Client Photo (shown on card flip)"
            aspectRatio="1/1"
            onUpload={(url) => setForm((f) => ({ ...f, image_url: url }))}
            onRemove={() => setForm((f) => ({ ...f, image_url: null }))}
          />

          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] tracking-[0.15em] uppercase text-charcoal-muted">
                Client Name *
              </label>
              <input
                value={form.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Priya Sharma"
                required
                className="input-field"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] tracking-[0.15em] uppercase text-charcoal-muted">
                Location *
              </label>
              <input
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                placeholder="e.g. 3BHK · Gachibowli"
                required
                className="input-field"
              />
            </div>
          </div>

          {/* Review text */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] tracking-[0.15em] uppercase text-charcoal-muted">
              Review Text *
            </label>
            <textarea
              value={form.text}
              onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
              placeholder="What did the client say about Livion Interiors?"
              required
              rows={4}
              className="input-field resize-none"
            />
            <p className="text-[10px] text-charcoal-muted">{form.text.length}/500</p>
          </div>

          {/* Rating + Sort order */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] tracking-[0.15em] uppercase text-charcoal-muted">
                Star Rating *
              </label>
              <div className="flex gap-1">
                {[1,2,3,4,5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, rating: star }))}
                  >
                    <Star
                      size={20}
                      className="transition-colors duration-150"
                      fill={star <= form.rating ? "#B8956A" : "none"}
                      color={star <= form.rating ? "#B8956A" : "#D9CFC7"}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] tracking-[0.15em] uppercase text-charcoal-muted">
                Sort Order
              </label>
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm((f) => ({ ...f, sort_order: parseInt(e.target.value) }))}
                min={0}
                className="input-field"
              />
            </div>
          </div>

          {/* Active toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, is_active: !f.is_active }))}
              className={`w-10 h-5 rounded-full transition-colors duration-200 relative ${
                form.is_active ? "bg-gold" : "bg-cream-300"
              }`}
            >
              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                form.is_active ? "translate-x-5" : "translate-x-0.5"
              }`} />
            </button>
            <span className="text-sm text-charcoal font-body">
              {form.is_active ? "Visible on website" : "Hidden from website"}
            </span>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 px-3 py-2">
              <p className="text-xs text-red-600">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="btn-gold flex-1 justify-center disabled:opacity-60">
              {saving ? <><Loader2 size={14} className="animate-spin" /> Saving…</> : <><Check size={14} /> Save Review</>}
            </button>
            <button type="button" onClick={onClose} className="btn-outline px-6">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────
export default function AdminReviewsPage() {
  const [reviews,  setReviews]  = useState<Review[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [modal,    setModal]    = useState<"add" | Review | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    const res  = await fetch("/api/admin/reviews?all=true");
    const data = await res.json();
    if (data.success) setReviews(data.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  const handleSave = async (form: typeof emptyForm) => {
    const isEdit = modal !== "add" && modal !== null;
    const url    = isEdit ? `/api/admin/reviews/${(modal as Review).id}` : "/api/admin/reviews";
    const method = isEdit ? "PATCH" : "POST";

    const res  = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error);
    await fetchReviews();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review? This cannot be undone.")) return;
    setDeleting(id);
    await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
    await fetchReviews();
    setDeleting(null);
  };

  const toggleActive = async (review: Review) => {
    await fetch(`/api/admin/reviews/${review.id}`, {
      method:  "PATCH",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ is_active: !review.is_active }),
    });
    await fetchReviews();
  };

  return (
    <AdminLayout>
      <div className="p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-gold font-body mb-1">Content Manager</p>
            <h1 className="font-display text-3xl text-charcoal">Client Reviews</h1>
            <p className="text-sm text-charcoal-muted font-body mt-1">
              {reviews.filter((r) => r.is_active).length} active · {reviews.length} total
            </p>
          </div>
          <button onClick={() => setModal("add")} className="btn-gold flex items-center gap-2">
            <Plus size={15} /> Add Review
          </button>
        </div>

        {/* Reviews grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={24} className="text-gold animate-spin" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-cream-300" style={{ borderRadius: "2px" }}>
            <Star size={32} className="text-cream-400 mx-auto mb-3" />
            <p className="text-charcoal-muted font-body">No reviews yet. Add your first one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {reviews.map((review) => (
              <div
                key={review.id}
                className={`bg-white border p-5 ${review.is_active ? "border-cream-200" : "border-cream-200 opacity-60"}`}
                style={{ borderRadius: "2px" }}
              >
                {/* Photo preview */}
                {review.image_url && (
                  <div className="relative w-full h-32 mb-4 bg-cream-200 overflow-hidden" style={{ borderRadius: "2px" }}>
                    <img src={review.image_url} alt={review.name} className="w-full h-full object-cover object-top" />
                  </div>
                )}

                {/* Stars */}
                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} fill={i < review.rating ? "#B8956A" : "none"} color="#B8956A" />
                  ))}
                </div>

                <p className="font-display text-base text-charcoal mb-0.5">{review.name}</p>
                <p className="text-[10px] text-gold tracking-wide mb-3">{review.location}</p>
                <p className="text-xs text-charcoal-muted font-body font-light leading-relaxed line-clamp-3 mb-4">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-cream-200">
                  <button
                    onClick={() => setModal(review)}
                    className="flex items-center gap-1 text-xs text-charcoal-muted hover:text-charcoal px-2 py-1
                               border border-cream-300 hover:border-cream-400 transition-all"
                    style={{ borderRadius: "2px" }}
                  >
                    <Pencil size={11} /> Edit
                  </button>
                  <button
                    onClick={() => toggleActive(review)}
                    className="flex items-center gap-1 text-xs text-charcoal-muted hover:text-charcoal px-2 py-1
                               border border-cream-300 hover:border-cream-400 transition-all"
                    style={{ borderRadius: "2px" }}
                  >
                    {review.is_active ? <><EyeOff size={11} /> Hide</> : <><Eye size={11} /> Show</>}
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    disabled={deleting === review.id}
                    className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 px-2 py-1
                               border border-red-100 hover:border-red-300 transition-all ml-auto"
                    style={{ borderRadius: "2px" }}
                  >
                    {deleting === review.id ? <Loader2 size={11} className="animate-spin" /> : <Trash2 size={11} />}
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modal !== null && (
        <ReviewModal
          review={modal === "add" ? null : modal}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </AdminLayout>
  );
}
