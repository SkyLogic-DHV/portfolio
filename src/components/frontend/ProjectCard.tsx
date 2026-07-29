/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Project } from "@/types";
import { ExternalLink, ArrowRight, Star } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const tagsList = typeof project.techStack === "string" 
    ? project.techStack.split(",").map(t => t.trim()).filter(Boolean)
    : [];

  return (
    <div className="group relative rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 overflow-hidden flex flex-col">
      {project.featured && (
        <div className="absolute top-3 right-3 z-10 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-md">
          <Star className="w-3 h-3 fill-amber-300" />
          Featured
        </div>
      )}

      <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-700 font-mono text-sm bg-gradient-to-br from-slate-900 to-indigo-950">
            No Image Preview
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tagsList.map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-indigo-950/60 text-indigo-300 border border-indigo-800/40"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
            {project.title}
          </h3>

          <p className="text-slate-400 text-sm mt-2 line-clamp-2">
            {project.shortDesc}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Lihat Detail
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Source Code"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
