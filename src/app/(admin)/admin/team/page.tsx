"use client";

import { AlertCircle, Send, ShieldPlus, Users } from "lucide-react";
import { useEffect, useState } from "react";

type AdminRow = {
  id: string;
  email: string;
  username?: string;
  name?: string | null;
  createdAt?: string;
  createdBy?: {
    id: string;
    email: string;
    username?: string;
    name?: string | null;
  } | null;
};

export default function AddAdminPage() {
  const [admins, setAdmins] = useState<AdminRow[]>([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadAdmins = () => {
    fetch("/api/admin/listAdmins")
      .then((res) => res.json())
      .then((data) => setAdmins(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/addAdmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal menambahkan admin");

      setEmail("");
      loadAdmins();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menambahkan admin");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-slate-400 font-mono text-xs">Loading Admin List...</div>;

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
          <ShieldPlus className="w-6 h-6 text-indigo-400" />
          <span>Add Admin</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">
          ADD EMAIL ONLY. ACCOUNT WILL BE TRACKED BY THE LOGGED-IN ADMIN.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-white font-semibold text-sm">
          <Send className="w-4 h-4 text-sky-400" />
          <span>Invite Admin by Email</span>
        </div>

        {error && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
          <input
            type="email"
            required
            placeholder="admin@skylogic.id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold text-xs"
          >
            {saving ? "Adding..." : "Add Admin"}
          </button>
        </div>
      </form>

      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            <span>Registered Admins</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">{admins.length} total</span>
        </div>

        <div className="space-y-3">
          {admins.map((admin) => (
            <div key={admin.id} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-white text-sm">{admin.email}</p>
                <p className="text-xs text-slate-400 font-mono">{admin.username || "no-username"}</p>
              </div>
              <div className="text-xs text-slate-400">
                <span className="text-slate-500">Added by:</span>{" "}
                {admin.createdBy?.email || admin.createdBy?.username || "system"}
              </div>
            </div>
          ))}

          {admins.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-950/50 p-8 text-center text-xs text-slate-500">
              No admin accounts yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
