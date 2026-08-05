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
                  cardBgColor="var(--card-bg-color)"
                  shadowColor="var(--shadow-color)"
                  textColor="var(--text-color)"
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