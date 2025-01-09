"use client";

import { useRef } from "react";
import { Box } from "@mui/material";
import Navigation from "@/components/layout/Navigation";

// Import all sections
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import GalaxyBackground from "@/components/layout/GalaxyBackround";
import Footer from "@/components/Footer";

import CodeIcon from "@mui/icons-material/Code";
import BrushIcon from "@mui/icons-material/Brush";
import SpeedIcon from "@mui/icons-material/Speed";
import StorageIcon from "@mui/icons-material/Storage";
import BuildIcon from "@mui/icons-material/Build";

export default function Home() {
  const WEBSITE_DATA = {
    hero: {
      name: "Hi, I'm Vrushal Patel 👋",
      title: "Full Stack Developer",
      description:
        "I am a full stack developer with a passion for creating beautiful and functional web applications.",
    },
    about: {
      title: "About Me",
      description:
        "I'm a passionate full-stack developer with a love for creating beautiful, functional, and user-centered digital experiences. Combining technical expertise with creative problem-solving to build innovative web solutions.",
      features: [
        {
          icon: <CodeIcon sx={{ fontSize: 40 }} />,
          title: "Clean Code",
          description:
            "Writing elegant, efficient, and maintainable code is not just a practice, it's a passion.",
        },
        {
          icon: <BrushIcon sx={{ fontSize: 40 }} />,
          title: "Creative Design",
          description:
            "Combining aesthetic excellence with functional design to create memorable user experiences.",
        },
        {
          icon: <SpeedIcon sx={{ fontSize: 40 }} />,
          title: "Performance",
          description:
            "Optimizing every aspect to ensure lightning-fast, responsive applications.",
        },
      ],
    },
    skills: {
      title: "Technicals Skills",
      skills: {
        frontend: {
          icon: <CodeIcon sx={{ fontSize: 40 }} />,
          title: "Frontend",
          skills: [
            { name: "React/Next.js", level: 92 },
            { name: "JavaScript/TypeScript", level: 90 },
            { name: "Redux", level: 90 },
            { name: "HTML/CSS", level: 95 },
            { name: "Material UI", level: 88 },
          ],
        },
        backend: {
          icon: <StorageIcon sx={{ fontSize: 40 }} />,
          title: "Backend",
          skills: [
            { name: "Node.js", level: 90 },
            { name: "Nest.js", level: 82 },
            { name: "Express.js", level: 85 },
            { name: "Socket.IO", level: 80 },
            { name: "Microservices", level: 75 },
          ],
        },
        tools: {
          icon: <BuildIcon sx={{ fontSize: 40 }} />,
          title: "Tools & Others",
          skills: [
            { name: "Docker", level: 85 },
            { name: "ELK Stack", level: 70 },
            { name: "AWS", level: 70 },
            { name: "Firebase", level: 85 },
            { name: "Flutterflow", level: 90 },
          ],
        },
      },
    },
    experience: {
      title: "Experience",
      experiences: [
        {
          title: "Software Engineer",
          company: "Sunbots Innovations LLP",
          period: "Jun 2023 - Nov 2024",
          descriptionPoints: [
            `Built scalable web applications with React.js and Next.js.`,
            `Accelerated app development using Flutter Flow.`,
            `Enhanced analytics with Google Analytics APIs and ELK stack.`,
            `Managed deployments on AWS EC2, RDS, and Amplify.`,
          ],
        },
        {
          title: "Frontend Developer Intern",
          company: "Obligate Solutions",
          period: "Jun 2022 - Dec 2022",
          descriptionPoints: [
            `Developed an e-commerce website with React.js.`,
            `Ensured seamless integration with cross-functional teams.`,
          ],
        },
        {
          title: "Android Developer Intern",
          company: "Veybit Technologies Pvt. Ltd.",
          period: "Jan 2022 - Feb 2022",
          descriptionPoints: [
            `Developed and deployed a mobile app on Google Play Store.`,
            `Handled coding, testing, and troubleshooting independently.`,
            `Managed the entire app project and provided maintenance.`,
          ],
        },
      ],
    },
    projects: {
      title: "Featured Projects",
      projects: [
        {
          title: "Unified Pay",
          description: "A Unified Payment Gateway Integration Library",
          technologies: ["TypeScript", "Node.JS", "OOPs"],
          points: [
            "Unified Payment Integration: Built UnifyPay, a TypeScript library merging Stripe and Razorpay for managing orders, subscriptions, and plans through a single interface.",
            "Scalable & Extensible Design: Implemented type-safe configurations and modular abstractions, ensuring maintainability and support for future providers.",
            "Developer-Centric Optimization: Streamlined workflows with provider-specific logic and authored detailed documentation for easy adoption.",
          ],
          githubLink: "https://github.com/DarshilChauhan1/unified-pay",
          liveLink: "https://npmjs.com/package/unified-pay-node",
          // image: "/assets/images/npm.png",
        },
        {
          title: "Course Commerce",
          description: "A Course Management System",
          technologies: ["React.JS/Vite.JS", "Express.JS", "SQL", "Sequelize"],
          points: [
            "Comprehensive Course Management: Full-stack platform enabling course enrollment and management, with JWT-based authentication, role-based access control, and CRUD operations for courses.",
            "Modern and Responsive Frontend: Built using React, Material-UI, Redux, and Vite, offering custom themes and seamless performance on both mobile and desktop devices.",
            "Scalable Backend Architecture: Powered by Express.js with RESTful APIs, Sequelize ORM for database operations, and environment-based configurations for secure and efficient workflows.",
          ],
          githubLink: "https://github.com/vrushal007/course-commerce-client",
          liveLink:
            "https://drive.google.com/file/d/1UAxtD6_qGh-cpz3LcrC1r6_nJQixjh0V/view?usp=drive_link",
          // image: "/assets/images/course-commerce.png",
        },
        {
          title: "Hotel Management System",
          description: "A Hotel Management System",
          technologies: ["React.JS", "Express.JS", "MongoDB", "Mongoose"],
          points: [
            "Efficient Room Booking Management: Allows admins to add, edit, delete, and manage room bookings while preventing duplicate date reservations for the same room.",
            "Enhanced Features and Automation: Automatically removes previous bookings upon room updates or deletions, supports upcoming and past booking views, and includes a refund system for cancellations.",
            "Robust Functionality: Ensures basic booking validations and provides a streamlined workflow for managing restaurant room reservations effectively.",
          ],
          githubLink:
            "https://github.com/vrushal007/Hotel-Management-Admin-App",
          liveLink: "https://hotelmanagementadminapp.vercel.app/",
        },
      ],
    },
    contact: {
      title: "Let's Connect",
      linkedinLink: "https://www.linkedin.com/in/vrushalpatel/",
      githubLink: "https://github.com/vrushal007",
    },
  };

  return (
    <Box>
      <Navigation />
      {/* <Background /> */}
      <GalaxyBackground />
      <Box id="hero" className="section">
        <Hero data={WEBSITE_DATA.hero} />
      </Box>
      <Box id="about" className="section">
        <About data={WEBSITE_DATA.about} />
      </Box>
      <Box id="skills" className="section">
        <Skills data={WEBSITE_DATA.skills} />
      </Box>
      <Box id="experience" className="section">
        <Experience data={WEBSITE_DATA.experience} />
      </Box>
      <Box id="projects" className="section">
        <Projects data={WEBSITE_DATA.projects} />
      </Box>
      <Box id="contact" className="section">
        <Contact data={WEBSITE_DATA.contact} />
      </Box>
      <Footer />
    </Box>
  );
}
