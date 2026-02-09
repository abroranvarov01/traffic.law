import React from "react";
import Image from "next/image";
import { Container } from "@/shared/ui/Container/Container";
import * as motion from "framer-motion/client"; // Client animatsiyalari uchun
import { getDictionary, i18n } from "@/dictionaries/getDictionary";
import { Testimonials } from "@/widgets/Testimonials";

export default async function TestimonialsPage({ params }) {
  // 1. Params va Tilni aniqlash (Server Side)
  let currentParams = await params;
  let lang = currentParams.lang;

  // Dictionary yuklash mantiqi
  if (!lang && currentParams.value) {
    try {
      const parsedValue = JSON.parse(currentParams.value);
      lang = parsedValue.lang;
    } catch (e) {
      console.error("Language parsing error:", e);
    }
  }

  if (!lang) {
    lang = i18n.defaultLocale;
  }

  // 2. Dictionary-ni yuklash
  const dict = await getDictionary(lang);

  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      {/* --- 1. Header Section --- */}
      <section className="relative h-[450px] w-full flex items-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bronze.jpg"
            alt="Testimonials"
            fill
            className="object-cover object-[70%_center] md:object-contain md:object-right-bottom"
            priority
          />
          {/* Dark Luxury Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 md:via-[#0a0a0a]/60 to-transparent" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            {/* Dekorativ vertikal chiziq */}
            <div className="absolute left-0 top-[-100px] w-[1px] h-[150px] bg-[#C59D5F]/40 hidden lg:block" />

            <div className="flex flex-col">
              <h1 className="text-white text-3xl md:text-5xl font-serif italic mb-6 tracking-[0.2em] uppercase">
                {dict.testimonials_page_title || "Testimonials"}
              </h1>
              {/* Dekorativ gorizontal chiziq */}
              <div className="w-28 h-[1.5px] bg-[#C59D5F]" />
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
