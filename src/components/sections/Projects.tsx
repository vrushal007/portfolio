import React, { useRef, useEffect } from "react";
import { Box, Typography, Container } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  { title: "Project 1", description: "Description for project 1" },
  { title: "Project 2", description: "Description for project 2" },
  { title: "Project 3", description: "Description for project 3" },
  // Add more projects as needed
];

const HorizontalProjects = () => {
  const sectionRef = useRef(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const projectElements = projectsRef.current?.children;

    if (section && projectElements) {
      gsap.to(projectElements, {
        xPercent: -100 * (projectElements.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          snap: 1 / (projectElements.length - 1),
          // end: () => `+=${section.offsetWidth}`,
        },
      });
    }
  }, []);

  return (
    <Container
      ref={sectionRef}
      sx={{
        overflow: "hidden",
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          mb: 6,
          background: "linear-gradient(45deg, #00f5d4, #7209b7)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Projects
      </Typography>
      <Box ref={projectsRef} sx={{ display: "flex", gap: 4 }}>
        {projects.map((project, index) => (
          <Box
            key={index}
            sx={{
              minWidth: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:
                index % 2 === 0 ? "primary.main" : "secondary.main",
              color: "white",
            }}
          >
            <Typography variant="h4">{project.title}</Typography>
            <Typography variant="body1">{project.description}</Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default HorizontalProjects;
