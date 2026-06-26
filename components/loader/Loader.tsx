"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"particles" | "text" | "exit">("particles");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const cx = canvas.width  / 2;
    const cy = canvas.height / 2;

    // Particle system
    const NUM = 220;
    type Particle = {
      x: number; y: number;
      tx: number; ty: number;
      vx: number; vy: number;
      size: number;
      color: string;
      alpha: number;
    };

    const colors = ["#7B5EFF", "#00D9FF", "#FF5E8A", "#FFB547", "#FFFFFF"];
    const particles: Particle[] = Array.from({ length: NUM }, (_, i) => {
      const angle = (Math.PI * 2 * i) / NUM + Math.random() * 0.4;
      const radius = 260 + Math.random() * 180;
      return {
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        tx: cx + (Math.random() - 0.5) * 80,
        ty: cy + (Math.random() - 0.5) * 50,
        vx: 0, vy: 0,
        size: 1.2 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0,
      };
    });

    let startTime = performance.now();
    let animFrame: number;

    const draw = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / 2200, 1);

      // Ease
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles converging
      particles.forEach((p) => {
        p.alpha = Math.min(p.alpha + 0.025, eased);
        p.x += (p.tx - p.x) * 0.04 * (eased * 2);
        p.y += (p.ty - p.y) * 0.04 * (eased * 2);

        ctx.globalAlpha = p.alpha * eased;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Progress tracking
      const prog = Math.floor(eased * 100);
      setProgress(prog);

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      if (eased < 1) {
        animFrame = requestAnimationFrame(draw);
      } else {
        setPhase("text");
        setTimeout(() => {
          setPhase("exit");
          setTimeout(onComplete, 800);
        }, 1000);
      }
    };

    animFrame = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animFrame);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          className="loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} />

          {/* ARD initials that appear after particles form */}
          <AnimatePresence>
            {phase !== "particles" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                style={{
                  position: "absolute",
                  textAlign: "center",
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontSize: "clamp(5rem, 15vw, 12rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.06em",
                    lineHeight: 1,
                    background: "linear-gradient(135deg, #7B5EFF, #00D9FF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "none",
                  }}
                >
                  ARD
                </div>
                <div
                  style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: "clamp(0.6rem, 1.2vw, 0.8rem)",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.4)",
                    marginTop: "1rem",
                  }}
                >
                  Loading Experience
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress bar */}
          <div
            style={{
              position: "absolute",
              bottom: "3rem",
              left: "50%",
              transform: "translateX(-50%)",
              width: "min(300px, 60vw)",
              zIndex: 3,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
                fontFamily: '"Space Mono", monospace',
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              <span>INITIALIZING</span>
              <span>{progress}%</span>
            </div>
            <div
              style={{
                height: "1px",
                background: "rgba(255,255,255,0.08)",
                borderRadius: "100px",
                overflow: "hidden",
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #7B5EFF, #00D9FF)",
                  borderRadius: "100px",
                  boxShadow: "0 0 12px rgba(123,94,255,0.8)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
