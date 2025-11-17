// components/TourOverview.jsx
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getLowestPriceByLocationType } from "@/services/tourService";

const TourOverview = ({
  onScrollToMakkah,
  onScrollToMadina,
  onScrollToJeddah,
  onScrollToTaif,
}) => {
  const [lowestPrices, setLowestPrices] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch lowest prices on component mount
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setIsLoading(true);
        const prices = await getLowestPriceByLocationType();
        setLowestPrices(prices);
      } catch (error) {
        console.error("Error fetching prices:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrices();
  }, []);

  // Helper function to get location_type from title
  const getLocationTypeFromTitle = (title) => {
    const titleLower = title.toLowerCase();

    if (titleLower.includes("madina")) return "Ziyarat In Madina";
    if (titleLower.includes("makkah")) return "Ziyarat In Makkah";
    if (titleLower.includes("jeddah")) return "Ziyarat In Jeddah";
    if (titleLower.includes("taif")) return "Ziyarat In Taif";
    if (titleLower.includes("bodor")) return "Ziyarat In Makkah"; // Adjust as needed

    return null;
  };

  // Helper function to format price badge
  const getPriceBadge = (title) => {
    const locationType = getLocationTypeFromTitle(title);

    if (!locationType || !lowestPrices[locationType]) {
      return "Deals Available"; // Fallback text
    }

    const price = lowestPrices[locationType].price;
    return `Deals from $${Math.round(price)}`;
  };

  // Helper function to add dimensions to image URL
  const getImageWithDimensions = (url, width, height) => {
    return `${url}?w=${width}&h=${height}&q=75`;
  };

  const toursData = [
    // Slide 1
    [
      {
        id: 1,
        title: "Madina Ziyarat",
        description:
          "Visit the sacred sites of Madina and experience spiritual enlightenment.",
        buttonText: "SEARCH NOW",
        imageUrl:
          "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/c1efcbd4-ebea-4b1a-c025-2f440de7db00/v1",
        imageDimensions: { width: 605, height: 300 },
        onClick: onScrollToMadina,
      },
      {
        id: 2,
        title: "Bodor Ziyarat",
        description:
          "Explore the historic battlefield of Bodor and connect with Islamic history.",
        buttonText: "BOOK NOW",
        imageUrl:
          "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/2f347b1e-e351-42e1-b6ce-5b62054ffc00/v1",
        imageDimensions: { width: 605, height: 200 },
        onClick: onScrollToMakkah,
      },
      {
        id: 3,
        title: "Makkah Ziyarat",
        description:
          "Reserve the Makkah ziyarat tour at Haram Sharif. Choose packages",
        buttonText: "FIND A DEAL",
        imageUrl:
          "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/50a080e1-2c74-4b90-0794-acc1c6287600/public",
        imageDimensions: { width: 605, height: 605 },
        onClick: onScrollToMakkah,
      },
    ],
    // Slide 2
    [
      {
        id: 4,
        title: "Jeddah Ziyarat",
        description:
          "Discover the coastal beauty and historical landmarks of Jeddah.",
        buttonText: "DISCOVER NOW",
        imageUrl:
          "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/6fa1f60e-045e-4c91-d61e-255726666300/v1",
        imageDimensions: { width: 605, height: 300 },
        onClick: onScrollToJeddah,
      },
      {
        id: 5,
        title: "Taif Ziyarat",
        description:
          "Experience the cool climate and beautiful gardens of Taif.",
        buttonText: "EXPLORE NOW",
        imageUrl:
          "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/b58c3bdc-fa72-4eaf-eb56-28ed346a3a00/v1",
        imageDimensions: { width: 605, height: 200 },
        onClick: onScrollToTaif,
      },
      {
        id: 6,
        title: "Makkah Ziyarat",
        description:
          "Reserve the Makkah ziyarat tour at Haram Sharif. Choose packages",
        buttonText: "LEARN MORE",
        imageUrl:
          "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/50a080e1-2c74-4b90-0794-acc1c6287600/public",
        imageDimensions: { width: 605, height: 605 },
        onClick: onScrollToMakkah,
      },
    ],
    //slide 3
    [
      {
        id: 7,
        title: "Madina Ziyarat",
        description:
          "Visit the sacred sites of Madina and experience spiritual enlightenment.",
        buttonText: "SEARCH NOW",
        imageUrl:
          "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/c3d597b0-594e-43d9-3a94-ef90fa3bed00/v1",
        imageDimensions: { width: 605, height: 300 },
        onClick: onScrollToMadina,
      },
      {
        id: 8,
        title: "Taif Ziyarat",
        description:
          "Experience the cool climate and beautiful gardens of Taif.",
        buttonText: "EXPLORE NOW",
        imageUrl:
          "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/b58c3bdc-fa72-4eaf-eb56-28ed346a3a00/v1",
        imageDimensions: { width: 605, height: 200 },
        onClick: onScrollToTaif,
      },
      {
        id: 9,
        title: "Makkah Ziyarat",
        description:
          "Reserve the Makkah ziyarat tour at Haram Sharif. Choose packages",
        buttonText: "FIND A DEAL",
        imageUrl:
          "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/50a080e1-2c74-4b90-0794-acc1c6287600/public",
        imageDimensions: { width: 605, height: 605 },
        onClick: onScrollToMakkah,
      },
    ],
  ];

  // Flatten tours for mobile view
  const allTours = toursData.flat();

  const desktopSliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    pauseOnHover: true,
  };

  const mobileSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    pauseOnHover: true,
  };

  const handleButtonClick = (e, onClick) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  return (
    <section className="layout-pt-md layout-pb-md tour-overview-section">
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
        {/* Desktop Slider */}
        <div className="desktop-slider">
          <Slider {...desktopSliderSettings}>
            {toursData.map((tours, slideIndex) => (
              <div key={slideIndex}>
                <div className="row g-3 y-gap-40 pt-40 sm:pt-20">
                  {/* Left Column - Two smaller cards */}
                  <div className="col-lg-6">
                    <div className="row g-3">
                      {/* Top Left Card */}
                      <div className="col-12">
                        <div className="tour-card">
                          <div
                            className="tour-card-bg tour-card-bg-top"
                            style={{
                              backgroundImage: `url(${getImageWithDimensions(
                                tours[0].imageUrl,
                                tours[0].imageDimensions.width,
                                tours[0].imageDimensions.height
                              )})`,
                            }}
                          >
                            {/* Content Section */}
                            <div className="tour-card-content">
                              {/* Badge Section - Dynamic Price */}
                              <div className="tour-card-badge">
                                {isLoading
                                  ? "Loading..."
                                  : getPriceBadge(tours[0].title)}
                              </div>

                              <h3 className="tour-title">{tours[0].title}</h3>
                              <p className="tour-description">
                                {tours[0].description}
                              </p>
                              <a
                                href="#"
                                className="tour-link"
                                onClick={(e) =>
                                  handleButtonClick(e, tours[0].onClick)
                                }
                              >
                                {tours[0].buttonText}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Left Card */}
                      <div className="col-12">
                        <div className="tour-card tour-card-bottomleft">
                          <div
                            className="tour-card-bg"
                            style={{
                              backgroundImage: `url(${getImageWithDimensions(
                                tours[1].imageUrl,
                                tours[1].imageDimensions.width,
                                tours[1].imageDimensions.height
                              )})`,
                            }}
                          >
                            {/* Content Section */}
                            <div className="tour-card-content">
                              {/* Badge Section - Dynamic Price */}
                              <div className="tour-card-badge">
                                {isLoading
                                  ? "Loading..."
                                  : getPriceBadge(tours[1].title)}
                              </div>

                              <h3 className="tour-title">{tours[1].title}</h3>
                              <p className="tour-description">
                                {tours[1].description}
                              </p>
                              <a
                                href="#"
                                className="tour-link"
                                onClick={(e) =>
                                  handleButtonClick(e, tours[1].onClick)
                                }
                              >
                                {tours[1].buttonText}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - One bigger card */}
                  <div className="col-lg-6">
                    <div className="tour-card tour-card-large">
                      <div
                        className="tour-card-bg tour-card-bg-large"
                        style={{
                          backgroundImage: `url(${getImageWithDimensions(
                            tours[2].imageUrl,
                            tours[2].imageDimensions.width,
                            tours[2].imageDimensions.height
                          )})`,
                        }}
                      >
                        {/* Content Section */}
                        <div className="tour-card-content">
                          {/* Badge Section - Dynamic Price */}
                          <div className="tour-card-badge">
                            {isLoading
                              ? "Loading..."
                              : getPriceBadge(tours[2].title)}
                          </div>

                          <h3 className="tour-title">{tours[2].title}</h3>
                          <p className="tour-description">
                            {tours[2].description}
                          </p>
                          <a
                            href="#"
                            className="tour-link"
                            onClick={(e) =>
                              handleButtonClick(e, tours[2].onClick)
                            }
                          >
                            {tours[2].buttonText}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Mobile Slider */}
        <div className="mobile-slider">
          <Slider {...mobileSliderSettings}>
            {allTours.map((tour) => (
              <div key={tour.id}>
                <div className="tour-card tour-card-mobile">
                  <div
                    className="tour-card-bg"
                    style={{
                      backgroundImage: `url(${getImageWithDimensions(
                        tour.imageUrl,
                        800,
                        600
                      )})`,
                    }}
                  >
                    {/* Content Section */}
                    <div className="tour-card-content">
                      {/* Badge Section - Dynamic Price */}
                      <div className="tour-card-badge">
                        {isLoading ? "Loading..." : getPriceBadge(tour.title)}
                      </div>

                      <h3 className="tour-title">{tour.title}</h3>
                      <p className="tour-description">{tour.description}</p>
                      <a
                        href="#"
                        className="tour-link"
                        onClick={(e) => handleButtonClick(e, tour.onClick)}
                      >
                        {tour.buttonText}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <style jsx>{`
        /* ... keep all your existing styles ... */
        .tour-overview-section {
          display: block;
        }

        .desktop-slider {
          display: block;
        }
        .mobile-slider {
          display: none;
        }

        .tour-card {
          border-radius: 12px;
          overflow: hidden;
          height: 300px;
          position: relative;
        }
        .tour-card-bottomleft {
          border-radius: 12px;
          overflow: hidden;
          height: 200px;
          position: relative;
        }
        .tour-card-large {
          height: 520px;
        }
        .tour-card-bg {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 20px;
        }
        .tour-card-bg-top {
          justify-content: flex-start;
          padding-top: 30px;
        }
        .tour-card-bg-large {
          justify-content: flex-start;
          padding-top: 30px;
        }
        .tour-card-content {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 70%;
          margin: 0;
          padding: 10px 16px 12px;
          font-size: 14px;
          line-height: 1.4;
          color: #262626;
          font-weight: 600;
          gap: 0;
          background-color: #ffffff;
          border-radius: 0 16px;
        }
        .tour-card-badge {
          position: absolute;
          top: -18px;
          right: 16px;
          width: fit-content;
          padding: 8px 24px;
          background-color: #ffd410;
          font-size: 12px;
          font-weight: 900;
          line-height: 1;
          letter-spacing: 0.2px;
          border-radius: 0 16px;
          z-index: 3;
        }
        .tour-title {
          font-size: 20px;
          font-weight: 700;
          color: #000;
          line-height: 1.3;
          margin-bottom: 4px;
          margin-top: 0;
        }
        .tour-description {
          font-size: 13px;
          color: #333;
          line-height: 1.4;
          margin-bottom: 8px;
        }
        .tour-link {
          text-decoration: none;
          font-size: 13px;
          color: #ff4500;
          font-weight: 700;
          text-transform: uppercase;
          display: inline-block;
          transition: opacity 0.3s ease;
          cursor: pointer;
        }
        .tour-link:hover {
          opacity: 0.8;
        }

        /* Slider Custom Styles */
        :global(.slick-dots) {
          bottom: -40px;
        }
        :global(.slick-dots li button:before) {
          font-size: 12px;
          color: #ffd410;
        }
        :global(.slick-dots li.slick-active button:before) {
          color: #ffd410;
        }
        :global(.slick-prev),
        :global(.slick-next) {
          width: 40px;
          height: 40px;
          z-index: 1;
        }
        :global(.slick-prev) {
          left: -50px;
        }
        :global(.slick-next) {
          right: -50px;
        }
        :global(.slick-prev:before),
        :global(.slick-next:before) {
          font-size: 40px;
          color: #ffd410;
        }

        @media (max-width: 991px) {
          .tour-card-large {
            height: 350px;
          }
          .tour-card-bg-large {
            justify-content: flex-end;
            padding-top: 20px;
          }
          .tour-card-content {
            width: 80%;
          }
          :global(.slick-prev) {
            left: 10px;
          }
          :global(.slick-next) {
            right: 10px;
          }
        }

        @media (max-width: 768px) {
          .tour-overview-section {
            display: none;
          }

          .desktop-slider {
            display: none;
          }
          .mobile-slider {
            display: block;
          }

          .tour-card,
          .tour-card-mobile {
            height: 350px !important;
            width: 100%;
          }
          .tour-card-content {
            width: 85%;
          }
          .tour-title {
            font-size: 18px;
          }
          .tour-description {
            font-size: 12px;
          }
          .tour-link {
            font-size: 12px;
          }
          .tour-card-bg {
            padding: 15px;
          }
          .tour-card-content {
            padding: 10px 14px 12px;
          }
          .tour-card-badge {
            right: 12px;
            top: -16px;
            padding: 6px 20px;
            font-size: 11px;
          }
          :global(.slick-prev),
          :global(.slick-next) {
            width: 30px;
            height: 30px;
          }
          :global(.slick-prev) {
            left: 10px;
          }
          :global(.slick-next) {
            right: 10px;
          }
          :global(.slick-prev:before),
          :global(.slick-next:before) {
            font-size: 30px;
          }
        }
      `}</style>
    </section>
  );
};

export default TourOverview;
