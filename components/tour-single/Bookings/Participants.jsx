"use client";

import { useState, useEffect } from "react";

const Participants = ({
  onParticipantChange,
  maxParticipants = 1,
  hasError = false,
}) => {
  const [participantCount, setParticipantCount] = useState(1);

  useEffect(() => {
    // Set initial value and notify parent
    if (onParticipantChange) {
      onParticipantChange(participantCount);
    }
  }, []);

  const handleParticipantCountChange = (e) => {
    const value = e.target.value;

    // Allow only numbers
    if (!/^\d*$/.test(value)) {
      return;
    }

    const numValue = Number.parseInt(value) || 0;

    // Don't allow 0 or empty, set to 1 as minimum
    if (numValue === 0 && value !== "") {
      return;
    }

    // Clamp to max participants
    const clampedValue =
      numValue > maxParticipants ? maxParticipants : numValue;

    // If empty string, allow it temporarily for user input
    if (value === "") {
      setParticipantCount("");
    } else {
      setParticipantCount(clampedValue);
    }

    // Notify parent component of changes (use 1 as minimum if empty)
    if (onParticipantChange) {
      onParticipantChange(clampedValue || 1);
    }
  };

  return (
    <div className="participants-container">
      <div className="mb-3">
        <div
          className="form-control d-flex align-items-center justify-content-between bg-white border-0 rounded"
          style={{
            padding: "12px 16px",
            height: "48px",
            border: hasError ? "2px solid #dc3545" : "none",
          }}
        >
          <div className="d-flex align-items-center">
            <i className="fas fa-users me-2 text-muted"></i>
            <span>Participants</span>
          </div>
          <div
            className="d-flex align-items-center"
            style={{
              borderLeft: "1px solid black",
              paddingLeft: "12px",
              width: "150px",
              justifyContent: "space-between",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <label htmlFor="participantCount" className="visually-hidden">
              Number of Participants
            </label>
            <input
              id="participantCount"
              type="text"
              className="form-control border-0 bg-transparent text-end fw-bold"
              style={{
                width: "80px",
                minWidth: "60px",
                border: "1px solid #dee2e6", // subtle border
                boxShadow: "0 1px 3px rgba(0,0,0,0.5)", // soft shadow
                borderRadius: "6px", // slight rounding
              }}
              value={participantCount}
              onChange={handleParticipantCountChange}
              min="1"
              max={maxParticipants}
              inputMode="numeric"
              pattern="[0-9]*"
            />
            <span className="text-muted ms-1">/max {maxParticipants}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Participants;
