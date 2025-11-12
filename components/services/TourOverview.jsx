// components/TourOverview.jsx
import React from "react";

const TourOverview = () => {
  const tours = [
    {
      id: 1,
      title: "City breaks",
      description:
        "From café corners to skyline views, your spontaneous late escape is calling.",
      badge: "Deals from £99pp",
      buttonText: "SEARCH NOW",
      imageUrl:
        "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/b0259502-4ed2-48fb-c2e7-79481e657900/public",
    },
    {
      id: 2,
      title: "Lone haul",
      description:
        "Some places are worth the distance – like Mexico's beaches and Dubai's glow.",
      badge: "Deals from £439pp",
      buttonText: "BOOK NOW",
      imageUrl:
        "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/668cbe9a-6df0-452c-76e8-1abc71a2b500/v1",
    },
    {
      id: 3,
      title: "Last minute holidays",
      description:
        "From Egypt's Red Sea to the Canaries' golden sands and beyond – your autumn escape awaits!",
      badge: "Deals from £169pp",
      buttonText: "FIND A DEAL",
      imageUrl:
        "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/b0259502-4ed2-48fb-c2e7-79481e657900/public",
    },
  ];

  return (
    <section className="layout-pt-md layout-pb-md">
      <div className="container">
        <div className="row g-3">
          {/* Left Column - Two smaller cards */}
          <div className="col-lg-6">
            <div className="row g-3">
              {/* Top Left Card */}
              <div className="col-12">
                <div className="tour-card">
                  <div
                    className="tour-card-bg"
                    style={{
                      backgroundImage: `url(${tours[0].imageUrl})`,
                    }}
                  >
                    {/* Content Section */}
                    <div className="tour-card-content">
                      {/* Badge Section - Overlapping */}
                      <div className="tour-card-badge">{tours[0].badge}</div>

                      <h3 className="tour-title">{tours[0].title}</h3>
                      <p className="tour-description">{tours[0].description}</p>
                      <a href="#" className="tour-link">
                        {tours[0].buttonText}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Left Card */}
              <div className="col-12">
                <div className="tour-card-bottomleft">
                  <div
                    className="tour-card-bg"
                    style={{
                      backgroundImage: `url(${tours[1].imageUrl})`,
                    }}
                  >
                    {/* Content Section */}
                    <div className="tour-card-content">
                      {/* Badge Section - Overlapping */}
                      <div className="tour-card-badge">{tours[1].badge}</div>

                      <h3 className="tour-title">{tours[1].title}</h3>
                      <p className="tour-description">{tours[1].description}</p>
                      <a href="#" className="tour-link">
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
                  backgroundImage: `url(${tours[2].imageUrl})`,
                }}
              >
                {/* Content Section */}
                <div className="tour-card-content">
                  {/* Badge Section - Overlapping */}
                  <div className="tour-card-badge">{tours[2].badge}</div>

                  <h3 className="tour-title">{tours[2].title}</h3>
                  <p className="tour-description">{tours[2].description}</p>
                  <a href="#" className="tour-link">
                    {tours[2].buttonText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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
        }

        .tour-link:hover {
          opacity: 0.8;
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
        }

        @media (max-width: 768px) {
          .tour-card,
          .tour-card-large {
            height: 300px;
          }

          .tour-card-content {
            width: 90%;
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

          .tour-card-bg-large {
            justify-content: flex-end;
          }
        }
      `}</style>
    </section>
  );
};

export default TourOverview;
