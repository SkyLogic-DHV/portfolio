"use client";

import { useEffect, useState } from "react";
import { Sparkles, Save, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminHeroPage() {
  const [hero, setHero] = useState<any>({
    title: "",
    subtitle: "",
    description: "",
    ctaButton: "",
    ctaLink: "",
    bgGradient: "",
    badge: "",
    isOpenForProject: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data) => setHero(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hero),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update hero");

      setHero(data);
      setMessage({ type: "success", text: "Hero section updated successfully!" });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-slate-400 font-mono text-xs">Loading Hero Settings...</div>;
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <span>Hero Section Customizer</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            CUSTOMIZE PUBLIC HOMEPAGE BANNER DATA
          </p>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center space-x-2 ${
            message.type === "success"
              ? "bg-emerald-950/60 border border-emerald-800 text-emerald-300"
              : "bg-rose-950/60 border border-rose-800 text-rose-300"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Title</label>
            <input
              type="text"
              value={hero.title || ""}
              onChange={(e) => setHero({ ...hero, title: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Subtitle</label>
            <input
              type="text"
              value={hero.subtitle || ""}
              onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Description</label>
          <textarea
            rows={4}
            value={hero.description || ""}
            onChange={(e) => setHero({ ...hero, description: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2">CTA Button Text</label>
            <input
              type="text"
              value={hero.ctaButton || ""}
              onChange={(e) => setHero({ ...hero, ctaButton: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2">CTA Link</label>
            <input
              type="text"
              value={hero.ctaLink || ""}
              onChange={(e) => setHero({ ...hero, ctaLink: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Top Badge Text</label>
          <input
            type="text"
            value={hero.badge || ""}
            onChange={(e) => setHero({ ...hero, badge: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-3 pt-4 border-t border-slate-800">
          <input
            type="checkbox"
            id="isOpenForProject"
            checked={Boolean(hero.isOpenForProject)}
            onChange={(e) => setHero({ ...hero, isOpenForProject: e.target.checked })}
            className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-0"
          />
          <label htmlFor="isOpenForProject" className="text-xs font-semibold text-slate-300">
            Show "Open for Projects" Badge on Homepage
          </label>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-500/25 flex items-center space-x-2 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
