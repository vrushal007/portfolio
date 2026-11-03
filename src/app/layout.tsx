"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Anton, Space_Grotesk } from "next/font/google";
import { theme } from "@/styles/theme";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cursor from "@/components/layout/Cursor";
import SmoothScroll from "@/components/layout/SmoothScroll";
import "./globals.css";

gsap.registerPlugin(ScrollTrigger);

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Space_Grotesk({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    gsap.config({ autoSleep: 60, force3D: true });
  }, []);

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SmoothScroll />
          <Cursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
