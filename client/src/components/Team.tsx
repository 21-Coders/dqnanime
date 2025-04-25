"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { TeamMember } from "@/data/team"

interface TeamSectionProps {
  members: TeamMember[]
}

const TeamSection: React.FC<TeamSectionProps> = ({ members }) => {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null)
  const [glitchActive, setGlitchActive] = useState(false)
  const [randomGlitch, setRandomGlitch] = useState<string | null>(null)

  // Random glitch effects throughout the component
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, Math.random() * 8000 + 5000)

    const randomMemberGlitch = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * members.length)
      setRandomGlitch(members[randomIndex].id)
      setTimeout(() => setRandomGlitch(null), 300)
    }, Math.random() * 10000 + 8000)

    return () => {
      clearInterval(glitchInterval)
      clearInterval(randomMemberGlitch)
    }
  }, [members])

  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-grid-pattern"></div>
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-red-900/10 to-transparent" 
          style={{ 
            backgroundSize: "100% 8px",
            animation: "scanline 8s linear infinite"
          }}
        ></div>
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 z-0 bg-noise opacity-5 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section title with glitch effect */}
        <div className="relative mb-20">
          <motion.h2 
            className={`text-5xl md:text-7xl font-cyber font-bold text-center mb-4 tracking-wider ${glitchActive ? "glitch-text" : ""}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="text-red-600 relative inline-block">
              TEAM
              {glitchActive && (
                <>
                  <span className="absolute top-0 left-0 text-cyan-500 translate-x-[2px] translate-y-[1px] opacity-70">TEAM</span>
                  <span className="absolute top-0 left-0 text-red-500 -translate-x-[2px] -translate-y-[1px] opacity-70">TEAM</span>
                </>
              )}
            </span>{" "}
            <span className="relative inline-block">
              MEMBERS
              {glitchActive && (
                <>
                  <span className="absolute top-0 left-0 text-cyan-500 translate-x-[2px] translate-y-[1px] opacity-70">MEMBERS</span>
                  <span className="absolute top-0 left-0 text-red-500 -translate-x-[2px] -translate-y-[1px] opacity-70">MEMBERS</span>
                </>
              )}
            </span>
          </motion.h2>

          {/* Animated red line under title */}
          <motion.div 
            className="h-[2px] bg-red-600 w-0 mx-auto relative"
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <motion.div 
              className="absolute top-0 left-0 h-full w-[20%] bg-white"
              animate={{ 
                left: ["0%", "100%"],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "loop",
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Decorative elements */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-[1px] bg-red-600"></div>
              <div className="text-red-600 text-xs font-mono">SYSTEM.PERSONNEL</div>
              <div className="w-8 h-[1px] bg-red-600"></div>
            </div>
          </div>
        </div>

        {/* Team members grid - centered with proper alignment */}
        <div className={`grid gap-10 max-w-6xl mx-auto ${
          members.length === 1 ? 'grid-cols-1 place-items-center' :
          members.length === 2 ? 'grid-cols-1 md:grid-cols-2 place-items-center' :
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {members.map((member) => (
            <motion.div
              key={member.id}
              className={`relative cursor-pointer group ${randomGlitch === member.id ? "random-glitch" : ""} mx-auto w-full max-w-sm`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div className="relative overflow-hidden perspective-container">
                {/* Cybernetic circuit patterns */}
                <div className="absolute inset-0 z-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <svg 
                    className="absolute inset-0 w-full h-full" 
                    viewBox="0 0 100 100" 
                    preserveAspectRatio="none"
                  >
                    {/* Circuit patterns */}
                    <path 
                      d="M10,10 L30,10 L30,30 L50,30 L50,50 L70,50 L70,70 L90,70 L90,90" 
                      fill="none" 
                      stroke="#ff0033" 
                      strokeWidth="0.5" 
                      strokeDasharray="5,5"
                      className="circuit-path"
                    />
                    <path 
                      d="M90,10 L70,10 L70,30 L50,30 L50,50 L30,50 L30,70 L10,70 L10,90" 
                      fill="none" 
                      stroke="#ff0033" 
                      strokeWidth="0.5" 
                      strokeDasharray="5,5"
                      className="circuit-path"
                    />
                  </svg>
                </div>

                {/* Doctor Strange Geometric Effect - enhanced */}
                {hoveredMember === member.id && (
                  <div className="absolute inset-0 z-1 bg-black/80 perspective-container">
                    {/* Main triangular frame */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <motion.svg 
                        width="100%" 
                        height="100%" 
                        viewBox="0 0 100 120"
                        className="neon-glow absolute animate-triangle-pulse" 
                        style={{ 
                          zIndex: 1,
                          filter: "drop-shadow(0 0 5px #ff0033)",
                          transform: "perspective(1000px) rotateY(20deg)" 
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <title>Geometric Frame</title>
                        <motion.polygon 
                          points="50,10 90,90 10,90" 
                          fill="none" 
                          stroke="#ff0033" 
                          strokeWidth="2"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.8 }}
                        />
                      </motion.svg>
                      
                      {/* Second triangle, rotated */}
                      <motion.svg 
                        width="100%" 
                        height="100%" 
                        viewBox="0 0 100 120"
                        className="neon-glow absolute animate-triangle-rotate" 
                        style={{ 
                          zIndex: 1,
                          filter: "drop-shadow(0 0 5px #ff0033)",
                          transform: "perspective(1000px) rotateY(-20deg)" 
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <title>Rotating Triangle</title>
                        <motion.polygon 
                          points="50,10 90,90 10,90" 
                          fill="none" 
                          stroke="#ff0033" 
                          strokeWidth="1.5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1 }}
                        />
                      </motion.svg>

                      {/* Additional geometric shapes */}
                      <motion.svg 
                        width="100%" 
                        height="100%" 
                        viewBox="0 0 100 120"
                        className="absolute" 
                        style={{ zIndex: 1 }}
                        initial={{ opacity: 0, rotate: 0 }}
                        animate={{ opacity: 0.7, rotate: 360 }}
                        transition={{ 
                          opacity: { duration: 0.5, delay: 0.3 },
                          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                        }}
                      >
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="30" 
                          fill="none" 
                          stroke="#ff0033" 
                          strokeWidth="0.5"
                          strokeDasharray="5,5"
                        />
                      </motion.svg>
                    </div>
                    
                    {/* Floating triangle particles - enhanced */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {[...Array(30)].map((_, i) => {
                        const size = 3 + Math.random() * 8;
                        const floatX = (Math.random() * 60) - 30;
                        const floatY = (Math.random() * 60) - 30;
                        const floatZ = (Math.random() * 60) - 10;
                        const startX = 10 + Math.random() * 80;
                        const startY = 10 + Math.random() * 80;
                        
                        return (
                          <motion.div
                            key={`triangle-${member.id}-${i}`}
                            className="triangle-particle absolute"
                            style={{
                              left: `${startX}%`,
                              top: `${startY}%`,
                              width: 0,
                              height: 0,
                              borderStyle: "solid",
                              borderWidth: `0 ${size}px ${size * 1.5}px ${size}px`,
                              borderColor: "transparent transparent #ff0033 transparent",
                              filter: "drop-shadow(0 0 3px #ff0033)",
                              zIndex: 1
                            }}
                            initial={{ opacity: 0, rotate: Math.random() * 360 }}
                            animate={{ 
                              opacity: 0.6 + Math.random() * 0.4,
                              rotate: [Math.random() * 360, Math.random() * 360],
                              x: [0, floatX],
                              y: [0, floatY],
                              z: [0, floatZ]
                            }}
                            transition={{
                              opacity: { duration: 0.5, delay: i * 0.03 },
                              rotate: { 
                                duration: 3 + Math.random() * 4,
                                repeat: Infinity,
                                repeatType: "loop"
                              },
                              x: {
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                              },
                              y: {
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                              },
                              z: {
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                              }
                            }}
                          />
                        );
                      })}
                    </div>
                    
                    {/* Red line elements - enhanced */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(6)].map((_, i) => {
                        const angle = (i * 30) + 15;
                        const length = 80 + (i * 10);
                        const thickness = 2 - (i * 0.2);
                        const startPos = 40 + (i * 5);
                        const translateZ = 10 + (i * 5);
                        
                        return (
                          <motion.div
                            key={`line-${member.id}-${i}`}
                            className="absolute"
                            style={{
                              width: `${length}%`,
                              height: `${thickness}px`,
                              left: "50%",
                              top: "50%",
                              background: "#ff0033",
                              boxShadow: "0 0 5px #ff0033",
                              transform: `translate3d(-50%, -${startPos}%, ${translateZ}px) rotate(${angle}deg)`,
                              transformOrigin: "center left",
                              opacity: 0.8 - (i * 0.1),
                              zIndex: 1
                            }}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ 
                              duration: 0.6, 
                              delay: 0.1 + (i * 0.1) 
                            }}
                          />
                        );
                      })}
                    </div>

                    {/* Digital code rain effect */}
                    <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
                      {[...Array(10)].map((_, i) => {
                        const startX = 10 + (i * 8);
                        return (
                          <div 
                            key={`code-${member.id}-${i}`}
                            className="absolute top-0 w-[2px] h-full"
                            style={{ 
                              left: `${startX}%`,
                              background: "linear-gradient(to bottom, transparent, #ff0033 20%, #ff0033 80%, transparent)",
                              animation: `codeRain ${2 + Math.random() * 3}s linear infinite`,
                              animationDelay: `${Math.random() * 2}s`
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {/* Image with enhanced effects - fixed height and better display */}
                <div className="relative z-2 h-[300px]">
                  <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center">
                    {/* Glitch layers for the image */}
                    {(hoveredMember === member.id || randomGlitch === member.id || glitchActive) && (
                      <>
                        <div 
                          className="absolute inset-0 z-3 opacity-70"
                          style={{ 
                            backgroundImage: `url(${member.imageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            transform: "translate(3px, -2px)",
                            filter: "hue-rotate(90deg)",
                            mixBlendMode: "screen"
                          }}
                        />
                        <div 
                          className="absolute inset-0 z-3 opacity-70"
                          style={{ 
                            backgroundImage: `url(${member.imageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            transform: "translate(-3px, 2px)",
                            filter: "hue-rotate(-90deg)",
                            mixBlendMode: "screen"
                          }}
                        />
                      </>
                    )}

                    <img
                      src={member.imageUrl || "/placeholder.svg"}
                      alt={member.name}
                      className={`w-auto h-auto max-w-full max-h-full object-contain transition-all duration-500 relative ${
                        hoveredMember === member.id ? "grayscale-0" : "grayscale"
                      } ${randomGlitch === member.id || glitchActive ? "glitch-img" : ""}`}
                      style={{
                        transitionTimingFunction: hoveredMember === member.id ? "cubic-bezier(0.2, 0.8, 0.2, 1)" : "ease",
                        zIndex: 2
                      }}
                    />

                    {/* Digital noise overlay */}
                    <div 
                      className={`absolute inset-0 bg-noise z-4 pointer-events-none transition-opacity duration-300 ${
                        hoveredMember === member.id ? "opacity-20" : "opacity-10"
                      }`}
                    />
                  </div>
                </div>
                
                {/* Enhanced border effect */}
                <div className="absolute inset-0 border-2 border-red-900/50 z-10">
                  {/* Animated border on hover */}
                  {hoveredMember === member.id && (
                    <>
                      <motion.div 
                        className="absolute top-0 left-0 h-[2px] bg-red-600"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                        style={{ boxShadow: "0 0 10px #ff0033" }}
                      />
                      <motion.div 
                        className="absolute top-0 right-0 w-[2px] bg-red-600"
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        style={{ boxShadow: "0 0 10px #ff0033" }}
                      />
                      <motion.div 
                        className="absolute bottom-0 right-0 h-[2px] bg-red-600"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        style={{ boxShadow: "0 0 10px #ff0033" }}
                      />
                      <motion.div 
                        className="absolute bottom-0 left-0 w-[2px] bg-red-600"
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        style={{ boxShadow: "0 0 10px #ff0033" }}
                      />
                    </>
                  )}
                </div>
                
                {/* Enhanced scan line animation */}
                {hoveredMember === member.id && (
                  <>
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-6 bg-red-600/20"
                      initial={{ y: -10 }}
                      animate={{ y: 400 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop"
                      }}
                      style={{ zIndex: 5, boxShadow: "0 0 20px #ff0033" }}
                    />
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-[1px] bg-red-600"
                      initial={{ y: -10 }}
                      animate={{ y: 400 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop"
                      }}
                      style={{ zIndex: 5, boxShadow: "0 0 5px #ff0033" }}
                    />
                  </>
                )}
                
                {/* Enhanced corner brackets */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-600 z-10" style={{ boxShadow: "-3px -3px 10px -3px #ff0033" }} />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-600 z-10" style={{ boxShadow: "3px -3px 10px -3px #ff0033" }} />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-600 z-10" style={{ boxShadow: "-3px 3px 10px -3px #ff0033" }} />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-600 z-10" style={{ boxShadow: "3px 3px 10px -3px #ff0033" }} />
              </div>

              {/* Enhanced member info - fixed height to match image */}
              <div className="bg-black border border-red-900/30 p-6 relative h-[200px] flex flex-col justify-center">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
                
                {/* Glitchy text effect for member number */}
                <div className="text-center relative">
                  <motion.h3 
                    className={`text-5xl font-cyber mb-2 ${hoveredMember === member.id ? "text-red-600" : "text-white"}`}
                    animate={{ 
                      color: hoveredMember === member.id ? "#ff0033" : "#ffffff",
                      textShadow: hoveredMember === member.id ? "0 0 8px #ff0033" : "none"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {member.number}
                    {(hoveredMember === member.id || randomGlitch === member.id) && (
                      <>
                        <span className="absolute top-0 left-0 w-full text-cyan-500 opacity-70 glitch-offset-1">{member.number}</span>
                        <span className="absolute top-0 left-0 w-full text-red-500 opacity-70 glitch-offset-2">{member.number}</span>
                      </>
                    )}
                  </motion.h3>

                  {/* Name with tech font */}
                  <div className="relative">
                    <h4 className="text-xl font-cyber text-white tracking-wider">
                      {member.name}
                    </h4>
                    
                
                  </div>

                  {/* Enhanced social media icon */}
                  <div className="mt-4 relative">
                    <div className="w-8 h-8 mx-auto relative">
                      <svg
                        className={`w-6 h-6 mx-auto ${hoveredMember === member.id ? "text-red-600" : "text-white"} transition-colors duration-300`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        style={{ 
                          filter: hoveredMember === member.id ? "drop-shadow(0 0 2px #ff0033)" : "none"
                        }}
                      >
                        <title>X/Twitter</title>
                        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                      </svg>
                      
                      {/* Circular glow on hover */}
                      {hoveredMember === member.id && (
                        <div className="absolute inset-0 rounded-full bg-red-600/20 animate-pulse"></div>
                      )}
                    </div>
                  </div>
                  
                  {/* Tech ID number */}
                  <div className="mt-3 text-xs font-mono text-gray-500">
                    ID: {member.id.substring(0, 8).toUpperCase()}
                  </div>
                </div>

                {/* Bottom decorative line */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
              </div>

              {/* Hover indicator */}
              {hoveredMember === member.id && (
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-1">
                  <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom section decoration */}
        <div className="mt-20 flex justify-center">
          <div className="relative">
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-xs font-mono text-red-600">END.TRANSMISSION</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TeamSection
