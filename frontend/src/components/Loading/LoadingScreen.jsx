import React, { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-bg-dark dark:bg-gradient-to-br dark:from-gradient-start dark:via-gradient-mid dark:to-gradient-end flex flex-col items-center justify-center z-50">
      <div className="relative">
        <div className="mb-8 text-center">
          <img 
            src="/nab-skillswap.png" 
            alt="NAB Logo" 
            className="w-100 h-30 object-contain animate-pulse"
          />
        </div>
        
        <h2 className="text-3xl font-bold text-center transition-opacity duration-1000" 
            style={{ opacity: isVisible ? 1 : 0.5 }}>
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Loading...
          </span>
        </h2>
        
        {/* Modern Spinner */}
        <div className="relative w-12 h-12 mx-auto mt-6 mb-8">
          <div className="absolute w-full h-full rounded-full border-4 border-zinc-200 dark:border-zinc-700"></div>
          <div className="absolute w-full h-full rounded-full border-4 border-t-primary border-r-primary-medium border-b-secondary border-l-transparent animate-spin"></div>
          <div className="absolute w-full h-full flex items-center justify-center">
            
          </div>
        </div>
        
        {/* Fade-in Text */}
        <p className="text-white font-light text-center transition-opacity duration-1000"
           style={{ opacity: isVisible ? 1.0 : 0.5 }}>
          Preparing your experience...
        </p>
      </div>
    </div>
  );
}