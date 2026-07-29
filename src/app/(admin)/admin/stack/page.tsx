"use client";

import { useEffect, useState } from "react";
import { Code2, Plus, Trash2 } from "lucide-react";

const CATEGORIES = [
  "Programming Language",
  "Framework",
  "Library",
  "Database",
  "Cloud",
  "DevOps",
  "Security",
  "Design",
  "Tools",
];

export default function AdminStackPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    color: "#6366F1",
    level: "Expert",
    category: "Framework",
  });

  const loadStack = () => {
    fetch("/api/stack")
      .then((res) => res.json())
      .then((data) => setItems(data))
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
    setForm({ name: "", color: "#6366F1", level: "Expert", category: "Framework" });
    loadStack();
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
          <span>Tech Stack & Toolkit Manager</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">MANAGE ITEMS ACROSS 9 CATEGORIES</p>
      </div>

      <form onSubmit={handleCreate} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white">Add Stack Item</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Name (e.g. Next.js 15)"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Hex Color (#6366F1)"
            value={form.color}
            onChange={(e) => setForm({ ...form, color: e.target.value })}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
          />
          <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 text-xs font-semibold text-white">
            Add Stack
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {CATEGORIES.map((cat) => {
          const catItems = items.filter((i) => i.category === cat);
          if (catItems.length === 0) return null;

          return (
            <div key={cat} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
              <h4 className="text-xs font-mono uppercase text-slate-400 mb-3">{cat} ({catItems.length})</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {catItems.map((item) => (
                  <div key={item.id} className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs font-semibold text-white">{item.name}</span>
                    </div>
                    <button onClick={() => handleDelete(item.id)} className="text-slate-500 hover:text-rose-400">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
