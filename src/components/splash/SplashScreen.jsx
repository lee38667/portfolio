import { motion } from "motion/react";
import { useEffect, useState } from "react";
import "./splash.css";

const techIcons = [
  { name: "React", image: "react.png", color: "#61DAFB" },
  { name: "JavaScript", image: "javascript.png", color: "#F7DF1E" },
  { name: "HTML", image: "html.png", color: "#E34F26" },
  { name: "CSS", image: "css.png", color: "#1572B6" },
  { name: "Node.js", image: "nodejs.png", color: "#339933" },
  { name: "Git", image: "git.png", color: "#F05032" },
  { name: "Python", image: "python.png", color: "#3776AB" },
  { name: "Java", image: "java.png", color: "#007396" },
  { name: "MySQL", image: "mysql.png", color: "#4479A1" },
  { name: "Figma", image: "figma.png", color: "#F24E1E" },
  { name: "Next.js", image: "nextjs.png", color: "#000000" },
  { name: "MongoDB", image: "mongodb.png", color: "#47A248" },
];

const FallingIcon = ({ icon, delay }) => {
  const [startPosition] = useState({
    x: Math.random() * window.innerWidth,
    rotation: Math.random() * 360,
  });

  return (
    <motion.div
      className="falling-icon"
      initial={{
        x: startPosition.x,
        y: -50,
        rotate: startPosition.rotation,
        opacity: 0,
      }}
      animate={{
        y: window.innerHeight + 50,
        opacity: [0, 1, 1, 0],
        rotate: startPosition.rotation + 360,
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        delay: delay,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: Math.random() * 5,
      }}
    >
      <img 
        src={icon.image} 
        alt={icon.name}
        className="icon-image"
        style={{
          filter: `drop-shadow(0 0 8px ${icon.color})`,
        }}
      />
      <span className="icon-name" style={{ color: icon.color }}>
        {icon.name}
      </span>
    </motion.div>
  );
};

const SplashScreen = ({ onComplete }) => {
  const [showIcons, setShowIcons] = useState(false);

  useEffect(() => {
    // Start showing falling icons after a brief delay
    const timer = setTimeout(() => {
      setShowIcons(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="splash"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => {
        // Auto-complete after 5 seconds
        setTimeout(onComplete, 5000);
      }}
    >
      {/* Falling Tech Icons Background */}
      {showIcons && (
        <div className="falling-icons-container">
          {techIcons.map((icon, index) => (
            <FallingIcon
              key={`${icon.name}-${index}`}
              icon={icon}
              delay={index * 0.5}
            />
          ))}
        </div>
      )}

      <div className="splashContent">
        <motion.div
          className="splashLogo"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1>LS</h1>
        </motion.div>
        
        <motion.div
          className="splashText"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <h2>Lineekela J.Shinavene</h2>
          <p>Aspiring Full Stack Developer</p>
        </motion.div>

        <motion.div
          className="splashLoader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <div className="loader"></div>
          <p>Loading...</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
