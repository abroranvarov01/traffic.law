import React from "react";
import Image from "next/image";
import { Container } from "@/shared/ui/Container/Container";
import * as motion from "framer-motion/client"; // Client motion uchun
import { getDictionary, i18n } from "@/dictionaries/getDictionary";

// Widgetlar importi
import { About } from "@/widgets/About";
import { ExperienceSlider } from "@/widgets/ExperienceSlider";
import { Timeline } from "@/widgets/Timeline";
import { Benefits } from "@/widgets/Benefits";
import { Statistics } from "@/widgets/Statistics";
import { Appointment } from "@/widgets/Appointment";

export default async function AboutPage({ params }) {
  // 1. Params va Lang mantiqi (Server Side)
  let currentParams = await params;
  let lang = currentParams.lang;

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
      {/* --- 1. Breadcrumb / Header Section --- */}
      <section className="relative h-[400px] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bronze.jpg"
            alt="About Us"
            fill
            className="object-cover object-[70%_center] md:object-contain md:object-right-bottom"
            priority
          />
          {/* Sifatli gradient fonga qo'shilish uchun */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 md:via-[#0a0a0a]/60 to-transparent" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-[#C59D5F]" />
              <h1 className="text-[#C59D5F] text-3xl md:text-5xl font-serif italic uppercase tracking-wider">
                {dict.about_page_title || "About Us"}
              </h1>
            </div>
            <div className="w-24 h-[2px] bg-[#C59D5F] ml-16" />
          </motion.div>
        </Container>
      </section>

      {/* --- 2. Widgets Section --- */}
      {/* Home pagedagi kabi dict va lang har biriga uzatiladi */}

      <About dict={dict} lang={lang} />

      {/* <Statistics dict={dict} lang={lang} /> */}

      {/* <Timeline dict={dict} lang={lang} /> */}

      {/* <Benefits dict={dict} lang={lang} /> */}

      {/* <ExperienceSlider dict={dict} lang={lang} /> */}

      {/* <Appointment dict={dict} lang={lang} /> */}
    </main>
  );
}
