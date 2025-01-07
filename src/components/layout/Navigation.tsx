// src/components/layout/Navigation.tsx
"use client";

import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import gsap from "gsap";

const navItems = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Handle scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: element, offsetY: 0 },
        ease: "power3.inOut",
      });
      setMobileOpen(false);
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      navItems.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop - 100 &&
            scrollPosition < offsetTop + offsetHeight - 100
          ) {
            setActiveSection(id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initial animation
  useEffect(() => {
    gsap.from(".nav-item", {
      y: -50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
    });
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: "rgba(18, 18, 18, 0.8)",
          backdropFilter: "blur(8px)",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{
              background: "linear-gradient(45deg, #00f5d4, #7209b7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 700,
            }}
          >
            PORTFOLIO
          </Typography>

          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2 }}>
              {navItems.map(({ label, id }) => (
                <Button
                  key={id}
                  className="nav-item"
                  onClick={() => scrollToSection(id)}
                  sx={{
                    color: "white",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: activeSection === id ? "100%" : "0%",
                      height: "2px",
                      background: "linear-gradient(45deg, #00f5d4, #7209b7)",
                      transition: "width 0.3s ease",
                    },
                  }}
                >
                  {label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
            backgroundColor: "background.paper",
          },
        }}
      >
        <List>
          {navItems.map(({ label, id }) => (
            <ListItem key={id} disablePadding>
              <ListItemButton
                onClick={() => scrollToSection(id)}
                sx={{
                  backgroundColor:
                    activeSection === id
                      ? "rgba(0, 245, 212, 0.1)"
                      : "transparent",
                }}
              >
                <ListItemText
                  primary={label}
                  sx={{
                    "& .MuiListItemText-primary": {
                      color: activeSection === id ? "#00f5d4" : "inherit",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
