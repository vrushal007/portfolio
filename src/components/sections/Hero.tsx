"use client";

import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleContactClick = () => {
    gsap.registerPlugin(ScrollToPlugin);
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: `#contact`, offsetY: 50 },
      ease: "power3.inOut",
    });
  };

  const handleDownloadClick = () => {
    const link = document.createElement("a");
    link.href = "/Vrushal_Patel.pdf";
    link.download = "Vrushal_Patel.pdf";
    link.click();
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 1, ease: "power3.out" },
      });

      tl.from(textRef.current, {
        y: 100,
        opacity: 0,
      }).from(
        buttonRef.current,
        {
          y: 50,
          opacity: 0,
        },
        "-=0.5"
      );

      gsap.to(".scroll-indicator", {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        // background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Box
          ref={textRef}
          sx={{
            maxWidth: "800px",
            textAlign: "left",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              background: "linear-gradient(45deg, #00f5d4, #7209b7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 600,
              letterSpacing: 1.5,
            }}
          >
            Hi, I'm Vrushal Patel 👋
          </Typography>

          <Typography
            variant="h1"
            sx={{
              mb: 3,
              fontWeight: 800,
              fontSize: { xs: "3rem", md: "4.5rem" },
              background: "linear-gradient(45deg, #ffffff 30%, #a0a0a0 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.2,
            }}
          >
            Software Engineer
          </Typography>

          <Typography
            variant="h5"
            sx={{
              mb: 4,
              color: "rgba(255,255,255,0.8)",
              fontWeight: 400,
              maxWidth: "600px",
            }}
          >
            I design and develop web applications that are fast, elegant, and
            user-friendly.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            ref={buttonRef}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                background: "linear-gradient(45deg, #00f5d4, #7209b7)",
                px: 4,
                py: 2,
                fontWeight: 600,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(0,245,212,0.4)",
                },
              }}
              onClick={handleDownloadClick}
            >
              Download CV
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: "#00f5d4",
                color: "#00f5d4",
                px: 4,
                py: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "#7209b7",
                  backgroundColor: "rgba(114,9,183,0.1)",
                  transform: "translateY(-2px)",
                },
              }}
              onClick={handleContactClick}
            >
              Get In Touch
            </Button>
          </Stack>
        </Box>
      </Container>

      <Box
        className="scroll-indicator"
        sx={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          cursor: "pointer",
        }}
      >
        <KeyboardArrowDown sx={{ fontSize: 40 }} />
      </Box>
    </Box>
  );
}
