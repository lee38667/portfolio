'use client';

import { useEffect } from 'react';
import { BootingSection } from '@/components/sections/BootingSection';
import { CircuitLayer } from '@/components/sections/CircuitLayer';
import { Codeverse } from '@/components/sections/Codeverse';
import { CloudConnectivity } from '@/components/sections/CloudConnectivity';
import { CommandCenter } from '@/components/sections/CommandCenter';
import { CreativeLab } from '@/components/sections/CreativeLab';
import { PoweringForward } from '@/components/sections/PoweringForward';
import { MatrixBackground } from '@/components/ui/MatrixBackground';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  useEffect(() => {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="relative">
      <MatrixBackground />
      <ScrollProgress />
      
      {/* Scroll Journey Sections */}
      <BootingSection />
      
      {/* Test section to verify scrolling */}
      <div className="h-screen bg-blue-900 flex items-center justify-center">
        <h2 className="text-4xl text-white font-orbitron">TEST SECTION - SCROLLING WORKS!</h2>
      </div>
      
      <CircuitLayer />
      <Codeverse />
      <CloudConnectivity />
      <CommandCenter />
      <CreativeLab />
      <PoweringForward />
    </main>
  );
}
