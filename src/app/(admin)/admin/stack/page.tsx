"use client";

import { Code2, Plus, Trash2, Upload } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminStackPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    image: "",
  });

  const loadStack = () => {
    fetch("/api/stack")
      .then((res) => res.json())
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadStack();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/stack", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", image: "" });
    loadStack();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const data = new FormData();
      data.append("name", form.name || file.name);
      data.append("image", file);

      const res = await fetch("/api/stack", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setForm({ name: "", image: "" });
        loadStack();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete tech stack item?")) return;
    await fetch(`/api/stack/${id}`, { method: "DELETE" });
    loadStack();
  };

  if (loading) return <div className="text-slate-400 font-mono text-xs">Loading Tech Stack...</div>;

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
          <Code2 className="w-6 h-6 text-amber-400" />
          <span>Tech Stack</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">MANAGE ONLY STACK NAME AND LOGO</p>
      </div>

      <form onSubmit={handleCreate} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white">Add Stack Item</h3>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4">
          <input
            type="text"
            placeholder="Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
          />
          <label className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold cursor-pointer flex items-center gap-1.5 transition-colors">
            <Upload className="w-3.5 h-3.5 text-indigo-400" />
            <span>{uploading ? "Uploading..." : "Upload Logo"}</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
        </div>
        <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 text-xs font-semibold text-white flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Add Stack</span>
        </button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
            <div className="h-20 rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-center overflow-hidden">
              {item.image ? (
                <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
              ) : (
                <span className="text-xs text-slate-500">No logo</span>
              )}
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-white truncate">{item.name}</span>
              <button onClick={() => handleDelete(item.id)} className="text-slate-500 hover:text-rose-400">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
