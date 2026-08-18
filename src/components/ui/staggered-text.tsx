"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export interface StaggeredTextProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
  segmentBy?: "words" | "chars";
  staggerDuration?: number;
  duration?: number;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  blur?: boolean;
  viewportOnce?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
  style?: React.CSSProperties;
  // Custom styled segments (optional)
  segments?: Array<{
    text: string;
    className?: string;
    italic?: boolean;
  }>;
}

export function StaggeredText({
  text,
  children,
  className,
  segmentBy = "words",
  staggerDuration = 0.08,
  duration = 0.6,
  delay = 0.1,
  direction = "up",
  blur = true,
  viewportOnce = false, // Set false so animation re-triggers whenever scrolled into view
  as: Component = "div",
  style,
  segments,
}: StaggeredTextProps) {
  // Determine initial directional offset
  const getOffset = () => {
    switch (direction) {
      case "up":
        return { y: 28, x: 0 };
      case "down":
        return { y: -28, x: 0 };
      case "left":
        return { x: 28, y: 0 };
      case "right":
        return { x: -28, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDuration,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
      filter: blur ? "blur(8px)" : "blur(0px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration,
        ease: [0.215, 0.61, 0.355, 1], // Cubic-bezier easeOutCubic
      },
    },
  };

  // If segments array is provided (rich styled segments)
  if (segments && segments.length > 0) {
    return (
      <motion.div
        className={cn("inline-flex flex-wrap items-center justify-center gap-x-[0.3em] gap-y-[0.1em]", className)}
        style={style}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: viewportOnce, margin: "-50px" }}
      >
        {segments.map((seg, sIdx) => {
          const words = seg.text.split(" ");
          return words.map((word, wIdx) => (
            <motion.span
              key={`${sIdx}-${wIdx}`}
              variants={itemVariants}
              className={cn("inline-block", seg.className, seg.italic && "italic font-light")}
            >
              {word}
            </motion.span>
          ));
        })}
      </motion.div>
    );
  }

  // Fallback to plain string or text prop
  const contentString = typeof text === "string" ? text : typeof children === "string" ? children : "";

  if (!contentString) {
    return (
      <motion.div
        className={className}
        style={style}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: viewportOnce, margin: "-50px" }}
      >
        {children}
      </motion.div>
    );
  }

  const items =
    segmentBy === "chars"
      ? contentString.split("")
      : contentString.split(" ");

  return (
    <motion.div
      className={cn(
        "inline-flex flex-wrap items-center justify-center",
        segmentBy === "words" ? "gap-x-[0.3em] gap-y-[0.1em]" : "gap-x-[0.05em]",
        className
      )}
      style={style}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: viewportOnce, margin: "-50px" }}
    >
      {items.map((item, idx) => (
        <motion.span key={idx} variants={itemVariants} className="inline-block whitespace-pre">
          {item}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default StaggeredText;
