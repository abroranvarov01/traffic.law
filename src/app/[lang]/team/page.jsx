import React from "react";
import Image from "next/image";
import { Container } from "@/shared/ui/Container/Container";
import * as motion from "framer-motion/client";
import { Team } from "@/widgets/Team";
import { getDictionary, i18n } from "@/dictionaries/getDictionary";
// import { seoData } from "../seoData";

// export async function generateMetadata({ params }) {
//   const { lang } = params;
//   const seo = seoData[lang]?.team || seoData.uz.team;

//   return {
//     title: seo.title,
//     description: seo.description,
//     keywords: seo.keywords,
//     alternates: {
//       canonical: `https://traffic.law/${lang}/team`,
//     },
//   };
// }

const CasePage = async ({ params }) => {
  const currentParams = await params;
  const lang = currentParams.lang || i18n.defaultLocale;
  const dict = await getDictionary(lang);

  return (
    <main className="bg-[#0a0a0a]">
      {/* 1. Header Section */}
      <section className="relative h-[450px] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bronze.jpg"
            alt="Case Studies"
            fill
            // Klasslarni bitta qatorga yig'ing, ortiqcha enter va probellarni o'chiring
            className="object-cover object-[70%_center] md:object-contain md:object-right-bottom"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 md:via-[#0a0a0a]/60 to-transparent" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            <div className="absolute left-0 top-[-100px] w-[1px] h-[150px] bg-[#C59D5F]/40 hidden lg:block" />

            <div className="flex flex-col">
              <h1 className="text-white text-3xl md:text-4xl font-serif italic mb-6 tracking-wide">
                Page - Team 
              </h1>
              <div className="w-28 h-[1.5px] bg-[#C59D5F]" />
            </div>
          </motion.div>
        </Container>
      </section>
      <Team dict={dict} lang={lang} />
    </main>
  );
};

export default CasePage;
