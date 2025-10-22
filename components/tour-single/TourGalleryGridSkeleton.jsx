"use client";

const TourGalleryGridSkeleton = ({ isMobile = false }) => {
  // Accept isMobile as prop instead of calculating it here

  // Custom arrow component for mobile slider skeleton
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
      <button className={className} onClick={props.onClick} style={arrowStyle}>
        {char}
      </button>
    );
  }

  // Custom arrow component for desktop slider
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

  // Slider settings for mobile skeleton

  return (
    <section className="pt-40 js-pin-container">
      <div className="container">
        {!isMobile ? (
          // Desktop Grid Layout Skeleton - Exact match to the real grid
          <div className="gallery-grid-skeleton">
            <div className="gallery-grid-skeleton-container">
              {/* First large image (left) - Tall rectangle */}
              <div className="gallery-item-skeleton gallery-item-skeleton-large-left">
                <div className="skeleton-pulse rounded-4 h-full w-full"></div>
              </div>
              {/* Center large image - Tall rectangle */}
              <div className="gallery-item-skeleton gallery-item-skeleton-large-center">
                <div className="skeleton-pulse rounded-4 h-full w-full"></div>
              </div>
              {/* Top right image - Small square */}
              <div className="gallery-item-skeleton gallery-item-skeleton-small-top-right">
                <div className="skeleton-pulse rounded-4 h-full w-full"></div>
              </div>
              {/* Bottom right image - Small square */}
              <div className="gallery-item-skeleton gallery-item-skeleton-small-bottom-right">
                <div className="skeleton-pulse rounded-4 h-full w-full"></div>
              </div>
            </div>
          </div>
        ) : (
          // Mobile Banner Skeleton
          <div className="mobile-gallery-skeleton">
            <div
              className="skeleton-pulse rounded-4"
              style={{
                width: '100%',
                height: '280px',
                position: 'relative',
                backgroundColor: '#f0f0f0',
                overflow: 'hidden'
              }}
            >
              {/* Shimmer effect */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  animation: 'shimmer 1.5s infinite',
                }}
              />
            </div>

            {/* Add shimmer animation */}
            <style jsx>{`
              @keyframes shimmer {
                0% {
                  transform: translateX(-100%);
                }
                100% {
                  transform: translateX(100%);
                }
              }
            `}</style>
          </div>
        )}
      </div>
    </section>
  );
};

export default TourGalleryGridSkeleton;
