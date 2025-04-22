import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CyberButtonProps {
  children: React.ReactNode;
  className?: string;
  japaneseText: string;
  onClick?: () => void;
  primary?: boolean;
  type?: "button" | "submit" | "reset";
}

const CyberButton: React.FC<CyberButtonProps> = ({ 
  children, 
  className, 
  japaneseText, 
  onClick, 
  primary = false,
  type = "button"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [displayedText, setDisplayedText] = useState<React.ReactNode>(children);
  const [japaneseChars, setJapaneseChars] = useState<string[]>([]);
  const englishTextRef = useRef<React.ReactNode>(children);
  const japaneseTextRef = useRef<string>(japaneseText);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  
  // Japanese character pool for glitch effect
  const japaneseCharPool = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン';
  
  // Initialize Japanese character array
  useEffect(() => {
    setJapaneseChars(japaneseTextRef.current.split(''));
  }, [japaneseText]);
  
  // Handle hover state
  useEffect(() => {
    if (isHovered) {
      // Start glitch animation sequence when hover begins
      let step = 0;
      const totalSteps = 15;
      const glitchFrequency = 3; // How often to show glitch (every X steps)
      const glitchDuration = 20; // ms to show each glitch frame
      
      const runGlitchSequence = () => {
        // Show random glitching characters
        if (step % glitchFrequency === 0) {
          setIsGlitching(true);
          
          // Create a glitched mix of English and Japanese
          const glitchChars = japaneseChars.map(() => 
            Math.random() > 0.5 
              ? japaneseCharPool.charAt(Math.floor(Math.random() * japaneseCharPool.length))
              : String.fromCharCode(33 + Math.floor(Math.random() * 94)) // Random ASCII
          );
          
          setDisplayedText(
            <span className="font-jp text-cyberred">
              {glitchChars.join('')}
            </span>
          );
          
          // After brief glitch, return to normal text
          setTimeout(() => {
            setIsGlitching(false);
            
            // Show original English text when not hovering
            setDisplayedText(englishTextRef.current);
          }, glitchDuration);
        }
        
        step++;
        
        // Continue animation if still hovering and not complete
        if (step <= totalSteps) {
          animationRef.current = setTimeout(runGlitchSequence, 30);
        }
      };
      
      // Start the sequence
      runGlitchSequence();
      
    } else {
      // Clean up and reset when hover ends
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
      
      setIsGlitching(false);
      setDisplayedText(englishTextRef.current);
    }
    
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [isHovered, japaneseChars]);
  
  // Handle mouse events
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  return (
    <motion.button
      type={type}
      className={cn(
        "cyber-button relative overflow-hidden",
        primary ? "bg-cyberred" : "bg-cyberdark2 border border-cyberred",
        "text-white font-cyber uppercase px-8 py-4 rounded-sm", 
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ 
        scale: 1.03,
        boxShadow: primary 
          ? "0 0 10px 2px rgba(255, 45, 85, 0.5)" 
          : "0 0 8px 1px rgba(255, 45, 85, 0.3)"
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 10
      }}
    >
      {/* Glitch overlay effect */}
      {isGlitching && (
        <>
          <motion.div 
            className="absolute inset-0 bg-cyberred/10 mix-blend-screen z-10 pointer-events-none"
            animate={{ 
              opacity: [0, 0.8, 0],
              x: ["-100%", "100%"]
            }}
            transition={{ 
              duration: 0.2,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
          />
          
          <motion.div 
            className="absolute inset-0 bg-cyberblue/5 mix-blend-screen z-10 pointer-events-none"
            animate={{ 
              opacity: [0, 0.5, 0],
              scaleX: [0.3, 1, 0.3]
            }}
            transition={{ 
              duration: 0.15
            }}
          />
        </>
      )}
      
      {/* Button text */}
      <div className="relative z-20">
        {displayedText}
      </div>
      
      {/* Visual scan line effect on hover */}
      {isHovered && (
        <motion.div 
          className="absolute left-0 w-full h-[1px] bg-cyberred/60 mix-blend-overlay pointer-events-none"
          style={{ top: "50%" }}
          animate={{ 
            scaleX: [0, 1, 1, 0],
            x: ["-100%", "0%", "0%", "100%"]
          }}
          transition={{ 
            duration: 0.4,
            times: [0, 0.3, 0.7, 1]
          }}
        />
      )}
      
      {/* Corner accents on hover */}
      {isHovered && (
        <>
          <motion.div 
            className="absolute top-0 left-0 w-3 h-3 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-cyberred"></div>
            <div className="absolute top-0 left-0 h-full w-[1px] bg-cyberred"></div>
          </motion.div>
          
          <motion.div 
            className="absolute top-0 right-0 w-3 h-3 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div className="absolute top-0 right-0 w-full h-[1px] bg-cyberred"></div>
            <div className="absolute top-0 right-0 h-full w-[1px] bg-cyberred"></div>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-0 left-0 w-3 h-3 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-cyberred"></div>
            <div className="absolute bottom-0 left-0 h-full w-[1px] bg-cyberred"></div>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-0 right-0 w-3 h-3 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-cyberred"></div>
            <div className="absolute bottom-0 right-0 h-full w-[1px] bg-cyberred"></div>
          </motion.div>
        </>
      )}
    </motion.button>
  );
};

export default CyberButton;
