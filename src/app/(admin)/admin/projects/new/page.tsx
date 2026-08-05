/* eslint-disable @next/next/no-img-element */
"use client";

import { AlertCircle, ArrowLeft, Save, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    shortDesc: "",
    longDesc: "",
    thumbnail: "",
    demoUrl: "",
    githubUrl: "",
    tags: "Next.js,React,TypeScript",
    featured: false,
    category: "Website",
    client: "",
    year: new Date().getFullYear().toString(),
    duration: "3 Months",
    highlight: "",
    challenge: "",
    solution: "",
    result: "",
    assignedAdminId: "",
    orderedAt: new Date().toISOString().slice(0, 10),
    completedAt: "",
    revisionUsed: 0,
    status: "In Progress",
    isActive: true,
    content: "",
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal mengunggah gambar");

      setFormData((prev) => ({ ...prev, image: json.url }));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mengunggah gambar";
      alert(msg);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...formData,
                thumbnail: formData.thumbnail,
                longDesc: formData.longDesc || formData.shortDesc,
                techStack: formData.tags,
                revisionUsed: Math.max(0, Math.min(2, Number(formData.revisionUsed) || 0)),
              }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal menambahkan project");

      router.push("/admin/projects");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menambahkan project";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Daftar Project
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Tambah Project Baru</h1>
        <p className="text-sm text-slate-400">Masukkan detail karya baru untuk ditampilkan di portfolio.</p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Judul Project *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: E-Commerce Mobile Platform"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Slug URL (Opsional)
            </label>
            <input
              type="text"
              placeholder="e-commerce-mobile-platform (kosongkan untuk auto-generate)"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Ringkasan Deskripsi *
            </label>
            <textarea
              required
              rows={2}
              placeholder="Jelaskan secara singkat tujuan dan fitur utama project..."
              value={formData.shortDesc}
              onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Gambar Project (Upload atau Masukkan URL)
            </label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/... atau /uploads/..."
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
                />
                <label className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold cursor-pointer flex items-center gap-1.5 transition-colors">
                  <Upload className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{uploading ? "Uploading..." : "Upload File"}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>

              {formData.thumbnail && (
                <div className="h-32 rounded-xl overflow-hidden border border-slate-800 relative bg-slate-950">
                  <img src={formData.thumbnail} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Tags / Teknologi (Pisahkan dengan koma)
            </label>
            <input
              type="text"
              placeholder="Next.js, React, Tailwind CSS, TypeScript"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Link Live Demo URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/demo"
                value={formData.demoUrl}
                onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Link GitHub Repository
              </label>
              <input
                type="url"
                placeholder="https://github.com/username/project"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Client"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
            />
            <input
              type="text"
              placeholder="Assigned Admin ID"
              value={formData.assignedAdminId}
              onChange={(e) => setFormData({ ...formData, assignedAdminId: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Detail Konten & Case Study
            </label>
            <textarea
              rows={5}
              placeholder="Penjelasan lengkap mengenai arsitektur, tantangan teknis, dan solusi..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="featured" className="text-xs font-semibold text-slate-300 cursor-pointer">
              Tampilkan sebagai Project Unggulan (Featured Project) di Homepage
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
          <Link
            href="/admin/projects"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            Batal
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? "Menyimpan..." : "Simpan Project"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
