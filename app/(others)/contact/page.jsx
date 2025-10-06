import Address from "@/components/block/Address";
import ContactForm from "@/components/common/ContactForm";
import Social from "@/components/common/social/Social";
import { getAlternates } from "@/utils/canonical";

export const metadata = {
  title: "Contact Dream Ziarah | Get in Touch for Your Spiritual Journey",
  description:
    "Ready to plan your spiritual journey? Contact Dream Ziarah today. Whether you're interested in Ziyarat, Umrah, or Hajj packages, our team is here to provide guidance and support every step of the way.",
  alternates: getAlternates('/contact'),
};

const Contact = () => {
  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      {/* End location top bar section */}

      <div className="map-outer">
        <div className="map-canvas">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1882868.0430391028!2d38.62291738575171!3d22.82184846549868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4d4909afc35ab625%3A0xa40e2eb57095cae9!2sDream%20Ziarah!5e0!3m2!1sen!2sbd!4v1759732167798!5m2!1sen!2sbd"
            loading="eager"
          ></iframe>
        </div>
      </div>
      {/* End map section */}

      <section className="relative container">
        <div className="row justify-end">
          <div className="col-xl-5 col-lg-7">
            <div className="map-form px-40 pt-40 pb-50 lg:px-30 lg:py-30 md:px-24 md:py-24 bg-white rounded-4 shadow-4">
              <div className="text-22 fw-600">Send a message</div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      {/* End contact section form */}

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row x-gap-80 y-gap-20 justify-between">
            <div className="col-12">
              <div className="text-30 sm:text-24 fw-600">Contact Us</div>
            </div>
            {/* End .col */}

            <Address saudi={true} />
            {/* End address com */}

            <div className="col-auto">
              <div className="text-14 text-light-1">
                Follow us on social media
              </div>
              <div className="d-flex x-gap-20 items-center mt-10">
                <Social />
              </div>
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
      </section>
      {/* End Address Section */}

      <section
        style={{ backgroundColor: "#EAFBF7" }}
        className="layout-pt-md layout-pb-md"
      >
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Free cancellation</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  You'll receive a full refund if you cancel at least 24 <br />{" "}
                  hours in advance of most experiences.
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>

      {/* End Why Choose Us section */}

      {/* End Call To Actions Section */}

      {/* End Call To Actions Section */}
    </>
  );
};

// export default dynamic(() => Promise.resolve(Contact), { ssr: false });
export default Contact;
