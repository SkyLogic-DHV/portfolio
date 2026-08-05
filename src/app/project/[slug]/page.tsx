import { prisma } from "@/lib/db";
import Link from "next/link";

type Props = { params: { slug: string } };

export default async function ProjectPage({ params }: Props) {
  const { slug } = params ?? {};

  if (!slug) {
    return (
      <main className="max-w-4xl mx-auto py-24 px-4">
        <h1 className="text-2xl font-bold">Missing project slug</h1>
        <p className="mt-4 text-sm text-slate-500">This page requires a project slug in the URL.</p>
        <Link href="/">Back to home</Link>
      </main>
    );
  }

  const project = await prisma.project.findUnique({ where: { slug } });

  if (!project) {
    return (
      <main className="max-w-4xl mx-auto py-24 px-4">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <p className="mt-4 text-sm text-slate-500">No project matches the slug: {slug}</p>
        <Link href="/">Back to home</Link>
      </main>
    );
  }

  let gallery: string[] = [];
  try {
    gallery = JSON.parse(project.gallery || "[]");
  } catch {
    gallery = [];
  }

  let tech: string[] = [];
  try {
    tech = JSON.parse(project.techStack || "[]");
  } catch {
    tech = project.techStack ? project.techStack.split(",").map((s) => s.trim()) : [];
  }

  return (
    <main className="max-w-4xl mx-auto py-16 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <div className="text-sm text-slate-500 mt-2">{project.year} • {project.duration} • {project.category}</div>
      </div>

      <div className="space-y-6">
        <img src={project.thumbnail || (gallery[0] ?? "/uploads/placeholder.png")} alt={project.title} className="w-full h-80 object-cover rounded-lg border" />

        <div className="prose max-w-none">
          <h3>Overview</h3>
          <p>{project.longDesc || project.shortDesc}</p>
        </div>

        {project.challenge && (
          <div className="prose max-w-none">
            <h4>Challenge</h4>
            <p>{project.challenge}</p>
          </div>
        )}

        {project.solution && (
          <div className="prose max-w-none">
            <h4>Solution</h4>
            <p>{project.solution}</p>
          </div>
        )}

        {project.result && (
          <div className="prose max-w-none bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
            <h4>Impact & Result</h4>
            <p>{project.result}</p>
          </div>
        )}

        {tech.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {tech.map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded bg-slate-100 border text-slate-700">{t}</span>
              ))}
            </div>
          </div>
        )}

        {gallery.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Gallery</h4>
            <div className="grid grid-cols-2 gap-3">
              {gallery.map((g, i) => (
                <img key={i} src={g} alt={`${project.title} ${i}`} className="w-full h-40 object-cover rounded-md border" />
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-sm text-sky-600">Source</a>}
          {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-sm text-sky-600">Demo</a>}
        </div>
      </div>
    </main>
  );
}
