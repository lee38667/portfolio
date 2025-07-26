import { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Log Core Web Vitals
    const logWebVitals = (metric) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`${metric.name}: ${metric.value}`);
      }
    };

    // Measure First Contentful Paint
    if ('performance' in window && 'getEntriesByType' in performance) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            logWebVitals({
              name: 'FCP',
              value: entry.startTime
            });
          }
        }
      });
      observer.observe({ entryTypes: ['paint'] });
    }

    // Measure Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          logWebVitals({
            name: 'LCP',
            value: lastEntry.startTime
          });
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // Handle browsers that don't support LCP
      }
    }

    // Measure Cumulative Layout Shift
    if ('PerformanceObserver' in window) {
      try {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          logWebVitals({
            name: 'CLS',
            value: clsValue
          });
        });
        observer.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // Handle browsers that don't support CLS
      }
    }
  }, []);

  return null;
};

export default PerformanceMonitor;
