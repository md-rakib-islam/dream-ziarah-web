import { Suspense } from "react";
import dynamic from "next/dynamic";
import {
  GET_CMS_BLOGS,
  GET_METADATA_BY_CONTENT_NAME,
} from "@/constant/constants";
import {
  optimizedDataFetcher,
  CACHE_DURATION,
} from "@/utils/optimizedDataFetcher";
import ErrorBoundary from "@/components/common/ErrorBoundary";

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

// 🚀 OPTIMIZATION: Enhanced metadata fetching with better caching
const fetchMetadata = async () => {
  try {
    // IMPORTANT: Add trailing slash to prevent 301 redirect issues in Edge Runtime
    const res = await fetch(`${GET_METADATA_BY_CONTENT_NAME}/things-to-do`, {
      next: {
        revalidate: 3600, // Cache for 1 hour
        tags: ["things-to-do-metadata"],
      },
      headers: {
        Accept: "application/json",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    const data = await res.json();

    return {
      meta_title:
        data.meta_title ||
        "Things to Do in Italy | Dream Tourism SRLS - Best Activities & Attractions",
      meta_description:
        data.meta_description ||
        "Discover the best things to do in Italy! From Rome's Colosseum to Venice's canals, explore top attractions, activities, and hidden gems with our comprehensive guides.",
      cloudflare_image:
        data.cloudflare_image ||
        data.image ||
        "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/5dbac07d-cbd4-4694-9a38-615bf832f800/public",
      keywords:
        data.keywords ||
        "things to do Italy, Rome attractions, Venice activities, Florence sights, Milan activities, Italy travel guide",
      ...data,
    };
  } catch (error) {
    console.error("Things-to-do metadata fetch error:", error);
    return {
      meta_title:
        "Things to Do in Italy | Dream Tourism SRLS - Best Activities & Attractions",
      meta_description:
        "Discover the best things to do in Italy! From Rome's Colosseum to Venice's canals, explore top attractions, activities, and hidden gems with our comprehensive guides.",
      cloudflare_image:
        "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/5dbac07d-cbd4-4694-9a38-615bf832f800/public",
      keywords:
        "things to do Italy, Rome attractions, Venice activities, Florence sights, Milan activities, Italy travel guide",
    };
  }
};

// 🚀 OPTIMIZATION: Enhanced metadata with better SEO
export async function generateMetadata() {
  const metadata = await fetchMetadata();

  return {
    metadataBase: new URL("https://dreamtourism.it"),
    title: metadata.meta_title,
    description: metadata.meta_description,
    keywords: metadata.keywords,

    // Enhanced Open Graph
    openGraph: {
      title: metadata.meta_title,
      description: metadata.meta_description,
      url: "https://dreamziarah.com/things-to-do",
      siteName: "Dream Tourism SRLS",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: metadata.cloudflare_image,
          width: 1200,
          height: 630,
          alt: metadata.meta_title,
          type: "image/webp",
        },
      ],
    },

    // Enhanced Twitter Cards
    twitter: {
      card: "summary_large_image",
      title: metadata.meta_title,
      description: metadata.meta_description,
      images: [metadata.cloudflare_image],
      creator: "@dreamtourismit",
    },

    // SEO Enhancements
    alternates: {
      canonical: "https://dreamziarah.com/things-to-do",
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Additional metadata
    category: "travel",
    classification: "guide",
  };
}

export default async function ThingsToDoPage({ searchParams }) {
  // 🚀 OPTIMIZATION: Await searchParams before accessing properties (Next.js 15 requirement)
  const params = await searchParams;

  // 🚀 OPTIMIZATION: Safer parameter extraction
  const page = Math.max(1, parseInt(params?.page || "1", 10));

  // 🚀 OPTIMIZATION: Build query string efficiently
  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: "9",
    things_to_do: "true", // Filter for things-to-do blogs only
  });

  try {
    // 🚀 OPTIMIZATION: Enhanced data fetching with better error handling
    const [contentBlogData] = await Promise.all([
      optimizedDataFetcher(`${GET_CMS_BLOGS}?${queryParams.toString()}`, {
        next: {
          revalidate: 900, // 15 minutes
          tags: ["things-to-do-list", `things-to-do-page-${page}`].filter(
            Boolean
          ),
        },
        cache: true,
        cacheDuration: CACHE_DURATION.MEDIUM,
        maxRetries: 2,
        timeout: 10000,
        fallback: { blogs: [], total_pages: 1 },
      }),
    ]);

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

        <ErrorBoundary
          fallback={
            <div className="container py-5">
              <div className="text-center">
                <h1 className="mb-4">Unable to Load Things to Do</h1>
                <p className="text-muted">
                  Please try refreshing the page or contact support.
                </p>
                <a
                  href="/things-to-do"
                  className="btn btn-primary mt-3"
                  style={{ textDecoration: "none" }}
                >
                  Try Again
                </a>
              </div>
            </div>
          }
        >
          <section
            className={`layout-pt-md layout-pb-lg blog-content ${
              blogs.length === 0 ? "vh-100" : ""
            }`}
          >
            <div className="container">
              <div className="row justify-center text-center">
                <div className="col-auto">
                  <div className="sectionTitle -md">
                    <h1 className="sectionTitle__title">
                      Things to Do in Italy
                    </h1>
                    {blogs.length === 0 && (
                      <p className="text-muted mt-3">
                        No activities available at the moment.
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
                <Blog
                  blogs={blogs}
                  currentPage={page}
                  totalPages={totalPages}
                />
              </Suspense>
            </div>
          </section>
        </ErrorBoundary>
      </>
    );
  } catch (error) {
    console.error("ThingsToDoPage error:", error);

    return (
      <>
        <div className="header-margin"></div>
        <section className="layout-pt-md layout-pb-lg blog-content vh-100">
          <div className="container">
            <div className="row justify-center text-center">
              <div className="col-auto">
                <div className="sectionTitle -md">
                  <h1 className="sectionTitle__title">
                    Things to Do Unavailable
                  </h1>
                  <p className="text-muted mt-3">
                    We're experiencing technical difficulties. Please try again
                    later.
                  </p>
                  <a
                    href="/things-to-do"
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
