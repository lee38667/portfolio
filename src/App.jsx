// import Hero from "./components/hero/Hero";
// import Services from "./components/services/Services";
// import Portfolio from "./components/portfolio/Portfolio";
// import Contact from "./components/contact/Contact";

import { lazy, Suspense, useState, useEffect } from "react";
import LazyLoad from "react-lazyload";
import SplashScreen from "./components/splash/SplashScreen";

const Hero = lazy(() => import("./components/hero/Hero"));
const Services = lazy(() => import("./components/services/Services"));
const Portfolio = lazy(() => import("./components/portfolio/Portfolio"));
const Contact = lazy(() => import("./components/contact/Contact"));

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
    <div className="container">
      <Suspense fallback={"loading..."}>
        <LazyLoad height={"100vh"} offset={-100}>
          <section id="#home">
            <Hero />
          </section>
        </LazyLoad>
      </Suspense>
      <Suspense fallback={"loading..."}>
        <LazyLoad height={"100vh"} offset={-100}>
          <section id="#services">
            <Services />
          </section>{" "}
        </LazyLoad>
      </Suspense>
      <Suspense fallback={"loading..."}>
        <LazyLoad height={"600vh"} offset={-100}>
          {/* <section id="#portfolio"> */}
          <Portfolio />
          {/* </section> */}{" "}
        </LazyLoad>
      </Suspense>
      <Suspense fallback={"loading..."}>
        <LazyLoad height={"100vh"} offset={-100}>
          <section id="#contact">
            <Contact />
          </section>{" "}
        </LazyLoad>
      </Suspense>
    </div>
  );
};

export default App;
