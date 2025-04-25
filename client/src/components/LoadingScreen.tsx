import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  duration?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onLoadingComplete, 
  duration = 3000 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [glitchText, setGlitchText] = useState('SYSTEM INITIALIZING');
  
  // Japanese character pool for glitch effect
  const japaneseCharPool = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン';
  const errorMessages = [
    'MEMORY CORRUPTION DETECTED',
    'NEURAL LINK UNSTABLE',
    'SYSTEM BREACH ATTEMPT',
    'FIREWALL COMPROMISED',
    'RECALIBRATING NEURAL INTERFACE',
    'SYNCHRONIZING CYBERNETIC IMPLANTS',
    'QUANTUM ENCRYPTION FAILURE',
    'BIOMETRIC SCAN REQUIRED',
    'RETINAL VERIFICATION FAILED',
    'SECURITY PROTOCOL OVERRIDE'
  ];
  
  // Generate random glitch text
  useEffect(() => {
    if (!isLoading) return;
    
    const interval = setInterval(() => {
      // Randomly decide to show Japanese characters or error messages
      if (Math.random() > 0.7) {
        // Generate random Japanese text
        let glitchStr = '';
        for (let i = 0; i < 20; i++) {
          glitchStr += japaneseCharPool.charAt(Math.floor(Math.random() * japaneseCharPool.length));
        }
        setGlitchText(glitchStr);
      } else {
        // Show a random error message
        setGlitchText(errorMessages[Math.floor(Math.random() * errorMessages.length)]);
      }
    }, 150);
    
    return () => clearInterval(interval);
  }, [isLoading]);
  
  // Simulate loading progress
  useEffect(() => {
    if (!isLoading) return;
    
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + (Math.random() * 3);
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 100);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onLoadingComplete) onLoadingComplete();
    }, duration);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [isLoading, duration, onLoadingComplete]);
  
  // Generate random noise positions
  const generateNoisePositions = (count: number) => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      positions.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 3,
        opacity: 0.1 + Math.random() * 0.9
      });
    }
    return positions;
  };
  
  const noisePositions = generateNoisePositions(200);
  
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* TV static noise effect */}
          <div className="absolute inset-0 overflow-hidden">
            {noisePositions.map((pos, index) => (
              <motion.div
                key={index}
                className="absolute bg-cyberred"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  width: `${pos.size}px`,
                  height: `${pos.size}px`,
                  opacity: pos.opacity
                }}
                animate={{
                  opacity: [pos.opacity, 0, pos.opacity],
                  x: [0, Math.random() * 10 - 5, 0],
                  y: [0, Math.random() * 10 - 5, 0]
                }}
                transition={{
                  duration: 0.2 + Math.random() * 0.3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
          </div>
          
          {/* Horizontal scan lines */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 50 }).map((_, index) => (
              <motion.div
                key={index}
                className="absolute left-0 right-0 bg-cyberred/10 h-[2px]"
                style={{ top: `${index * 2}%` }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  x: [0, 10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: index * 0.01
                }}
              />
            ))}
          </div>
          
          {/* Vertical glitch effect */}
          <motion.div
            className="absolute inset-0 bg-cyberred/5"
            animate={{
              x: [0, -10, 5, -5, 0],
              opacity: [0, 0.1, 0.05, 0.1, 0]
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
          
          {/* Central content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo */}
            <motion.div
              className="mb-12 relative"
              animate={{
                x: [0, -3, 3, -2, 0],
                filter: [
                  'brightness(1) contrast(1)',
                  'brightness(1.2) contrast(1.5)',
                  'brightness(1) contrast(1)'
                ]
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              <h1 className="text-6xl font-cyber font-bold">
                <img src="/assets/logo white on black.png" alt='logo' width={300} height={300} className=''/>
              </h1>
              <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-cyberred"></div>
              <div className="absolute -bottom-4 left-1/4 w-1/2 h-[1px] bg-cyberred/50"></div>
            </motion.div>
            
            {/* Loading spinner */}
            <div className="relative w-32 h-32 mb-8">
              <motion.div
                className="absolute inset-0 border-4 border-t-cyberred border-r-cyberred/50 border-b-cyberred/20 border-l-cyberred/80 rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute inset-2 border-4 border-t-transparent border-r-cyberred border-b-cyberred/50 border-l-transparent rounded-full"
                animate={{ rotate: -180 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute inset-4 border-2 border-dashed border-cyberred/70 rounded-full"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span 
                  className="text-cyberred font-cyber text-xl"
                  animate={{
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  {Math.floor(loadingProgress)}%
                </motion.span>
              </div>
            </div>
            
            {/* Glitchy text */}
            <motion.div
              className="font-code text-cyberred text-sm mb-4 max-w-md text-center"
              animate={{
                x: [0, -2, 2, -1, 0],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {glitchText}
            </motion.div>
            
            {/* Progress bar */}
            <div className="w-64 h-1 bg-cyberdark2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-cyberred"
                style={{ width: `${loadingProgress}%` }}
                animate={{
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </div>
            
            {/* Warning text */}
            <motion.div
              className="mt-12 font-jp text-cyberred/80 text-xs"
              animate={{
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              サイバーネットワーク接続中...
            </motion.div>
          </div>
          
          {/* Random glitch blocks */}
          {Array.from({ length: 5 }).map((_, index) => (
            <motion.div
              key={`glitch-block-${index}`}
              className="absolute bg-cyberred/20"
              initial={{
                width: Math.random() * 300 + 50,
                height: Math.random() * 20 + 5,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0
              }}
              animate={{
                opacity: [0, 0.8, 0],
                x: (Math.random() - 0.5) * 100
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatDelay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;