"use client";

import { motion } from "framer-motion";
import { StaggeredText } from "@/components/ui/staggered-text";

function FourPointStar() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-black"
    >
      <path
        d="M12 0C12 6.62742 17.3726 12 24 12C17.3726 12 12 17.3726 12 24C12 17.3726 6.62742 12 0 12C6.62742 12 12 6.62742 12 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function QuoteSection() {
  return (
    <section className="pt-24 pb-40 md:pt-32 md:pb-64 bg-transparent relative overflow-hidden flex items-center justify-center w-full min-h-[600px]">
      {/* Left Image - Offset Up */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute left-0 top-12 md:top-24 w-1/3 max-w-[320px] aspect-[4/3] hidden md:block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop"
          alt="Web Design and UI/UX"
          className="w-full h-full object-cover rounded-r-[40px] shadow-xl"
        />
      </motion.div>

      {/* Center Content */}
      <div className="max-w-2xl mx-auto px-6 text-center z-10 flex flex-col items-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, ease: "backOut" }}
          className="mb-8"
        >
          <FourPointStar />
        </motion.div>

        {/* Staggered Text Animated Heading (Always triggers on scroll) */}
        <h2
          className="text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-6 leading-[1.1] tracking-tight"
          style={{ fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif" }}
        >
          <StaggeredText
            staggerDuration={0.08}
            duration={0.65}
            blur={true}
            direction="up"
            viewportOnce={false}
            segments={[
              { text: "If you can" },
              { text: "imagine it,", italic: true },
              { text: "we can" },
              { text: "code it.", italic: true },
            ]}
          />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-slate-600 mb-10 max-w-lg mx-auto leading-relaxed text-sm md:text-base"
        >
          We collaborate UI/UX and software architecture to create high-performance digital solutions. From responsive websites to complex web applications, we design tailored solutions for your business needs.
        </motion.p>

        {/* 3D Tactile "Get in Touch" Button (Original Blue Color & Original Text) */}
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative inline-block border-none bg-transparent p-0 cursor-pointer outline-offset-4 select-none touch-manipulation group hover:brightness-110 transition-[filter] duration-250 focus:not-focus-visible:outline-none"
        >
          {/* Shadow Layer */}
          <span className="absolute top-0 left-0 w-full h-full rounded-xl bg-black/25 translate-y-[2px] transition-transform duration-[600ms] ease-[cubic-bezier(.3,.7,.4,1)] group-hover:translate-y-[4px] group-hover:duration-[250ms] group-hover:ease-[cubic-bezier(.3,.7,.4,1.5)] group-active:translate-y-[1px] group-active:duration-[34ms]" />

          {/* 3D Edge Layer in Original Blue Palette */}
          <span
            className="absolute top-0 left-0 w-full h-full rounded-xl"
            style={{
              background: "linear-gradient(to left, #1e40af 0%, #1d4ed8 8%, #1d4ed8 92%, #1e40af 100%)",
            }}
          />

          {/* Front Layer with Original Blue Background & Text */}
          <span className="block relative px-8 py-3.5 rounded-xl text-sm md:text-base font-medium text-white bg-[#2563EB] -translate-y-1 transition-transform duration-[600ms] ease-[cubic-bezier(.3,.7,.4,1)] group-hover:-translate-y-[6px] group-hover:duration-[250ms] group-hover:ease-[cubic-bezier(.3,.7,.4,1.5)] group-active:-translate-y-[2px] group-active:duration-[34ms] tracking-wide">
            Get in Touch
          </span>
        </motion.a>
      </div>

      {/* Right Image - Offset Down */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="absolute right-0 top-32 md:top-48 w-1/3 max-w-[320px] aspect-[4/3] hidden md:block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
          alt="Software Code on Screen"
          className="w-full h-full object-cover rounded-l-[40px] shadow-xl"
        />
      </motion.div>
    </section>
  );
}

export default QuoteSection;
