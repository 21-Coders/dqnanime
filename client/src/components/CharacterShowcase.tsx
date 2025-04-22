import React from 'react';
import { motion } from 'framer-motion';
import CharacterCard from './CharacterCard';
import CyberButton from './CyberButton';
import { characters } from '@/data/characters';

const CharacterShowcase: React.FC = () => {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <motion.div 
          className="mb-12 relative"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-cyber font-bold inline-block">
            <span className="text-cyberred">MEET</span> THE CHARACTERS
          </h2>
          <div className="absolute -bottom-4 left-0 w-24 h-1 bg-cyberred"></div>
          <p className="font-code text-gray-400 mt-6 max-w-3xl">
            Choose your cybernetic destiny. Each character represents a unique blend of technology and fighting style, with specialized enhancements and backstories.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {characters.map((character, index) => (
            <motion.div
              key={character.id}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CharacterCard character={character} />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CyberButton japaneseText="すべて表示">
            VIEW ALL CHARACTERS
          </CyberButton>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-cyberdark to-transparent z-0"></div>
    </section>
  );
};

export default CharacterShowcase;
