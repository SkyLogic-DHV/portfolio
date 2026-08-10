"use client";

import { motion } from "framer-motion";
import { ArrowRight, Palette, Globe, AppWindow, Code, Wrench } from "lucide-react";
import React from "react";

export interface ServiceData {
  id: string;
  icon: string;
  title: string;
  description: string;
  displayOrder: number;
}

const IconMapper = ({ name, className }: { name: string; className?: string }) => {
  const map: Record<string, React.FC<any>> = {
    Palette,
    Globe,
    AppWindow,
    Wrench,
  };
  const IconComponent = map[name] || Code;
  return <IconComponent className={className} size={36} strokeWidth={1.5} />;
};

export function ServicesSection({ services }: { services: ServiceData[] }) {
  // Use original content
  const displayServices = [
    {
      id: "1",
      icon: "Palette",
      title: "UI/UX Design",
      description: "Crafting intuitive interfaces and seamless user journeys that balance beauty with function — turning ideas into experiences people love.",
    },
    {
      id: "2",
      icon: "AppWindow",
      title: "Website Application",
      description: "Developing full-featured web applications with robust architecture, smooth interactions, and scalable backend systems built for continuous growth.",
    },
    {
      id: "3",
      icon: "Globe",
      title: "Website",
      description: "Building clean, high-performance websites that represent your brand with clarity and precision across all devices and browsers.",
    },
    {
      id: "4",
      icon: "Wrench",
      title: "Website Maintenance",
      description: "Ensuring your digital assets run smoothly with regular updates, performance optimization, and proactive technical support.",
    },
  ];

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
            <h2 className="text-white text-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.1] tracking-tight">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-center justify-items-center">
          {displayServices.map((service, index) => {
            return (
              <motion.div
                key={service.id}
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
          })}
        </div>
      </div>
    </section>
  );
}
