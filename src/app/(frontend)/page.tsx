import Link from "next/link";
import { prisma } from "@/lib/db";
import ProjectCard from "@/components/frontend/ProjectCard";
import { ArrowRight, Sparkles, Code, Terminal, ShieldCheck } from "lucide-react";
import { Project } from "@/types";

export const revalidate = 0; // Dynamic fetch

async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const projects = await prisma.project.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    });
    return projects as Project[];
  } catch (error) {
    console.error("Failed to fetch featured projects:", error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  const skills = [
    { name: "Next.js 16 / React 19", category: "Frontend", level: "Expert" },
    { name: "TypeScript / JavaScript", category: "Language", level: "Advanced" },
    { name: "Tailwind CSS / Vanilla CSS", category: "Styling", level: "Expert" },
    { name: "Node.js / Express / APIs", category: "Backend", level: "Advanced" },
    { name: "Prisma ORM / SQLite / Postgres", category: "Database", level: "Advanced" },
    { name: "Git / CI/CD / Vercel", category: "DevOps", level: "Intermediate" },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fullstack Developer & UI Specialist</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
            Membangun Aplikasi Web <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Modern & Performa Tinggi
            </span>
          </h1>

          <p className="mt-6 text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Selamat datang! Ini adalah portfolio interaktif yang dilengkapi dengan Dashboard Admin untuk pengelolaan konten secara langsung dari backend API.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/25"
            >
              Lihat Semua Project
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-medium text-sm transition-all"
            >
              Hubungi Saya
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold mb-1">
              <Code className="w-4 h-4" />
              <span>KARYA UNGGULAN</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Project Pilihan</h2>
          </div>
          <Link
            href="/projects"
            className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            Lihat semua ({featuredProjects.length}+) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-2xl bg-slate-900/40 border border-slate-800 text-center">
            <p className="text-slate-400">Belum ada project unggulan yang dimasukkan di admin panel.</p>
          </div>
        )}
      </section>

      {/* Skills Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 text-indigo-400 text-sm font-semibold mb-1">
              <Terminal className="w-4 h-4" />
              <span>KEAHLIAN & TEKNOLOGI</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Tech Stack</h2>
            <p className="text-slate-400 text-sm mt-2">
              Teknologi terkini yang digunakan dalam pembuatan web apps dan backend services.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((skill, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-indigo-500/40 transition-all flex items-center justify-between"
              >
                <div>
                  <h4 className="font-semibold text-white text-sm">{skill.name}</h4>
                  <span className="text-xs text-slate-500">{skill.category}</span>
                </div>
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-900/50">
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admin Feature Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-purple-950/60 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 px-2.5 py-0.5 rounded-full bg-indigo-900/40 border border-indigo-700/50">
              <ShieldCheck className="w-3.5 h-3.5" />
              ADMIN DASHBOARD READY
            </div>
            <h3 className="text-2xl font-bold text-white">Ingin Mengelola Konten Portfolio?</h3>
            <p className="text-slate-400 text-sm max-w-xl">
              Masuk ke Admin Panel untuk menambah, mengedit, atau menghapus project dan galeri karya Anda melalui backend API.
            </p>
          </div>
          <Link
            href="/login"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all whitespace-nowrap shadow-lg shadow-indigo-600/30"
          >
            Buka Admin Dashboard
          </Link>
        </div>
      </section>
    </div>
  );
}
