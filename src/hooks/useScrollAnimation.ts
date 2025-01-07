import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

interface ScrollAnimationProps {
  trigger: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  anticipatePin?: number;
  markers?: boolean;
}

export const useScrollAnimation = (props: ScrollAnimationProps) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: props.start || 'top center',
      end: props.end || 'bottom center',
      scrub: props.scrub ?? false,
      pin: props.pin ?? false,
      anticipatePin: props.anticipatePin ?? 0,
      markers: props.markers ?? false,
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [props]);

  return elementRef;
};
