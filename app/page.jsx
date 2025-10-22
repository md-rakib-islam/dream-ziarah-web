import MainHome from "@/components/home/MainHome";
import { getAlternates } from "@/utils/canonical";

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
 * Homepage - Server Component
 * Hero3 component handles its own loading state, no need for Suspense
 */
export default function Home() {
  return <MainHome />;
}
