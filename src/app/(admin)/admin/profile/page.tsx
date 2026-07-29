"use client";

import { useEffect, useState } from "react";
import { User, ShieldCheck } from "lucide-react";

export default function AdminProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
          <User className="w-6 h-6 text-indigo-400" />
          <span>Admin Profile</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">SUPERADMIN ACCOUNT INFORMATION & ROLES</p>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-indigo-500/20 border-2 border-indigo-500/40 text-indigo-400 flex items-center justify-center text-xl font-bold">
            SA
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user?.username || "admin"}</h2>
            <p className="text-xs text-slate-400 font-mono">{user?.email || "admin@skylogic.id"}</p>
            <span className="inline-block mt-2 px-2.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-[10px] font-mono font-bold text-emerald-400">
              ROLE: {user?.role || "ADMIN"}
            </span>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 text-xs text-amber-400 bg-amber-950/40 border border-amber-800/60 rounded-xl p-4">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Passwordless OTP Security Enabled. Logins require a single-use 6-digit email code.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
