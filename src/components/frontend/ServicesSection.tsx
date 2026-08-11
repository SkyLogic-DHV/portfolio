"use client";

import { motion } from "framer-motion";
import { Palette, Globe, AppWindow, Code, Wrench, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

export interface ServiceData {
  id: string;
  icon: string;
  title: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
}

const IconMapper = ({ name, className }: { name: string; className?: string }) => {
  const map: Record<string, React.FC<any>> = {
    Palette,
    Globe,
    AppWindow,
    Wrench,
    Code,
  };
  const IconComponent = map[name] || Code;
  return <IconComponent className={className} size={36} strokeWidth={1.5} />;
};

export function ServicesSection({ services }: { services: ServiceData[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);

  const displayServices = services.filter((s) => s.isActive);
  const hasNav = displayServices.length > 4;
  const perView = 4;
  const pageCount = Math.ceil(displayServices.length / perView);

  useEffect(() => {
    setSlide(0);
  }, [services]);

  const goTo = (page: number) => {
    const el = trackRef.current;
    if (!el) return;
    const target = Math.min(page * perView, displayServices.length - 1);
    const child = el.children[target] as HTMLElement | undefined;
    if (!child) return;
    const left = child.getBoundingClientRect().left - el.getBoundingClientRect().left + el.scrollLeft;
    el.scrollTo({ left, behavior: "smooth" });
  };

  const syncSlide = () => {
    const el = trackRef.current;
    if (!el) return;
    const elLeft = el.getBoundingClientRect().left - el.scrollLeft;
    let firstVisible = 0;
    for (let i = 0; i < el.children.length; i++) {
      const left = (el.children[i] as HTMLElement).getBoundingClientRect().left - elLeft;
      if (left - 8 <= el.scrollLeft) firstVisible = i;
    }
    setSlide(Math.min(Math.floor(firstVisible / perView), pageCount - 1));
  };

  const prev = () => goTo(Math.max(0, slide - 1));
  const next = () => goTo(Math.min(pageCount - 1, slide + 1));

  return (
    <section id="services" className="bg-[#0F172A] relative w-full pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans border-b border-white/10">
      {/* Top Wave Divider */}
      <div className="absolute top-[1px] left-0 w-full overflow-hidden leading-none transform -translate-y-full z-10 pointer-events-none">
        <svg
          className="relative block w-full h-[60px] md:h-[120px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="#0F172A"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-xl">
            <h2 className="text-white text-4xl md:text-5xl lg:text-[36px] font-bold leading-[1.1] tracking-tight">
              We Provide The<br />Best Services
            </h2>
          </div>
          <div className="max-w-[480px] pb-2">
            <p className="text-blue-100/80 text-base leading-relaxed">
              Creative &amp; Technical Services for Your Digital Vision. Designing with Purpose. Building with Precision. Delivering with Passion.
            </p>
          </div>
        </div>

        {/* Cards Area */}
        {hasNav ? (
          <div className="relative w-full">
            {/* Left Nav Button */}
            <button
              onClick={prev}
              disabled={slide === 0}
              aria-label="Previous services"
              className="absolute -left-4 lg:-left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-[0_8px_20px_rgb(37,99,235,0.3)] hover:bg-[#1E3A8A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Nav Button */}
            <button
              onClick={next}
              disabled={slide >= pageCount - 1}
              aria-label="Next services"
              className="absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-[0_8px_20px_rgb(37,99,235,0.3)] hover:bg-[#1E3A8A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Swipeable track — 1 per view on mobile, 2 on sm, 4 on lg */}
            <div
              ref={trackRef}
              onScroll={syncSlide}
              className="hide-scrollbar flex gap-8 lg:gap-12 overflow-x-auto scroll-smooth snap-x snap-mandatory py-6 -my-6 items-center"
            >
              {displayServices.map((service, index) => (
                <div
                  key={service.id}
                  className="flex w-full shrink-0 snap-start justify-center sm:w-1/2 lg:w-1/4"
                >
                  <ServiceCircle service={service} index={index} />
                </div>
              ))}
            </div>

            {/* Pagination dots */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {Array.from({ length: pageCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Page ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === slide ? "w-6 bg-[#2563EB]" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-center justify-items-center">
            {displayServices.map((service, index) => (
              <ServiceCircle key={service.id} service={service} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ServiceCircle({ service, index }: { service: ServiceData; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex items-center justify-center cursor-pointer w-full max-w-[280px]"
      style={{ aspectRatio: "1/1" }}
    >
      {/* Outer circle for the white ring and shadow effect (visible on hover) */}
      <div
        className="absolute inset-0 bg-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.2)] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out"
        style={{ transform: "scale(1.08)" }}
      ></div>

      {/* Inner circle (solid default, bright white on hover) */}
      <div className="relative w-full h-full rounded-full flex flex-col justify-center items-center text-center p-6 z-10 transition-colors duration-300 ease-out bg-[#0B1220] border border-[#0B1220] group-hover:bg-white group-hover:border-transparent group-hover:shadow-inner">
        {/* Icon */}
        <div className="h-[40px] flex items-center justify-center mb-4 text-[#38BDF8] group-hover:text-[#2563EB] group-hover:opacity-100 transition-colors duration-300">
          <IconMapper name={service.icon} />
        </div>

        {/* Title */}
        <div className="flex items-center justify-center mb-3">
          <h3 className="text-[18px] leading-tight font-bold tracking-wide text-white group-hover:text-[#0F172A] transition-colors duration-300">
            {service.title}
          </h3>
        </div>

        {/* Description */}
        <div className="flex items-start justify-center">
          <p className="text-[13px] leading-relaxed text-blue-100/70 group-hover:text-gray-600 transition-colors duration-300 px-2">
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}