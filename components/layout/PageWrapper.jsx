"use client";

import { useState, useEffect } from "react";

/**
 * Page wrapper that prevents footer from showing before content
 * Adds minimum height to prevent layout shift
 */
export default function PageWrapper({ children }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Small delay to ensure content starts rendering
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="page-content-wrapper"
      style={{
        minHeight: isReady ? 'auto' : '100vh',
        opacity: isReady ? 1 : 0.98,
        transition: 'opacity 0.2s ease-in-out'
      }}
    >
      {children}
    </div>
  );
}
