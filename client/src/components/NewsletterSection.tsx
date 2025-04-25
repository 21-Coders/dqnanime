import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CyberButton from './CyberButton';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    // Here you would handle the actual subscription
    setEmail('');
  };

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
      <motion.div 
        className="container mx-auto relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-cyber font-bold mb-6">
            <span className="text-cyberred">JOIN</span> THE RESISTANCE
          </h2>
          <p className="text-gray-300 font-code mb-8">
            Receive classified intel about game updates, character releases, and exclusive content directly to your neural interface.
          </p>
          
          <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <input 
                  type="email" 
                  placeholder="ENTER YOUR EMAIL" 
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full bg-cyberdark2 border border-cybergray text-white font-code py-4 px-5 outline-none focus:border-cyberred transition-colors"
                  required
                />
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyberred"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyberred"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyberred"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyberred"></div>
                </div>
              </div>
              
              <CyberButton 
                japaneseText="登録する" 
                primary 
                type="submit"
                className="whitespace-nowrap"
              >
                SUBSCRIBE
              </CyberButton>
            </div>
            
            <div className="mt-3 text-xs text-gray-500 font-code text-left">
              By subscribing, you agree to receive updates. Your data is protected under the Neo-Tokyo Privacy Protocol.
            </div>
          </form>
        </div>
      </motion.div>
      <motion.div
            className="absolute bottom-0 left-0 w-full h-[2px]"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 45, 85, 0.5) 50%, transparent 100%)'
            }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
    </section>
  );
};

export default NewsletterSection;
