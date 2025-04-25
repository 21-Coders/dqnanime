import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

// Spark particle type
interface Spark {
  id: number;
  x: number; // starting x (%)
  y: number; // starting y (%)
  angle: number; // direction in degrees
  speed: number; // pixels per second
  size: number;
  color: string; // Now used for gradient base
  startTime: number; // timestamp
}

// Lightning bolt type
interface LightningBolt {
  key: number;
  path: string;
  x: number; // Position offset (%)
  y: number; // Position offset (%)
  opacity: number;
}

// Function to generate a jagged SVG path for lightning
const generateLightningPath = (startX: number, startY: number, endX: number, endY: number, segments: number = 6, jaggedness: number = 25): string => {
  let path = `M ${startX},${startY} `;
  const dx = (endX - startX) / segments;
  const dy = (endY - startY) / segments;

  for (let i = 1; i < segments; i++) {
    const midX = startX + dx * i;
    const midY = startY + dy * i;
    const offsetX = (Math.random() - 0.5) * jaggedness * 2;
    const offsetY = (Math.random() - 0.5) * jaggedness * 2;
    path += `L ${midX + offsetX},${midY + offsetY} `;
  }
  path += `L ${endX},${endY}`;
  return path;
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onLoadingComplete
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [glitchText, setGlitchText] = useState('SYSTEM INITIALIZING');
  
  // Japanese character pool for glitch effect
  const japaneseCharPool = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン';
  const errorMessages = useMemo(() => [ // Memoize constants
    'MEMORY CORRUPTION DETECTED', 'NEURAL LINK UNSTABLE', 'SYSTEM BREACH ATTEMPT',
    'FIREWALL COMPROMISED', 'RECALIBRATING NEURAL INTERFACE', 'SYNCHRONIZING CYBERNETIC IMPLANTS',
    'QUANTUM ENCRYPTION FAILURE', 'BIOMETRIC SCAN REQUIRED', 'RETINAL VERIFICATION FAILED',
    'SECURITY PROTOCOL OVERRIDE'
  ], []);
  
  // Terminal text for corner displays
  const [terminalLines, setTerminalLines] = useState(() => [ // Initial state function
    "FORCE: XX0022. ENCYPT://000.222.2345", "TRYPASS: ********* AUTH CODE: ALPHA GAMMA: 1___ PRIORITY 1",
    "RETRY: REINDEER FLOTILLA", "Z:> /FALKEN/GAMES/TICTACTOE/ EXECUTE -PLAYERS 0", "================================================",
    "Priority 1 // local / scanning...", "scanning ports...", "BACKDOOR FOUND (23.45.23.12.00000000)",
    "BACKDOOR FOUND (13.66.23.12.00110000)", "BACKDOOR FOUND (13.66.23.12.00110044)", "...", "...",
    "BRUTE.EXE -r -z", "...locating vulnerabilities...", "...vulnerabilities found...", "MCP/> DEPLOY CLU",
    "SCAN: __ 0100.0000.0554.0080", "SCAN: __ 0020.0000.0553.0080", "SCAN: __ 0001.0000.0554.0550",
    "SCAN: __ 0012.0000.0553.0030", "SCAN: __ 0100.0000.0554.0080", "SCAN: __ 0020.0000.0553.0080",
  ]);
  
  // --- Flicker State ---
  const [flickerState, setFlickerState] = useState(0);
  const [isOn, setIsOn] = useState(true);
  // --- End Flicker State ---

  // --- Sparks State ---
  const [sparks, setSparks] = useState<Spark[]>([]);
  const nextSparkId = useRef(0);
  // --- End Sparks State ---

  // --- Lightning State ---
  const [lightning, setLightning] = useState<LightningBolt[]>([]);
  const nextLightningKey = useRef(0);
  // --- End Lightning State ---
  
  // Generate random glitch text
  useEffect(() => {
    if (!isLoading) return;
    
    const interval = setInterval(() => {
      // Randomly decide to show Japanese characters or error messages
      if (Math.random() > 0.6) {
        // Generate random Japanese text
        let glitchStr = '';
        for (let i = 0; i < 15 + Math.floor(Math.random() * 10); i++) {
          glitchStr += japaneseCharPool.charAt(Math.floor(Math.random() * japaneseCharPool.length));
        }
        setGlitchText(glitchStr);
      } else {
        // Show a random error message
        setGlitchText(errorMessages[Math.floor(Math.random() * errorMessages.length)]);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [isLoading]);
  
  // Terminal text update effect
  useEffect(() => {
    if (!isLoading) return;
    
    const updateTerminal = () => {
      setTerminalLines(prevLines => {
        const newLines = [...prevLines.slice(1), prevLines[0]];
        return newLines;
      });
    };
    
    const interval = setInterval(updateTerminal, 250);
    
    return () => clearInterval(interval);
  }, [isLoading]);
  
  // Simulate loading progress - HARDCODED DURATION
  useEffect(() => {
    if (!isLoading) return;

    // Make progress fill quickly within the 1-second duration
    let progress = 0;
    const intervalTime = 50; // Update progress more frequently
    const increments = (1000 / intervalTime); // Number of intervals in 1 second
    const progressPerIncrement = 100 / increments; // How much progress per interval
    
    const interval = setInterval(() => {
      progress += progressPerIncrement + (Math.random() * progressPerIncrement * 0.5 - progressPerIncrement * 0.25); // Add some variance
      setLoadingProgress(Math.min(progress, 100));
    }, intervalTime);

    // Main timer - ALWAYS 1 second (1000ms)
    const timer = setTimeout(() => {
      setLoadingProgress(100); // Ensure 100% visually
      // Short delay after 100% before calling complete and fading out
      setTimeout(() => {
      setIsLoading(false);
      if (onLoadingComplete) onLoadingComplete();
      }, 150); // Short visual pause at 100%
    }, 1000); // HARDCODED 1000ms duration
    
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [isLoading, onLoadingComplete]);
  
  // --- Darker Flicker Effect ---
  useEffect(() => {
    if (!isLoading) return;
    const flickerSequence = [
      { duration: 50, opacity: 0.03 }, { duration: 10, opacity: 0.6 },
      { duration: 8, opacity: 0.01 }, { duration: 15, opacity: 0.8 },
      { duration: 30, opacity: 0.05 }, { duration: 5, opacity: 0.5 },
      { duration: 60, opacity: 0.02 }, { duration: 3, opacity: 0 },
      { duration: 70, opacity: 0.3 }, { duration: 10, opacity: 0.7 },
      { duration: 250, opacity: 0.05 },
    ];
    let currentIndex = 0;
    let timeout: NodeJS.Timeout;
    const runFlicker = () => {
      setFlickerState(flickerSequence[currentIndex].opacity);
      if (Math.random() < 0.05) { // Less frequent forced off
        setIsOn(false);
        setTimeout(() => setIsOn(true), 40 + Math.random() * 60);
      } else if (!isOn) {
        setIsOn(true);
      }
      timeout = setTimeout(() => {
        currentIndex = (currentIndex + 1) % flickerSequence.length;
        runFlicker();
      }, flickerSequence[currentIndex].duration + Math.random() * 5); // Almost no random delay
    };
    runFlicker();
    return () => clearTimeout(timeout);
  }, [isLoading, isOn]);
  // --- End Flicker Effect ---

  // --- Sparks (Top Corners) Effect ---
  useEffect(() => {
    if (!isLoading) return;
    const cornerOffsets = [
      { x: 1, y: 1, angleRange: [0, 90] },   // Top Left (closer to edge)
      { x: 99, y: 1, angleRange: [90, 180] }, // Top Right (closer to edge)
    ];
    const sparkInterval = setInterval(() => {
      const now = Date.now();
      setSparks(prevSparks => {
        const newSparks: Spark[] = [];
        // Generate 1-2 sparks per interval
        const numSparks = Math.random() > 0.3 ? 1 : 2;
        for (let i = 0; i < numSparks; i++) {
            const corner = cornerOffsets[Math.floor(Math.random() * 2)];
            const angle = corner.angleRange[0] + Math.random() * (corner.angleRange[1] - corner.angleRange[0]);
            const speed = 450 + Math.random() * 500; // Much Faster
            const size = 4 + Math.random() * 5; // Significantly Bigger Sparks
            newSparks.push({
              id: nextSparkId.current++,
              x: corner.x + (Math.random() - 0.5) * 3,
              y: corner.y + (Math.random() - 0.5) * 3,
              angle: angle,
              speed: speed,
              size: size,
              color: `hsl(${Math.random() * 15 + 30}, 100%, ${75 + Math.random() * 25}%)`, // Orange/Yellow core base
              startTime: now,
            });
        }
        // Filter out old sparks (e.g., older than 0.6 seconds)
        const filteredSparks = prevSparks.filter(spark => now - spark.startTime < 600);
        return [...filteredSparks, ...newSparks];
      });
    }, 35); // Generate slightly more often
    return () => clearInterval(sparkInterval);
  }, [isLoading]);
  // --- End Sparks Effect ---

  // --- Lightning Effect ---
  useEffect(() => {
    if (!isLoading) return;
    let lightningTimeout: NodeJS.Timeout;

    const triggerLightning = () => {
      const bolts: LightningBolt[] = [];
      const numBolts = Math.random() > 0.6 ? 2 : 1;

      for (let i = 0; i < numBolts; i++) {
        const startX = Math.random() * 70 + 15; // Avoid very edges
        const startY = Math.random() * 5; // Start near top
        const endX = startX + (Math.random() - 0.5) * 60; // End point relative to start
        const endY = startY + 40 + Math.random() * 50; // Ensure it goes downwards
        const path = generateLightningPath(0, 0, endX - startX, endY - startY, 7, 30); // More segments, more jagged

        bolts.push({
           key: nextLightningKey.current++,
           path: path,
           x: startX,
           y: startY,
           opacity: 1,
        });
      }

      setLightning(bolts);

      // Very short visible duration for lightning
      setTimeout(() => {
         setLightning([]);
      }, 60 + Math.random() * 80);

      // Schedule next strike
      lightningTimeout = setTimeout(triggerLightning, 800 + Math.random() * 3500); // Slightly more frequent range
    };

    // Initial trigger delay
    lightningTimeout = setTimeout(triggerLightning, 1000 + Math.random() * 1500);

    return () => clearTimeout(lightningTimeout);
  }, [isLoading]);
  // --- End Lightning Effect ---

  // Generate random noise positions (memoized)
  const noisePositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 200; i++) { // Keep noise density or adjust
      positions.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 0.5 + Math.random() * 2, // Smaller noise particles
        opacity: 0.2 + Math.random() * 0.6, // Keep opacity range or adjust
        color: Math.random() > 0.3 ? 'rgba(255, 80, 80, 0.6)' : 'rgba(200, 200, 200, 0.4)' // More red noise
      });
    }
    return positions;
  }, []); // Only calculate once
  
  // Calculate dynamic flicker background opacity
  const flickerOpacity = isOn ? flickerState * 0.65 : 0.01; // Make flicker darker, keep minimum low opacity
  
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }} // Slower fade out
          transition={{ duration: 0.5 }} // Initial fade in
        >
          {/* --- Darker Flicker Background --- */}
          <motion.div
             className="absolute inset-0 z-0 pointer-events-none"
             style={{
               // Darker Red base, controlled by flickerOpacity
               backgroundColor: `rgba(60, 0, 0, ${flickerOpacity})`,
               transition: 'background-color 0.02s linear' // Extremely fast flicker transition
             }}
           />

          {/* TV static noise effect */}
          <div className="absolute inset-0 overflow-hidden z-10 pointer-events-none">
            {noisePositions.map((pos, index) => (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  width: `${pos.size}px`,
                  height: `${pos.size}px`,
                  opacity: pos.opacity,
                  backgroundColor: pos.color, // Use dynamic color
                  borderRadius: '50%' // Make noise specks rounder
                }}
                animate={{
                  opacity: [pos.opacity, 0, pos.opacity],
                  x: [0, Math.random() * 2 - 1, 0], // Minimal movement
                  y: [0, Math.random() * 2 - 1, 0]
                }}
                transition={{
                  duration: 0.05 + Math.random() * 0.1, // Faster flicker
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
          </div>
          
          {/* Horizontal scan lines */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {Array.from({ length: 35 }).map((_, index) => (
              <motion.div
                key={index}
                className="absolute left-0 right-0 bg-cyberred/5 h-[1px]" // Thinner, less opaque
                style={{ top: `${index * 3}%` }} // Spaced out more
                animate={{ opacity: [0.03, 0.1, 0.03], x: [0, 2, -2, 0] }} // Subtle animation
                transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, repeatType: "mirror", delay: index * 0.03 }}
              />
            ))}
          </div>
          
          {/* Vertical glitch effect */}
          <motion.div
            className="absolute inset-0 bg-cyberred/4 z-10 pointer-events-none" // Added pointer-events
            animate={{ x: [0, -3, 2, -2, 0], opacity: [0, 0.04, 0.01, 0.05, 0] }} // More subtle glitch
            transition={{ duration: 0.3, repeat: Infinity, repeatType: "loop" }}
          />
          
          {/* --- Corner Sparks --- */}
          <div className="absolute inset-0 z-20 pointer-events-none">
             {sparks.map(spark => {
               const lifeDuration = 0.4 + Math.random() * 0.2; // Even shorter lifespan
               const travelDistance = spark.speed * lifeDuration;
               const endX = spark.x + Math.cos(spark.angle * Math.PI / 180) * travelDistance;
               const endY = spark.y + Math.sin(spark.angle * Math.PI / 180) * travelDistance + (0.5 * 800 * lifeDuration * lifeDuration) / (window.innerHeight || 1000) * 100; // Basic gravity pull (adjust 800)

               return (
                 <motion.div
                   key={spark.id}
                   className="absolute"
                   style={{
                     left: `${spark.x}%`, top: `${spark.y}%`,
                     width: spark.size * 0.8, // Adjust width/height ratio
                     height: spark.size * 1.5,
                     // Realistic ember gradient
                     background: `radial-gradient(circle at center, white 5%, yellow 25%, ${spark.color} 60%, rgba(180,0,0,0.3) 95%)`,
                     // Intense, larger glow
                     boxShadow: `0 0 ${spark.size * 2.5}px ${spark.size * 1}px rgba(125, 0, 0, 0.7)`,
                     borderRadius: '50% 50% 2px 2px / 80% 80% 20% 20%', // More tear-drop like
                     transform: `rotate(${spark.angle + 90}deg)`, // Align with initial travel direction
                     filter: 'blur(0.5px)', // Slight blur
                   }}
                   initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                   animate={{
                      opacity: 0, scale: 0.1,
                      x: endX - spark.x, // Animate relative position change
                      y: endY - spark.y,
                   }}
                   transition={{ duration: lifeDuration, ease: "circOut" }} // Use circOut for deceleration
                 />
               );
             })}
          </div>
          {/* --- End Corner Sparks --- */}

          {/* --- Lightning Effect (z-25) --- */}
           <motion.svg
              className="absolute inset-0 z-25 pointer-events-none overflow-visible" // Allow drawing outside bounds slightly
              width="100%" height="100%"
           >
             <AnimatePresence>
                {lightning.map(bolt => (
                  <motion.path
                     key={bolt.key}
                     d={bolt.path}
                     transform={`translate(${bolt.x * (window.innerWidth/100 || 1)} ${bolt.y * (window.innerHeight/100 || 1)})`} // Position based on %
                     stroke="rgba(255, 220, 220, 0.9)" // Bright pink/white core
                     strokeWidth={2 + Math.random() * 2.5} // Thicker, more variable
                     strokeLinecap="round" // Smoother ends
                     fill="none"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: [0, 1, 0] }} // Simple quick flash
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.15, times: [0, 0.1, 1] }} // Very fast flash
                     style={{
                       filter: 'drop-shadow(0 0 15px rgba(200, 0, 0, 1)) drop-shadow(0 0 35px rgba(150, 0, 0, 0.8))' // Wider, stronger red glow
                     }}
                  />
                ))}
             </AnimatePresence>
           </motion.svg>
          
          {/* Central content */}
          <div className="relative z-30 flex flex-col items-center px-4"> {/* Added padding */}
            {/* Logo */}
            <motion.div
              className="mb-8 relative w-48 md:w-64 lg:w-72" // Responsive logo size
              animate={{
                y: [0, -1.5, 0, 1, 0], // Subtle vertical bob
                filter: ['brightness(1) contrast(1)', 'brightness(1.1) contrast(1.2) drop-shadow(0 0 5px rgba(255,0,0,0.4))', 'brightness(1) contrast(1)']
              }}
              transition={{ duration: 1.8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            >
              <img src="/dqnlogo.svg" alt='logo' className='w-full h-auto'/>
              <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-cyberred/70"></div>
              <div className="absolute -bottom-2 left-1/4 w-1/2 h-[1px] bg-cyberred/30"></div>
            </motion.div>
            
            {/* Loading spinner */}
            <div className="relative w-24 h-24 md:w-28 md:h-28 mb-6"> {/* Slightly smaller spinner */}
              <motion.div
                className="absolute inset-0 border-2 border-t-cyberred border-r-cyberred/40 border-b-cyberred/10 border-l-cyberred/70 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 border-2 border-t-transparent border-r-cyberred/80 border-b-cyberred/40 border-l-transparent rounded-full"
                animate={{ rotate: -270 }} // Faster reverse rotation
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-4 border border-dashed border-cyberred/60 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span 
                  className="text-cyberred font-cyber text-lg md:text-xl"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                >
                  {Math.floor(loadingProgress)}%
                </motion.span>
              </div>
            </div>
            
            {/* Glitchy text */}
            <motion.div
              className="font-code text-cyberred text-xs md:text-sm mb-4 h-6 text-center" // Fixed height
              key={glitchText} // Re-animate on text change
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: [0.6, 1, 0.6], x: [0, -1, 1, 0], y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {glitchText}
            </motion.div>
            
            {/* Progress bar */}
            <div className="w-56 md:w-64 h-1 bg-cyberdark/50 rounded-full overflow-hidden border border-cyberred/20"> {/* Added border */}
              <motion.div
                className="h-full bg-cyberred"
                style={{ width: `${loadingProgress}%`, boxShadow: '0 0 8px rgba(255, 0, 0, 0.7)' }} // Brighter glow
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
            
            {/* Warning text */}
            <motion.div
              className="mt-8 font-jp text-cyberred/70 text-[10px] md:text-xs" // Adjusted size/color
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
            >
              サイバーネットワーク接続中...警告...システム不安定...
            </motion.div>
          </div>
          
          {/* Random glitch blocks */}
          {Array.from({ length: 5 }).map((_, index) => (
            <motion.div
              key={`glitch-block-${index}`}
              className="absolute bg-cyberred/20 z-20" // Ensure z-index
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
          
          {/* Glitchy terminal in bottom left corner */}
          <motion.div
            className="absolute bottom-4 left-4 w-64 md:w-72 max-h-40 overflow-hidden z-40" // Removed box styles, increased max-h slightly
            animate={{ opacity: [0.85, 1, 0.85] }} // More subtle opacity flicker
            transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
          >
            {/* Inner text container with fade effect at bottom */}
            <div className="relative w-full h-full mask-gradient-to-bottom">
                <div className="font-code text-cyberred text-[9px] md:text-[10px] leading-tight relative">
                  {terminalLines.slice(-15).map((line, index) => ( // Show last 15 lines
                    <motion.div key={`term-${index}-${line.slice(0,5)}`}
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: [0.5, 0.9, 0.5] }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", delay: index * 0.03 }}
                        className="whitespace-nowrap overflow-hidden text-ellipsis py-px" // Added padding
                     >
                      <span className="text-cyberred/50 mr-1.5">{'>'}</span>
                  {line}
                </motion.div>
              ))}
            </div>
             </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;