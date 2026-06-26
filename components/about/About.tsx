"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { personal } from "@/lib/data";

function CountUp({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { label: "Projects shipped", value: personal.stats.projects, suffix: "+" },
  { label: "Years experience", value: personal.stats.years, suffix: "+" },
  { label: "Happy clients", value: personal.stats.clients, suffix: "+" },
  { label: "APIs integrated", value: personal.stats.apis, suffix: "+" },
];

const EASE = [0.19, 1, 0.22, 1] as const;

const fadeUp = {
  hidden:  { opacity: 0, y: 48, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15%" });

  return (
    <section id="about" ref={sectionRef} className="section">
      <div className="container">
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "5rem" }}
        >
          {/* Label */}
          <motion.div variants={fadeUp}>
            <span className="text-label" style={{ color: "var(--violet)" }}>
              ✦ &nbsp; 01 — About
            </span>
          </motion.div>

          {/* Manifesto */}
          <motion.div variants={fadeUp}>
            <blockquote
              className="text-display-lg font-display"
              style={{
                color: "var(--text-primary)",
                maxWidth: "900px",
                lineHeight: 1.05,
              }}
            >
              I build digital products{" "}
              <em
                style={{
                  fontStyle: "normal",
                  background: "linear-gradient(135deg, #7B5EFF, #00D9FF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                people&nbsp;remember.
              </em>
            </blockquote>
          </motion.div>

          {/* Bio + Stats grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "3rem",
              alignItems: "start",
            }}
          >
            {/* Bio */}
            <motion.div variants={fadeUp}>
              <p
                style={{
                  fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                  maxWidth: "520px",
                }}
              >
                {personal.bio}
              </p>
              <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
                {["React.js", "Next.js", "TypeScript", "Node.js", "MongoDB", "AI/ML"].map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
                <a
                  href={`mailto:${personal.email}`}
                  className="btn-primary"
                  style={{ textDecoration: "none" }}
                  data-cursor-hover
                >
                  Say hello →
                </a>
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{ textDecoration: "none" }}
                  data-cursor-hover
                >
                  GitHub
                </a>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5px",
                background: "var(--border)",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="glass-card"
                  style={{
                    padding: "2rem",
                    borderRadius: i === 0 ? "20px 0 0 0" : i === 1 ? "0 20px 0 0" : i === 2 ? "0 0 0 20px" : "0 0 20px 0",
                  }}
                >
                  <div
                    className="text-display-md gradient-text font-display"
                    style={{ lineHeight: 1 }}
                  >
                    <CountUp end={s.value} suffix={s.suffix} />
                  </div>
                  <div
                    className="text-label"
                    style={{ color: "var(--text-tertiary)", marginTop: "0.5rem" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
