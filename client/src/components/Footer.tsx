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
  { icon: "fab fa-discord", href: "https://discord.com", label: "DISCORD" },
  { icon: "fab fa-youtube", href: "https://youtube.com", label: "YOUTUBE" },
  { icon: "fab fa-instagram", href: "https://instagram.com", label: "INSTAGRAM" },
  { icon: "fab fa-twitch", href: "https://twitch.tv", label: "TWITCH" }
];

// Main footer
const Footer: React.FC = () => {
  return (
    <footer className="relative bg-black py-12 px-4 md:px-8 overflow-hidden border-t border-cybergray">
      {/* Top line glow */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-cyberred/30" />

      {/* Digital pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none noise-overlay" />

      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          {/* Logo */}
          <motion.div
            className="mb-8 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-cyber font-bold relative inline-block">
              <span className="text-white">CYBER<span className="text-cyberred">NOMAD</span></span>

              {/* Underline animation */}
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-[1px] bg-cyberred"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <motion.div
                className="absolute -bottom-4 left-0 w-2/3 h-[1px] bg-cyberred/50"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </h3>
          </motion.div>

          {/* Social links */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-8 mb-8">
            {socialIcons.map((social, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <CyberSocialIcon
                  icon={social.icon}
                  href={social.href}
                  label={social.label}
                />
              </motion.div>
            ))}
          </div>

          {/* Copyright */}
          <motion.div
            className="text-center text-gray-500 text-xs font-code max-w-md"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="mb-2">© 2025 21CODERS CORPORATION. ALL RIGHTS RESERVED.</div>
            <div className="text-gray-600">THIS IS A FICTIONAL WEBSITE.</div>
          </motion.div>

          {/* Moving scan line at the bottom */}
          {/* <motion.div
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
          /> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
