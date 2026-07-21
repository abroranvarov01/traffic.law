import YandexMetrika from "../YandexMetrika";
import GoogleAnalytics from "../GoogleAnalytics";
import { Inter, Ledger } from "next/font/google";
import { getDictionary, i18n } from "../../dictionaries/getDictionary";
import Script from "next/script";
import "./globals.css";

import { Navbar } from "@/widgets/Navbar";
import { Footer } from "@/widgets/Footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

const ledger = Ledger({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-ledger",
});

export async function generateMetadata() {
  return {
    metadataBase: new URL("https://traffic.law"),

    icons: {
      icon: [
        { url: "/favicon.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon.png", sizes: "192x192", type: "image/png" },
      ],
      shortcut: "/favicon.png",
      apple: [{ url: "/favicon.png", sizes: "180x180", type: "image/png" }],
      other: [
        {
          rel: "mask-icon",
          url: "/favicon.png",
          color: "#C59D5F",
        },
      ],
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
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={`${inter.variable} ${ledger.variable}`}>
      <head>
        <link rel="icon" href="/news/fiveicon.png" />

        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-3ZNQV8ZVTJ"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3ZNQV8ZVTJ', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>

      <body className={`${inter.className} font-sans antialiased bg-[#070707]`}>
        <YandexMetrika />
        <GoogleAnalytics />

        <Navbar dict={dict} lang={lang} />

        <main>{children}</main>

        <Footer dict={dict} lang={lang} />
      </body>
    </html>
  );
}