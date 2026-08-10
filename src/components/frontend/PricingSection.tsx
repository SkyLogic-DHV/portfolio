"use client";

import { motion } from "framer-motion";
import { Check, Star, ArrowRight, Sparkles } from "lucide-react";

const plans = [
  {
    name: "UI/UX Design",
    description: "Desain antarmuka modern yang menarik dan ramah pengguna.",
    price: "450K",
    features: [
      "Wireframing & Prototyping",
      "User Research & Flow",
      "Visual Design (Figma)",
      "Interactive Mockups",
      "Design System & Asset Export",
    ],
    popular: false,
    ctaText: "Mulai Proyek",
  },
  {
    name: "Website",
    description: "Website profesional dan responsif untuk bisnis Anda.",
    price: "500K",
    features: [
      "Responsive Design",
      "Basic SEO Optimization",
      "Integrasi Form Kontak",
      "Performa & Kecepatan Tinggi",
      "Termasuk Hosting Standard",
    ],
    popular: false,
    ctaText: "Mulai Proyek",
  },
  {
    name: "Maintenance Web",
    description: "Pemeliharaan rutin untuk menjaga website tetap optimal.",
    price: "500K",
    features: [
      "Pembaruan Keamanan",
      "Backup Data Berkala",
      "Monitoring Uptime",
      "Perbaikan Bug & Error",
      "Dukungan Teknis Bulanan",
    ],
    popular: false,
    ctaText: "Mulai Proyek",
  },
  {
    name: "Web Application",
    description: "Aplikasi web kustom dengan fitur kompleks dan arsitektur yang sangat scalable untuk skala enterprise.",
    price: "1.5M",
    features: [
      "Full Custom Development",
      "Sistem Autentikasi User (OAuth/JWT)",
      "Integrasi Database Kompleks",
      "Dashboard Admin Interaktif",
      "API Development & Integration",
      "Scalable Cloud Architecture",
    ],
    popular: true,
    ctaText: "Pilih Web App",
  },
];

export function PricingSection() {
  const featuredPlan = plans.find((p) => p.popular)!;
  const regularPlans = plans.filter((p) => !p.popular);

  return (
    <section id="pricing" className="pt-10 pb-32 relative z-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-sm font-bold tracking-wider text-[#2563EB] uppercase mb-3 flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-[#2563EB]"></span>
            Transparan & Terjangkau
            <span className="w-8 h-px bg-[#2563EB]"></span>
          </h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Layanan yang disesuaikan dengan kebutuhan Anda
          </h3>
          <p className="text-lg text-slate-600">
            Pilih layanan yang tepat untuk mewujudkan visi Anda. Tanpa biaya tersembunyi.
          </p>
        </motion.div>

        {/* Bento Box Layout */}
        <div className="flex flex-col gap-8 max-w-6xl mx-auto">

          {/* Top Featured Block (Web App) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[2.5rem] bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] p-1 shadow-2xl overflow-hidden group"
          >
            {/* Animated Glow Background inside the border */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-300/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative bg-white/95 backdrop-blur-2xl rounded-[2.3rem] p-8 md:p-12 h-full flex flex-col lg:flex-row gap-12 items-center lg:items-stretch overflow-hidden">

              {/* Left Column: Info */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6 w-max border border-blue-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  Paling Diminati & Direkomendasikan
                </div>

                <h4 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{featuredPlan.name}</h4>
                <p className="text-slate-600 text-base md:text-lg mb-8 leading-relaxed max-w-lg">
                  {featuredPlan.description}
                </p>

                <div className="mb-10 flex flex-col text-slate-900">
                  <span className="text-sm font-semibold text-slate-500 mb-1">Investasi Mulai Dari</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-slate-500">Rp</span>
                    <span className="text-5xl md:text-6xl font-extrabold tracking-tighter text-blue-600">{featuredPlan.price}</span>
                  </div>
                </div>

                <button className="group/btn relative overflow-hidden w-full sm:w-max py-4 px-8 rounded-2xl bg-[#2563EB] text-white font-bold text-lg shadow-[0_8px_20px_rgb(37,99,235,0.3)] hover:shadow-[0_15px_25px_rgb(37,99,235,0.4)] transition-all hover:-translate-y-1">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {featuredPlan.ctaText}
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1s_infinite]" />
                </button>
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent self-stretch" />

              {/* Right Column: Features Grid */}
              <div className="flex-[1.2] w-full bg-slate-50/50 rounded-3xl p-6 md:p-8 border border-slate-100/60 flex flex-col justify-center relative">
                {/* Decorative blob inside features */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

                <h5 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-600" />
                  Fitur Unggulan
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 relative z-10">
                  {featuredPlan.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-blue-700 stroke-[3]" />
                      </div>
                      <span className="text-slate-700 text-[15px] font-medium leading-tight">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>

          {/* Bottom Regular Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {regularPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="relative rounded-3xl p-8 bg-white flex flex-col h-full border border-slate-200 shadow-lg hover:shadow-xl hover:border-blue-200 transition-all group"
              >
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{plan.name}</h4>
                  <p className="text-slate-500 text-sm h-10 leading-relaxed">{plan.description}</p>
                </div>

                <div className="mb-8 flex flex-col text-slate-900">
                  <span className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Mulai dari</span>
                  <div className="flex items-baseline">
                    <span className="text-sm font-bold text-slate-600 mr-1">Rp</span>
                    <span className="text-4xl font-black tracking-tight">{plan.price}</span>
                  </div>
                </div>

                <ul className="space-y-4 flex-1 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                      <Check className="w-5 h-5 shrink-0 text-slate-300 group-hover:text-blue-400 transition-colors" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full py-3.5 px-6 rounded-xl font-semibold transition-all duration-200 bg-slate-50 text-slate-800 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 mt-auto"
                >
                  {plan.ctaText}
                </button>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
