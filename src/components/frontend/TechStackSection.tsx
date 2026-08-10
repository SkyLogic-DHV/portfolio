"use client";

import { motion } from "framer-motion";
import { RulerCarousel, type CarouselItem } from "@/components/ui/ruler-carousel";

export interface TechStackItem {
  id: string;
  name: string;
  image: string;
  color?: string;
  category?: string;
  level?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export function TechStackSection({ items }: { items: TechStackItem[] }) {
  // Using the hardcoded list requested by user
  const originalItems: CarouselItem[] = [
    { id: 1, title: "JavaScript" },
    { id: 2, title: "TypeScript" },
    { id: 3, title: "React" },
    { id: 4, title: "Next.js" },
    { id: 5, title: "Tailwind" },
    { id: 6, title: "Bootstrap" },
    { id: 7, title: "Node.js" },
    { id: 8, title: "PostgreSQL" },
    { id: 9, title: "MariaDB" },
    { id: 10, title: "MySQL" },
    { id: 11, title: "Supabase" },
    { id: 12, title: "Express.js" },
    { id: 13, title: "Prisma" },
    { id: 14, title: "Git" },
    { id: 15, title: "Figma" },
    { id: 16, title: "Postman" },
    { id: 17, title: "Vercel" },
  ];

  return (
    <section id="tech-stack" className="pt-28 pb-10 w-full relative z-10">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#0F172A]/[0.03] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1100px] mx-auto px-6 mb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <span className="text-xs font-bold tracking-widest text-[#1E3A8A] uppercase mb-4 bg-white px-5 py-2 rounded-full shadow-sm border border-gray-200">
            My Tech Stack
          </span>
          <h2 className="text-[#0F172A] text-4xl md:text-[46px] font-bold leading-[1.1] text-center tracking-tight max-w-xl">
            Tools & Technologies
          </h2>
          <p className="text-gray-500 mt-5 text-center text-[15px] leading-relaxed max-w-lg mx-auto">
            A comprehensive list of programming languages, frameworks, and modern tools I leverage to craft robust digital experiences.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="w-full relative mt-4"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
        }}
      >
        <RulerCarousel originalItems={originalItems} />
      </motion.div>
    </section>
  );
}
