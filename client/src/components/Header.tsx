"use client"

import React, { useState, useEffect, useRef } from "react"
import { Zap, Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

// Navigation items with section IDs
const navItems = [
  { label: "HOME", sectionId: "hero-section" },
  { label: "CHARACTERS", sectionId: "characters-section" },
  { label: "WORLD", sectionId: "world-section" },
  { label: "TEAM", sectionId: "team-section" },
]

export default function CyberpunkHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  const [hoverItem, setHoverItem] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState("hero-section")
  const headerRef = useRef<HTMLElement>(null)

  // Trigger random glitch effects for desktop hover/active state
  useEffect(() => {
    const glitchInterval = setInterval(
      () => {
        // Only trigger random glitches if menu is closed (less distracting on mobile)
        if (!isMenuOpen && Math.random() < 0.2) {
            setGlitchActive(true)
            setTimeout(() => setGlitchActive(false), 150 + Math.random() * 100)
        }
      },
      4000 + Math.random() * 3000, // Less frequent random glitches
    )
    return () => clearInterval(glitchInterval)
  }, [isMenuOpen]) // Re-evaluate if menu opens/closes

  // Scroll to section when nav item is clicked
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const headerHeight = headerRef.current?.offsetHeight || 70 // Use a fallback height
      const sectionPosition = section.getBoundingClientRect().top + window.scrollY - headerHeight - 10 // Extra offset
      window.scrollTo({ top: sectionPosition, behavior: 'smooth' })
      setActiveSection(sectionId) // Set active immediately for visual feedback
      setIsMenuOpen(false) // Close mobile menu on click
    }
  }

  // Track scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
        const headerHeight = headerRef.current?.offsetHeight || 70;
        // Adjust scroll position check to be slightly below the header
        const scrollPosition = window.scrollY + headerHeight + 50; // Offset more generous

        let currentSection = "hero-section"; // Default to top section

        for (const item of navItems) {
            const section = document.getElementById(item.sectionId);
            if (section) {
                const sectionTop = section.offsetTop - headerHeight; // Account for header height precisely
                // Check if the top of the section is above the scroll check point
                if (scrollPosition >= sectionTop) {
                    currentSection = item.sectionId;
                    // Keep checking further sections in case multiple are in view
                } else {
                    // If we scrolled past a section break, stop checking
                    break;
                }
            }
        }
        setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true }); // Use passive listener
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
}, []); // Run once on mount


  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 py-3 px-4 md:px-6 lg:px-12 bg-black/90 backdrop-blur-sm border-b border-red-900/50 z-50 shadow-[0_0_15px_rgba(255,0,0,0.3)]">
      {/* Main container */}
      <div className="container mx-auto flex justify-between items-center h-10"> {/* Added fixed height */}

        {/* Left Group: Logo + Version */}
        <div className="flex items-center gap-2">
           {/* Simplified Logo Container */}
           <div
            className={`relative w-14 h-10 flex items-center justify-center cursor-pointer`} // Reduced width slightly
            onMouseEnter={() => setGlitchActive(true)}
            onMouseLeave={() => setGlitchActive(false)}
            onClick={() => scrollToSection("hero-section")} // Click logo scrolls home
           >
                {/* Base Logo - always present but maybe hidden by glitch */}
                 <img
                    src="/dqnlogo.svg"
                    alt="logo"
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-100 ${glitchActive ? "opacity-0" : "opacity-100"}`}
                 />
                {/* Glitch Layer 1 (Red) */}
                <img
                    src="/dqnlogo.svg"
                    aria-hidden="true"
                    alt=""
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-100 pointer-events-none ${glitchActive ? "opacity-70" : "opacity-0"}`}
                    style={{ filter: "drop-shadow(0 0 1px #ff3333)", transform: "translate(1px, 0.5px)", clipPath: "inset(0 0 50% 0)"}} // Example glitch style
                />
                 {/* Glitch Layer 2 (Cyan) */}
                 <img
                    src="/dqnlogo.svg"
                    aria-hidden="true"
                    alt=""
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-100 pointer-events-none ${glitchActive ? "opacity-70" : "opacity-0"}`}
                    style={{ filter: "drop-shadow(0 0 1px #33ffff)", transform: "translate(-1px, -0.5px)", clipPath: "inset(50% 0 0 0)" }} // Example glitch style
                 />
           </div>
            {/* Version Info (Hidden on smaller screens if needed) */}
           <div className="hidden sm:flex flex-col"> {/* Hide on extra small screens */}
            <span className="text-xs text-red-500 font-mono tracking-wider">
              <span className="inline-block mr-1 animate-pulse">
                <Zap size={10} className="inline" />
              </span>
              v1.0.0
            </span>
            <span className="text-[8px] text-red-700 font-mono">CYBERNETIC_OS</span>
          </div>
        </div>

        {/* Right Group: Desktop Nav / Mobile Button */}
        <div className="flex items-center">
            {/* Desktop navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center gap-4 lg:gap-8">
                {navItems.map((item) => (
                  <li key={item.label} className="relative group">
                    <button
                      onClick={() => scrollToSection(item.sectionId)}
                      className={`block font-mono text-sm uppercase tracking-widest px-2 py-1 transition-colors relative overflow-hidden ${activeSection === item.sectionId ? "text-red-500" : "text-gray-400 hover:text-white"}`}
                      onMouseEnter={() => setHoverItem(item.label)}
                      onMouseLeave={() => setHoverItem(null)}
                    >
                       {/* Use hoverItem state for glitch on desktop hover */}
                      <span className={`relative z-10 ${hoverItem === item.label ? "animate-textglitch" : ""}`}>
                        {item.label}
                      </span>
                      {activeSection === item.sectionId && ( <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 shadow-[0_0_5px_#ff0000]"></div> )}
                      <div className="absolute inset-0 bg-red-900/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                      <div className={`absolute inset-0 overflow-hidden opacity-0 ${hoverItem === item.label ? 'opacity-30' : ''} transition-opacity duration-300`}>
                        <div className="w-full h-full bg-gradient-to-b from-transparent via-red-500/10 to-transparent bg-size-200 animate-scanline"></div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile menu button */}
            <button
              aria-label="Toggle Menu"
              className="md:hidden flex items-center text-red-500 hover:text-red-400 transition-colors z-50 pl-4" // Ensure button is clickable and above potential overlaps
              onClick={() => setIsMenuOpen(prev => !prev)} // Use functional update
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {/* Use AnimatePresence for smooth open/close */}
       <AnimatePresence>
         {isMenuOpen && (
            <motion.div
                key="mobile-menu"
                className="md:hidden absolute top-full left-0 right-0 bg-black/95 border-b border-red-900/50 shadow-lg"
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            >
                <nav className="container mx-auto py-6"> {/* Increased padding */}
                  <ul className="flex flex-col items-center gap-6">
                    {navItems.map((item) => (
                      <li key={item.label} className="relative w-full text-center">
                        <button
                          className={`block w-full font-mono text-lg uppercase tracking-widest py-3 transition-colors duration-200 ${activeSection === item.sectionId ? "text-red-500 font-semibold" : "text-gray-400 hover:text-red-600"}`}
                          onClick={() => scrollToSection(item.sectionId)}
                        >
                          {item.label}
                          {activeSection === item.sectionId && (
                             <motion.div
                                layoutId="active-underline-mobile" // Shared layout ID for animation
                                className="absolute bottom-0 left-1/4 w-1/2 h-px bg-red-500 shadow-[0_0_8px_#ff0000]"
                             />
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
            </motion.div>
         )}
        </AnimatePresence>
    </header>
  )
}
