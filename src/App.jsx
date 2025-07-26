import { useState, useEffect } from "react";
import { HelmetProvider } from 'react-helmet-async';
import SplashScreen from "./components/splash/SplashScreen";
import SEO from "./components/SEO";
import PerformanceMonitor from "./components/PerformanceMonitor";
import Hero from "./components/hero/Hero";
import Services from "./components/services/Services";
import Portfolio from "./components/portfolio/Portfolio";
import Contact from "./components/contact/Contact";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if user has visited before (optional)
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (hasVisited) {
      // If user has visited before, show splash for shorter time
      setTimeout(() => {
        setShowSplash(false);
      }, 6000);
    }
    
    // Mark that user has visited
    localStorage.setItem('hasVisited', 'true');
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setIsLoaded(true);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <HelmetProvider>
      <SEO />
      <PerformanceMonitor />
      
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <main id="main-content" className="container">
        <section id="hero" aria-label="Hero Section">
          <Hero />
        </section>
        
        <section id="services" aria-label="Services Section">
          <Services />
        </section>
        
        <section id="portfolio" aria-label="Portfolio Section">
          <Portfolio />
        </section>
        
        <section id="contact" aria-label="Contact Section">
          <Contact />
        </section>
      </main>
    </HelmetProvider>
  );
};

export default App;
