import { useCallback, useEffect } from "react";
import { debounce } from "lodash";
import { useState } from "react";

const useWindowSize = () => {
  // Initialize with actual width immediately to prevent SSR mismatch
  const [width, setWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    // Return null for SSR - components should handle this
    return typeof window !== 'undefined' ? window.innerWidth : 1024;
  });

  const windowListener = useCallback(
    debounce(() => {
      if (typeof window !== 'undefined') {
        setWidth(window.innerWidth);
      }
    }, 250),
    []
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Don't update on mount if width is already set correctly
      // Only add resize listener
      window.addEventListener("resize", windowListener);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("resize", windowListener);
      }
    };
  }, [windowListener]);

  return width;
};

export default useWindowSize;
