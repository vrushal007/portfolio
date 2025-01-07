"use client";

import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import Background from "@/components/layout/Background";
import Navigation from "@/components/layout/Navigation";

// Import all sections
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import GalaxyBackground from "@/components/layout/GalaxyBackround";

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".section");

      sections.forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          pin: true,
          pinSpacing: false,
        });

        if (i !== sections.length - 1) {
          gsap.to(section, {
            opacity: 0,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: sections[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
        }
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box ref={mainRef}>
      <Navigation />
      {/* <Background /> */}
      {/* <GalaxyBackground /> */}
      <Box id="hero" className="section">
        <Hero />
      </Box>
      <Box id="about" className="section">
        <About />
      </Box>
      <Box id="skills" className="section">
        <Skills />
      </Box>
      <Box id="experience" className="section">
        <Experience />
      </Box>
      <Box id="projects" className="section">
        <Projects />
      </Box>
      <Box id="contact" className="section">
        <Contact />
      </Box>
    </Box>
  );
}
