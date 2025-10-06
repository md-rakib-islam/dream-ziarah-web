import Block1 from "@/components/about/Block1";
import dynamic from "next/dynamic";
import Brand from "@/components/brand/Brand";
import Counter from "@/components/counter/Counter";
import Counter2 from "@/components/counter/Counter2";
import { getAlternates } from "@/utils/canonical";

const WhyChoose = dynamic(() => import("@/components/home/home-3/WhyChoose"));
const Testimonial = dynamic(() =>
  import("@/components/Testimonial/Testimonials")
);

export const metadata = {
  title: "About Dream Ziarah | Your Trusted Partner in Spiritual Journeys",
  description:
    "Learn about Dream Ziarah, your premier guide for Ziyarat, Umrah, and Hajj in Saudi Arabia. Discover our passion for facilitating unforgettable spiritual journeys and how we ensure a deeply enriching pilgrimage experience.",
  alternates: getAlternates('/about'),
};

const About = () => {
  return (
    <>
      {/* End Page Title */}
      <div className="header-margin"></div>
      {/* header top margin */}
      <section className="layout-pt-md">
        <div className="container">
          <div className="row y-gap-30 justify-between items-center">
            <Block1 />
          </div>
        </div>
      </section>
      {/* End about block section */}
      <section className="pt-60">
        <div className="container">
          <div className="border-bottom-light pb-40">
            <div className="row y-gap-30 justify-center text-center">
              <Counter />
            </div>
          </div>
        </div>
      </section>
      {/* End counter Section */}
      <section className="section-bg layout-pt-lg layout-pb-lg">
        <div className="section-bg__item -mx-20 bg-light-2" />
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">
                  Overheard from travelers
                </h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  These popular destinations have a lot to offer
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="overflow-hidden pt-80 js-section-slider">
            <div className="item_gap-x30">
              <Testimonial />
            </div>
          </div>
          {/* End .overflow-hidden */}

          <div className="row y-gap-30 items-center pt-40 sm:pt-20">
            <div className="col-xl-4">
              <Counter2 />
            </div>
            {/* End .col */}

            <div className="col-xl-8">
              <div className="row y-gap-30 justify-between items-center">
                <Brand />
              </div>
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End testimonial section */}
      <section className="layout-pt-lg layout-pb-md">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Why Book With Us</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  Experience Quality and Excellence with DreamZiarah
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row y-gap-40 justify-between pt-50">
            <WhyChoose />
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Why Choose Us section */}
      <section
        style={{ backgroundColor: "#EAFBF7" }}
        className="layout-pt-md layout-pb-md"
      >
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Free cancellation</h2>
                <p
                  style={{ color: "black" }}
                  className="mt-5 sm:mt-4 bannar_mobile"
                >
                  You'll receive a full refund if you cancel at least 24 <br />{" "}
                  hours in advance of most experiences.
                </p>
                <p
                  style={{ color: "black" }}
                  className="mt-5 sm:mt-4 bannar_desktop"
                >
                  You'll receive a full refund if you cancel at least 24 hours
                  in advance of most experiences.
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Call To Actions Section */}
      {/* <DefaultFooter /> */}
      {/* End Call To Actions Section */}
    </>
  );
};

// export default dynamic(() => Promise.resolve(About), { ssr: false });
export default About;
