import MainHome from "@/components/home/MainHome";
import { getAlternates } from "@/utils/canonical";
import { getSliderImages, getHeroTabs } from "@/lib/serverApi";

export const metadata = {
  title: "Ziyarat Tours in Makkah & Madinah with Umrah and Hajj Packages",
  description:
    "Guided Ziyarat with English-speaking hosts, hotel pickup, and flexible timing. Browse Umrah and Hajj packages, see live availability and prices, and reserve securely.",
  alternates: getAlternates('/'),
  openGraph: {
    title: "Ziyarat Tours in Makkah & Madinah with Umrah and Hajj Packages",
    description: "Guided Ziyarat with English-speaking hosts, hotel pickup, and flexible timing. Browse Umrah and Hajj packages, see live availability and prices, and reserve securely.",
    url: 'https://dreamziarah.com',
    siteName: 'Dream Ziarah',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ziyarat Tours in Makkah & Madinah",
    description: "Guided Ziyarat with English-speaking hosts, hotel pickup, and flexible timing.",
  },
};

// Revalidate every 5 minutes (ISR)
export const revalidate = 300;

/**
 * Homepage - Server Component with Server-Side Rendering
 * Fetches data on the server for better performance and SEO
 */
export default async function Home() {
  // Fetch data on server
  const [sliderResult, tabsResult] = await Promise.all([
    getSliderImages(),
    getHeroTabs(),
  ]);

  // Pass server data to client component
  return (
    <MainHome
      initialSliderData={sliderResult.data}
      initialTabsData={tabsResult.data}
    />
  );
}
