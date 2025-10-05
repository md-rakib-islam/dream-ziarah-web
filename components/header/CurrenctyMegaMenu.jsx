"use client";

import { addCurrency } from "@/features/currency/currencySlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const currencyContent = [
  { id: 400, name: "United States dollar", currency: "USD", symbol: "$" },
  { id: 2, name: "Australian dollar", currency: "AUD", symbol: "$" },

  { id: 5, name: "Canadian dollar", currency: "CAD", symbol: "$" },

  { id: 10, name: "Euro", currency: "EUR", symbol: "€" },

  { id: 13, name: "Great Britain Pound", currency: "GBP", symbol: "£" },
  { id: 15, name: "Saudi riyal", currency: "SAR", symbol: "ريال" },
];

const CurrenctyMegaMenu = ({ textClass }) => {
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currencyContent[0]);

  const handleCurrency = () => setClick((prevState) => !prevState);

  const handleItemClick = (item) => {
    setSelectedCurrency(item);
    dispatch(addCurrency(item));
    setClick(false);
  };

  return (
    <>
      {/* Start currencty dropdown wrapper */}
      <div className="col-auto">
        <button
          className={`d-flex items-center text-14 ${textClass}`}
          onClick={handleCurrency}
        >
          <span className="js-currencyMenu-mainTitle">
            {selectedCurrency.currency}
          </span>
          <i className="icon-chevron-sm-down text-7 ml-10" />
        </button>
      </div>
      {/* End currencty dropdown wrapper */}

      <div
        className={`currencyMenu js-currencyMenu ${click ? "" : "is-hidden"}`}
      >
        <div className="currencyMenu__bg" onClick={handleCurrency}></div>
        <div className="currencyMenu__content bg-white rounded-4">
          <div className="d-flex items-center justify-between px-30 py-20 sm:px-15 border-bottom-light">
            <div className="text-20 fw-600 lh-15">Select your currency</div>
            {/* End Title */}

            <button
              className="pointer"
              aria-label="Close"
              onClick={handleCurrency}
            >
              <i className="icon-close" />
            </button>
            {/* End colse button */}
          </div>
          {/* End flex wrapper */}
          <ul className="modalGrid px-30 py-30 sm:px-15 sm:py-15">
            {currencyContent.map((item) => (
              <li
                className={`modalGrid__item js-item ${
                  selectedCurrency.currency === item.currency ? "active" : ""
                }`}
                key={item.id}
                onClick={() => handleItemClick(item)}
              >
                <div className="py-10 px-15 sm:px-5 sm:py-5">
                  <div className="text-15 lh-15 fw-600 text-dark-1">
                    {item.name}
                  </div>
                  <div className="text-14 lh-15 mt-5">
                    <span className="js-title">{item.currency}</span>-{" "}
                    {item.symbol}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CurrenctyMegaMenu;
