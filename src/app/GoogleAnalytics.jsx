"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const GA_ID = "G-3ZNQV8ZVTJ";

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;

    window.gtag("event", "page_view", {
      page_location: window.location.href,
      page_path: pathname,
      page_title: document.title,
    });
  }, [pathname]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];

          window.gtag = function () {
            window.dataLayer.push(arguments);
          };

          window.gtag("js", new Date());

          window.gtag("config", "${GA_ID}", {
            send_page_view: false
          });
        `}
      </Script>
    </>
  );
}
