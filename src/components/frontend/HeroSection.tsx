"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  ctaButton: string;
  ctaLink: string;
  bgImage?: string;
  bgGradient?: string;
  badge?: string;
  partnerLogos?: string;
  socialLinks?: string;
  isOpenForProject?: boolean;
}

export function HeroSection({ hero }: { hero: HeroData }) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section
      style={{
        width: "100%",
        background: "#ffffff",
        paddingTop: 96,
        paddingBottom: 32,
        paddingLeft: 24,
        paddingRight: 24,
      }}
    >
      {/* ── Hero Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          position: "relative",
          /* top-left kecil, top-right besar, bottom-right kecil, bottom-left besar */
          borderRadius: "20px 140px 20px 140px",
          overflow: "hidden",
          minHeight: 480,
          background: "#0c1120",
          boxShadow: "0 32px 100px rgba(0,0,0,0.40)",
          display: "flex",
          alignItems: "stretch",
        }}
      >
        {/* ── Background Image (object-fit cover) ── */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero_bg.png"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* ── Gradient overlay: dark left & right so text is readable ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(12,17,32,0.85) 0%, rgba(12,17,32,0.10) 35%, rgba(12,17,32,0.10) 65%, rgba(12,17,32,0.80) 100%)",
            zIndex: 1,
          }}
        />

        {/* ── Content Layer ── */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            minHeight: 480,
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* ── CENTER: SkyLogic — positioned over the glowing cubes ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: "30%",
              transform: "translateX(-50%)",
              top: "60%",
              marginTop: "0",
              zIndex: 3,
              whiteSpace: "nowrap",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "-1px",
                lineHeight: 1,
                userSelect: "none",
                textShadow: "0 2px 24px rgba(0,0,0,0.6)",
              }}
            >
              <span>Sky</span>
              <span style={{ display: "inline-flex", alignItems: "center" }}>
                L
                <motion.span
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    display: "inline-block",
                    width: "0.52em",
                    height: "0.52em",
                    borderRadius: "50%",
                    background: "#f5e642",
                    boxShadow: "0 0 16px #f5e642cc, 0 0 36px #f5c30066",
                    margin: "0 0.07em",
                    flexShrink: 0,
                    verticalAlign: "middle",
                  }}
                />
                gic
              </span>
            </div>
          </motion.div>

          {/* ── RIGHT: We Build From Scratch ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            style={{
              position: "absolute",
              right: 56,
              top: 48,
              textAlign: "right",
            }}
          >
            <h1
              style={{
                margin: 0,
                lineHeight: 1.05,
                fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
                fontWeight: 900,
                letterSpacing: "-1.5px",
                textShadow: "0 2px 24px rgba(0,0,0,0.5)",
              }}
            >
              <span style={{ color: "#38bdf8", display: "block" }}>We Build</span>
              <span style={{ color: "#38bdf8", display: "block" }}>From</span>
              <span style={{ color: "#ffffff", display: "block" }}>Scratch</span>
            </h1>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
