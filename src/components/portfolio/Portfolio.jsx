import { useEffect, useRef, useState } from "react";
import "./portfolio.css";
import { motion, useInView, useScroll, useTransform } from "motion/react";

const items = [
  {
    id: 1,
    img: "/p4.webp",
    title: "Van Rhyn Primary School - Online Registration Platform",
    desc: "Built a modern online registration system with document uploads and real-time tracking. Integrated admin dashboard, MongoDB, Cloudinary, and fast Next.js frontend via Netlify. Focused on usability, scalability, and seamless admin management.",
    link: "https://vanrhynps.netlify.app/",
  },
  {
    id: 2,
    img: "/p1.webp",
    title: "Tayari Transitions Brand Package",
    desc: "Designed a complete branding package including logo, color scheme, and visual identity. Ensured consistent, professional appearance across digital and print platforms. Created prototype in Figma with focus on UI/UX and branding.",
    link: "/p1.webp",
  },
  {
    id: 3,
    img: "/p2.webp",
    title: "ARC Planners & Investments CC - Brand Design",
    desc: "Designed a brand identity package with a minimalist logo, mockups, and a custom letterhead. Reflected values of growth, strength, and reliability in visual design for this investment company.",
    link: "/p2.webp",
  },
  {
    id: 4,
    img: "/p3.webp",
    title: "Fishza Trading Services",
    desc: "Developed a comprehensive online website for Fishza Trading Services, showcasing their services and expertise. The site features a modern design, user-friendly navigation, and responsive layout to enhance user experience across devices.",
    link: "https://fishza-trading-services.onrender.com/",
  },
  {
    id: 5,
    img: "/p6.webp",
    title: "Video Production & Editing",
    desc: "Edited 60+ videos using Filmora, Premiere Pro, and CapCut for YouTube and social media. Focused on storytelling, pacing, and visual effects to enhance viewer engagement. Delivered high-quality content for various platforms.",
    link: "https://www.youtube.com/@leeeditzz2.0",
  },
];

const imgVariants = {
  initial: {
    x: -500,
    y: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const textVariants = {
  initial: {
    x: 500,
    y: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      staggerChildren: 0.05,
    },
  },
};

const ListItem = ({ item }) => {
  const ref = useRef();

  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <div className="pItem" ref={ref}>
      <motion.div
        variants={imgVariants}
        animate={isInView ? "animate" : "initial"}
        className="pImg"
      >
        <img src={item.img} alt="" loading="lazy" />
      </motion.div>
      <motion.div
        variants={textVariants}
        animate={isInView ? "animate" : "initial"}
        className="pText"
      >
        <motion.h1 variants={textVariants}>{item.title}</motion.h1>
        <motion.p variants={textVariants}>{item.desc}</motion.p>
        <motion.a variants={textVariants} href={item.link}>
          <button>View Project</button>
        </motion.a>
      </motion.div>
    </div>
  );
};

const Portfolio = () => {
  const [containerDistance, setContainerDistance] = useState(0);
  const ref = useRef(null);

  // useEffect(() => {
  //   if (ref.current) {
  //     const rect = ref.current.getBoundingClientRect();
  //     setContainerDistance(rect.left);
  //   }
  // }, []);

  // FIX: Re-calculate when screen size changes
  useEffect(() => {
    const calculateDistance = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setContainerDistance(rect.left);
      }
    };

    calculateDistance();

    window.addEventListener("resize", calculateDistance);

    return () => {
      window.removeEventListener("resize", calculateDistance);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: ref });

  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -window.innerWidth * items.length]
  );

  return (
    <div className="portfolio" ref={ref}>
      <motion.div className="pList" style={{ x: xTranslate }}>
        <div
          className="empty"
          style={{
            width: window.innerWidth - containerDistance,
            // backgroundColor: "pink",
          }}
        />
        {items.map((item) => (
          <ListItem item={item} key={item.id} />
        ))}
      </motion.div>
      <section />
      <section />
      <section />
      <section />
      <section />
      <div className="pProgress">
        <svg width="100%" height="100%" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#ddd"
            strokeWidth={20}
          />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#dd4c62"
            strokeWidth={20}
            style={{ pathLength: scrollYProgress }}
            transform="rotate(-90 80 80)"
          />
        </svg>
      </div>
    </div>
  );
};

export default Portfolio;
