"use client";

import React, { useEffect, useRef, useState } from "react";

// RTL detection for Hebrew/Arabic
function isRTL(text: string) {
  return /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F]/.test(text);
}

export interface InfoCardProps {
  image: string;
  title: string;
  description: string;
  width?: number | string;
  height?: number | string;
  borderColor?: string;
  borderBgColor?: string;
  borderWidth?: number;
  borderPadding?: number;
  cardBgColor?: string;
  shadowColor?: string;
  patternColor1?: string;
  patternColor2?: string;
  textColor?: string;
  hoverTextColor?: string;
  fontFamily?: string;
  rtlFontFamily?: string;
  effectBgColor?: string;
  contentPadding?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  image,
  title,
  description,
  width = 388,
  height = 378,
  borderColor = "#DAFF3E",
  borderBgColor = "#242424",
  borderWidth = 3,
  borderPadding = 14,
  cardBgColor = "#000",
  shadowColor = "#242424",
  patternColor1 = "rgba(230,230,230,0.15)",
  patternColor2 = "rgba(240,240,240,0.15)",
  textColor = "#f5f5f5",
  hoverTextColor = "#242424",
  fontFamily = "'Roboto Mono', monospace",
  rtlFontFamily = "'Montserrat', sans-serif",
  effectBgColor = "#DAFF3E",
  contentPadding = "10px 16px",
}) => {
  const [hovered, setHovered] = useState(false);
  const [flash, setFlash] = useState(false);
  const borderRef = useRef<HTMLDivElement>(null);
  const flashTimeout = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (flashTimeout.current) window.clearTimeout(flashTimeout.current);
    };
  }, []);

  // Mouse movement for rotating border
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const border = borderRef.current;
    if (!border) return;
    const rect = border.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const angle = Math.atan2(y, x);
    border.style.setProperty("--rotation", `${angle}rad`);
  };

  // RTL logic
  const rtl = isRTL(title) || isRTL(description);
  const effectiveFont = rtl ? rtlFontFamily : fontFamily;
  const titleDirection = isRTL(title) ? "rtl" : "ltr";
  const descDirection = isRTL(description) ? "rtl" : "ltr";

  // Sizes for inner card (matches .inner-container: 354x344)
  const innerWidth = "100%";
  const innerHeight = "100%";

  // Pattern background (unchanged, just colors are props)
  const pattern =
    `linear-gradient(45deg, ${patternColor1} 25%, transparent 25%, transparent 75%, ${patternColor2} 75%),` +
    `linear-gradient(-45deg, ${patternColor2} 25%, transparent 25%, transparent 75%, ${patternColor1} 75%)`;

  // Border gradient
  const borderGradient = `conic-gradient(from var(--rotation,0deg), ${borderColor} 0deg, ${borderColor} 90deg, ${borderBgColor} 90deg, ${borderBgColor} 360deg)`;

  return (
    <div
      ref={borderRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setHovered(true);
        setFlash(true);
        if (flashTimeout.current) window.clearTimeout(flashTimeout.current);
        flashTimeout.current = window.setTimeout(() => setFlash(false), 220);
      }}
      onMouseLeave={() => {
        setHovered(false);
        if (borderRef.current)
          borderRef.current.style.setProperty("--rotation", "0deg");
      }}
      style={{
        width,
        height,
        border: `${borderWidth}px solid transparent`,
        borderRadius: "1em",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        backgroundImage: `linear-gradient(${cardBgColor}, ${cardBgColor}), ${borderGradient}`,
        padding: borderPadding,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        userSelect: "none",
        transition: "box-shadow 0.3s, transform 0.3s",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered
          ? `0 0 40px 10px ${hoverTextColor}`
          : `0 16px 40px -22px ${shadowColor}`,
        position: "relative",
        fontFamily: effectiveFont,
      } as React.CSSProperties}
    >
      <div
        style={{
          width: innerWidth,
          height: innerHeight,
          borderRadius: "1em",
          background: cardBgColor,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          backgroundImage: pattern,
          backgroundSize: "20.84px 20.84px",
          padding: "0 0 8px 0",
          position: "relative",
        }}
      >
        <div style={{ width: "100%", position: "relative", overflow: "hidden" }}>
          <img
            src={image}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              opacity: flash ? 0.45 : 0,
              background: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.85), transparent 35%), radial-gradient(circle at 75% 35%, rgba(255,255,255,0.55), transparent 20%)`,
              transition: "opacity 0.25s ease-out",
              mixBlendMode: "screen",
            }}
          />
        </div>
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: contentPadding,
            minHeight: 0,
          }}
        >
          <h1
            style={{
              fontSize: 21,
              fontWeight: "bold",
              letterSpacing: "-.01em",
              lineHeight: "normal",
              marginBottom: 5,
              color: hovered ? hoverTextColor : textColor,
              transition: "color 0.3s ease",
              position: "relative",
              overflow: "hidden",
              direction: titleDirection,
              width: "auto",
            }}
          >
            <span
              style={{
                position: "relative",
                zIndex: 10,
                padding: "2px 4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                width: "100%",
                height: "100%",
              }}
            >
              {title}
            </span>
            <span
              style={{
                clipPath: hovered
                  ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
                  : "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
                transformOrigin: "center",
                transition: "all cubic-bezier(.1,.5,.5,1) 0.4s",
                position: "absolute",
                left: -4,
                right: -4,
                top: -4,
                bottom: -4,
                zIndex: 0,
                backgroundColor: effectBgColor,
              }}
            />
          </h1>
          <p
            style={{
              fontSize: 14,
              color: textColor,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              direction: descDirection,
              marginBottom: 0,
              paddingBottom: 0,
              minHeight: 0,
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
