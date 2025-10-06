import Wrapper from "@/components/layout/Wrapper";
import TourHeading from "@/components/tour-single/TourHeading";
import TourSingle from "@/components/tour-single/TourSingle";
import { getTourBySlugServer } from "@/services/tourService";
import { notFound } from "next/navigation";
import { getAlternates } from "@/utils/canonical";

function getFullUrl(slug) {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://dreamziarah.com/";
  const fullPath = `${baseUrl}/tour/${slug}`;
  return fullPath;
}

const tourMetadatas = {
  // Makkah Tours
  "large-group-makkah-ziyarat-tour-minibus-15": {
    title: "Large group Makkah Ziyarat tour by minibus for 15 guests",
    description:
      "Book a large group Makkah Ziyarat tour by minibus for up to 15 guests. Comfortable transport, key Ziyarat sites, a helpful host, and simple pickup. See dates and prices.",
  },
  "makkah-private-ziyarat-tour-luxury-car": {
    title: "Makkah private Ziyarat tour in a luxury car for 3 guests",
    description:
      "Reserve a private Makkah Ziyarat tour in a luxury car for up to three guests. Door-to-door transport, flexible timing, and friendly guidance. Check availability and price.",
  },
  "small-group-makkah-ziyarat-tour-luxury-van": {
    title: "Small group Makkah Ziyarat tour by luxury van for 10 guests",
    description:
      "Book a small group Makkah Ziyarat tour by luxury van for up to 10 guests. Comfortable seating, key sites, and clear meeting details. See live availability and prices.",
  },
  "family-makkah-ziyarat-tour-private-car": {
    title: "Family Makkah Ziyarat tour by private car, five seater",
    description:
      "Reserve a family Makkah Ziyarat tour by private five-seater car. Easy pickup, relaxed pacing, and child-friendly timing. View itinerary details and current prices.",
  },

  // Madinah Tours
  "large-group-madinah-ziyarat-tour-minibus": {
    title: "Large group Madinah Ziyarat tour by minibus for 15 guests",
    description:
      "Book a large group Madinah Ziyarat tour by minibus for up to 15 guests. Comfortable travel, key Ziyarat sites, and a helpful host. Check dates and secure your seats.",
  },
  "family-madinah-ziyarat-tour-private-car-5-seater": {
    title: "Family Madinah Ziyarat tour by private car, five seater",
    description:
      "Reserve a family Madinah Ziyarat tour in a private five-seater car. Easy pickup, flexible timing, and friendly guidance. See availability and transparent pricing.",
  },
  "private-madinah-ziyarat-tour-luxury-car": {
    title: "Private Madinah Ziyarat tour in a luxury car for three guests",
    description:
      "Book a private Madinah Ziyarat tour in a luxury car for up to three guests. Door-to-door comfort, flexible schedule, and calm pacing. Check prices and book your time.",
  },
  "small-group-madinah-ziyarat-tour-luxury-van": {
    title: "Small group Madinah Ziyarat tour by luxury van for 10 guests",
    description:
      "Reserve a small group Madinah Ziyarat tour by luxury van for up to 10 guests. Comfortable seating, clear route details, and easy pickup. View dates and tour prices.",
  },

  // Taif Tours
  "day-trip-makkah-to-taif-private-car-3": {
    title:
      "Day trip from Makkah to Taif by private luxury car for three guests",
    description:
      "Book a private day trip from Makkah to Taif by luxury car for up to three guests. Easy pickup, hill views, and relaxed stops. See availability and secure your booking.",
  },
  "day-trip-makkah-to-taif-family-car-5": {
    title: "Day trip Makkah to Taif family car five seater booking",
    description:
      "Reserve a family day trip from Makkah to Taif in a five-seater car. Comfortable travel, flexible timing, and photo stops. Check live dates and family-friendly prices.",
  },
  "day-trip-makkah-to-taif-luxury-van-10": {
    title: "Day trip Makkah to Taif by luxury van for 10 guests",
    description:
      "Book a day trip from Makkah to Taif by luxury van for up to 10 guests. Smooth transport, scenic viewpoints, and simple meeting details. View dates and tour pricing.",
  },
  "day-trip-makkah-to-taif-minibus-15": {
    title: "Day trip from Makkah to Taif by minibus for group 1of 5 guests",
    description:
      "Reserve a day trip from Makkah to Taif by minibus for up to 15 guests. Group-friendly seating, clear pickup info, and relaxed stops. See availability and prices now.",
  },

  // Jeddah Tours
  "day-trip-makkah-to-jeddah-private-luxury-car": {
    title: "Day trip from Makkah to Jeddah by private luxury car, three guests",
    description:
      "Book a private day trip from Makkah to Jeddah by luxury car for up to three guests. Comfortable ride, flexible schedule, and easy pickup. Check dates and pricing.",
  },
  "day-trip-makkah-to-jeddah-family-5-seater": {
    title: "Day trip Makkah to Jeddah family car five seater tour",
    description:
      "Reserve a family day trip from Makkah to Jeddah in a five-seater car. Simple logistics, friendly pacing, and photo stops. See availability and family tour prices.",
  },
  "day-trip-makkah-to-jeddah-luxury-van-10": {
    title: "Day trip from Makkah to Jeddah by luxury van for 10 guests",
    description:
      "Book a day trip from Makkah to Jeddah by luxury van for up to 10 guests. Smooth transport, helpful host, and clear meeting point. View available dates and prices.",
  },
  "day-trip-makkah-to-jeddah-minibus-15": {
    title: "Day trip from Makkah to Jeddah by minibus for group 1of 5 guests",
    description:
      "Reserve a day trip from Makkah to Jeddah by minibus for up to 15 guests. Group-friendly seating, simple pickup, and relaxed stops. Check availability and prices today.",
  },
};

