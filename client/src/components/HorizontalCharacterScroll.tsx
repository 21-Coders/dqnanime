import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import type { Character } from '@/data/characters';

// Simple hook to get window width (or use a library hook if available)
const useWindowWidth = () => {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array means this runs once on mount and cleanup on unmount

  return width;
};

interface HorizontalCharacterScrollProps {
  characters: Character[];
}

const MOBILE_BREAKPOINT = 768; // Tailwind md breakpoint

const HorizontalCharacterScroll: React.FC<HorizontalCharacterScrollProps> = ({ characters }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardWidthMobile = 320; // Fixed width for mobile cards (adjust as needed)
  const cardGap = 16; // gap-4 -> 1rem -> 16px

  // --- Screen Size Detection ---
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth > 0 && windowWidth < MOBILE_BREAKPOINT; // Check width > 0 to avoid SSR issues
  // --- End Screen Size Detection ---

  const [activeIndex, setActiveIndex] = useState(0);
  const [manualScroll, setManualScroll] = useState(false); // Still needed for desktop timeout
  const [containerWidth, setContainerWidth] = useState(0); // Still needed for desktop calc
  const [scrollWidth, setScrollWidth] = useState(0); // Still needed for desktop calc
  const [isSticky, setIsSticky] = useState(false); // Only used for desktop
  const [hasCompletedScroll, setHasCompletedScroll] = useState(false); // Only used for desktop
  
  // --- Top Flicker State ---
  const [topFlickerState, setTopFlickerState] = useState(0);
  const [topIsOn, setTopIsOn] = useState(true);
  // --- End Top Flicker State ---
  
  // Initial setup to get dimensions
  useEffect(() => {
    if (isMobile || !containerRef.current) return; // Don't run on mobile

    setContainerWidth(containerRef.current.clientWidth);
    setScrollWidth(containerRef.current.scrollWidth);

    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
        setScrollWidth(containerRef.current.scrollWidth);
      }
    };
    
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [isMobile]); // Re-run if switching between mobile/desktop
  
  // --- Top Flicker Effect ---
  useEffect(() => {
    const flickerSequence = [ // Slightly different sequence for variety
      { duration: 120, opacity: 0.5 },
      { duration: 40, opacity: 0.2 },
      { duration: 100, opacity: 0.8 },
      { duration: 60, opacity: 0.3 },
      { duration: 10, opacity: 0.05 },
      { duration: 5, opacity: 0 },
      { duration: 90, opacity: 0.6 },
      { duration: 20, opacity: 0.1 },
      { duration: 4000, opacity: 0.7 }, // Long stable period
    ];

    let currentIndex = 0;
    let timeout: NodeJS.Timeout;

    const runFlicker = () => {
      setTopFlickerState(flickerSequence[currentIndex].opacity);

      if (Math.random() < 0.06 && currentIndex !== flickerSequence.length - 1) {
        setTopIsOn(false);
        setTimeout(() => setTopIsOn(true), 60 + Math.random() * 120);
      } else if (!topIsOn) {
        setTopIsOn(true);
      }

      timeout = setTimeout(() => {
        currentIndex = (currentIndex + 1) % flickerSequence.length;
        runFlicker();
      }, flickerSequence[currentIndex].duration + Math.random() * 110);
    };

    runFlicker();

    return () => clearTimeout(timeout);
  }, [topIsOn]);
  // --- End Top Flicker Effect ---
  
  // Handle sticky behavior and horizontal scrolling based on vertical scroll
  useEffect(() => {
    if (isMobile) { // If mobile, ensure sticky is off
      setIsSticky(false);
      return;
    }
    // --- Desktop Scroll Logic ---
    const handleScroll = () => {
      if (!sectionRef.current || !containerRef.current) return;
      
      const scrollY = window.scrollY;
      const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const containerHeight = containerRef.current.offsetHeight;
      
      // Calculate when to make the container sticky
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight - containerHeight) {
        setIsSticky(true);
        
        // Calculate horizontal scroll progress (0 to 1)
        const scrollProgress = (scrollY - sectionTop) / (sectionHeight - containerHeight - viewportHeight * 0.5);
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
        
        // Apply horizontal scroll based on vertical scroll position
        if (!manualScroll) {
          containerRef.current.scrollLeft = clampedProgress * (scrollWidth - containerWidth);
          
          // Update active card based on scroll position
          const newActiveIndex = Math.min(
            characters.length - 1,
            Math.floor(clampedProgress * characters.length)
          );
          setActiveIndex(newActiveIndex);
          
          // Check if we've completed scrolling through all characters
          setHasCompletedScroll(clampedProgress >= 0.95);
        }
      } else {
        setIsSticky(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, manualScroll, containerWidth, scrollWidth, characters.length]);
  
  // Handle when user manually scrolls the container
  const handleManualDesktopScroll = () => {
    if (isMobile) return; // Only relevant for desktop sticky interaction
    if (!manualScroll) {
      setManualScroll(true);
      
      // Reset after some inactivity
      const timer = setTimeout(() => {
        setManualScroll(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  };
  
  // Handle hover on a specific card
  const handleCardHover = (index: number) => {
    if (isMobile) return; // Disable hover effect on mobile
    setActiveIndex(index);
  };
  
  // Calculate dynamic top glow opacity
  const topGlowOpacity = topIsOn ? topFlickerState * 0.6 : 0; // Adjust multiplier
  
  // Update active index based on scroll position (MOBILE ONLY)
  const mobileScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleMobileScroll = useCallback(() => {
      if (!isMobile || !containerRef.current) return;

      // Debounce the scroll event handler
      if (mobileScrollTimeoutRef.current) {
          clearTimeout(mobileScrollTimeoutRef.current);
      }

      mobileScrollTimeoutRef.current = setTimeout(() => {
          const container = containerRef.current;
          if (!container) return;

          const scrollLeft = container.scrollLeft;
          const containerCenter = container.clientWidth / 2;

          // Find the card closest to the center
          let closestIndex = 0;
          let minDistance = Infinity;

          Array.from(container.children[0].children).forEach((child, index) => {
             if (child instanceof HTMLElement) {
                const cardLeft = child.offsetLeft;
                const cardWidth = child.offsetWidth;
                const cardCenter = cardLeft + cardWidth / 2 - scrollLeft;
                const distance = Math.abs(cardCenter - containerCenter);

                if (distance < minDistance) {
                   minDistance = distance;
                   closestIndex = index;
                }
             }
          });
          setActiveIndex(closestIndex);

      }, 150); // Debounce time in ms
  }, [isMobile]);

  useEffect(() => {
      const container = containerRef.current;
      if (isMobile && container) {
          container.addEventListener('scroll', handleMobileScroll);
          // Initial check in case it loads scrolled
          handleMobileScroll();
          return () => {
            container.removeEventListener('scroll', handleMobileScroll);
            if (mobileScrollTimeoutRef.current) {
              clearTimeout(mobileScrollTimeoutRef.current);
            }
          };
      }
  }, [isMobile, handleMobileScroll]);

  return (
    <div 
      ref={sectionRef}
      className={`relative pt-4 bg-black ${!isMobile ? 'min-h-[250vh] mb-38' : 'mb-12'}`}
    >
      {/* --- Flickering Top Light (Conditionally Sticky) --- */}
      <motion.div
        className={`${isSticky && !isMobile ? 'fixed' : 'absolute'} top-0 left-0 right-0 h-[250px] pointer-events-none z-10`}
        style={{
          background: `linear-gradient(to bottom, rgba(200, 0, 0, ${topGlowOpacity}) 0%, transparent 80%)`,
          filter: `blur(${15 + topGlowOpacity * 25}px)`,
          opacity: topGlowOpacity > 0 ? 1 : 0,
          transition: 'opacity 0.1s ease-out, filter 0.1s ease-out',
        }}
      />
      {/* --- End Flickering Top Light --- */}
      
      {/* Header section - (Conditionally Sticky) */}
      <div className={`${isSticky && !isMobile ? 'fixed top-5 left-0 right-0 z-30' : 'relative z-30'}`}>
        <h2 className="text-4xl md:text-6xl font-cyber font-bold text-center mb-4 md:mb-0 px-4">
          <span className="text-cyberred">CAST</span> OF CHARACTERS
        </h2>
        
        {/* Current character details display */}
        <motion.div 
          className="w-full max-w-3xl mx-auto px-4 relative z-10 py-0 text-center min-h-[100px]"
          key={`header-${activeIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {characters[activeIndex] && (
            <>
              <motion.h3 
                className="text-2xl md:text-3xl font-cyber text-white mb-1 md:mb-2"
                key={`title-${activeIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {characters[activeIndex].name}
              </motion.h3>
              
              <motion.div 
                className="text-cyberred font-jp text-base md:text-lg mb-2 md:mb-4"
                key={`jptitle-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {characters[activeIndex].japaneseTitle}
              </motion.div>
              
              <motion.div 
                className="text-gray-300 font-code text-sm max-w-xl mx-auto"
                key={`desc-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >

              </motion.div>
            </>
          )}
        </motion.div>
      </div>
      
      {/* Spacer for the header (DESKTOP ONLY) */}
      {isSticky && !isMobile && <div className="h-[380px]" />}
      
      {/* Horizontal scrolling container */}
      <div 
        ref={containerRef}
        className={`overflow-x-auto scrollbar-hide ${isSticky && !isMobile ? 'fixed top-[240px] left-0 right-0' : 'relative mt-8 md:mt-16'} ${isMobile ? 'scroll-smooth' : 'pb-8'}`}
        onScroll={handleManualDesktopScroll}
        style={{
          scrollBehavior: !isMobile && manualScroll ? 'auto' : 'smooth',
          scrollSnapType: 'x mandatory',
          height: isMobile ? 'auto' : '72vh',
          zIndex: 20,
          paddingBottom: isMobile ? '0px' : '48px'
        }}
      >
        <div className={`flex gap-4 px-4 md:px-8 min-w-max ${isMobile ? 'items-center' : 'items-stretch'}`}>
          {characters.map((character, index) => {
            const isActiveDesktop = !isMobile && index === activeIndex;
            
            return (
              <motion.div
                key={character.id}
                className={`flex-shrink-0 rounded-md overflow-hidden cursor-pointer bg-cyberdark2 border-2 ${isActiveDesktop ? 'border-cyberred' : 'border-cybergray'} scroll-ml-4 md:scroll-ml-8`}
                style={{
                  width: isMobile ? cardWidthMobile : (isActiveDesktop ? 400 : 120),
                  scrollSnapAlign: 'start'
                }}
                animate={!isMobile ? {
                  width: isActiveDesktop ? 400 : 120,
                  boxShadow: isActiveDesktop
                    ? '0 0 35px 10px rgba(255, 45, 85, 0.5)'
                    : '0 0 0px 0px rgba(255, 45, 85, 0)'
                } : {}}
                transition={{
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30 
                }}
                onMouseEnter={!isMobile ? () => handleCardHover(index) : undefined}
              >
                <div className={`${isMobile ? '' : 'w-[432px]'}`}>
                  <div className={`relative ${isMobile ? 'h-[480px]' : 'h-[420px]'} overflow-hidden bg-black`}>
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        boxShadow: isActiveDesktop
                          ? 'inset 0 0 40px 10px rgba(255, 0, 0, 0.5)'
                          : 'inset 0 0 20px 5px rgba(255, 0, 0, 0.3)',
                        backgroundColor: isActiveDesktop ? 'rgba(20, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0)'
                      }}
                      transition={{ duration: 0.5 }}
                    />
                    
                    {isActiveDesktop && (
                      <div className="absolute left-0 top-0 bottom-0 w-[280px] flex items-center justify-center overflow-hidden">
                        <motion.div
                          className="text-cyberred font-cyber text-[150px] opacity-30 select-none"
                          animate={{
                            opacity: [0.2, 0.4, 0.2],
                            x: [0, 5, 0, -5, 0],
                            filter: [
                              'blur(0px) brightness(1)',
                              'blur(2px) brightness(1.5)',
                              'blur(0px) brightness(1)'
                            ]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "loop"
                          }}
                        >
                          ?
                        </motion.div>
                        <motion.div
                          className="absolute text-cyberred font-cyber text-[100px] opacity-20 select-none"
                          style={{ left: '30px', top: '50px' }}
                          animate={{
                            opacity: [0.1, 0.3, 0.1],
                            y: [0, -5, 0, 5, 0],
                            filter: [
                              'blur(0px) brightness(1)',
                              'blur(3px) brightness(1.3)',
                              'blur(0px) brightness(1)'
                            ]
                          }}
                          transition={{
                            duration: 1.5,
                            delay: 0.5,
                            repeat: Infinity,
                            repeatType: "loop"
                          }}
                        >
                          ?
                        </motion.div>
                      </div>
                    )}
                    
                    <img
                      src={character.imageUrl}
                      alt={character.name}
                      className={`object-contain absolute top-1/2 -translate-y-1/2 z-15 ${isMobile ? 'left-1/2 -translate-x-1/2 h-[85%]' : ''} ${!isMobile && isActiveDesktop ? 'left-[72%] -translate-x-1/2 max-h-full max-w-[200px]' : ''} ${!isMobile && !isActiveDesktop ? 'left-[10%] -translate-x-1/2 h-[90%]' : ''}`}
                      style={{
                        width: 'auto',
                        filter: isMobile ? 'none' : (isActiveDesktop ? 'grayscale(0)' : 'grayscale brightness(1.2) contrast(1.1)')
                      }}
                    />
                    
                    <div className={`absolute inset-0 bg-gradient-to-t from-cyberdark via-transparent to-transparent ${isActiveDesktop ? 'opacity-60' : 'opacity-40'}`} />
                    
                    {isActiveDesktop && (
                      <>
                        <motion.div
                          className="absolute top-0 left-0 w-full h-6 bg-cyberred/20"
                          initial={{ y: -10 }}
                          animate={{ y: 500 }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                            repeatType: "loop"
                          }}
                        />
                        <motion.div
                          className="absolute top-0 right-0 w-[100px] h-full bg-gradient-to-r from-transparent to-cyberred/20"
                          animate={{
                            opacity: [0.2, 0.5, 0.2],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "loop"
                          }}
                        />
                      </>
                    )}
                    
                    <div className="absolute bottom-0 left-0 w-full p-4 z-30">
                      <motion.div 
                        animate={!isMobile ? { opacity: isActiveDesktop ? 1 : 0.6 } : { opacity: 1 } }
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="font-cyber text-xl md:text-2xl text-white mb-1 truncate">{character.name}</h3>
                        <div className="font-jp text-xs md:text-sm text-cyberred mb-1 truncate">{character.japaneseTitle}</div>
                        <div className="font-code text-[10px] md:text-xs text-gray-400 truncate">{character.title}</div>
                        
                        <div className="mt-2 md:mt-4 w-full bg-cyberdark h-1 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-cyberred"
                            initial={{ width: "0%" }}
                            animate={{ width: isActiveDesktop ? "100%" : "30%" }}
                            transition={{ duration: isMobile ? 0 : 1, ease: "easeOut" }}
                          />
                        </div>
                        <div className="font-code text-[10px] md:text-xs text-gray-400 mt-1">{character.level}</div>
                      </motion.div>
                    </div>
                    
                    <div className="absolute top-0 left-0 w-4 h-4 md:w-6 md:h-6 border-t-2 border-l-2 border-cyberred z-40" />
                    <div className="absolute top-0 right-0 w-4 h-4 md:w-6 md:h-6 border-t-2 border-r-2 border-cyberred z-40" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 md:w-6 md:h-6 border-b-2 border-l-2 border-cyberred z-40" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 md:w-6 md:h-6 border-b-2 border-r-2 border-cyberred z-40" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Spacer div to maintain scroll height (DESKTOP ONLY) */}
      {isSticky && !isMobile && <div style={{ height: '72vh' }} />}
      
      {/* Scroll indicator that appears when horizontal scroll is complete */}
      {hasCompletedScroll && !isMobile && (
        <motion.div 
          className="fixed bottom-16 left-0 w-full text-center z-30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, -5, 0] }}
          transition={{ 
            y: { repeat: Infinity, duration: 1.5 },
            opacity: { duration: 0.5 }
          }}
        >
          {/* <div className="font-cyber text-cyberred text-sm">
            SCROLL DOWN TO CONTINUE
            <div className="mx-auto w-4 h-4 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div> */}
        </motion.div>
      )}
    </div>
  );
};

export default HorizontalCharacterScroll;