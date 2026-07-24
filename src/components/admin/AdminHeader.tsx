"use client";

import { Bell } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="h-16 bg-slate-900/60 border-b border-slate-800 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="text-sm text-slate-400 font-medium">
        Portfolio Management System
      </div>

      <div className="flex items-center gap-4">
        <button
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Notifikasi"
        >
          <Bell className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
          <div className="w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 flex items-center justify-center font-bold text-xs">
            A
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-white">Administrator</p>
            <p className="text-[10px] text-slate-400">admin@portfolio.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
