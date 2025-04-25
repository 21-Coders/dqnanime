"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "wouter"
import { Zap, Menu, X } from "lucide-react"

// Navigation items
const navItems = [
  { label: "HOME", href: "/" },
  { label: "CHARACTERS", href: "/characters" },
  { label: "WORLD", href: "/world" },
  { label: "COMMUNITY", href: "/community" },
]

export default function CyberpunkHeader() {
  const [location] = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  const [hoverItem, setHoverItem] = useState<string | null>(null)

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

  return (
    <header className="fixed top-0 left-0 right-0 py-3 px-4 md:px-6 lg:px-12 bg-black/90 backdrop-blur-sm border-b border-red-900/50 z-50 shadow-[0_0_15px_rgba(255,0,0,0.3)]">
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
                  src="/assets/dqnlogo.svg"
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
                  src="/assets/dqnlogo.svg"
                  alt=""
                  width={80}
                  height={80}
                  className="w-16 h-auto text-red-500 absolute transform translate-x-[2px] translate-y-[1px] opacity-70"
                  style={{ filter: "drop-shadow(0 0 2px #ff0000)" }}
                />
                <img
                  src="/assets/dqnlogo.svg"
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
                <Link href={item.href}>
                  <a
                    className={`block font-mono text-sm uppercase tracking-widest px-2 py-1 transition-colors relative overflow-hidden
                      ${location === item.href ? "text-red-500" : "text-gray-400 hover:text-white"}`}
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
                    {location === item.href && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 shadow-[0_0_5px_#ff0000]"></div>
                    )}

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-red-900/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>

                    {/* Scanline effect on hover */}
                    <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-30">
                      <div className="w-full h-full bg-gradient-to-b from-transparent via-red-500/10 to-transparent bg-size-200 animate-scanline"></div>
                    </div>
                  </a>
                </Link>
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
                <Link href={item.href}>
                  <a
                    className={`block font-mono text-lg uppercase tracking-widest py-2 ${
                      location === item.href ? "text-red-500" : "text-gray-400"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                    {location === item.href && (
                      <div className="absolute bottom-0 left-1/4 w-1/2 h-px bg-red-500 shadow-[0_0_5px_#ff0000]"></div>
                    )}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
