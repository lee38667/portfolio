'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Sphere, Line } from '@react-three/drei';
import { Vector3 } from 'three';

function CloudNode({ position, color, size = 0.5 }: { 
  position: [number, number, number]; 
  color: string; 
  size?: number; 
}) {
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh position={position}>
        <Sphere args={[size, 16, 16]}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
        </Sphere>
      </mesh>
    </Float>
  );
}

function DataFlow() {
  const nodes = [
    { pos: [0, 0, 0] as [number, number, number], color: '#00d4ff', size: 0.8 }, // Central hub
    { pos: [-3, 2, -1] as [number, number, number], color: '#8b5cf6', size: 0.6 }, // Database
    { pos: [3, 1.5, 1] as [number, number, number], color: '#00ff88', size: 0.5 }, // API
    { pos: [-2, -2, 2] as [number, number, number], color: '#ff0080', size: 0.4 }, // Cache
    { pos: [2, -1, -2] as [number, number, number], color: '#ffaa00', size: 0.5 }, // Services
  ];

  const connections = [
    [nodes[0].pos, nodes[1].pos],
    [nodes[0].pos, nodes[2].pos],
    [nodes[0].pos, nodes[3].pos],
    [nodes[0].pos, nodes[4].pos],
    [nodes[1].pos, nodes[3].pos],
    [nodes[2].pos, nodes[4].pos],
  ];

  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} color="#00d4ff" intensity={1} />
      <pointLight position={[-5, -5, -5]} color="#8b5cf6" intensity={0.8} />
      
      {/* Nodes */}
      {nodes.map((node, index) => (
        <CloudNode
          key={index}
          position={node.pos}
          color={node.color}
          size={node.size}
        />
      ))}
      
      {/* Connections */}
      {connections.map((connection, index) => (
        <Line
          key={index}
          points={[new Vector3(...connection[0]), new Vector3(...connection[1])]}
          color="#00d4ff"
          lineWidth={2}
          transparent
          opacity={0.6}
        />
      ))}
      
      {/* Orbiting data packets */}
      {[...Array(8)].map((_, i) => (
        <Float key={i} speed={2 + i * 0.3} rotationIntensity={0.1}>
          <mesh position={[
            Math.cos(i * Math.PI / 4) * 4,
            Math.sin(i * Math.PI / 4) * 0.5,
            Math.sin(i * Math.PI / 4) * 4
          ]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.5} />
          </mesh>
        </Float>
      ))}
    </Canvas>
  );
}

export function CloudConnectivity() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const technologies = [
    {
      category: 'Backend Technologies',
      icon: '⚡',
      items: ['Node.js', 'Express', 'Python', 'Flask', 'REST APIs', 'GraphQL']
    },
    {
      category: 'Databases',
      icon: '🗄️',
      items: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase', 'Supabase']
    },
    {
      category: 'Cloud & DevOps',
      icon: '☁️',
      items: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'Netlify']
    },
    {
      category: 'Development Tools',
      icon: '🛠️',
      items: ['Git', 'VS Code', 'Postman', 'Jest', 'ESLint', 'Webpack']
    }
  ];

  const integrations = [
    {
      name: 'GitHub API',
      description: 'Real-time repository statistics and contribution data',
      status: 'Active',
      color: 'text-green-400'
    },
    {
      name: 'Email Service',
      description: 'Automated contact form handling and notifications',
      status: 'Configured',
      color: 'text-blue-400'
    },
    {
      name: 'Analytics',
      description: 'Portfolio performance and visitor insights',
      status: 'Monitoring',
      color: 'text-purple-400'
    }
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
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold glow-green mb-4">
            CLOUD & CONNECTIVITY
          </h2>
          <p className="font-fira text-xl text-gray-300 mb-8">
            Backend systems, databases, and seamless integrations
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* 3D Network Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-96 relative"
          >
            <DataFlow />
            <div className="absolute bottom-4 left-4 glass-panel p-3">
              <div className="font-fira text-sm text-gray-300">
                Network Topology
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Interactive 3D visualization
              </div>
            </div>
          </motion.div>

          {/* Technology Stack */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.category}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="glass-panel p-6 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{tech.icon}</span>
                  <h3 className="font-orbitron text-lg text-white group-hover:glow-blue transition-all">
                    {tech.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tech.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm font-fira hover:bg-blue-500/20 hover:text-blue-400 transition-all cursor-pointer"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Live Integrations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <h3 className="font-orbitron text-2xl font-bold text-center mb-8 glow-blue">
            Live Integrations
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                className="glass-panel p-6 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
                <h4 className="font-orbitron text-lg font-bold text-white mb-2">
                  {integration.name}
                </h4>
                <p className="text-gray-400 text-sm mb-3 font-fira">
                  {integration.description}
                </p>
                <span className={`text-sm font-fira ${integration.color}`}>
                  {integration.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Data Flow Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-4 glass-panel p-4">
            {['Client', 'API', 'Database', 'Cache'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className="font-fira text-sm text-gray-400">{step}</div>
                {index < 3 && (
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={isInView ? { x: 0, opacity: 1 } : {}}
                    transition={{ 
                      duration: 0.5, 
                      delay: 1.4 + index * 0.2,
                      repeat: Infinity,
                      repeatType: 'loop',
                      repeatDelay: 2
                    }}
                    className="mx-2 text-green-400"
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
