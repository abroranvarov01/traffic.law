import React from "react";
import Image from "next/image";
import { Container } from "@/shared/ui/Container/Container";
import * as motion from "framer-motion/client";
import { getDictionary, i18n } from "@/dictionaries/getDictionary";

// Widgetlar
import { Services } from "@/widgets/Services";
import { Team } from "@/widgets/Team";
import { LegalExpertSection } from "@/widgets/LegalExpertSection";
import { WhyChooseUs } from "@/widgets/WhyChooseUs";
import { OurWorks } from "@/widgets/OurWorks";

export default async function ServicePage({ params }) {
  const currentParams = await params;
  let lang = currentParams.lang || i18n.defaultLocale;

  const dict = await getDictionary(lang);

  // Statik sarlavhalar tilla bo'yicha
  const pageTitle =
    lang === "ru"
      ? "Наши Услуги"
      : lang === "uz"
        ? "Bizning Xizmatlar"
        : "Our Services";

  const upperSubtitle =
    lang === "ru"
      ? "ПРОФЕССИОНАЛЬНАЯ ПОМОЩЬ"
      : lang === "uz"
        ? "PROFESSIONAL YORDAM"
        : "PROFESSIONAL ASSISTANCE";

  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <section className="relative h-[450px] w-full flex items-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bronze.jpg"
            alt="Services"
            fill
            className="object-cover object-center md:object-right-bottom opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        </div>

        <Container className="relative z-10">
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
              <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-serif italic mb-6 tracking-widest uppercase">
                {pageTitle}
              </h1>
              <div className="w-28 h-[1.5px] bg-[#C59D5F]" />
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Widgetlar */}
      <LegalExpertSection dict={dict} lang={lang} />
      <WhyChooseUs dict={dict} />
      <OurWorks dict={dict} />
      <Services dict={dict} lang={lang} />
      <Team dict={dict} lang={lang} />
    </main>
  );
}
