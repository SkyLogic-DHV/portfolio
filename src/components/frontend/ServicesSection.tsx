"use client";

import { motion } from "framer-motion";
import { Code, Smartphone, Cpu, ShieldCheck, Layout, Workflow, ArrowRight } from "lucide-react";

export interface ServiceData {
  id: string;
  icon: string;
  title: string;
  description: string;
  cta: string;
  displayOrder: number;
}

const ICON_MAP: Record<string, any> = {
  Code,
  Smartphone,
  Cpu,
  ShieldCheck,
  Layout,
  Workflow,
};

export function ServicesSection({ services }: { services: ServiceData[] }) {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          Our Core Capabilities & Services
        </h2>
        <p className="mt-4 text-base text-gray-500">
          From full-stack web platforms to zero-trust security and AI agent orchestrations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const IconComp = ICON_MAP[service.icon] || Code;

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group bg-white border border-gray-200 rounded-2xl p-8 hover:border-indigo-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <IconComp className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <a
                  href="#contact"
                  className="inline-flex items-center space-x-2 text-xs font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                  <span>{service.cta || "Discuss Project"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}