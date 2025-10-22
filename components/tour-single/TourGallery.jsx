"use client";

import Overview from "@/components/tour-single/Overview";
import TourSnapShot from "@/components/tour-single/TourSnapShot";
import Image from "next/image";
import useWindowSize from "@/hooks/useWindowSize";
import "../../styles/weather.scss";
import { useState, useEffect, useRef } from "react";
import OverviewSkeleton from "../skeleton/OverviewSkeleton";
import Slider from "react-slick";
import SidebarRight2 from "./SidebarRight2";
import Itinerary from "./itinerary/index";
import ImportantInfo from "@/components/tour-single/ImportantInfo";

export default function TourGallery({ tour, onDataAvailable, isUmrahPage }) {
  const [dataAvailable, setDataAvailable] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showScrollMenus, setShowScrollMenus] = useState(false);
  const [activeTab, setActiveTab] = useState("tour-snapshot");
  const [showMobileBottomButton, setShowMobileBottomButton] = useState(true);

  const width = useWindowSize();
  const isMobile = width < 768;

  // Refs for scrolling to sections
  const tourSnapshotRef = useRef(null);
  const overviewRef = useRef(null);
  const sidebarRef = useRef(null);
  const importantInfoRef = useRef(null);
  const itineraryRef = useRef(null);
  const scrollMenuRef = useRef(null);
  const sidebarMobileRef = useRef(null);

  // Handle touch events for mobile lightbox
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
  };

  // Get images from tour_images or fallback to cloudflare_thumbnail_image_url
  const getImageArray = () => {
    if (tour?.tour_images && tour.tour_images.length > 0) {
      return tour.tour_images;
    } else if (tour?.cloudflare_thumbnail_image_url) {
      return [tour.cloudflare_thumbnail_image_url];
    }
    return [];
  };

  const tourImages = getImageArray();

  // Ensure we always have at least 4 images for desktop grid and 3 for mobile
  const ensureMinimumImages = (images) => {
    if (!images || !Array.isArray(images) || images.length === 0) {
      // If no images, use placeholder
      return [
        "/placeholder.svg",
        "/placeholder.svg",
        "/placeholder.svg",
        "/placeholder.svg",
      ];
    }
    // If we have fewer than 4 images, repeat the existing ones to fill the grid
    const result = [...images];
    while (result.length < 4) {
      // Add images from the beginning until we have at least 4
      result.push(
        ...images.slice(0, Math.min(4 - result.length, images.length))
      );
    }
    return result;
  };

  // Get the normalized array of images
  const normalizedImages = ensureMinimumImages(tourImages);

  // Function to chunk array into groups of 3 for mobile
  const createMobileImageGroups = (images) => {
    // Ensure we have at least 3 images for the first slide
    if (!images || images.length < 3) {
      const paddedImages = [...(images || [])];
      while (paddedImages.length < 3) {
        paddedImages.push(
          paddedImages[paddedImages.length % paddedImages.length] ||
            "/placeholder.svg"
        );
      }
      return [paddedImages];
    }
    // Create groups of 3 images
    const chunks = [];
    for (let i = 0; i < images.length; i += 3) {
      const chunk = images.slice(i, i + 3);
      // If chunk has fewer than 3 images, pad it
      while (chunk.length < 3) {
        chunk.push(chunk[chunk.length % chunk.length] || "/placeholder.svg");
      }
      chunks.push(chunk);
    }
    return chunks;
  };

  // Create image groups for mobile slider (3 images per slide)
  const mobileImageGroups = createMobileImageGroups(normalizedImages);

  // Slider settings for mobile
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <MobileArrow type="next" />, // Changed from Arrow to MobileArrow
    prevArrow: <MobileArrow type="prev" />, // Changed from Arrow to MobileArrow
  };

  // Custom arrow component for slider
  function Arrow(props) {
    let className =
      props.type === "next"
        ? "section-slider-nav -next flex-center button -blue-1 shadow-1 size-40 rounded-full sm:d-none"
        : "section-slider-nav -prev flex-center button -blue-1 shadow-1 size-40 rounded-full sm:d-none ";
    className += " arrow";
    const char =
      props.type === "next" ? (
        <>
          <i className="icon icon-chevron-right text-12 text-light"></i>
        </>
      ) : (
        <>
          <span className="icon icon-chevron-left text-12 text-light"></span>
        </>
      );
    return (
      <button className={className} onClick={props.onClick}>
        {char}
      </button>
    );
  }

  // Custom arrow component for mobile slider
  function MobileArrow(props) {
    let className =
      props.type === "next"
        ? "mobile-slider-nav -next"
        : "mobile-slider-nav -prev";

    const arrowStyle = {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 2,
      width: "40px",
      height: "40px",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      border: "none",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
      transition: "all 0.2s ease",
      ...(props.type === "next" ? { right: "15px" } : { left: "15px" }),
    };

    const char =
      props.type === "next" ? (
        <i className="icon icon-chevron-right text-16 text-dark-1"></i>
      ) : (
        <i className="icon icon-chevron-left text-16 text-dark-1"></i>
      );

    return (
      <button
        className={className}
        onClick={props.onClick}
        style={arrowStyle}
        onTouchStart={(e) => {
          e.target.style.backgroundColor = "rgba(255, 255, 255, 1)";
          e.target.style.transform = "translateY(-50%) scale(0.95)";
        }}
        onTouchEnd={(e) => {
          e.target.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
          e.target.style.transform = "translateY(-50%) scale(1)";
        }}
      >
        {char}
      </button>
    );
  }

  // Handle scroll to show/hide menus
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;

      // Show menus after scrolling 300px
      setShowScrollMenus(scrollY > 20);

      if (isMobile) {
        let hideButton = false;

        // Handle mobile bottom button visibility based on sidebar position
        if (sidebarMobileRef.current) {
          const sidebarRect = sidebarMobileRef.current.getBoundingClientRect();
          if (sidebarRect.top <= windowHeight && sidebarRect.bottom >= 0) {
            hideButton = true; // sidebar in viewport, hide button
          }
        }

        // Hide button when reaching bottom of page (footer)
        if (scrollY + windowHeight >= fullHeight - 50) {
          hideButton = true;
        }

        setShowMobileBottomButton(!hideButton);
      }
    };

    // Run once on mount to set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // Scroll to section function
  const scrollToSection = (ref, tabName) => {
    if (ref && ref.current) {
      const offsetTop =
        ref.current.offsetTop - (isMobile ? (showScrollMenus ? 50 : 20) : 140); // Account for fixed menu height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setActiveTab(tabName);
    }
  };

  // Scroll to sidebar (Check Availability)
  const scrollToAvailability = () => {
    scrollToSection(sidebarRef, "calendar");
  };

  // Handle image click and data loading
  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    // Trigger data available callback when image is clicked
    if (onDataAvailable) {
      onDataAvailable(true);
      setDataAvailable(true);
    }
  };

  // Handle image load
  const handleImageLoad = (e) => {
    if (e) {
      setDataAvailable(true);
      if (onDataAvailable) {
        onDataAvailable(true);
      }
    }
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Navigate lightbox
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (tourImages?.length || 1));
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + (tourImages?.length || 1)) % (tourImages?.length || 1)
    );
  };

  // Check if there's only one image
  const hasSingleImage = tourImages?.length === 1;

  return (
    <>
      {/* Desktop Scroll Menus */}
      {!isMobile && (
        <div
          ref={scrollMenuRef}
          className={`fixed-scroll-menus ${
            showScrollMenus ? "menu-visible" : "menu-hidden"
          }`}
          style={{
            transform: showScrollMenus ? "translateY(0)" : "translateY(-100%)",
            opacity: showScrollMenus ? 1 : 0,
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            backdropFilter: "blur(10px)",

            boxShadow: showScrollMenus
              ? "0 4px 20px rgba(0, 0, 0, 0.15)"
              : "0 0px 0px rgba(0, 0, 0, 0)",
          }}
        >
          {/* First Menu - Tour Name & Check Availability */}
          <div
            className="tour-header-menu"
            style={{
              transform: showScrollMenus
                ? "translateY(0)"
                : "translateY(-20px)",
              opacity: showScrollMenus ? 1 : 0,
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s", // 0.1s delay
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: "600",
                color: "white",
              }}
            >
              {tour?.name || "Tour Details"}
            </h2>
            <button
              onClick={scrollToAvailability}
              className="menuCheckAvailabilityButton"
              style={{
                border: "none",
                borderRadius: "12px",
                padding: "10px 20px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                transform: "translateY(0)",
              }}
              // onMouseEnter={(e) => {
              //   e.target.style.transform = "translateY(-2px) scale(1.02)";
              //   e.target.style.boxShadow = "0 6px 20px rgba(59, 130, 246, 0.4)";
              // }}
              // onMouseLeave={(e) => {
              //   e.target.style.transform = "translateY(0) scale(1)";
              //   e.target.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.3)";
              // }}
            >
              Check Availability
            </button>
          </div>

          {/* Second Menu - Tab Navigation */}
          <div
            className="tab-navigation-menu"
            style={{
              transform: showScrollMenus
                ? "translateY(0)"
                : "translateY(-20px)",
              opacity: showScrollMenus ? 1 : 0,
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.2s", // 0.2s delay
            }}
          >
            <div className="tab-navigation-inner">
              <button
                onClick={() =>
                  scrollToSection(tourSnapshotRef, "tour-snapshot")
                }
                style={{
                  padding: "15px 0",
                  border: "none",
                  background: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: activeTab === "tour-snapshot" ? "#3b82f6" : "#666",
                  borderBottom:
                    activeTab === "tour-snapshot"
                      ? "3px solid #3b82f6"
                      : "3px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  whiteSpace: "nowrap",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== "tour-snapshot") {
                    e.target.style.color = "#3b82f6";
                    e.target.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== "tour-snapshot") {
                    e.target.style.color = "#666";
                    e.target.style.transform = "translateY(0)";
                  }
                }}
              >
                Tour Snapshot
              </button>
              <button
                onClick={() => scrollToSection(overviewRef, "overview")}
                style={{
                  padding: "15px 0",
                  border: "none",
                  background: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: activeTab === "overview" ? "#3b82f6" : "#666",
                  borderBottom:
                    activeTab === "overview"
                      ? "3px solid #3b82f6"
                      : "3px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  whiteSpace: "nowrap",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== "overview") {
                    e.target.style.color = "#3b82f6";
                    e.target.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== "overview") {
                    e.target.style.color = "#666";
                    e.target.style.transform = "translateY(0)";
                  }
                }}
              >
                Overview
              </button>
              <button
                onClick={() => scrollToSection(sidebarRef, "calendar")}
                style={{
                  padding: "15px 0",
                  border: "none",
                  background: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: activeTab === "calendar" ? "#3b82f6" : "#666",
                  borderBottom:
                    activeTab === "calendar"
                      ? "3px solid #3b82f6"
                      : "3px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  whiteSpace: "nowrap",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== "calendar") {
                    e.target.style.color = "#3b82f6";
                    e.target.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== "calendar") {
                    e.target.style.color = "#666";
                    e.target.style.transform = "translateY(0)";
                  }
                }}
              >
                Calendar
              </button>
              <button
                onClick={() =>
                  scrollToSection(importantInfoRef, "important-info")
                }
                style={{
                  padding: "15px 0",
                  border: "none",
                  background: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: activeTab === "important-info" ? "#3b82f6" : "#666",
                  borderBottom:
                    activeTab === "important-info"
                      ? "3px solid #3b82f6"
                      : "3px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  whiteSpace: "nowrap",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== "important-info") {
                    e.target.style.color = "#3b82f6";
                    e.target.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== "important-info") {
                    e.target.style.color = "#666";
                    e.target.style.transform = "translateY(0)";
                  }
                }}
              >
                Important Info
              </button>
              {tour?.itineraries_list?.length > 0 && (
                <button
                  onClick={() => scrollToSection(itineraryRef, "itinerary")}
                  style={{
                    padding: "15px 0",
                    border: "none",
                    background: "none",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: activeTab === "itinerary" ? "#3b82f6" : "#666",
                    borderBottom:
                      activeTab === "itinerary"
                        ? "2px solid #3b82f6"
                        : "2px solid transparent",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    whiteSpace: "nowrap",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== "itinerary") {
                      e.target.style.color = "#3b82f6";
                      e.target.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== "itinerary") {
                      e.target.style.color = "#666";
                      e.target.style.transform = "translateY(0)";
                    }
                  }}
                >
                  Itinerary
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Mobile Top Menu (appears after scrolling) */}
      {isMobile && (
        <div
          className="mobile-top-menu"
          style={{
            transform: showScrollMenus ? "translateY(0)" : "translateY(-100%)",
            opacity: showScrollMenus ? 1 : 0,
            visibility: showScrollMenus ? "visible" : "hidden",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "14px",
              fontWeight: "600",
              textAlign: "center",
              lineHeight: "1.3",
              color: "white",
              transform: showScrollMenus
                ? "translateY(0)"
                : "translateY(-10px)",
              opacity: showScrollMenus ? 1 : 0,
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s", // 0.1s delay
            }}
          >
            {tour?.name || "Tour Details"}
          </h2>
        </div>
      )}
      {/* Mobile Bottom Menu (conditionally visible) */}
      {isMobile && (
        <div
          className="mobile-bottom-menu"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            backgroundColor: "white",
            padding: "15px 20px",
            boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
            borderTop: "1px solid #f0f0f0",
            transform: showMobileBottomButton
              ? "translateY(0)"
              : "translateY(100%)",
            opacity: showMobileBottomButton ? 1 : 0,
            visibility: showMobileBottomButton ? "visible" : "hidden",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <button
            onClick={scrollToAvailability}
            className="bg-yellow-4"
            style={{
              lineHeight: "1",
              width: "100%",
              color: "black",
              padding: "15px",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: showMobileBottomButton
                ? "translateY(0) scale(1)"
                : "translateY(10px) scale(0.95)",
              opacity: showMobileBottomButton ? 1 : 0,
            }}
            onTouchStart={(e) => {
              e.target.style.transform = "translateY(-2px) scale(1.02)";
            }}
            onTouchEnd={(e) => {
              e.target.style.transform = showMobileBottomButton
                ? "translateY(0) scale(1)"
                : "translateY(10px) scale(0.95)";
            }}
            onMouseEnter={(e) => {
              if (showMobileBottomButton) {
                e.target.style.transform = "translateY(-2px) scale(1.02)";
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = showMobileBottomButton
                ? "translateY(0) scale(1)"
                : "translateY(10px) scale(0.95)";
            }}
          >
            Check Availability
          </button>
        </div>
      )}
      <section className="pt-5 pt-sm-0 js-pin-container">
        <div className="container">
          {/* Full Width Gallery Section */}
          <div className="row">
            <div className="col-12">
              {/* Desktop View - Hidden on mobile (< 768px) */}
              <div className="d-none d-sm-block">
                <div className="gallery-grid">
                  <div
                    className={`gallery-grid-container ${
                      hasSingleImage ? "single-image-grid" : ""
                    }`}
                  >
                    {/* First large image (left) */}
                    <div
                      className="gallery-item gallery-item-large-left"
                      onClick={() => handleImageClick(0)}
                    >
                      <Image
                        src={normalizedImages[0] || "/placeholder.svg"}
                        alt={`${tour?.name || "Tour"} - Image 1`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover rounded-4"
                        priority={true}
                        onLoad={handleImageLoad}
                      />
                    </div>
                    {/* Center large image */}
                    <div
                      className="gallery-item gallery-item-large-center"
                      onClick={() => handleImageClick(1)}
                    >
                      <Image
                        src={normalizedImages[1] || "/placeholder.svg"}
                        alt={`${tour?.name || "Tour"} - Image 2`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover rounded-4"
                        priority={true}
                        onLoad={handleImageLoad}
                      />
                    </div>
                    {/* Top right image */}
                    <div
                      className="gallery-item gallery-item-small-top-right"
                      onClick={() => handleImageClick(2)}
                    >
                      <Image
                        src={normalizedImages[2] || "/placeholder.svg"}
                        alt={`${tour?.name || "Tour"} - Image 3`}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover rounded-4"
                        onLoad={handleImageLoad}
                      />
                    </div>
                    {/* Bottom right image */}
                    <div
                      className="gallery-item gallery-item-small-bottom-right"
                      onClick={() => handleImageClick(3)}
                    >
                      <Image
                        src={normalizedImages[3] || "/placeholder.svg"}
                        alt={`${tour?.name || "Tour"} - Image 4`}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover rounded-4"
                        onLoad={handleImageLoad}
                      />
                      {tourImages?.length > 4 && (
                        <div className="more-photos-overlay rounded-4">
                          <span>+{tourImages.length - 4}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile View - Hidden on desktop (>= 576px) */}
              <div className="d-sm-none">
                <div className="mobile-slider-container">
                  <div className="mobile-slider-wrapper">
                    <Slider {...sliderSettings}>
                      {normalizedImages.map((image, index) => (
                        <div key={index} className="mobile-slide-wrapper">
                          <div
                            className="mobile-slide-single"
                            onClick={() => handleImageClick(index)}
                          >
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`${tour?.name || "Tour"} - Image ${
                                index + 1
                              }`}
                              fill
                              onLoad={handleImageLoad}
                              priority={index === 0}
                            />
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section Below Gallery */}
          <div className="row y-gap-30 mt-xl-40 mt-0">
            {/* Sidebar on Right */}
            <div className="col-xl-4 order-xl-2" ref={sidebarRef}>
              <SidebarRight2
                refFunction={sidebarMobileRef}
                tour={tour}
                umrah={isUmrahPage}
              />
            </div>

            {/* Main Content on Left */}
            <div className="col-xl-8 order-xl-1">
              <div ref={tourSnapshotRef}>
                <h2 className="text-22 fw-600">Tour snapshot</h2>
                <TourSnapShot tour={tour} />
              </div>
              {/* End toursnapshot */}

              <div className="border-top-light mt-40 mb-40"></div>

              <div ref={overviewRef}>
                {dataAvailable ? (
                  <Overview tour={tour} />
                ) : (
                  <OverviewSkeleton />
                )}
              </div>
              {/* End Overview */}
            </div>
          </div>
        </div>
        {/* End container */}
      </section>
      {dataAvailable && (
        <>
          <section className="pt-40" ref={importantInfoRef}>
            <div className="container">
              <div className="pt-40 border-top-light">
                <div className="row x-gap-40 y-gap-40">
                  <div className="col-auto">
                    <h2 className="text-22 fw-600">Important information</h2>
                  </div>
                </div>
                <ImportantInfo tour={tour} />
              </div>
            </div>
          </section>

          {tour?.itineraries_list?.length > 0 && (
            <section
              className="border-top-light  mt-40 pt-40"
              ref={itineraryRef}
            >
              <div className="container">
                <h2 className="text-22 fw-600 mb-20">Itinerary</h2>
                <Itinerary
                  name={tour?.name}
                  itenarayItems={tour?.itineraries_list}
                />
              </div>
            </section>
          )}
        </>
      )}
      {/* Add bottom padding for mobile to account for fixed bottom menu */}
      {isMobile && showMobileBottomButton && <div style={{ height: "80px" }} />}

      {/* Fullscreen Lightbox */}
      {lightboxOpen && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: isMobile ? "60px 20px" : "40px", // More top/bottom padding on mobile
          }}
        >
          <div
            className="lightbox-container"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              height: isMobile ? "60vh" : "100%", // Limit height on mobile
              maxWidth: isMobile ? "100%" : "90vw",
              maxHeight: isMobile ? "60vh" : "90vh", // Consistent mobile height limit
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: isMobile ? "12px" : "0", // Rounded corners on mobile
              overflow: "hidden",
              backgroundColor: isMobile ? "rgba(0, 0, 0, 0.8)" : "transparent", // Subtle background on mobile
            }}
          >
            {/* Close button */}
            <button
              className="lightbox-close"
              onClick={closeLightbox}
              style={{
                position: "absolute",
                top: isMobile ? "-50px" : "20px", // Move outside container on mobile
                right: isMobile ? "10px" : "20px",
                zIndex: 10001,
                width: isMobile ? "40px" : "50px",
                height: isMobile ? "40px" : "50px",
                borderRadius: "50%",
                border: "none",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                color: "#000",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isMobile ? "16px" : "20px",
                fontWeight: "bold",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 1)";
                e.target.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
                e.target.style.transform = "scale(1)";
              }}
            >
              <i className="icon icon-close text-20"></i>
            </button>

            {/* Previous button */}
            {tourImages?.length > 1 && (
              <button
                className="lightbox-prev"
                onClick={prevImage}
                style={{
                  position: "absolute",
                  left: isMobile ? "-50px" : "20px", // Move outside container on mobile
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 10001,
                  width: isMobile ? "40px" : "50px",
                  height: isMobile ? "40px" : "50px",
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  color: "#000",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: isMobile ? "16px" : "20px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 1)";
                  e.target.style.transform = "translateY(-50%) scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
                  e.target.style.transform = "translateY(-50%) scale(1)";
                }}
              >
                <i className="icon icon-chevron-left text-20"></i>
              </button>
            )}

            {/* Next button */}
            {tourImages?.length > 1 && (
              <button
                className="lightbox-next"
                onClick={nextImage}
                style={{
                  position: "absolute",
                  right: isMobile ? "-50px" : "20px", // Move outside container on mobile
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 10001,
                  width: isMobile ? "40px" : "50px",
                  height: isMobile ? "40px" : "50px",
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  color: "#000",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: isMobile ? "16px" : "20px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 1)";
                  e.target.style.transform = "translateY(-50%) scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
                  e.target.style.transform = "translateY(-50%) scale(1)";
                }}
              >
                <i className="icon icon-chevron-right text-20"></i>
              </button>
            )}

            {/* Image container */}
            <div
              className="lightbox-image-container"
              style={{
                position: "relative",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <Image
                src={tourImages?.[currentImageIndex] || "/placeholder.svg"}
                alt={`${tour?.name || "Tour"} - Image ${currentImageIndex + 1}`}
                width={800}
                height={800}
                className="object-contain"
              />
            </div>

            {/* Image counter for mobile */}
            {isMobile && tourImages?.length > 1 && (
              <div
                style={{
                  position: "absolute",
                  bottom: "20px", // Keep inside container
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  color: "#000",
                  padding: "6px 12px",
                  borderRadius: "16px",
                  fontSize: "12px",
                  fontWeight: "500",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
                }}
              >
                {currentImageIndex + 1} / {tourImages.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
