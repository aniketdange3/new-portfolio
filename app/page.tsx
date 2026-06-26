"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Loader } from "@/components/loader/Loader";
import { Nav } from "@/components/ui/Nav";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { Skills } from "@/components/skills/Skills";
import { Projects } from "@/components/projects/Projects";
import { Experience } from "@/components/experience/Experience";
import { MoreInfo } from "@/components/moreinfo/MoreInfo";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/ui/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Cinematic Loader */}
      <AnimatePresence>
        {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {/* Main experience */}
      {loaded && (
        <>
          <Nav />
          <main id="main-content">
            <Hero />

            {/* Section dividers */}
            <div className="divider" />
            <About />

            <div className="divider" />
            <Skills />

            <div className="divider" />
            <Projects />

            <div className="divider" />
            <Experience />

            <div className="divider" />
            <MoreInfo />

            <div className="divider" />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
