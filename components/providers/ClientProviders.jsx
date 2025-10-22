"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import AuthInitializer from "@/components/authInitializer/AuthInitializer";
import CookieConsent from "@/components/cookie/CookieConsent";
import SrollTop from "@/components/common/ScrollTop";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

/**
 * Client-side providers wrapper
 * This component handles all client-side logic that was previously in layout.jsx
 */
export default function ClientProviders({ children }) {
  useEffect(() => {
    // Initialize AOS animations
    Aos.init({
      duration: 1200,
      once: true,
    });

    // Load Bootstrap JS (client-side only)
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap");
    }
  }, []);

  return (
    <Provider store={store}>
      <AuthInitializer />
      {children}
      <SrollTop />
      <CookieConsent />
    </Provider>
  );
}
