"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { ContactUsModal } from "./Contact_Us";

export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  ctaButton: string;
  ctaLink: string;
  bgImage?: string;
  bgGradient?: string;
  badge?: string;
  partnerLogos?: string;
  socialLinks?: string;
  isOpenForProject?: boolean;
}

export function HeroSection({ hero }: { hero: HeroData }) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Outer Hero Container - Dark Minimalist Frame */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 border border-gray-800 shadow-2xl p-8 sm:p-14 lg:p-20 min-h-[540px] flex flex-col justify-between">
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/15 blur-[120px] rounded-full" />
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-amber-500/10 blur-[100px] rounded-full" />

          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-12 left-1/2 -translate-x-1/2 w-32 h-32 opacity-70"
          >
            <div className="w-full h-full bg-gradient-to-tr from-slate-700/80 via-slate-800 to-slate-900 rounded-2xl border border-slate-600/40 shadow-2xl backdrop-blur-md transform rotate-12 flex items-center justify-center">
              <div className="w-10 h-10 bg-amber-400/90 rounded-full blur-[2px] shadow-[0_0_20px_#f59e0b]" />
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0], rotate: [0, -8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-16 left-1/3 w-24 h-24 opacity-60 hidden sm:block"
          >
            <div className="w-full h-full bg-gradient-to-br from-indigo-900/60 to-slate-950 rounded-xl border border-indigo-500/30 transform -rotate-45" />
          </motion.div>
        </div>

        {/* Top Header Badge & Availability Indicator */}
        {/* <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs font-medium text-slate-300 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{hero.badge || "SKYLOGIC // ENTERPRISE SOFTWARE ARCHITECTURE"}</span>
          </div>

          {hero.isOpenForProject && (
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-xs font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Available for New Projects</span>
            </div>
          )}
        </div> */}

        {/* Hero Central Content */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="flex items-center space-x-2 text-4xl sm:text-6xl font-black text-white tracking-tight">
              <span>Sky</span>
              <span className="relative">
                L
                <span className="inline-block w-4 h-4 rounded-full bg-amber-400 mx-1 shadow-[0_0_15px_#f59e0b]" />
                gic
              </span>
            </div>
            <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
              {hero.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={hero.ctaLink || "#projects"}
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-sky-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all"
              >
                <span>{hero.ctaButton || "Explore Projects"}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-200 hover:text-white hover:border-slate-500 font-semibold text-sm transition-all cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-center lg:items-end text-left lg:text-right"
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              <span className="text-sky-400">We Build</span>
              <br />
              <span>From</span>
              <br />
              <span className="text-white">Scratch</span>
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-slate-400 font-mono tracking-widest uppercase">
              {hero.subtitle || "Innovative Software & Systems"}
            </p>
          </motion.div>
        </div>

        {/* Bottom Partner Strip */}
        <div className="relative z-10 pt-8 mt-8 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <span>TRUSTED TECH STACK & ARCHITECTURE</span>
          <div className="flex items-center space-x-6 text-slate-400 font-sans font-semibold">
            <span>Next.js 15</span>
            <span>TypeScript</span>
            <span>Prisma</span>
            <span>PostgreSQL</span>
            <span>Docker</span>
          </div>
        </div>
      </div>
      {/* Contact Us Popup Modal */}
      <ContactUsModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}