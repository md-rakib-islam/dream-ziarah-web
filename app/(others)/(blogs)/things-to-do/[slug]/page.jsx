import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import {
  BLOG_CATEGORIES,
  GET_ALL_COUNTRIES,
  GET_CMS_BLOG_BY_TITLE,
} from "@/constant/constants";
import {
  optimizedDataFetcher,
  CACHE_DURATION,
} from "@/utils/optimizedDataFetcher";
import { notFound } from "next/navigation";
import { load } from "@/utils/htmlParser";
import ErrorBoundary from "@/components/common/ErrorBoundary";

export const runtime = "edge";

// Helper function to parse blog HTML on server-side
function parseBlogHTML(html) {
  if (!html) return { headings: [], firstParagraph: "", updatedHTML: "" };

  const $ = load(html);
  const headings = [];
  let firstParagraph = $("p").first().html() || "";

  $("h1, h2, h3").each((index, element) => {
    const level = $(element).prop("tagName");
    const text = $(element).text();
    const id = text.toLowerCase().replace(/\s+/g, "-");
    $(element).attr("id", id);
    headings.push({ id, text, level });
  });

  // Remove the first paragraph from the content to avoid duplication
  if (firstParagraph) {
    $("p").first().remove();
  }

  // Get the updated HTML by calling $() without selector
  const updatedHTML = $().html();

  return { headings, firstParagraph, updatedHTML };
}

