// // src/hooks/useScrollAnimation.ts
// import { useEffect, useRef } from 'react';
// import gsap from 'gsap';
// import ScrollTrigger from 'gsap/ScrollTrigger';

// interface ScrollAnimationProps {
//   trigger: string;
//   start?: string;
//   end?: string;
//   scrub?: boolean | number;
//   pin?: boolean;
//   anticipatePin?: boolean;
//   markers?: boolean;
// }

// export const useScrollAnimation = (props: ScrollAnimationProps) => {
//   const elementRef = useRef(null);

//   useEffect(() => {
//     const element = elementRef.current;

//     const scrollTrigger = ScrollTrigger.create({
//       trigger: element,
//       start: props.start || 'top center',
//       end: props.end || 'bottom center',
//       scrub: props.scrub ?? false,
//       pin: props.pin ?? false,
//       anticipatePin: props.anticipatePin ?? false,
//       markers: props.markers ?? false,
//     });

//     return () => {
//       scrollTrigger.kill();
//     };
//   }, [props]);

//   return elementRef;
// };

// // src/hooks/useParallax.ts
// import { useEffect, useRef } from 'react';
// import gsap from 'gsap';

// interface ParallaxProps {
//   speed?: number;
//   direction?: 'vertical' | 'horizontal';
// }

// export const useParallax = ({ speed = 1, direction = 'vertical' }: ParallaxProps = {}) => {
//   const elementRef = useRef(null);

//   useEffect(() => {
//     const element = elementRef.current;

//     gsap.to(element, {
//       scrollTrigger: {
//         trigger: element,
//         start: 'top bottom',
//         end: 'bottom top',
//         scrub: true,
//       },
//       y: direction === 'vertical' ? -100 * speed : 0,
//       x: direction === 'horizontal' ? -100 * speed : 0,
//       ease: 'none',
//     });
//   }, [speed, direction]);

//   return elementRef;
// };