import React from 'react';
import { motion } from 'framer-motion';
import CyberButton from './CyberButton';

const WorldSection: React.FC = () => {
  const statsData = [
    { value: '4+', label: 'MAJOR DISTRICTS' },
    { value: '12M+', label: 'POPULATION' },
    { value: '60%', label: 'AUGMENTED' },
    { value: '7', label: 'MEGACORPS' }
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-cyberdark2 relative z-30">
      <div className="container mx-auto">
        <motion.div 
          className="mb-12 relative"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-cyber font-bold inline-block">
            <span className="text-cyberred">NEO</span>-TOKYO 2099
          </h2>
          <div className="absolute -bottom-4 left-0 w-24 h-1 bg-cyberred"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            className="relative overflow-hidden group"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="aspect-video bg-cyberdark overflow-hidden border border-cybergray">
              <img 
                src="https://images.unsplash.com/photo-1555680202-c86f0e12f086?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80" 
                alt="Neo-Tokyo cityscape" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyberdark via-cyberdark/20 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-8 left-8">
              <h3 className="text-xl md:text-2xl font-cyber font-bold text-white mb-2">
                NEON DISTRICT
              </h3>
              <div className="flex items-center text-cyberred font-code text-sm">
                <span className="font-jp mr-2">ネオン地区</span>
                <div className="w-4 h-[1px] bg-cyberred"></div>
              </div>
            </div>

            <div className="absolute top-4 right-4 font-jp font-bold text-cyberblue opacity-70">区域-09</div>
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="font-code text-lg text-gray-300 border-l-2 border-cyberred pl-4">
              A sprawling metropolis of neon lights, corporate towers, and underground networks where technology blurs the line between human and machine.
            </div>
            
            <p className="text-gray-400 font-code">
              After the Great System Collapse of 2076, Neo-Tokyo emerged as the epicenter of cybernetic innovation and corporate warfare. The city is divided into distinct zones, each controlled by different mega-corporations or criminal syndicates.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              {statsData.map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="bg-cyberdark p-4 border border-cybergray"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    borderColor: 'rgb(255, 45, 85)',
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="text-cyberred font-cyber text-xl mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400 font-code">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <CyberButton japaneseText="詳細を読む">
                EXPLORE WORLD
              </CyberButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorldSection;
