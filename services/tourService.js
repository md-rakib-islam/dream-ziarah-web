import { GET_ALL_TOUR, GET_TOUR_ENTRYID } from "@/constant/constants";

// Helper function to get cache configuration
const getCacheConfig = (forceRefresh = false) => {
  if (forceRefresh) {
    return { cache: "no-store" }; // Force fresh data
  }
  return {
    next: { revalidate: process.env.NODE_ENV === "development" ? 10 : 60 }, // 10s in dev, 1min in prod
    headers: { "Content-Type": "application/json" },
  };
};

export async function getAllToursServer(forceRefresh = false) {
  try {
    const response = await fetch(GET_ALL_TOUR, getCacheConfig(forceRefresh));

    if (!response.ok) {
      throw new Error(`Failed to fetch tours: ${response.status}`);
    }

    const data = await response.json();

    // Filter only published tours (same logic as your hook)
    const filteredData = data?.filter((tour) => tour.published === true) || [];

    return filteredData;
  } catch (error) {
    console.error("Error fetching all tours:", error);
    return [];
  }
}

export async function getTourBySlugServer(slug, forceRefresh = false) {
  try {
    if (!slug) return null;

    // First try to get tour directly by slug if API supports it
    // For now, we'll still need to fetch all tours, but we'll optimize the request
    const response = await fetch(GET_ALL_TOUR, getCacheConfig(forceRefresh));

    if (!response.ok) {
      throw new Error(`Failed to fetch tours: ${response.status}`);
    }

    const allTours = await response.json();
    const filteredTours =
      allTours?.filter((tour) => tour.published === true) || [];

    const tour = filteredTours.find((tour) => tour.slug === slug) || null;

    // Debug logging to help identify issues
    if (!tour) {
      console.log("Tour not found for slug:", slug);
    }

    return {
      tour,
      tourIds: tour ? tour.id : null,
      notFound: !tour,
    };
  } catch (error) {
    console.error("Error fetching tour by slug:", error);
    return null;
  }
}

export async function getSingleTourServer(tourId, forceRefresh = false) {
  try {
    if (!tourId) return null;

    const timestamp = new Date().getTime();
    const url = `${GET_TOUR_ENTRYID}/${tourId}/?t=${timestamp}`;

    const response = await fetch(url, getCacheConfig(forceRefresh));

    if (!response.ok) {
      throw new Error(`Failed to fetch single tour: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching single tour:", error);
    return null;
  }
}
