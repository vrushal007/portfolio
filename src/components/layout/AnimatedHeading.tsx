"use client";

import { useEffect, useRef } from "react";
import { Box, BoxProps } from "@mui/material";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function AnimatedHeading({ children, sx, ...rest }: BoxProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const split = SplitText.create(el, {
      type: "chars, words",
      charsClass: "ah-char",
      wordsClass: "ah-word",
    });
    const tween = gsap.from(split.chars, {
      yPercent: 110,
      rotate: 6,
      opacity: 0,
      duration: 0.9,
      stagger: 0.015,
      ease: "power4.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
  }, [children]);

  return (
    <Box component="h2" ref={ref} sx={{ overflow: "hidden", ...sx }} {...rest}>
      {children}
    </Box>
  );
}
