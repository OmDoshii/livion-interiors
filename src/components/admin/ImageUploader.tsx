"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  currentUrl?:  string | null;
  folder:       string;
  onUpload:     (url: string) => void;
  onRemove?:    () => void;
  label?:       string;
  aspectRatio?: string;   // e.g. "1/1" or "4/3"
}

export default function ImageUploader({
  currentUrl,
  folder,
  onUpload,
  onRemove,
  label       = "Upload Image",
  aspectRatio = "1/1",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error,     setError]     = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file",   file);
    formData.append("folder", folder);

    try {
      const res  = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!data.success) throw new Error(data.error ?? "Upload failed");
      onUpload(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <p className="text-[11px] tracking-[0.15em] uppercase text-charcoal-muted">{label}</p>
      )}

      {currentUrl ? (
        /* Preview */
        <div className="relative group" style={{ aspectRatio }}>
          <Image
            src={currentUrl}
            alt="Uploaded image"
            fill
            className="object-cover"
            style={{ borderRadius: "2px" }}
          />
          {/* Remove overlay */}
          <div className="absolute inset-0 bg-charcoal/50 opacity-0 group-hover:opacity-100
                          transition-opacity duration-200 flex items-center justify-center gap-2">
            <button
              onClick={() => inputRef.current?.click()}
              className="bg-white text-charcoal text-xs px-3 py-1.5 hover:bg-cream-100 transition-colors flex items-center gap-1"
              style={{ borderRadius: "2px" }}
            >
              <Upload size={12} /> Replace
            </button>
            {onRemove && (
              <button
                onClick={onRemove}
                className="bg-red-500 text-white text-xs px-3 py-1.5 hover:bg-red-600 transition-colors flex items-center gap-1"
                style={{ borderRadius: "2px" }}
              >
                <X size={12} /> Remove
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Upload zone */
        <div
          className="border-2 border-dashed border-cream-300 hover:border-gold transition-colors
                     flex flex-col items-center justify-center gap-3 cursor-pointer
                     bg-cream-100 hover:bg-cream-200/50"
          style={{ aspectRatio, borderRadius: "2px", minHeight: "120px" }}
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {uploading ? (
            <>
              <Loader2 size={24} className="text-gold animate-spin" />
              <p className="text-xs text-charcoal-muted">Uploading…</p>
            </>
          ) : (
            <>
              <ImageIcon size={24} className="text-cream-400" />
              <div className="text-center">
                <p className="text-xs text-charcoal font-body">Click or drag to upload</p>
                <p className="text-[10px] text-charcoal-muted mt-0.5">JPG, PNG, WebP · Max 5MB</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
