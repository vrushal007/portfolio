// src/hooks/useParallax.ts
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ParallaxProps {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
}

export const useParallax = ({ speed = 1, direction = 'vertical' }: ParallaxProps = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      y: direction === 'vertical' ? -100 * speed : 0,
      x: direction === 'horizontal' ? -100 * speed : 0,
      ease: 'none',
    });
  }, [speed, direction]);

  return elementRef;
};