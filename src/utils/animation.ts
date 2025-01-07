import gsap from 'gsap';

export const transitions = {
  fadeIn: (element: HTMLElement) => {
    return gsap.from(element, {
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });
  },
  
  fadeOut: (element: HTMLElement) => {
    return gsap.to(element, {
      opacity: 0,
      duration: 1,
      ease: 'power2.in'
    });
  },
  
  slideIn: (element: HTMLElement, direction: 'left' | 'right' | 'top' | 'bottom' = 'left') => {
    const x = direction === 'left' ? -100 : direction === 'right' ? 100 : 0;
    const y = direction === 'top' ? -100 : direction === 'bottom' ? 100 : 0;
    
    return gsap.from(element, {
      x,
      y,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  },
  
  scale: (element: HTMLElement) => {
    return gsap.from(element, {
      scale: 0.5,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)'
    });
  }
};

export const scrollAnimations = {
  // Create a parallax effect
  parallax: (element: HTMLElement, speed: number = 0.5) => {
    return gsap.to(element, {
      y: -(element.offsetHeight * speed),
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  },

  // Reveal element on scroll
  reveal: (element: HTMLElement) => {
    return gsap.from(element, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      }
    });
  }
};
