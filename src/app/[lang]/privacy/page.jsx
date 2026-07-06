import React from "react";
import Image from "next/image";
import * as motion from "framer-motion/client";
import { Container } from "@/shared/ui/Container/Container";
import { i18n } from "@/dictionaries/getDictionary";
import { LegalDocs, getLegalDocs } from "@/widgets/LegalDocs";

// Sahifa uchun SEO metadata
export async function generateMetadata({ params }) {
  const { lang } = await params;
  const title =
    lang === "ru"
      ? "Правовые документы"
      : lang === "en"
        ? "Legal Documents"
        : "Huquqiy hujjatlar";

  return {
    title,
    alternates: {
      canonical: `/${lang}/privacy`,
      languages: {
        "uz-UZ": "/uz/privacy",
        "ru-RU": "/ru/privacy",
        "en-US": "/en/privacy",
      },
    },
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function PrivacyPage({ params }) {
  const { lang: rawLang } = await params;
  const lang = rawLang || i18n.defaultLocale;

  // Ikkala hujjat (maxfiylik siyosati + foydalanish shartnomasi) tilга mos yuklanadi
  const docs = await getLegalDocs(lang);

  // --- Statik matnlar (loyihadagi boshqa sahifalar kabi ternary orqali) ---
  const pageTitle =
    lang === "ru"
      ? "Правовые документы"
      : lang === "en"
        ? "Legal Documents"
        : "Huquqiy hujjatlar";

  const upperSubtitle =
    lang === "ru"
      ? "TRAFFIC LEGAL"
      : lang === "en"
        ? "TRAFFIC LEGAL"
        : "TRAFFIC LEGAL";

  const labels = {
    privacy:
      lang === "ru"
        ? "Политика конфиденциальности"
        : lang === "en"
          ? "Privacy Policy"
          : "Maxfiylik siyosati",
    agreement:
      lang === "ru"
        ? "Соглашение об использовании ПО"
        : lang === "en"
          ? "Software User Agreement"
          : "Dasturiy ta'minotdan foydalanish shartnomasi",
  };

  return (
    <main className="privacy-page bg-[#0a0a0a] min-h-screen">
      {/* --- Header Section (about sahifasi bilan bir xil uslub) --- */}
      <section className="relative h-[340px] md:h-[400px] w-full flex items-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bronze.jpg"
            alt="Legal documents"
            fill
            className="object-cover object-center md:object-right-bottom opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 md:via-[#0a0a0a]/60 to-transparent" />
        </div>

        <Container className="relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            <div className="flex flex-col">
              <span className="text-[#C59D5F] text-[10px] md:text-[12px] font-bold tracking-[0.5em] uppercase mb-4">
                • {upperSubtitle} •
              </span>
              <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-serif italic mb-6 tracking-widest uppercase leading-tight">
                {pageTitle}
              </h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100px" }}
                transition={{ delay: 0.5, duration: 1 }}
                className="h-[2px] bg-[#C59D5F]"
              />
            </div>
          </motion.div>
        </Container>
      </section>

      {/* --- Hujjatlar (tab bilan almashadigan ikkita hujjat) --- */}
      <LegalDocs docs={docs} labels={labels} />
    </main>
  );
}
