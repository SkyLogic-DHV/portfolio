"use client";

import { useEffect, useState } from "react";
import { Layers, Plus, Trash2 } from "lucide-react";

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", description: "", icon: "Code", cta: "Learn More" });

  const loadServices = () => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ title: "", description: "", icon: "Code", cta: "Learn More" });
    loadServices();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete service?")) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    loadServices();
  };

  if (loading) return <div className="text-slate-400 font-mono text-xs">Loading Services...</div>;

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
          <Layers className="w-6 h-6 text-indigo-400" />
          <span>Services Manager</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">EDIT COMPANY CAPABILITIES & SERVICES</p>
      </div>

      <form onSubmit={handleCreate} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white">Add New Service</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Service Title"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
          />
          <input
            type="text"
            placeholder="Icon (Code, Smartphone, Cpu, ShieldCheck, Layout, Workflow)"
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
          />
        </div>
        <textarea
          placeholder="Service Description"
          required
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
        />
        <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-xs font-semibold text-white">
          Create Service
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((s) => (
          <div key={s.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex items-start justify-between">
            <div>
              <h4 className="font-bold text-sm text-white">{s.title}</h4>
              <p className="text-xs text-slate-400 mt-1">{s.description}</p>
            </div>
            <button onClick={() => handleDelete(s.id)} className="p-2 text-slate-400 hover:text-rose-400">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
