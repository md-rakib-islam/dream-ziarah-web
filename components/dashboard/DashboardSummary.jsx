"use client";

export default function DashboardSummary({ orderData, loading }) {
  // Check if there are bookings to determine if we should show loading spinner
  const hasBookings = orderData?.orders?.length > 0;

  if (loading && hasBookings) {
    return (
      <div>
        <div className="d-flex align-items-center mb-4">
          <i
            className="icon-globe text-primary me-3"
            style={{ fontSize: "2rem" }}
          ></i>
          <div>
            <h2 className="mb-0 text-primary">Dashboard Overview</h2>
            <p className="text-muted mb-0">
              Loading your tour management data...
            </p>
          </div>
        </div>

        <div className="row g-4">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="col-md-3">
              <div className="card border-0 shadow-lg">
                <div className="card-body">
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "120px" }}
                  >
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Check if there are no bookings
  const hasNoBookings = !orderData?.orders?.length || orderData.orders.length === 0;

  return (
    <div className="desktop-mt">
      <div className="d-flex align-items-center mb-4">
        <i
          className="icon-globe text-primary me-3"
          style={{ fontSize: "2rem" }}
        ></i>
        <div>
          <h2 className="mb-0 text-primary">Dashboard Overview</h2>
          <p className="text-muted mb-0">
            Welcome to your tour management center
          </p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-3">
          <div className="card text-white border-0 shadow-lg position-relative overflow-hidden bg-blue-1">
            <div className="position-absolute top-0 end-0 opacity-25">
              <i className="icon-traveller" style={{ fontSize: "4rem" }}></i>
            </div>
            <div className="card-body position-relative">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">
                    <i className="icon-luggage text-14 me-2"></i>
                    Total Tours
                  </h6>
                  <h2 className="mb-0 fw-bold">
                    {hasNoBookings ? 0 : orderData.summary.totalOrders}
                  </h2>
                  <small className="opacity-75">All bookings</small>
                </div>
                <div className="text-end">
                  <div className="bg-white bg-opacity-25 rounded-circle p-3">
                    <i
                      className="icon-trending-up"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white border-0 shadow-lg position-relative overflow-hidden bg-green-2">
            <div className="position-absolute top-0 end-0 opacity-25">
              <i className="icon-nearby" style={{ fontSize: "4rem" }}></i>
            </div>
            <div className="card-body position-relative">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">
                    <i className="icon-check text-14 me-2"></i>
                    Confirmed Tours
                  </h6>
                  <h2 className="mb-0 fw-bold">
                    {hasNoBookings ? 0 : orderData.summary.paidOrders}
                  </h2>
                  <small className="opacity-75">Ready to explore</small>
                </div>
                <div className="text-end">
                  <div className="bg-white bg-opacity-25 rounded-circle p-3">
                    <i
                      className="icon-passport"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white border-0 shadow-lg position-relative overflow-hidden bg-yellow-3">
            <div className="position-absolute top-0 end-0 opacity-25">
              <i className="icon-clock" style={{ fontSize: "4rem" }}></i>
            </div>
            <div className="card-body position-relative">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1 text-dark">
                    <i className="icon-speedometer text-14 me-2"></i>
                    Pending Payment
                  </h6>
                  <h2 className="mb-0 fw-bold text-dark">
                    {hasNoBookings ? 0 : orderData.summary.pendingPayment}
                  </h2>
                  <small className="opacity-75 text-dark">
                    Awaiting confirmation
                  </small>
                </div>
                <div className="text-end">
                  <div className="bg-white bg-opacity-25 rounded-circle p-3">
                    <i
                      className="icon-credit-card text-dark"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white border-0 shadow-lg position-relative overflow-hidden bg-red-2">
            <div className="position-absolute top-0 end-0 opacity-25">
              <i className="icon-trash" style={{ fontSize: "4rem" }}></i>
            </div>
            <div className="card-body position-relative">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">
                    <i className="icon-trash-2 text-14 me-2"></i>
                    Cancelled Tours
                  </h6>
                  <h2 className="mb-0 fw-bold">
                    {hasNoBookings ? 0 : orderData.summary.cancelledOrders}
                  </h2>
                  <small className="opacity-75">Refund processed</small>
                </div>
                <div className="text-end">
                  <div className="bg-white bg-opacity-25 rounded-circle p-3">
                    <i className="icon-share:" style={{ fontSize: "2rem" }}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="row mt-4">
        <div className="col-12">
          <div
            className="card border-0 shadow-sm"
            style={{
              background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
            }}
          >
            <div className="card-body">
              <div className="row text-center">
                <div className="col-md-3">
                  <div className="d-flex align-items-center justify-content-center">
                    <i
                      className="icon-customer text-primary me-3"
                      style={{ fontSize: "2rem" }}
                    ></i>
                    <div>
                      <h4 className="mb-0 text-primary">
                        {hasNoBookings ? 0 : orderData.orders.reduce(
                          (sum, order) => sum + order.participants,
                          0
                        )}
                      </h4>
                      <small className="text-muted">Total Travelers</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="d-flex align-items-center justify-content-center">
                    <i
                      className="icon-location-pin text-success me-3"
                      style={{ fontSize: "2rem" }}
                    ></i>
                    <div>
                      <h4 className="mb-0 text-success">
                        {hasNoBookings ? 0 :
                          new Set(
                            orderData.orders.map((order) => order.tourName)
                          ).size
                        }
                      </h4>
                      <small className="text-muted">Unique Tours</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="d-flex align-items-center justify-content-center">
                    <i
                      className="icon-calendar text-warning me-3"
                      style={{ fontSize: "2rem" }}
                    ></i>
                    <div>
                      <h4 className="mb-0 text-warning">
                        {hasNoBookings ? "N/A" : orderData.orders.length > 0
                          ? new Date(
                              Math.max(
                                ...orderData.orders.map(
                                  (order) => new Date(order.selectedDate)
                                )
                              )
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })
                          : "N/A"}
                      </h4>
                      <small className="text-muted">Next Adventure</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="d-flex align-items-center justify-content-center">
                    <i
                      className="icon-globe text-info me-3"
                      style={{ fontSize: "2rem" }}
                    ></i>
                    <div>
                      <h4 className="mb-0 text-info">
                        {hasNoBookings ? 0 : orderData.orders.length > 0
                          ? new Set(
                              orderData.orders.map(
                                (order) => order.tourName.split(" ")[0]
                              )
                            ).size
                          : 0}
                      </h4>
                      <small className="text-muted">Destinations</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .desktop-mt {
          margin-top: 0; /* default for mobile */
        }

        @media (min-width: 768px) {
          .desktop-mt {
            margin-top: 120px;
          }
        }
      `}</style>
    </div>
  );
}
