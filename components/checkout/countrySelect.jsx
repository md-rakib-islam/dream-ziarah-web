import React, { useState, useRef, useEffect } from "react";
import countryData from "./countryData";

const CountryCodeSelect = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const selectedCountry =
    countryData.find((c) => c.dialCode === value) || countryData[0];

  const filteredCountries = countryData.filter((country) => {
    const search = searchTerm.toLowerCase();
    return (
      country.name.toLowerCase().includes(search) ||
      country.code.toLowerCase().includes(search) ||
      country.code.toLowerCase().startsWith(search) ||
      country.dialCode.includes(searchTerm) ||
      // Check if country name starts with search term for better matching
      country.name
        .toLowerCase()
        .split(" ")
        .some((word) => word.startsWith(search))
    );
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (country) => {
    onChange(country.dialCode, country.phoneLength);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div
      className="position-relative"
      ref={dropdownRef}
      style={{ flexShrink: 0 }}
    >
      <button
        type="button"
        className="btn d-flex align-items-center gap-2 border"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          // padding: window.innerWidth < 768 ? "2px 2px" : "12px 12px",
          cursor: "pointer",
          backgroundColor: "white",
          borderColor: "#dee2e6",
          borderRadius: "0.375rem 0 0 0.375rem",
          borderRight: "none",
          height: "100%",
          minWidth: window.innerWidth < 768 ? "70px" : "110px",
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            fontSize: window.innerWidth < 768 ? "16px" : "20px",
            lineHeight: "1",
          }}
        >
          {selectedCountry.flag}
        </span>
        <span
          style={{
            fontSize: window.innerWidth < 768 ? "12px" : "14px",
            fontWeight: "500",
            color: "#212529",
            lineHeight: "1",
          }}
        >
          {selectedCountry.dialCode}
        </span>
        <i
          className={`fas fa-chevron-${isOpen ? "up" : "down"}`}
          style={{ fontSize: "10px", color: "#666", marginLeft: "4px" }}
        ></i>
      </button>

      {isOpen && (
        <div
          className="position-absolute bg-white border rounded shadow-lg"
          style={{
            top: "calc(100% + 4px)",
            left: 0,
            minWidth: "320px",
            maxHeight: "320px",
            overflowY: "auto",
            zIndex: 1050,
          }}
        >
          <div
            className="p-2 border-bottom sticky-top bg-white"
            style={{ top: 0, zIndex: 1 }}
          >
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              style={{ fontSize: "14px" }}
              autoFocus
            />
          </div>

          <div>
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <div
                  key={country.code}
                  className="d-flex align-items-center gap-2 px-3 py-2"
                  onClick={() => handleSelect(country)}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedCountry.code === country.code
                        ? "#e3f2fd"
                        : "white",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCountry.code !== country.code) {
                      e.currentTarget.style.backgroundColor = "#f5f5f5";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCountry.code !== country.code) {
                      e.currentTarget.style.backgroundColor = "white";
                    }
                  }}
                >
                  <span style={{ fontSize: "20px" }}>{country.flag}</span>
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center justify-content-between">
                      <span style={{ fontSize: "14px", fontWeight: "500" }}>
                        {country.name}
                      </span>
                      <span
                        style={{
                          fontSize: "13px",
                          color: "#666",
                          fontWeight: "500",
                          marginLeft: "8px",
                        }}
                      >
                        {country.code}
                      </span>
                    </div>
                    <div style={{ fontSize: "12px", color: "#666" }}>
                      {country.dialCode}
                    </div>
                  </div>
                  {selectedCountry.code === country.code && (
                    <i
                      className="fas fa-check text-primary"
                      style={{ fontSize: "14px" }}
                    ></i>
                  )}
                </div>
              ))
            ) : (
              <div
                className="text-center py-3 text-muted"
                style={{ fontSize: "14px" }}
              >
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryCodeSelect;
