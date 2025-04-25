import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

interface GlitchyCursorProps {
  // Core appearance
  cursorSize?: number;
  cursorColor?: string;
  trailLength?: number;
  
  // Glitch options
  glitchIntensity?: number;
  glitchFrequency?: number;
  glitchDuration?: number;
  
  // Effects
  enableShatter?: boolean;
  enablePixelation?: boolean;
  enableTrail?: boolean;
  enableGhost?: boolean;
  enableRgbShift?: boolean;
  
  // Performance
  throttleAmount?: number;
  
  // Interaction options
  clickEffect?: 'ripple' | 'shatter' | 'teleport' | 'none';
  hoverScale?: number;
}

const GlitchyCursor: React.FC<GlitchyCursorProps> = ({
  cursorSize = 24,
  cursorColor = '#ffffff',
  trailLength = 8,
  glitchIntensity = 10,
  glitchFrequency = 3000,
  glitchDuration = 150,
  enableShatter = true,
  enablePixelation = true,
  enableTrail = true,
  enableGhost = true,
  enableRgbShift = true,
  throttleAmount = 10,
  clickEffect = 'ripple',
  hoverScale = 1.2
}) => {
  // Core state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  
  // Store trail positions for smooth animation
  const [trailPositions, setTrailPositions] = useState<Array<{x: number, y: number}>>([]);

  // For storing previous mouse positions to calculate velocity
  const prevPosition = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>();
  const glitchTimeoutRef = useRef<NodeJS.Timeout>();
  const throttleRef = useRef<number>(0);
  
  // For hover detection
  const hoverElements = useRef<Element[]>([]);
  
  // For pixel randomization
  const pixelOffsets = useMemo(() => {
    return Array.from({ length: 20 }).map(() => ({
      x: (Math.random() * 2 - 1) * glitchIntensity,
      y: (Math.random() * 2 - 1) * glitchIntensity,
      size: Math.random() * 0.5 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
    }));
  }, [glitchIntensity]);

  // Throttled mouse position update
  const updatePosition = useCallback((e: MouseEvent) => {
    if (Date.now() - throttleRef.current < throttleAmount) return;
    throttleRef.current = Date.now();

    const newPosition = { x: e.clientX, y: e.clientY };
    
    // Calculate velocity for dynamic effects
    const vx = newPosition.x - prevPosition.current.x;
    const vy = newPosition.y - prevPosition.current.y;
    setVelocity({ x: vx, y: vy });
    
    setPosition(newPosition);
    setVisible(true);
    
    // Update trail positions
    setTrailPositions(prev => {
      const newPositions = [newPosition, ...prev.slice(0, trailLength - 1)];
      return newPositions;
    });
    
    prevPosition.current = newPosition;
    
    // Check for hoverable elements
    const elementsAtPoint = document.elementsFromPoint(e.clientX, e.clientY);
    const isHovering = elementsAtPoint.some(el => 
      el.hasAttribute('data-cursor-hover') || 
      el.tagName === 'A' || 
      el.tagName === 'BUTTON' ||
      (el as HTMLElement).style.cursor === 'pointer'
    );
    
    setHovering(isHovering);
    hoverElements.current = elementsAtPoint;
  }, [throttleAmount, trailLength]);

  const handleClick = useCallback(() => {
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
  }, []);

  // Add keyboard shortcuts for toggling glitch
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'g') {
      setGlitching(prev => !prev);
    }
  }, []);

  useEffect(() => {
    // Hide the default cursor on the whole page
    document.body.style.cursor = 'none';
    
    // Add special hover cursor to all links and buttons
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(el => {
      el.setAttribute('data-cursor-hover', 'true');
    });

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    // Random glitch effect with variable frequency and duration
    const triggerGlitch = () => {
      setGlitching(true);
      
      glitchTimeoutRef.current = setTimeout(() => {
        setGlitching(false);
        
        // Schedule next glitch with randomized timing
        setTimeout(triggerGlitch, Math.random() * glitchFrequency + (glitchFrequency / 2));
      }, Math.random() * glitchDuration + glitchDuration);
    };
    
    // Initial glitch schedule
    const glitchSchedule = setTimeout(triggerGlitch, Math.random() * glitchFrequency);

    // Prepare animation frame handler
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleClick);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      // Clean up all event listeners and timers
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      
      if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      clearTimeout(glitchSchedule);
      
      // Remove data attributes we added
      interactiveElements.forEach(el => {
        el.removeAttribute('data-cursor-hover');
      });
    };
  }, [updatePosition, handleClick, handleKeyDown, glitchFrequency, glitchDuration]);

  // Don't render anything if cursor is not visible
  if (!visible) return null;

  // Dynamically calculate cursor scale based on hover state and velocity
  const velocityMagnitude = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
  const dynamicScale = hovering ? hoverScale : 1 + (velocityMagnitude * 0.005);
  
  // Helper function to generate RGB shift
  const rgbShift = (offsetX: number, offsetY: number, color: string) => ({
    position: 'absolute',
    left: position.x + offsetX,
    top: position.y + offsetY,
    width: `${cursorSize}px`,
    height: `${cursorSize}px`,
    borderRadius: '50%',
    backgroundColor: color,
    opacity: 0.5,
    mixBlendMode: 'screen',
    transform: `translate(-50%, -50%) scale(${dynamicScale})`,
    pointerEvents: 'none',
    transition: glitching ? 'none' : 'transform 0.2s ease'
  });

  return (
    <div className="glitchy-cursor-container" style={{ position: 'fixed', zIndex: 9999, pointerEvents: 'none' }}>
      {/* Main cursor */}
      <div 
        className={`glitchy-cursor ${glitching ? 'glitching' : ''} ${clicked ? 'clicked' : ''}`}
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          width: `${cursorSize}px`,
          height: `${cursorSize}px`,
          backgroundColor: hovering ? '#ffffff' : cursorColor,
          borderRadius: '50%',
          transform: `translate(-50%, -50%) scale(${dynamicScale})`,
          transition: glitching ? 'none' : 'transform 0.2s ease, background-color 0.3s ease',
          boxShadow: `0 0 ${cursorSize / 2}px rgba(255, 255, 255, 0.8)`,
          opacity: 0.8
        }}
      />
      
      {/* Cursor outline for better visibility */}
      <div 
        className="cursor-outline"
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          width: `${cursorSize + 4}px`,
          height: `${cursorSize + 4}px`,
          border: '1px solid rgba(255, 255, 255, 0.6)',
          borderRadius: '50%',
          transform: `translate(-50%, -50%) scale(${dynamicScale * 1.1})`,
          transition: glitching ? 'none' : 'transform 0.15s ease',
          opacity: 0.6
        }}
      />
      
      {/* RGB Shift effect */}
      {enableRgbShift && glitching && (
        <>
          <div 
            className="cursor-rgb-shift red"
            style={rgbShift((Math.random() * 2 - 1) * glitchIntensity, (Math.random() * 2 - 1) * glitchIntensity, 'rgba(255, 0, 0, 0.8)')}
          />
          <div 
            className="cursor-rgb-shift green"
            style={rgbShift((Math.random() * 2 - 1) * glitchIntensity, (Math.random() * 2 - 1) * glitchIntensity, 'rgba(0, 255, 0, 0.8)')}
          />
          <div 
            className="cursor-rgb-shift blue"
            style={rgbShift((Math.random() * 2 - 1) * glitchIntensity, (Math.random() * 2 - 1) * glitchIntensity, 'rgba(0, 0, 255, 0.8)')}
          />
        </>
      )}
      
      {/* Pixel shatter effect when glitching */}
      {enablePixelation && glitching && (
        <div className="cursor-pixelation">
          {pixelOffsets.map((offset, i) => (
            <div 
              key={`pixel-${i}`}
              style={{
                position: 'absolute',
                left: position.x + offset.x * (glitching ? 2 : 0),
                top: position.y + offset.y * (glitching ? 2 : 0),
                width: `${cursorSize * 0.15 * offset.size}px`,
                height: `${cursorSize * 0.15 * offset.size}px`,
                backgroundColor: cursorColor,
                opacity: offset.opacity * (glitching ? 1 : 0),
                transform: 'translate(-50%, -50%)',
                transition: 'opacity 0.2s ease'
              }}
            />
          ))}
        </div>
      )}
      
      {/* Trail effect */}
      {enableTrail && trailPositions.map((pos, i) => (
        <div 
          key={`trail-${i}`}
          className="cursor-trail-dot"
          style={{
            position: 'absolute',
            left: pos.x,
            top: pos.y,
            width: `${cursorSize * (1 - i * (1 / trailLength))}px`,
            height: `${cursorSize * (1 - i * (1 / trailLength))}px`,
            backgroundColor: cursorColor,
            borderRadius: '50%',
            opacity: (1 - i / trailLength) * 0.3,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }}
        />
      ))}
      
      {/* Ghost after-image effect */}
      {enableGhost && (
        <div 
          className="cursor-ghost"
          style={{
            position: 'absolute',
            left: position.x - velocity.x * 2,
            top: position.y - velocity.y * 2,
            width: `${cursorSize * 1.2}px`,
            height: `${cursorSize * 1.2}px`,
            backgroundColor: 'transparent',
            border: `1px solid ${cursorColor}`,
            borderRadius: '50%',
            opacity: Math.min(velocityMagnitude * 0.05, 0.3),
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }}
        />
      )}
      
      {/* Click ripple effect */}
      {clicked && clickEffect === 'ripple' && (
        <div 
          className="cursor-click-ripple"
          style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            width: `${cursorSize}px`,
            height: `${cursorSize}px`,
            border: `2px solid ${cursorColor}`,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%) scale(0)',
            animation: 'ripple 0.6s ease-out',
            opacity: 0.8,
            pointerEvents: 'none'
          }}
        />
      )}
      
      {/* Shatter effect on click */}
      {clicked && clickEffect === 'shatter' && enableShatter && (
        <div className="cursor-click-shatter">
          {Array.from({ length: 10 }).map((_, i) => {
            const angle = (i / 10) * Math.PI * 2;
            const distance = cursorSize * 2;
            return (
              <div 
                key={`shatter-${i}`}
                style={{
                  position: 'absolute',
                  left: position.x,
                  top: position.y,
                  width: `${cursorSize * 0.2}px`,
                  height: `${cursorSize * 0.2}px`,
                  backgroundColor: cursorColor,
                  borderRadius: '50%',
                  transform: `translate(-50%, -50%)`,
                  animation: `shatter-particle-${i} 0.4s ease-out forwards`,
                  opacity: 1,
                  pointerEvents: 'none'
                }}
              />
            );
          })}
        </div>
      )}
      
      {/* Text indicator for hover state */}
      {hovering && (
        <div 
          className="cursor-hover-indicator"
          style={{
            position: 'absolute',
            left: position.x,
            top: position.y - cursorSize - 5,
            color: '#ffffff',
            fontSize: '10px',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            transform: 'translate(-50%, -100%)',
            pointerEvents: 'none',
            textShadow: '0 0 4px rgba(0,0,0,0.8)'
          }}
        >
          {clicked ? 'CLICK' : ''}
        </div>
      )}
      
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
        
        ${Array.from({ length: 10 }).map((_, i) => {
          const angle = (i / 10) * Math.PI * 2;
          const distanceX = Math.cos(angle) * cursorSize * 3;
          const distanceY = Math.sin(angle) * cursorSize * 3;
          
          return `
            @keyframes shatter-particle-${i} {
              0% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
              }
              100% {
                transform: translate(calc(-50% + ${distanceX}px), calc(-50% + ${distanceY}px)) scale(0);
                opacity: 0;
              }
            }
          `;
        }).join('\n')}
      `}</style>
    </div>
  );
};

export default GlitchyCursor;
