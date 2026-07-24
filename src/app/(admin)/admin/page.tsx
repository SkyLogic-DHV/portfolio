/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { prisma } from "@/lib/db";
import { FolderGit2, Star, PlusCircle, ExternalLink, Edit, Layers } from "lucide-react";
import { Project } from "@/types";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  let projects: Project[] = [];
  try {
    projects = (await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    })) as Project[];
  } catch (error) {
    console.error("Failed to fetch projects for admin dashboard:", error);
  }

  const totalProjects = projects.length;
  const featuredProjects = projects.filter((p) => p.featured).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-slate-400">Ringkasan statistik dan manajemen konten portfolio.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            Tambah Project Baru
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Total Project</p>
            <p className="text-3xl font-extrabold text-white mt-1">{totalProjects}</p>
          </div>
          <div className="p-3 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <FolderGit2 className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Featured Projects</p>
            <p className="text-3xl font-extrabold text-amber-400 mt-1">{featuredProjects}</p>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Star className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Status Backend API</p>
            <p className="text-sm font-bold text-emerald-400 mt-2 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              Connected (Prisma SQLite)
            </p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Layers className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Projects Table */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Project Terbaru</h2>
          <Link
            href="/admin/projects"
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            Kelola Semua →
          </Link>
        </div>

        {projects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs font-semibold text-slate-400 uppercase">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Judul Project</th>
                  <th className="p-3.5">Tags</th>
                  <th className="p-3.5">Featured</th>
                  <th className="p-3.5">Tanggal</th>
                  <th className="p-3.5 rounded-r-xl text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {projects.slice(0, 5).map((project) => (
                  <tr key={project.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 font-semibold text-white">
                      <div className="flex items-center gap-3">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover bg-slate-950"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-mono">
                            No Img
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-white text-sm">{project.title}</p>
                          <span className="text-xs text-slate-500 font-mono">/{project.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 text-xs text-slate-400 max-w-[200px] truncate">
                      {project.tags}
                    </td>
                    <td className="p-3.5">
                      {project.featured ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          Featured
                        </span>
                      ) : (
                        <span className="text-xs text-slate-600">-</span>
                      )}
                    </td>
                    <td className="p-3.5 text-xs text-slate-400">
                      {new Date(project.createdAt).toLocaleDateString("id-ID")}
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/admin/projects/${project.id}`}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-400 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/projects/${project.slug}`}
                          target="_blank"
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                          title="Preview"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-slate-500 py-6 text-center">Belum ada data project.</p>
        )}
      </div>
    </div>
  );
}
