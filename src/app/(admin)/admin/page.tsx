"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Activity,
  Briefcase,
  Code2,
  Pin,
  FolderOpen,
  CheckCircle2,
  EyeOff,
  Trash2,
  Sparkles,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const [resStats, resNotes] = await Promise.all([
        fetch("/api/analytics/stats"),
        fetch("/api/leave-your-mark"),
      ]);

      if (resStats.ok) {
        const statsData = await resStats.json();
        setStats(statsData);
      }

      if (resNotes.ok) {
        const notesData = await resNotes.json();
        setNotes(notesData);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // Poll every 5 seconds for real-time visitor telemetry
    const interval = setInterval(fetchDashboardData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNoteAction = async (id: string, action: "pin" | "hide" | "delete", currentVal?: boolean) => {
    try {
      if (action === "delete") {
        if (!confirm("Delete this sticky note permanently?")) return;
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
      fetchDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading && !stats) {
    return (
      <div className="py-20 text-center text-slate-400 font-mono text-xs">
        Loading Realtime Telemetry...
      </div>
    );
  }

  const overview = stats?.overview || {};
  const breakdowns = stats?.breakdowns || {};
  const recentVisitors = stats?.recentVisitors || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">System Dashboard</h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            REALTIME VISITOR TELEMETRY & MANAGEMENT
          </p>
        </div>

        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800 text-xs font-semibold text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Realtime Telemetry Active</span>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
            <span>ONLINE</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-black text-emerald-400">{overview.onlineVisitors || 0}</p>
          <p className="text-[10px] text-slate-500 mt-1">Realtime in last 5m</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
            <span>TODAY</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-3xl font-black text-white">{overview.todayVisitors || 0}</p>
          <p className="text-[10px] text-slate-500 mt-1">Visitors today</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
            <span>PROJECTS</span>
            <Briefcase className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-3xl font-black text-white">{overview.totalProjects || 0}</p>
          <p className="text-[10px] text-slate-500 mt-1">Active case studies</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
            <span>TECH STACK</span>
            <Code2 className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-black text-white">{overview.totalStack || 0}</p>
          <p className="text-[10px] text-slate-500 mt-1">Items across 9 categories</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
            <span>STICKY NOTES</span>
            <Pin className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-3xl font-black text-white">{overview.totalLeaveYourMark || 0}</p>
          <p className="text-[10px] text-slate-500 mt-1">Leave Your Mark posts</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
            <span>MEDIA</span>
            <FolderOpen className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-3xl font-black text-white">{overview.totalMedia || 0}</p>
          <p className="text-[10px] text-slate-500 mt-1">Files uploaded</p>
        </div>
      </div>

      {/* Main Grid: Leave Your Mark Moderation & Recent Visitors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Leave Your Mark Moderation */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Pin className="w-4 h-4 text-rose-400" />
              <span>Leave Your Mark Moderation</span>
            </h2>
            <span className="text-xs font-mono text-slate-400">
              {notes.length} Total Notes
            </span>
          </div>

          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-white">{note.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {note.color}
                    </span>
                    {note.isPinned && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">
                        Pinned
                      </span>
                    )}
                    {note.isHidden && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-400">
                        Hidden
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-1">"{note.message}"</p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => handleNoteAction(note.id, "pin", note.isPinned)}
                    title="Toggle Pin"
                    className={`p-2 rounded-lg text-xs font-semibold transition-colors ${
                      note.isPinned
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <Pin className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleNoteAction(note.id, "hide", note.isHidden)}
                    title="Toggle Hide"
                    className={`p-2 rounded-lg text-xs font-semibold transition-colors ${
                      note.isHidden
                        ? "bg-rose-500/20 text-rose-400"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <EyeOff className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleNoteAction(note.id, "delete")}
                    title="Delete Note"
                    className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Recent Visitors Telemetry */}
        <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Recent Visitor Logs</span>
              </h2>
              <span className="text-xs font-mono text-slate-400">Live</span>
            </div>

            <div className="space-y-3">
              {recentVisitors.map((v: any) => (
                <div
                  key={v.id}
                  className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-semibold text-slate-200">
                      {v.path} <span className="text-slate-500">• {v.ip}</span>
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {v.device} / {v.browser} / {v.os}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    {new Date(v.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
