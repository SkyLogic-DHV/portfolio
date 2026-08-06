"use client";

import { motion } from "framer-motion";
import { ArrowRight, Palette, Globe, AppWindow, Code } from "lucide-react";
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
  ];

  return (
    <section id="services" className="bg-[#fafbfc] w-full py-24 px-6 font-sans">
      <div className="max-w-[1100px] mx-auto">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-8">
          <h2 className="text-[#0e2a47] text-5xl md:text-[54px] font-bold leading-[1.1] max-w-md tracking-tight">
            We Provide The<br />Best Services
          </h2>
          <div className="max-w-[500px] flex flex-col items-start pt-2">
            <p className="text-gray-500 mb-6 text-[15px] leading-relaxed">
              Creative &amp; Technical Services for Your Digital Vision. Designing with Purpose. Building with Precision. Delivering with Passion.
            </p>

          </div>
        </div>

        {/* Cards Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4 items-center">
          {displayServices.map((service, index) => {
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative mx-auto flex items-center justify-center cursor-pointer"
                style={{ width: "100%", maxWidth: "340px", aspectRatio: "1/1" }}
              >
                {/* Outer circle for the white ring and shadow effect (visible on hover) */}
                <div
                  className="absolute inset-0 bg-white rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.08)] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out"
                  style={{ transform: "scale(1.08)" }}
                ></div>

                {/* Inner circle (transparent default, dark blue on hover) */}
                <div className="relative w-full h-full rounded-full flex flex-col justify-center items-center text-center p-8 z-10 transition-colors duration-300 ease-out bg-transparent group-hover:bg-[#5f738c] group-hover:shadow-inner">

                  {/* Icon */}
                  <div className="mb-5 text-[#5f738c] group-hover:text-white group-hover:opacity-90 transition-colors duration-300">
                    <IconMapper name={service.icon} />
                  </div>

                  {/* Title */}
                  <h3 className="text-[20px] font-bold mb-3 tracking-wide text-[#0e2a47] group-hover:text-white transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[12.5px] leading-relaxed mb-6 max-w-[220px] text-gray-500 group-hover:text-gray-200 transition-colors duration-300">
                    {service.description}
                  </p>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
