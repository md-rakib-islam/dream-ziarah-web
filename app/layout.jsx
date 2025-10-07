"use client";
import DefaultFooter from "@/components/footer/default";
import Header from "@/components/header/header";
import Aos from "aos";
import "aos/dist/aos.css";
// import Script from 'next/script';
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SrollTop from "../components/common/ScrollTop";
import { store } from "../store/store";
import "../styles/index.scss";
import CookieConsent from "@/components/cookie/CookieConsent";
import { usePathname } from "next/navigation";
import AuthInitializer from "@/components/authInitializer/AuthInitializer";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export default function RootLayout({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);

  const pathname = usePathname();

  const isCheckout = pathname.startsWith("/checkout");
  return (
    <html lang="en">
      <head>
        {/* old*/}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* google tag manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MDFK259S');
            `,
          }}
        />
        {/* Google Analytics */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-070B3EHKMD');
              `,
          }}
        ></script>

        {/* end*/}

        {/* 📌 Meta Pixel (Facebook Pixel) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '601415156126587');
        fbq('track', 'PageView');
      `,
          }}
        />

        <link rel="icon" href="./favicon.ico" />
      </head>
      <body suppressHydrationWarning={true}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MDFK259S"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* 📌 Meta Pixel noscript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=601415156126587&ev=PageView&noscript=1"
          />
        </noscript>
        <main>
          <Provider store={store}>
            <AuthInitializer />
            {!isCheckout && <Header />}
            {children}
            <DefaultFooter />
            <SrollTop />
            <CookieConsent />
          </Provider>
        </main>
      </body>
    </html>
  );
}
