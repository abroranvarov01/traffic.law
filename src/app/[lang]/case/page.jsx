import React from "react";
import Image from "next/image";
import { Container } from "@/shared/ui/Container/Container";
import * as motion from "framer-motion/client";
import { getDictionary, i18n } from "@/dictionaries/getDictionary";
import { CaseStudies } from "@/widgets/CaseStudies/ui/CaseStudies";

export default async function CasePage({ params }) {
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
      ? "Наши Кейсы"
      : lang === "uz"
        ? "Muvaffaqiyatli Ishlar"
        : "Case Studies";

  const upperSubtitle =
    lang === "ru"
      ? "РЕЗУЛЬТАТЫ НАШЕЙ РАБОТЫ"
      : lang === "uz"
        ? "ISHIMIZ NATIJALARI"
        : "OUR WORK RESULTS";

  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      {/* --- 1. Header Section --- */}
      <section className="relative h-[400px] md:h-[450px] w-full flex items-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bronze.jpg"
            alt="Case Studies Header"
            fill
            className="object-cover object-center md:object-right-bottom opacity-70"
            priority
          />
          {/* Sifatli gradient overlay */}
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

      {/* --- 2. Case Studies Widget --- */}
      {/* Barcha widget ma'lumotlari dict va tanlangan til orqali ishlaydi */}
      <CaseStudies dict={dict} lang={lang} />
    </main>
  );
}
