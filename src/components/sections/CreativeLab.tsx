'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Box, Plane } from '@react-three/drei';

function Gallery3D() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} color="#8b5cf6" intensity={1} />
      <pointLight position={[-5, -5, -5]} color="#00d4ff" intensity={0.8} />
      
      {/* Gallery walls */}
      <Plane args={[8, 4]} position={[0, 0, -3]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a2e" transparent opacity={0.3} />
      </Plane>
      
      {/* Floating design panels */}
      {[...Array(6)].map((_, index) => (
        <Float key={index} speed={1 + index * 0.2} rotationIntensity={0.3} floatIntensity={0.5}>
          <Box 
            args={[1.2, 0.8, 0.05]} 
            position={[
              (index % 3 - 1) * 2.5,
              Math.sin(index) * 1.5,
              index * 0.5 - 1
            ]}
          >
            <meshStandardMaterial 
              color={['#ff0080', '#00d4ff', '#8b5cf6', '#00ff88', '#ffaa00', '#ff6b6b'][index]} 
              emissive={['#ff0080', '#00d4ff', '#8b5cf6', '#00ff88', '#ffaa00', '#ff6b6b'][index]}
              emissiveIntensity={0.2}
            />
          </Box>
        </Float>
      ))}
      
      {/* Orbiting design elements */}
      {[...Array(12)].map((_, i) => (
        <Float key={i} speed={2 + i * 0.1} rotationIntensity={0.2}>
          <mesh position={[
            Math.cos(i * Math.PI / 6) * 5,
            Math.sin(i * Math.PI / 6) * 0.5,
            Math.sin(i * Math.PI / 6) * 3
          ]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial 
              color="#8b5cf6" 
              emissive="#8b5cf6" 
              emissiveIntensity={0.5} 
            />
          </mesh>
        </Float>
      ))}
    </Canvas>
  );
}

export function CreativeLab() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState('branding');

  const designCategories = [
    { id: 'branding', label: 'Brand Identity', icon: '🎨' },
    { id: 'web', label: 'Web Design', icon: '🌐' },
    { id: 'ui', label: 'UI/UX', icon: '📱' },
    { id: 'print', label: 'Print Design', icon: '🖨️' }
  ];

  const designs = {
    branding: [
      {
        title: 'Arc Planners Logo',
        description: 'Modern architectural firm branding with clean geometric elements',
        category: 'Logo Design',
        year: '2024',
        tools: ['Figma', 'Adobe Illustrator'],
        color: '#00d4ff'
      },
      {
        title: 'Tech Startup Brand',
        description: 'Complete brand identity for emerging technology company',
        category: 'Brand System',
        year: '2024',
        tools: ['Figma', 'Adobe Creative Suite'],
        color: '#8b5cf6'
      },
      {
        title: 'Event Branding',
        description: 'Conference branding with dynamic visual system',
        category: 'Event Design',
        year: '2023',
        tools: ['Illustrator', 'Photoshop'],
        color: '#00ff88'
      }
    ],
    web: [
      {
        title: 'Portfolio Website',
        description: 'Interactive 3D portfolio with immersive scroll experience',
        category: 'Web Development',
        year: '2024',
        tools: ['Next.js', 'Three.js', 'Figma'],
        color: '#ff0080'
      },
      {
        title: 'E-commerce Platform',
        description: 'Modern online store with seamless user experience',
        category: 'E-commerce',
        year: '2024',
        tools: ['React', 'Stripe', 'Tailwind'],
        color: '#ffaa00'
      }
    ],
    ui: [
      {
        title: 'Mobile App Interface',
        description: 'Clean and intuitive mobile application design',
        category: 'Mobile UI',
        year: '2024',
        tools: ['Figma', 'Principle'],
        color: '#00d4ff'
      },
      {
        title: 'Dashboard Design',
        description: 'Data visualization dashboard for analytics platform',
        category: 'Web App',
        year: '2023',
        tools: ['Figma', 'React'],
        color: '#8b5cf6'
      }
    ],
    print: [
      {
        title: 'Business Cards',
        description: 'Professional business card designs with modern typography',
        category: 'Stationery',
        year: '2024',
        tools: ['InDesign', 'Illustrator'],
        color: '#00ff88'
      },
      {
        title: 'Conference Posters',
        description: 'Large format designs for tech conferences and events',
        category: 'Event Materials',
        year: '2023',
        tools: ['Photoshop', 'InDesign'],
        color: '#ff6b6b'
      }
    ]
  };

  const designTools = [
    { name: 'Figma', icon: '🎯', proficiency: 95 },
    { name: 'Adobe Creative Suite', icon: '🎨', proficiency: 90 },
    { name: 'Sketch', icon: '✏️', proficiency: 85 },
    { name: 'Blender', icon: '🎭', proficiency: 75 },
    { name: 'After Effects', icon: '🎬', proficiency: 80 }
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
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold glow-purple mb-4">
            CREATIVE LAB
          </h2>
          <p className="font-fira text-xl text-gray-300 mb-8">
            Digital artistry and design exploration chamber
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* 3D Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-96 relative"
          >
            <Gallery3D />
            <div className="absolute bottom-4 left-4 glass-panel p-3">
              <div className="font-fira text-sm text-purple-400">
                {'> gallery_mode: interactive'}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                3D Design Gallery
              </div>
            </div>
          </motion.div>

          {/* Design Tools */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="font-orbitron text-2xl font-bold text-white mb-6">
              Design Arsenal
            </h3>
            {designTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="glass-panel p-4 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{tool.icon}</span>
                    <span className="font-orbitron text-lg text-white group-hover:glow-purple transition-all">
                      {tool.name}
                    </span>
                  </div>
                  <span className="font-fira text-sm text-gray-400">
                    {tool.proficiency}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${tool.proficiency}%` } : {}}
                    transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                    className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Design Portfolio */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {designCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-fira transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50 glow-purple'
                    : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>

          {/* Design Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {designs[selectedCategory as keyof typeof designs].map((design, index) => (
                <motion.div
                  key={design.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-panel p-6 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                  style={{ borderColor: design.color + '40' }}
                >
                  {/* Design Preview */}
                  <div 
                    className="h-40 rounded-lg mb-4 flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${design.color}20, ${design.color}10)`,
                      border: `1px solid ${design.color}40`
                    }}
                  >
                    <div className="text-4xl opacity-60">🎨</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-orbitron text-lg font-bold text-white group-hover:glow transition-all">
                        {design.title}
                      </h4>
                      <span className="text-gray-400 text-sm font-fira">
                        {design.year}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 text-sm font-fira">
                      {design.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <span 
                        className="px-2 py-1 rounded text-xs font-fira"
                        style={{ 
                          background: design.color + '20',
                          color: design.color
                        }}
                      >
                        {design.category}
                      </span>
                      <div className="flex space-x-1">
                        {design.tools.slice(0, 2).map((tool) => (
                          <span key={tool} className="text-gray-500 text-xs">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Creative Process */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <h3 className="font-orbitron text-2xl font-bold mb-8 glow-purple">
            Creative Process
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {['Research', 'Ideate', 'Design', 'Prototype', 'Test', 'Deploy'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className="glass-panel px-4 py-2">
                  <span className="font-fira text-sm text-gray-300">{step}</span>
                </div>
                {index < 5 && (
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={isInView ? { x: 0, opacity: 1 } : {}}
                    transition={{ 
                      duration: 0.5, 
                      delay: 1 + index * 0.2,
                      repeat: Infinity,
                      repeatType: 'loop',
                      repeatDelay: 3
                    }}
                    className="mx-2 text-purple-400"
                  >
                    →
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
