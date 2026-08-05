"use client";

import { Briefcase, CheckCircle2, Edit, Plus, Sparkles, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type ProjectRecord = {
  id: string;
  title: string;
  slug: string;
  thumbnail?: string;
  shortDesc?: string;
  longDesc?: string;
  category?: string;
  featured?: boolean;
  highlight?: string;
  projectType?: string;
  githubUrl?: string;
  demoUrl?: string;
  year?: string;
  duration?: string;
  status?: string;
  challenge?: string;
  solution?: string;
  result?: string;
  isActive?: boolean;
};

const currentYear = new Date().getFullYear().toString();

function emptyForm() {
  return {
    title: "",
    slug: "",
    thumbnail: "",
    shortDesc: "",
    longDesc: "",
    category: "Website",
    featured: true,
    highlight: "",
    projectType: "Enterprise",
    githubUrl: "",
    demoUrl: "",
    year: currentYear,
    duration: "3 Months",
    status: "In Progress",
    challenge: "",
    solution: "",
    result: "",
    techStack: "",
    screenshots: "[]",
    videoDemo: "",
    seoImage: "",
    isActive: true,
  };
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [error, setError] = useState("");

  const featuredCount = useMemo(() => projects.filter((project) => project.featured).length, [projects]);
  const activeCount = useMemo(() => projects.filter((project) => project.isActive !== false).length, [projects]);

  const loadProjects = () => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openCreateForm = () => {
    setEditingProjectId(null);
    setForm(emptyForm());
    setError("");
    setFormOpen(true);
  };

  const openEditForm = (project: ProjectRecord) => {
    setEditingProjectId(project.id);
    setForm({
      title: project.title || "",
      slug: project.slug || "",
      thumbnail: project.thumbnail || "",
      shortDesc: project.shortDesc || "",
      longDesc: project.longDesc || "",
      category: project.category || "Website",
      featured: Boolean(project.featured),
      highlight: project.highlight || "",
      projectType: project.projectType || "Enterprise",
      githubUrl: project.githubUrl || "",
      demoUrl: project.demoUrl || "",
      year: project.year || currentYear,
      duration: project.duration || "3 Months",
      status: project.status || "In Progress",
      challenge: project.challenge || "",
      solution: project.solution || "",
      result: project.result || "",
      techStack: "",
      screenshots: "[]",
      videoDemo: "",
      seoImage: "",
      isActive: project.isActive !== false,
    });
    setError("");
    setFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        ...form,
        techStack: form.techStack,
        screenshots: form.screenshots,
      };

      const res = await fetch(editingProjectId ? `/api/projects/${editingProjectId}` : "/api/projects", {
        method: editingProjectId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal menyimpan project");

      setFormOpen(false);
      setEditingProjectId(null);
      setForm(emptyForm());
      loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan project");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus project ini?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    loadProjects();
  };

  if (loading) return <div className="text-slate-400 font-mono text-xs">Loading Projects...</div>;

  return (
    <div className="max-w-7xl space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
            <Briefcase className="w-6 h-6 text-sky-400" />
            <span>Featured Engineering Projects</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            MANAGE PUBLIC PROJECT SHOWCASE SHOWN ON THE WEBSITE
          </p>
        </div>

        <button
          onClick={openCreateForm}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
          <div className="text-[11px] font-mono text-slate-400">TOTAL PROJECTS</div>
          <div className="mt-2 text-2xl font-black text-white">{projects.length}</div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
          <div className="text-[11px] font-mono text-slate-400">FEATURED</div>
          <div className="mt-2 text-2xl font-black text-amber-400">{featuredCount}</div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
          <div className="text-[11px] font-mono text-slate-400">ACTIVE</div>
          <div className="mt-2 text-2xl font-black text-emerald-400">{activeCount}</div>
        </div>
      </div>

      {formOpen && (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 space-y-5 shadow-xl shadow-black/20">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white">{editingProjectId ? "Edit Project" : "Create New Project"}</h3>
              <p className="text-[11px] text-slate-400 mt-1">Only the public engineering showcase fields are kept here.</p>
            </div>
            <button type="button" onClick={() => setFormOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {error && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs text-rose-300 flex items-center gap-2">
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
            <input
              type="text"
              placeholder="Slug"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
            />
            <input
              type="text"
              placeholder="Thumbnail URL"
              value={form.thumbnail}
              onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
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
              placeholder="Highlight Badge"
              value={form.highlight}
              onChange={(e) => setForm({ ...form, highlight: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white md:col-span-2"
            />
          </div>

          <textarea
            placeholder="Short Description"
            required
            value={form.shortDesc}
            onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white min-h-21"
          />

          <textarea
            placeholder="Long Description"
            value={form.longDesc}
            onChange={(e) => setForm({ ...form, longDesc: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white min-h-25"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="url"
              placeholder="GitHub URL"
              value={form.githubUrl}
              onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
            <input
              type="url"
              placeholder="Demo URL"
              value={form.demoUrl}
              onChange={(e) => setForm({ ...form, demoUrl: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
            <input
              type="text"
              placeholder="Project Type"
              value={form.projectType}
              onChange={(e) => setForm({ ...form, projectType: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
            <input
              type="text"
              placeholder="Year"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
            <input
              type="text"
              placeholder="Duration"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            >
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <textarea
              placeholder="Challenge"
              value={form.challenge}
              onChange={(e) => setForm({ ...form, challenge: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white min-h-21"
            />
            <textarea
              placeholder="Solution"
              value={form.solution}
              onChange={(e) => setForm({ ...form, solution: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white min-h-21"
            />
            <textarea
              placeholder="Result"
              value={form.result}
              onChange={(e) => setForm({ ...form, result: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white min-h-21"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Tech Stack JSON or comma list"
              value={form.techStack}
              onChange={(e) => setForm({ ...form, techStack: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
            <input
              type="text"
              placeholder="Screenshot JSON"
              value={form.screenshots}
              onChange={(e) => setForm({ ...form, screenshots: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
          </div>

          <div className="flex items-center justify-between gap-3 flex-wrap">
            <label className="flex items-center gap-2 text-xs text-slate-300">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-indigo-600"
              />
              Featured on homepage
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-300">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-indigo-600"
              />
              Active on public site
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white text-xs font-semibold"
            >
              {saving ? "Saving..." : editingProjectId ? "Update Project" : "Create Project"}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between gap-5">
            <div>
              <img
                src={project.thumbnail || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"}
                alt={project.title}
                className="w-full h-36 object-cover rounded-xl border border-slate-800 mb-4"
              />
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400">{project.category || "Website"}</span>
                {project.featured && <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 flex items-center gap-1"><Sparkles className="w-3 h-3" />Featured</span>}
                {project.isActive === false && <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-700 text-slate-300">Hidden</span>}
              </div>
              <h3 className="font-bold text-base text-white">{project.title}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{project.shortDesc}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{project.year || currentYear}</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => openEditForm(project)} className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(project.id)} className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-rose-400 hover:bg-rose-500/10">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
