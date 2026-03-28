"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, Lock, User, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username,  setUsername]  = useState("");
  const [password,  setPassword]  = useState("");
  const [showPass,  setShowPass]  = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error ?? "Invalid credentials");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-10">
          <Image
            src="/images/logo-transparent.png"
            alt="Livion Interiors"
            width={160}
            height={64}
            className="h-16 w-auto object-contain mx-auto"
          />
          <p className="text-[10px] tracking-[0.25em] uppercase text-charcoal-muted mt-3">
            Admin Panel
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-cream-200 p-8 shadow-soft" style={{ borderRadius: "2px" }}>
          <h1 className="font-display text-2xl text-charcoal mb-1">Welcome back</h1>
          <p className="text-xs text-charcoal-muted font-body mb-6">Sign in to manage your website</p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] tracking-[0.15em] uppercase text-charcoal-muted">Username</label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                  autoComplete="username"
                  className="input-field pl-10"
                />
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-muted pointer-events-none" />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] tracking-[0.15em] uppercase text-charcoal-muted">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  required
                  autoComplete="current-password"
                  className="input-field pl-10 pr-10"
                />
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-muted pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-muted hover:text-charcoal transition-colors"
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 px-3 py-2">
                <p className="text-xs text-red-600">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-2 disabled:opacity-60"
            >
              {loading ? <><Loader2 size={14} className="animate-spin" /> Signing in…</> : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-charcoal-muted mt-6">
          Livion Interiors Admin · Secure Access
        </p>
      </div>
    </div>
  );
}
