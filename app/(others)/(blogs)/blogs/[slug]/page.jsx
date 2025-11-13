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

export const runtime = "edge";

// Helper function to parse blog HTML on server-side
function parseBlogHTML(html) {
  console.log("🔍 parseBlogHTML called");
  console.log("HTML length:", html?.length || 0);

  if (!html) {
    console.log("⚠️ No HTML provided to parseBlogHTML");
    return { headings: [], firstParagraph: "", updatedHTML: "" };
  }

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

  console.log("📝 Parsed headings count:", headings.length);
  console.log("📝 First paragraph length:", firstParagraph?.length || 0);

  // Remove the first paragraph from the content to avoid duplication
  if (firstParagraph) {
    $("p").first().remove();
  }

  // Get the updated HTML by calling $() without selector
  const updatedHTML = $().html();

  return { headings, firstParagraph, updatedHTML };
}

// 🚀 OPTIMIZATION: Lazy load SingleBlogPage to reduce initial bundle size
const SingleBlogPage = dynamic(
  () => import("@/components/blogs/singleBlogPage/SingleBlogPage"),
  {
    ssr: true,
    loading: () => (
      <div
        className="single-blog-skeleton"
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

const BlogPost = async ({ params }) => {
  console.log("\n\n🚀 ========== BlogPost Component Called ==========");
  const { slug } = await params;
  console.log("📌 Slug:", slug);

  const fullUrl = `https://dreamtourism.it/blogs/${slug}`;
  console.log("🌐 Full URL:", fullUrl);

  try {
    console.log("\n⏳ Starting parallel data fetching...");
    console.log("🔗 Blog URL:", `${GET_CMS_BLOG_BY_TITLE}/${slug}`);
    console.log("🔗 Categories URL:", BLOG_CATEGORIES);
    console.log("🔗 Countries URL:", GET_ALL_COUNTRIES);

    // Fetch all data in parallel
    const [blogContent, categoryData, countriesData] = await Promise.all([
      optimizedDataFetcher(`${GET_CMS_BLOG_BY_TITLE}/${slug}`, {
        next: {
          revalidate: 1800, // 30 minutes
          tags: [`blog-${slug}`, "blog-content"],
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

    console.log("\n✅ All parallel fetches completed");
    console.log("📦 blogContent:", blogContent ? "EXISTS" : "NULL/UNDEFINED");
    console.log(
      "📦 blogContent keys:",
      blogContent ? Object.keys(blogContent) : "N/A"
    );
    console.log("📦 blogContent.title:", blogContent?.title);
    console.log("📦 categoryData:", categoryData ? "EXISTS" : "NULL/UNDEFINED");
    console.log(
      "📦 countriesData:",
      countriesData ? "EXISTS" : "NULL/UNDEFINED"
    );

    // Check if blog content exists and is valid
    if (blogContent && blogContent.title) {
      console.log("\n✨ Blog content is VALID - proceeding to render");
      console.log("📝 Blog title:", blogContent.title);

      // Parse HTML on server-side for Edge Runtime compatibility
      console.log("\n🔄 Parsing blog HTML...");
      const { headings, firstParagraph, updatedHTML } = parseBlogHTML(
        blogContent.description
      );
      console.log("✅ HTML parsing complete");

      console.log("\n🎨 Rendering SingleBlogPage component");

      return (
        <>
          {/* 🚀 CRITICAL: Inline critical CSS for better LCP */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
              .header-margin{margin-top:80px}
              .container{max-width:1200px;margin:0 auto;padding:0 15px}
              .single-blog-content{padding:40px 0}
              .article-title{font-size:2.5rem;font-weight:700;color:#333;margin-bottom:2rem;line-height:1.3}
              .article-image{width:100%;height:400px;object-fit:cover;border-radius:12px;margin-bottom:2rem}
              @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.7}}
              @media(max-width:768px){
                .article-title{font-size:2rem}
                .article-image{height:250px}
                .single-blog-content{padding:20px 0}
              }
            `,
            }}
          />

          <div className="header-margin"></div>

          <Suspense
            fallback={
              <div
                className="single-blog-skeleton"
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
        </>
      );
    }

    // Blog not found
    console.log("\n❌ Blog content validation FAILED");
    console.log("❌ blogContent:", blogContent);
    console.log("🚫 Calling notFound()");
    return notFound();
  } catch (error) {
    console.error("\n❌❌❌ FATAL ERROR in BlogPost ❌❌❌");
    console.error("❌ Slug:", slug);
    console.error("❌ Error:", error);
    console.error("❌ Error message:", error.message);
    console.error("❌ Error stack:", error.stack);
    console.log("🚫 Calling notFound() due to error");
    return notFound();
  }
};

export default BlogPost;
