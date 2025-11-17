import React from "react";

const FrequentlyQ = ({ faqDescription }) => {
  // Parse the HTML string to extract FAQ items
  const parseFAQData = (htmlString) => {
    if (!htmlString) return [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    const faqItems = [];
    const h3Elements = doc.querySelectorAll("h3");

    h3Elements.forEach((h3, index) => {
      const question = h3.textContent.trim();
      let answer = "";
      let nextElement = h3.nextElementSibling;

      // Collect all content until the next h3 or end
      while (nextElement && nextElement.tagName !== "H3") {
        if (nextElement.tagName === "P") {
          answer += nextElement.innerHTML;
        } else if (nextElement.tagName === "UL") {
          answer += nextElement.outerHTML;
        }
        nextElement = nextElement.nextElementSibling;
      }

      if (question && answer) {
        faqItems.push({
          id: index + 1,
          title: question,
          content: answer,
          collapseTarget: `faq${index + 1}`,
        });
      }
    });

    return faqItems;
  };

  const faqItems = parseFAQData(faqDescription);

  // Split items into two columns
  const leftColumnItems = faqItems.filter((_, index) => index % 2 === 0);
  const rightColumnItems = faqItems.filter((_, index) => index % 2 === 1);

  const renderColumn = (items, parentId) => (
    <div className="col-lg-6">
      <style jsx>{`
        .accordion__button .icon-plus {
          display: block;
        }
        .accordion__button .icon-minus {
          display: none;
        }
        .accordion__button[aria-expanded="true"] .icon-plus {
          display: none;
        }
        .accordion__button[aria-expanded="true"] .icon-minus {
          display: block;
        }
        .accordion__icon {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
      `}</style>
      {items.map((item) => (
        <div key={item.id} className="mb-30">
          <div className="accordion__item px-20 py-20 border-light rounded-4">
            <div
              className="accordion__button d-flex items-center"
              data-bs-toggle="collapse"
              data-bs-target={`#${item.collapseTarget}`}
            >
              <div className="accordion__icon size-40 flex-center bg-light-2 rounded-full mr-20">
                <i className="icon-plus" />
                <i className="icon-minus" />
              </div>
              <div className="button text-dark-1 text-start">{item.title}</div>
            </div>
            {/* End accordion button */}

            <div
              className="accordion-collapse collapse"
              id={item.collapseTarget}
              data-bs-parent={`#${parentId}`}
            >
              <div className="pt-15 pl-60">
                <div
                  className="text-15"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
            </div>
            {/* End accordion content */}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {renderColumn(leftColumnItems, "FaqLeft")}
      {renderColumn(rightColumnItems, "FaqRight")}
    </>
  );
};

export default FrequentlyQ;
