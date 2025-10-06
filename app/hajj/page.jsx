import Wrapper from "@/components/layout/Wrapper";
import TourHeading from "@/components/tour-single/TourHeading";
import TourSingle from "@/components/tour-single/TourSingle";
import { getAllToursServer } from "@/services/tourService";
import { getAlternates } from "@/utils/canonical";

export const metadata = {
  title: "Book Hajj packages with trusted guides and clear plans",
  description:
    "Book Hajj packages with guided tours, hotel options, and organized transport between Makkah and Madinah. Get step-by-step support. View current prices and dates.",
  alternates: getAlternates('/hajj'),
};

// Server-side data fetching function
async function getTourData() {
  try {
    // Fetch all tours
    const allTours = await getAllToursServer();

    if (!allTours || allTours.length === 0) {
      return null;
    }

    // Filter only Hajj tours
    const hajjTours = allTours.filter((tour) => tour.location_type === "Hajj");

    if (hajjTours.length === 0) {
      return null;
    }

    // Create a representative tour object for the Hajj page
    // Use the first Hajj tour as the base but modify it for the overview page
    const hajjPageTour = {
      ...hajjTours[0], // Use first Hajj tour as base
    };

    return {
      allTours,
      hajjTours,
      hajjPageTour,
    };
  } catch (error) {
    console.error("Error fetching Hajj tours:", error);
    return null;
  }
}

export default async function HajjPage() {
  // Fetch Hajj tours data
  const data = await getTourData();

  if (!data || !data.hajjTours) {
    return (
      <Wrapper>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-center">
            No Hajj packages available at the moment
          </h1>
        </div>
      </Wrapper>
    );
  }

  const { allTours, hajjTours, hajjPageTour } = data;

  // console.log("Successfully fetched tours:", {
  //   totalTours: allTours.length,
  //   hajjToursCount: hajjTours.length,
  // });

  return (
    <Wrapper>
      <TourSingle
        allTours={allTours}
        tourData={hajjPageTour} // Pass the representative Hajj tour
        hajjTours={hajjTours} // Pass all Hajj tours as additional prop
        isHajjPage={true} // Flag to indicate this is Hajj overview page
      >
        <TourHeading
          tourData={hajjPageTour}
          hajjTours={hajjTours}
          isHajjPage={true}
        />
      </TourSingle>
    </Wrapper>
  );
}
