"use client";
import useWindowSize from "@/hooks/useWindowSize";
import dynamic from "next/dynamic";
import { useState, useCallback, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { useFaqDescription } from "@/hooks/useFaqDescription";
import FrequentlyQ from "../faq/FrequentlyQ";

// Critical above-the-fold components (no lazy loading)
import Hero3 from "@/components/hero/hero-3";
// import ServicesOverview from "@/components/services/ServicesOverview";
const TourOverview = dynamic(
  () => import("../services/TourOverview"),
  {
    loading: () => (
      <div className="loading-skeleton">Loading overview...</div>
    ),
    ssr: false, // optional — add only if the component uses browser APIs
  }
);

// Lazy load below-the-fold components for better performance
// const TopDestinations = dynamic(
//   () => import("@/components/destinations/TopDestinations"),
//   {
//     loading: () => (
//       <div className="loading-skeleton">Loading destinations...</div>
//     ),
//   }
// );
const WhyChoose = dynamic(() => import("@/components/home/home-3/WhyChoose"));
const Tours = dynamic(() => import("@/components/tours/Tours"), {
  loading: () => <div className="loading-skeleton">Loading tours...</div>,
});
const ToursForMobile = dynamic(() =>
  import("@/components/tours/ToursForMobile")
);
// const ToursHajjUmrah = dynamic(() =>
//   import("@/components/tours/ToursHajjUmrah")
// );
// const ToursHajjUmrahForMobile = dynamic(() =>
//   import("@/components/tours/ToursHajjUmrahForMobile")
// );
const TestimonialSection = dynamic(() =>
  import("@/components/Testimonial/TestimonialSection")
);

const MainHome = ({ initialSliderData = [], initialTabsData = [] }) => {
  // Use server-side data directly - no client-side fetching on initial render
  const isSuccess = initialSliderData && initialSliderData.length > 0;
  const isLoading = false; // Data already loaded on server
  const data = initialSliderData;

  const { data: faqDescription } = useFaqDescription();

  const [, setDataAvailable] = useState(false);
  const [mobileDataAvailable, setMobileDataAvailable] = useState(false);
  const [mobileTourDataAvailable, setMobileTourDataAvailable] = useState(false);

  const width = useWindowSize();
  const isMobile = useMemo(() => width > 768, [width]);

  const { currentTab } = useSelector((state) => state.hero) || {};

  // Create refs for each section
  const makkahRef = useRef(null);
  const madinaRef = useRef(null);
  const jeddahRef = useRef(null);
  const taifRef = useRef(null);

  // Scroll handler function
  // Scroll handler function with offset for header
  const scrollToSection = useCallback((sectionRef) => {
    if (sectionRef && sectionRef.current) {
      const headerOffset = 110; // Increase this value to scroll higher above the h2
      const elementPosition = sectionRef.current.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  // Memoize callback functions to prevent re-renders
  const handleDataAvailability = useCallback((isDataAvailable) => {
    setDataAvailable(isDataAvailable);
  }, []);

  const handleMobileDataAvailability = useCallback((isMobileDataAvailable) => {
    setMobileDataAvailable(isMobileDataAvailable);
  }, []);

  const handleMobileTourDataAvailability = useCallback(
    (isMobileTourDataAvailable) => {
      setMobileTourDataAvailable(isMobileTourDataAvailable);
    },
    []
  );

  return (
    <>
      {/* <Hero7/> */}
      <div className="header-margin"></div>
      <Hero3
        onDataAvailable={handleDataAvailability}
        onMobileDataAvailability={handleMobileDataAvailability}
        isSuccess={isSuccess}
        isLoading={isLoading}
        data={data}
        initialTabsData={initialTabsData}
      />
      {/* End Hero 3 */}

      {/* Services Overview Section */}
      {/* <ServicesOverview /> */}
      <TourOverview
        onScrollToMakkah={() => scrollToSection(makkahRef)}
        onScrollToMadina={() => scrollToSection(madinaRef)}
        onScrollToJeddah={() => scrollToSection(jeddahRef)}
        onScrollToTaif={() => scrollToSection(taifRef)}
      />
      {/* End Services Overview */}

      {/* Hajj/Umrah Section for Mobile */}
      {!isMobile && mobileDataAvailable ? (
        <>
          <section className="layout-pt-md layout-pb-md islamic-pattern-bg">
            <div className="container">
              <div className="row justify-center text-center">
                <div className="col-12">
                  <div className="sectionTitle -md d-flex justify-content-between">
                    <h2 className="sectionTitle__title md:text-24">
                      {currentTab === "Hajj"
                        ? "Book Affordable Makkah Ziyarat Package and Hajj Deals"
                        : `Book ${currentTab} Ziyarat Places List Tour`}
                    </h2>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-12 mb-5" style={{ marginTop: "-6px" }}>
                  <p className="sectionTitle__text  sm:mt-0 md:text-13">
                    {currentTab === "Hajj"
                      ? "Get Makkah ziyarat package and luxury umrah packages in Saudi Arabia."
                      : `Explore Sacred Ziyarat Places in ${currentTab}`}
                  </p>
                </div>
                {/* End .col */}
              </div>

              {/* End .row */}

              <div className="row y-gap-40 mb-5">
                {currentTab === "Makkah" ? (
                  <ToursForMobile
                    searchLocation={currentTab}
                    onMobileTourDataAvailable={handleMobileTourDataAvailability}
                  />
                ) : (
                  <ToursForMobile
                    searchLocation={currentTab}
                    onMobileTourDataAvailable={handleMobileTourDataAvailability}
                  />
                )}
              </div>
              {/* End .row */}
            </div>
            {/* End .container */}
          </section>

          {/* Show Makkah section only if current tab is NOT Makkah */}
          {currentTab !== "Makkah" && mobileTourDataAvailable && (
            <section className="layout-pt-md layout-pb-md kaaba-pattern-bg">
              <div className="container">
                <div className="row justify-center text-center">
                  <div className="col-12">
                    <div className="sectionTitle -md ">
                      <h2 className="sectionTitle__title md:text-24">
                        Book Makkah Ziyarat Places List Tour
                      </h2>
                      <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                        Reserve the Makkah ziyarat tour at Haram Sharif. Choose
                        packages with or without guides for the list of ziyarat
                        places in Makkah. Secure your sacred journey spot now!
                      </p>
                    </div>
                  </div>
                  {/* End .col */}
                  {/* End .col */}
                </div>

                {/* End .row */}

                <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
                  <Tours filterLocation="Makkah" />
                </div>
                {/* End .row */}
              </div>
              {/* End .container */}
            </section>
          )}
          {/* End Makkah Tours Sections */}

          {/* Show Madina section only if current tab is NOT Madina */}
          {currentTab !== "Madina" && mobileTourDataAvailable && (
            <section className="layout-pt-md layout-pb-md madina-green-pattern">
              <div className="container">
                <div className="row justify-center text-center">
                  <div className="col-12">
                    <div className="sectionTitle -md">
                      <h2 className="sectionTitle__title md:text-24">
                        Book Guided Madinah Ziyarat Tour
                      </h2>
                      <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                        Plan Madinah ziyarat tour at the Prophet’s Mosque. Enjoy
                        packages with or without guides for the ziyarat places
                        in Madinah. Limited spots, book now for the holy sites
                        in Saudi Arabia!
                      </p>
                    </div>
                  </div>
                  {/* End .col */}

                  {/* End .col */}
                </div>

                {/* End .row */}

                <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
                  <Tours filterLocation="Madina" />
                </div>
                {/* End .row */}
              </div>
              {/* End .container */}
            </section>
          )}
          {/* End Madina Tours Sections */}

          {/* Show Jeddah section only if current tab is NOT Jeddah */}
          {currentTab !== "Jeddah" && mobileTourDataAvailable && (
            <section className="layout-pt-md layout-pb-md">
              <div className="container">
                <div className="row justify-center text-center">
                  <div className="col-12">
                    <div className="sectionTitle -md">
                      <h2 className="sectionTitle__title md:text-24">
                        Book Guided Ziyarat in Jeddah Holy Places
                      </h2>
                      <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                        Book a ziyarat in Jeddah's holy places from the Jeddah
                        gateway. Select packages with or without guides to
                        Masjid Al-Jinn. Reserve your spiritual pilgrimage at
                        holy sites in Saudi Arabia now!
                      </p>
                    </div>
                  </div>
                  {/* End .col */}

                  {/* <div className="col-4 col-lg-auto">
                    <Link
                      href="/tours/?location=Jedda"
                      className="button -md -blue-1 bg-blue-1-05 text-blue-1"
                    >
                      More <div className="icon-arrow-top-right ml-15" />
                    </Link>
                  </div> */}
                  {/* End .col */}
                </div>

                {/* End .row */}

                <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
                  <Tours filterLocation="Jeddah" />
                </div>
                {/* End .row */}
              </div>
              {/* End .container */}
            </section>
          )}
          {/* End Jeddah Tours Sections */}

          {/* Show Taif section only if current tab is NOT Taif */}
          {currentTab !== "Taif" && mobileTourDataAvailable && (
            <section className="layout-pt-md layout-pb-md taif-pattern-bg">
              <div className="container">
                <div className="row justify-center text-center">
                  <div className="col-12">
                    <div className="sectionTitle -md">
                      <h2 className="sectionTitle__title md:text-24">
                        Book Day Trip Taif Ziyarat Places
                      </h2>
                      <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                        Explore Taif ziyarat places on a day trip from Makkah.
                        Enjoy packages with guided transport to the Abdullah Ibn
                        Abbas Mosque. Book today for sacred journeys in holy
                        sites in Saudi Arabia!
                      </p>
                    </div>
                  </div>
                  {/* End .col */}

                  {/* <div className="col-4 col-lg-auto">
                    <Link
                      href="/tours/?location=Taif"
                      className="button -md -blue-1 bg-blue-1-05 text-blue-1"
                    >
                      More <div className="icon-arrow-top-right ml-15" />
                    </Link>
                  </div> */}
                  {/* End .col */}
                </div>

                {/* End .row */}

                <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
                  <Tours filterLocation="Taif" />
                </div>
                {/* End .row */}
              </div>
              {/* End .container */}
            </section>
          )}
          {/* End Taif Tours Sections */}

          {/* Show Why Book With Us and Top Destinations sections */}
          {mobileTourDataAvailable && (
            <>
              <section className="layout-pt-md layout-pb-md arabesque-pattern-bg">
                <div className="container">
                  <div className="row justify-center text-center">
                    <div className="col-12">
                      <div className="sectionTitle -md">
                        <h2 className="sectionTitle__title md:text-24">
                          Why Book With Us
                        </h2>
                        <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                          Experience Quality and Excellence with DreamZiarah
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* End .row */}

                  <div className="row y-gap-40 justify-between pt-50">
                    <WhyChoose />
                  </div>
                  {/* End row */}
                </div>
                {/* End .container */}
              </section>
              {/* End Why choose Section */}

              {/* <section className="layout-pt-md layout-pb-md dome-pattern-bg">
                <div className="container">
                  <div className="row justify-center text-center">
                    <div className="col-12">
                      <div className="sectionTitle -md">
                        <h2 className="sectionTitle__title md:text-24">
                          Explore Ziyarat Tours Makkah, Madinah, and Taif
                        </h2>
                        <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                          Check ziyarat in Makkah and Madinah, holy sites in
                          Saudi Arabia, like the Prophet’s Mosque. Enjoy guided
                          transport to the Jeddah gateway and the Taif ziyarat
                          places. Book your spiritual pilgrimage spot today!
                        </p>
                      </div>
                    </div>
                  </div>
 

                  <div className="row y-gap-40 pt-40 sm:pt-20">
                    <TopDestinations />
                  </div>
            
                </div>
         
              </section> */}

              <section className="layout-pt-md layout-pb-md tawaf-pattern-bg">
                <div className="container">
                  <div className="row justify-center text-center">
                    <div className="col-12">
                      <div className="sectionTitle -md">
                        <h2 className="sectionTitle__title md:text-24">
                          What Pilgrims Say About Ziyarat Places in Makkah and
                          Madinah
                        </h2>
                        <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                          We have 4.8/5 from over 200 pilgrims! "Ziyarat in
                          Makkah and Madinah was smooth with English help, love
                          the list of ziyarat places!" Book Umrah packages with
                          our holy sites in Saudi Arabia.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* End .row */}

                  <div className="row y-gap-40">
                    <TestimonialSection />
                  </div>
                  {/* End .row */}
                </div>
                {/* End .container */}
              </section>

              {/* review section */}
              <section className="layout-pt-md layout-pb-md">
                <div className="container">
                  <div className="row justify-center text-center">
                    <div className="col-12">
                      <div className="sectionTitle -md">
                        <h2 className="sectionTitle__title md:text-24">FAQ</h2>
                      </div>
                    </div>
                  </div>
                  {/* End .row */}

                  <div className="row y-gap-40">
                    <FrequentlyQ faqDescription={faqDescription} />
                  </div>
                  {/* End .row */}
                </div>
                {/* End .container */}
              </section>
            </>
          )}
          {/* End Top Destinations Section */}
        </>
      ) : null}

      {/* Regular Desktop Sections for other tabs */}
      {isMobile && (
        <>
          {/* Always show Hajj/Umrah section on desktop */}
          {/* <section className="layout-pt-md layout-pb-md islamic-pattern-bg">
            <div className="container">
              <div className="row justify-center text-center">
                <div className="col-12">
                  <div className="sectionTitle -md ">
                    <h2 className="sectionTitle__title md:text-24">
                      Book Affordable Makkah Ziyarat Package and Hajj Deals
                    </h2>
                    <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                      Get Makkah ziyarat package and luxury umrah packages in
                      Saudi Arabia. Includes flights, hotels near the Two Holy
                      Mosques, and guided ziyarat tours. Book fast to save your
                      spot for ziyarat in Makkah and Madinah!
                    </p>
                  </div>
                </div>
        
              </div>

              <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
                <ToursHajjUmrah filterLocation="HajjUmrah" />
              </div>
            </div>
          </section> */}
          {/* End Hajj/Umrah Tours Sections */}

          {/* Always show Makkah section on desktop */}
          <section
            ref={makkahRef}
            className="layout-pt-md layout-pb-md islamic-pattern-bg"
          >
            <div className="container">
              <div className="row justify-center text-center">
                <div className="col-12">
                  <div className="sectionTitle -md">
                    <h2 className="sectionTitle__title md:text-24">
                      Book Makkah Ziyarat Places List Tour
                    </h2>
                    <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                      Reserve the Makkah ziyarat tour at Haram Sharif. Choose
                      packages with or without guides for the list of ziyarat
                      places in Makkah. Secure your sacred journey spot now!
                    </p>
                  </div>
                </div>
              </div>

              <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
                <Tours filterLocation="Makkah" />
              </div>
            </div>
          </section>
          {/* End Makkah Tours Sections */}

          {/* Always show Madina section on desktop */}
          <section
            ref={madinaRef}
            className="layout-pt-md layout-pb-md madina-green-pattern"
          >
            <div className="container">
              <div className="row justify-center text-center">
                <div className="col-12">
                  <div className="sectionTitle -md">
                    <h2 className="sectionTitle__title md:text-24">
                      Book Guided Madinah Ziyarat Tour
                    </h2>
                    <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                      Plan Madinah ziyarat tour at the Prophet’s Mosque. Enjoy
                      packages with or without guides for the ziyarat places in
                      Madinah. Limited spots, book now for the holy sites in
                      Saudi Arabia!
                    </p>
                  </div>
                </div>
              </div>

              <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
                <Tours filterLocation="Madina" />
              </div>
            </div>
          </section>
          {/* End Madina Tours Sections */}

          {/* Always show Jeddah section on desktop */}
          <section ref={jeddahRef} className="layout-pt-md layout-pb-md">
            <div className="container">
              <div className="row justify-center text-center">
                <div className="col-12">
                  <div className="sectionTitle -md">
                    <h2 className="sectionTitle__title md:text-24">
                      Book Guided Ziyarat in Jeddah Holy Places
                    </h2>
                    <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                      Book a ziyarat in Jeddah's holy places from the Jeddah
                      gateway. Select packages with or without guides to Masjid
                      Al-Jinn. Reserve your spiritual pilgrimage at holy sites
                      in Saudi Arabia now!
                    </p>
                  </div>
                </div>
              </div>

              <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
                <Tours filterLocation="Jeddah" />
              </div>
            </div>
          </section>
          {/* End Jeddah Tours Sections */}

          {/* Always show Taif section on desktop */}
          <section
            ref={taifRef}
            className="layout-pt-md layout-pb-md taif-pattern-bg"
          >
            <div className="container">
              <div className="row justify-center text-center">
                <div className="col-12">
                  <div className="sectionTitle -md">
                    <h2 className="sectionTitle__title md:text-24">
                      Book Day Trip Taif Ziyarat Places
                    </h2>
                    <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                      Explore Taif ziyarat places on a day trip from Makkah.
                      Enjoy packages with guided transport to the Abdullah Ibn
                      Abbas Mosque. Book today for sacred journeys in holy sites
                      in Saudi Arabia!
                    </p>
                  </div>
                </div>
              </div>

              <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
                <Tours filterLocation="Taif" />
              </div>
            </div>
          </section>
          {/* End Taif Tours Sections */}

          {/* Always show Why Book With Us section on desktop */}
          <section className="layout-pt-md layout-pb-md arabesque-pattern-bg">
            <div className="container">
              <div className="row justify-center text-center">
                <div className="col-12">
                  <div className="sectionTitle -md">
                    <h2 className="sectionTitle__title md:text-24">
                      Your Trusted Guide for Ziyarat Tours Makkah
                    </h2>
                    <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                      Count on us for ziyarat tours, Makkah, and guided ziyarat
                      tours in Saudi Arabia. We help European pilgrims with all
                      ziyarat in Makkah and the holy sites in Saudi Arabia
                      know-how. Book easily for your trip!{" "}
                    </p>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row y-gap-40 justify-between pt-50">
                <WhyChoose />
              </div>
              {/* End row */}
            </div>
            {/* End .container */}
          </section>
          {/* End Why choose Section */}

          {/* Always show Top Destinations section on desktop */}
          {/* <section className="layout-pt-md layout-pb-md dome-pattern-bg">
            <div className="container">
              <div className="row justify-center text-center">
                <div className="col-12">
                  <div className="sectionTitle -md">
                    <h2 className="sectionTitle__title md:text-24">
                      Explore Ziyarat Tours Makkah, Madinah, and Taif
                    </h2>
                    <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                      Check ziyarat in Makkah and Madinah, holy sites in Saudi
                      Arabia, like the Prophet’s Mosque. Enjoy guided transport
                      to the Jeddah gateway and the Taif ziyarat places. Book
                      your spiritual pilgrimage spot today!
                    </p>
                  </div>
                </div>
              </div>


              <div className="row y-gap-40 pt-40 sm:pt-20">
                <TopDestinations />
              </div>

            </div>
       
          </section> */}
          {/* End Top Destinations Section */}
          {/* Review section */}
          <section className="layout-pt-md layout-pb-md tawaf-pattern-bg">
            <div className="container">
              <div className="row justify-center text-center">
                <div className="col-12">
                  <div className="sectionTitle -md">
                    <h2 className="sectionTitle__title md:text-24">
                      What Pilgrims Say About Ziyarat Places in Makkah and
                      Madinah
                    </h2>
                    <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                      We have 4.8/5 from over 200 pilgrims! "Ziyarat in Makkah
                      and Madinah was smooth with English help, love the list of
                      ziyarat places!" Book Umrah packages with our holy sites
                      in Saudi Arabia.
                    </p>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row y-gap-40 ">
                <TestimonialSection />
              </div>
              {/* End .row */}
            </div>
            {/* End .container */}
          </section>

          {/* FAQ */}
          <section className="layout-pt-md layout-pb-md">
            <div className="container">
              <div className="row justify-center text-center">
                <div className="col-12">
                  <div className="sectionTitle -md">
                    <h2 className="sectionTitle__title md:text-24">FAQ</h2>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row y-gap-40 ">
                <FrequentlyQ faqDescription={faqDescription} />
              </div>
              {/* End .row */}
            </div>
            {/* End .container */}
          </section>
        </>
      )}
    </>
  );
};

// export default dynamic(() => Promise.resolve(MainHome), { ssr: false });
export default MainHome;
