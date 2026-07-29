"use client";

import { motion } from "framer-motion";

export interface TeamMemberData {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  linkedin: string;
  github: string;
  instagram: string;
  email: string;
  displayOrder: number;
  isActive: boolean;
}

export interface SectionInfoData {
  title: string;
  description: string;
}

export function AboutSection({
  info,
  members,
}: {
  info: SectionInfoData;
  members: TeamMemberData[];
}) {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Full-width single container */}
      <div className="relative bg-white border border-gray-200 rounded-3xl p-10 sm:p-16 shadow-xl overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Large Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-3">
              <span className="text-6xl sm:text-7xl font-black tracking-tight text-gray-900">
                Sky
              </span>
              <span className="text-6xl sm:text-7xl font-black tracking-tight text-gray-900">
                L
                <span className="inline-block w-5 h-5 rounded-full bg-amber-400 mx-1 shadow-[0_0_15px_#f59e0b40]" />
                gic
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
          >
            {info.title || "Meet Our Engineering Team"}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-3xl mx-auto"
          >
            {info.description ||
              "Architects, full-stack developers, and designers crafting world-class digital products."}
          </motion.p>

          {/* Decorative brand strip */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-400"
          >
            <span>FULL-STACK</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>UI/UX</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>DEVOPS</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>AI ENGINEERING</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>SECURITY</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}