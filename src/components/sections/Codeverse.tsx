'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Text, Box } from '@react-three/drei';

function ProjectCard3D({ position, project, index }: { 
  position: [number, number, number]; 
  project: any; 
  index: number 
}) {
  return (
    <Float speed={1 + index * 0.2} rotationIntensity={0.5} floatIntensity={0.3}>
      <group position={position}>
        <Box args={[2, 1.2, 0.1]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color={project.color} 
            emissive={project.color} 
            emissiveIntensity={0.2}
            transparent
            opacity={0.8}
          />
        </Box>
        <Text
          position={[0, 0.2, 0.06]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/orbitron.woff"
        >
          {project.name}
        </Text>
        <Text
          position={[0, -0.1, 0.06]}
          fontSize={0.08}
          color="#cccccc"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.8}
        >
          {project.tech.join(' • ')}
        </Text>
      </group>
    </Float>
  );
}

function CodeTunnel() {
  const projects = [
    {
      name: 'Van Rhyn Platform',
      description: 'Enterprise software solution for industrial equipment management',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      color: '#00d4ff',
      status: 'Production'
    },
    {
      name: 'Arc Planners',
      description: 'Brand identity and digital presence for architecture firm',
      tech: ['Next.js', 'Figma', 'Adobe Creative Suite'],
      color: '#8b5cf6',
      status: 'Completed'
    },
    {
      name: 'Hackathon Winner',
      description: 'AI-powered solution for sustainable urban planning',
      tech: ['Python', 'TensorFlow', 'React', 'Flask'],
      color: '#00ff88',
      status: 'Award Winner'
    },
    {
      name: 'Portfolio System',
      description: 'Interactive 3D portfolio with immersive scroll experience',
      tech: ['Next.js', 'Three.js', 'GSAP', 'Framer Motion'],
      color: '#ff0080',
      status: 'Current'
    }
  ];

  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 5]} color="#00d4ff" intensity={1} />
      <pointLight position={[5, 5, 0]} color="#8b5cf6" intensity={0.5} />
      
      {projects.map((project, index) => (
        <ProjectCard3D
          key={project.name}
          position={[
            (index % 2 === 0 ? -3 : 3),
            2 - index * 1.5,
            index * -2
          ]}
          project={project}
          index={index}
        />
      ))}
      
      {/* Code stream effect */}
      {[...Array(20)].map((_, i) => (
        <Float key={i} speed={2 + i * 0.1} rotationIntensity={0.1}>
          <Text
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              -5 - i * 2
            ]}
            fontSize={0.1}
            color="#00ff88"
          >
            {['function()', 'const', 'return', 'export', 'import'][Math.floor(Math.random() * 5)]}
          </Text>
        </Float>
      ))}
    </Canvas>
  );
}

export function Codeverse() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      name: 'Van Rhyn Platform',
      description: 'Enterprise software solution for industrial equipment management and maintenance tracking. Built with modern React architecture and robust backend infrastructure.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Docker'],
      github: '#',
      live: '#',
      status: 'Production',
      impact: '40% efficiency increase'
    },
    {
      name: 'Arc Planners',
      description: 'Complete brand identity and digital presence for architecture firm. Includes logo design, website development, and marketing materials.',
      tech: ['Next.js', 'Figma', 'Adobe Creative Suite', 'Tailwind'],
      github: '#',
      live: '#',
      status: 'Completed',
      impact: '200% client engagement'
    },
    {
      name: 'Hackathon Winner',
      description: 'AI-powered solution for sustainable urban planning using machine learning to optimize city layouts and resource distribution.',
      tech: ['Python', 'TensorFlow', 'React', 'Flask', 'PostgreSQL'],
      github: '#',
      live: '#',
      status: 'Award Winner',
      impact: '1st Place Winner'
    }
  ];

  return (
    <section ref={ref} className="min-h-screen py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold glow-purple mb-4">
            CODEVERSE
          </h2>
          <p className="font-fira text-xl text-gray-300 mb-8">
            Journey through digital innovations and project implementations
          </p>
        </motion.div>

        {/* 3D Code Tunnel Background */}
        <div className="absolute inset-0 opacity-20">
          <CodeTunnel />
        </div>

        {/* Project Cards */}
        <div className="relative z-10 space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-1">
                <div className="glass-panel p-8 hover:bg-white/10 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-orbitron text-2xl font-bold text-white group-hover:glow-blue transition-all">
                      {project.name}
                    </h3>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-fira">
                      {project.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-6 font-fira leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-fira hover:bg-blue-500/30 transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                      <a 
                        href={project.github}
                        className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                      >
                        <span className="font-fira text-sm">GitHub</span>
                        <span>→</span>
                      </a>
                      <a 
                        href={project.live}
                        className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                      >
                        <span className="font-fira text-sm">Live Demo</span>
                        <span>→</span>
                      </a>
                    </div>
                    <div className="text-green-400 font-fira text-sm">
                      {project.impact}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 h-64 lg:h-80">
                <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-white/10">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <div className="font-orbitron text-sm text-gray-400">
                      Project Visualization
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Projects Completed', value: '25+' },
            { label: 'Technologies Mastered', value: '15+' },
            { label: 'Client Satisfaction', value: '100%' },
            { label: 'Lines of Code', value: '50k+' }
          ].map((stat, index) => (
            <div key={stat.label} className="glass-panel p-6 text-center">
              <div className="font-orbitron text-2xl md:text-3xl font-bold glow-blue mb-2">
                {stat.value}
              </div>
              <div className="font-fira text-sm text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
