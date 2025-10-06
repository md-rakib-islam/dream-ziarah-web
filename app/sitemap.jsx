import {
  // GET_CMS_BLOGS,
  GET_ALL_TOUR,
  GET_MENUS_ALL_NESTED,
} from "@/constant/constants";

const BASE_URL = "https://dreamziarah.com";

export default async function Sitemap() {
  try {
    // Perform all fetch requests in parallel
    const [
      toursRes,
      //  blogRes,
      desRes,
    ] = await Promise.all([
      fetch(`${GET_ALL_TOUR}`),
      // fetch(`${GET_CMS_BLOGS}`),
      fetch(`${GET_MENUS_ALL_NESTED}`),
    ]);

    // Check if all fetch requests were successful
    if (!toursRes.ok || !desRes.ok) {
      throw new Error(
        `Failed to fetch data: ${toursRes.status} ${toursRes.statusText}, ${desRes.status} ${desRes.statusText}`
      );
    }

    const [toursData, destinationData] = await Promise.all([
      toursRes.json(),
      // blogRes.json(),
      desRes.json(),
    ]);

    // Validate the fetched data
    if (!Array.isArray(toursData)) {
      throw new TypeError("Tours data is not an array");
    }
    // if (!Array.isArray(blogsData.blogs)) {
    //   throw new TypeError("Blogs data is not an array");
    // }
    if (!Array.isArray(destinationData?.menus)) {
      throw new TypeError("Destination data is not an array");
    }

    // // Generate sitemap URLs
    // const blogsXml = blogsData.blogs.map((item) => ({
    //   url: `${BASE_URL}/blog-details/${encodeURIComponent(item.title)}`,
    //   lastModified: new Date(item.updated_at).toISOString(),
    //
    //
    // }));

    // Generate tour URLs based on published tours
    const toursXml = toursData
      .filter((tour) => tour.published === true) // Only published tours
      .map((tour) => {
        const locationType = tour.location_type?.toLowerCase() || "";
        const tourName = tour.name?.toLowerCase() || "";

        // Check if it's a Hajj or Umrah tour
        if (locationType.includes("hajj") || tourName.includes("hajj")) {
          return {
            url: `${BASE_URL}/hajj`,
            lastModified: new Date(tour.updated_at || Date.now()).toISOString(),
          };
        }

        if (locationType.includes("umrah") || tourName.includes("umrah")) {
          return {
            url: `${BASE_URL}/umrah`,
            lastModified: new Date(tour.updated_at || Date.now()).toISOString(),
          };
        }

        // For all other tours (Ziyarat tours), use tour/slug format
        return {
          url: `${BASE_URL}/tour/${encodeURIComponent(tour.slug)}`,
          lastModified: new Date(tour.updated_at || Date.now()).toISOString(),
        };
      });

    const destinationsXml = destinationData.menus
      .filter((item) => item.name === "Destinations")
      .flatMap((item) =>
        item.children
          .filter((child) => child.name !== "United States")
          .map((child) => ({
            url: `${BASE_URL}/destinations/${encodeURIComponent(
              child.name.toLowerCase()
            )}`,
            lastModified: new Date().toISOString(),
          }))
      );

    const mainUrl = [
      {
        url: `${BASE_URL}`,
        lastModified: new Date().toISOString(), // Use current date for homepage
      },
    ];

    const otherXml = [
      {
        url: `${BASE_URL}/tour`,
        lastModified: new Date().toISOString(),
      },
      {
        url: `${BASE_URL}/about`,
        lastModified: new Date().toISOString(),
      },
      {
        url: `${BASE_URL}/contact`,
        lastModified: new Date().toISOString(),
      },

      {
        url: `${BASE_URL}/privacy-policy`,
        lastModified: new Date().toISOString(),
      },
      {
        url: `${BASE_URL}/terms-and-conditions`,
        lastModified: new Date().toISOString(),
      },
    ];

    const combinedXml = [
      ...mainUrl,
      ...toursXml,
      // ...blogsXml,
      ...destinationsXml,
      ...otherXml,
    ];

    // Remove duplicate URLs (e.g., multiple Hajj or Umrah tours generating same URL)
    const uniqueXml = combinedXml.filter(
      (item, index, array) =>
        index === array.findIndex((t) => t.url === item.url)
    );

    return uniqueXml;
  } catch (error) {
    throw error;
  }
}
