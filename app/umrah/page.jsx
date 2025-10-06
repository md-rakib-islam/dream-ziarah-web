import Wrapper from "@/components/layout/Wrapper";
import TourHeading from "@/components/tour-single/TourHeading";
import TourSingle from "@/components/tour-single/TourSingle";
import { getAllToursServer } from "@/services/tourService";
import { getAlternates } from "@/utils/canonical";

export const metadata = {
  title: "Affordable Umrah packages with guided Ziyarat tours",
  description:
    "Book affordable Umrah packages with guided Ziyarat in Makkah and Madinah. Flexible dates, hotel options, airport pickup, and friendly support. See prices and availability.",
  alternates: getAlternates('/umrah'),
};

// Server-side data fetching function
async function getTourData() {
  try {
    // Fetch all tours
    const allTours = await getAllToursServer();

    if (!allTours || allTours.length === 0) {
      return null;
    }

    // Filter only Umrah tours
    const umrahTours = allTours.filter(
      (tour) => tour.location_type === "Umrah"
    );

    if (umrahTours.length === 0) {
      return null;
    }

    // Create a representative tour object for the Umrah page
    // Use the first Umrah tour as the base but modify it for the overview page
    const umrahPageTour = {
      ...umrahTours[0], // Use first Umrah tour as base
    };

    return {
      allTours,
      umrahTours,
      umrahPageTour,
    };
  } catch (error) {
    console.error("Error fetching Umrah tours:", error);
    return null;
  }
}

export default async function UmrahPage() {
  // Fetch Umrah tours data
  const data = await getTourData();

  if (!data || !data.umrahTours) {
    return (
      <Wrapper>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-center">
            No Umrah packages available at the moment
          </h1>
        </div>
      </Wrapper>
    );
  }

  const { allTours, umrahTours, umrahPageTour } = data;

  // console.log("Successfully fetched tours:", {
  //   totalTours: allTours.length,
  //   umrahToursCount: umrahTours.length,
  // });

  return (
    <Wrapper>
      <TourSingle
        allTours={allTours}
        tourData={umrahPageTour} // Pass the representative Umrah tour
        umrahTours={umrahTours} // Pass all Umrah tours as additional prop
        isUmrahPage={true} // Flag to indicate this is Umrah overview page
      >
        <TourHeading
          tourData={umrahPageTour}
          umrahTours={umrahTours}
          isUmrahPage={true}
        />
      </TourSingle>
    </Wrapper>
  );
}
