"use client";

import "photoswipe/dist/photoswipe.css";

import TourGallery from "@/components/tour-single/TourGallery";
import Tours from "@/components/tours/Tours";

import { addItenarayItems, addtourItem } from "@/features/tour/tourSlice";
import { singleTourInfo } from "@/hooks/useTours";
import Loading from "@/app/loading";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import Image from "next/image";

const TourSingleV1Dynamic = ({
  children,
  tourData,
  allTours,
  fullUrl,
  isUmrahPage,
}) => {
  const dispatch = useDispatch();
  const [makka, setMakka] = useState(false);
  const [jedda, setJedda] = useState(false);
  const [madina, setMadina] = useState(false);
  const [taif, setTaif] = useState(false);
  const [dataAvailable, setDataAvailable] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isCopyLoading, setIsCopyLoading] = useState(false);

  useEffect(() => {
    if (tourData) {
      // Set location-based flags based on location_type
      const locationType = tourData.location_type?.toLowerCase() || "";

      setMakka(
        locationType.includes("makkah") ||
          locationType.includes("mecca") ||
          locationType.includes("umrah") ||
          locationType.includes("hajj")
      );
      setMadina(
        locationType.includes("madina") || locationType.includes("madinah")
      );
      setJedda(
        locationType.includes("jeddah") || locationType.includes("jedda")
      );
      setTaif(locationType.includes("taif"));

      // Dispatch tour data to Redux store
      dispatch(addtourItem(tourData));

      // Set data availability
      setDataAvailable(true);
    }
  }, [tourData, dispatch]);

  useEffect(() => {
    if (tourData?.itineraries_list) {
      dispatch(addItenarayItems(tourData.itineraries_list));
    }
  }, [tourData?.itineraries_list, dispatch]);

  // Transform new data structure to match old tour object structure
  let tour = {};
  if (tourData) {
    tour = {
      id: tourData.id,
      tag: tourData.name || "",
      slideImg: tourData.tour_images || [],
      title: tourData.name,
      location:
        singleTourInfo[tourData.name]?.location ||
        tourData.location ||
        "Saudi Arabia",
      duration: tourData.duration || "Full Day",
      numberOfReviews: singleTourInfo[tourData.name]?.numberOfReviews || "0",
      price: tourData.day_tour_price_list?.[0]?.group_price || "0",
      tourType: "Attractions & Museums",
      delayAnimation: "200",
      languages:
        tourData.languages || singleTourInfo[tourData.name]?.languages || "",
      departure:
        singleTourInfo[tourData.name]?.departure || tourData.overview || "",
    };
  }

  const handleDataAvailability = (isDataAvailable) => {
    setDataAvailable(isDataAvailable);
  };

  //copy link
  const copyToClipboard = () => {
    setIsCopyLoading(true);

    const copyingPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        navigator?.clipboard
          ?.writeText(window?.location?.href)
          .then(() => {
            setIsCopyLoading(false);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 1500);
            resolve();
          })
          .catch(() => {
            setIsCopyLoading(false);
            reject();
          });
      }, 1500);
    });

    toast.promise(
      copyingPromise,
      {
        pending: "Copying link to clipboard...",
        success: "Link copied successfully",
        error: "Failed to copy link to clipboard",
        pendingToastId: "pending-toast",
        successToastId: "success-toast",
        errorToastId: "error-toast",
      },
      {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };

  if (!tourData) {
    return (
      <div className="container">
        <div className="row justify-center">
          <div className="col-12 text-center">
            <h3>Tour not found</h3>
            <p>The requested tour could not be loaded.</p>
            <Link
              href="/tours"
              className="button -md -blue-1 bg-blue-1-05 text-blue-1"
            >
              View All Tours
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div className="header-margin"></div>

      <section className="pt-5 pt-sm-3 pt-md-4 pt-lg-5 js-pin-container">
        <div className="container">
          <div className="row y-gap-30">
            {children}

            <div className="col-xl-4 d-flex justify-content-end align-items-end">
              <div className="row ">
                <div className="col-auto btn-group dropup">
                  <button
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    className="button px-10 py-10 -blue-1 border border-blue-1"
                  >
                    <i className="icon-share mr-10"></i>
                    Share
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li className="d-flex my-2">
                      <FacebookShareButton className="me-2" url={fullUrl}>
                        <FacebookIcon size={32} round={true} />
                      </FacebookShareButton>
                      <FacebookMessengerShareButton
                        className="me-2"
                        url={fullUrl}
                      >
                        <FacebookMessengerIcon size={32} round={true} />
                      </FacebookMessengerShareButton>
                      <WhatsappShareButton className="me-2" url={fullUrl}>
                        <WhatsappIcon size={32} round={true} />
                      </WhatsappShareButton>
                      <EmailShareButton
                        className="me-2"
                        url={fullUrl}
                        subject="Check out this amazing tour!"
                        body={`I found this great tour. Check it out here:`}
                      >
                        <EmailIcon size={32} round={true} />
                      </EmailShareButton>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "-15px",
                        }}
                        onClick={copyToClipboard}
                      >
                        {isCopyLoading ? (
                          <div
                            style={{
                              marginLeft: "10px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Loading />
                          </div>
                        ) : (
                          <i
                            className="icon-copy"
                            style={{ height: 32, width: 32 }}
                          ></i>
                        )}
                        {copied ? (
                          <span
                            style={{
                              marginLeft: "-15px",
                            }}
                          >
                            copied!
                          </span>
                        ) : (
                          <>
                            {!isCopyLoading && (
                              <Image
                                width={40}
                                height={40}
                                style={{
                                  cursor: "pointer",
                                }}
                                alt="images"
                                src="https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/80bd75f3-6ddb-4c93-1acf-7b4fb358f200/public"
                              />
                            )}
                          </>
                        )}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TourGallery tour={tourData} isUmrahPage={isUmrahPage} />

      {makka && tourData?.name && dataAvailable && (
        <section className="layout-pt-md layout-pb-md">
          <div className="container">
            <div className="row justify-center text-center">
              <div className="col-12">
                <div className="sectionTitle -md">
                  <h2 className="sectionTitle__title md:text-24">
                    Discover Our Best Makkah Ziyarat and Umrah Tours for
                  </h2>
                  <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                    Find Your Perfect Makkah Tour: Private, Shared, and More
                  </p>
                </div>
              </div>

              {/* <div className="col-auto">
                <Link
                  href="/tours/?location=Makkah"
                  className="button -md -blue-1 bg-blue-1-05 text-blue-1"
                >
                  More <div className="icon-arrow-top-right ml-15" />
                </Link>
              </div> */}
            </div>

            <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
              <Tours filterLocation="Makkah" allTours={allTours} />
            </div>
          </div>
        </section>
      )}

      {madina && tourData?.name && dataAvailable && (
        <section className="layout-pt-md layout-pb-md">
          <div className="container">
            <div className="row justify-center text-center">
              <div className="col-12">
                <div className="sectionTitle -md">
                  <h2 className="sectionTitle__title md:text-24">
                    Popular Tours In Madina
                  </h2>
                  <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                    Find Your Perfect Madina Tour: Private, Shared, and More
                  </p>
                </div>
              </div>

              {/* <div className="col-auto">
                <Link
                  href="/tours/?location=Madinah"
                  className="button -md -blue-1 bg-blue-1-05 text-blue-1"
                >
                  More <div className="icon-arrow-top-right ml-15" />
                </Link>
              </div> */}
            </div>

            <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
              <Tours filterLocation="Madina" allTours={allTours} />
            </div>
          </div>
        </section>
      )}

      {jedda && tourData?.name && dataAvailable && (
        <section className="layout-pt-md layout-pb-md">
          <div className="container">
            <div className="row justify-center text-center">
              <div className="col-12">
                <div className="sectionTitle -md">
                  <h2 className="sectionTitle__title md:text-24">
                    Popular Tours In Jeddah
                  </h2>
                  <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                    Find Your Perfect Jeddah Tour: Private, Shared, and More
                  </p>
                </div>
              </div>

              {/* <div className="col-auto">
                <Link
                  href="/tours/?location=Jedda"
                  className="button -md -blue-1 bg-blue-1-05 text-blue-1"
                >
                  More <div className="icon-arrow-top-right ml-15" />
                </Link>
              </div> */}
            </div>

            <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
              <Tours filterLocation="Jeddah" allTours={allTours} />
            </div>
          </div>
        </section>
      )}

      {taif && tourData?.name && dataAvailable && (
        <section className="layout-pt-md layout-pb-md">
          <div className="container">
            <div className="row justify-center text-center">
              <div className="col-12">
                <div className="sectionTitle -md">
                  <h2 className="sectionTitle__title md:text-24">
                    Find Your Perfect Taif Tour: Private, Shared, and More
                  </h2>
                  <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                    Find Your Perfect Taif Tour: Private, Shared, and More
                  </p>
                </div>
              </div>

              {/* <div className="col-auto">
                <Link
                  href="/tours/?location=Taif"
                  className="button -md -blue-1 bg-blue-1-05 text-blue-1"
                >
                  More <div className="icon-arrow-top-right ml-15" />
                </Link>
              </div> */}
            </div>

            <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
              <Tours filterLocation="Taif" allTours={allTours} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default TourSingleV1Dynamic;
