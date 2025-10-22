import DefaultFooter from "@/components/footer/default";
import Header from "@/components/header/header";
import ClientProviders from "@/components/providers/ClientProviders";
import AnalyticsScripts from "@/components/analytics/AnalyticsScripts";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../styles/index.scss";
import "../styles/overflow-fix.css";
import "../styles/islamic-patterns.css";

/**
 * Root Layout - Server Component
 * This is now a Server Component for better performance and SEO
 */
export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://dreamziarah.com"
  ),
  title: {
    default: "Dream Ziarah | Hajj, Umrah & Ziyarat Tours",
    template: "%s | Dream Ziarah",
  },
  description: "Premium Hajj, Umrah and Ziyarat tour packages in Saudi Arabia",
  keywords: [
    "Hajj",
    "Umrah",
    "Ziyarat",
    "Makkah",
    "Madinah",
    "Saudi Arabia",
    "Islamic Tours",
  ],
  authors: [{ name: "Dream Ziarah" }],
  creator: "Dream Ziarah",
  publisher: "Dream Ziarah",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ overflowX: "hidden" }}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        {/* Analytics Scripts */}
        <AnalyticsScripts />
      </head>

      <body suppressHydrationWarning={true} style={{ overflowX: "hidden" }}>
        {/* GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MDFK259S"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* Facebook Pixel noscript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=601415156126587&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <ClientProviders>
          <Header />
          <main style={{ minHeight: "70vh", overflowX: "hidden" }}>
            {children}
          </main>
          <DefaultFooter />
        </ClientProviders>
      </body>
    </html>
  );
}
