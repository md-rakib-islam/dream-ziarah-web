"use client";
import Image from "next/image";
import MainFilterSearchBox from "../hero/hero-3/MainFilterSearchBox";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const CoverSkeleton = () => {
  const { tabs, currentTab } = useSelector((state) => state.hero) || {};
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    setIsClientSide(true);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // localStorage.clear();
  return (
    <>
      <section
        className="masthead__bg -type-2 z-2 d-sm-none skeleton"
        // style={{ backgroundColor: "#3bf6aeff" }}
      >
        <div className="row m-0">
          <div className="col-12 p-0">
            <div
              className={`masthead__tabs  
                header-masterhead controls-head  is-sticky
              `}
            >
              <div className="tabs -bookmark-2 js-tabs w-100">
                <div
                  className="tabs__controls d-flex items-center js-tabs-controls"
                  style={{
                    backgroundColor: "#015a29ff",
                    justifyContent: "space-between",
                  }}
                >
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      className={`tabs__button px-30 py-15 sm:px-15 sm:py-15 rounded-4 fw-600 text-white js-tabs-button ${
                        tab?.name === currentTab ? "is-tab-el-active" : ""
                      }`}
                      onClick={() => {
                        scrollToTop();
                        dispatch(addCurrentTab(tab?.name));
                      }}
                    >
                      {/* <i className={`${tab.icon} text-20 mr-10 sm:mr-5`}></i> */}
                      {tab?.name}
                    </button>
                  ))}
                </div>
              </div>
              {/* End tabs */}
            </div>
            {/* End .masthead__tabs */}

            <div className="w-100">
              <div
                className="row justify-center m-0"
                style={{
                  backgroundImage:
                    "url(https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/e8c9ea82-4d87-4e1a-5458-9a7348e14400/public)",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  opacity: 0.89,
                  height: "120px",
                  width: "100%",
                  backgroundPosition: "center",
                  backgroundAttachment: "local",
                }}
              >
                <div className="col-xl-9 d-lg-flex flex-column justify-content-center align-items-center mt-10">
                  <div className="text-center">
                    <h1
                      className="text-20 lg:text-20 md:text-14  text-white"
                      // data-aos="fade-up"
                      style={{
                        textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                      }}
                    >
                      Book Your Ziyarat <br />
                      in Makkah and Umrah tour Packages
                    </h1>
                    <p
                      className="text-white text-10 mt-5"
                      // data-aos="fade-up"
                      data-aos-delay="100"
                      style={{
                        textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                      }}
                    >
                      Find Makkah ziyarat tour and umrah packages with guided
                      ziyarat tours in Saudi Arabia.
                    </p>
                  </div>
                  {/* End hero title */}
                </div>
              </div>
            </div>
          </div>

          {/* End .masthead__content */}
        </div>
        {/* End .container */}
      </section>

      {/* Desktop View - Hidden on mobile (< 576px) */}
      <section className="masthead -type-6 mb-40 d-none d-sm-block skeleton">
        <div className="masthead__bg ">
          <Image
            src="https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/e8c9ea82-4d87-4e1a-5458-9a7348e14400/public"
            width={1920}
            height={600}
            alt="image"
            priority={true}
            onLoad={() => onDataAvailable(true)}
          />
        </div>

        <div
          className="container"
          style={{ position: "relative", top: "70px" }}
        >
          <div className="row justify-center">
            <div className="col-xl-9 d-lg-flex flex-column justify-content-center align-items-center">
              <div className="text-center">
                <h1
                  className="text-45 lg:text-40 md:text-30 text-white"
                  // data-aos="fade-up"
                  style={{
                    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                  }}
                >
                  Book Your Ziyarat <br />
                  in Makkah and Umrah tour Packages
                </h1>
                <p
                  className="text-white mt-5"
                  // data-aos="fade-up"
                  data-aos-delay="100"
                  style={{
                    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                  }}
                >
                  Find Makkah ziyarat tour and umrah packages with guided
                  ziyarat tours in Saudi Arabia. Visit Haram Sharif and the
                  Prophet’s Mosque with English guides. Get cheap hajj deals and
                  ziyarat places in Makkah list now, spots fill fast!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div
            className="mainSearch-wrap bg-white shadow-1"
            // data-aos="fade-up"
            data-aos-delay="200"
          >
            <MainFilterSearchBox />
            {/* End tab-filter */}
          </div>
        </div>
      </section>
    </>
  );
};

export default CoverSkeleton;
