"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Diskusi kebutuhan website",
    desc: "Membahas visi, tujuan, dan fitur spesifik yang Anda butuhkan untuk proyek ini.",
    bgColor: "bg-[#F3E8FF]", // light purple
    textColor: "text-[#6B21A8]",
  },
  {
    id: 2,
    title: "Pengumpulan requirements",
    desc: "Mengumpulkan materi, aset digital, dan informasi detail dari pihak client.",
    bgColor: "bg-[#FEF3C7]", // light amber
    textColor: "text-[#B45309]",
  },
  {
    id: 3,
    title: "Kesepakatan harga & kerja",
    desc: "Menyepakati ruang lingkup pekerjaan, estimasi waktu, serta biaya pengembangan.",
    bgColor: "bg-[#E0F2FE]", // light sky
    textColor: "text-[#0369A1]",
  },
  {
    id: 4,
    title: "Pengerjaan pasca bayar",
    desc: "Proses pengerjaan segera dimulai setelah pembayaran termin (DP) diterima.",
    bgColor: "bg-[#D1FAE5]", // light emerald
    textColor: "text-[#047857]",
  },
  {
    id: 5,
    title: "Tahap Design (UI/UX)",
    desc: "Membuat rancangan visual antarmuka website sesuai dengan identitas brand.",
    bgColor: "bg-[#FCE7F3]", // light pink
    textColor: "text-[#BE185D]",
  },
  {
    id: 6,
    title: "Revisi design max 2x",
    desc: "Memberikan kesempatan penyempurnaan desain sebelum masuk tahap coding.",
    bgColor: "bg-[#FFEDD5]", // light orange
    textColor: "text-[#C2410C]",
  },
  {
    id: 7,
    title: "Mulai implementasi",
    desc: "Proses pengembangan (coding) mengubah desain visual menjadi website fungsional.",
    bgColor: "bg-[#E0E7FF]", // light indigo
    textColor: "text-[#4338CA]",
  },
  {
    id: 8,
    title: "Garansi 1 bulan",
    desc: "Dukungan teknis dan garansi perbaikan bug selama 1 bulan penuh setelah rilis.",
    bgColor: "bg-[#CCFBF1]", // light teal
    textColor: "text-[#0F766E]",
  },
];

const SketchyCircle = ({ color }: { color: string }) => (
  <svg
    className="absolute inset-0 w-full h-full -rotate-12"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50 5C25.147 5 5 25.147 5 50C5 74.853 25.147 95 50 95C74.853 95 95 74.853 95 50C95 27 76 7 53 5"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      className="drop-shadow-sm"
    />
  </svg>
);

export function HowItWorksSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 w-full bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                How It Works
              </h2>
            </div>
            <p className="text-xl text-gray-600 font-medium tracking-tight">
              Website development process from start to finish, ensuring clarity and transparency at every step.
            </p>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex items-center space-x-3">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full bg-[#0B1220] flex items-center justify-center text-white hover:bg-[#1E3A8A] transition-colors shadow-lg"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full bg-[#0B1220] flex items-center justify-center text-white hover:bg-[#1E3A8A] transition-colors shadow-lg"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 pt-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 hide-scrollbar cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex-none w-[320px] md:w-[360px] min-h-[280px] ${step.bgColor} rounded-[2rem] p-8 snap-start sticky group transition-transform shadow-xl border border-black/5`}
              style={{
                left: `calc(1rem + ${index * 40}px)`, // Offset each card so they stack
                zIndex: index, // Ensure later cards stack on top of earlier cards
              }}
            >
              {/* Number with Sketchy Circle */}
              <div className="relative w-12 h-12 flex items-center justify-center mb-8">
                <span className={`text-xl font-bold ${step.textColor} relative z-10`}>
                  {step.id}
                </span>
                <SketchyCircle color="currentColor" />
                <div className={`absolute inset-0 opacity-20 ${step.textColor}`} />
              </div>

              {/* Title & Desc */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                {step.title}
              </h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                {step.desc}
              </p>

              {/* Decorative faint icon at bottom right */}
              <div className="absolute bottom-6 right-6 opacity-10 transform group-hover:scale-110 transition-transform duration-500">
                <span className="text-8xl font-black">0{step.id}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
