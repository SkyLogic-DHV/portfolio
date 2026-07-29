"use client";

import { useEffect, useState } from "react";
import { Globe, Save } from "lucide-react";

export default function AdminSeoPage() {
  const [settings, setSettings] = useState<any>({
    metaTitle: "",
    metaDescription: "",
    ogImage: "",
    robots: "index, follow",
    sitemap: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
  };

  if (loading) return <div className="text-slate-400 font-mono text-xs">Loading SEO Settings...</div>;

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
          <Globe className="w-6 h-6 text-sky-400" />
          <span>SEO & Meta Configuration</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">SEARCH ENGINE OPTIMIZATION & OPEN GRAPH SETTINGS</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 space-y-6">
        <div>
          <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Meta Title</label>
          <input
            type="text"
            value={settings.metaTitle || ""}
            onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Meta Description</label>
          <textarea
            rows={3}
            value={settings.metaDescription || ""}
            onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2">OG Image URL</label>
            <input
              type="text"
              value={settings.ogImage || ""}
              onChange={(e) => setSettings({ ...settings, ogImage: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Robots Directive</label>
            <input
              type="text"
              value={settings.robots || ""}
              onChange={(e) => setSettings({ ...settings, robots: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Sitemap URL</label>
          <input
            type="text"
            value={settings.sitemap || ""}
            onChange={(e) => setSettings({ ...settings, sitemap: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-500/25 flex items-center space-x-2 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving..." : "Save SEO Settings"}</span>
        </button>
      </form>
    </div>
  );
}
