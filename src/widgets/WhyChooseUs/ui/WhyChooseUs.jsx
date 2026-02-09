"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";

export const WhyChooseUs = ({ dict }) => {
  const t = dict?.whyChooseUs || {};
  const features = t.features || [];

  return (
    <section className="relative bg-[#070707] py-4 md:py-24 min-h-screen flex items-center overflow-hidden text-white">
      {/* 1. Markazdagi Asosiy Rasm (Fonda mahobatli turishi uchun) */}
      <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 0.4, scale: 1 }} // Mobil uchun opacity pastroq
          transition={{ duration: 1.5 }}
          className="relative w-full max-w-[400px] md:max-w-[700px] lg:max-w-[900px] h-full"
        >
          <Image
            src="/news/tarozi.png"
            alt="Justice Background"
            fill
            className="object-contain object-center lg:scale-125"
            priority
          />
          {/* Gradient qatlamlari: rasm chetlarini yumshatish uchun */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#070707] via-transparent to-[#070707]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-transparent to-[#070707] hidden lg:block" />
        </motion.div>
      </div>

      <Container className="relative z-10 w-full">
        {/* Header - Ixchamroq responsive o'lchamlar */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#C59D5F] text-[9px] md:text-[10px] font-bold tracking-[0.4em] uppercase block mb-4"
          >
            • {t.subtitle} •
          </motion.span>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-serif uppercase tracking-widest leading-tight italic px-4">
            {t.title}
          </h2>
        </div>

        {/* Cardlar Grid-i - Responsive gap va alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-64 gap-y-10 md:gap-y-24">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ x: index % 2 === 0 ? -30 : 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`
                relative group p-6 md:p-8 rounded-sm transition-all duration-700
                bg-white/[0.01] backdrop-blur-[4px] border border-white/5
                hover:border-[#C59D5F]/30 hover:bg-white/[0.04]
                w-full max-w-[400px] mx-auto
                ${index % 2 === 1 ? "md:justify-self-end md:text-start" : "md:justify-self-start md:text-left"}
                text-start /* Mobil uchun markazda */
              `}
            >
              {/* Card sarlavhasi - Kichik qurilmalar uchun moslangan */}
              <h4 className="text-[#C59D5F] font-serif text-base md:text-lg lg:text-xl mb-3 md:mb-4 leading-snug uppercase tracking-[0.15em]">
                {item.title}
              </h4>
              <p className="text-gray-400 text-[13px] md:text-sm leading-relaxed font-light">
                {item.desc}
              </p>

              {/* Hoverda chiqadigan nafis chiziq */}
              <div
                className={`absolute bottom-0 h-[1px] bg-[#C59D5F]/40 transition-all duration-500 w-0 group-hover:w-full left-0 ${index % 2 === 1 ? "md:left-auto md:right-0" : ""}`}
              />
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Background Decor: Pastki nur effekti */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[80%] h-40 bg-[#C59D5F]/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};
