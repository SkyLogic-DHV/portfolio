"use client";

import { Plus, Trash2, Pencil, Save, X, Table2, Layers } from "lucide-react";
import { useEffect, useState } from "react";

const ICON_OPTIONS = ["Code", "Palette", "Globe", "AppWindow", "Wrench", "Smartphone", "ShieldCheck", "Cpu", "Workflow", "Layout"];

interface PublicServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
}

const EMPTY_FORM = {
  icon: "Code",
  title: "",
  description: "",
  displayOrder: 0,
  isActive: true,
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<PublicServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });

  const loadServices = () => {
    fetch("/api/public-services")
      .then((res) => res.json())
      .then((data) => setServices(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadServices();
  }, []);

  const resetForm = () => {
    setForm({ ...EMPTY_FORM });
    setEditingId(null);
  };

  const startEdit = (svc: PublicServiceItem) => {
    setEditingId(svc.id);
    setForm({
      icon: svc.icon,
      title: svc.title,
      description: svc.description,
      displayOrder: svc.displayOrder,
      isActive: svc.isActive,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      displayOrder: Number(form.displayOrder) || 0,
    };

    const res = await fetch(editingId ? `/api/public-services/${editingId}` : "/api/public-services", {
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
    if (!confirm("Delete this service permanently?")) return;
    await fetch(`/api/public-services/${id}`, { method: "DELETE" });
    if (editingId === id) resetForm();
    loadServices();
  };

  if (loading) return <div className="text-slate-400 font-mono text-xs">Loading Services...</div>;

  const inputClass =
    "w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors";

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
          <Layers className="w-6 h-6 text-indigo-400" />
          <span>Services Manager</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">
          KELOLA SECTION "WE PROVIDE THE BEST SERVICES" — LOGO, TITLE & DESCRIPTION
        </p>
      </div>

      {/* Add / Edit Form */}
      <form
        id="service-form"
        onSubmit={handleSubmit}
        className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-5"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            {editingId ? <Pencil className="w-4 h-4 text-indigo-400" /> : <Plus className="w-4 h-4 text-indigo-400" />}
            <span>{editingId ? "Edit Service" : "Tambah Service Baru"}</span>
          </h3>
          {editingId && (
            <button type="button" onClick={resetForm} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5">Logo (Ikon)</label>
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
            <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5">Title</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="UI/UX Design"
              className={inputClass}
            />
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
        </div>

        <div>
          <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5">Description</label>
          <textarea
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Deskripsi layanan..."
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="flex items-center justify-between">
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

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center space-x-2 shadow-lg shadow-indigo-500/25 transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{editingId ? "Simpan Perubahan" : "Simpan Service"}</span>
          </button>
        </div>
      </form>

      {/* Services Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Table2 className="w-4 h-4 text-indigo-400" />
            <span>Daftar Services ({services.length})</span>
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
                <th className="px-6 py-3 font-semibold">Logo</th>
                <th className="px-6 py-3 font-semibold">Title</th>
                <th className="px-6 py-3 font-semibold">Description</th>
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
                      <span className="text-[11px] text-slate-400 font-mono">{svc.icon}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-white flex items-center space-x-2">
                      <span>{svc.title}</span>
                      {!svc.isActive && <span className="text-[10px] text-slate-500 font-mono">(hidden)</span>}
                    </div>
                    <div className="mt-0.5 text-[11px] text-slate-400 font-mono">Order #{svc.displayOrder}</div>
                  </td>
                  <td className="px-6 py-4 max-w-[420px]">
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{svc.description}</p>
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
            Belum ada service. Tambahkan melalui form di atas.
          </div>
        )}
      </div>
    </div>
  );
}