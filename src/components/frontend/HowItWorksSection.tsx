"use client";

import React from "react";
import { CardSpread, CardSpreadItem } from "@/components/ui/card-spread";

const steps: CardSpreadItem[] = [
  {
    id: 1,
    badge: "01",
    title: "Diskusi kebutuhan website",
    desc: "Membahas visi, tujuan, dan fitur spesifik yang Anda butuhkan untuk proyek ini.",
    bgColor: "bg-[#F3E8FF]", // light purple
    textColor: "text-[#6B21A8]",
  },
  {
    id: 2,
    badge: "02",
    title: "Pengumpulan requirements",
    desc: "Mengumpulkan materi, aset digital, dan informasi detail dari pihak client.",
    bgColor: "bg-[#FEF3C7]", // light amber
    textColor: "text-[#B45309]",
  },
  {
    id: 3,
    badge: "03",
    title: "Kesepakatan harga & kerja",
    desc: "Menyepakati ruang lingkup pekerjaan, estimasi waktu, serta biaya pengembangan.",
    bgColor: "bg-[#E0F2FE]", // light sky
    textColor: "text-[#0369A1]",
  },
  {
    id: 4,
    badge: "04",
    title: "Pengerjaan pasca bayar",
    desc: "Proses pengerjaan segera dimulai setelah pembayaran termin (DP) diterima.",
    bgColor: "bg-[#D1FAE5]", // light emerald
    textColor: "text-[#047857]",
  },
  {
    id: 5,
    badge: "05",
    title: "Tahap Design (UI/UX)",
    desc: "Membuat rancangan visual antarmuka website sesuai dengan identitas brand.",
    bgColor: "bg-[#FCE7F3]", // light pink
    textColor: "text-[#BE185D]",
  },
  {
    id: 6,
    badge: "06",
    title: "Revisi design max 2x",
    desc: "Memberikan kesempatan penyempurnaan desain sebelum masuk tahap coding.",
    bgColor: "bg-[#FFEDD5]", // light orange
    textColor: "text-[#C2410C]",
  },
  {
    id: 7,
    badge: "07",
    title: "Mulai implementasi",
    desc: "Proses pengembangan (coding) mengubah desain visual menjadi website fungsional.",
    bgColor: "bg-[#E0E7FF]", // light indigo
    textColor: "text-[#4338CA]",
  },
  {
    id: 8,
    badge: "08",
    title: "Garansi 1 bulan",
    desc: "Dukungan teknis dan garansi perbaikan bug selama 1 bulan penuh setelah rilis.",
    bgColor: "bg-[#CCFBF1]", // light teal
    textColor: "text-[#0F766E]",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="pt-10 pb-20 w-full bg-slate-50/50 border-t border-slate-200/60 overflow-hidden relative scroll-mb-104 ">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-indigo-200/20 via-purple-200/20 to-sky-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-1">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 font-medium tracking-tight mt-2 max-w-2xl">
            Website development process from start to finish, ensuring clarity and transparency at every step.
          </p>
        </div>

        {/* Fanned Card Spread Section */}
        <div className="w-full flex justify-center overflow-x-auto hide-scrollbar pt-0 pb-2">
          <CardSpread
            items={steps}
            containerClassName="pt-10 pb-8"
            arc={42}
            radius={600}
            cardWidth={310}
            cardHeight={360}
            lift={45}
            push={30}
            stiffness={140}
            damping={25}
          />
        </div>

      </div>
    </section>
  );
}

export default HowItWorksSection;
