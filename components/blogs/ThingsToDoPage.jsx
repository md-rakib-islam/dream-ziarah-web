// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";

// const ThingsToDoPage = ({ blogs, categories, countries }) => {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const country = searchParams.get("country");

//   const [filterOption, setFilterOption] = useState(countries[0]?.id);
//   const [filteredItems, setFilteredItems] = useState(blogs);

//   useEffect(() => {
//     setFilteredItems(blogs.filter((elm) => elm?.blog_country == filterOption));
//   }, [filterOption, blogs]);

//   useEffect(() => {
//     if (country) {
//       setFilterOption(country);
//     }
//   }, [country]);

//   const handleCountryChange = (option) => {
//     // Update the query params in the URL
//     router.push(`?country=${option}`);
//   };

//   return (
//     <>
//       {blogs.length !== 0 && (
//         <div className="tabs -pills-3 pt-30 js-tabs">
//           <div className="tabs__controls row x-gap-10 justify-center js-tabs-controls">
//             {countries.map((option) => (
//               <div className="col-auto mt-10" key={option.id}>
//                 <button
//                   className={`tabs__button text-14 fw-500 px-20 py-10 rounded-4 bg-light-2 js-tabs-button ${
//                     filterOption == option.id ? "is-tab-el-active" : ""
//                   }`}
//                   onClick={() => handleCountryChange(option.id)}
//                 >
//                   {option.name}
//                 </button>
//               </div>
//             ))}
//           </div>
//           {/* End tab-controls */}

//           <div className="row y-gap-30 pt-30">
//             {filteredItems.map((item, idx) => (
//               <div className="col-lg-4 col-12" key={idx}>
//                 <Link
//                   href={`/blog/${item.slug}`}
//                   className="blogCard -type-1 d-block "
//                 >
//                   <div className="blogCard__image">
//                     <div className="rounded-8">
//                       <Image
//                         width={400}
//                         height={300}
//                         className="cover w-100 img-fluid"
//                         src={item.cloudflare_image}
//                         alt="image"
//                       />
//                     </div>
//                   </div>
//                   <div className="pt-20">
//                     <h3 className="text-dark-1 text-18 fw-500">{item.title}</h3>
//                     <div className="text-light-1 text-15 lh-14 mt-5">
//                       {item.date}
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//             ))}
//           </div>
//           {/* End .row */}
//         </div>
//       )}
//     </>
//   );
// };

// export default ThingsToDoPage;

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Link } from "next/link";

const ThingsToDoPage = ({ blogs, categories }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [visibleCounts, setVisibleCounts] = useState({});

  // const [filterOption, setFilterOption] = useState(orderedCountries[0]?.id);

  // Filter blogs by country - using useMemo to avoid recalculation on every render
  // const filteredItems = useMemo(() => {
  //   return blogs.filter((elm) => elm?.blog_country.id == filterOption);
  // }, [blogs, filterOption]);

  // // Reset visible counts when country changes
  // useEffect(() => {
  //   setVisibleCounts({});
  // }, [filterOption]);

  // Group filtered items by category - using useMemo to avoid recalculation on every render
  const categorizedBlogs = useMemo(() => {
    // Create a map of category ID to blogs
    const categoryMap = {};

    blogs.forEach((blog) => {
      if (!blog.blog_category || !blog.blog_category.id) return;

      const categoryId = blog.blog_category.id;
      if (!categoryMap[categoryId]) {
        categoryMap[categoryId] = [];
      }
      categoryMap[categoryId].push(blog);
    });

    // Convert the map to an array of category objects with their blogs
    return Object.keys(categoryMap).map((categoryId) => {
      // Find the category name from the categories array
      const category = categories.find((cat) => cat.id == categoryId);
      return {
        id: categoryId,
        name: category?.name || "Uncategorized",
        blogs: categoryMap[categoryId],
      };
    });
  }, [blogs, categories]);

  // const handleCountryChange = (option) => {
  //   // Update the query params in the URL
  //   router.push(`?country=${option}`);
  //   // Also update local state immediately for faster UI response
  //   setFilterOption(option);
  // };

  // Handle load more for a specific category
  const handleLoadMore = (categoryId) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [categoryId]: (prev[categoryId] || 3) + 3,
    }));
  };

  return (
    <>
      {blogs.length !== 0 && (
        <div className="tabs -pills-3 pt-30 js-tabs">
          {/* <div className="tabs__controls row x-gap-10 justify-center js-tabs-controls">
            {orderedCountries.map((option) => (
              <div className="col-auto mt-10" key={option.id}>
                <button
                  className={`tabs__button text-14 fw-500 px-20 py-10 rounded-4 bg-light-2 js-tabs-button ${
                    filterOption == option.id ? "is-tab-el-active" : ""
                  }`}
                  onClick={() => handleCountryChange(option.id)}
                >
                  {option.name}
                </button>
              </div>
            ))}
          </div> */}
          {/* End tab-controls */}

          {/* Display blogs grouped by category */}
          {categorizedBlogs.map((category, index) => {
            // Determine how many blogs to show for this category
            const visibleCount = visibleCounts[category.id] || 3;
            const hasMore = category.blogs.length > visibleCount;

            return (
              <div key={index} className="mt-40 mb-20">
                {/* Category heading */}
                <div className=" mb-20">
                  <h2 className="text-24 fw-600 text-center">
                    {category.name}
                  </h2>
                </div>

                {/* Category blogs */}
                <div className="row y-gap-30">
                  {category.blogs.slice(0, visibleCount).map((item, idx) => (
                    <div className="col-lg-4 col-md-6 col-12" key={idx}>
                      <Link
                        href={`/things-to-do/${item.slug}`}
                        className="blogCard -type-1 d-block h-full"
                      >
                        <div className="blogCard__image">
                          <div className="rounded-8">
                            <Image
                              width={400}
                              height={300}
                              className="cover w-100 img-fluid"
                              src={item.cloudflare_image || "/placeholder.svg"}
                              alt={item.title}
                              priority={idx < 3} // Prioritize loading the first few images
                            />
                          </div>
                        </div>
                        <div className="pt-20">
                          <h3 className="text-dark-1 text-18 fw-500">
                            {item.title}
                          </h3>
                          <div className="text-light-1 text-15 lh-14 mt-5">
                            {item.date}
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Load More button */}
                {hasMore && (
                  <div className="row mt-20">
                    <div className="col-12 d-flex justify-center">
                      <button
                        className="button -md -blue-1 bg-blue-1-05 text-blue-1"
                        onClick={() => handleLoadMore(category.id)}
                      >
                        Load More
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* If no categories found */}
          {categorizedBlogs.length === 0 && (
            <div className="row y-gap-30 pt-30">
              <div className="col-12 text-center">
                <p>No blogs found for the selected country.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ThingsToDoPage;
