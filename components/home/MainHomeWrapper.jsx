"use client";

import { useState, useEffect } from "react";
import MainHome from "./MainHome";
import HomeLoading from "./HomeLoading";

/**
 * Wrapper for MainHome that shows loading state initially
 * This prevents the footer from appearing before content loads
 */
export default function MainHomeWrapper() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content immediately on mount to prevent flash
    setShowContent(true);
  }, []);

  if (!showContent) {
    return <HomeLoading />;
  }

  return <MainHome />;
}
