import { prisma } from "@/lib/db";
import ProjectCard from "@/components/frontend/ProjectCard";
import { FolderGit2 } from "lucide-react";

export const revalidate = 0;

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ year: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div>
        <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold mb-2">
          <FolderGit2 className="w-4 h-4" />
          <span>GALERI KARYA</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Semua Project Portfolio
        </h1>
        <p className="text-slate-400 mt-2 text-base">
          Kumpulan aplikasi web, tools, dan eksperimen software yang pernah dikerjakan.
        </p>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-2xl bg-slate-900/40 border border-slate-800 text-center">
          <p className="text-slate-400">Belum ada project yang ditambahkan di database.</p>
        </div>
      )}
    </div>
  );
}
