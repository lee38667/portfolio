import { motion } from "motion/react";
import "./splash.css";

const SplashScreen = ({ onComplete }) => {
  return (
    <motion.div
      className="splash"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => {
        // Auto-complete after 3 seconds
        setTimeout(onComplete, 3000);
      }}
    >
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
          <h2>Lineekela Shinavene</h2>
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
