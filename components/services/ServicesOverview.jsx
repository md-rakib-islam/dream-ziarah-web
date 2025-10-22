"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";

// SVG Icons Components
const MosqueIcon = ({ size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    aria-hidden="true"
    role="img"
    className="iconify iconify--twemoji"
    preserveAspectRatio="xMidYMid meet"
  >
    <path
      fill="#F4900C"
      d="M23 4.326c0 4.368-9.837 6.652-9.837 13.206c0 2.184 1.085 4.468 2.177 4.468h15.291c1.093 0 2.192-2.284 2.192-4.468C32.823 10.977 23 8.694 23 4.326z"
    ></path>
    <path
      fill="#FFD983"
      d="M35 33.815C35 35.022 34.711 36 32.815 36h-19.66C11.26 36 11 35.022 11 33.815V22.894c0-1.206.26-1.894 2.156-1.894h19.66c1.895 0 2.184.688 2.184 1.894v10.921z"
    ></path>
    <path
      fill="#FFD983"
      d="M23 34a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v1z"
    ></path>
    <path
      fill="#662113"
      d="M26 29c0-3-1.896-5-3-5s-3 2-3 5v7h6v-7zm-8 2.333c0-2-1.264-3.333-2-3.333s-2 1.333-2 3.333V36h4v-4.667zm14 0c0-2-1.264-3.333-2-3.333s-2 1.333-2 3.333V36h4v-4.667z"
    ></path>
    <path
      fill="#FFD983"
      d="M9 34a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v26z"
    ></path>
    <path
      fill="#F4900C"
      d="M5.995.326c0 1.837-2.832 2.918-2.832 5.675c0 .919.312 2 .627 2h4.402c.314 0 .631-1.081.631-2c0-2.757-2.828-3.838-2.828-5.675z"
    ></path>
    <path
      fill="#FFAC33"
      d="M10 12a1 1 0 0 1-1 1H3a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1zm0-4a1 1 0 0 1-1 1H3a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1z"
    ></path>
  </svg>
);

const CrescentIcon = ({ size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 512.001 512.001"
    style={{ enableBackground: "new 0 0 512.001 512.001" }}
    role="img"
    aria-hidden="true"
  >
    <g>
      <polygon
        fill="#F7B239"
        points="359.979,47.186 392.603,113.29 465.552,123.891 412.765,175.346 425.226,248.001 
                359.979,213.697 294.73,248.001 307.191,175.346 254.404,123.891 327.354,113.29"
      />
      <path
        fill="#F7B239"
        d="M353.657,352.619c-107.299,0-194.281-86.982-194.281-194.281
                c0-59.686,26.923-113.074,69.277-148.713C105.299,23.553,9.431,128.222,9.431,255.299c0,136.561,110.704,247.265,247.265,247.265
                c127.077,0,231.746-95.868,245.673-219.222C466.731,325.696,413.343,352.619,353.657,352.619z"
      />
    </g>
    <path
      d="M297.05,178.578l-11.615,67.716c-0.614,3.576,0.856,7.188,3.79,9.32c2.934,2.132,6.823,2.414,10.036,0.726l60.813-31.971
            l60.813,31.971c1.395,0.733,2.917,1.095,4.433,1.095c1.977,0,3.943-0.614,5.602-1.82c2.935-2.132,4.405-5.746,3.79-9.32
            l-11.614-67.716l4.625-4.508c3.769-3.674,3.845-9.708,0.172-13.477c-3.672-3.768-9.707-3.846-13.475-0.172l-8.212,8.005
            c-2.247,2.189-3.271,5.344-2.74,8.435l9.196,53.623l-48.156-25.317c-2.778-1.46-6.093-1.46-8.869,0l-48.156,25.317l9.197-53.623
            c0.531-3.092-0.494-6.247-2.74-8.435l-38.96-37.976l53.839-7.823c3.104-0.451,5.788-2.4,7.175-5.214l24.078-48.789l24.078,48.789
            c1.389,2.812,4.071,4.762,7.175,5.214l53.841,7.823l-6.486,6.32c-3.769,3.673-3.845,9.708-0.173,13.477
            c3.676,3.769,9.709,3.848,13.477,0.172l20.312-19.8c2.597-2.532,3.531-6.319,2.41-9.769c-1.121-3.45-4.103-5.965-7.694-6.485
            l-67.992-9.879l-30.407-61.611c-1.606-3.253-4.919-5.313-8.547-5.313c-3.628,0-6.94,2.06-8.547,5.313l-30.407,61.611l-67.991,9.879
            c-3.59,0.522-6.573,3.036-7.694,6.485c-1.121,3.45-0.186,7.238,2.41,9.769L297.05,178.578z"
    />
    <path
      d="M506.232,274.493c-3.856-1.657-8.35-0.596-11.055,2.62c-35.233,41.868-86.778,65.883-141.421,65.883
            c-101.873,0-184.751-82.879-184.751-184.751c0-19.503,3.022-38.703,8.982-57.067c1.624-5.006-1.117-10.381-6.122-12.007
            c-5.008-1.625-10.383,1.116-12.007,6.122c-6.578,20.267-9.914,41.448-9.914,62.951c0,112.382,91.43,203.811,203.811,203.811
            c49.719,0,97.113-18.021,133.999-50.246c-25.53,105.111-120.048,181.131-230.96,181.131C125.708,492.94,19.06,386.292,19.06,255.205
            c0-110.914,76.007-205.427,181.118-230.956c-9.614,11.003-18.017,23.013-25.119,35.92c-2.536,4.611-0.855,10.407,3.756,12.944
            c4.611,2.536,10.405,0.855,12.944-3.756c11.041-20.069,25.551-37.744,43.126-52.533c3.214-2.705,4.278-7.196,2.62-11.056
            c-1.659-3.859-5.643-6.178-9.825-5.707C165.393,7.094,107.901,36.749,65.796,83.564C23.368,130.741,0,191.697,0,255.205
            C0,396.803,115.199,512,256.797,512c63.507,0,124.463-23.368,171.639-65.798c46.815-42.104,76.47-99.595,83.504-161.884
            C512.41,280.143,510.093,276.153,506.232,274.493z"
    />
  </svg>
);

const KaabaIcon = ({ size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    role="img"
    aria-hidden="true"
  >
    <title>Kaaba</title>
    <g id="mecca">
      <circle cx="41.5" cy="34.5" r="21.5" fill="#e5efef" />
      <line
        x1="54"
        y1="9"
        x2="54"
        y2="12"
        stroke="#4c241d"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <line
        x1="54"
        y1="16"
        x2="54"
        y2="19"
        stroke="#4c241d"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <line
        x1="52"
        y1="14"
        x2="49"
        y2="14"
        stroke="#4c241d"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <line
        x1="59"
        y1="14"
        x2="56"
        y2="14"
        stroke="#4c241d"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <circle cx="9" cy="15" r="1" fill="#4c241d" />
      <circle cx="59" cy="28" r="1" fill="#4c241d" />
      <polygon
        points="48 22.571 27 30.143 28 62 48 53.429 48 22.571"
        fill="#6b4f5b"
        stroke="#4c241d"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <polygon
        points="8 23 28 30.143 28 62 8 53.429 8 23"
        fill="#b5a19c"
        stroke="#4c241d"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <polygon
        points="48 40.571 28 49.143 28 57 48 48.429 48 40.571"
        fill="#fff"
        stroke="#4c241d"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <polygon
        points="8 22.571 28 31.143 48 22.571 28 14 8 22.571"
        fill="#fff"
        stroke="#4c241d"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <line
        x1="38.476"
        y1="34.653"
        x2="48"
        y2="30.571"
        stroke="#4c241d"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <line
        x1="31.151"
        y1="37.792"
        x2="35.5"
        y2="35.929"
        stroke="#4c241d"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <polygon
        points="8 40.571 28 49.143 28 57 8 48.429 8 40.571"
        fill="#fff"
        stroke="#4c241d"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <polygon
        points="32 60.286 39 57.286 39 39.286 32 42.286 32 60.286"
        fill="#fc8c29"
        stroke="#4c241d"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <line
        x1="28"
        y1="9"
        x2="28"
        y2="5"
        stroke="#4c241d"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <line
        x1="25"
        y1="11"
        x2="22"
        y2="8"
        stroke="#4c241d"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <line
        x1="31"
        y1="11"
        x2="34"
        y2="8"
        stroke="#4c241d"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <line
        x1="48"
        y1="51"
        x2="56"
        y2="51"
        stroke="#4c241d"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <line
        x1="8"
        y1="51"
        x2="2"
        y2="51"
        stroke="#4c241d"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </g>
  </svg>
);

const ServicesOverview = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const services = [
    {
      id: 1,
      title: "Ziyarat Tours",
      description:
        "Explore sacred places of Makkah and Madinah with guided tours.",
      icon: <MosqueIcon size={isMobile ? 40 : 48} />,
      route: "/tours",
      color: "bg-gradient-to-br from-green-50 to-green-100",
      features: ["Sacred Sites", "English Guide"],
    },
    {
      id: 2,
      title: "Umrah Packages",
      description: "Complete Umrah packages with accommodation and guidance.",
      icon: <CrescentIcon size={isMobile ? 40 : 48} />,
      route: "/umrah",
      color: "bg-gradient-to-br from-blue-50 to-blue-100",
      features: ["Full Package", "24/7 Support"],
    },
    {
      id: 3,
      title: "Hajj Packages",
      description: "Affordable Hajj packages with comprehensive services.",
      icon: <KaabaIcon size={isMobile ? 40 : 48} />,
      route: "/hajj",
      color: "bg-gradient-to-br from-purple-50 to-purple-100",
      features: ["Complete Hajj", "Best Prices"],
    },
  ];

  const ServiceCard = ({ service }) => (
    <div
      className={`service-card h-100 ${service.color} border-0 shadow transition-all duration-300 hover:shadow-lg`}
    >
      <div className={`card-body text-center ${isMobile ? "p-2" : "p-3"}`}>
        <div className={isMobile ? "mb-1" : "mb-2"}>
          <div
            className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle shadow-sm"
            style={{
              width: isMobile ? "60px" : "70px",
              height: isMobile ? "60px" : "70px",
              padding: "8px",
            }}
          >
            {service.icon}
          </div>
        </div>

        <h6
          className={`card-title fw-bold text-dark ${
            isMobile ? "mb-1" : "mb-2"
          } ${isMobile ? "small" : ""}`}
        >
          {service.title}
        </h6>

        <p
          className={`card-text text-muted mb-2 ${
            isMobile ? "text-xs" : "small"
          }`}
        >
          {service.description}
        </p>

        <div className={isMobile ? "mb-2" : "mb-3"}>
          {service.features.map((feature, index) => (
            <span
              key={index}
              className={`badge bg-white text-dark me-1 mb-1 ${
                isMobile ? "text-xs" : "small"
              }`}
            >
              ✓ {feature}
            </span>
          ))}
        </div>

        <Link href={service.route} className="text-decoration-none">
          <button
            className={`btn btn-success fw-bold ${
              isMobile ? "btn-xs px-2 py-1" : "btn-sm px-3"
            }`}
          >
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );

  return (
    <section className="layout-pt-md layout-pb-md">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-12">
            <div className="sectionTitle -md">
              <h2 className="sectionTitle__title md:text-24">
                Find Ziyarat Tours in Makkah, Umrah, and Hajj Packages
              </h2>
              <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                Enjoy guided ziyarat tours in Makkah, umrah packages, and cheap
                hajj deals. See the list of ziyarat places in Makkah and Madinah
                with easy transport and English guides. Book your spiritual
                pilgrimage now!
              </p>
            </div>
          </div>
        </div>

        <div className="row y-gap-20 pt-40 sm:pt-20">
          {!isMobile ? (
            // Desktop View
            services.map((service) => (
              <div key={service.id} className="col-lg-4 col-md-6">
                <ServiceCard service={service} />
              </div>
            ))
          ) : (
            // Mobile View - Slider
            <div className="col-12">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={15}
                slidesPerView={1}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                className="services-swiper"
              >
                {services.map((service) => (
                  <SwiperSlide key={service.id}>
                    <ServiceCard service={service} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .service-card {
          transition: all 0.3s ease;
          border-radius: 12px !important;
        }

        .service-card:hover {
          transform: translateY(-4px);
        }

        .services-swiper {
          padding-bottom: 40px !important;
        }

        .services-swiper .swiper-pagination {
          bottom: 0 !important;
          margin-top: 20px !important;
        }

        .services-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #28a745;
          opacity: 0.3;
        }

        .services-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }

        .y-gap-20 > * {
          margin-bottom: 20px;
        }

        .y-gap-22 > * {
          margin-bottom: 22px;
        }

        .pt-40 {
          padding-top: 40px;
        }

        @media (max-width: 640px) {
          .pt-40 {
            padding-top: 20px;
          }

          .sm\\:pt-20 {
            padding-top: 20px !important;
          }

          .sm\\:mt-0 {
            margin-top: 0 !important;
          }
        }

        @media (max-width: 768px) {
          .md\\:text-24 {
            font-size: 24px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesOverview;
