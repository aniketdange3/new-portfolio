"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personal } from "@/lib/data";
import {
  MapPin, Mail, Phone,
  Code2, Cpu, Layers, ArrowRight, ExternalLink,
  Download, CheckCircle2
} from "lucide-react";

const EASE = [0.19, 1, 0.22, 1] as const;

// Inline SVG brand icons
function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const roles = personal.roles;

// ── Split text into chars for kinetic animation ──
function AnimatedWord({
  text,
  delay = 0,
  gradient = false,
  className = "",
}: {
  text: string;
  delay?: number;
  gradient?: boolean;
  className?: string;
}) {
  return (
    <span
      style={{
        display: "inline-block",
        overflow: "hidden",
        verticalAlign: "bottom",
        ...(gradient
          ? {
              background: "linear-gradient(135deg, #7B5EFF, #00D9FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }
          : {}),
      }}
      className={className}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", opacity: 0, rotateX: -80 }}
          animate={{ y: "0%", opacity: 1, rotateX: 0 }}
          transition={{
            duration: 0.55,
            delay: delay + i * 0.04,
            ease: [0.19, 1, 0.22, 1],
          }}
          style={{ display: "inline-block", transformOrigin: "bottom" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [downloadState, setDownloadState] = useState<"idle" | "loading" | "done">("idle");
  const [progress, setProgress] = useState(0);

  const startDownload = () => {
    if (downloadState !== "idle") return;
    setDownloadState("loading");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadState("done");

          // Trigger download
          const link = document.createElement("a");
          link.href = "/Aniket_Dange_Resume_1.docx";
          link.download = "Aniket_Dange_Resume.docx";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 150);
    const iv = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2800);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: (d: number) => ({
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { duration: 0.7, delay: d, ease: EASE },
    }),
  } as const;

  const infoItems = [
    { icon: <MapPin size={12} />, text: "Nagpur, MH" },
    { icon: <Code2 size={12} />, text: "MERN Stack" },
    { icon: <Cpu size={12} />, text: "AI Builder" },
    { icon: <Layers size={12} />, text: "3+ Years" },
  ];

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
        paddingTop: "80px",
      }}
    >
      {/* Ambient background glows */}
      <div 
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "var(--grad-hero)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div
        className="container hero-grid"
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "4rem",
          alignItems: "center",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        {/* Left Column: Info & Details */}
        <div
          className="hero-left"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "left",
          }}
        >
          {/* Availability badge */}
          {isVisible && (
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{ marginBottom: "1.5rem" }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.35rem 1rem",
                  borderRadius: "100px",
                  border: "1px solid rgba(0,245,160,0.25)",
                  background: "rgba(0,245,160,0.06)",
                  fontFamily: '"Space Mono", monospace',
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--green)",
                }}
              >
                <span
                  style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: "var(--green)",
                    boxShadow: "0 0 8px var(--green)",
                    animation: "pulse-glow 2s ease-in-out infinite",
                    display: "inline-block",
                  }}
                />
                Available for work
              </span>
            </motion.div>
          )}

          {/* Name */}
          {isVisible && (
            <h1
              style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
                marginBottom: "0.5rem",
              }}
            >
              <span style={{ display: "block", marginBottom: "0.1em" }}>
                <AnimatedWord text="Aniket" delay={0.1} />
              </span>
              <span style={{ display: "block" }}>
                <AnimatedWord text="Dange" delay={0.4} />
              </span>
            </h1>
          )}

          {/* Divider line */}
          {isVisible && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
              style={{
                width: "160px",
                height: "1px",
                background: "linear-gradient(90deg, var(--violet), var(--cyan), transparent)",
                margin: "1.25rem 0",
                transformOrigin: "left",
              }}
            />
          )}

          {/* Cycling role */}
          {isVisible && (
            <motion.div
              custom={0.8}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{
                height: "clamp(1.6rem, 3vw, 2.4rem)",
                overflow: "hidden",
                marginBottom: "1.25rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
                  animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: EASE }}
                  style={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontWeight: 600,
                    fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
                    color: "var(--text-secondary)",
                    letterSpacing: "-0.01em",
                    display: "block",
                  }}
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          )}

          {/* Quick info pills */}
          {isVisible && (
            <motion.div
              custom={0.9}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "1.5rem",
              }}
            >
              {infoItems.map((item, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.05, duration: 0.4, ease: EASE }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    padding: "0.3rem 0.85rem",
                    borderRadius: "100px",
                    border: "1px solid rgba(255,255,255,0.07)",
                    background: "rgba(255,255,255,0.04)",
                    fontFamily: '"Space Mono", monospace',
                    fontSize: "0.65rem",
                    letterSpacing: "0.06em",
                    color: "rgba(255,255,255,0.45)",
                    textTransform: "uppercase",
                  }}
                >
                  <span style={{ color: "var(--violet)", opacity: 0.8 }}>{item.icon}</span>
                  {item.text}
                </motion.span>
              ))}
            </motion.div>
          )}

          {/* Tagline */}
          {isVisible && (
            <motion.p
              custom={1.05}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{
                margin: "0 0 2rem",
                fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
                color: "var(--text-secondary)",
                lineHeight: 1.75,
                maxWidth: "500px",
              }}
            >
              Results-driven Full Stack Developer with{" "}
              <span style={{ color: "var(--violet-2)", fontWeight: 600 }}>3+ years</span> building
              MERN & Next.js apps — from{" "}
              <span style={{ color: "var(--cyan)" }}>government portals</span> to{" "}
              <span style={{ color: "var(--rose)" }}>AI-powered SaaS</span>.
            </motion.p>
          )}

          {/* CTA Buttons */}
          {isVisible && (
            <motion.div
              custom={1.2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}
            >
              <button
                className="btn-primary"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                aria-label="Let's work together"
                style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
              >
                <span>Let&apos;s build together</span>
                <ArrowRight size={15} />
              </button>
              <button
                className="btn-ghost"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                aria-label="View my work"
                style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
              >
                <span>View Projects</span>
                <ExternalLink size={13} />
              </button>
            </motion.div>
          )}
        </div>

        {/* Right Column: Sleek Glassmorphic Profile Card */}
        {isVisible && (
          <motion.div
            custom={1.3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="hero-right"
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <div className="profile-glass-card">
              {/* Card Header with Initials Badge */}
              <div className="profile-card-header">
                <div className="initials-badge">
                  <span>AD</span>
                </div>
                <div>
                  <h3 className="profile-name">Aniket Ramdas Dange</h3>
                  <p className="profile-title">Full Stack Engineer</p>
                </div>
              </div>

              <div className="profile-divider" />

              {/* Grid of Key Focus Details */}
              <div className="profile-details-grid">
                <div className="detail-item">
                  <span className="detail-label">Location</span>
                  <span className="detail-value">Nagpur, India</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Experience</span>
                  <span className="detail-value">3+ Years</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Primary Stack</span>
                  <span className="detail-value">MERN & Next.js</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">AI / ML Focus</span>
                  <span className="detail-value">Agents & RAG</span>
                </div>
              </div>

              <div className="profile-divider" />

              {/* Quick Interactive Contacts */}
              <div className="profile-contact-list">
                <a href={`mailto:${personal.email}`} className="contact-pill-item" title="Email me">
                  <Mail size={14} />
                  <span>Email</span>
                </a>
                <a href={`tel:${personal.phone}`} className="contact-pill-item" title="Call me">
                  <Phone size={14} />
                  <span>Call</span>
                </a>
                <a href={personal.github} target="_blank" rel="noopener noreferrer" className="contact-pill-item" title="GitHub Profile">
                  <GithubIcon size={14} />
                  <span>GitHub</span>
                </a>
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="contact-pill-item" title="LinkedIn Profile">
                  <LinkedInIcon size={14} />
                  <span>LinkedIn</span>
                </a>
              </div>

              {/* Resume download action */}
              <div style={{ marginTop: "1.5rem" }}>
                {downloadState === "idle" && (
                  <button onClick={startDownload} className="resume-download-btn">
                    <Download size={14} />
                    <span>Download Resume</span>
                  </button>
                )}
                {downloadState === "loading" && (
                  <div className="resume-download-loading-wrapper">
                    <div className="loading-bar-bg">
                      <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <span className="loading-percentage">Preparing Resume... {progress}%</span>
                  </div>
                )}
                {downloadState === "done" && (
                  <div className="resume-download-success">
                    <span className="success-msg">
                      <CheckCircle2 size={14} />
                      Downloaded successfully
                    </span>
                    <button onClick={() => setDownloadState("idle")} className="reset-download-btn">
                      Reset
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: "0.55rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          Scroll
        </span>
        <div className="scroll-line" />
      </motion.div>

      <style>{`
        .profile-glass-card {
          width: 100%;
          max-width: 440px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 2.25rem;
          box-shadow: 
            0 30px 60px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .profile-glass-card:hover {
          border-color: rgba(123, 94, 255, 0.2);
          box-shadow: 
            0 30px 60px rgba(0, 0, 0, 0.5),
            0 0 40px rgba(123, 94, 255, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .profile-card-header {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .initials-badge {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          background: linear-gradient(135deg, var(--violet), var(--cyan));
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 20px rgba(123, 94, 255, 0.25);
        }

        .initials-badge span {
          font-family: "Space Grotesk", sans-serif;
          font-weight: 700;
          font-size: 1.15rem;
          color: white;
          letter-spacing: -0.05em;
        }

        .profile-name {
          font-family: "Space Grotesk", sans-serif;
          font-weight: 600;
          font-size: 1.25rem;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          margin-bottom: 0.15rem;
        }

        .profile-title {
          font-family: "Space Mono", monospace;
          font-size: 0.72rem;
          color: var(--cyan);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .profile-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.06);
          margin: 1.75rem 0;
        }

        .profile-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .detail-label {
          font-family: "Space Mono", monospace;
          font-size: 0.62rem;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .detail-value {
          font-family: "Space Grotesk", sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .profile-contact-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.6rem;
        }

        .contact-pill-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem 0.85rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          color: var(--text-secondary);
          text-decoration: none;
          font-family: "Space Grotesk", sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .contact-pill-item:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
          transform: translateY(-1px);
        }

        .resume-download-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.8rem;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
          font-family: "Space Grotesk", sans-serif;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.25s;
        }

        .resume-download-btn:hover {
          background: white;
          color: var(--void);
          border-color: white;
          box-shadow: 0 10px 25px rgba(255, 255, 255, 0.15);
        }

        .resume-download-loading-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .loading-bar-bg {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 100px;
          overflow: hidden;
        }

        .loading-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--violet), var(--cyan));
          border-radius: 100px;
          transition: width 0.1s linear;
        }

        .loading-percentage {
          font-family: "Space Mono", monospace;
          font-size: 0.65rem;
          color: var(--text-secondary);
          text-align: center;
        }

        .resume-download-success {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 1rem;
          border-radius: 14px;
          background: rgba(0, 245, 160, 0.04);
          border: 1px solid rgba(0, 245, 160, 0.15);
        }

        .success-msg {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: "Space Grotesk", sans-serif;
          font-size: 0.85rem;
          color: var(--green);
          font-weight: 500;
        }

        .reset-download-btn {
          background: none;
          border: none;
          color: var(--text-tertiary);
          font-family: "Space Grotesk", sans-serif;
          font-size: 0.75rem;
          text-decoration: underline;
          cursor: pointer;
          padding: 0;
        }

        .reset-download-btn:hover {
          color: var(--text-secondary);
        }

        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
            text-align: center !important;
            margin-top: 2rem !important;
          }
          .hero-left {
            align-items: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}
