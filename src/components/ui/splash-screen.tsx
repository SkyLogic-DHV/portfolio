"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const SPLASH_CONFIG = {
  WORD: "SKYLOGIC",
  FONT_SIZE: "clamp(2.4rem, 12vw, 6.5rem)",
  GAP: "0.22em",
  O_EM: 0.52,
  O_FOCUS_SCALE: 1.4,

  LETTER_START_DELAY: 0.15,
  LETTER_STAGGER: 0.11,
  LETTER_DURATION: 0.85,
  LETTER_LIFT: 90,

  SETTLE_HOLD: 0.45,
  FOCUS_DURATION: 0.55,

  ZOOM_DURATION: 0.95,
  ZOOM_SCALE: 42,
  FADE_DELAY_FRACTION: 0.58,
  FADE_DURATION: 0.26,

  CONTENT_DURATION: 0.9,
  CONTENT_SCALE: 1.08,

  SESSION_KEY: "skylogic-splash-seen",
} as const;

const LETTERS = SPLASH_CONFIG.WORD.split("");

const BOUNCE_TIMES = [0, 0.55, 0.7, 0.82, 0.92, 1];

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"letters" | "focus" | "zoom">("letters");
  const [finished, setFinished] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [entered, setEntered] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const oRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let seen = false;
    let reduced = false;
    try {
      seen = sessionStorage.getItem(SPLASH_CONFIG.SESSION_KEY) === "1";
    } catch {}
    try {
      reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {}

    if (seen || reduced) {
      setSkipped(true);
      setEntered(true);
      return;
    }

    try {
      sessionStorage.setItem(SPLASH_CONFIG.SESSION_KEY, "1");
    } catch {}

    const n = LETTERS.length;
    const letterEnd =
      SPLASH_CONFIG.LETTER_START_DELAY +
      (n - 1) * SPLASH_CONFIG.LETTER_STAGGER +
      SPLASH_CONFIG.LETTER_DURATION;
    const focusAt = letterEnd + SPLASH_CONFIG.SETTLE_HOLD;
    const zoomAt = focusAt + SPLASH_CONFIG.FOCUS_DURATION;
    const doneAt = zoomAt + SPLASH_CONFIG.ZOOM_DURATION + SPLASH_CONFIG.FADE_DURATION;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const tFocus = window.setTimeout(() => setPhase("focus"), focusAt * 1000);
    const tZoom = window.setTimeout(() => setPhase("zoom"), zoomAt * 1000);
    const tDone = window.setTimeout(() => setFinished(true), doneAt * 1000);

    return () => {
      clearTimeout(tFocus);
      clearTimeout(tZoom);
      clearTimeout(tDone);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (finished || skipped) {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  }, [finished, skipped]);

  useEffect(() => {
    if (skipped || phase !== "focus") return;
    const el = oRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setOrigin({
      x: (cx / window.innerWidth) * 100,
      y: (cy / window.innerHeight) * 100,
    });
  }, [phase, skipped]);

  const focused = phase === "focus" || phase === "zoom";
  const zooming = phase === "zoom";
  const reveal = entered || skipped || finished;
  const splashVisible = !skipped && !finished;

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-0 z-50 overflow-hidden pointer-events-none"
        initial={false}
        animate={zooming ? { scale: SPLASH_CONFIG.ZOOM_SCALE } : { scale: 1 }}
        transition={{ duration: SPLASH_CONFIG.ZOOM_DURATION, ease: "circIn" }}
        style={{
          transformOrigin: `${origin.x}% ${origin.y}%`,
          visibility: splashVisible ? "visible" : "hidden",
          display: skipped ? "none" : undefined,
          willChange: "transform",
        }}
      >
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center bg-white"
          initial={false}
          animate={zooming ? { opacity: 0 } : { opacity: 1 }}
          transition={{
            duration: SPLASH_CONFIG.FADE_DURATION,
            delay: zooming ? SPLASH_CONFIG.ZOOM_DURATION * SPLASH_CONFIG.FADE_DELAY_FRACTION : 0,
            ease: "easeIn",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 70% 55% at 50% 40%, rgba(56, 189, 248, 0.14), transparent 60%),
                radial-gradient(ellipse 60% 50% at 80% 60%, rgba(37, 99, 235, 0.1), transparent 60%),
                linear-gradient(180deg, #ffffff 0%, #eef6ff 100%)
              `,
            }}
          />

          <motion.div
            className="relative flex items-center select-none"
            style={{ gap: SPLASH_CONFIG.GAP, letterSpacing: "-0.04em" }}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {LETTERS.map((letter, idx) => {
              const isO = letter === "O";
              const delay = SPLASH_CONFIG.LETTER_START_DELAY + idx * SPLASH_CONFIG.LETTER_STAGGER;

              if (isO) {
                return (
                  <motion.span
                    key={letter}
                    ref={oRef}
                    className="relative inline-flex items-center justify-center"
                    style={{
                      width: `${SPLASH_CONFIG.O_EM}em`,
                      height: `${SPLASH_CONFIG.O_EM}em`,
                      fontSize: SPLASH_CONFIG.FONT_SIZE,
                      transformOrigin: "center",
                    }}
                    initial={{ y: SPLASH_CONFIG.LETTER_LIFT, opacity: 0, scale: 0.85 }}
                    animate={
                      focused
                        ? {
                            y: 0,
                            opacity: 1,
                            scale: SPLASH_CONFIG.O_FOCUS_SCALE,
                            transition: { duration: SPLASH_CONFIG.FOCUS_DURATION, ease: "circOut" },
                          }
                        : {
                            y: [SPLASH_CONFIG.LETTER_LIFT, 0, -20, 0, -7, 0],
                            opacity: [0, 1, 1, 1, 1, 1],
                            scale: [0.85, 1.1, 0.98, 1.03, 0.99, 1],
                            transition: {
                              duration: SPLASH_CONFIG.LETTER_DURATION,
                              delay,
                              times: BOUNCE_TIMES,
                              ease: "easeOut",
                            },
                          }
                    }
                  >
                    <motion.span
                      className="absolute rounded-full"
                      style={{
                        inset: "-35%",
                        background:
                          "radial-gradient(circle, rgba(245, 230, 66, 0.95) 0%, rgba(240, 180, 0, 0.45) 55%, transparent 75%)",
                        filter: "blur(12px)",
                        willChange: "transform, opacity",
                      }}
                      initial={{ opacity: 0, scale: 1 }}
                      animate={focused ? { opacity: [0.7, 1, 0.7], scale: [1, 1.4, 1] } : { opacity: 0.45, scale: 1 }}
                      transition={
                        focused
                          ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
                          : { duration: 0.5, delay: delay + 0.25 }
                      }
                    />
                    <motion.span
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle at 35% 35%, #fff9c4 0%, #f5e642 45%, #f0b400 100%)",
                        boxShadow: "0 0 14px #f5e642cc, 0 0 34px #f5c30088, 0 0 64px rgba(245, 195, 0, 0.35)",
                        willChange: "transform, opacity",
                      }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={focused ? { opacity: [0.9, 1, 0.9], scale: [1, 1.09, 1] } : { opacity: 1, scale: 1 }}
                      transition={
                        focused
                          ? { duration: 1.3, repeat: Infinity, ease: "easeInOut" }
                          : { duration: 0.4, delay }
                      }
                    />
                    <motion.span
                      className="absolute rounded-full"
                      style={{ inset: "-8%", border: "2px solid rgba(245, 195, 0, 0.55)" }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={zooming ? { opacity: 0 } : focused ? { opacity: [0, 0.65, 0], scale: [0.9, 2.6, 2.6] } : { opacity: 0, scale: 0.9 }}
                      transition={
                        zooming ? { duration: 0.25, ease: "easeOut" } : focused ? { duration: 1.5, repeat: Infinity, ease: "easeOut" } : { duration: 0.3 }
                      }
                    />
                  </motion.span>
                );
              }

              return (
                <motion.span
                  key={letter}
                  className="inline-block font-black text-[#0B1220]"
                  style={{ fontSize: SPLASH_CONFIG.FONT_SIZE, transformOrigin: "center" }}
                  initial={{ y: SPLASH_CONFIG.LETTER_LIFT, opacity: 0, scale: 0.85, rotate: 0 }}
                  animate={
                    focused
                      ? {
                          y: 5,
                          opacity: 0.16,
                          scale: 0.92,
                          rotate: 0,
                          transition: { duration: SPLASH_CONFIG.FOCUS_DURATION, ease: "easeInOut" },
                        }
                      : {
                          y: [SPLASH_CONFIG.LETTER_LIFT, 0, -18, 0, -6, 0],
                          opacity: [0, 1, 1, 1, 1, 1],
                          scale: [0.85, 1.06, 0.98, 1.02, 0.99, 1],
                          rotate: [0, -1.5, 1.2, -0.7, 0.4, 0],
                          transition: {
                            duration: SPLASH_CONFIG.LETTER_DURATION,
                            delay,
                            times: BOUNCE_TIMES,
                            ease: "easeOut",
                          },
                        }
                  }
                >
                  {letter}
                </motion.span>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: SPLASH_CONFIG.CONTENT_SCALE }}
        animate={reveal ? { opacity: 1, scale: 1 } : { opacity: 0, scale: SPLASH_CONFIG.CONTENT_SCALE }}
        transition={{ duration: skipped ? 0 : SPLASH_CONFIG.CONTENT_DURATION, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}