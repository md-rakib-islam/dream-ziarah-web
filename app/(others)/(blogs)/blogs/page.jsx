import { Suspense } from "react";
import dynamic from "next/dynamic";
import { GET_CMS_BLOGS } from "@/constant/constants";
import {
  optimizedDataFetcher,
  CACHE_DURATION,
} from "@/utils/optimizedDataFetcher";

// Edge Runtime required for Cloudflare Pages
export const runtime = "edge";

// 🚀 OPTIMIZATION: Lazy load Blog component to reduce initial bundle size
const Blog = dynamic(() => import("@/components/blogs/Blog"), {
  ssr: true,
  loading: () => (
    <div
      className="blogs-loading-skeleton"
      style={{ minHeight: "400px", padding: "40px 0" }}
    >
      <div className="container">
        <div className="row y-gap-30">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="col-lg-4 col-md-6">
              <div
                style={{
                  height: "280px",
                  background: "#f3f4f6",
                  borderRadius: "12px",
                  animation: "pulse 1.5s ease-in-out infinite",
                  animationDelay: `${i * 0.1}s`,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
});

export default async function BlogsPage({ searchParams }) {
  // 🚀 OPTIMIZATION: Await searchParams before accessing properties (Next.js 15 requirement)
  const params = await searchParams;

  // 🚀 OPTIMIZATION: Safer parameter extraction
  const page = Math.max(1, parseInt(params?.page || "1", 10));

  // 🚀 OPTIMIZATION: Build query string efficiently
  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: "9",
    things_to_do: "false",
  });

  try {
    console.log("🚀 Fetching blogs...");
    console.log("📌 Page:", page);
    console.log("🌐 URL:", `${GET_CMS_BLOGS}?${queryParams.toString()}`);

    // 🚀 OPTIMIZATION: Enhanced data fetching with better error handling
    const contentBlogData = await optimizedDataFetcher(
      `${GET_CMS_BLOGS}?${queryParams.toString()}`,
      {
        next: {
          revalidate: 900, // 15 minutes
          tags: ["blog-list", `blog-page-${page}`].filter(Boolean),
        },
        cache: true,
        cacheDuration: CACHE_DURATION.MEDIUM,
        maxRetries: 2,
        timeout: 10000,
        fallback: { blogs: [], total_pages: 1 },
      }
    );

    console.log("✅ Blogs fetched successfully");
    console.log("📦 Blogs count:", contentBlogData?.blogs?.length || 0);
    console.log("📦 Total pages:", contentBlogData?.total_pages || 1);

    const blogs = Array.isArray(contentBlogData?.blogs)
      ? contentBlogData.blogs
      : [];
    const totalPages = Math.max(1, contentBlogData?.total_pages || 1);

    return (
      <>
        {/* 🚀 CRITICAL: Inline critical CSS */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .header-margin{margin-top:80px}
            .sectionTitle__title{font-size:2.5rem;font-weight:700;color:#333;margin-bottom:1rem}
            .blog-content{min-height:60vh;padding:80px 0}
            .container{max-width:1200px;margin:0 auto;padding:0 15px}
            .row{display:flex;flex-wrap:wrap;margin:0 -15px}
            .col-auto{flex:0 0 auto;padding:0 15px}
            .justify-center{justify-content:center}
            .text-center{text-align:center}
            @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.7}}
            @media(max-width:768px){
              .sectionTitle__title{font-size:2rem}
              .blog-content{padding:40px 0}
            }
          `,
          }}
        />

        <div className="header-margin"></div>

        <section
          className={`layout-pt-md layout-pb-lg blog-content ${
            blogs.length === 0 ? "vh-100" : ""
          }`}
        >
          <div className="container">
            <div className="row justify-center text-center">
              <div className="col-auto">
                <div className="sectionTitle -md">
                  <h1 className="sectionTitle__title">Latest Blog Posts</h1>
                  {blogs.length === 0 && (
                    <p className="text-muted mt-3">
                      No blog posts available at the moment.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Suspense
              fallback={
                <div
                  className="blogs-loading-skeleton"
                  style={{ minHeight: "400px", padding: "40px 0" }}
                >
                  <div className="container">
                    <div className="row y-gap-30">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="col-lg-4 col-md-6">
                          <div
                            style={{
                              height: "280px",
                              background: "#f3f4f6",
                              borderRadius: "12px",
                              animation: "pulse 1.5s ease-in-out infinite",
                            }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              }
            >
              <Blog blogs={blogs} currentPage={page} totalPages={totalPages} />
            </Suspense>
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.error("❌ BlogsPage error:", error);

    return (
      <>
        <div className="header-margin"></div>
        <section className="layout-pt-md layout-pb-lg blog-content vh-100">
          <div className="container">
            <div className="row justify-center text-center">
              <div className="col-auto">
                <div className="sectionTitle -md">
                  <h1 className="sectionTitle__title">Blog Unavailable</h1>
                  <p className="text-muted mt-3">
                    We're experiencing technical difficulties. Please try again
                    later.
                  </p>
                  <a
                    href="/blogs"
                    className="btn btn-primary mt-3"
                    style={{ textDecoration: "none" }}
                  >
                    Try Again
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
