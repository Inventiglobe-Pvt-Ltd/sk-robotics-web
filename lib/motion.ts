import type { Variants } from 'framer-motion';

/**
 * Premium Easing: Apple/Linear style cubic-bezier
 * This creates a very smooth, decelerating motion that feels natural and high-end.
 */
const EASE_PREMIUM = [0.16, 1, 0.3, 1] as [number, number, number, number];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: EASE_PREMIUM 
    },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: EASE_PREMIUM 
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      duration: 0.8, 
      ease: EASE_PREMIUM 
    },
  },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.1
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { 
      staggerChildren: 0.05 
    },
  },
};

export const staggerContainer = stagger;

export const float = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.7, 
      ease: EASE_PREMIUM 
    },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { 
      duration: 0.8, 
      ease: EASE_PREMIUM 
    },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { 
      duration: 0.8, 
      ease: EASE_PREMIUM 
    },
  },
};

export const revealX: Variants = {
  hidden: { width: 0 },
  visible: {
    width: '100%',
    transition: { 
      duration: 1, 
      ease: EASE_PREMIUM 
    },
  },
};
