"use client";

import { useEffect, useState } from "react";
import { Briefcase, Plus, Trash2, Edit, X } from "lucide-react";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [form, setForm] = useState({
    title: "",
    thumbnail: "",
    shortDesc: "",
    longDesc: "",
    category: "Website",
    featured: false,
    highlight: "",
    client: "",
    year: "2026",
    duration: "3 Months",
    githubUrl: "",
    demoUrl: "",
    challenge: "",
    solution: "",
    result: "",
  });

  const loadProjects = () => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setIsCreating(false);
    loadProjects();
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/projects/${editingProject.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingProject),
    });
    setEditingProject(null);
    loadProjects();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    loadProjects();
  };

  if (loading) return <div className="text-slate-400 font-mono text-xs">Loading Projects...</div>;

  return (
    <div className="max-w-6xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
            <Briefcase className="w-6 h-6 text-sky-400" />
            <span>Project Portfolio Manager</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            CRUD & MANAGE CASE STUDIES & FEATURED PROJECTS
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleCreate} className="bg-slate-900 border border-indigo-500/40 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white">Create New Project</h3>
            <button type="button" onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            >
              <option value="Website">Website</option>
              <option value="Mobile">Mobile</option>
              <option value="AI">AI</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="UI/UX">UI/UX</option>
              <option value="Automation">Automation</option>
              <option value="Internal Tools">Internal Tools</option>
            </select>
            <input
              type="text"
              placeholder="Thumbnail Image URL"
              value={form.thumbnail}
              onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
            <input
              type="text"
              placeholder="Highlight Badge (e.g. Realtime Multi-Agent Engine)"
              value={form.highlight}
              onChange={(e) => setForm({ ...form, highlight: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
          </div>
          <textarea
            placeholder="Short Description"
            required
            value={form.shortDesc}
            onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-indigo-600"
            />
            <label htmlFor="featured" className="text-xs text-slate-300">Feature on Homepage</label>
          </div>
          <button type="submit" className="px-5 py-2.5 rounded-xl bg-indigo-600 text-xs font-semibold text-white">
            Create Project
          </button>
        </form>
      )}

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <img src={p.thumbnail || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"} alt={p.title} className="w-full h-36 object-cover rounded-xl border border-slate-800 mb-4" />
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400">{p.category}</span>
                {p.featured && <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">Featured</span>}
              </div>
              <h3 className="font-bold text-base text-white">{p.title}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{p.shortDesc}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500">{p.year}</span>
              <button onClick={() => handleDelete(p.id)} className="p-2 text-slate-400 hover:text-rose-400">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
