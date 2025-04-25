import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Social icons with cyber animations
const CyberSocialIcon: React.FC<{ icon: string; href: string; label: string }> = ({ icon, href, label }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="w-16 h-16 flex items-center justify-center bg-cyberdark2 rounded-sm border border-cybergray overflow-hidden mb-2">
        <i className={`text-2xl ${icon} ${isHovered ? 'text-cyberred' : 'text-gray-400'}`} />

        {/* Scan effect on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-cyberred/10 via-transparent to-transparent"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 20, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>

        {/* Corner accents that appear on hover */}
        <AnimatePresence>
          {isHovered && (
            <>
              <motion.div
                className="absolute top-0 left-0 w-3 h-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-cyberred"></div>
                <div className="absolute top-0 left-0 h-full w-[1px] bg-cyberred"></div>
              </motion.div>

              <motion.div
                className="absolute top-0 right-0 w-3 h-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1, delay: 0.05 }}
              >
                <div className="absolute top-0 right-0 w-full h-[1px] bg-cyberred"></div>
                <div className="absolute top-0 right-0 h-full w-[1px] bg-cyberred"></div>
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-0 w-3 h-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1, delay: 0.1 }}
              >
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-cyberred"></div>
                <div className="absolute bottom-0 left-0 h-full w-[1px] bg-cyberred"></div>
              </motion.div>

              <motion.div
                className="absolute bottom-0 right-0 w-3 h-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1, delay: 0.15 }}
              >
                <div className="absolute bottom-0 right-0 w-full h-[1px] bg-cyberred"></div>
                <div className="absolute bottom-0 right-0 h-full w-[1px] bg-cyberred"></div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Label */}
      <div className="text-center text-xs font-code text-gray-500 group-hover:text-cyberred transition-colors">
        {label}
      </div>
    </motion.a>
  );
};

const socialIcons = [
  { icon: "fab fa-twitter", href: "https://twitter.com", label: "TWITTER" },

  { icon: "fab fa-youtube", href: "https://youtube.com", label: "YOUTUBE" },
  { icon: "fab fa-instagram", href: "https://instagram.com", label: "INSTAGRAM" },

];

// Main footer
const Footer: React.FC = () => {
  const [tickerPosition, setTickerPosition] = useState(Math.random() * 100);
  const [email, setEmail] = useState('');
  
  // Set random ticker position on mount
  React.useEffect(() => {
    setTickerPosition(Math.random() * 100);
  }, []);
  
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
    <footer className="relative w-full overflow-hidden">
      {/* Main footer container with SESH-inspired design */}
      <div className="sesh-footer w-full bg-[#111] border border-[#333] shadow-[inset_0_0_15px_#000] text-[#aaa] relative overflow-hidden">
        {/* Static noise overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.65%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27 opacity=%270.1%27/%3E%3C/svg%3E')] opacity-[0.05] z-[1] pointer-events-none"></div>
        
        {/* Scan line overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(33,33,33,0.05)_50%)] bg-[length:100%_4px] z-[2] pointer-events-none"></div>
        
        {/* Main footer content */}
        <div className="footer-content flex flex-col md:flex-row items-start justify-between p-[20px_25px] border-b border-[#222] flicker">
          {/* Logo and text section */}
          <div className="flex flex-col mb-6 md:mb-0 md:w-1/3">
            {/* Logo */}
            <motion.div
              className="mb-4 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >

                <img src='assets/dqnlogo.svg' alt="Logo" className="inline-block w-[100px]" />

            </motion.div>
            
            {/* Footer text */}
            <div className="footer-text text-[14px] tracking-wider">
              <p className="mb-[4px] text-[#777] font-code text-[14px]">disconnected since 2025 · lost in the static · forever searching</p>
            </div>
          </div>
          
          {/* Waitlist section */}
          <div className="md:w-1/2">
            <h3 className="text-xl font-cyber font-bold mb-4">
              <span className="text-cyberred">JOIN</span> THE WAITLIST
            </h3>
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    placeholder="ENTER YOUR EMAIL"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full bg-cyberdark2 border border-cybergray text-white font-code py-3 px-4 outline-none focus:border-cyberred transition-colors text-[14px]"
                    required
                  />
                  <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyberred"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyberred"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyberred"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyberred"></div>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="bg-cyberdark2 border border-cyberred text-cyberred hover:bg-cyberred hover:text-white transition-colors duration-300 py-3 px-6 font-cyber text-[14px]"
                >
                  SUBSCRIBE
                </button>
              </div>
              
              <div className="mt-3 text-xs text-gray-500 font-code text-left">
                By subscribing, you agree to receive updates. Your data is protected.
              </div>
            </form>
          </div>
        </div>
        
        {/* Social links section */}
        <div className="flex justify-center py-6 border-b border-[#222]">
          <div className="flex gap-8">
            {socialIcons.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#666] text-[16px] no-underline uppercase tracking-wider transition-colors duration-300 relative group flex flex-col items-center"
                whileHover={{ y: -3 }}
              >
                <i className={`${social.icon} text-2xl mb-2 group-hover:text-cyberred transition-colors`}></i>
                <span className="text-[12px] group-hover:text-cyberred transition-colors">{social.label}</span>
                
                {/* Red underline effect on hover */}
                <motion.div
                  className="absolute -bottom-2 left-0 w-full h-[2px] bg-cyberred"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </div>
        </div>
        
        {/* Ticker/marquee at bottom */}
        <div className="sesh-ticker w-full bg-[#0a0a0a] border-t border-[#222] overflow-hidden relative h-[16px]">
          <motion.div
            className="ticker-content absolute whitespace-nowrap text-[#444] text-[11px] tracking-wider py-[1px]"
            initial={{ x: `${tickerPosition}%` }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }}
          >
            THE CURE FOR PAIN IS IN THE PAIN · DQN ANIME · DIGITAL ARTIFACTS · CYBERNETIC DREAMS · NEURAL NETWORKS · GHOST IN THE MACHINE · THE CURE FOR PAIN IS IN THE PAIN · DQN ANIME · DIGITAL ARTIFACTS · CYBERNETIC DREAMS · NEURAL NETWORKS · GHOST IN THE MACHINE
          </motion.div>
        </div>
      </div>
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
      
      {/* Copyright notice */}
      <div className="text-center text-gray-600 text-[10px] font-code py-2 bg-black">
        © 2025 DQN ANIME. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};

export default Footer;