export async function generateMetadata({ params }) {
  const { name } = params;

  return {
    title: tourMetadatas[name]?.title,
    description: tourMetadatas[name]?.description,
    alternates: getAlternates(`/tour/${name}`),
  };
}

// Optimized server-side data fetching function
async function getTourData(slug, forceRefresh = false) {
  try {
    // Only fetch the specific tour by slug
    const tourBySlugData = await getTourBySlugServer(slug, forceRefresh);

    if (!tourBySlugData || !tourBySlugData.tour) {
      return null;
    }

    return {
      tourData: tourBySlugData.tour,
      allTours: [], // We'll fetch this lazily in the component if needed
      tourIds: tourBySlugData.tourIds,
    };
  } catch (error) {
    console.error("Error fetching tour data:", error);
    return null;
  }
}

export default async function Tour({ params, searchParams }) {
  try {
    const awaitedParams = await params;
    const awaitedSearchParams = await searchParams;
    const { name: slug } = awaitedParams;
    const forceRefresh = awaitedSearchParams?.refresh === "true";

    if (!slug) {
      notFound();
    }

    // Fetch tour data optimized for performance
    const data = await getTourData(slug, forceRefresh);

    // Handle not found case - middleware will catch invalid slugs
    if (!data || !data.tourData) {
      notFound();
    }

    const { tourData, allTours, tourIds } = data;
    const fullUrl = getFullUrl(slug);

    return (
      <Wrapper>
        <TourSingle
          params={awaitedParams}
          tourData={tourData}
          allTours={allTours}
          tourIds={tourIds}
          fullUrl={fullUrl}
        >
          <TourHeading params={awaitedParams} tourData={tourData} />
        </TourSingle>
      </Wrapper>
    );
  } catch (error) {
    // Check if it's a NEXT_REDIRECT error and re-throw it
    if (error.digest?.includes("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("Unexpected error rendering tour page:", error);
    notFound();
  }
}
