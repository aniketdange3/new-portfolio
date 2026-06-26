"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { personal } from "@/lib/data";
import { HeroScene } from "@/components/three/HeroScene";

const roles = personal.roles;

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Magnetic button refs
  const ctaRef1  = useRef<HTMLButtonElement>(null);
  const ctaRef2  = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2500);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // Magnetic button hook
  const useMagnetic = (ref: React.RefObject<HTMLButtonElement | null>) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 500, damping: 35 });
    const sy = useSpring(y, { stiffness: 500, damping: 35 });

    const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top  + rect.height / 2);
      x.set(dx * 0.35);
      y.set(dy * 0.35);
    };
    const onLeave = () => { x.set(0); y.set(0); };
    return { sx, sy, onMove, onLeave };
  };

  const mag1 = useMagnetic(ctaRef1);
  const mag2 = useMagnetic(ctaRef2);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };

  const lineVariants = {
    hidden:   { opacity: 0, y: 60, filter: "blur(10px)" },
    visible:  { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } },
  };

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* WebGL Background Scene */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <HeroScene />
      </div>

      {/* Radial gradient vignette */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(6,6,10,0.7) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Label */}
          <motion.div variants={lineVariants} style={{ marginBottom: "2rem" }}>
            <span className="text-label" style={{ color: "var(--text-tertiary)" }}>
              ✦ &nbsp; Available for work &nbsp; ✦
            </span>
          </motion.div>

          {/* Name — oversized kinetic headline */}
          <motion.h1
            variants={lineVariants}
            className="text-display-2xl font-display"
            style={{ marginBottom: "0.5rem", color: "var(--text-primary)" }}
          >
            Aniket
          </motion.h1>
          <motion.div
            variants={lineVariants}
            className="text-display-2xl font-display gradient-text"
            style={{ marginBottom: "0.5rem" }}
          >
            Ramdas
          </motion.div>
          <motion.div
            variants={lineVariants}
            className="text-display-2xl font-display"
            style={{ marginBottom: "2.5rem", color: "var(--text-primary)" }}
          >
            Dange
          </motion.div>

          {/* Cycling role — animated swap */}
          <motion.div
            variants={lineVariants}
            style={{
              height: "clamp(2rem, 4vw, 3.5rem)",
              overflow: "hidden",
              marginBottom: "2rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <motion.span
              key={roleIndex}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="text-heading font-display"
              style={{ color: "var(--text-secondary)", display: "block" }}
            >
              {roles[roleIndex]}
            </motion.span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={lineVariants}
            style={{
              maxWidth: "520px",
              margin: "0 auto 3rem",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
            }}
          >
            {personal.tagline} I engineer at the intersection of{" "}
            <span style={{ color: "var(--violet-2)" }}>performance</span>,{" "}
            <span style={{ color: "var(--cyan)" }}>intelligence</span>, and{" "}
            <span style={{ color: "var(--rose)" }}>craft</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={lineVariants}
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            <motion.button
              ref={ctaRef1}
              className="btn-primary"
              onMouseMove={mag1.onMove}
              onMouseLeave={mag1.onLeave}
              style={{ x: mag1.sx, y: mag1.sy }}
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              aria-label="Let's work together"
            >
              <span>Let&apos;s build together</span>
              <span aria-hidden>→</span>
            </motion.button>
            <motion.button
              ref={ctaRef2}
              className="btn-ghost"
              onMouseMove={mag2.onMove}
              onMouseLeave={mag2.onLeave}
              style={{ x: mag2.sx, y: mag2.sy }}
              onClick={() => {
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              aria-label="View my work"
            >
              <span>Explore work</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span className="text-label" style={{ color: "var(--text-tertiary)" }}>Scroll</span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  );
}
