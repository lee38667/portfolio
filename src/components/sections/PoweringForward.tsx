'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Box, Sphere, Text } from '@react-three/drei';

function SpaceshipScene() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} color="#00d4ff" intensity={1.5} />
      <pointLight position={[-10, -10, -10]} color="#00ff88" intensity={1} />
      
      {/* Main spaceship/server */}
      <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <group>
          {/* Central core */}
          <Box args={[2, 0.5, 3]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#1a1a2e" emissive="#00d4ff" emissiveIntensity={0.2} />
          </Box>
          
          {/* Wings/panels */}
          <Box args={[4, 0.1, 1]} position={[0, 0.5, -1]}>
            <meshStandardMaterial color="#2a2a4a" emissive="#8b5cf6" emissiveIntensity={0.15} />
          </Box>
          <Box args={[4, 0.1, 1]} position={[0, -0.5, -1]}>
            <meshStandardMaterial color="#2a2a4a" emissive="#8b5cf6" emissiveIntensity={0.15} />
          </Box>
          
          {/* Engine glow */}
          <Sphere args={[0.3, 16, 16]} position={[0, 0, -2]}>
            <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.8} />
          </Sphere>
        </group>
      </Float>
      
      {/* Floating energy particles */}
      {[...Array(20)].map((_, i) => (
        <Float key={i} speed={1.5 + i * 0.1} rotationIntensity={0.1}>
          <Sphere
            args={[0.05, 8, 8]}
            position={[
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10
            ]}
          >
            <meshStandardMaterial 
              color={['#00d4ff', '#00ff88', '#8b5cf6', '#ff0080'][Math.floor(Math.random() * 4)]}
              emissive={['#00d4ff', '#00ff88', '#8b5cf6', '#ff0080'][Math.floor(Math.random() * 4)]}
              emissiveIntensity={0.5}
            />
          </Sphere>
        </Float>
      ))}
      
      {/* Status text */}
      <Float speed={0.8} rotationIntensity={0.1}>
        <Text
          position={[0, 3, 0]}
          fontSize={0.5}
          color="#00ff88"
        >
          READY FOR DEPLOYMENT
        </Text>
      </Float>
    </Canvas>
  );
}

export function PoweringForward() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showShutdown, setShowShutdown] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
    
    // Show success message
    alert('Message sent successfully! I\'ll get back to you soon.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const roadmapItems = [
    {
      title: 'Advanced AI Integration',
      description: 'Exploring machine learning applications in web development',
      timeline: 'Q1 2025',
      status: 'Planning'
    },
    {
      title: 'Mobile App Development',
      description: 'Expanding into React Native and Flutter development',
      timeline: 'Q2 2025',
      status: 'Research'
    },
    {
      title: 'Open Source Contributions',
      description: 'Contributing to major React and Next.js projects',
      timeline: 'Ongoing',
      status: 'Active'
    },
    {
      title: 'Tech Leadership',
      description: 'Mentoring junior developers and leading projects',
      timeline: 'Q3 2025',
      status: 'Preparation'
    }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/lee38667',
      icon: '🐱',
      description: 'Open source contributions and projects'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/lineekela-shinavene',
      icon: '💼',
      description: 'Professional network and experience'
    },
    {
      name: 'Email',
      url: 'mailto:lineekela.shinavene@example.com',
      icon: '📧',
      description: 'Direct communication channel'
    },
    {
      name: 'Portfolio',
      url: '#',
      icon: '🚀',
      description: 'This interactive experience'
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
            POWERING FORWARD
          </h2>
          <p className="font-fira text-xl text-gray-300 mb-8">
            Mission control for future collaborations and system deployment
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* 3D Spaceship Scene */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-96 relative"
          >
            <SpaceshipScene />
            <div className="absolute bottom-4 left-4 glass-panel p-3">
              <div className="font-fira text-sm text-green-400">
                {'> system_status: optimal'}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Ready for next mission
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="font-orbitron text-2xl font-bold text-white mb-6">
              Establish Communication
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="glass-panel p-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-none outline-none text-white font-fira placeholder-gray-400"
                />
              </div>
              
              <div className="glass-panel p-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-none outline-none text-white font-fira placeholder-gray-400"
                />
              </div>
              
              <div className="glass-panel p-4">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-none outline-none text-white font-fira placeholder-gray-400 resize-none"
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full glass-panel p-4 font-orbitron font-bold transition-all duration-300 ${
                  isSubmitting 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-green-400 hover:glow-green hover:bg-white/10'
                }`}
              >
                {isSubmitting ? 'TRANSMITTING...' : 'SEND MESSAGE'}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h3 className="font-orbitron text-2xl font-bold text-center mb-12 glow-blue">
            Mission Roadmap
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="glass-panel p-6 hover:bg-white/10 transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>
                <h4 className="font-orbitron text-lg font-bold text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-sm mb-3 font-fira">
                  {item.description}
                </p>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">{item.timeline}</span>
                  <span className={`px-2 py-1 rounded-full font-fira ${
                    item.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                    item.status === 'Planning' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <h3 className="font-orbitron text-2xl font-bold text-center mb-12 glow-purple">
            Connect & Collaborate
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-panel p-6 text-center hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {link.icon}
                </div>
                <h4 className="font-orbitron text-lg font-bold text-white group-hover:glow transition-all mb-2">
                  {link.name}
                </h4>
                <p className="text-gray-400 text-sm font-fira">
                  {link.description}
                </p>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center"
        >
          <div className="terminal p-8 max-w-2xl mx-auto">
            <div className="font-fira text-green-400 mb-4">
              {'> deployment_status: ready'}
            </div>
            <div className="space-y-4 text-gray-300 mb-6">
              <p>
                System initialized successfully. All modules operational.
              </p>
              <p>
                Thank you for exploring my digital realm. Ready to collaborate on your next project.
              </p>
            </div>
            <motion.button
              onClick={() => setShowShutdown(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-panel px-8 py-4 font-orbitron font-bold text-red-400 hover:glow hover:bg-white/10 transition-all duration-300"
            >
              INITIATE SHUTDOWN SEQUENCE
            </motion.button>
          </div>

          {showShutdown && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            >
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="font-orbitron text-4xl font-bold glow-green mb-4"
                >
                  SYSTEM SHUTDOWN COMPLETE
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="font-fira text-gray-400"
                >
                  Thank you for visiting. Portfolio successfully deployed.
                </motion.div>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 1 }}
                  onClick={() => setShowShutdown(false)}
                  className="mt-6 glass-panel px-6 py-3 font-fira text-blue-400 hover:glow-blue transition-all"
                >
                  RESTART SYSTEM
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
