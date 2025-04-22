import React from 'react';
import { motion } from 'framer-motion';

const ScanLine: React.FC = () => {
  return (
    <motion.div 
      className="scanline absolute top-0 left-0 w-full h-5 bg-gradient-to-b from-transparent via-cyberred/30 to-transparent z-50 pointer-events-none"
      animate={{ 
        y: ["0%", "100%", "0%"]
      }}
      transition={{ 
        duration: 8, 
        repeat: Infinity,
        ease: "linear" 
      }}
    />
  );
};

export default ScanLine;
