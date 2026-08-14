"use client";

import {
  BarChart3,
  Bell,
  Briefcase,
  ClipboardList,
  Code2,
  Globe,
  Layers,
  LayoutGrid,
  LayoutDashboard,
  LogOut,
  Menu,
  Pin,
  Search,
  Settings,
  User,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const MENU_ITEMS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Add Admin", href: "/admin/team", icon: Users },
  { name: "Projects", href: "/admin/projects", icon: Briefcase },
  { name: "Client", href: "/admin/client", icon: ClipboardList },
  { name: "Pricing", href: "/admin/pricing", icon: Layers },
  { name: "Services", href: "/admin/services", icon: LayoutGrid },
  { name: "Stack", href: "/admin/stack", icon: Code2 },
  { name: "Leave Your Mark", href: "/admin/leave-your-mark", icon: Pin },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "SEO", href: "/admin/seo", icon: Globe },
  { name: "Settings", href: "/admin/settings", icon: Settings },
  { name: "Profile", href: "/admin/profile", icon: User },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#070A11] text-slate-100 flex font-sans">
      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0A0E17] border-r border-slate-800/80 p-4 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Logo */}
          <div className="flex items-center justify-between px-3 py-3 mb-6 border-b border-slate-800/80">
            <Link href="/" className="flex items-center space-x-1">
              <span className="text-xl font-bold tracking-tight text-white">Sky</span>
              <span className="text-xl font-bold tracking-tight text-white">
                L<span className="inline-block w-2 h-2 rounded-full bg-amber-400 mx-0.5" />
                gic
              </span>
              <span className="ml-2 px-1.5 py-0.5 rounded bg-indigo-500/20 text-[10px] font-mono font-bold text-indigo-400">
                ADMIN
              </span>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="space-y-1">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-indigo-600/90 text-white shadow-lg shadow-indigo-600/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center text-xs font-bold">
                A
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">SuperAdmin</p>
                <p className="text-[10px] text-slate-500 truncate">admin@skylogic.id</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 border-b border-slate-800/80 bg-[#0A0E17]/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Global Search Bar */}
            <div className="relative hidden sm:block w-64">
              <input
                type="text"
                placeholder="Search resources, projects..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors pl-9"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-900 relative">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-1.5 right-1.5" />
            </button>

            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              View Site ↗
            </Link>
          </div>
        </header>

        {/* Page View */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}