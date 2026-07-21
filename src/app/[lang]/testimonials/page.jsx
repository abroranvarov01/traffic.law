import React from "react";
import Image from "next/image";
import { Container } from "@/shared/ui/Container/Container";
import * as motion from "framer-motion/client";
import { getDictionary, i18n } from "@/dictionaries/getDictionary";
import { Testimonials } from "@/widgets/Testimonials";
import { seoData } from "../seoData";

export async function generateMetadata({ params }) {
  const { lang } = params;
  const seo = seoData[lang]?.testimonials || seoData.uz.testimonials;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `https://traffic.law/${lang}/testimonials`,
    },
  };
}

export default async function TestimonialsPage({ params }) {
  // 1. Params va Tilni aniqlash
  const currentParams = await params;
  let lang = currentParams.lang;

  if (!lang && currentParams.value) {
    try {
      const parsedValue = JSON.parse(currentParams.value);
      lang = parsedValue.lang;
    } catch (e) {
      console.error("Language parsing error:", e);
    }
  }

  if (!lang) lang = i18n.defaultLocale;

  // 2. Dictionary-ni yuklash
  const dict = await getDictionary(lang);

  // --- Statik Sarlavhalar (Ternary orqali) ---
  const pageTitle =
    lang === "ru"
      ? "Отзывы Клиентов"
      : lang === "uz"
        ? "Mijozlar Fikrlari"
        : "Client Testimonials";

  const upperSubtitle =
    lang === "ru"
      ? "ДОВЕРИЕ НАШИХ ПАРТНЕРОВ"
      : lang === "uz"
        ? "HAMKORLARIMIZ ISHONCHI"
        : "TRUST OF OUR PARTNERS";

  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      {/* --- 1. Header Section --- */}
      <section className="relative h-[400px] md:h-[450px] w-full flex items-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bronze.jpg"
            alt="Testimonials Header"
            fill
            className="object-cover object-center md:object-right-bottom opacity-70"
            priority
          />
          {/* Sifatli premium gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 md:via-[#0a0a0a]/60 to-transparent" />
        </div>

        <Container className="relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            {/* Dekorativ vertikal chiziq */}
            <div className="absolute left-0 top-[-80px] w-[1px] h-[120px] bg-[#C59D5F]/30 hidden lg:block" />

            <div className="flex flex-col">
              <span className="text-[#C59D5F] text-[10px] md:text-[12px] font-bold tracking-[0.5em] uppercase mb-4">
                • {upperSubtitle} •
              </span>
              <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-serif italic mb-6 tracking-widest uppercase leading-tight">
                {pageTitle}
              </h1>
              {/* Dekorativ gorizontal chiziq */}
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

      {/* --- 2. Testimonials Widget --- */}
      {/* Widget ichidagi fikrlar tanlangan tilda chiqishi uchun dict va lang uzatiladi */}
      <Testimonials dict={dict} lang={lang} />
    </main>
  );
}
