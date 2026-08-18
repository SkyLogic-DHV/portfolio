"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CardSpreadItem {
  id: string | number;
  title: string;
  desc?: string;
  description?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  badge?: string | number;
  icon?: React.ReactNode;
  content?: React.ReactNode;
}

export interface CardSpreadProps {
  items: CardSpreadItem[];
  arc?: number; // Spread angle in degrees
  radius?: number; // Curvature radius in px (default: 600)
  cardWidth?: number; // Base width in px
  cardHeight?: number; // Base height in px
  cardRadius?: string; // Tailwind border-radius
  stiffness?: number; // Spring stiffness
  damping?: number; // Spring damping
  mass?: number; // Spring mass
  lift?: number; // Outward/upward displacement on hover (px)
  push?: number; // Neighbor displacement on hover (px)
  showNumbers?: boolean;
  className?: string;
  containerClassName?: string;
  onCardClick?: (item: CardSpreadItem, index: number) => void;
}

export function CardSpread({
  items,
  arc = 52,
  radius = 600,
  cardWidth = 300,
  cardHeight = 360,
  cardRadius = "rounded-[2rem]",
  stiffness = 160,
  damping = 25,
  mass = 0.8,
  lift = 45,
  push = 45,
  showNumbers = true,
  className,
  containerClassName,
  onCardClick,
}: CardSpreadProps) {
  const [isContainerHovered, setIsContainerHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const total = items.length;
  const mid = (total - 1) / 2;

  return (
    <div
      className={cn(
        "relative w-full flex flex-col items-center justify-center py-10 select-none overflow-visible",
        containerClassName
      )}
    >
      {/* Cards Deck Container */}
      <div
        className={cn(
          "relative flex items-center justify-center transition-all duration-300",
          className
        )}
        style={{
          width: `${Math.max(cardWidth * 3.8, total * 165)}px`,
          height: `${cardHeight + lift + 60}px`,
        }}
        onMouseEnter={() => setIsContainerHovered(true)}
        onMouseLeave={() => {
          setIsContainerHovered(false);
          setHoveredIndex(null);
        }}
      >
        {items.map((item, index) => {
          // Normalize index between -1 and 1 (0 for middle item)
          const norm = total > 1 ? (index - mid) / mid : 0;

          // Curvature angle stays fixed gently (radius = 600)
          const currentArc = isContainerHovered ? arc : arc * 0.22;
          const rotateDeg = norm * (currentArc / 2);

          // Horizontal spread: spreads wide across left and right
          const spreadFactor = isContainerHovered ? cardWidth * 1.15 : 135;
          let xOffset = norm * spreadFactor;

          // Sequential neighbor shifting:
          if (hoveredIndex !== null && isContainerHovered) {
            const dist = index - hoveredIndex;
            if (dist < 0) {
              // Cards on the left shift further left
              const shiftMultiplier = 1 / Math.sqrt(Math.abs(dist));
              xOffset -= push * shiftMultiplier;
            } else if (dist > 0) {
              // Cards on the right shift further right
              const shiftMultiplier = 1 / Math.sqrt(Math.abs(dist));
              xOffset += push * shiftMultiplier;
            }
          }

          // Arc curvature (y displacement) with fixed radius=600
          const radians = (rotateDeg * Math.PI) / 180;
          const arcY = (1 - Math.cos(radians)) * radius;

          const isHovered = hoveredIndex === index;

          // Hover elevation: card lifts up smoothly
          const yOffset = isHovered
            ? -lift + arcY
            : isContainerHovered
              ? arcY - 6
              : Math.abs(norm) * 8;

          const scale = isHovered ? 1.08 : isContainerHovered ? 1 : 0.98 - Math.abs(norm) * 0.02;

          // CRITICAL: The hovered card must ALWAYS be at the topmost z-index (100)
          const zIndex = isHovered
            ? 100
            : hoveredIndex !== null
              ? 80 - Math.abs(index - hoveredIndex)
              : Math.round(50 - Math.abs(norm) * 10);

          const formattedNumber = String(index + 1).padStart(2, "0");

          return (
            <motion.div
              key={item.id ?? index}
              className={cn(
                "absolute cursor-pointer p-7 flex flex-col justify-between overflow-hidden shadow-xl border border-black/5 backdrop-blur-sm transition-shadow duration-300",
                cardRadius,
                item.bgColor || "bg-white",
                isHovered && "shadow-2xl ring-2 ring-black/15 ring-offset-2"
              )}
              style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                transformOrigin: "bottom center",
              }}
              initial={false}
              animate={{
                x: xOffset,
                y: yOffset,
                rotate: rotateDeg,
                scale,
                zIndex,
              }}
              transition={{
                type: "spring",
                stiffness,
                damping,
                mass,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={() => onCardClick?.(item, index)}
            >
              {/* Card Header (Icon only if present) */}
              {item.icon && (
                <div className="flex items-center justify-end z-10">
                  <div className="text-gray-700">{item.icon}</div>
                </div>
              )}

              {/* Card Main Body */}
              <div className="relative z-10 my-auto pt-4">
                <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-3 tracking-tight">
                  {item.title}
                </h3>
                {(item.desc || item.description) && (
                  <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed opacity-90 line-clamp-4">
                    {item.desc || item.description}
                  </p>
                )}
                {item.content}
              </div>

              {/* Decorative faint background watermark (Bottom Right only) */}
              {showNumbers && (
                <div className="absolute -bottom-6 -right-4 opacity-10 pointer-events-none select-none">
                  <span className="text-8xl font-black tracking-tighter">
                    {formattedNumber}
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default CardSpread;
