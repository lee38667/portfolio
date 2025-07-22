'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Box, Text } from '@react-three/drei';

function Workspace3D() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} color="#00d4ff" intensity={1} />
      <pointLight position={[-5, -5, -5]} color="#8b5cf6" intensity={0.8} />
      
      {/* Desk */}
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <Box args={[4, 0.2, 2]} position={[0, -1, 0]}>
          <meshStandardMaterial color="#2a2a2a" />
        </Box>
      </Float>
      
      {/* Monitor */}
      <Float speed={0.8} rotationIntensity={0.2}>
        <Box args={[2.5, 1.5, 0.1]} position={[0, 0.5, 0]}>
          <meshStandardMaterial color="#000000" emissive="#00d4ff" emissiveIntensity={0.1} />
        </Box>
      </Float>
      
      {/* Keyboard */}
      <Float speed={1.2} rotationIntensity={0.1}>
        <Box args={[1.5, 0.1, 0.5]} position={[0, -0.8, 0.8]}>
          <meshStandardMaterial color="#1a1a1a" />
        </Box>
      </Float>
      
      {/* Code symbols floating */}
      {['{', '}', '<', '>', '=', ';'].map((symbol, index) => (
        <Float key={symbol} speed={1 + index * 0.2} rotationIntensity={0.5}>
          <Text
            position={[
              (index % 2 === 0 ? -1 : 1) * (2 + index * 0.5),
              Math.sin(index) * 2,
              Math.cos(index) * 2
            ]}
            fontSize={0.3}
            color="#00ff88"
          >
            {symbol}
          </Text>
        </Float>
      ))}
    </Canvas>
  );
}

export function CommandCenter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState('about');

  const tabs = [
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'skills', label: 'Skills', icon: '🚀' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'achievements', label: 'Achievements', icon: '🏆' }
  ];

  const experiences = [
    {
      title: 'Software Developer Intern',
      company: 'Tayari',
      period: '2024 - Present',
      description: 'Full-stack development using React, Node.js, and MongoDB. Contributed to enterprise-level applications.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express']
    },
    {
      title: 'Freelance Developer',
      company: 'Independent',
      period: '2023 - Present',
      description: 'Built custom web solutions for various clients, focusing on modern frameworks and responsive design.',
      technologies: ['Next.js', 'React', 'Python', 'PostgreSQL']
    },
    {
      title: 'IT Support Specialist',
      company: 'Various Organizations',
      period: '2022 - 2024',
      description: 'Provided technical support, system maintenance, and troubleshooting for hardware and software issues.',
      technologies: ['Windows', 'Linux', 'Networking', 'Hardware']
    }
  ];

  const skills = [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js'], level: 90 },
    { category: 'Backend', items: ['Node.js', 'Python', 'Express', 'Flask', 'RESTful APIs'], level: 85 },
    { category: 'Database', items: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase'], level: 80 },
    { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'VS Code', 'Figma'], level: 88 }
  ];

  const achievements = [
    {
      title: 'Hackathon Winner',
      description: 'First place in sustainable urban planning AI solution',
      date: '2024',
      icon: '🥇'
    },
    {
      title: 'Open Source Contributor',
      description: 'Active contributor to React and Next.js community projects',
      date: '2023-2024',
      icon: '🌟'
    },
    {
      title: 'Client Success Rate',
      description: '100% client satisfaction across 25+ projects',
      date: '2022-2024',
      icon: '📈'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="terminal p-6">
              <div className="font-fira text-green-400 mb-4">
                {'> cat about_lineekela.txt'}
              </div>
              <div className="space-y-4 text-gray-300">
                <p>
                  Hello! I'm Lineekela Shinavene, a passionate software developer and creative technologist 
                  based in Namibia. I specialize in building modern web applications that combine 
                  cutting-edge technology with intuitive user experiences.
                </p>
                <p>
                  My journey in tech started with a curiosity about how digital systems work, which 
                  evolved into a deep passion for creating solutions that make a difference. I love 
                  the intersection of creativity and logic that programming provides.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to 
                  open-source projects, or designing digital experiences that push the boundaries 
                  of what's possible on the web.
                </p>
              </div>
            </div>
          </motion.div>
        );
      
      case 'skills':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {skills.map((skill, index) => (
              <div key={skill.category} className="glass-panel p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-orbitron text-lg font-bold text-white">
                    {skill.category}
                  </h4>
                  <span className="text-blue-400 font-fira text-sm">
                    {skill.level}%
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-fira"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        );
      
      case 'experience':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-orbitron text-lg font-bold text-white">
                      {exp.title}
                    </h4>
                    <p className="text-blue-400 font-fira">{exp.company}</p>
                  </div>
                  <span className="text-gray-400 text-sm font-fira">
                    {exp.period}
                  </span>
                </div>
                <p className="text-gray-300 mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-fira"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        );
      
      case 'achievements':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center mb-3">
                  <span className="text-3xl mr-4">{achievement.icon}</span>
                  <div>
                    <h4 className="font-orbitron text-lg font-bold text-white">
                      {achievement.title}
                    </h4>
                    <span className="text-gray-400 text-sm font-fira">
                      {achievement.date}
                    </span>
                  </div>
                </div>
                <p className="text-gray-300">{achievement.description}</p>
              </motion.div>
            ))}
          </motion.div>
        );
      
      default:
        return null;
    }
  };

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
            COMMAND CENTER
          </h2>
          <p className="font-fira text-xl text-gray-300 mb-8">
            Central hub for personal data and professional intelligence
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* 3D Workspace */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-96 relative"
          >
            <Workspace3D />
            <div className="absolute bottom-4 left-4 glass-panel p-3">
              <div className="font-fira text-sm text-green-400">
                {'> workspace_status: active'}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                3D Developer Environment
              </div>
            </div>
          </motion.div>

          {/* Information Panels */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-fira text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                      : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                {renderTabContent()}
              </AnimatePresence>
            </div>

            {/* Download CV Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center"
            >
              <button className="glass-panel px-8 py-4 hover:bg-white/10 transition-all duration-300 group">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform">📄</span>
                  <div>
                    <div className="font-orbitron text-lg font-bold text-white group-hover:glow-blue transition-all">
                      Download Resume
                    </div>
                    <div className="font-fira text-sm text-gray-400">
                      Complete professional profile
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
