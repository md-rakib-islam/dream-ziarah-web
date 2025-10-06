import Link from "next/link";
import Banner from "@/components/destinations/components/Banner";
import IntroTown from "@/components/destinations/components/IntroTown";
import Weather from "@/components/destinations/components/Weather";
import Faq from "@/components/faq/Faq";
import Testimonial from "@/components/home/home-1/Testimonial";
import TestimonialLeftCol from "@/components/home/home-1/TestimonialLeftCol";
import Slights from "@/components/block/Slights";
import TopDestinations2 from "@/components/destinations/TopDestinations2";
import Tours from "@/components/tours/Tours";
import ToursMadina from "@/components/tours/ToursMadina";
import ToursJedda from "@/components/tours/ToursJedda";
import ToursTaif from "@/components/tours/ToursTaif";
import { slightContent } from "@/data/desinations";
import getAllMenuItem from "@/services/menuService";
import dynamic from "next/dynamic";
import { getAlternates } from "@/utils/canonical";

const destinationsMetadatas = {
  jeddah: {
    title: "Jeddah city and Ziyarat tour packages with private transport",
    description:
      "Explore Al-Balad and seaside highlights with guided Ziyarat and city tours. Private cars or vans, hotel pickup and flexible hours. See tour options and prices.",
  },
  makkah: {
    title: "Book Makkah Ziyarat tours and packages with private cars",
    description:
      "Reserve Makkah Ziyarat packages with guided visits, hotel pickup and flexible timing. Private car or minibus for families and groups. See itineraries and pricing.",
  },
  madinah: {
    title: "Book Madinah Ziyarat tours with private or group transport",
    description:
      "Plan serene Ziyarat in Madinah with guided visits, hotel pickup and flexible schedules. Family-friendly cars and vans available. Check live dates and costs.",
  },
  taif: {
    title: "Book Taif tours from Makkah with private or group vehicles",
    description:
      "Plan a Taif escape with guided Ziyarat, Al-Hada viewpoints and rose gardens in season. Hotel pickup and flexible timing. Check availability and tour prices.",
  },
};

const Destinations = ({ params }) => {
  const slug = params.slug;

  const renderToursSection = (location) => (
    <section className="layout-pb-lg">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-12">
            <div className="sectionTitle -md">
              <h2 className="sectionTitle__title">
                Popular Tours In {location}
              </h2>
              <p className=" sectionTitle__text mt-5 sm:mt-0">
                Find Your Perfect {location} Tour: Private, Shared, and More
              </p>
            </div>
          </div>
        </div>
        <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
          {location == "Makkah" && <Tours filterLocation="Makkah" />}
          {location == "Madinah" && <ToursMadina />}
          {location == "Jeddah" && <ToursJedda />}
          {location == "Taif" && <ToursTaif />}
        </div>
      </div>
    </section>
  );

  return (
    <>
      <div className="header-margin"></div>
      <section className="layout-pb-md">
        <div className="container">
          <div className="row">
            <Banner slug={slug} />
          </div>
          <div className="row y-gap-20 pt-40">
            <IntroTown slug={slug} />
          </div>
          <div className="pt-30 mt-30 border-top-light" />
          <div className="row y-gap-20">
            <div className="col-12">
              <h2 className="text-22 fw-600">
                Check{" "}
                {slug === "makkah"
                  ? "Makkah"
                  : slug === "madinah"
                  ? "Madinah"
                  : slug === "jeddah"
                  ? "Jeddah"
                  : slug === "taif"
                  ? "Taif"
                  : "Your Location"}{" "}
                Weather for Your Ziyarat Tour Weather for Your Ziyarat Tour{" "}
              </h2>
            </div>
            <Weather slug={slug} />
          </div>
          <div className="pt-30 mt-30 border-top-light" />
        </div>
      </section>
      {slug === "makkah" && renderToursSection("Makkah")}
      {slug === "madinah" && renderToursSection("Madinah")}
      {slug === "jeddah" && renderToursSection("Jeddah")}
      {slug === "taif" && renderToursSection("Taif")}

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-12">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">
                  Discover {slug.charAt(0).toUpperCase() + slug.slice(1)}{" "}
                  Ziyarat Tours and Scenic Spots
                </h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  {slightContent[slug]?.title}
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row y-gap-30 pt-40">
            <Slights slug={slug} />
          </div>
          {/* End .row */}

          <div className="row justify-center text-center">
            <div className="col-12">
              <div className="mt-20 sectionTitle -md">
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  {slightContent[slug]?.footerContent}
                </p>
              </div>
            </div>
          </div>

          <div className="row justify-center mt-40">
            <div className="col-auto">
              <Link
                href="#"
                className="button h-50 w-250 -outline-blue-1 text-blue-1"
              >
                Explore more <div className="icon-arrow-top-right ml-15" />
              </Link>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Top sights in London */}
      <section className="layout-pt-md layout-pb-lg bg-light-2">
        <div className="container">
          <div className="row y-gap-40 justify-between">
            <div className="col-xl-5 col-lg-6" data-aos="fade-up">
              <TestimonialLeftCol />
            </div>
            <div className="col-lg-6">
              <Testimonial />
            </div>
          </div>
        </div>
      </section>
      <section className="layout-pt-lg layout-pb-md">
        <div className="container">
          <div className="row y-gap-20">
            <div className="col-lg-4">
              <h2 className="text-30 fw-600">
                FAQs about{" "}
                {slug === "madinah"
                  ? "Madina"
                  : slug === "jedda"
                  ? "Jeddah"
                  : slug.charAt(0).toUpperCase() + slug.slice(1)}
              </h2>
            </div>
            <div className="col-lg-8">
              <div className="accordion -simple row y-gap-20 js-accordion">
                <Faq slug={slug} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-12">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">
                  Explore Near{" "}
                  {slug === "madinah"
                    ? "Madina"
                    : slug === "jedda"
                    ? "Jeddah"
                    : slug.charAt(0).toUpperCase() + slug.slice(1)}{" "}
                  Ziyarat Places{" "}
                </h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  These popular destinations have a lot to offer
                </p>
              </div>
            </div>
          </div>
          <div
            className="pt-5 position-relative mx-auto "
            style={{ width: "700px" }}
          >
            <TopDestinations2 slug={slug} />
          </div>
        </div>
      </section>
    </>
  );
};

export async function generateStaticParams() {
  const data = await getAllMenuItem();
  return data?.menus
    .find((item) => item.name === "Destinations")
    ?.children?.map((item) => ({ slug: item.name }));
}

export async function generateMetadata({ params }) {
  const slug = params.slug;

  return {
    title: destinationsMetadatas[slug]?.title,
    description: destinationsMetadatas[slug]?.description,
    alternates: getAlternates(`/destinations/${slug}`),
  };
}

export default dynamic(() => Promise.resolve(Destinations), { ssr: true });
