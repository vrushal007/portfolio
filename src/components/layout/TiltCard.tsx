"use client";

import { useRef } from "react";
import { Box, BoxProps } from "@mui/material";
import gsap from "gsap";

export default function TiltCard({ children, sx, ...rest }: BoxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const quick = useRef<{
    rx: gsap.QuickToFunc;
    ry: gsap.QuickToFunc;
    gx: gsap.QuickToFunc;
    gy: gsap.QuickToFunc;
  } | null>(null);

  const ensureQuick = () => {
    if (quick.current || !ref.current || !glareRef.current) return quick.current;
    quick.current = {
      rx: gsap.quickTo(ref.current, "rotateX", { duration: 0.4, ease: "power3" }),
      ry: gsap.quickTo(ref.current, "rotateY", { duration: 0.4, ease: "power3" }),
      gx: gsap.quickTo(glareRef.current, "x", { duration: 0.3, ease: "power3" }),
      gy: gsap.quickTo(glareRef.current, "y", { duration: 0.3, ease: "power3" }),
    };
    return quick.current;
  };

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current!;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const q = ensureQuick();
    if (!q) return;
    q.ry((px - 0.5) * 16);
    q.rx(-(py - 0.5) * 16);
    q.gx(px * rect.width - rect.width / 2);
    q.gy(py * rect.height - rect.height / 2);
  };

  const onLeave = () => {
    const q = ensureQuick();
    if (!q) return;
    q.rx(0);
    q.ry(0);
  };

  return (
    <Box
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      sx={{ position: "relative", transformStyle: "preserve-3d", ...sx }}
      {...rest}
    >
      <Box
        ref={glareRef}
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 260,
          height: 260,
          ml: "-130px",
          mt: "-130px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,77,35,0.16), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {children}
    </Box>
  );
}