// 🚀 OPTIMIZATION: Lazy load SingleBlogPage for things-to-do
const SingleBlogPage = dynamic(
  () => import("@/components/blogs/singleBlogPage/SingleBlogPage"),
  {
    ssr: true,
    loading: () => (
      <div
        className="things-to-do-skeleton"
        style={{ minHeight: "80vh", padding: "40px 0" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div
                style={{
                  height: "400px",
                  background: "#f3f4f6",
                  borderRadius: "12px",
                  marginBottom: "30px",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              ></div>
              <div
                style={{
                  height: "60px",
                  background: "#f3f4f6",
                  borderRadius: "8px",
                  marginBottom: "20px",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              ></div>
              <div
                style={{
                  height: "200px",
                  background: "#f3f4f6",
                  borderRadius: "8px",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              ></div>
            </div>
            <div className="col-lg-4">
              <div
                style={{
                  height: "300px",
                  background: "#f3f4f6",
                  borderRadius: "12px",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    ),
  }
);

// 🚀 OPTIMIZATION: Enhanced metadata generation for things-to-do
export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    // NOTE: Blog API does NOT use trailing slash (returns 404 with slash)
    const blogData = await optimizedDataFetcher(
      `${GET_CMS_BLOG_BY_TITLE}/${slug}`,
      {
        next: {
          revalidate: 3600, // 1 hour
          tags: [`things-to-do-${slug}`, "things-to-do-metadata"],
        },
        cache: true,
        cacheDuration: CACHE_DURATION.LONG,
        maxRetries: 2,
        timeout: 8000,
        fallback: null,
      }
    );

    if (
      blogData &&
      blogData.meta_title &&
      blogData.title?.toLowerCase().includes("things to do")
    ) {
      return {
        metadataBase: new URL("https://dreamtourism.it"),
        title: blogData.meta_title,
        description: blogData.meta_description,
        keywords:
          blogData.keywords ||
          `${blogData.title}, things to do, Italy activities, ${slug.replace(
            /-/g,
            " "
          )}`,

        // Enhanced Open Graph
        openGraph: {
          title: blogData.meta_title,
          description: blogData.meta_description,
          url: `https://dreamziarah.com/things-to-do/${slug}`,
          siteName: "Dream Tourism SRLS",
          locale: "en_US",
          type: "article",
          images: [
            {
              url: blogData.cloudflare_image,
              width: 1200,
              height: 630,
              alt: blogData.meta_title,
              type: "image/webp",
            },
          ],
          publishedTime: blogData.created_at,
          modifiedTime: blogData.updated_at,
          authors: ["Dream Tourism SRLS"],
          section: "Things to Do",
        },

        // Enhanced Twitter Cards
        twitter: {
          card: "summary_large_image",
          title: blogData.meta_title,
          description: blogData.meta_description,
          images: [blogData.cloudflare_image],
          creator: "@dreamtourismit",
        },

        // SEO Enhancements
        alternates: {
          canonical: `https://dreamziarah.com/things-to-do/${slug}`,
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

        // Activity-specific metadata
        category: "travel",
        classification: "activity-guide",
      };
    }
  } catch (error) {
    console.error(`Things-to-do metadata fetch error for ${slug}:`, error);
  }

  // Fallback metadata for invalid/missing content
  return {
    robots: {
      index: false,
      follow: false,
    },
  };
}

const ThingsToDoPost = async ({ params }) => {
  const { slug } = await params;
  const fullUrl = `https://dreamziarah.com/things-to-do/${slug}`;

  try {
    // 🚀 OPTIMIZATION: Enhanced parallel data fetching with better error handling
    // NOTE: Blog API does NOT use trailing slash (returns 404 with slash)
    const [blogContent, categoryData, countriesData] = await Promise.all([
      optimizedDataFetcher(`${GET_CMS_BLOG_BY_TITLE}/${slug}`, {
        next: {
          revalidate: 1800, // 30 minutes
          tags: [`things-to-do-${slug}`, "things-to-do-content"],
        },
        cache: true,
        cacheDuration: CACHE_DURATION.MEDIUM,
        maxRetries: 2,
        timeout: 10000,
        fallback: null,
      }),
      optimizedDataFetcher(BLOG_CATEGORIES, {
        next: { revalidate: 3600 }, // 1 hour
        cache: true,
        cacheDuration: CACHE_DURATION.LONG,
        maxRetries: 2,
        fallback: { blog_categories: [] },
      }),
      optimizedDataFetcher(GET_ALL_COUNTRIES, {
        next: { revalidate: 3600 }, // 1 hour
        cache: true,
        cacheDuration: CACHE_DURATION.LONG,
        maxRetries: 2,
        fallback: { countries: [] },
      }),
    ]);

    // Check if content exists and is actually a "things to do" post
    if (
      blogContent &&
      blogContent.title &&
      blogContent.title.toLowerCase().includes("things to do")
    ) {
      // Parse HTML on server-side for Edge Runtime compatibility
      const { headings, firstParagraph, updatedHTML } = parseBlogHTML(
        blogContent.description
      );

      return (
        <>
          {/* 🚀 CRITICAL: Inline critical CSS for better LCP */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
              .header-margin{margin-top:80px}
              .container{max-width:1200px;margin:0 auto;padding:0 15px}
              .things-to-do-content{padding:40px 0}
              .activity-title{font-size:2.5rem;font-weight:700;color:#333;margin-bottom:2rem;line-height:1.3}
              .activity-image{width:100%;height:400px;object-fit:cover;border-radius:12px;margin-bottom:2rem}
              .activity-description{font-size:1.1rem;line-height:1.7;color:#444}
              @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.7}}
              @media(max-width:768px){
                .activity-title{font-size:2rem}
                .activity-image{height:250px}
                .things-to-do-content{padding:20px 0}
              }
            `,
            }}
          />

          <div className="header-margin"></div>

          <ErrorBoundary
            fallback={
              <div className="container py-5">
                <div className="text-center">
                  <h1 className="mb-4">Unable to Load Activity Guide</h1>
                  <p className="text-muted">
                    This activity guide may have been moved or is temporarily
                    unavailable.
                  </p>
                  <a href="/things-to-do" className="btn btn-primary mt-3">
                    Browse All Activities
                  </a>
                </div>
              </div>
            }
          >
            <Suspense
              fallback={
                <div
                  className="things-to-do-skeleton"
                  style={{ minHeight: "80vh", padding: "40px 0" }}
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-8">
                        <div
                          style={{
                            height: "60px",
                            background: "#f3f4f6",
                            borderRadius: "8px",
                            marginBottom: "20px",
                            animation: "pulse 1.5s ease-in-out infinite",
                          }}
                        ></div>
                        <div
                          style={{
                            height: "400px",
                            background: "#f3f4f6",
                            borderRadius: "12px",
                            marginBottom: "30px",
                            animation: "pulse 1.5s ease-in-out infinite",
                          }}
                        ></div>
                        <div
                          style={{
                            height: "200px",
                            background: "#f3f4f6",
                            borderRadius: "8px",
                            animation: "pulse 1.5s ease-in-out infinite",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            >
              <SingleBlogPage
                contentData={blogContent}
                categoryData={categoryData}
                countriesData={countriesData?.countries || []}
                faqContent={blogContent.faq_content || ""}
                parsedHeadings={headings}
                parsedFirstParagraph={firstParagraph}
                parsedHTML={updatedHTML}
                fullUrl={fullUrl}
              />
            </Suspense>
          </ErrorBoundary>
        </>
      );
    }

    // Content not found or not a "things to do" post
    return notFound();
  } catch (error) {
    console.error(`Things-to-do page error for ${slug}:`, error);
    return notFound();
  }
};

export default ThingsToDoPost;
