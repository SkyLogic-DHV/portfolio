"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
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

// Layout constants
const CARD_W = 320;       // card width (matches w-[320px])
const GAP = 24;           // gap between visible cards
const STACK_OFFSET = 12;  // tiny offset between stacked cards
const DEFAULT_OFFSET = 140; // default spacing in idle state (fills ~1300px with 8 cards)
const VISIBLE_AFTER = 2;  // how many cards to show after the hovered one
const RIGHT_STACK_X = (steps.length - 1) * DEFAULT_OFFSET; // initial right stacked position (~980px)

/**
 * Calculate the X position for a card given the active (hovered/selected) index.
 *
 * Layout when card `h` is active:
 *   Left stack:  cards 0..h       → tightly stacked at left
 *   Visible:     cards h+1..h+2   → spread out to the right
 *   Right stack: cards h+3..end   → tightly stacked at far right
 */
function getCardX(index: number, h: number | null): number {
  // Idle state: evenly stacked with offset
  if (h === null) return index * DEFAULT_OFFSET;

  // Left stack (including the hovered card on top)
  if (index <= h) {
    return index * STACK_OFFSET;
  }

  // Visible cards after the hovered card
  const visibleStart = CARD_W + GAP; // right after the left stack
  if (index <= h + VISIBLE_AFTER) {
    const visPos = index - h - 1; // 0 or 1
    return visibleStart + visPos * (CARD_W + GAP);
  }

  // Right stack
  const rightBase = visibleStart + VISIBLE_AFTER * (CARD_W + GAP);
  const rightPos = index - h - VISIBLE_AFTER - 1;
  return rightBase + rightPos * STACK_OFFSET;
}

/** Z-index: left stack ascending, visible cards high, right stack ascending */
function getCardZ(index: number, h: number | null): number {
  if (h === null) return index;
  if (index <= h) return index; // hovered card is highest in left stack
  if (index <= h + VISIBLE_AFTER) return 20 + index; // visible cards on top
  return index; // right stack natural order
}

export function HowItWorksSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.25, once: false });
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    if (isInView) {
      setIsEntering(true);
      const timer = setTimeout(() => {
        setIsEntering(false);
      }, steps.length * 120 + 1000);
      return () => clearTimeout(timer);
    } else {
      setIsEntering(false);
      setActiveIndex(null);
    }
  }, [isInView]);

  const handlePrev = () => {
    setIsEntering(false);
    setActiveIndex((prev) => {
      if (prev === null) return steps.length - 1;
      if (prev <= 0) return null;
      return prev - 1;
    });
  };

  const handleNext = () => {
    setIsEntering(false);
    setActiveIndex((prev) => {
      if (prev === null) return 0;
      if (prev >= steps.length - 1) return null;
      return prev + 1;
    });
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
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-[#0B1220] flex items-center justify-center text-white hover:bg-[#1E3A8A] transition-colors shadow-lg"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-[#0B1220] flex items-center justify-center text-white hover:bg-[#1E3A8A] transition-colors shadow-lg"
              aria-label="Next card"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Cards Container */}
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden"
          style={{ height: 320 }}
          onMouseLeave={() => setActiveIndex(null)}
        >
          {steps.map((step, index) => {
            const targetX = isInView
              ? getCardX(index, activeIndex)
              : index * STACK_OFFSET;
            const targetOpacity = isInView ? 1 : 0;
            const delay = isEntering ? index * 0.12 : 0;

            return (
              <motion.div
                key={step.id}
                className="absolute top-0 left-0"
                initial={{
                  x: index * STACK_OFFSET,
                  opacity: 0,
                }}
                animate={{
                  x: targetX,
                  opacity: targetOpacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  delay: delay,
                }}
                style={{
                  zIndex: getCardZ(index, activeIndex),
                }}
                onMouseEnter={() => {
                  setIsEntering(false);
                  setActiveIndex(index);
                }}
              >
                {/* Card item */}
                <div
                  className={`w-[320px] min-h-[280px] ${step.bgColor} rounded-[2rem] p-8 group shadow-xl border border-black/5 relative cursor-pointer`}
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
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
