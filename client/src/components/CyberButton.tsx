import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CyberButtonProps {
  children: React.ReactNode;
  className?: string;
  japaneseText: string;
  onClick?: () => void;
  primary?: boolean;
  type?: "button" | "submit" | "reset";
}

// Japanese/Katakana character set for scramble effect
const JAPANESE_CHARS = Object.freeze(
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン".split("")
) as readonly string[];

const getRandomChar = (charset: readonly string[]): string => 
  charset[Math.floor(Math.random() * charset.length)];

const CyberButton: React.FC<CyberButtonProps> = ({ 
  children, 
  className, 
  japaneseText, 
  onClick, 
  primary = false,
  type = "button"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonWidth, setButtonWidth] = useState<number | null>(null);
  const [buttonHeight, setButtonHeight] = useState<number | null>(null);
  const [displayText, setDisplayText] = useState<string>(typeof children === 'string' ? children : '');
  const [isAnimating, setIsAnimating] = useState(false);
  const animationProgressRef = useRef(0);
  const originalTextRef = useRef(typeof children === 'string' ? children : '');
  const targetTextRef = useRef(japaneseText);
  
  // Measure button dimensions on initial render
  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
      setButtonHeight(buttonRef.current.offsetHeight);
    }
  }, []);
  
  // Handle mouse events to trigger text animation
  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsAnimating(true);
    targetTextRef.current = japaneseText;
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsAnimating(true);
    targetTextRef.current = originalTextRef.current;
  };
  
  // Handle text scramble animation
  useEffect(() => {
    if (!isAnimating) return;
    
    const duration = 800; // animation duration in ms
    const originalText = originalTextRef.current;
    const targetText = targetTextRef.current;
    
    // Ensure consistent character count
    const charCount = originalText.length;
    const actualTargetText = isHovered 
      ? targetText.padEnd(charCount, ' ').slice(0, charCount) 
      : originalText;
    
    const startTime = performance.now();
    let animationFrameId: number;
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Number of characters to show from target text
      const completedChars = Math.floor(progress * charCount);
      animationProgressRef.current = completedChars;
      
      // Generate scrambled text while maintaining original length
      const newText = Array.from({ length: charCount }, (_, i) => {
        // For completed characters, show the target text
        if (i < completedChars) {
          return actualTargetText[i];
        }
        // For remaining characters, show random character from set
        return getRandomChar(JAPANESE_CHARS);
      }).join('');
      
      setDisplayText(newText);
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayText(actualTargetText);
        setIsAnimating(false);
      }
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [isAnimating, isHovered]);
  
  return (
    <motion.button
      ref={buttonRef}
      type={type}
      className={cn(
        "cyber-button relative overflow-hidden",
        primary ? "bg-cyberred" : "bg-cyberdark2 border border-cyberred",
        "text-white font-cyber uppercase px-8 py-4 rounded-sm", 
        className
      )}
      style={
        buttonWidth && buttonHeight 
          ? { width: buttonWidth, height: buttonHeight } 
          : {}
      }
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
      {/* Pre-rendered overlay effects - only animate opacity */}
      <AnimatePresence>
        {isHovered && (
          <>
            {/* Glitch overlay effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-cyberred/10 to-cyberblue/5 mix-blend-screen pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ zIndex: 10 }}
            />
          </>
        )}
      </AnimatePresence>
      
      {/* Button text container with fixed height and position */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <span className={cn(
          "font-mono tracking-wider", 
          isHovered ? "font-jp text-cyberred" : ""
        )}>
          {displayText}
        </span>
      </div>
      
      {/* Visual scan line effect on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            className="absolute left-0 w-full h-[1px] bg-cyberred/60 mix-blend-overlay pointer-events-none"
            style={{ top: "50%" }}
            initial={{ scaleX: 0, x: "-100%" }}
            animate={{ 
              scaleX: [0, 1, 1, 0],
              x: ["-100%", "0%", "0%", "100%"]
            }}
            exit={{ scaleX: 0, x: "100%" }}
            transition={{ 
              duration: 0.4,
              times: [0, 0.3, 0.7, 1],
              ease: "easeInOut"
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Corner accents on hover - optimized to render once */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Top Left */}
            <div className="absolute top-0 left-0 w-3 h-3">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-cyberred" />
              <div className="absolute top-0 left-0 h-full w-[1px] bg-cyberred" />
            </div>
            
            {/* Top Right */}
            <div className="absolute top-0 right-0 w-3 h-3">
              <div className="absolute top-0 right-0 w-full h-[1px] bg-cyberred" />
              <div className="absolute top-0 right-0 h-full w-[1px] bg-cyberred" />
            </div>
            
            {/* Bottom Left */}
            <div className="absolute bottom-0 left-0 w-3 h-3">
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-cyberred" />
              <div className="absolute bottom-0 left-0 h-full w-[1px] bg-cyberred" />
            </div>
            
            {/* Bottom Right */}
            <div className="absolute bottom-0 right-0 w-3 h-3">
              <div className="absolute bottom-0 right-0 w-full h-[1px] bg-cyberred" />
              <div className="absolute bottom-0 right-0 h-full w-[1px] bg-cyberred" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Invisible span to maintain button content space */}
      <span className="opacity-0 invisible">
        {typeof children === 'string' ? children : ''}
      </span>
    </motion.button>
  );
};

export default CyberButton;
