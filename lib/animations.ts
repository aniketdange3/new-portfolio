// Animation configurations — Spring physics, easing curves, durations
import type { Variants } from "framer-motion";

// ─── Spring Configs ────────────────────────────────────────────────────────
export const springs = {
  gentle: { type: "spring", stiffness: 120, damping: 20 },
  snappy: { type: "spring", stiffness: 300, damping: 30 },
  bouncy: { type: "spring", stiffness: 400, damping: 15 },
  slow:   { type: "spring", stiffness: 60,  damping: 25 },
  magnetic: { type: "spring", stiffness: 500, damping: 35 },
} as const;

// ─── Common Variants ───────────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { ...springs.gentle, duration: 0.7 },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

export const stagger = (delay = 0.08): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85, filter: "blur(6px)" },
  visible: {
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { ...springs.snappy },
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 60, filter: "blur(8px)" },
  visible: {
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { ...springs.gentle },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -60, filter: "blur(8px)" },
  visible: {
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { ...springs.gentle },
  },
};

// ─── Text Split Variants ───────────────────────────────────────────────────
export const charReveal: Variants = {
  hidden: { opacity: 0, y: "100%", rotateX: -90 },
  visible: {
    opacity: 1, y: "0%", rotateX: 0,
    transition: { ...springs.snappy, duration: 0.5 },
  },
};

// ─── GSAP Easing Strings ───────────────────────────────────────────────────
export const gsapEase = {
  smooth: "power3.inOut",
  out: "power4.out",
  in: "power4.in",
  elastic: "elastic.out(1, 0.75)",
  back: "back.out(1.7)",
  expo: "expo.out",
} as const;
