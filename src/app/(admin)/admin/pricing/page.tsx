"use client";

import { Layers, Plus, Trash2, Pencil, Save, X, Star, Tag, ListChecks, Heading, Table2 } from "lucide-react";
import { useEffect, useState } from "react";

const ICON_OPTIONS = ["Code", "Palette", "Globe", "AppWindow", "Wrench", "Smartphone", "ShieldCheck", "Cpu", "Workflow", "Layout"];

interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  cta: string;
  price: string;
  features: string[];
  popular: boolean;
  displayOrder: number;
  isActive: boolean;
}

const EMPTY_FORM = {
  icon: "Code",
  title: "",
  description: "",
  cta: "Start Now",
  price: "",
  features: "",
  popular: false,
  displayOrder: 0,
  isActive: true,
};

export default function AdminPricingPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [pricing, setPricing] = useState({
    pricingTag: "Transparent & Affordable",
    pricingTitle: "Pricing Tailored to Your Needs",
    pricingDescription: "Choose the plan that fits your vision. No hidden costs.",
  });
  const [pricingSaving, setPricingSaving] = useState(false);

  const loadServices = () => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => setServices(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const loadPricingText = () => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (!data) return;
        setPricing({
          pricingTag: data.pricingTag || "Transparent & Affordable",
          pricingTitle: data.pricingTitle || "Pricing Tailored to Your Needs",
          pricingDescription:
            data.pricingDescription || "Choose the plan that fits your vision. No hidden costs.",
        });
      })
      .catch(console.error);
  };

  useEffect(() => {
    loadServices();
    loadPricingText();
  }, []);

  const handleSavePricingText = async (e: React.FormEvent) => {
    e.preventDefault();
    setPricingSaving(true);
    try {
      const existing = (await fetch("/api/settings").then((res) => res.json())) || {};
      const { id, createdAt, updatedAt, ...rest } = existing;
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...rest, ...pricing }),
      });
      if (!res.ok) throw new Error("Gagal menyimpan");
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan teks section. Coba lagi.");
    } finally {
      setPricingSaving(false);
    }
  };

  const resetForm = () => {
    setForm({ ...EMPTY_FORM });
    setEditingId(null);
  };

  const startEdit = (svc: ServiceItem) => {
    setEditingId(svc.id);
    setForm({
      icon: svc.icon,
      title: svc.title,
      description: svc.description,
      cta: svc.cta,
      price: svc.price,
      features: Array.isArray(svc.features) ? svc.features.join("\n") : "",
      popular: svc.popular,
      displayOrder: svc.displayOrder,
      isActive: svc.isActive,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      features: form.features
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
      displayOrder: Number(form.displayOrder) || 0,
    };

    const res = await fetch(editingId ? `/api/services/${editingId}` : "/api/services", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      resetForm();
      loadServices();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this pricing package permanently?")) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    if (editingId === id) resetForm();
    loadServices();
  };

  if (loading) return <div className="text-slate-400 font-mono text-xs">Loading Pricing...</div>;

  const inputClass =
    "w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors";

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
          <Layers className="w-6 h-6 text-indigo-400" />
          <span>Pricing Manager</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">
          MANAGE PRICING PACKAGES, PRICES & RECOMMENDED PLANS
        </p>
      </div>

      {/* Edit Section Text */}
      <form
        onSubmit={handleSavePricingText}
        className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Heading className="w-4 h-4 text-sky-400" />
            <span>Cara Mengelola Teks Section "Pricing"</span>
          </h3>
          <button
            type="submit"
            disabled={pricingSaving}
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-xs font-semibold text-white flex items-center space-x-1.5 shadow-lg shadow-sky-500/25 transition-all disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{pricingSaving ? "Menyimpan..." : "Simpan Teks"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5">Label Kecil (badge)</label>
            <input
              type="text"
              value={pricing.pricingTag}
              onChange={(e) => setPricing({ ...pricing, pricingTag: e.target.value })}
              placeholder="Transparent & Affordable"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5">Judul Utama</label>
            <input
              type="text"
              value={pricing.pricingTitle}
              onChange={(e) => setPricing({ ...pricing, pricingTitle: e.target.value })}
              placeholder="Pricing Tailored to Your Needs"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5">Deskripsi</label>
            <input
              type="text"
              value={pricing.pricingDescription}
              onChange={(e) => setPricing({ ...pricing, pricingDescription: e.target.value })}
              placeholder="Choose the plan that fits your vision. No hidden costs."
              className={inputClass}
            />
          </div>
        </div>
      </form>

      {/* Add / Edit Form */}
      <form
        id="service-form"
        onSubmit={handleSubmit}
        className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-5"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            {editingId ? <Pencil className="w-4 h-4 text-indigo-400" /> : <Plus className="w-4 h-4 text-indigo-400" />}
            <span>{editingId ? "Edit Pricing Package" : "Tambah Paket Harga Baru"}</span>
          </h3>
          {editingId && (
            <button type="button" onClick={resetForm} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5">Judul</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Web Application"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5">Ikon</label>
            <select
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              className={inputClass}
            >
              {ICON_OPTIONS.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5">Harga</label>
            <div className="relative">
              <Tag className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="1.5M"
                className={`${inputClass} pl-9`}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5">Urutan (displayOrder)</label>
            <input
              type="number"
              value={form.displayOrder}
              onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
              placeholder="0"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5">Teks Tombol (cta)</label>
            <input
              type="text"
              value={form.cta}
              onChange={(e) => setForm({ ...form, cta: e.target.value })}
              placeholder="Pilih Web App"
              className={inputClass}
            />
          </div>

          <div className="flex items-end pb-1">
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <span
                className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                  form.popular ? "bg-amber-500 border-amber-500" : "border-slate-600 bg-slate-950"
                }`}
                onClick={() => setForm({ ...form, popular: !form.popular })}
              >
                {form.popular && <Star className="w-3 h-3 text-slate-950" />}
              </span>
              <input
                type="checkbox"
                checked={form.popular}
                onChange={(e) => setForm({ ...form, popular: e.target.checked })}
                className="hidden"
              />
              <span className="text-xs font-semibold text-amber-400 flex items-center space-x-1">
                <Star className="w-3.5 h-3.5" />
                <span>Paket Paling Direkomendasikan</span>
              </span>
            </label>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5">Aktif di Publik?</label>
            <label className="flex items-center space-x-3 cursor-pointer select-none pt-2">
              <button
                type="button"
                onClick={() => setForm({ ...form, isActive: !form.isActive })}
                className={`relative w-9 h-5 rounded-full transition-colors ${form.isActive ? "bg-emerald-500" : "bg-slate-700"}`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${
                    form.isActive ? "left-4" : "left-0.5"
                  }`}
                />
              </button>
              <span className="text-xs text-slate-400">{form.isActive ? "Tampil" : "Disembunyikan"}</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5">Deskripsi</label>
          <textarea
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Deskripsi layanan..."
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div>
          <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5 flex items-center space-x-1.5">
            <ListChecks className="w-3.5 h-3.5" />
            <span>Fitur (satu per baris)</span>
          </label>
          <textarea
            value={form.features}
            onChange={(e) => setForm({ ...form, features: e.target.value })}
            placeholder={"Full Custom Development\nSistem Autentikasi User (OAuth/JWT)\nScalable Cloud Architecture"}
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center space-x-2 shadow-lg shadow-indigo-500/25 transition-all"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{editingId ? "Simpan Perubahan" : "Simpan Paket"}</span>
        </button>
      </form>

      {/* Pricing Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Table2 className="w-4 h-4 text-indigo-400" />
            <span>Daftar Paket Harga ({services.length})</span>
          </h3>
          <button
            type="button"
            onClick={() => {
              resetForm();
              document.getElementById("service-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-[11px] font-semibold text-white flex items-center space-x-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[560px]">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-mono uppercase tracking-wider text-slate-500">
                <th className="px-6 py-3 font-semibold">Paket</th>
                <th className="px-6 py-3 font-semibold">Harga</th>
                <th className="px-6 py-3 font-semibold">Popular</th>
                <th className="px-6 py-3 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {services.map((svc) => (
                <tr key={svc.id} className={svc.isActive ? "transition-colors hover:bg-slate-950/40" : "opacity-50"}>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-sm font-black text-indigo-400 shrink-0">
                        {svc.icon.slice(0, 1)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white flex items-center space-x-2">
                          <span>{svc.title}</span>
                          {!svc.isActive && <span className="text-[10px] text-slate-500 font-mono">(hidden)</span>}
                        </div>
                        <div className="mt-0.5 text-[11px] text-slate-400 font-mono">
                          {svc.icon} <span className="text-slate-600">•</span> Order #{svc.displayOrder}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-white">Rp {svc.price || "-"}</span>
                  </td>
                  <td className="px-6 py-4">
                    {svc.popular ? (
                      <span className="inline-flex items-center space-x-1 px-2 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-[10px] font-bold text-amber-400 uppercase">
                        <Star className="w-3 h-3" />
                        <span>Recommended</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-600">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => startEdit(svc)}
                        className="p-2 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-950 transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(svc.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-950 transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {services.length === 0 && (
          <div className="px-6 py-10 text-center text-xs text-slate-500">
            Belum ada paket harga. Tambahkan melalui form di atas.
          </div>
        )}
      </div>
    </div>
  );
}