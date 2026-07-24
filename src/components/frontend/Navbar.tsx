"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Code2, FolderGit2, User, Mail, ShieldAlert } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Beranda", href: "/", icon: Sparkles },
    { label: "Portfolio", href: "/projects", icon: FolderGit2 },
    { label: "Tentang", href: "/about", icon: User },
    { label: "Kontak", href: "/contact", icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white group">
          <div className="p-2 rounded-lg bg-indigo-600 text-white group-hover:bg-indigo-500 transition-colors">
            <Code2 className="w-5 h-5" />
          </div>
          <span>Portfolio<span className="text-indigo-400">.dev</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" />
            Admin Login
          </Link>
        </div>
      </div>
    </header>
  );
}
