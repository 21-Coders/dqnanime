"use client"

import { useState, useEffect, useRef } from "react"
import { Zap, Menu, X } from "lucide-react"

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

  // Trigger random glitch effects
  useEffect(() => {
    const glitchInterval = setInterval(
      () => {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 200)
      },
      Math.random() * 5000 + 3000,
    )

    return () => clearInterval(glitchInterval)
  }, [])

  // Scroll to section when nav item is clicked
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      // Calculate position accounting for header height
      const headerHeight = headerRef.current?.offsetHeight || 0
      const sectionPosition = section.getBoundingClientRect().top + window.scrollY - headerHeight
      
      window.scrollTo({
        top: sectionPosition,
        behavior: 'smooth'
      })
      
      setActiveSection(sectionId)
      setIsMenuOpen(false)
    }
  }

  // Track scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Offset to trigger slightly before reaching section
      
      // Get all sections and their positions
      const sections = navItems.map(item => {
        const section = document.getElementById(item.sectionId)
        if (!section) return { id: item.sectionId, top: 0, bottom: 0 }
        
        const { top, bottom } = section.getBoundingClientRect()
        return {
          id: item.sectionId,
          top: top + window.scrollY,
          bottom: bottom + window.scrollY
        }
      })
      
      // Find the current active section
      for (const section of sections) {
        if (scrollPosition >= section.top && scrollPosition < section.bottom) {
          setActiveSection(section.id)
          break
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 py-3 px-4 md:px-6 lg:px-12 bg-black/90 backdrop-blur-sm border-b border-red-900/50 z-50 shadow-[0_0_15px_rgba(255,0,0,0.3)]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center relative">
          <div
            className={`relative ${glitchActive ? "animate-glitch" : ""}`}
            onMouseEnter={() => setGlitchActive(true)}
            onMouseLeave={() => setGlitchActive(false)}
          >
            {/* Logo with glitch effect */}
            <div className="relative w-16 h-10 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/dqnlogo.svg"
                  alt="logo"
                  width={80}
                  height={80}
                  className={`w-16 h-auto ${glitchActive ? "opacity-0" : "opacity-100"} transition-opacity`}
                />
              </div>

              {/* Glitch layers */}
              <div
                className={`absolute inset-0 flex items-center justify-center ${glitchActive ? "opacity-100" : "opacity-0"}`}
              >
                <img
                  src="/dqnlogo.svg"
                  alt=""
                  width={80}
                  height={80}
                  className="w-16 h-auto text-red-500 absolute transform translate-x-[2px] translate-y-[1px] opacity-70"
                  style={{ filter: "drop-shadow(0 0 2px #ff0000)" }}
                />
                <img
                  src="/dqnlogo.svg"
                  alt=""
                  width={80}
                  height={80}
                  className="w-16 h-auto text-cyan-500 absolute transform -translate-x-[2px] -translate-y-[1px] opacity-70"
                  style={{ filter: "drop-shadow(0 0 2px #00ffff)" }}
                />
              </div>

              {/* Red glow */}
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl transform scale-75 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>

          <div className="ml-2 flex flex-col">
            <span className="text-xs text-red-500 font-mono tracking-wider">
              <span className="inline-block mr-1 animate-pulse">
                <Zap size={10} className="inline" />
              </span>
              v1.0.0
            </span>
            <span className="text-[8px] text-red-700 font-mono">CYBERNETIC_OS</span>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center text-red-500 hover:text-red-400 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:block w-auto">
          <ul className="flex items-center gap-4 lg:gap-8">
            {navItems.map((item) => (
              <li key={item.label} className="relative group">
                <button
                  onClick={() => scrollToSection(item.sectionId)}
                  className={`block font-mono text-sm uppercase tracking-widest px-2 py-1 transition-colors relative overflow-hidden
                    ${activeSection === item.sectionId ? "text-red-500" : "text-gray-400 hover:text-white"}`}
                  onMouseEnter={() => setHoverItem(item.label)}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  {/* Text with potential glitch effect */}
                  <span
                    className={`relative z-10 ${hoverItem === item.label || glitchActive ? "animate-textglitch" : ""}`}
                  >
                    {item.label}
                  </span>

                  {/* Active indicator */}
                  {activeSection === item.sectionId && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 shadow-[0_0_5px_#ff0000]"></div>
                  )}

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-red-900/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>

                  {/* Scanline effect on hover */}
                  <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-30">
                    <div className="w-full h-full bg-gradient-to-b from-transparent via-red-500/10 to-transparent bg-size-200 animate-scanline"></div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile navigation */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-black/95 border-b border-red-900/50 transform transition-transform duration-300 ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        <nav className="container mx-auto py-4">
          <ul className="flex flex-col items-center gap-6">
            {navItems.map((item) => (
              <li key={item.label} className="relative w-full text-center">
                <button
                  className={`block w-full font-mono text-lg uppercase tracking-widest py-2 ${
                    activeSection === item.sectionId ? "text-red-500" : "text-gray-400"
                  }`}
                  onClick={() => scrollToSection(item.sectionId)}
                >
                  {item.label}
                  {activeSection === item.sectionId && (
                    <div className="absolute bottom-0 left-1/4 w-1/2 h-px bg-red-500 shadow-[0_0_5px_#ff0000]"></div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
