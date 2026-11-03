"use client";

import { useState, useEffect } from "react";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import gsap from "gsap";
import { profile } from "@/data/profile";

const navItems = profile.nav;

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");

  useEffect(() => {
    gsap.from(".nav-item", {
      y: -30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      delay: 0.2,
      ease: "power3.out",
    });
  }, []);

  const scrollToSection = (id: string) => {
    window.__lenis?.scrollTo(`#${id}`, { duration: 1.2 });
    setOpen(false);
  };

  return (
    <Box
      component="nav"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: { xs: 3, md: 5 },
        py: 2.5,
        mixBlendMode: "difference",
      }}
    >
      <Box
        data-cursor="link"
        onClick={() => scrollToSection("hero")}
        sx={{
          fontFamily: "var(--font-display)",
          fontSize: "1.4rem",
          letterSpacing: "0.02em",
          cursor: "pointer",
          color: "var(--ink)",
        }}
      >
        {profile.content.nav.logo}
      </Box>

      {isMobile ? (
        <>
          <IconButton onClick={() => setOpen(!open)} sx={{ color: "var(--ink)" }}>
            {open ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          {open && (
            <Box
              sx={{
                position: "fixed",
                inset: 0,
                bgcolor: "var(--bg)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: 2,
                px: 4,
                mixBlendMode: "normal",
              }}
            >
              {navItems.map(({ label, id }) => (
                <Box
                  key={id}
                  onClick={() => scrollToSection(id)}
                  sx={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2.5rem",
                    color: "var(--ink)",
                    cursor: "pointer",
                  }}
                >
                  {label}
                </Box>
              ))}
            </Box>
          )}
        </>
      ) : (
        <Box sx={{ display: "flex", gap: 4 }}>
          {navItems.map(({ label, id }) => (
            <Box
              key={id}
              className="nav-item"
              data-cursor="link"
              onClick={() => scrollToSection(id)}
              sx={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "0.9rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                cursor: "pointer",
                color: "var(--ink)",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -4,
                  left: 0,
                  width: 0,
                  height: 2,
                  bgcolor: "var(--ember)",
                  transition: "width 0.25s ease",
                },
                "&:hover::after": { width: "100%" },
              }}
            >
              {label}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
