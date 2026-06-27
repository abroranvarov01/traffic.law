"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const METRIKA_ID = 109903418;

export default function YandexMetrika() {
  const pathname = usePathname();
  const firstPage = useRef(true);
  const previousUrl = useRef("");

  useEffect(() => {
    const currentUrl = window.location.href;

    // Birinchi kirishni oddiy Metrika kodi o‘zi hisoblaydi.
    if (firstPage.current) {
      firstPage.current = false;
      previousUrl.current = currentUrl;
      return;
    }

    // Next.js ichki sahifalar almashishini alohida ko‘rish sifatida yuboramiz.
    if (typeof window.ym === "function") {
      window.ym(METRIKA_ID, "hit", currentUrl, {
        title: document.title,
        referer: previousUrl.current,
      });
    }

    previousUrl.current = currentUrl;
  }, [pathname]);

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){
              (m[i].a=m[i].a||[]).push(arguments)
            };
            m[i].l=1*new Date();

            for (var j=0; j<document.scripts.length; j++) {
              if (document.scripts[j].src === r) {
                return;
              }
            }

            k=e.createElement(t);
            a=e.getElementsByTagName(t)[0];
            k.async=1;
            k.src=r;
            a.parentNode.insertBefore(k,a);
          })(
            window,
            document,
            "script",
            "https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}",
            "ym"
          );

          ym(${METRIKA_ID}, "init", {
            ssr: true,
            webvisor: true,
            clickmap: true,
            ecommerce: "dataLayer",
            accurateTrackBounce: true,
            trackLinks: true
          });
        `}
      </Script>

      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${METRIKA_ID}`}
            style={{
              position: "absolute",
              left: "-9999px",
            }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}