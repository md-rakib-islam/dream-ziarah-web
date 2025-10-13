"use client";

import { useState, useEffect } from "react";
import Calendar from "../tour-single/Bookings/Calendar";
import { Update_ATour_BookingDate } from "@/constant/constants";
import { useSingleTour } from "@/hooks/useSingleTour";
import { getSingleTourServer } from "@/services/tourService";

/**
 * Helper function to extract date strings from API response
 * Handles both formats:
 * - Plain strings: ["01/02/2026", "01/03/2026"]
 * - Objects with date property: [{id: 1, date: "01/02/2026"}, {id: 2, date: "01/03/2026"}]
 */
const extractDateStrings = (dates) => {
  if (!Array.isArray(dates)) return [];

  return dates.map((item) => {
    // If it's an object with a date property, extract the date
    if (typeof item === "object" && item !== null && item.date) {
      return item.date;
    }
    // If it's already a string, return as is
    return item;
  });
};

const ChangeDate = ({ isOpen, onClose, order, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [tourData, setTourData] = useState(null);
  const [errors, setErrors] = useState({});

  const tourId = order?.tour_id;
  useEffect(() => {
    async function fetchTour() {
      try {
        const data = await getSingleTourServer(tourId);
        setTourData(data);
      } catch (err) {
        setErrors(err.message);
      }
    }

    if (tourId) fetchTour();
  }, [tourId]);

  // Initialize available dates based on tour data
  useEffect(() => {
    if (tourData && tourData.day_tour_price_list && order) {
      // Find the matching price option based on the order's guide
      const matchingOption = tourData.day_tour_price_list.find(
        (option) => option.guide === order.guide
      );

      if (matchingOption) {
        // Extract date strings from API response (handles both plain strings and objects with date property)
        const rawDateStrings = extractDateStrings(
          matchingOption.available_dates || []
        );

        // console.log(
        //   "🔍 Raw available_dates from API:",
        //   matchingOption.available_dates
        // );
        // console.log("🔍 Extracted date strings:", rawDateStrings);

        // Convert date strings to Date objects
        const rawDates = rawDateStrings.map((dateStr) => new Date(dateStr));

        // Filter dates to only show from tomorrow onwards
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        const validDates = rawDates.filter((date) => {
          const checkDate = new Date(date);
          checkDate.setHours(0, 0, 0, 0);
          return checkDate >= tomorrow;
        });

        // console.log("✅ Valid dates for selection:", validDates);
        setAvailableDates(validDates);
      } else {
        console.warn("⚠️ No matching guide option found for:", order.guide);
        setAvailableDates([]);
      }
    }
  }, [tourData, order]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen && order) {
      // Initialize selectedDate with the current booking date if it exists
      if (order.selectedDate) {
        setSelectedDate(new Date(order.selectedDate));
      } else {
        setSelectedDate(null);
      }
      setErrors({});
      setShowCalendar(false);
    }
  }, [isOpen, order]);

  const formatDate = (date) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const isDateAvailable = (date) => {
    // First check if the date is in the available dates list
    const isInAvailableDates = availableDates.some(
      (availableDate) =>
        availableDate.getDate() === date.getDate() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getFullYear() === date.getFullYear()
    );

    // If not in available dates, return false
    if (!isInAvailableDates) {
      return false;
    }

    // Check if this date is the current booking date (should be disabled)
    if (order?.selectedDate) {
      const currentBookingDate = new Date(order.selectedDate);
      const isSameDateAsCurrentBooking =
        currentBookingDate.getDate() === date.getDate() &&
        currentBookingDate.getMonth() === date.getMonth() &&
        currentBookingDate.getFullYear() === date.getFullYear();

      // If it's the same as current booking date, disable it
      if (isSameDateAsCurrentBooking) {
        return false;
      }
    }

    // If it passes all checks, it's available
    return true;
  };

  const handleDateSelect = (date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(date);
      setShowCalendar(false);
      setErrors((prev) => ({ ...prev, date: false }));
    }
  };

  const formatDateToYYYYMMDD = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async () => {
    // Clear previous errors
    setErrors({});
    const newErrors = {};

    if (!selectedDate) {
      newErrors.date = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        booking_id: order.originalId,
        selected_date: formatDateToYYYYMMDD(selectedDate),
      };

      console.log("📤 Submitting date change request:", payload);

      // Make API call
      const response = await fetch(Update_ATour_BookingDate, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ Date change successful:", result);

      // Call the parent callback with the result
      await onDateChange(result);
      onClose();
    } catch (error) {
      console.error("❌ Error changing date:", error);
      setErrors({ submit: "Failed to change booking date. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1040 }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="modal fade show d-block"
        style={{ zIndex: 1050 }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            {/* Header */}
            <div
              className="modal-header text-white border-0"
              style={{ backgroundColor: "#3554d1" }}
            >
              <div className="d-flex align-items-center">
                <i
                  className="icon-calendar me-3"
                  style={{ fontSize: "1.5rem" }}
                ></i>
                <div>
                  <h5 className="modal-title mb-0">Change Booking Date</h5>
                  <small className="opacity-75">
                    Booking ID: {order?.booking_id}
                  </small>
                </div>
              </div>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body p-4">
              {/* Current Booking Info */}
              <div
                className="alert alert-info border-0 mb-4"
                style={{ backgroundColor: "#e3f2fd" }}
              >
                <div className="d-flex align-items-start">
                  <i className="icon-info text-info me-3 mt-1"></i>
                  <div className="flex-grow-1">
                    <h6 className="mb-2">Current Booking Details</h6>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <strong>Tour:</strong> {order?.tourName}
                      </div>
                      <div className="col-md-6">
                        <strong>Guide:</strong>{" "}
                        {order?.guide || "Standard Package"}
                      </div>
                      <div className="col-md-6">
                        <strong>Current Date:</strong>{" "}
                        {order?.selectedDate &&
                          new Date(order.selectedDate).toLocaleDateString()}
                      </div>
                      <div className="col-md-6">
                        <strong>Travelers:</strong> {order?.participants}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Date Selection */}
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <label className="form-label text-primary fw-semibold mb-3">
                    <i className="icon-calendar me-2"></i>
                    Select New Date
                  </label>

                  {availableDates.length === 0 ? (
                    <div
                      className="form-control d-flex align-items-center bg-light rounded"
                      style={{
                        padding: "12px 16px",
                        height: "48px",
                        border: "1px solid #e0e0e0",
                        color: "#6c757d",
                        cursor: "not-allowed",
                      }}
                    >
                      <i className="icon-calendar text-muted me-2" />
                      <span>No dates available for this tour</span>
                    </div>
                  ) : (
                    <div className="position-relative">
                      <div
                        className="form-control d-flex align-items-center bg-white rounded"
                        style={{
                          cursor: "pointer",
                          padding: "12px 16px",
                          height: "48px",
                          border: errors.date
                            ? "2px solid #ff4d4f"
                            : "1px solid #ddd",
                          boxShadow: errors.date
                            ? "0 0 6px rgba(255, 77, 79, 0.8)"
                            : "none",
                        }}
                        onClick={() => setShowCalendar(!showCalendar)}
                      >
                        <i className="icon-calendar text-primary me-2" />
                        <span className="flex-grow-1">
                          {selectedDate
                            ? formatDate(selectedDate)
                            : "Select New Date"}
                        </span>
                        <i
                          className={`icon-chevron-${
                            showCalendar ? "up" : "down"
                          } text-muted ms-2`}
                        ></i>
                      </div>

                      <Calendar
                        selectedDate={selectedDate}
                        onDateSelect={handleDateSelect}
                        onClose={() => setShowCalendar(false)}
                        isVisible={showCalendar}
                        availableDates={availableDates}
                        isDateAvailable={isDateAvailable}
                      />
                    </div>
                  )}

                  {errors.date && (
                    <small className="text-danger mt-1">
                      <i className="icon-alert-circle me-1"></i>
                      Please select a new date
                    </small>
                  )}

                  {errors.submit && (
                    <div className="alert alert-danger mt-3" role="alert">
                      <i className="icon-alert-circle me-2"></i>
                      {errors.submit}
                    </div>
                  )}
                </div>
              </div>

              {/* Summary */}
              {selectedDate && (
                <div
                  className="alert alert-success border-0 mt-4"
                  style={{ backgroundColor: "#e8f5e8" }}
                >
                  <div className="d-flex align-items-start">
                    <i className="icon-check-circle text-success me-3 mt-1"></i>
                    <div>
                      <h6 className="mb-2">New Booking Summary</h6>
                      <p className="mb-0">
                        Your booking will be changed to{" "}
                        <strong>{formatDate(selectedDate)}</strong>
                      </p>
                      <small className="text-muted d-block mt-2">
                        <strong>Note:</strong> Once your date change request is
                        approved, the tour will become non-cancellable.
                      </small>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="modal-footer border-0 bg-light">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
                disabled={isLoading}
              >
                <i className="icon-x me-2"></i>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={
                  isLoading || !selectedDate || availableDates.length === 0
                }
              >
                {isLoading ? (
                  <>
                    <div
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    Changing Date...
                  </>
                ) : (
                  <>
                    <i className="icon-check me-2"></i>
                    Change Date
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeDate;
