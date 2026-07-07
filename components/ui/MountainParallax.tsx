"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { RefObject } from "react";

interface MountainParallaxProps {
  containerRef: RefObject<HTMLDivElement | null>;
}

export function MountainParallax({ containerRef }: MountainParallaxProps) {
  // Bind scroll progress of container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Layers translation: distant layers move slower, foreground layers move faster
  const yBack = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "-16%"]);
  const yFront = useTransform(scrollYProgress, [0, 1], ["0%", "-24%"]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: "50%",
          background: "radial-gradient(ellipse at center, rgba(123, 94, 255, 0.12) 0%, transparent 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Layer 1: Distant Mountain Range */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "80vh",
          y: yBack,
          zIndex: 1,
        }}
      >
        <svg
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%", fill: "url(#distant-grad)" }}
        >
          <defs>
            <linearGradient id="distant-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B0D19" />
              <stop offset="60%" stopColor="#07080F" />
              <stop offset="100%" stopColor="#05060A" />
            </linearGradient>
          </defs>
          <path d="M0 350 L120 220 L280 340 L450 190 L600 290 L750 160 L920 300 L1080 180 L1240 280 L1360 210 L1440 280 L1440 600 L0 600 Z" />
        </svg>
      </motion.div>

      {/* Layer 2: Mid-distance Mountain Range */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "75vh",
          y: yMid,
          zIndex: 2,
        }}
      >
        <svg
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%", fill: "url(#mid-grad)" }}
        >
          <defs>
            <linearGradient id="mid-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#101424" />
              <stop offset="50%" stopColor="#0A0D18" />
              <stop offset="100%" stopColor="#070910" />
            </linearGradient>
          </defs>
          <path d="M0 420 L180 310 L340 400 L520 280 L680 370 L840 250 L1000 360 L1180 290 L1320 380 L1440 330 L1440 600 L0 600 Z" />
        </svg>
      </motion.div>

      {/* Layer 3: Foreground Mountain Range */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "65vh",
          y: yFront,
          zIndex: 3,
        }}
      >
        <svg
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%", fill: "url(#front-grad)" }}
        >
          <defs>
            <linearGradient id="front-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#161A2E" />
              <stop offset="40%" stopColor="#0E111F" />
              <stop offset="100%" stopColor="#080A10" />
            </linearGradient>
          </defs>
          <path d="M0 480 L220 400 L410 460 L600 360 L780 430 L960 330 L1120 420 L1280 370 L1440 420 L1440 600 L0 600 Z" />
        </svg>
      </motion.div>

      {/* Fog/Misty Overlay at the bottom to blend with background */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "180px",
          background: "linear-gradient(to bottom, transparent, var(--void))",
          zIndex: 4,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
