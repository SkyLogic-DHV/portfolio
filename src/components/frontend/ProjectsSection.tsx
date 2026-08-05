"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Sparkles, X, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { InfoCard } from "@/components/ui/info-card";

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
  "Website Application",
  "UI/UX",
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
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${activeCategory === cat
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

          const colors = [
            { border: "var(--border-color-1)", hover: "var(--hover-text-color-1)" },
            { border: "var(--border-color-2)", hover: "var(--hover-text-color-2)" },
            { border: "var(--border-color-3)", hover: "var(--hover-text-color-3)" },
          ];
          
          const colorConfig = colors[index % colors.length];

          return (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setSelectedProject(project)}
              className="flex justify-center items-center w-full"
            >
              <div 
                className="file-container w-full"
                style={{
                  maxWidth: 388,
                  height: 378,
                  borderRadius: "1em",
                  position: "relative",
                  overflow: "hidden",
                  padding: 0,
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "none",
                  boxSizing: "border-box",
                  ["--hover-text-color" as any]: colorConfig.hover,
                }}
              >
                <InfoCard
                  image={
                    project.thumbnail ||
                    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
                  }
                  title={project.title}
                  description={project.shortDesc}
                  width="100%"
                  height="100%"
                  borderColor={colorConfig.border}
                  borderBgColor="var(--border-bg-color)"
                  cardBgColor="#ffffff"
                  shadowColor="rgba(2,6,23,0.06)"
                  boxShadow="0 8px 24px rgba(15,23,42,0.08)"
                  textColor="#0f172a"
                  hoverTextColor={colorConfig.hover}
                  fontFamily="var(--font-family)"
                  rtlFontFamily="var(--rtl-font-family)"
                  effectBgColor={colorConfig.border}
                  patternColor1="var(--pattern-color1)"
                  patternColor2="var(--pattern-color2)"
                  contentPadding="14.3px 16px"
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal Detail Project */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-gray-900/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 80 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-[1200px] h-[92vh] bg-white border border-gray-200 rounded-2xl shadow-2xl text-gray-700 overflow-hidden flex flex-col sm:flex-row"
            >
              <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors z-50">
                <X className="w-5 h-5" />
              </button>

              {/* Left: large scrollable images */}
              <div className="w-full sm:w-2/3 h-full overflow-y-auto hide-scrollbar bg-gray-50 p-4">
                <div className="space-y-4">
                  {(() => {
                    let gallery: string[] = [];
                    try {
                      gallery = JSON.parse(selectedProject.gallery || "[]");
                    } catch {
                      gallery = [];
                    }
                    if (gallery.length === 0) {
                      return (
                        <div className="w-full h-[60vh] flex items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white text-sm text-gray-500">
                          No gallery images uploaded.
                        </div>
                      );
                    }

                    return gallery.map((g, i) => (
                      <div key={i} className="w-full bg-white rounded-lg overflow-hidden border border-gray-200">
                        <img src={g} alt={`${selectedProject.title} ${i}`} className="w-full h-[60vh] object-contain bg-black" />
                      </div>
                    ));
                  })()}
                </div>
              </div>

              {/* Right: static details (not scrollable) */}
              <div className="w-full sm:w-1/3 h-full p-6 bg-black text-white flex flex-col justify-between">
                <div>
                  <div className="mb-3 text-xs text-slate-400">
                    <span className="px-3 py-1 rounded bg-indigo-50/10 border border-indigo-200 text-xs font-mono text-indigo-300">{selectedProject.category}</span>
                    <span className="ml-3 text-xs text-slate-400">{selectedProject.year} • {selectedProject.duration}</span>
                  </div>

                  <h2 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h2>

                  <div className="prose prose-sm max-w-none text-slate-300">
                    <p>{selectedProject.longDesc || selectedProject.shortDesc}</p>
                  </div>

                  {selectedProject.challenge && (
                    <div className="mt-4">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">Challenge</h4>
                      <p className="text-sm text-slate-300">{selectedProject.challenge}</p>
                    </div>
                  )}

                  {selectedProject.solution && (
                    <div className="mt-4">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 mb-1">Solution</h4>
                      <p className="text-sm text-slate-300">{selectedProject.solution}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex flex-col gap-4">
                  <div className="flex items-center space-x-3">
                    {selectedProject.githubUrl && (
                      <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center space-x-2 text-sm font-semibold text-white/90 hover:text-white">
                        <GithubIcon className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                  <a
                    href={selectedProject.demoUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-semibold text-white"
                  >
                    Visit
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}