"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.1 });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1 });

    const onMove = (e: MouseEvent) => {
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
    };
    window.addEventListener("mousemove", onMove);

    const targets = document.querySelectorAll("[data-cursor]");
    const onEnter = () => gsap.to(ring, { scale: 2.4, duration: 0.3 });
    const onLeave = () => gsap.to(ring, { scale: 1, duration: 0.3 });
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: -3,
          left: -3,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--ember)",
          pointerEvents: "none",
          zIndex: 10000,
          mixBlendMode: "difference",
        }}
        className="hide-on-mobile"
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: -16,
          left: -16,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid var(--ember)",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
        }}
        className="hide-on-mobile"
      />
    </>
  );
}
