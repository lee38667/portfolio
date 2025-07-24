import "./services.css";
import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

const textVariants = {
  initial: {
    x: -100,
    y: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const listVariants = {
  initial: {
    x: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.5,
    },
  },
};

const services = [
  {
    id: 1,
    img: "/service1.png",
    title: "Web Development",
    description: "Creating modern, responsive websites and web applications using the latest technologies and best practices.",
    features: ["React & Next.js", "Responsive Design", "Performance Optimization", "SEO Ready"]
  },
  {
    id: 2,
    img: "/service2.png",
    title: "Graphic Design",
    description: "Designing visually appealing graphics, logos, and brand identities that communicate your message effectively.",
    features: ["Logo Design", "Brand Identity", "Print Design", "Digital Graphics"],
    counter: 15,
  },
  {
    id: 3,
    img: "/service3.png",
    title: "IT Support",
    description: "Providing comprehensive technical support and solutions to keep your systems running smoothly and efficiently.",
    features: ["System Maintenance", "Troubleshooting", "Security Updates", "24/7 Support"],
    counter: 50,
  },
];

const Services = () => {
  const ref = useRef();
  const isInView = useInView(ref, { margin: "200px" });
  
  // Typing animation state
  const [displayedText, setDisplayedText] = useState("");
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  const serviceTexts = [
    "Website?",
    "UI/UX Designer?",
    "IT Support Specialist?",
    "Digital Solutions Expert?"
  ];

  useEffect(() => {
    const currentText = serviceTexts[currentServiceIndex];
    
    if (isTyping) {
      if (displayedText.length < currentText.length) {
        const timer = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        }, 100);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setIsTyping(false);
        }, 1000);
        return () => clearTimeout(timer);
      }
    } else {
      if (displayedText.length > 0) {
        const timer = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 50);
        return () => clearTimeout(timer);
      } else {
        setCurrentServiceIndex((prev) => (prev + 1) % serviceTexts.length);
        setIsTyping(true);
      }
    }
  }, [displayedText, currentServiceIndex, isTyping, serviceTexts]);
  
  return (
    <div className="services" ref={ref}>
      <motion.h1
        variants={textVariants}
        animate={isInView ? "animate" : "initial"}
        className="sTitle"
      >
        How Can I Help You?
      </motion.h1>
      <motion.div
        variants={textVariants}
        animate={isInView ? "animate" : "initial"}
        className="typing-container"
      >
        <span className="typing-text">
          Need a <span className="typed-service">{displayedText}</span>
          <span className="cursor">|</span>
        </span>
      </motion.div>
      <motion.div
        variants={listVariants}
        animate={isInView ? "animate" : "initial"}
        className="serviceList"
      >
        {services.map((service) => (
          <motion.div
            variants={listVariants}
            className="service-card"
            key={service.id}
            whileHover={{ 
              y: -10, 
              transition: { duration: 0.3 } 
            }}
          >
            <div className="service-header">
              <div className="serviceIcon">
                <img src={service.img} alt={service.title} />
              </div>
              <h2 className="service-title">{service.title}</h2>
            </div>
            <p className="service-description">{service.description}</p>
            <ul className="service-features">
              {service.features.map((feature, index) => (
                <li key={index} className="feature-item">
                  <span className="feature-bullet">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="service-button">Learn More</button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Services;
