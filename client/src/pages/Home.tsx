import React, { useRef, useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WorldSection from "@/components/WorldSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import ScanLine from "@/components/ScanLine";
import MatrixBackground from "@/components/MatrixBackground";
import HorizontalCharacterScroll from "@/components/HorizontalCharacterScroll";
import LoadingScreen from "@/components/LoadingScreen";
import { motion, useScroll, useTransform } from "framer-motion";
import { characters } from "@/data/characters";
import CyberButton from "@/components/CyberButton";

export default function Home() {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Handle loading completion
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  
  // Parallax effect for background elements
  const { scrollYProgress } = useScroll({
    target: mainContainerRef,
    offset: ["start", "end"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const floatingElementsY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  
  return (
    <>
      <LoadingScreen onLoadingComplete={handleLoadingComplete} duration={4000} />
      
      <motion.div 
        ref={mainContainerRef}
        className="bg-cyberdark text-white min-h-screen relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Global effects */}
        <ScanLine />
        <div className="noise"></div>
        
        {/* Animated background elements with parallax */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          style={{ y: backgroundY }}
        >
          <MatrixBackground />
        </motion.div>
        
        {/* Floating background elements with parallax */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
          style={{ y: floatingElementsY }}
        >
          {/* Add floating elements here if needed */}
        </motion.div>
        
        {/* Main content */}
        <Header />
        <HeroSection />
        <HorizontalCharacterScroll characters={characters} />
        <WorldSection />
        <NewsletterSection />
        <Footer />
      </motion.div>
    </>
  );
}
