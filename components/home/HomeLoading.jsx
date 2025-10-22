"use client";

/**
 * Loading skeleton for the homepage
 * Shows while MainHome is loading data
 * Prevents layout shift by reserving space
 */
export default function HomeLoading() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <div className="header-margin"></div>

      {/* Hero Skeleton */}
      <div className="skeleton-hero" style={{
        height: '500px',
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'loading 1.5s infinite'
      }} />

      {/* Services Skeleton */}
      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="row">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="col-lg-3 col-sm-6">
                <div className="skeleton-box" style={{
                  height: '150px',
                  borderRadius: '8px',
                  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'loading 1.5s infinite',
                  marginBottom: '20px'
                }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Skeleton */}
      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="skeleton-box" style={{
            height: '60px',
            width: '300px',
            margin: '0 auto 40px',
            borderRadius: '8px',
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'loading 1.5s infinite'
          }} />

          <div className="row">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="col-lg-3 col-md-6">
                <div className="skeleton-box" style={{
                  height: '300px',
                  borderRadius: '12px',
                  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'loading 1.5s infinite',
                  marginBottom: '30px'
                }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
}
