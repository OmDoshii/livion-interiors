"use client";

import { useState, useEffect, useCallback } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ImageUploader from "@/components/admin/ImageUploader";
import { Plus, Pencil, Trash2, Eye, EyeOff, Star, StarOff, Loader2, X, Check } from "lucide-react";

interface Project {
  id:          string;
  title:       string;
  location:    string;
  size:        string;
  tag:         string;
  image_url:   string | null;
  is_active:   boolean;
  is_featured: boolean;
  sort_order:  number;
}

const emptyForm = {
  title: "", location: "", size: "", tag: "2BHK" as string,
  image_url: null as string | null, is_active: true, is_featured: false, sort_order: 0,
};

const TAGS = ["1BHK", "2BHK", "3BHK", "4BHK", "Villa", "Duplex"];

function ProjectModal({
  project,
  onSave,
  onClose,
}: {
  project: Project | null;
  onSave: (data: typeof emptyForm) => Promise<void>;
  onClose: () => void;
}) {
  const [form,   setForm]   = useState(project ?? emptyForm);
  const [saving, setSaving] = useState(false);
  const [error,  setError]  = useState<string | null>(null);

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
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lifted"
           style={{ borderRadius: "2px" }}>

        <div className="flex items-center justify-between p-6 border-b border-cream-200">
          <h2 className="font-display text-xl text-charcoal">
            {project ? "Edit Project" : "Add New Project"}
          </h2>
          <button onClick={onClose} className="text-charcoal-muted hover:text-charcoal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Project Image */}
          <ImageUploader
            currentUrl={form.image_url}
            folder="livion/portfolio"
            label="Project Photo *"
            aspectRatio="4/3"
            onUpload={(url) => setForm((f) => ({ ...f, image_url: url }))}
            onRemove={() => setForm((f) => ({ ...f, image_url: null }))}
          />

          {/* Title + Tag */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] tracking-[0.15em] uppercase text-charcoal-muted">Project Title *</label>
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Modern 3BHK"
                required
                className="input-field"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] tracking-[0.15em] uppercase text-charcoal-muted">Type *</label>
              <select
                value={form.tag}
                onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
                className="input-field appearance-none cursor-pointer"
              >
                {TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Location + Size */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] tracking-[0.15em] uppercase text-charcoal-muted">Location *</label>
              <input
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                placeholder="e.g. Gachibowli"
                required
                className="input-field"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] tracking-[0.15em] uppercase text-charcoal-muted">Size *</label>
              <input
                value={form.size}
                onChange={(e) => setForm((f) => ({ ...f, size: e.target.value }))}
                placeholder="e.g. 1,450 sq ft"
                required
                className="input-field"
              />
            </div>
          </div>

          {/* Sort order */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] tracking-[0.15em] uppercase text-charcoal-muted">Sort Order</label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm((f) => ({ ...f, sort_order: parseInt(e.target.value) }))}
              min={0}
              className="input-field"
            />
            <p className="text-[10px] text-charcoal-muted">Lower number = shown first on website</p>
          </div>

          {/* Toggles */}
          <div className="space-y-3">
            {[
              { key: "is_active",   label: "Visible on website",    val: form.is_active   },
              { key: "is_featured", label: "Featured (larger card)", val: form.is_featured },
            ].map(({ key, label, val }) => (
              <div key={key} className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, [key]: !val }))}
                  className={`w-10 h-5 rounded-full transition-colors duration-200 relative ${val ? "bg-gold" : "bg-cream-300"}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                    val ? "translate-x-5" : "translate-x-0.5"
                  }`} />
                </button>
                <span className="text-sm text-charcoal font-body">{label}</span>
              </div>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 px-3 py-2">
              <p className="text-xs text-red-600">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="btn-gold flex-1 justify-center disabled:opacity-60">
              {saving ? <><Loader2 size={14} className="animate-spin" /> Saving…</> : <><Check size={14} /> Save Project</>}
            </button>
            <button type="button" onClick={onClose} className="btn-outline px-6">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [modal,    setModal]    = useState<"add" | Project | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const res  = await fetch("/api/admin/portfolio?all=true");
    const data = await res.json();
    if (data.success) setProjects(data.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const handleSave = async (form: typeof emptyForm) => {
    const isEdit = modal !== "add" && modal !== null;
    const url    = isEdit ? `/api/admin/portfolio/${(modal as Project).id}` : "/api/admin/portfolio";
    const method = isEdit ? "PATCH" : "POST";
    const res    = await fetch(url, {
      method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error);
    await fetchProjects();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    setDeleting(id);
    await fetch(`/api/admin/portfolio/${id}`, { method: "DELETE" });
    await fetchProjects();
    setDeleting(null);
  };

  const toggleField = async (project: Project, field: "is_active" | "is_featured") => {
    await fetch(`/api/admin/portfolio/${project.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: !project[field] }),
    });
    await fetchProjects();
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-gold font-body mb-1">Content Manager</p>
            <h1 className="font-display text-3xl text-charcoal">Portfolio Projects</h1>
            <p className="text-sm text-charcoal-muted font-body mt-1">
              {projects.filter((p) => p.is_active).length} active · {projects.length} total
            </p>
          </div>
          <button onClick={() => setModal("add")} className="btn-gold flex items-center gap-2">
            <Plus size={15} /> Add Project
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={24} className="text-gold animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-cream-300" style={{ borderRadius: "2px" }}>
            <p className="text-charcoal-muted font-body">No projects yet. Add your first one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`bg-white border ${project.is_active ? "border-cream-200" : "border-cream-200 opacity-60"}`}
                style={{ borderRadius: "2px" }}
              >
                {/* Image */}
                <div className="relative h-44 bg-cream-200 overflow-hidden" style={{ borderRadius: "2px 2px 0 0" }}>
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-xs text-cream-400">No image uploaded</p>
                    </div>
                  )}
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-cream-100/90 backdrop-blur-sm px-2 py-0.5 text-[10px] tracking-wide uppercase text-charcoal">
                      {project.tag}
                    </span>
                    {project.is_featured && (
                      <span className="bg-gold text-white px-2 py-0.5 text-[10px] tracking-wide uppercase">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-4">
                  <p className="font-display text-base text-charcoal">{project.title}</p>
                  <p className="text-xs text-charcoal-muted font-body mt-0.5">
                    {project.location} · {project.size}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-cream-200">
                    <button
                      onClick={() => setModal(project)}
                      className="flex items-center gap-1 text-xs text-charcoal-muted hover:text-charcoal px-2 py-1
                                 border border-cream-300 hover:border-cream-400 transition-all"
                      style={{ borderRadius: "2px" }}
                    >
                      <Pencil size={11} /> Edit
                    </button>
                    <button
                      onClick={() => toggleField(project, "is_active")}
                      className="flex items-center gap-1 text-xs text-charcoal-muted hover:text-charcoal px-2 py-1
                                 border border-cream-300 hover:border-cream-400 transition-all"
                      style={{ borderRadius: "2px" }}
                    >
                      {project.is_active ? <><EyeOff size={11} /> Hide</> : <><Eye size={11} /> Show</>}
                    </button>
                    <button
                      onClick={() => toggleField(project, "is_featured")}
                      className="flex items-center gap-1 text-xs text-charcoal-muted hover:text-charcoal px-2 py-1
                                 border border-cream-300 hover:border-cream-400 transition-all"
                      style={{ borderRadius: "2px" }}
                      title="Toggle featured (larger card)"
                    >
                      {project.is_featured ? <StarOff size={11} /> : <Star size={11} />}
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      disabled={deleting === project.id}
                      className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 px-2 py-1
                                 border border-red-100 hover:border-red-300 transition-all ml-auto"
                      style={{ borderRadius: "2px" }}
                    >
                      {deleting === project.id ? <Loader2 size={11} className="animate-spin" /> : <Trash2 size={11} />}
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modal !== null && (
        <ProjectModal
          project={modal === "add" ? null : modal}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </AdminLayout>
  );
}
