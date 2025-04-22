import { Variants } from 'framer-motion';

// Text reveal animation with Japanese character glitch effect
export const textRevealVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    rotateX: 90,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Scan effect animation
export const scanEffectVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -100,
  },
  visible: {
    opacity: 1,
    y: 500,
    transition: {
      repeat: Infinity,
      duration: 3,
      ease: "linear",
    },
  },
};

// Glitch effect animation
export const glitchVariants: Variants = {
  idle: { 
    x: 0,
    y: 0,
  },
  glitch: {
    x: [0, -2, 3, 0, 2, -2, 0],
    y: [0, 2, -2, 0, 1, -1, 0],
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatType: "mirror",
    },
  },
};

// Pulse glow animation
export const pulseGlowVariants: Variants = {
  idle: {
    boxShadow: "0 0 10px 0px rgba(255, 45, 85, 0.4)",
    filter: "brightness(1)",
  },
  pulse: {
    boxShadow: ["0 0 10px 0px rgba(255, 45, 85, 0.4)", "0 0 20px 10px rgba(255, 45, 85, 0.7)", "0 0 10px 0px rgba(255, 45, 85, 0.4)"],
    filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Character hover bioscan animation
export const bioscanVariants: Variants = {
  idle: {
    opacity: 0,
    y: -100,
  },
  hover: {
    opacity: 1,
    y: 500,
    transition: {
      repeat: Infinity,
      duration: 3,
      ease: "linear",
    },
  },
};

// Japanese character floating effect
export const floatingCharVariants: Variants = {
  float: {
    y: [0, -20, 0],
    rotate: [0, 5, 0],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
