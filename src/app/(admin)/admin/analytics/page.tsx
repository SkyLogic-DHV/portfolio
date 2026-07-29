"use client";

import { useEffect, useState } from "react";
import { BarChart3, Users, Smartphone, Monitor, Globe } from "lucide-react";

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-slate-400 font-mono text-xs">Loading Visitor Analytics...</div>;

  const overview = stats?.overview || {};
  const breakdowns = stats?.breakdowns || {};

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
          <BarChart3 className="w-6 h-6 text-emerald-400" />
          <span>Realtime Visitor Analytics</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">TELEMETRY BREAKDOWNS BY DEVICE, BROWSER & GEOGRAPHY</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <p className="text-xs font-mono text-slate-400">TOTAL VISITORS</p>
          <p className="text-3xl font-black text-white mt-1">{overview.totalVisitors || 0}</p>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <p className="text-xs font-mono text-slate-400">ONLINE NOW</p>
          <p className="text-3xl font-black text-emerald-400 mt-1">{overview.onlineVisitors || 0}</p>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <p className="text-xs font-mono text-slate-400">THIS WEEK</p>
          <p className="text-3xl font-black text-sky-400 mt-1">{overview.weekVisitors || 0}</p>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <p className="text-xs font-mono text-slate-400">THIS MONTH</p>
          <p className="text-3xl font-black text-indigo-400 mt-1">{overview.monthVisitors || 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Device Breakdown */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center space-x-2">
            <Monitor className="w-4 h-4 text-sky-400" />
            <span>Device Distribution</span>
          </h3>
          <div className="space-y-3">
            {Object.entries(breakdowns.device || {}).map(([device, count]: [string, any]) => (
              <div key={device} className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold">{device}</span>
                <span className="font-mono text-indigo-400">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Browser Breakdown */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center space-x-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>Browser Usage</span>
          </h3>
          <div className="space-y-3">
            {Object.entries(breakdowns.browser || {}).map(([browser, count]: [string, any]) => (
              <div key={browser} className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold">{browser}</span>
                <span className="font-mono text-emerald-400">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* OS Breakdown */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center space-x-2">
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>Operating System</span>
          </h3>
          <div className="space-y-3">
            {Object.entries(breakdowns.os || {}).map(([os, count]: [string, any]) => (
              <div key={os} className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold">{os}</span>
                <span className="font-mono text-amber-400">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
