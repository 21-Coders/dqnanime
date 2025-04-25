import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Existing code for loading and audio handling
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true);

         // Try to play with sound immediately (will likely be blocked by browser)
        const playPromise = videoRef.current?.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // If successful, unmute
              if (videoRef.current) {
                videoRef.current.muted = false;
                setIsMuted(false);
              }
            })
            .catch(error => {
              // If autoplay with sound fails, play muted instead
              console.log("Autoplay with sound not allowed:", error);
              if (videoRef.current) {
                videoRef.current.muted = true;
                setIsMuted(true);
                videoRef.current.play();
              }
            });
        }
      });
    }

    // Add a "first interaction" detector to unmute as soon as user interacts
    const handleFirstInteraction = () => {
      if (!hasInteracted && videoRef.current && videoRef.current.muted) {
        videoRef.current.muted = false;
        setIsMuted(false);
        setHasInteracted(true);
      }
    };

    // Add listeners for common interaction events
    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);
    window.addEventListener('scroll', handleFirstInteraction);

    // Add a notification to inform user about enabling sound
    if (isVideoLoaded && isMuted) {
      const notification = document.createElement('div');
      notification.style.position = 'fixed';
      notification.style.bottom = '80px';
      notification.style.left = '50%';
      notification.style.transform = 'translateX(-50%)';
      notification.style.backgroundColor = 'rgba(0,0,0,0.7)';
      notification.style.color = 'white';
      notification.style.padding = '10px 20px';
      notification.style.borderRadius = '5px';
      notification.style.zIndex = '9999';
      notification.innerText = 'Click anywhere to enable sound';

      document.body.appendChild(notification);

      // Remove after 5 seconds
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 5000);
    }

    // Cleanup
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };
  }, [isVideoLoaded, isMuted, hasInteracted]);

  const toggleSound = () => {
    setIsMuted(prev => !prev);
  };

  // Make sure video mute state matches our state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Full screen video background */}
      <div className="absolute inset-0 z-0">
        {/* Video container with relative positioning for lamp effect */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">

          {/* Video element */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover px-8 py-8"
            onLoadedData={() => setIsVideoLoaded(true)}
            onContextMenu={(e) => e.preventDefault()}
            preload="auto"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            controls={false}
          >
            <source src="/assets/dqnteaser.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Sound toggle button */}
        <div className="absolute bottom-10 right-10 z-50 pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSound();
            }}
            className="bg-cyberdark2/80 border border-cybergray p-2 rounded-full hover:bg-cyberdark2 transition duration-300"
            aria-label={isMuted ? "Enable sound" : "Disable sound"}
          >
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyberred" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyberblue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
        </div>

        {/* Rest of your existing code for overlays and effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyberdark via-cyberdark/60 to-cyberdark/10 z-10"></div>
        <div className="absolute inset-0 bg-cyberdark/40 z-10"></div>

        {/* Animated scan lines */}
        {/* <motion.div
          className="absolute top-0 left-0 w-full h-4 bg-cyberred/20 z-20"
          animate={{
            y: [0, 1000, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        />

        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-cyberblue/30 z-20"
          animate={{
            y: [200, 900, 200],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        /> */}

        {/* Horizontal scan lines */}
        <div className="absolute inset-0 z-20" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
          pointerEvents: 'none',
          mixBlendMode: 'overlay'
        }}></div>

        {/* Digital noise effect */}
        <div className="absolute inset-0 opacity-10 z-20 pointer-events-none noise-overlay"></div>

        {/* HUD Interface Elements */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          {/* Top-left corner element */}
          <motion.div
            className="absolute top-6 left-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className="w-20 h-20 border-t-2 border-l-2 border-cyberred"></div>
          </motion.div>

          {/* Top-right corner element */}
          <motion.div
            className="absolute top-6 right-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            <div className="w-20 h-20 border-t-2 border-r-2 border-cyberred"></div>
          </motion.div>

          {/* Bottom-left corner element */}
          <motion.div
            className="absolute bottom-6 left-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            <div className="w-20 h-20 border-b-2 border-l-2 border-cyberred"></div>
          </motion.div>

          {/* Bottom-right corner element */}
          <motion.div
            className="absolute bottom-6 right-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
          >
            <div className="w-20 h-20 border-b-2 border-r-2 border-cyberred"></div>
          </motion.div>
        </div>

        {/* Center Logo / Text */}
        <motion.div
          className="absolute inset-0 flex items-start justify-center z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="px-4 py-10">
            <motion.div
              className="text-6xl md:text-8xl font-cyber font-bold text-white leading-none tracking-tighter"
              animate={{
                textShadow: ["0 0 10px rgba(255, 45, 85, 0.5)", "0 0 20px rgba(255, 45, 85, 0.8)", "0 0 10px rgba(255, 45, 85, 0.5)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {/* <span className="text-cyberred">DQN</span> */}
              {/* <div className="flex items-center justify-center w-32 md:w-60 h-auto">
                <img src={"https://www.dqn.red/_next/static/media/logo-red.9c7c3ea1.svg"} alt="Logo" className="inline-block w-full h-full mr-36 md:mr-0" />
              </div> */}
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom data readout */}
        <motion.div
          className="absolute hidden md:block bottom-8 left-8 bg-cyberdark2/80 border border-cybergray p-2 font-code text-xs z-30"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 0.9, x: 0 }}
          transition={{ duration: 0.5, delay: 2.5 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 bg-cyberred rounded-full"
              animate={{
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="text-gray-300">
              SYSTEM_STATUS: <span className="text-cyberred">ONLINE</span>
            </div>
          </div>
        </motion.div>

        {/* Additional HUD elements */}
        <motion.div
          className="absolute top-8 right-8 bg-cyberdark2/80 border border-cybergray p-2 font-code text-xs z-30"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 0.9, x: 0 }}
          transition={{ duration: 0.5, delay: 2.7 }}
        >
          <div className="flex flex-col gap-1">
            <div className="text-gray-400">NEO-TOKYO <span className="text-cyberblue">2099</span></div>
            <motion.div
              className="text-cyberred"
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              CONNECTION_ACTIVE
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
