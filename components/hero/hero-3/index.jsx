"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import MainFilterSearchBox from "./MainFilterSearchBox";
import CoverSkeleton from "@/components/skeleton/CoverSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentTab } from "@/features/hero/findPlaceSlice";

const index = ({
  onDataAvailable,
  isSuccess,
  isLoading,
  data,
  onMobileDataAvailable,
  initialTabsData = [],
}) => {
  // Use server-side tabs data if provided, otherwise fallback to Redux
  const reduxTabs = useSelector((state) => state.hero?.tabs);
  const tabs = initialTabsData.length > 0 ? initialTabsData : reduxTabs;
  const { currentTab } = useSelector((state) => state.hero) || {};
  const dispatch = useDispatch();
  const [navbar, setNavbar] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (isSuccess) {
      onMobileDataAvailable(true);
    }
  }, [isSuccess, onMobileDataAvailable]);

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  let sliderImageItems = [];
  if (isSuccess) {
    sliderImageItems = data?.homepage_sliders?.map((item) => ({
      ...item,
      image: `${item.image}`,
    }));
  }

  // Desktop slider images (fixed from public folder)
  const desktopSliderImages = [
    { src: "/img/slider/sl1.webp", alt: "slide-0" },
    { src: "/img/slider/sl2.webp", alt: "slide-1" },
    { src: "/img/slider/sl3.webp", alt: "slide-2" },
    // { src: "/img/slider/sl4.webp", alt: "slide-3" },
    // { src: "/img/slider/sl5.webp", alt: "slide-4" },
  ];

  // Auto-play slider (for desktop view)
  useEffect(() => {
    if (desktopSliderImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % desktopSliderImages.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, []);

  return isLoading ? (
    <CoverSkeleton />
  ) : (
    <>
      {/* Mobile View - Hidden on desktop (>= 576px) */}
      <section className="masthead__bg -type-2 z-2 d-sm-none">
        <div className="row m-0">
          <div className="col-12 p-0">
            <div
              className={`masthead__tabs  ${
                navbar ? "header-masterhead controls-head  is-sticky" : ""
              }`}
              style={{ paddingRight: 0, marginRight: 0 }}
            >
              <div
                className="tabs -bookmark-2 js-tabs w-100"
                style={{ paddingRight: 0, marginRight: 0 }}
              >
                <div
                  className="tabs__controls d-flex items-center justify-center js-tabs-controls"
                  style={{
                    backgroundColor: "#015a29ff",
                    paddingRight: 0,
                    marginRight: 0,
                  }}
                >
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      className={`tab__button px-30 py-15 sm:px-15 sm:py-15 rounded-4 fw-600 text-white js-tabs-button ${
                        tab?.name === currentTab ? "is-tab-el-active" : ""
                      }`}
                      style={{
                        backgroundColor:
                          tab?.name === currentTab
                            ? "rgba(255, 255, 255, 0.2)"
                            : "transparent",
                      }}
                      onClick={() => {
                        scrollToTop();
                        dispatch(addCurrentTab(tab?.name));
                      }}
                    >
                      {tab?.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-100">
              <div
                className=" justify-center m-0"
                style={{
                  position: "relative",
                  height: "120px",
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={
                    currentTab == "Makkah"
                      ? "/img/slider/sl1.webp"
                      : currentTab == "Madina"
                      ? "/img/slider/sl3.webp"
                      : currentTab == "Jeddah"
                      ? "/img/slider/sl4.webp"
                      : "/img/slider/sl5.webp"
                  }
                  fill
                  alt={`${currentTab} Ziyarat`}
                  priority
                  sizes="100vw"
                  quality={75}
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    opacity: 0.89,
                  }}
                />
                {/* <div className="col-xl-9 d-lg-flex flex-column justify-content-center align-items-center mt-10">
                  <div className="text-center">
                    <h1
                      className="text-20 lg:text-20 md:text-14  text-white"
                      style={{
                        textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                      }}
                    >
                      Book Your Ziyarat <br />
                      in Makkah and Umrah tour Packages
                    </h1>
                    <p
                      className="text-white text-10 mt-5"
                      data-aos-delay="100"
                      style={{
                        textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                      }}
                    >
                      Find Makkah ziyarat tour and umrah packages with guided
                      ziyarat tours in Saudi Arabia.
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop View - Hidden on mobile (< 576px) */}
      <section className="masthead -type-6 mb-40 d-none d-sm-block">
        {/* Slider Container */}
        <div className="masthead__bg">
          {/* Slider Images */}
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            {desktopSliderImages.map((item, index) => (
              <div
                key={index}
                style={{
                  position: index === 0 ? "relative" : "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: currentSlide === index ? 1 : 0,
                  transition: "opacity 1s ease-in-out",
                  zIndex: currentSlide === index ? 1 : 0,
                }}
              >
                <Image
                  src={item.src}
                  width={1920}
                  height={600}
                  alt={item.alt}
                  priority={index === 0}
                  onLoad={() => index === 0 && onDataAvailable(true)}
                  quality={75}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}

            {/* Dark Overlay */}
            {/* <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(2, 6, 20, 0.3)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      /> */}
          </div>
        </div>

        {/* Keep container for spacing but remove text */}
        <div
          className="container"
          style={{ position: "relative", top: "70px" }}
        >
          <div className="row justify-center">
            <div className="col-xl-9 d-lg-flex flex-column justify-content-center align-items-center">
              {/* Empty div to maintain spacing - adjust height as needed */}
              <div style={{ height: "200px" }} />
            </div>
          </div>
        </div>

        {/* Search Box */}
        <div className="container">
          <div
            className="mainSearch-wrap bg-white shadow-1"
            data-aos-delay="200"
          >
            <MainFilterSearchBox />
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
