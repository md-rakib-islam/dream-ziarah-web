"use client";

import Image from "next/image";
import BlogPagination from "./BlogPagination";
import Link from "next/link";

const Blog = ({ blogs, currentPage, totalPages }) => {
  return (
    <>
      <div className="tabs -pills-3 pt-30 js-tabs">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle -md">
              {blogs.length === 0 && (
                <p className="sectionTitle__text mt-10 sm:mt-0">
                  There are no blog posts.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="row y-gap-30 pt-30">
          {blogs?.map((item, idx) => (
            <div className="col-lg-4 col-sm-6" key={idx}>
              <Link
                href={
                  item.title.toLowerCase().includes("things to do")
                    ? `/things-to-do/${item.slug}`
                    : `/blogs/${item.slug}`
                }
                className="blogCard -type-1 d-block "
              >
                <div className="blogCard__image">
                  <div className="rounded-8">
                    <Image
                      width={400}
                      height={300}
                      className="cover w-100 img-fluid"
                      src={item.cloudflare_image}
                      alt="image"
                    />
                  </div>
                </div>
                <div className="pt-20">
                  <h2 className="text-dark-1 text-20 fw-500">{item.title}</h2>
                  <div className="text-light-1 text-15 lh-14 mt-5">
                    {item.date}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {blogs.length !== 0 && (
          <BlogPagination currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
    </>
  );
};

export default Blog;
