import React from "react";
import Image from "next/image";
import ExpandableFAQ from "@/components/common/ExpandableFAQ";
import BlogsSide from "../BlogsSide";

const SingleBlogPage = ({
  contentData,
  categoryData,
  countriesData,
  faqContent,
  parsedHeadings,
  parsedFirstParagraph,
  parsedHTML,
  fullUrl,
}) => {
  // Use server-parsed data
  const headings = parsedHeadings || [];
  const firstParagraph = parsedFirstParagraph || '';
  const updatedHTML = parsedHTML || '';

  return (
    <div>
      <section className="layout-pt-md layout-pb-lg blog-content">
        <div className="container">
          <div className="row x-gap-80 y-gap-80 justify-between">
            <div className="col-md-8">
              <div className="row x-gap-20 y-gap-20">
                <div className="col-md-12">
                  {/* Table of Contents */}

                  <h1 className="text-25 fw-600">{contentData.title}</h1>
                  <span> Updated: {contentData.date}</span>
                  <Image
                    src={contentData.cloudflare_image}
                    width={2000}
                    height={700}
                    alt={contentData.image_alt}
                    className="mt-20"
                  ></Image>
                  <div className="mt-20">
                    <p dangerouslySetInnerHTML={{ __html: firstParagraph }}></p>{" "}
                  </div>
                  <div>
                    {headings.length > 0 && (
                      <div className="table-of-contents mb-30 mt-30">
                        <h2 className="text-25 fw-600">Table of Contents</h2>

                        <ul>
                          {headings
                            .reduce((acc, heading, index) => {
                              const lastItem = acc[acc.length - 1];
                              if (heading.level === "H2") {
                                acc.push({
                                  text: `${acc.length + 1}. ${heading.text}`,
                                  id: heading.id,
                                  children: [],
                                });
                              } else if (heading.level === "H3" && lastItem) {
                                lastItem.children.push({
                                  text: `${acc.length}.${
                                    lastItem.children.length + 1
                                  } ${heading.text}`,
                                  id: heading.id,
                                });
                              }
                              return acc;
                            }, [])
                            .map((heading, idx) => (
                              <li key={idx}>
                                <a href={`#${heading.id}`}>{heading.text}</a>
                                {heading.children.length > 0 && (
                                  <ul>
                                    {heading.children.map((child, childIdx) => (
                                      <li key={childIdx}>
                                        <a href={`#${child.id}`}>
                                          {child.text}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                    <div className="blog-content">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: updatedHTML,
                        }}
                      ></div>
                      {/* FAQ Section */}
                      {faqContent && (
                        <div className="faq-section mt-30">
                          <span className="text-25 fw-600 mb-20 text-black">
                            Frequently Asked Questions
                          </span>
                          <ExpandableFAQ faqContent={faqContent} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-40 px-md-0">
              <BlogsSide
                categories={categoryData}
                countriesData={countriesData}
                fullUrl={fullUrl}
              />
            </div>
          </div>
        </div>
      </section>
      {/* Add the script for smooth scrolling */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          document.addEventListener("DOMContentLoaded", function () {
            const links = document.querySelectorAll(".table-of-contents a");
            links.forEach((link) => {
              link.addEventListener("click", (event) => {
                event.preventDefault();
                const targetId = link.getAttribute("href").slice(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                  const headerHeight = 90; // Adjust based on your header height
                  const elementPosition = targetElement.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.scrollY - headerHeight;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  });
                }
              });
            });
          });
        `,
        }}
      ></script>
    </div>
  );
};

export default SingleBlogPage;
