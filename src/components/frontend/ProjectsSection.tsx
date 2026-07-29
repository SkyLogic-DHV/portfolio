"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Sparkles, X, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";

export interface ProjectData {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  gallery: string;
  shortDesc: string;
  longDesc: string;
  techStack: string;
  githubUrl: string;
  demoUrl: string;
  client: string;
  year: string;
  duration: string;
  category: string;
  status: string;
  featured: boolean;
  highlight: string;
  projectType: string;
  challenge: string;
  solution: string;
  result: string;
}

const CATEGORIES = [
  "All",
  "Website",
  "Mobile",
  "AI",
  "Cyber Security",
  "UI/UX",
  "Automation",
  "Internal Tools",
];

export function ProjectsSection({ projects }: { projects: ProjectData[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === "All") return true;
    return p.category === activeCategory;
  });

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          Featured Engineering Projects
        </h2>
        <p className="mt-4 text-base text-gray-500">
          Selected case studies built from scratch with high scale, security, and performance.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
              activeCategory === cat
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                : "bg-gray-100 border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => {
          let stackList: string[] = [];
          try {
            stackList = JSON.parse(project.techStack || "[]");
          } catch {
            stackList = [];
          }

          return (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-indigo-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Thumbnail Image */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <img
                  src={
                    project.thumbnail ||
                    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
                  }
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-md bg-white/90 border border-gray-200 text-[10px] font-mono text-gray-700">
                    {project.category}
                  </span>
                  {project.highlight && (
                    <span className="px-2.5 py-1 rounded-md bg-amber-100 border border-amber-300 text-[10px] font-semibold text-amber-700 flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{project.highlight}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {project.shortDesc}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {stackList.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-gray-100 text-[10px] font-mono text-gray-600"
                      >
                        {tech}
                      </span>
                    ))}
                    {stackList.length > 4 && (
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-[10px] font-mono text-gray-400">
                        +{stackList.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
                  >
                    View Details →
                  </button>

                  <div className="flex items-center space-x-3 text-gray-400">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-gray-900 transition-colors"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-gray-900 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal Detail Project */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-2xl text-gray-700"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3 mb-4">
                <span className="px-3 py-1 rounded bg-indigo-50 border border-indigo-200 text-xs font-mono text-indigo-700">
                  {selectedProject.category}
                </span>
                <span className="text-xs text-gray-500">{selectedProject.year}</span>
                <span className="text-xs text-gray-500">• {selectedProject.duration}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {selectedProject.title}
              </h2>

              <img
                src={selectedProject.thumbnail}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-xl border border-gray-200 mb-6"
              />

              <div className="space-y-6 text-sm text-gray-600">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">
                    Overview
                  </h4>
                  <p className="leading-relaxed">{selectedProject.longDesc}</p>
                </div>

                {selectedProject.challenge && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-amber-600 mb-1">
                      Challenge
                    </h4>
                    <p className="leading-relaxed">{selectedProject.challenge}</p>
                  </div>
                )}

                {selectedProject.solution && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-sky-600 mb-1">
                      Solution
                    </h4>
                    <p className="leading-relaxed">{selectedProject.solution}</p>
                  </div>
                )}

                {selectedProject.result && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-700 flex items-center space-x-2 mb-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Impact & Result</span>
                    </h4>
                    <p className="text-emerald-800 leading-relaxed">{selectedProject.result}</p>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>Source Code</span>
                    </a>
                  )}
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-2 text-xs font-semibold text-sky-600 hover:text-sky-500"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}