import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import type { Character } from '@/data/characters';

interface HorizontalCharacterScrollProps {
  characters: Character[];
}

const HorizontalCharacterScroll: React.FC<HorizontalCharacterScrollProps> = ({ characters }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [manualScroll, setManualScroll] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [hasCompletedScroll, setHasCompletedScroll] = useState(false);
  
  // Initial setup to get dimensions
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
      setScrollWidth(containerRef.current.scrollWidth);
    }
    
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
  }, []);
  
  // Handle sticky behavior and horizontal scrolling based on vertical scroll
  useEffect(() => {
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
  }, [manualScroll, containerWidth, scrollWidth, characters.length]);
  
  // Handle when user manually scrolls the container
  const handleManualScroll = () => {
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
    setActiveIndex(index);
  };
  
  return (
    <div 
      ref={sectionRef}
      className="relative min-h-[250vh] mb-38 pt-4" 
    >
      {/* Header section - will be sticky */}
      <div className={`${isSticky ? 'fixed top-24 left-0 right-0 z-30' : 'relative'}`}>
        <h2 className="text-4xl md:text-6xl font-cyber font-bold text-center mb-4">
          <span className="text-cyberred">CAST</span> OF CHARACTERS
        </h2>
        
        {/* Current character details display */}
        <motion.div 
          className="w-full max-w-3xl mx-auto px-4 relative z-10 py-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {characters[activeIndex] && (
            <div className="flex flex-col items-center text-center ">
              <motion.h3 
                className="text-3xl font-cyber text-white mb-2"
                key={`title-${activeIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {characters[activeIndex].name}
              </motion.h3>
              
              <motion.div 
                className="text-cyberred font-jp text-lg mb-4"
                key={`jptitle-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {characters[activeIndex].japaneseTitle}
              </motion.div>
              
              <motion.div 
                className="text-gray-300 font-code max-w-xl"
                key={`desc-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {characters[activeIndex].description}
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Spacer for the header when it becomes sticky */}
      {isSticky && <div className="h-[380px]" />}
      
      {/* Horizontal scrolling container */}
      <div 
        ref={containerRef}
        className={`overflow-x-auto scrollbar-hide pb-8 ${isSticky ? 'fixed top-[380px] left-0 right-0' : 'relative mt-16'}`}
        onScroll={handleManualScroll}
        style={{
          scrollBehavior: manualScroll ? 'auto' : 'smooth',
          scrollSnapType: 'x mandatory',
          height: '72vh',
          zIndex: 20,
          paddingBottom: '48px'
        }}
      >
        <div className="flex items-stretch gap-4 px-4 min-w-max justify-center">
          {characters.map((character, index) => {
            const isActive = index === activeIndex;
            
            return (
              <motion.div
                key={character.id}
                className={`flex-shrink-0 rounded-md overflow-hidden cursor-pointer bg-cyberdark2 border-2 ${isActive ? 'border-cyberred' : 'border-cybergray'}`}
                style={{
                  width: isActive ? 432 : 100,
                  scrollSnapAlign: 'start'
                }}
                animate={{ 
                  width: isActive ? 432 : 100,
                  boxShadow: isActive 
                    ? '0 0 25px 5px rgba(255, 45, 85, 0.3)' 
                    : '0 0 0px 0px rgba(255, 45, 85, 0)'
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30 
                }}
                onMouseEnter={() => handleCardHover(index)}
              >
                <div className="w-[432px]">
                  <div className="relative h-[500px] overflow-hidden">
                    <img 
                      src={character.imageUrl} 
                      alt={character.name} 
                      className="w-full h-full object-cover"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-cyberdark via-transparent to-transparent opacity-60" />
                    
                    {/* <motion.div 
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-cyberred/10 to-transparent mix-blend-overlay opacity-0"
                      animate={{
                        opacity: isActive ? [0, 0.7, 0] : 0,
                        y: isActive ? ['-100%', '100%'] : '0%',
                      }}
                      transition={{
                        duration: 2,
                        repeat: isActive ? Infinity : 0,
                        ease: "linear",
                        repeatType: "loop"
                      }}
                    /> */}
                    
                    {isActive && (
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
                    )}
                    
                    <div className="absolute bottom-0 left-0 w-full p-4">
                      <motion.div 
                        animate={{ opacity: isActive ? 1 : 0.6 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="font-cyber text-2xl text-white mb-1">{character.name}</h3>
                        <div className="font-jp text-sm text-cyberred mb-1">{character.japaneseTitle}</div>
                        <div className="font-code text-xs text-gray-400">{character.title}</div>
                        

                        <div className="mt-4 w-full bg-cyberdark h-1 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-cyberred"
                            initial={{ width: "0%" }}
                            animate={{ width: isActive ? "100%" : "30%" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                        <div className="font-code text-xs text-gray-400 mt-1">{character.level}</div>
                      </motion.div>
                    </div>
                    
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyberred" />
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyberred" />
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyberred" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyberred" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Spacer div to maintain scroll height when container becomes fixed */}
      {isSticky && <div style={{ height: '72vh' }} />}
      
      {/* Progress indicator */}
      {/* <div className={`${isSticky ? 'fixed bottom-4' : 'absolute bottom-0'} left-0 w-full px-4 py-2 z-30`}>
        <div className="w-full max-w-3xl mx-auto bg-cyberdark h-1 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-cyberred"
            style={{ 
              width: `${(activeIndex / (characters.length - 1)) * 100}%` 
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        <div className="flex justify-between font-code text-xs text-gray-500 mt-1">
          <span>01</span>
          <span>{characters.length.toString().padStart(2, '0')}</span>
        </div>
      </div> */}
      
      {/* Scroll indicator that appears when horizontal scroll is complete */}
      {/* {hasCompletedScroll && (
        <motion.div 
          className={`${isSticky ? 'fixed' : 'absolute'} bottom-16 left-0 w-full text-center z-30`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, -5, 0] }}
          transition={{ 
            y: { repeat: Infinity, duration: 1.5 },
            opacity: { duration: 0.5 }
          }}
        >
          <div className="font-cyber text-cyberred text-sm">
            SCROLL DOWN TO CONTINUE
            <div className="mx-auto w-4 h-4 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>
        </motion.div>
      )} */}
    </div>
  );
};

export default HorizontalCharacterScroll;