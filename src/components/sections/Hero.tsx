"use client";

import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "@/components/layout/Marquee";
import { profile } from "@/data/profile";

function SplitTitle({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="hero-char"
          style={{ display: "inline-block", willChange: "transform" }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const start = performance.now();
    const tick = () => {
      if (clockRef.current) {
        clockRef.current.textContent = ((performance.now() - start) / 1000).toFixed(1);
      }
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(".hero-char", {
        yPercent: 120,
        rotate: 8,
        duration: 1,
        stagger: 0.02,
        ease: "power4.out",
      })
        .from(
          ".hero-sub",
          { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )
        .from(
          ".hero-tag",
          { scale: 0, duration: 0.6, ease: "back.out(2)" },
          "-=0.6"
        );

      gsap.to(".hero-glow", {
        x: "random(-40, 40)",
        y: "random(-30, 30)",
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Parallax: content and glow drift at different speeds than the scroll itself.
      gsap.to(contentRef.current, {
        yPercent: -35,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-glow", {
        yPercent: 55,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={rootRef}
      sx={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        pt: 10,
      }}
    >
      <Box
        className="hero-glow"
        sx={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,77,35,0.35), transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <Box ref={contentRef} sx={{ px: { xs: 3, md: 6 } }}>
        <Box
          className="hero-tag"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            border: "1px solid var(--ember)",
            borderRadius: 999,
            px: 2,
            py: 0.5,
            mb: 3,
            fontSize: "0.8rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--ember)",
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: "var(--ember)",
            }}
          />
          {profile.role} · {profile.tagline}
        </Box>

        <Box
          component="h1"
          sx={{
            m: 0,
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.2rem, 12vw, 9rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.01em",
            overflow: "hidden",
          }}
        >
          <SplitTitle text={profile.name.toUpperCase()} />
        </Box>

        <Box
          className="hero-sub"
          sx={{
            mt: 3,
            maxWidth: 620,
            fontSize: { xs: "1.05rem", md: "1.25rem" },
            color: "var(--ink)",
            opacity: 0.75,
            lineHeight: 1.6,
          }}
        >
          {profile.summary}
        </Box>

        <Box
          className="hero-sub"
          sx={{
            mt: 2,
            fontSize: "0.8rem",
            letterSpacing: "0.05em",
            opacity: 0.4,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {profile.content.hero.clockLabel} <span ref={clockRef}>0.0</span>
          {profile.content.hero.clockSuffix}
        </Box>
      </Box>

      <Box sx={{ mt: { xs: 6, md: 8 }, borderTop: "1px solid var(--line, rgba(243,237,225,0.14))", borderBottom: "1px solid rgba(243,237,225,0.14)", py: 2 }}>
        <Marquee
          items={profile.content.hero.marquee}
          speed={35}
        />
      </Box>
    </Box>
  );
}
