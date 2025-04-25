import { useEffect, useRef } from 'react';

const MatrixBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Japanese character pool for matrix effect
  const japaneseCharPool = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン';
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const matrixColumns = 40; // Number of columns
    
    // Create matrix characters
    const characters: HTMLDivElement[] = [];
    
    for (let i = 0; i < matrixColumns; i++) {
      const character = document.createElement('div');
      character.className = 'matrix-character';
      character.textContent = getRandomJapaneseChar();
      
      // Set random properties
      character.style.setProperty('--delay', (Math.random() * 10).toString());
      character.style.setProperty('--position', (Math.random() * 100).toString());
      character.style.setProperty('--opacity', (Math.random() * 0.5 + 0.2).toString());
      
      container.appendChild(character);
      characters.push(character);
    }
    
    // Periodically change characters
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * characters.length);
      if (characters[randomIndex]) {
        characters[randomIndex].textContent = getRandomJapaneseChar();
      }
    }, 1000);
    
    return () => {
      clearInterval(interval);
      characters.forEach(char => {
        if (container.contains(char)) {
          container.removeChild(char);
        }
      });
    };
  }, []);
  
  const getRandomJapaneseChar = () => {
    return japaneseCharPool.charAt(Math.floor(Math.random() * japaneseCharPool.length));
  };
  
  return (
    <div 
      ref={containerRef} 
      className="matrix-container absolute w-full h-[200%] top-[-50%] left-0 z-1 opacity-10 pointer-events-none"
    ></div>
  );
};

export default MatrixBackground;
