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

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const center = { x: canvas.width / 2, y: canvas.height / 2 };

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      center.x = canvas.width / 2;
      center.y = canvas.height / 2;
    };
    window.addEventListener("resize", handleResize);

    // Particle system configuration for the Heart shape
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

    const getHeartTarget = (idx: number, cx: number, cy: number, pulse: number) => {
      const tVal = (Math.PI * 2 * idx) / NUM;
      const currentScale = (5.5 + (idx % 3)) * pulse;
      const tx = cx + 16 * Math.pow(Math.sin(tVal), 3) * currentScale;
      // Shift the heart slightly upward (-40px) to make perfect room for centered text elements below it
      const ty = cy - 40 - (13 * Math.cos(tVal) - 5 * Math.cos(2 * tVal) - 2 * Math.cos(3 * tVal) - Math.cos(4 * tVal)) * currentScale;
      return { tx, ty };
    };

    const particles: Particle[] = Array.from({ length: NUM }, (_, i) => {
      const angle = (Math.PI * 2 * i) / NUM + Math.random() * 0.4;
      const radius = 280 + Math.random() * 200;

      const startX = center.x + Math.cos(angle) * radius;
      const startY = center.y + Math.sin(angle) * radius;

      const { tx, ty } = getHeartTarget(i, center.x, center.y, 1.0);

      return {
        x: startX,
        y: startY,
        tx,
        ty,
        vx: 0, vy: 0,
        size: 1.2 + Math.random() * 2.0,
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

      // Heart pulse beat simulation
      const pulseSpeed = 0.006;
      const pulse = 1 + Math.sin(now * pulseSpeed) * 0.08 * eased;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = center.x;
      const cy = center.y;

      // Draw connection lines (constellation network)
      ctx.shadowBlur = 0;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = (1 - dist / 60) * 0.15 * eased;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles converging to the pulsing heart shape
      particles.forEach((p, idx) => {
        p.alpha = Math.min(p.alpha + 0.025, eased);

        const { tx, ty } = getHeartTarget(idx, cx, cy, pulse);

        p.x += (tx - p.x) * 0.04 * (eased * 2);
        p.y += (ty - p.y) * 0.04 * (eased * 2);

        ctx.globalAlpha = p.alpha * eased;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
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
        setProgress(100);
        setPhase("text");
        setTimeout(() => {
          setPhase("exit");
          setTimeout(onComplete, 800);
        }, 1200);
      }
    };

    animFrame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrame);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          className="loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            inset: 0,
            overflow: "hidden"
          }}
        >
          <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} />

          {/* Centered Top Text overlay - perfectly aligned above the shape */}
          <div
            style={{
              position: "absolute",
              top: "20%",
              textAlign: "center",
              zIndex: 3,
              width: "calc(100% - 3rem)",
            }}
          >
            <div
              style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: "clamp(1rem, 1.2vw, 1.1rem)",
                fontWeight: phase === "text" ? 900 : 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: phase === "text" ? "#FFFFFF" : "rgba(255,255,255,0.9)",
                textShadow: phase === "text" ? "0 0 15px rgba(255, 94, 138, 0.8)" : "none",
                transition: "all 0.5s ease",
              }}
            >
              Building the Future Together
            </div>
            <div
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: "clamp(0.6rem, 1vw, 0.72rem)",
                letterSpacing: "0.15em",
                color: "rgba(255,255,255,0.45)",
                marginTop: "0.6rem",
                fontStyle: "italic",
              }}
            >
              &ldquo;Where Logic Meets Creativity&rdquo;
            </div>
          </div>

          {/* Centered Progress bar - positioned below the heart shape */}
          <div
            style={{
              position: "absolute",
              top: "70%",
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
                height: "2px",
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
                transition={{ duration: 0.2, ease: "linear" }}
              />
            </div>
          </div>



          <style>{`
            .heart-beat-container {
              animation: beat 0.8s infinite alternate cubic-bezier(0.25, 0.8, 0.25, 1);
              display: inline-block;
            }
            @keyframes beat {
              0% { transform: scale(0.9); opacity: 0.8; }
              100% { transform: scale(1.2) translateY(-2px); opacity: 1; filter: drop-shadow(0 0 8px #FF5E8A); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
