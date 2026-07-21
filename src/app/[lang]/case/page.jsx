import React from "react";
import Image from "next/image";
import { Container } from "@/shared/ui/Container/Container";
import * as motion from "framer-motion/client";
import { getDictionary, i18n } from "@/dictionaries/getDictionary";
import { CaseStudies } from "@/widgets/CaseStudies/ui/CaseStudies";

import { seoData } from "../seoData";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const currentLang = lang || i18n.defaultLocale;
  const seo = seoData[currentLang]?.case || seoData.uz.case;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `https://traffic.law/${currentLang}/case`,
    },
  };
}

export default async function CasePage({ params }) {
  const { lang } = await params;
  const currentLang = lang || i18n.defaultLocale;

  const dict = await getDictionary(currentLang);

  const pageTitle =
    currentLang === "ru"
      ? "Наши Кейсы"
      : currentLang === "uz"
        ? "Muvaffaqiyatli Ishlar"
        : "Case Studies";

  const upperSubtitle =
    currentLang === "ru"
      ? "РЕЗУЛЬТАТЫ НАШЕЙ РАБОТЫ"
      : currentLang === "uz"
        ? "ISHIMIZ NATIJALARI"
        : "OUR WORK RESULTS";

  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <section className="relative h-[400px] md:h-[450px] w-full flex items-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bronze.jpg"
            alt="Case Studies Header"
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
            <div className="absolute left-0 top-[-80px] w-[1px] h-[120px] bg-[#C59D5F]/30 hidden lg:block" />

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

      <CaseStudies dict={dict} lang={currentLang} />
    </main>
  );
}