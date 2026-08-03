"use client";

import { motion } from "framer-motion";
import { Palette, Globe, AppWindow, ArrowRight } from "lucide-react";
import { ServiceCard } from "@/components/ui/service-card";

export interface ServiceData {
  id: string;
  icon: string;
  title: string;
  description: string;
  cta: string;
  displayOrder: number;
}

export function ServicesSection({ services }: { services: ServiceData[] }) {
  return (
    <section id="services" style={{ width: "100%", background: "#eef1fb", padding: "60px 24px" }}>
      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.55fr",
          minHeight: 500,
          borderRadius: 28,
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(20,50,180,0.18)",
        }}
      >
        {/* ── LEFT PANEL ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            background: "linear-gradient(145deg, #1535b0 0%, #1256cc 45%, #0e8fd8 100%)",
            padding: "52px 44px 44px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* decorative circles */}
          <div
            style={{
              position: "absolute", top: -90, right: -90, width: 260, height: 260,
              borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute", bottom: -70, left: -70, width: 210, height: 210,
              borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <p
              style={{
                fontSize: 11, fontWeight: 700, letterSpacing: "2.5px",
                textTransform: "uppercase", color: "rgba(255,255,255,0.65)",
                marginBottom: 20,
              }}
            >
              Our Services
            </p>

            <h2
              style={{
                fontSize: "clamp(1.5rem, 2.8vw, 2.15rem)", fontWeight: 800, lineHeight: 1.22,
                color: "#ffffff", margin: "0 0 28px 0",
              }}
            >
              Creative &amp; Technical Services for Your Digital Vision
            </h2>

            <a
              href="#contact"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                border: "2px solid rgba(255,255,255,0.8)", background: "transparent",
                color: "#ffffff", fontSize: 12, fontWeight: 700, letterSpacing: "1.2px",
                textTransform: "uppercase", padding: "11px 22px", borderRadius: 8,
                cursor: "pointer", textDecoration: "none", transition: "background 0.25s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              More Services <ArrowRight size={14} />
            </a>
          </div>

          <p
            style={{
              fontSize: 12, color: "rgba(255,255,255,0.5)", fontStyle: "italic",
              position: "relative", zIndex: 1, marginTop: 32,
            }}
          >
            Designing with Purpose. Building with Precision. Delivering with Passion.
          </p>
        </motion.div>

        {/* ── RIGHT PANEL ── */}
        <div
          style={{
            background: "#dde4f7",
            padding: "36px 32px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "auto auto",
            gap: 18,
            alignContent: "start",
          }}
        >
          {/* Card 1 – UI/UX Design (top-left) */}
          <ServiceCard
            delay={0}
            gridColumn="1 / 2"
            gridRow="1 / 2"
            title="UI/UX Design"
            subtitle="Human-Centered Experience"
            description="Crafting intuitive interfaces and seamless user journeys that balance beauty with function — turning ideas into experiences people love."
            icon={<Palette size={22} color="#fff" strokeWidth={1.8} />}
          />

          {/* Card 3 – Website Application (tall, right column spans 2 rows) */}
          <ServiceCard
            delay={0.2}
            gridColumn="2 / 3"
            gridRow="1 / 3"
            title="Website Application"
            subtitle="Scalable Digital Products"
            description="Developing full-featured web applications with robust architecture, smooth interactions, and scalable backend systems built for continuous growth."
            icon={<AppWindow size={22} color="#fff" strokeWidth={1.8} />}
          />

          {/* Card 2 – Website (bottom-left) */}
          <ServiceCard
            delay={0.13}
            gridColumn="1 / 2"
            gridRow="2 / 3"
            title="Website"
            subtitle="Fast & Modern Web Presence"
            description="Building clean, high-performance websites that represent your brand with clarity and precision across all devices and browsers."
            icon={<Globe size={22} color="#fff" strokeWidth={1.8} />}
          />
        </div>
      </div>
    </section>
  );
}
