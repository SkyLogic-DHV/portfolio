"use client";

import { useEffect, useState } from "react";
import { Pin, EyeOff, Trash2, Search } from "lucide-react";

export default function AdminLeaveYourMarkPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadNotes = () => {
    fetch(`/api/leave-your-mark?search=${encodeURIComponent(search)}`)
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadNotes();
  }, [search]);

  const handleAction = async (id: string, action: "pin" | "hide" | "delete", currentVal?: boolean) => {
    if (action === "delete") {
      if (!confirm("Delete sticky note?")) return;
      await fetch(`/api/leave-your-mark/${id}`, { method: "DELETE" });
    } else if (action === "pin") {
      await fetch(`/api/leave-your-mark/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPinned: !currentVal }),
      });
    } else if (action === "hide") {
      await fetch(`/api/leave-your-mark/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isHidden: !currentVal }),
      });
    }
    loadNotes();
  };

  if (loading && notes.length === 0) return <div className="text-slate-400 font-mono text-xs">Loading Board...</div>;

  return (
    <div className="max-w-5xl space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
            <Pin className="w-6 h-6 text-rose-400" />
            <span>Leave Your Mark Moderation</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">MODERATE VISITOR STICKY NOTES & PINNED POSTS</p>
        </div>

        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 pl-9"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.map((n) => (
          <div key={n.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-bold text-sm text-white">{n.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">{n.color}</span>
                {n.isPinned && <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">Pinned</span>}
                {n.isHidden && <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-400">Hidden</span>}
              </div>
              <p className="text-xs text-slate-300">"{n.message}"</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500">{new Date(n.createdAt).toLocaleDateString()}</span>
              <div className="flex items-center space-x-2">
                <button onClick={() => handleAction(n.id, "pin", n.isPinned)} className={`p-1.5 rounded-lg text-xs ${n.isPinned ? "bg-amber-500/20 text-amber-400" : "text-slate-400"}`}>
                  <Pin className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleAction(n.id, "hide", n.isHidden)} className={`p-1.5 rounded-lg text-xs ${n.isHidden ? "bg-rose-500/20 text-rose-400" : "text-slate-400"}`}>
                  <EyeOff className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleAction(n.id, "delete")} className="p-1.5 text-slate-400 hover:text-rose-400">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
