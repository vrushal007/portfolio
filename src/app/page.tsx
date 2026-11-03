"use client";

import { Box } from "@mui/material";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Approach from "@/components/sections/Approach";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <Box>
      <Navigation />
      <Box id="hero">
        <Hero />
      </Box>
      <Box id="about">
        <About />
      </Box>
      <Projects />
      <Skills />
      <Box id="approach">
        <Approach />
      </Box>
      <Box id="experience">
        <Experience />
      </Box>
      <Contact />
      <Footer />
    </Box>
  );
}
