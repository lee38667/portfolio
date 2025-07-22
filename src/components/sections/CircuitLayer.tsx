'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Text3D, OrbitControls } from '@react-three/drei';

function FloatingChip({ position, color = '#00d4ff' }: { position: [number, number, number]; color?: string }) {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
      <mesh position={position}>
        <boxGeometry args={[0.8, 0.1, 0.8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
      </mesh>
    </Float>
  );
}

function Circuit3D() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} color="#00d4ff" intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.5} />
      
      <FloatingChip position={[-3, 2, 0]} color="#00d4ff" />
      <FloatingChip position={[3, -1, 0]} color="#8b5cf6" />
      <FloatingChip position={[0, 1, 2]} color="#00ff88" />
      <FloatingChip position={[-2, -2, -1]} color="#ff0080" />
      
      {/* Central processor */}
      <Float speed={0.5} rotationIntensity={0.5}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 0.2, 1.5]} />
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.4} />
        </mesh>
      </Float>
      
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}

export function CircuitLayer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    { name: 'JavaScript', level: 95, category: 'Language' },
    { name: 'TypeScript', level: 90, category: 'Language' },
    { name: 'React', level: 95, category: 'Framework' },
    { name: 'Next.js', level: 88, category: 'Framework' },
    { name: 'Node.js', level: 85, category: 'Runtime' },
    { name: 'Python', level: 80, category: 'Language' },
    { name: 'MongoDB', level: 85, category: 'Database' },
    { name: 'Git', level: 92, category: 'Tool' }
  ];

  return (
    <section ref={ref} className="min-h-screen py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold glow-blue mb-4">
            THE CIRCUIT LAYER
          </h2>
          <p className="font-fira text-xl text-gray-300 mb-8">
            Foundational skills and core technologies
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Circuit Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-96 relative"
          >
            <Circuit3D />
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="glass-panel p-4 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-orbitron text-lg text-white group-hover:glow-blue transition-all">
                    {skill.name}
                  </span>
                  <span className="font-fira text-sm text-gray-400">
                    {skill.category}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                </div>
                <div className="text-right mt-1">
                  <span className="font-fira text-xs text-gray-400">
                    {skill.level}%
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Logic Gates Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 flex justify-center space-x-8"
        >
          {['AND', 'OR', 'NOT', 'XOR'].map((gate, index) => (
            <motion.div
              key={gate}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              className="glass-panel p-4 text-center hover:glow-green transition-all cursor-pointer"
            >
              <div className="font-orbitron text-sm glow-green">{gate}</div>
              <div className="w-8 h-8 mx-auto mt-2 border-2 border-green-400 rounded-sm"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
