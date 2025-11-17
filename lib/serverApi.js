// Server-side API fetching utilities
import { BASE_URL, GET_SLIDERSETTINGS } from "@/constant/constants";

/**
 * Fetch slider images on server-side
 * This runs during build time and on server
 */
export async function getSliderImages() {
  try {
    const response = await fetch(GET_SLIDERSETTINGS, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!response.ok) {
      console.error(`Failed to fetch slider images: ${response.status}`);
      return { data: [], error: null };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching slider images:", error);
    return { data: [], error: error.message };
  }
}

/**
 * Fetch hero tabs data on server-side
 */
export async function getHeroTabs() {
  // Since tabs are static, return them directly
  return {
    data: [
      { id: 1, name: "Makkah" },
      { id: 2, name: "Madina" },
      { id: 3, name: "Jeddah" },
      { id: 4, name: "Taif" },
    ],
    error: null,
  };
}

/**
 * Generic server-side fetch utility
 */
export async function serverFetch(url, options = {}) {
  try {
    const response = await fetch(url, {
      next: { revalidate: 300 }, // Default 5 min revalidation
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error(`Server fetch error for ${url}:`, error);
    return { data: null, error: error.message };
  }
}
