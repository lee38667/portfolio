'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function BootingSection() {
  const [bootStage, setBootStage] = useState(0);
  const [currentText, setCurrentText] = useState('');

  const bootSequence = [
    'INITIALIZING SYSTEM...',
    'LOADING CORE MODULES...',
    'ESTABLISHING CONNECTIONS...',
    'SYSTEM READY',
    'WELCOME TO LINEEKELA\'S DIGITAL REALM'
  ];

  const name = "LINEEKELA SHINAVENE";
  const tagline = "SOFTWARE DEVELOPER • CREATIVE TECHNOLOGIST • DIGITAL ARCHITECT";

  useEffect(() => {
    const timer = setTimeout(() => {
      if (bootStage < bootSequence.length) {
        setBootStage(prev => prev + 1);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [bootStage, bootSequence.length]);

  useEffect(() => {
    if (bootStage < bootSequence.length) {
      let index = 0;
      const text = bootSequence[bootStage];
      setCurrentText('');
      
      const typeWriter = setInterval(() => {
        setCurrentText(text.slice(0, index + 1));
        index++;
        
        if (index >= text.length) {
          clearInterval(typeWriter);
        }
      }, 50);

      return () => clearInterval(typeWriter);
    }
  }, [bootStage, bootSequence]);

  return (
    <section className="relative h-screen flex items-center justify-center bg-black overflow-visible">
      {/* Terminal interface */}
      <div className="terminal p-8 max-w-4xl w-full mx-4">
        <div className="flex items-center mb-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="ml-4 text-green-400 text-sm font-fira">
            portfolio@lineekela:~$
          </div>
        </div>

        <div className="space-y-2 mb-8">
          {bootSequence.slice(0, bootStage).map((line, index) => (
            <div key={index} className="text-green-400 font-fira text-sm">
              {'> '}{index === bootStage - 1 ? currentText : line}
              {index === bootStage - 1 && (
                <span className="animate-pulse">|</span>
              )}
            </div>
          ))}
        </div>

        {bootStage >= bootSequence.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center"
          >
            <motion.h1
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold glow-blue mb-4"
            >
              {name}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="font-fira text-lg md:text-xl glow-purple"
            >
              {tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
              className="mt-8 text-green-400 animate-bounce"
            >
              <div className="text-2xl">↓</div>
              <div className="text-sm font-fira">SCROLL TO EXPLORE</div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Floating circuit elements */}
      {bootStage >= bootSequence.length && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0, 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)
              }}
              animate={{ 
                opacity: [0, 0.6, 0],
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              className="absolute w-1 h-1 bg-blue-400 rounded-full glow"
            />
          ))}
        </div>
      )}
    </section>
  );
}
