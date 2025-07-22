'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(latest => {
      const section = Math.floor(latest * 7); // 7 sections
      setCurrentSection(Math.min(section, 6));
    });

    return unsubscribe;
  }, [scrollYProgress]);

  const sections = [
    'BOOTING',
    'CIRCUITS',
    'CODEVERSE',
    'CLOUD',
    'COMMAND',
    'CREATIVE',
    'DEPLOY'
  ];

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 origin-left z-50"
        style={{ scaleX }}
      />
      
      {/* Section indicators */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 space-y-4">
        {sections.map((section, index) => (
          <div
            key={section}
            className={`flex items-center space-x-3 transition-all duration-300 ${
              index === currentSection ? 'opacity-100' : 'opacity-40'
            }`}
          >
            <span className="text-xs font-orbitron text-white hidden lg:block">
              {section}
            </span>
            <div
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                index === currentSection
                  ? 'bg-blue-500 border-blue-500 shadow-lg shadow-blue-500/50'
                  : 'border-gray-400'
              }`}
            />
          </div>
        ))}
      </div>
    </>
  );
}
