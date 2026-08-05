"use client";

import { AlertTriangle, CalendarDays, ClipboardList, Clock3, Edit, Plus, RotateCcw, ShieldUser, Trash2, UserCircle2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type ClientProject = {
  id: string;
  title: string;
  clientName?: string;
  description?: string;
  status?: string;
  assignedAdminId?: string | null;
  assignedAdmin?: {
    id: string;
    email: string;
    username?: string;
    name?: string | null;
  } | null;
  orderedAt?: string | null;
  completedAt?: string | null;
  revisionUsed?: number;
  revisionLimit?: number;
  expiresAt?: string | null;
  priority?: string;
  isActive?: boolean;
};

type CurrentAdmin = {
  id: string;
  email: string;
  username?: string;
  name?: string;
};

function todayInputValue() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function normalizeDateOnly(value?: string | null) {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

function localDateFromInput(value?: string | null) {
  if (!value) return null;

  const normalized = normalizeDateOnly(value);
  if (!normalized) return null;

  return new Date(`${normalized}T12:00:00`);
}

function emptyForm() {
  return {
    title: "",
    clientName: "",
    description: "",
    status: "To Do",
    assignedAdminId: "",
    orderedAt: todayInputValue(),
    completedAt: "",
    revisionUsed: 0,
    priority: "Medium",
    isActive: true,
  };
}

function toDateInput(value?: string | null) {
  return normalizeDateOnly(value);
}

function formatDate(value?: string | null) {
  const date = localDateFromInput(value);
  if (!date) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getComputedExpiryDate(project: ClientProject) {
  if (project.status !== "Completed") return null;

  const explicitExpiry = project.expiresAt ? new Date(project.expiresAt) : null;
  if (explicitExpiry && !Number.isNaN(explicitExpiry.getTime())) return explicitExpiry;

  if (!project.completedAt) return null;

  const completedAt = new Date(project.completedAt);
  if (Number.isNaN(completedAt.getTime())) return null;

  const next = new Date(completedAt);
  next.setMonth(next.getMonth() + 1);
  return next;
}

function getExpiryLabel(project: ClientProject) {
  const expiry = getComputedExpiryDate(project);
  if (!expiry) return null;
  const diffDays = Math.ceil((expiry.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return { label: "Expired", tone: "text-rose-400" };
  return { label: `${diffDays} hari lagi`, tone: diffDays <= 7 ? "text-amber-400" : "text-emerald-400" };
}

export default function ClientProjectsPage() {
  const [projects, setProjects] = useState<ClientProject[]>([]);
  const [currentAdmin, setCurrentAdmin] = useState<CurrentAdmin | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [error, setError] = useState("");

  const activeCount = useMemo(() => projects.filter((project) => project.isActive !== false).length, [projects]);
  const expiredCount = useMemo(
    () => projects.filter((project) => getComputedExpiryDate(project)?.getTime() && getComputedExpiryDate(project)!.getTime() < Date.now()).length,
    [projects]
  );
  const completedCount = useMemo(() => projects.filter((project) => project.status === "Completed").length, [projects]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [projectsRes, meRes] = await Promise.all([fetch("/api/client"), fetch("/api/auth/me")]);
      if (projectsRes.ok) setProjects(await projectsRes.json());
      if (meRes.ok) {
        const me = await meRes.json();
        setCurrentAdmin(me.user || null);
      } else {
        setCurrentAdmin(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateForm = () => {
    setEditingId(null);
    setForm(emptyForm());
    setError("");
    setFormOpen(true);
  };

  const openEditForm = (project: ClientProject) => {
    setEditingId(project.id);
    setForm({
      title: project.title || "",
      clientName: project.clientName || "",
      description: project.description || "",
      status: project.status || "To Do",
      assignedAdminId: project.assignedAdminId || project.assignedAdmin?.id || "",
      orderedAt: toDateInput(project.orderedAt) || todayInputValue(),
      completedAt: toDateInput(project.completedAt),
      revisionUsed: Math.min(2, Number(project.revisionUsed || 0)),
      priority: project.priority || "Medium",
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
        revisionUsed: Math.max(0, Math.min(2, Number(form.revisionUsed) || 0)),
        completedAt: form.status === "Completed" ? form.completedAt || todayInputValue() : "",
      };

      const res = await fetch(editingId ? `/api/client/${editingId}` : "/api/client", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal menyimpan client project");

      setFormOpen(false);
      setEditingId(null);
      setForm(emptyForm());
      loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan client project");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus client project ini?")) return;
    await fetch(`/api/client/${id}`, { method: "DELETE" });
    loadData();
  };

  if (loading) return <div className="text-slate-400 font-mono text-xs">Loading Client Projects...</div>;

  return (
    <div className="max-w-7xl space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
            <ClipboardList className="w-6 h-6 text-sky-400" />
            <span>Client Projects</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            TO DO TRACKER FOR ORDER DATE, FINISH DATE, REVISION LIMIT, AND EXPIRY
          </p>
          <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-[11px] text-slate-300">
            <UserCircle2 className="w-3.5 h-3.5 text-sky-400" />
            <span>
              Assigned by: {currentAdmin?.name || currentAdmin?.username || currentAdmin?.email || "logged-in admin"}
            </span>
          </div>
        </div>

        <button
          onClick={openCreateForm}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
          <div className="text-[11px] font-mono text-slate-400">TOTAL</div>
          <div className="mt-2 text-2xl font-black text-white">{projects.length}</div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
          <div className="text-[11px] font-mono text-slate-400">ACTIVE</div>
          <div className="mt-2 text-2xl font-black text-emerald-400">{activeCount}</div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
          <div className="text-[11px] font-mono text-slate-400">EXPIRED</div>
          <div className="mt-2 text-2xl font-black text-rose-400">{expiredCount}</div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
          <div className="text-[11px] font-mono text-slate-400">COMPLETED</div>
          <div className="mt-2 text-2xl font-black text-sky-400">{completedCount}</div>
        </div>
      </div>

      {formOpen && (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 space-y-5 shadow-xl shadow-black/20">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white">{editingId ? "Edit Client Project" : "Create New Client Project"}</h3>
              <p className="text-[11px] text-slate-400 mt-1">Assigned admin is set automatically from the logged-in admin account.</p>
            </div>
            <button type="button" onClick={() => setFormOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {error && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs text-rose-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Project title"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
            <input
              type="text"
              placeholder="Client name"
              value={form.clientName}
              onChange={(e) => setForm({ ...form, clientName: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Revision Needed">Revision Needed</option>
              <option value="Completed">Completed</option>
              <option value="Expired">Expired</option>
            </select>
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <input
              type="date"
              value={form.orderedAt}
              onChange={(e) => setForm({ ...form, orderedAt: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
            <input
              type="date"
              value={form.completedAt}
              onChange={(e) => setForm({ ...form, completedAt: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
            <input
              type="number"
              min={0}
              max={2}
              value={form.revisionUsed}
              onChange={(e) => setForm({ ...form, revisionUsed: Math.max(0, Math.min(2, Number(e.target.value) || 0)) })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
            <label className="flex items-center gap-2 text-xs text-slate-300 px-1">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-indigo-600"
              />
              Active on admin list
            </label>
          </div>

          <textarea
            placeholder="Project description / to-do notes"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white min-h-25"
          />

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
              {saving ? "Saving..." : editingId ? "Update Client" : "Create Client"}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {projects.map((project) => {
          const expiry = getExpiryLabel(project);
          return (
            <div key={project.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400">{project.status || "To Do"}</span>
                    {project.isActive === false && <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-700 text-slate-300">Hidden</span>}
                  </div>
                  <h3 className="font-bold text-base text-white">{project.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{project.description || "No description yet."}</p>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldUser className="w-3.5 h-3.5 text-sky-400" />
                  <span>{project.assignedAdmin?.name || project.assignedAdmin?.username || project.assignedAdmin?.email || "Auto assigned"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Order: {formatDate(project.orderedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock3 className="w-3.5 h-3.5 text-violet-400" />
                  <span>Done: {formatDate(project.completedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span>Revision: {project.revisionUsed || 0}/{project.revisionLimit || 2}</span>
                </div>
                    {project.status === "Completed" && expiry && (
                      <div className="flex items-center gap-2 sm:col-span-2">
                        <AlertTriangle className={`w-3.5 h-3.5 ${expiry.tone}`} />
                        <span className={expiry.tone}>Revision expired: {formatDate(project.expiresAt)} ({expiry.label})</span>
                      </div>
                    )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
