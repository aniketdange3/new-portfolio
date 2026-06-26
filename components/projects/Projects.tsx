"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";

const fadeUp = {
  hidden:  { opacity: 0, y: 48, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } },
};

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay: index * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      data-cursor-hover
      style={{
        position: "relative",
        borderRadius: "24px",
        overflow: "hidden",
        cursor: "none",
        background: `linear-gradient(135deg, ${project.color}12 0%, ${project.accent}08 100%)`,
        border: `1px solid ${hovered ? project.color + "40" : "rgba(255,255,255,0.07)"}`,
        transition: "border-color 0.4s, transform 0.4s",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? `0 24px 80px ${project.color}25, 0 0 0 1px ${project.color}20` : "none",
      }}
    >
      {/* Top glow bar */}
      <div
        style={{
          height: "3px",
          background: `linear-gradient(90deg, ${project.color}, ${project.accent})`,
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.4s",
        }}
      />

      <div style={{ padding: "2.5rem" }}>
        {/* Project number */}
        <div
          className="text-label"
          style={{
            color: project.color,
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: `${project.color}20`,
              border: `1px solid ${project.color}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.6rem",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          {project.subtitle}
        </div>

        {/* Title */}
        <h3
          className="text-display-md font-display"
          style={{
            color: "var(--text-primary)",
            marginBottom: "1rem",
            lineHeight: 1.05,
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "0.95rem",
            lineHeight: 1.7,
            marginBottom: "2rem",
          }}
        >
          {project.description}
        </p>

        {/* Metrics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "12px",
            overflow: "hidden",
            marginBottom: "2rem",
          }}
        >
          {Object.entries(project.metrics).map(([key, value]) => (
            <div
              key={key}
              style={{
                padding: "1rem",
                background: "rgba(6,6,10,0.5)",
              }}
            >
              <div
                style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: project.color,
                  marginBottom: "0.15rem",
                }}
              >
                {value}
              </div>
              <div
                className="text-label"
                style={{ color: "var(--text-tertiary)", fontSize: "0.6rem" }}
              >
                {key.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              textDecoration: "none",
              fontSize: "0.85rem",
              padding: "0.65rem 1.5rem",
              background: `linear-gradient(135deg, ${project.color}, ${project.accent})`,
            }}
            data-cursor-hover
          >
            Live Preview →
          </a>
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            style={{
              textDecoration: "none",
              fontSize: "0.85rem",
              padding: "0.65rem 1.5rem",
            }}
            data-cursor-hover
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Hover shimmer */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "60%",
              height: "100%",
              background: `linear-gradient(90deg, transparent, ${project.color}08, transparent)`,
              pointerEvents: "none",
            }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section id="projects" ref={sectionRef} className="section">
      <div className="container">
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={fadeUp} style={{ marginBottom: "1rem" }}>
            <span className="text-label" style={{ color: "var(--rose)" }}>
              ✦ &nbsp; 03 — Projects
            </span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-display-lg font-display" style={{ marginBottom: "1rem" }}>
            Immersive
            <br />
            <span className="gradient-text-warm">Worlds</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{
              color: "var(--text-secondary)",
              fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
              maxWidth: "480px",
              lineHeight: 1.7,
              marginBottom: "4rem",
            }}
          >
            Each project is a universe — engineered with intention, obsessive
            detail, and a ruthless focus on outcomes.
          </motion.p>

          {/* Projects grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
              gap: "1.5rem",
            }}
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
