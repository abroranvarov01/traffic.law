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

// 1. DYNAMIC METADATA - SEO ANALITIKA
export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const baseUrl = "https://trafficlegal.uz";

  return {
    title: {
      default: dict.seo.title,
      template: `%s | ${dict.seo.site_name}`,
    },
    description: dict.seo.description,
    keywords: dict.seo.keywords,
    metadataBase: new URL(baseUrl),

    // FAVICON VA ICONS - GENIALNIY QISMI
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
          color: "#C59D5F", // Sizning oltin ranguingiz
        },
      ],
    },

    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        "uz-UZ": "/uz",
        "ru-RU": "/ru",
        "en-US": "/en",
      },
    },

    openGraph: {
      title: dict.seo.title,
      description: dict.seo.description,
      url: `${baseUrl}/${lang}`,
      siteName: dict.seo.site_name,
      images: [
        {
          url: "/og-image.jpg", // 1200x630 rasm qo'yishni unutmang
          width: 1200,
          height: 630,
          alt: "Traffic Legal - Professional Law Firm",
        },
      ],
      locale: lang === "uz" ? "uz_UZ" : lang === "ru" ? "ru_RU" : "en_US",
      type: "website",
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
        {/* Favicon ulanishi qo'shimcha tarzda */}
        <link rel="icon" href="/news/fiveicon.png" />

        {/* Google Analytics (GTAG) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className={`${inter.className} font-sans antialiased bg-[#070707]`}>
        <Navbar dict={dict} lang={lang} />
        <main>{children}</main>
        <Footer dict={dict} lang={lang} />
      </body>
    </html>
  );
}


