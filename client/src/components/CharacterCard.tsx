import React from 'react';
import { motion } from 'framer-motion';
import { Character } from '@/data/characters';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <motion.div 
      className="character-card bg-cyberdark2 border border-cybergray h-[450px] relative group"
      whileHover={{ 
        boxShadow: "0 0 20px 0 rgba(255, 45, 85, 0.3)",
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      {/* Scan effect that appears on hover */}
      <motion.div 
        className="character-scan absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-cyberred/20 to-transparent opacity-0 pointer-events-none z-3"
        initial={{ opacity: 0, y: -100 }}
        whileHover={{ 
          opacity: 1, 
          y: 500,
          transition: { 
            repeat: Infinity, 
            duration: 3, 
            ease: "linear" 
          } 
        }}
      />
      
      {/* Character image */}
      <div className="w-full h-full overflow-hidden">
        <img 
          src={character.imageUrl} 
          alt={character.name} 
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />
      </div>
      
      {/* Japanese label in top left */}
      <div className="absolute top-4 left-4 flex items-center opacity-80">
        <motion.div 
          className="w-2 h-2 bg-cyberred rounded-full mr-2"
          animate={{ 
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <span className="font-jp text-xs">{character.japaneseTitle}</span>
      </div>
      
      {/* Info overlay that slides up on hover */}
      <motion.div 
        className="character-overlay absolute bottom-0 left-0 w-full bg-cyberdark2/90 p-4 z-2"
        initial={{ y: 100, opacity: 0 }}
        whileHover={{ 
          y: 0, 
          opacity: 1,
          transition: { 
            type: "spring", 
            stiffness: 500, 
            damping: 30 
          }
        }}
      >
        <div className="flex flex-col gap-2">
          <h3 className="font-cyber text-cyberred text-xl">{character.name}</h3>
          <p className="font-code text-sm text-gray-300">{character.title} | {character.level}</p>
          <div className="text-xs font-code mt-1 text-gray-400">
            {character.description}
          </div>
          <div className="mt-3 flex justify-between items-center">
            <div className="text-xs text-cyberblue font-jp">詳細 →</div>
            <div className="w-20 h-1 bg-gradient-to-r from-cyberred to-transparent"></div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CharacterCard;
