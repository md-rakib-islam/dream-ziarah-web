import { BASE_URL } from "@/constant/constants";
import { useState, useEffect } from "react";

export default function CancellationModal({ order, onClose }) {
  const [formData, setFormData] = useState({
    reason: "",
    additionalDetails: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refundPolicies, setRefundPolicies] = useState(null);
  const [policiesLoading, setPoliciesLoading] = useState(true);
  const [policiesError, setPoliciesError] = useState("");
  const [showFullPolicies, setShowFullPolicies] = useState(false);

  // Fetch refund policies when modal opens
  useEffect(() => {
    const fetchRefundPolicies = async () => {
      if (!order?.tour_id) {
        setPoliciesError("Tour ID not available");
        setPoliciesLoading(false);
        return;
      }

      try {
        setPoliciesLoading(true);
        setPoliciesError("");

        const response = await fetch(
          `${BASE_URL}/tour_booking/api/v1/tour_booking/checking_cancellation_policies/${order.originalId}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch refund policies");
        }

        const data = await response.json();
        if (data?.message) {
          // Handle case when no refund policies are found
          setPoliciesError(data.message); // show message in alert UI
          setRefundPolicies(null); // clear any old policies
        } else {
          setRefundPolicies(data); // normal case
        }
      } catch (err) {
        console.error("Error fetching refund policies:", err);
        setPoliciesError(err.message || "Failed to load refund policies");
      } finally {
        setPoliciesLoading(false);
      }
    };

    fetchRefundPolicies();
  }, [order?.tour_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.reason.trim()) {
      setError("Please select a reason for cancellation");
      return;
    }

    if (formData.reason === "others" && !formData.additionalDetails.trim()) {
      setError("Please provide additional details for 'Others' reason");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let cancellationData;

      if (formData.reason === "others") {
        cancellationData = {
          cancellation_reason: formData.additionalDetails.trim(),
          cancellation_request: true,
        };
      } else {
        cancellationData = {
          cancellation_reason: formData.reason,
          cancellation_request: true,
        };
      }

      const response = await fetch(
        `${BASE_URL}/tour_booking/api/v1/tour_booking/cancel_request/${order.originalId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cancellationData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit cancellation request");
      }

      onClose();
    } catch (err) {
      setError(err.message || "Failed to submit cancellation request");
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (date, time) => {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatCurrentDateTime = (date, time) => {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  //auto close module after 5 minutes
  useEffect(() => {
    // Set up auto-close timer for 5 minutes (300000 milliseconds)
    const autoCloseTimer = setTimeout(() => {
      onClose();
    }, 60 * 1000); // 5 minutes in milliseconds

    // Cleanup timer if component unmounts or modal closes manually
    return () => {
      clearTimeout(autoCloseTimer);
    };
  }, []);

  // Enhanced eligibility check based on order data
  const getCancellationEligibility = () => {
    // Check if too many cancellation requests (more than 3)
    if (order?.cancellation_denied_count > 3) {
      return {
        canCancel: false,
        reason: "too_many_requests",
        message:
          "You have made too many cancellation requests and cannot proceed with further cancellations.",
      };
    }

    // Check cancellation status
    if (order?.cancellation_status === "approved") {
      return {
        canCancel: false,
        reason: "already_approved",
        message: "Your cancellation request has already been approved.",
      };
    }

    if (order?.cancellation_status === "reviewing") {
      return {
        canCancel: false,
        reason: "under_review",
        message: "Your cancellation request is currently under review.",
      };
    }

    if (order?.cancellation_status === "denied") {
      return {
        canCancel: false,
        reason: "denied",
        message:
          "According to our policies, you cannot cancel this booking as your previous request was denied.",
      };
    }

    // Check if cancellation_eligible is false from order data
    if (order?.cancellation_eligible === false) {
      return {
        canCancel: false,
        reason: "not_eligible",
        message:
          "This booking is not eligible for cancellation according to our policies.",
      };
    }

    // Check refund policy eligibility (existing logic)
    const isPolicyEligible =
      refundPolicies?.refund_eligible !== false &&
      refundPolicies?.original_remaining_times?.original_remaining_days > 0;

    if (!isPolicyEligible && refundPolicies) {
      return {
        canCancel: false,
        reason: "policy_restriction",
        message:
          refundPolicies?.original_remaining_times?.original_remaining_days ===
          0
            ? "Unfortunately, you cannot cancel this tour booking as the tour is scheduled for today or has already passed."
            : "Unfortunately, you cannot cancel this tour booking as it falls outside our cancellation policy timeframe.",
      };
    }

    // If all checks pass, user can cancel
    return {
      canCancel: true,
      reason: "eligible",
      message: "",
    };
  };

  const eligibility = getCancellationEligibility();
  const isEligibleForCancellation = order?.cancellation_eligible === true;

  // Helper function to get status display info
  const getStatusDisplay = () => {
    switch (order?.cancellation_status) {
      case "approved":
        return {
          type: "success",
          icon: "check-circle",
          title: "Cancellation Approved",
          message: "Your cancellation request has been approved.",
        };
      case "reviewing":
        return {
          type: "warning",
          icon: "clock",
          title: "Under Review",
          message:
            "Your cancellation request is currently being reviewed by our team.",
        };
      case "denied":
        return {
          type: "danger",
          icon: "x-circle",
          title: "Cancellation Denied",
          message:
            "According to our policies, your Cancellation Request for this booking was denied.",
        };
      default:
        return null;
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable custom-modal-width">
        <div className="modal-content">
          <div className="modal-header border-0 pb-2">
            <h5 className="modal-title">Request Cancellation</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              disabled={loading}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {/* Cancellation Status Display */}
              {statusDisplay && (
                <div
                  className={`mb-4 p-3 bg-${statusDisplay.type} bg-opacity-10 rounded border border-${statusDisplay.type} border-opacity-25`}
                >
                  <div className="d-flex align-items-center mb-2">
                    <i
                      className={`icon-${statusDisplay.icon} text-${statusDisplay.type} me-2`}
                    ></i>
                    <span className={`fw-semibold text-${statusDisplay.type}`}>
                      {statusDisplay.title}
                    </span>
                  </div>
                  <p className="mb-0 small">{statusDisplay.message}</p>
                </div>
              )}

              {/* Too Many Requests Warning */}
              {eligibility.reason === "too_many_requests" && (
                <div className="mb-4 p-3 bg-danger bg-opacity-10 rounded border border-danger border-opacity-25">
                  <div className="d-flex align-items-center mb-2">
                    <i className="icon-alert-triangle text-danger me-2"></i>
                    <span className="fw-semibold text-danger">
                      Too Many Cancellation Requests
                    </span>
                  </div>
                  <p className="mb-0 small text-danger">
                    {eligibility.message}
                  </p>
                </div>
              )}

              {/* Tour Item Display */}
              <div className="mb-4">
                <label className="form-label">
                  Choose the item(s) you want to cancel
                </label>
                <div className="card bg-light border">
                  <div className="card-body py-3">
                    <div className="d-flex align-items-center flex-wrap flex-md-nowrap">
                      <div className="bg-success bg-opacity-10 rounded p-2 me-3">
                        <i className="icon-map-pin text-success"></i>
                      </div>
                      <div className="flex-grow-1">
                        <div className="fw-semibold tour-booking-name">
                          {order.tourName}
                        </div>
                        <small className="text-muted">
                          {order.participants} travelers •{" "}
                          {new Date(order.selectedDate).toLocaleDateString()}
                        </small>
                      </div>
                      <div className="text-end">
                        <div className="dropdown-wrapper mt-2 mt-md-0">
                          <select
                            className="form-select form-select-sm mt-1"
                            style={{
                              width: "200px",
                              height: "50px",
                              cursor: "pointer",
                            }}
                            name="reason"
                            value={formData.reason}
                            onChange={handleInputChange}
                            required
                            disabled={loading || !isEligibleForCancellation}
                          >
                            <option value="">Select a Reason</option>
                            <option value="weather_conditions">
                              Weather Conditions
                            </option>
                            <option value="health_emergency">
                              Health Emergency
                            </option>
                            <option value="family_emergency">
                              Family Emergency
                            </option>
                            <option value="work_conflict">Work Conflict</option>
                            <option value="travel_restrictions">
                              Travel Restrictions
                            </option>
                            <option value="financial_hardship">
                              Financial Hardship
                            </option>
                            <option value="change_of_plans">
                              Change of Plans
                            </option>
                            <option value="others">Others</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information - Only show when "others" is selected */}
              {formData.reason === "others" && (
                <div className="mb-4">
                  <label className="form-label">
                    Additional Information (required)
                  </label>
                  <textarea
                    className="form-control"
                    rows="4"
                    name="additionalDetails"
                    value={formData.additionalDetails}
                    onChange={handleInputChange}
                    placeholder="Please specify your reason for cancellation..."
                    disabled={loading || !isEligibleForCancellation}
                    required
                  />
                </div>
              )}

              {/* Cancellation Policy */}
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Cancellation Policy
                </label>
                <div className="card bg-light border">
                  <div className="card-body">
                    <p className="small mb-2">
                      Before cancelling the order, kindly read thoroughly our
                      following terms & conditions:
                    </p>
                    <ol className="small mb-3">
                      <li>
                        Once you submit this form you agree to cancel the
                        selected item(s) in your order. We will be unable to
                        retrieve your order once it is cancelled.
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Refund Policies */}
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Refund Policies
                </label>
                <div className="card bg-light border">
                  <div className="card-body">
                    {policiesLoading ? (
                      <div className="d-flex align-items-center">
                        <div
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <span className="small text-muted">
                          Loading refund policies...
                        </span>
                      </div>
                    ) : policiesError ? (
                      <div className="small text-muted">
                        {policiesError} — standard cancellation terms apply.
                      </div>
                    ) : refundPolicies ? (
                      <div>
                        {/* General Cancellation Not Eligible Warning */}
                        {!isEligibleForCancellation &&
                          eligibility.reason !== "too_many_requests" &&
                          !statusDisplay && (
                            <div className="mb-3 p-3 bg-danger bg-opacity-10 rounded border border-danger border-opacity-25">
                              <div className="d-flex align-items-center mb-2">
                                <i className="icon-x-circle text-danger me-2"></i>
                                <span className="fw-semibold text-danger">
                                  Cancellation Not Available
                                </span>
                              </div>
                              <p className="mb-2 small text-danger">
                                {eligibility.message}
                              </p>
                              <p className="mb-0 small text-muted">
                                Please contact our customer service team if you
                                have any questions or need assistance with your
                                booking.
                              </p>
                            </div>
                          )}

                        {/* Current Refund Information - Only show if eligible */}
                        {isEligibleForCancellation ? (
                          <div className="mb-3 p-3 bg-success bg-opacity-10 rounded border border-success border-opacity-25">
                            <div className="d-flex align-items-center mb-2">
                              <i className="icon-check-circle text-success me-2"></i>
                              <span className="fw-semibold text-success">
                                Current Refund Eligibility
                              </span>
                            </div>
                            <p className="mb-2 small">
                              If you cancel this booking now, you will receive{" "}
                              <span className="fw-bold text-success fs-6">
                                {refundPolicies?.refund_percentage}%
                              </span>{" "}
                              of your paid amount, which equals{" "}
                              <span className="fw-bold text-success fs-6">
                                ${refundPolicies?.refunded_amount}
                              </span>
                              .
                            </p>
                          </div>
                        ) : (
                          refundPolicies?.original_remaining_times
                            ?.original_remaining_days > 0 &&
                          eligibility.reason === "policy_restriction" && (
                            <div className="mb-3 p-3 bg-danger bg-opacity-10 rounded border border-danger border-opacity-25">
                              <div className="d-flex align-items-center mb-2">
                                <i className="icon-x-circle text-danger me-2"></i>
                                <span className="fw-semibold text-danger">
                                  No Refund Available
                                </span>
                              </div>
                              <p className="mb-2 small">
                                Current refund eligibility:{" "}
                                <span className="fw-bold text-danger fs-6">
                                  {refundPolicies?.refund_percentage}%
                                </span>{" "}
                                (${refundPolicies?.refunded_amount})
                              </p>
                            </div>
                          )
                        )}

                        {/* Timing Information */}
                        <div className="mb-3 p-3 bg-info bg-opacity-10 rounded border border-info border-opacity-25">
                          <div className="d-flex align-items-center mb-2">
                            <i className="icon-clock text-info me-2"></i>
                            <span className="fw-semibold text-info">
                              Booking Schedule
                            </span>
                          </div>
                          <div className="row small">
                            <div className="col-md-6">
                              <div className="mb-1">
                                <span className="text-muted">
                                  Tour Date & Time:
                                </span>
                              </div>
                              <div className="fw-bold">
                                {formatDateTime(
                                  refundPolicies?.all_times?.tour_date,
                                  refundPolicies?.all_times?.tour_time
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-1">
                                <span className="text-muted">
                                  Current Date & Time:
                                </span>
                              </div>
                              <div className="fw-bold">
                                {formatCurrentDateTime(
                                  refundPolicies?.all_times?.current_date,
                                  refundPolicies?.all_times?.current_time
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Read Our Policies Button */}
                        <div className="text-center mb-3">
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={() =>
                              setShowFullPolicies(!showFullPolicies)
                            }
                          >
                            <i
                              className={`icon-${
                                showFullPolicies ? "chevron-up" : "chevron-down"
                              } me-2`}
                            ></i>
                            {showFullPolicies ? "Hide" : "Read Our"} Full Refund
                            Policies
                          </button>
                        </div>

                        {/* Full Policy List - Expandable */}
                        {showFullPolicies && (
                          <div className="border-top pt-3">
                            <h6 className="fw-semibold mb-3 text-primary">
                              <i className="icon-file-text me-2"></i>
                              Complete Refund Policy Schedule
                            </h6>
                            <div className="table-responsive">
                              <table className="table table-sm table-hover">
                                <thead className="table-light">
                                  <tr>
                                    <th className="fw-semibold">
                                      Cancellation Window
                                    </th>
                                    <th className="fw-semibold text-end">
                                      Refund Percentage
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {refundPolicies?.published_policy_list.map(
                                    (policy, index) => (
                                      <tr
                                        key={index}
                                        className={
                                          refundPolicies?.refund_percentage ===
                                          parseFloat(policy?.refund_percentage)
                                            ? "table-success fw-semibold"
                                            : ""
                                        }
                                      >
                                        <td className="small">
                                          {policy?.range.includes(
                                            "More than"
                                          ) && (
                                            <i className="icon-trending-up text-success me-2"></i>
                                          )}
                                          {policy?.range}
                                          {refundPolicies?.refund_percentage ===
                                            parseFloat(
                                              policy?.refund_percentage
                                            ) && (
                                            <span className="badge bg-success ms-2 small">
                                              Current
                                            </span>
                                          )}
                                        </td>
                                        <td className="text-end small">
                                          <span
                                            className={
                                              refundPolicies?.refund_percentage ===
                                              parseFloat(
                                                policy?.refund_percentage
                                              )
                                                ? "fw-bold text-success"
                                                : parseFloat(
                                                    policy?.refund_percentage
                                                  ) === 0
                                                ? "text-danger"
                                                : "text-warning"
                                            }
                                          >
                                            {policy?.refund_percentage}
                                          </span>
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                            <div className="alert alert-info small mt-3 mb-0">
                              <i className="icon-info me-2"></i>
                              <strong>Note:</strong> Refund percentages are
                              calculated based on the time remaining before your
                              scheduled tour date. The earlier you cancel, the
                              higher refund percentage you'll receive.
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="small text-muted">
                        No specific refund policies available. Standard terms
                        and conditions apply.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="alert alert-danger mb-3">
                  <i className="icon-alert-circle me-2"></i>
                  {error}
                </div>
              )}
              {/* Submit Button - Only show if eligible for cancellation */}
              <div className="d-flex justify-content-end sticky-bottom bg-white pt-3 mt-4 border-top">
                <button
                  type="button"
                  className="btn btn-outline-secondary me-2"
                  onClick={onClose}
                  disabled={loading}
                >
                  {isEligibleForCancellation ? "Cancel" : "Close"}
                </button>
                {isEligibleForCancellation && (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading || !formData.reason.trim()}
                    style={{
                      backgroundColor: "#6c757d",
                      borderColor: "#6c757d",
                    }}
                  >
                    {loading ? (
                      <>
                        <div
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        Processing...
                      </>
                    ) : (
                      "SUBMIT"
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
