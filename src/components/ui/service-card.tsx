"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// CVA for card variants — adapted to blue portfolio palette
const cardVariants = cva(
  "relative flex flex-col justify-between w-full p-6 overflow-hidden rounded-[18px] shadow-sm transition-shadow duration-300 ease-in-out group hover:shadow-2xl",
  {
    variants: {
      variant: {
        default: "bg-white text-gray-900",
        blue: "bg-[#1535b0] text-white",
        light: "bg-[#f0f4ff] text-gray-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ServiceCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Main card title */
  title: string;
  /** Coloured subtitle / category label */
  subtitle: string;
  /** Body description */
  description: string;
  /** The lucide icon node to render */
  icon: React.ReactNode;
  /** Optional href for the CTA link */
  href?: string;
  /** grid-column CSS shorthand, e.g. "1 / 2" */
  gridColumn?: string;
  /** grid-row CSS shorthand, e.g. "1 / 3" */
  gridRow?: string;
  /** Framer Motion entry-animation delay (seconds) */
  delay?: number;
}

const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  (
    {
      className,
      variant,
      title,
      subtitle,
      description,
      icon,
      href = "#contact",
      gridColumn,
      gridRow,
      delay = 0,
      style,
      ...props
    },
    ref
  ) => {
    // ── Framer Motion variants ──────────────────────────────────────
    const cardAnimation = {
      hover: {
        scale: 1.025,
        transition: { duration: 0.3, ease: "easeOut" },
      },
    };

    const iconAnimation = {
      hover: {
        scale: 1.15,
        rotate: 8,
        transition: { duration: 0.4, ease: "easeInOut" as const },
      },
    };

    const arrowAnimation = {
      hover: {
        x: 5,
        transition: {
          duration: 0.35,
          ease: "easeInOut" as const,
          repeat: Infinity,
          repeatType: "reverse" as const,
        },
      },
    };

    const isLight = variant !== "blue";

    return (
      <motion.div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        variants={cardAnimation}
        whileHover="hover"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
        style={{ gridColumn, gridRow, ...style }}
        {...(props as any)}
      >
        {/* ── Icon box ── */}
        <motion.div
          variants={iconAnimation}
          style={{
            width: 50,
            height: 50,
            borderRadius: 14,
            background: "linear-gradient(135deg, #1535b0, #0e8fd8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginBottom: 14,
          }}
        >
          {icon}
        </motion.div>

        {/* ── Text content ── */}
        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: isLight ? "#111827" : "#ffffff",
              margin: 0,
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontSize: 11.5,
              fontWeight: 700,
              color: isLight ? "#1535b0" : "rgba(255,255,255,0.75)",
              margin: "3px 0 10px",
            }}
          >
            {subtitle}
          </p>
          <p
            style={{
              fontSize: 12,
              color: isLight ? "#6b7280" : "rgba(255,255,255,0.65)",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            {description}
          </p>
        </div>

        {/* ── CTA arrow link ── */}
        <a
          href={href}
          aria-label={`Learn more about ${title}`}
          style={{
            marginTop: 18,
            display: "inline-flex",
            alignItems: "center",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: isLight ? "#1535b0" : "#ffffff",
            textDecoration: "none",
          }}
        >
          Learn More
          <motion.span
            variants={arrowAnimation}
            style={{ display: "inline-flex", marginLeft: 6 }}
          >
            <ArrowRight size={13} />
          </motion.span>
        </a>
      </motion.div>
    );
  }
);
ServiceCard.displayName = "ServiceCard";

export { ServiceCard };
