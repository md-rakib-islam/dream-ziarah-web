"use client";
import { useState, useEffect } from "react";

const ExpandableFAQ = ({ faqContent }) => {
  const [faqItems, setFaqItems] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    if (!faqContent) return;

    // Parse the HTML string safely using DOMParser
    const parser = new DOMParser();
    const doc = parser.parseFromString(faqContent, "text/html");
    const liElements = Array.from(doc.querySelectorAll("li"));

    const parsed = liElements.map((li) => {
      const strong = li.querySelector("strong");
      const question = strong ? strong.innerText.trim() : "No question found";

      // Remove the strong tag from the answer part
      if (strong) strong.remove();
      const answer = li.innerHTML.replace(/<br\s*\/?>/gi, "").trim(); // preserve all inline tags

      return { question, answer };
    });

    setFaqItems(parsed);
  }, [faqContent]);

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div className="accordion -simple row y-gap-20 js-accordion">
      {faqItems.map((item, idx) => (
        <div className="col-12" key={idx}>
          <div className="accordion__item px-20 py-20 border-light rounded-4">
            <div
              className="accordion__button d-flex items-center cursor-pointer"
              onClick={() => toggleExpand(idx)}
            >
              <div className="accordion__icon size-40 flex-center bg-light-2 rounded-full mr-20">
                <i
                  className={expandedIndex === idx ? "icon-minus" : "icon-plus"}
                />
              </div>
              <div className="button text-dark-1 text-start text-20 fw-600">
                {item.question}
              </div>
            </div>

            {expandedIndex === idx && (
              <div className="pt-15 pl-60">
                <p
                  className=""
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                ></p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpandableFAQ;
