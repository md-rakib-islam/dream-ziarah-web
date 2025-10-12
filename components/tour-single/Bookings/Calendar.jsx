"use client";

import { useState, useEffect, useRef } from "react";

const Calendar = ({
  selectedDate,
  onDateSelect,
  onClose,
  isVisible,
  availableDates = [],
  isDateAvailable,
}) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowMonthStart = new Date(
      tomorrow.getFullYear(),
      tomorrow.getMonth()
    );

    // If no available dates provided, start from tomorrow's month
    if (!availableDates || availableDates.length === 0) {
      return tomorrowMonthStart;
    }

    // Filter available dates to only include tomorrow and future dates
    const futureAvailableDates = availableDates.filter((date) => {
      const availableDate = new Date(date);
      const availableMonthStart = new Date(
        availableDate.getFullYear(),
        availableDate.getMonth()
      );
      return availableMonthStart >= tomorrowMonthStart;
    });

    // If there are available dates in tomorrow's month or future, start from the earliest
    if (futureAvailableDates.length > 0) {
      const sortedDates = [...futureAvailableDates].sort((a, b) => a - b);
      const firstAvailableDate = sortedDates[0];
      return new Date(
        firstAvailableDate.getFullYear(),
        firstAvailableDate.getMonth()
      );
    }

    // Fallback to tomorrow's month if no future available dates
    return tomorrowMonthStart;
  });

  const [isMobile, setIsMobile] = useState(false);
  const [flipAbove, setFlipAbove] = useState(false);
  const calendarRef = useRef(null);
  const [alignRight, setAlignRight] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Update current month when availableDates change, but only if needed
    const today = new Date();
    const currentMonthStart = new Date(today.getFullYear(), today.getMonth());

    if (availableDates && availableDates.length > 0) {
      // Filter available dates to only include current month and future months
      const futureAvailableDates = availableDates.filter((date) => {
        const availableDate = new Date(date);
        const availableMonthStart = new Date(
          availableDate.getFullYear(),
          availableDate.getMonth()
        );
        return availableMonthStart >= currentMonthStart;
      });

      if (futureAvailableDates.length > 0) {
        const sortedDates = [...futureAvailableDates].sort((a, b) => a - b);
        const firstAvailableDate = sortedDates[0];
        const optimalMonth = new Date(
          firstAvailableDate.getFullYear(),
          firstAvailableDate.getMonth()
        );

        // Only update if current month doesn't have the optimal starting month
        if (currentMonth.getTime() !== optimalMonth.getTime()) {
          setCurrentMonth(optimalMonth);
        }
      }
    }
  }, [availableDates]); // Re-run when availableDates change

  useEffect(() => {
    if (calendarRef.current && !isMobile) {
      const parent = calendarRef.current.parentElement;
      if (!parent) return;

      const parentRect = parent.getBoundingClientRect();
      const calendarRect = calendarRef.current.getBoundingClientRect();

      const calendarWidth = 420;
      const calendarHeight = 350;

      const spaceBelow = window.innerHeight - parentRect.bottom;
      const spaceAbove = parentRect.top;

      // Flip vertically if not enough space below
      setFlipAbove(spaceBelow < calendarHeight && spaceAbove > calendarHeight);

      // Horizontal alignment inside container
      const containerRightSpace = parentRect.right - calendarWidth;
      if (containerRightSpace < 0) {
        setAlignRight(true);
      } else {
        setAlignRight(false);
      }
    }
  }, [isVisible, isMobile]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const handlePrevMonth = () => {
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1
    );
    // Don't allow going to months before current month
    const currentDate = new Date();
    const currentMonthYear = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );

    if (newMonth >= currentMonthYear) {
      setCurrentMonth(newMonth);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const handleDateClick = (day) => {
    if (day) {
      const newDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );

      // Check if date is not in the past and is available
      if (
        isDateNotInPast(newDate) &&
        (!isDateAvailable || isDateAvailable(newDate))
      ) {
        onDateSelect(newDate);
        onClose();
      }
    }
  };

  // Helper function to check if date is not in the past
  const isDateNotInPast = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0); // Reset time to start of day
    return checkDate >= today;
  };

  const days = getDaysInMonth(currentMonth);
  const selectedDay =
    selectedDate &&
    selectedDate.getMonth() === currentMonth.getMonth() &&
    selectedDate.getFullYear() === currentMonth.getFullYear()
      ? selectedDate.getDate()
      : null;

  // Check if we can go to previous month
  const currentDate = new Date();
  const canGoPrev =
    currentMonth > new Date(currentDate.getFullYear(), currentDate.getMonth());

  if (!isVisible) return null;

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 700 }}
          onClick={onClose}
        />
      )}

      <div
        ref={calendarRef}
        className="bg-white border rounded shadow-lg p-3"
        style={{
          position: isMobile ? "fixed" : "absolute",
          top: isMobile ? "50%" : flipAbove ? "auto" : "100%",
          bottom: flipAbove ? "100%" : "auto",
          left: isMobile ? "50%" : alignRight ? "auto" : "0",
          right: alignRight ? "0" : "auto",
          transform: isMobile ? "translate(-50%, -50%)" : "none",
          zIndex: 700,
          width: isMobile ? "90vw" : "380px",
          maxWidth: isMobile ? "350px" : "420px",
          marginTop: isMobile ? "0" : flipAbove ? "0" : "8px",
          marginBottom: flipAbove ? "8px" : "0",
          maxHeight: isMobile ? "80vh" : "350px",
          overflowY: "auto",
        }}
      >
        {/* Calendar Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button
            className="btn btn-link p-1"
            onClick={handlePrevMonth}
            type="button"
            disabled={!canGoPrev}
            style={{
              minWidth: "40px",
              height: "40px",
              opacity: canGoPrev ? 1 : 0.5,
              cursor: canGoPrev ? "pointer" : "not-allowed",
            }}
          >
            <i className="icon icon-chevron-left"></i>
          </button>
          <h6 className="mb-0 fw-bold text-center flex-grow-1">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h6>
          <button
            className="btn btn-link p-1"
            onClick={handleNextMonth}
            type="button"
            style={{ minWidth: "40px", height: "40px" }}
          >
            <i className="icon icon-chevron-right"></i>
          </button>
        </div>

        {/* Day Names */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "2px",
            textAlign: "center",
          }}
        >
          {dayNames.map((day) => (
            <div key={day} className="fw-bold text-muted py-1">
              <small>{isMobile ? day.charAt(0) : day}</small>
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "2px",
            textAlign: "center",
          }}
        >
          {days.map((day, index) => {
            if (!day) {
              return <div key={index} style={{ minHeight: "35px" }} />;
            }

            const currentDate = new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth(),
              day
            );

            const isNotInPast = isDateNotInPast(currentDate);
            const isCustomAvailable = isDateAvailable
              ? isDateAvailable(currentDate)
              : true;
            const isAvailable = isNotInPast && isCustomAvailable;
            const isSelected = day === selectedDay;

            return (
              <button
                key={index}
                className={`btn w-100 border-0 ${
                  isSelected
                    ? "btn-primary text-white"
                    : isAvailable
                    ? "btn-light text-dark"
                    : "btn-light text-muted"
                }`}
                onClick={() => handleDateClick(day)}
                type="button"
                disabled={!isAvailable}
                style={{
                  minHeight: "35px",
                  opacity: isAvailable ? 1 : 0.3,
                  fontSize: "14px",
                  fontWeight: isAvailable ? "bold" : "normal",
                  padding: 0,
                  cursor: isAvailable ? "pointer" : "not-allowed",
                }}
              >
                {day}
              </button>
            );
          })}
        </div>

        {isMobile && (
          <div className="text-center mt-3">
            <button
              className="btn btn-secondary px-4"
              onClick={onClose}
              type="button"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Calendar;
