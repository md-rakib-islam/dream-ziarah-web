// components/TourOverview.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TourOverview = ({
  onScrollToMakkah,
  onScrollToMadina,
  onScrollToJeddah,
  onScrollToTaif,
}) => {
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
        badge: "Deals from £99pp",
        buttonText: "SEARCH NOW",
        imageUrl:
          "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/b0259502-4ed2-48fb-c2e7-79481e657900/public",
        imageDimensions: { width: 605, height: 300 }, // Top Left Card
        onClick: onScrollToMadina,
      },
      {
        id: 2,
        title: "Bodor Ziyarat",
        description:
          "Explore the historic battlefield of Bodor and connect with Islamic history.",
        badge: "Deals from £439pp",
        buttonText: "BOOK NOW",
        imageUrl:
          "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/668cbe9a-6df0-452c-76e8-1abc71a2b500/v1",
        imageDimensions: { width: 605, height: 200 }, // Bottom Left Card
        onClick: onScrollToMakkah,
      },
      {
        id: 3,
        title: "Makkah Ziyarat",
        description:
          "Reserve the Makkah ziyarat tour at Haram Sharif. Choose packages",
        badge: "Deals from £169pp",
        buttonText: "FIND A DEAL",
        imageUrl:
          "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/b0259502-4ed2-48fb-c2e7-79481e657900/public",
        imageDimensions: { width: 605, height: 605 }, // Right Column
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
        badge: "Deals from £299pp",
        buttonText: "DISCOVER NOW",
        imageUrl:
          "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/668cbe9a-6df0-452c-76e8-1abc71a2b500/v1",
        imageDimensions: { width: 605, height: 300 }, // Top Left Card
        onClick: onScrollToJeddah,
      },
      {
        id: 5,
        title: "Taif Ziyarat",
        description:
          "Experience the cool climate and beautiful gardens of Taif.",
        badge: "Deals from £199pp",
        buttonText: "EXPLORE NOW",
        imageUrl:
          "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/b0259502-4ed2-48fb-c2e7-79481e657900/public",
        imageDimensions: { width: 605, height: 200 }, // Bottom Left Card
        onClick: onScrollToTaif,
      },
      {
        id: 6,
        title: "Makkah Ziyarat",
        description:
          "Reserve the Makkah ziyarat tour at Haram Sharif. Choose packages",
        badge: "Deals from £349pp",
        buttonText: "LEARN MORE",
        imageUrl:
          "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/b0259502-4ed2-48fb-c2e7-79481e657900/public",
        imageDimensions: { width: 605, height: 605 }, // Right Column
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
        {/* Desktop Slider */}
        <div className="desktop-slider">
          <Slider {...desktopSliderSettings}>
            {toursData.map((tours, slideIndex) => (
              <div key={slideIndex}>
                <div className="row g-3">
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
                              {/* Badge Section - Overlapping */}
                              <div className="tour-card-badge">
                                {tours[0].badge}
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
                              {/* Badge Section - Overlapping */}
                              <div className="tour-card-badge">
                                {tours[1].badge}
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
                          {/* Badge Section - Overlapping */}
                          <div className="tour-card-badge">
                            {tours[2].badge}
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
            {allTours.map((tour, index) => (
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
                      {/* Badge Section - Overlapping */}
                      <div className="tour-card-badge">{tour.badge}</div>

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
