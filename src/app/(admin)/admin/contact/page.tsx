"use client";

import { useEffect, useState } from "react";
import { Mail, Save } from "lucide-react";

export default function AdminContactPage() {
  const [contact, setContact] = useState<any>({
    email: "",
    whatsapp: "",
    instagram: "",
    linkedin: "",
    github: "",
    discord: "",
    telegram: "",
    address: "",
    googleMapsUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => setContact(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });
    setSaving(false);
  };

  if (loading) return <div className="text-slate-400 font-mono text-xs">Loading Contact Info...</div>;

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
          <Mail className="w-6 h-6 text-sky-400" />
          <span>Contact Information</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">EDIT CONTACT DETAILS & SOCIAL CHANNELS</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Email</label>
            <input
              type="email"
              value={contact.email || ""}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2">WhatsApp Number</label>
            <input
              type="text"
              value={contact.whatsapp || ""}
              onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2">GitHub URL</label>
            <input
              type="text"
              value={contact.github || ""}
              onChange={(e) => setContact({ ...contact, github: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2">LinkedIn URL</label>
            <input
              type="text"
              value={contact.linkedin || ""}
              onChange={(e) => setContact({ ...contact, linkedin: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Instagram URL</label>
            <input
              type="text"
              value={contact.instagram || ""}
              onChange={(e) => setContact({ ...contact, instagram: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Discord Invite Link</label>
            <input
              type="text"
              value={contact.discord || ""}
              onChange={(e) => setContact({ ...contact, discord: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Office Address</label>
          <input
            type="text"
            value={contact.address || ""}
            onChange={(e) => setContact({ ...contact, address: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-500/25 flex items-center space-x-2 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving..." : "Save Contact Info"}</span>
        </button>
      </form>
    </div>
  );
}
