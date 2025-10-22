import HomeLoading from "@/components/home/HomeLoading";

/**
 * Root loading UI (shown during page transitions and initial load)
 * This prevents the footer from showing before content
 */
export default function Loading() {
  return <HomeLoading />;
}