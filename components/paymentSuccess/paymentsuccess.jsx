"use client";

import useTourBookingUUID from "@/hooks/useTourBookingUUID";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/constant/constants";

const PaymentSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const booking_id = searchParams.get("booking_id");

  const { booking, loading, error } = useTourBookingUUID(booking_id);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (!booking_id) {
      router.push("/");
      return;
    }

    // Trigger smooth entrance animation
    setAnimateIn(true);
  }, [booking_id, router]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatTime = (timeString) =>
    new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const getStatusDisplay = (status) => {
    const statusMap = {
      paid: { label: "Confirmed", color: "success", icon: "check-circle" },
      pending: { label: "Pending", color: "warning", icon: "clock" },
      cancelled: { label: "Cancelled", color: "danger", icon: "x-circle" },
      partial_refund: { label: "Partially Refunded", color: "info", icon: "arrow-counterclockwise" },
      refunded: { label: "Refunded", color: "secondary", icon: "arrow-counterclockwise" },
    };
    return statusMap[status] || { label: status, color: "secondary", icon: "info-circle" };
  };

  const handlePrint = (url, fileName) => {
    if (!url) return;

    const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;

    // For Apple devices and better compatibility, open in new window with print dialog
    const printWindow = window.open(fullUrl, '_blank');

    if (printWindow) {
      printWindow.onload = function() {
        // Small delay to ensure content is loaded
        setTimeout(() => {
          printWindow.print();
        }, 500);
      };
    } else {
      // Fallback if popup blocked
      window.location.href = fullUrl;
    }
  };

  if (loading) {
    return (
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="loading-spinner mb-4">
            <div
              className="spinner-border text-primary"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          <h5 className="text-muted fw-normal">Confirming your payment...</h5>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center py-5">
                <div className="error-icon mb-4">
                  <i
                    className="bi bi-exclamation-triangle text-warning"
                    style={{ fontSize: "4rem" }}
                  ></i>
                </div>
                <h3 className="card-title text-dark mb-3">
                  Payment Verification Failed
                </h3>
                <p className="card-text text-muted mb-4 lead">
                  We couldn't verify your payment. Please contact our support
                  team if you believe this is an error.
                </p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <button
                    className="btn btn-primary btn-lg px-4"
                    onClick={() => router.push("/")}
                  >
                    <i className="bi bi-house me-2"></i>Return Home
                  </button>
                  <button
                    className="btn btn-outline-primary btn-lg px-4"
                    onClick={() => router.push("/contact")}
                  >
                    <i className="bi bi-headset me-2"></i>Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const statusInfo = booking ? getStatusDisplay(booking.status) : null;

  return (
    <div className="container-fluid min-vh-100 bg-gradient-subtle mt-90">
      <div className="container py-3 mt-3">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-7">
            {/* Success Header */}
            <div
              className={`text-center mb-3 ${
                animateIn ? "animate-fade-in" : ""
              }`}
            >
              <div className="success-checkmark mb-2">
                <div className="check-icon">
                  <span className="icon-line line-tip"></span>
                  <span className="icon-line line-long"></span>
                  <div className="icon-circle"></div>
                  <div className="icon-fix"></div>
                </div>
              </div>
              <h1 className="h4 text-success fw-bold mb-1">
                Payment Successful!
              </h1>
              <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
                Thank you for your booking. Your tour reservation has been
                confirmed.
              </p>
            </div>

            {/* Booking Details Card */}
            <div
              className={`card border-0 shadow-lg mb-2 ${
                animateIn ? "animate-slide-up" : ""
              }`}
            >
              <div className="card-header bg-gradient-primary text-white py-2">
                <div className="row align-items-center">
                  <div className="col">
                    <h6 className="mb-0 fw-semibold" style={{ fontSize: "1rem" }}>
                      <i className="bi bi-calendar-check me-2"></i>
                      Booking Confirmation
                    </h6>
                  </div>
                  <div className="col-auto">
                    <span className="badge bg-white text-primary fw-semibold px-2 py-1" style={{ fontSize: "0.75rem" }}>
                      {booking.booking_id}
                    </span>
                  </div>
                </div>
              </div>

              <div className="card-body p-2 p-md-3">
                {/* Tour Information */}
                <div className="section-divider mb-2">
                  <h6 className="section-title text-primary mb-2" style={{ fontSize: "0.9rem" }}>
                    <i className="bi bi-geo-alt-fill me-2"></i>
                    Tour Information
                  </h6>
                  <div className="info-card">
                    <h6 className="fw-bold text-dark mb-2" style={{ fontSize: "0.95rem" }}>
                      {booking.tour}
                    </h6>
                    <div className="row g-2">
                      <div className="col-md-3 col-6">
                        <div className="info-item">
                          <small className="text-muted text-uppercase fw-medium" style={{ fontSize: "0.65rem" }}>
                            Booking ID
                          </small>
                          <div className="fw-semibold text-dark" style={{ fontSize: "0.8rem" }}>
                            {booking.booking_id}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 col-6">
                        <div className="info-item">
                          <small className="text-muted text-uppercase fw-medium" style={{ fontSize: "0.65rem" }}>
                            Guide
                          </small>
                          <div className="fw-semibold text-dark" style={{ fontSize: "0.8rem" }}>
                            {booking.guide}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 col-6">
                        <div className="info-item">
                          <small className="text-muted text-uppercase fw-medium" style={{ fontSize: "0.65rem" }}>
                            Participants
                          </small>
                          <div className="fw-semibold text-dark" style={{ fontSize: "0.8rem" }}>
                            {booking.total_participants} {booking.total_participants > 1 ? 'people' : 'person'}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 col-6">
                        <div className="info-item">
                          <small className="text-muted text-uppercase fw-medium" style={{ fontSize: "0.65rem" }}>
                            Status
                          </small>
                          <div>
                            <span className={`badge bg-${statusInfo.color}-soft text-${statusInfo.color} fw-semibold`} style={{ fontSize: "0.7rem" }}>
                              <i className={`bi bi-${statusInfo.icon} me-1`}></i>
                              {statusInfo.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Schedule Information */}
                <div className="section-divider mb-2">
                  <h6 className="section-title text-primary mb-2" style={{ fontSize: "0.9rem" }}>
                    <i className="bi bi-clock me-2"></i>
                    Schedule Details
                  </h6>
                  <div className="row g-2">
                    <div className="col-md-6">
                      <div className="schedule-item">
                        <div className="schedule-icon">
                          <i className="bi bi-calendar3"></i>
                        </div>
                        <div>
                          <small className="text-muted text-uppercase fw-medium" style={{ fontSize: "0.65rem" }}>
                            Date
                          </small>
                          <div className="fw-semibold text-dark" style={{ fontSize: "0.8rem" }}>
                            {formatDate(booking.selected_date)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="schedule-item">
                        <div className="schedule-icon">
                          <i className="bi bi-clock-fill"></i>
                        </div>
                        <div>
                          <small className="text-muted text-uppercase fw-medium" style={{ fontSize: "0.65rem" }}>
                            Time
                          </small>
                          <div className="fw-semibold text-dark" style={{ fontSize: "0.8rem" }}>
                            {formatTime(booking.selected_time)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="section-divider mb-2">
                  <h6 className="section-title text-primary mb-2" style={{ fontSize: "0.9rem" }}>
                    <i className="bi bi-receipt me-2"></i>
                    Payment Summary
                  </h6>
                  <div className="payment-summary">
                    <div className="row g-2 mb-2">
                      {booking.price_by_vehicle && (
                        <div className="col-md-6">
                          <div className="payment-item">
                            <small className="text-muted text-uppercase fw-medium" style={{ fontSize: "0.65rem" }}>
                              Group Price
                            </small>
                            <div className="fw-semibold text-dark" style={{ fontSize: "0.85rem" }}>
                              ${booking.group_price}
                            </div>
                          </div>
                        </div>
                      )}
                      {booking.price_by_passenger && (
                        <div className="col-md-6">
                          <div className="payment-item">
                            <small className="text-muted text-uppercase fw-medium" style={{ fontSize: "0.65rem" }}>
                              Price per Person
                            </small>
                            <div className="fw-semibold text-dark" style={{ fontSize: "0.85rem" }}>
                              ${booking.price_per_person}
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="col-md-6">
                        <div className="payment-item">
                          <small className="text-muted text-uppercase fw-medium" style={{ fontSize: "0.65rem" }}>
                            Booking Date
                          </small>
                          <div className="fw-semibold text-dark" style={{ fontSize: "0.8rem" }}>
                            {new Date(booking.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="total-amount-card">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-dark fw-semibold" style={{ fontSize: "0.85rem" }}>
                          Total Amount Paid
                        </span>
                        <span className="text-success fw-bold" style={{ fontSize: "1.2rem" }}>
                          ${booking.total_price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Document Downloads */}
                <div className="mt-2">
                  <h6 className="section-title text-primary mb-2" style={{ fontSize: "0.9rem" }}>
                    <i className="bi bi-file-earmark-pdf me-2"></i>
                    Documents
                  </h6>
                  <div className="row g-2">
                    {booking.booking_ticket && (
                      <div className="col-md-6">
                        <button
                          onClick={() => handlePrint(booking.booking_ticket, 'booking_ticket')}
                          className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center btn-sm"
                          style={{ fontSize: "0.75rem", padding: "0.4rem" }}
                        >
                          <i className="bi bi-printer me-1" style={{ fontSize: "0.85rem" }}></i>
                          Print Ticket
                        </button>
                      </div>
                    )}
                    {booking.payment_invoice && (
                      <div className="col-md-6">
                        <button
                          onClick={() => handlePrint(booking.payment_invoice, 'payment_invoice')}
                          className="btn btn-outline-success w-100 d-flex align-items-center justify-content-center btn-sm"
                          style={{ fontSize: "0.75rem", padding: "0.4rem" }}
                        >
                          <i className="bi bi-printer me-1" style={{ fontSize: "0.85rem" }}></i>
                          Print Invoice
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className={`text-center ${animateIn ? "animate-fade-in-up" : ""}`}
            >
              <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <button
                  className="btn btn-primary btn-sm px-3 py-2"
                  onClick={() => router.push("/dashboard")}
                  style={{ fontSize: "0.8rem" }}
                >
                  <i className="bi bi-list-ul me-1"></i>
                  View Bookings
                </button>
                <button
                  className="btn btn-outline-primary btn-sm px-3 py-2"
                  onClick={() => router.push("/")}
                  style={{ fontSize: "0.8rem" }}
                >
                  <i className="bi bi-house me-1"></i>
                  Home
                </button>
              </div>

              <div className="mt-2">
                <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                  <i className="bi bi-envelope me-1"></i>Confirmation email sent
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-gradient-subtle {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }

        .bg-gradient-primary {
          background: linear-gradient(135deg, #0d6efd 0%, #0056b3 100%);
        }

        .bg-success-soft {
          background-color: rgba(25, 135, 84, 0.1);
        }

        .bg-warning-soft {
          background-color: rgba(255, 193, 7, 0.1);
        }

        .bg-danger-soft {
          background-color: rgba(220, 53, 69, 0.1);
        }

        .bg-info-soft {
          background-color: rgba(13, 202, 240, 0.1);
        }

        .bg-secondary-soft {
          background-color: rgba(108, 117, 125, 0.1);
        }

        /* Success Checkmark Animation */
        .success-checkmark {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: block;
          stroke-width: 2;
          stroke: #28a745;
          stroke-miterlimit: 10;
          margin: 0 auto;
          position: relative;
        }

        .success-checkmark .check-icon {
          width: 60px;
          height: 60px;
          position: relative;
          border-radius: 50%;
          box-sizing: content-box;
          border: 2px solid #28a745;
        }

        .success-checkmark .check-icon::before {
          top: 2px;
          left: -1px;
          width: 22px;
          transform-origin: 100% 50%;
          border-radius: 100px 0 0 100px;
        }

        .success-checkmark .check-icon::after {
          top: 0;
          left: 22px;
          width: 44px;
          transform-origin: 0 50%;
          border-radius: 0 100px 100px 0;
          animation: rotate-circle 4.25s ease-in;
        }

        .success-checkmark .check-icon::before,
        .success-checkmark .check-icon::after {
          content: "";
          height: 75px;
          position: absolute;
          background: #f8f9fa;
          transform: rotate(-45deg);
        }

        .success-checkmark .icon-line {
          height: 2px;
          background-color: #28a745;
          display: block;
          border-radius: 2px;
          position: absolute;
          z-index: 10;
        }

        .success-checkmark .icon-line.line-tip {
          top: 34px;
          left: 10px;
          width: 18px;
          transform: rotate(45deg);
          animation: icon-line-tip 0.75s;
        }

        .success-checkmark .icon-line.line-long {
          top: 28px;
          right: 6px;
          width: 35px;
          transform: rotate(-45deg);
          animation: icon-line-long 0.75s;
        }

        .success-checkmark .icon-circle {
          top: -2px;
          left: -2px;
          z-index: 10;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          position: absolute;
          box-sizing: content-box;
          border: 2px solid rgba(40, 167, 69, 0.2);
        }

        .success-checkmark .icon-fix {
          top: 6px;
          width: 4px;
          left: 19px;
          z-index: 1;
          height: 64px;
          position: absolute;
          transform: rotate(-45deg);
          background-color: #f8f9fa;
        }

        @keyframes rotate-circle {
          0% {
            transform: rotate(-45deg);
          }
          5% {
            transform: rotate(-45deg);
          }
          12% {
            transform: rotate(-405deg);
          }
          100% {
            transform: rotate(-405deg);
          }
        }

        @keyframes icon-line-tip {
          0% {
            width: 0;
            left: 1px;
            top: 19px;
          }
          54% {
            width: 0;
            left: 1px;
            top: 19px;
          }
          70% {
            width: 50px;
            left: -8px;
            top: 37px;
          }
          84% {
            width: 17px;
            left: 21px;
            top: 48px;
          }
          100% {
            width: 25px;
            left: 14px;
            top: 46px;
          }
        }

        @keyframes icon-line-long {
          0% {
            width: 0;
            right: 46px;
            top: 54px;
          }
          65% {
            width: 0;
            right: 46px;
            top: 54px;
          }
          84% {
            width: 55px;
            right: 0px;
            top: 35px;
          }
          100% {
            width: 47px;
            right: 8px;
            top: 38px;
          }
        }

        /* Card and Layout Styles */
        .card {
          border-radius: 0.75rem;
          overflow: hidden;
        }

        .card-header {
          border: none;
        }

        .section-divider {
          position: relative;
          padding-bottom: 0.75rem;
        }

        .section-divider:not(:last-child)::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #dee2e6, transparent);
        }

        .section-title {
          font-weight: 600;
          letter-spacing: -0.025em;
        }

        .info-card {
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          border-radius: 0.4rem;
          padding: 0.75rem;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .info-item {
          padding: 0.3rem 0;
        }

        .schedule-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem;
          background: rgba(13, 110, 253, 0.05);
          border-radius: 0.4rem;
          border-left: 3px solid #0d6efd;
        }

        .schedule-icon {
          width: 32px;
          height: 32px;
          background: #0d6efd;
          border-radius: 0.35rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .payment-summary {
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          border-radius: 0.4rem;
          padding: 0.75rem;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .payment-item {
          padding: 0.3rem 0;
        }

        .total-amount-card {
          background: linear-gradient(
            135deg,
            rgba(25, 135, 84, 0.1) 0%,
            rgba(25, 135, 84, 0.05) 100%
          );
          border: 2px solid rgba(25, 135, 84, 0.2);
          border-radius: 0.4rem;
          padding: 0.75rem;
          margin-top: 0.5rem;
        }

        /* Animation Classes */
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out 0.2s both;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out 0.4s both;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Button Enhancements */
        .btn {
          border-radius: 0.5rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .loading-spinner {
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default PaymentSuccess;
