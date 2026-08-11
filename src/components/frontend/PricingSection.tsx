"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  popular: boolean;
  ctaText: string;
}

function buildWhatsAppLink(whatsapp: string | undefined, planName: string) {
  const number = (whatsapp || "").replace(/[^0-9]/g, "");
  if (!number) return "#contact";
  const message = `Halo saya ingin konsultasi mengenai paket ${planName}`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function PricingSection({
  services,
  whatsapp,
            pricingTag = "Transparent & Affordable",
  pricingTitle = "Services Tailored to Your Needs",
  pricingDescription = "Choose the plan that fits your vision. No hidden costs.",
}: {
  services: PricingPlan[];
  whatsapp?: string;
  pricingTag?: string;
  pricingTitle?: string;
  pricingDescription?: string;
}) {
  const plans = services.filter((p) => p && p.name);
  const popularPlans = plans.filter((p) => p.popular);
  const featuredPlans = popularPlans.length > 0 ? popularPlans : plans.slice(0, 1);
  const popularIds = new Set(featuredPlans.map((p) => p.id));
  const regularPlans = plans.filter((p) => !popularIds.has(p.id));

  const [featuredIndex, setFeaturedIndex] = useState(0);
  const safeIndex = featuredPlans.length > 0 ? featuredIndex % featuredPlans.length : 0;
  const displayFeatured = featuredPlans[safeIndex];
  const hasMultipleFeatured = featuredPlans.length > 1;

  const prevFeatured = () =>
    setFeaturedIndex((i) => (i - 1 + featuredPlans.length) % featuredPlans.length);
  const nextFeatured = () => setFeaturedIndex((i) => (i + 1) % featuredPlans.length);

  if (!displayFeatured || plans.length === 0) return null;

  return (
    <section id="pricing" className="pt-10 pb-32 relative z-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <h2 className="text-sm font-bold tracking-wider text-[#2563EB] uppercase mb-3 flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-[#2563EB]"></span>
            {pricingTag}
            <span className="w-8 h-px bg-[#2563EB]"></span>
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-6">
            {pricingTitle}
          </h3>
          <p className="text-lg text-slate-600">
            {pricingDescription}
          </p>
        </motion.div>

        {/* Bento Box Layout */}
        <div className="flex flex-col gap-10 max-w-6xl mx-auto">

          {/* Top Featured Block */}
          <div className="relative group/featured">
            {/* Left Button */}
            {hasMultipleFeatured && (
              <button
                onClick={prevFeatured}
                className="absolute left-0 -translate-x-1/2 sm:-translate-x-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white text-slate-700 border border-slate-200 shadow-xl flex items-center justify-center hover:bg-slate-50 transition-all opacity-0 group-hover/featured:opacity-100 hover:scale-105"
                aria-label="Previous recommended plan"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-[2.5rem] bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] p-1 shadow-2xl overflow-hidden group"
            >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-300/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={displayFeatured.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative bg-white/95 backdrop-blur-2xl rounded-[2.3rem] p-8 md:p-12 h-full flex flex-col lg:flex-row gap-12 items-center lg:items-stretch overflow-hidden"
              >

                {/* Left Column: Info */}
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{displayFeatured.name}</h4>
                  <p className="text-slate-600 text-base md:text-lg mb-8 leading-relaxed max-w-lg">
                    {displayFeatured.description}
                  </p>

                  <div className="mb-10 flex flex-col text-slate-900">
                    <span className="text-sm font-semibold text-slate-500 mb-1">Investment Starts From</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-slate-500">Rp</span>
                      <span className="text-5xl md:text-6xl font-extrabold tracking-tighter text-blue-600">{displayFeatured.price}</span>
                    </div>
                  </div>

                  <a
                    href={buildWhatsAppLink(whatsapp, displayFeatured.name)}
                    target="_blank"
                    rel="noreferrer"
                    className="group/btn relative overflow-hidden w-full sm:w-max py-4 px-8 rounded-2xl bg-[#2563EB] text-white font-bold text-lg shadow-[0_8px_20px_rgb(37,99,235,0.3)] hover:shadow-[0_15px_25px_rgb(37,99,235,0.4)] transition-all hover:-translate-y-1"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {displayFeatured.ctaText}
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1s_infinite]" />
                  </a>
                </div>

                {/* Divider */}
                <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent self-stretch" />

                {/* Right Column: Features Grid */}
                <div className="flex-[1.2] w-full bg-slate-50/50 rounded-3xl p-6 md:p-8 border border-slate-100/60 flex flex-col justify-center relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

                  <h5 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Check className="w-5 h-5 text-blue-600" />
                    Featured Features
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 relative z-10">
                    {(displayFeatured.features || []).map((feature, i) => (
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

                {/* Recommended Badge at top right */}
                <div className="absolute top-5 right-5 z-20">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-200">
                    <Sparkles className="w-3.5 h-3.5" />
                    Most Popular & Recommended
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right Button */}
          {hasMultipleFeatured && (
            <button
              onClick={nextFeatured}
              className="absolute right-0 translate-x-1/2 sm:translate-x-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white text-slate-700 border border-slate-200 shadow-xl flex items-center justify-center hover:bg-slate-50 transition-all opacity-0 group-hover/featured:opacity-100 hover:scale-105"
              aria-label="Next recommended plan"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Bottom Dots for Featured */}
          {hasMultipleFeatured && (
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 z-30">
              {featuredPlans.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setFeaturedIndex(i)}
                  className={`h-2 rounded-full transition-all ${i === safeIndex ? "w-6 bg-[#2563EB]" : "w-2 bg-slate-300 hover:bg-slate-400"}`}
                  aria-label={`Recommended plan ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

          {/* Bottom Regular Plans — layout adapts to the number of non-recommended plans */}
          {regularPlans.length > 0 && <RegularPlansBlock plans={regularPlans} whatsapp={whatsapp} />}
        </div>
      </div>
    </section>
  );
}

function RegularPlansBlock({
  plans,
  whatsapp,
}: {
  plans: PricingPlan[];
  whatsapp?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setPerView(3);
      else if (window.innerWidth >= 768) setPerView(2);
      else setPerView(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIdx = Math.max(0, plans.length - perView);

  const scrollToPlan = (idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    const child = el.children[idx] as HTMLElement;
    if (!child) return;
    const scrollLeft = child.offsetLeft - el.offsetLeft;
    el.scrollTo({ left: scrollLeft, behavior: "smooth" });
    setActiveIdx(idx);
  };

  const handlePrev = () => {
    const target = Math.max(activeIdx - 1, 0);
    scrollToPlan(target);
  };

  const handleNext = () => {
    const target = Math.min(activeIdx + 1, maxIdx);
    scrollToPlan(target);
  };

  const syncScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    let closestIdx = 0;
    let minDiff = Infinity;

    for (let i = 0; i < el.children.length; i++) {
      const child = el.children[i] as HTMLElement;
      const diff = Math.abs(child.offsetLeft - el.offsetLeft - scrollLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    }
    setActiveIdx(Math.min(closestIdx, maxIdx));
  };

  if (plans.length === 1) {
    return <RegularPlanCard plan={plans[0]} whatsapp={whatsapp} wide />;
  }

  const totalDots = plans.length > perView ? plans.length - perView + 1 : 1;

  return (
    <div className="relative w-full px-2 sm:px-12">
      {/* Left button */}
      {plans.length > perView && (
        <button
          onClick={handlePrev}
          disabled={activeIdx === 0}
          className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-gray-200 shadow-lg hover:bg-gray-50 flex items-center justify-center transition-all disabled:opacity-30 disabled:pointer-events-none"
          aria-label="Previous plan"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
      )}

      {/* Track */}
      <div
        ref={trackRef}
        onScroll={syncScroll}
        className="hide-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth py-6 -my-6"
      >
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="flex w-full shrink-0 snap-start justify-center items-stretch md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          >
            <RegularPlanCard plan={plan} whatsapp={whatsapp} />
          </div>
        ))}
      </div>

      {/* Right button */}
      {plans.length > perView && (
        <button
          onClick={handleNext}
          disabled={activeIdx >= maxIdx}
          className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-gray-200 shadow-lg hover:bg-gray-50 flex items-center justify-center transition-all disabled:opacity-30 disabled:pointer-events-none"
          aria-label="Next plan"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      )}

      {/* Dots */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {Array.from({ length: totalDots }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToPlan(i)}
            className={`h-2.5 rounded-full transition-all cursor-pointer ${
              i === activeIdx ? "w-7 bg-[#2563EB]" : "w-2.5 bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Go to plan slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function RegularPlanCard({
  plan,
  whatsapp,
  wide = false,
}: {
  plan: PricingPlan;
  whatsapp?: string;
  wide?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.15 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={`relative rounded-3xl bg-white border border-slate-200 shadow-lg hover:shadow-xl hover:border-blue-200 transition-all group ${
        wide
          ? "flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-10 p-8 md:p-10 max-w-4xl mx-auto w-full"
          : "p-8 flex flex-col h-full w-full min-h-[420px]"
      }`}
    >
      {/* Info */}
      <div className={wide ? "flex-1 flex flex-col" : ""}>
        <div className="mb-6">
          <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{plan.name}</h4>
          <p className="text-slate-500 text-sm leading-relaxed">{plan.description}</p>
        </div>

        <div className="mb-8 flex flex-col text-slate-900">
          <span className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Starting From</span>
          <div className="flex items-baseline">
            <span className="text-sm font-bold text-slate-600 mr-1">Rp</span>
            <span className="text-4xl font-black tracking-tight">{plan.price}</span>
          </div>
        </div>
      </div>

      {/* Features & CTA */}
      <div className={wide ? "lg:w-1/2 flex flex-col" : "flex flex-col flex-1"}>
        <ul className={wide ? "grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-8 flex-1" : "space-y-4 flex-1 mb-8"}>
          {(plan.features || []).map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
              <Check className="w-5 h-5 shrink-0 text-slate-300 group-hover:text-blue-400 transition-colors" />
              <span className="font-medium">{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href={buildWhatsAppLink(whatsapp, plan.name)}
          target="_blank"
          rel="noreferrer"
          className="group/btn relative overflow-hidden w-full py-3.5 px-6 rounded-xl font-bold bg-[#2563EB] text-white shadow-[0_8px_20px_rgb(37,99,235,0.3)] hover:shadow-[0_15px_25px_rgb(37,99,235,0.4)] transition-all hover:-translate-y-1 mt-auto text-center"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {plan.ctaText || "Start Project"}
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1s_infinite]" />
        </a>
      </div>
    </motion.div>
  );
}