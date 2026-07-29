"use client";

import { useEffect, useState } from "react";
import { Settings, Save } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>({
    siteName: "",
    logo: "",
    favicon: "",
    footerText: "",
    copyright: "",
    primaryColor: "#6366F1",
    secondaryColor: "#06B6D4",
    darkModeDefault: true,
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

  if (loading) return <div className="text-slate-400 font-mono text-xs">Loading Settings...</div>;

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
          <Settings className="w-6 h-6 text-indigo-400" />
          <span>Global Website Settings</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">BRANDING, FOOTER & COLOR PALETTE</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Website Name</label>
            <input
              type="text"
              value={settings.siteName || ""}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Logo URL</label>
            <input
              type="text"
              value={settings.logo || ""}
              onChange={(e) => setSettings({ ...settings, logo: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Footer Description</label>
          <input
            type="text"
            value={settings.footerText || ""}
            onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Copyright Statement</label>
          <input
            type="text"
            value={settings.copyright || ""}
            onChange={(e) => setSettings({ ...settings, copyright: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-500/25 flex items-center space-x-2 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving..." : "Save Website Settings"}</span>
        </button>
      </form>
    </div>
  );
}
