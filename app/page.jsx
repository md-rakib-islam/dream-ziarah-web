import dynamic from "next/dynamic";
import Wrapper from "@/components/layout/Wrapper";
import { getAlternates } from "@/utils/canonical";

const MainHome = dynamic(() => import("@/components/home/MainHome"));

export const metadata = {
  title: "Ziyarat Tours in Makkah & Madinah with Umrah and Hajj Packages",
  description:
    "Guided Ziyarat with English-speaking hosts, hotel pickup, and flexible timing. Browse Umrah and Hajj packages, see live availability and prices, and reserve securely.",
  alternates: getAlternates('/'),
};

// Cache for 5 minutes to improve performance
export const revalidate = 300;

export default function Home() {
  return (
    <Wrapper>
      <MainHome />
    </Wrapper>
  );
}
