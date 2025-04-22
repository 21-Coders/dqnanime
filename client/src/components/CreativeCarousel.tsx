import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface CardData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  japaneseTitle: string;
}

interface CarouselProps {
  cards: CardData[];
}

const CreativeCarousel: React.FC<CarouselProps> = ({ cards }) => {
  const [activeCard, setActiveCard] = useState(0);
  
  // Memoize the card selection to prevent unnecessary re-renders
  const handleCardHover = useCallback((index: number) => {
    setActiveCard(index);
  }, []);
  
  return (
    <div className="w-full max-w-[1140px] mx-auto my-16 overflow-x-auto">
      <div className="flex items-stretch gap-[18px]">
        {cards.map((card, index) => {
          const isActive = activeCard === index;
          
          return (
            <motion.div
              key={card.id}
              className={`relative rounded-md overflow-hidden cursor-pointer bg-cyberdark2 border-2 ${isActive ? 'border-cyberred' : 'border-cybergray'}`}
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
                <div className="relative h-[320px] overflow-hidden">
                  <img 
                    src={card.imageUrl} 
                    alt={card.title} 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Glitch overlay effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-cyberred/10 to-transparent mix-blend-overlay"
                    animate={{
                      y: ['-100%', '100%', '-100%'],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                      repeatType: "loop"
                    }}
                  />
                  
                  {/* Scan line */}
                  {isActive && (
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-6 bg-cyberred/20"
                      initial={{ y: -10 }}
                      animate={{ y: 320 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop"
                      }}
                    />
                  )}
                  
                  {/* Cyberpunk corner elements */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyberred"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyberred"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyberred"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyberred"></div>
                </div>
                
                <div className="p-4">
                  <div className="flex flex-col space-y-2">
                    {/* Title with Japanese flash effect */}
                    <div className="relative h-8 overflow-hidden">
                      <motion.h3 
                        className="font-cyber text-xl text-white absolute inset-0"
                      >
                        {card.title}
                      </motion.h3>
                      
                      {isActive && (
                        <motion.div 
                          className="font-jp text-xl text-cyberred absolute inset-0"
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ 
                            y: [30, 0, 0, 30],
                            opacity: [0, 1, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                            times: [0, 0.1, 0.9, 1]
                          }}
                        >
                          {card.japaneseTitle}
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Description - only visible when active */}
                    <motion.div
                      className="font-code text-sm text-gray-300"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: isActive ? 1 : 0,
                        height: isActive ? 'auto' : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {card.description}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CreativeCarousel;