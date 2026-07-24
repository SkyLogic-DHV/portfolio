/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { ArrowLeft, ExternalLink, Calendar, Tag, Star } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { Project } from "@/types";

export const revalidate = 0;

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = (await prisma.project.findFirst({
    where: {
      OR: [{ slug: slug }, { id: slug }],
    },
  })) as Project | null;

  if (!project) {
    notFound();
  }

  const tagsList = typeof project.tags === "string"
    ? project.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : project.tags || [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Galeri Project
      </Link>

      <div className="space-y-4">
        {project.featured && (
          <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold px-2.5 py-1 rounded-full">
            <Star className="w-3.5 h-3.5 fill-amber-300" />
            Featured Project
          </span>
        )}

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {project.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
            <span>
              {new Date(project.createdAt).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-indigo-400" />
            <span>{tagsList.join(", ")}</span>
          </div>
        </div>
      </div>

      {project.image && (
        <div className="rounded-2xl overflow-hidden border border-slate-800 max-h-[450px]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-2">Ringkasan Project</h3>
          <p className="text-slate-300 text-base leading-relaxed">
            {project.description}
          </p>
        </div>

        {project.content && (
          <div className="pt-6 border-t border-slate-800">
            <h3 className="text-lg font-bold text-white mb-3">Detail & Fitur Utama</h3>
            <div className="text-slate-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {project.content}
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-slate-800 flex flex-wrap gap-4">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              Kunjungi Live Demo
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-all"
            >
              <GithubIcon className="w-4 h-4" />
              Lihat Repository GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
