"use client";
import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";
import Image from "next/image";
import { GoldButton } from "@/shared/ui/GoldButton/GoldButton";

const Hero = ({ dict }) => {
  const h = dict?.hero || {};

  return (
    <section className="relative w-full min-h-[640px] lg:min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#070707]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/news/bg-intro.png"
          alt="Background"
          fill
          className="object-cover opacity-60"
          priority
        />
        {/* Dark overlay - Kontent yaxshi o'qilishi uchun */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
      </div>

      {/* Vertical Lines Decoration - Shaffofligi kamaytirildi */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="container mx-auto h-full relative">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-[1px] bg-white/[0.03]"
              style={{ left: `${(i + 1) * 12.5}%` }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      {/* Oltin nur - Femida tomonidan tushuvchi yorug'lik */}
      <div className="absolute right-0 top-0 h-full w-1/2 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_65%_35%,rgba(197,157,95,0.10),transparent_60%)]" />

      <Container className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 pt-28 pb-20 lg:py-28">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-3/5 text-white space-y-6 order-2 lg:order-1"
        >
          {/* Oltin dekorativ chiziq */}
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-12 bg-[#C59D5F]" />
            <span className="h-[1px] w-3 bg-[#C59D5F]/40" />
          </div>

          {/* Sarlavhalar o'lchami kichraytirildi (text-5xl gacha) */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-[1.1] uppercase tracking-wide">
            <span className="block text-white/90">
              {h.title1 || "ЮРИДИЧЕСКАЯ"}
            </span>
            <span className="block text-[#C59D5F]">
              {h.title2 || "ЭКСПЕРТИЗА."}
            </span>
            <span className="block text-white/90 text-2xl md:text-3xl lg:text-4xl mt-2 font-light italic capitalize">
              {h.title3 || "Это наша политика"}
            </span>
          </h1>

          <p className="text-xs md:text-sm text-white/50 max-w-sm leading-relaxed font-light">
            {h.description ||
              "Профессиональные юридические решения для физических и юридических лиц в Узбекистане."}
          </p>

          {/* Yangi GoldButton integratsiyasi */}
          <div className="pt-4">
            <GoldButton
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {h.ctaButton || "ЗАПРОСИТЬ КОНСУЛЬТАЦИЮ"}
            </GoldButton>
          </div>
        </motion.div>

        {/* Right Image - Femida (adolat tarozisi) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full lg:w-2/5 flex justify-center lg:justify-end order-1 lg:order-2"
        >
          <div className="relative w-full max-w-[270px] sm:max-w-[320px] lg:max-w-[380px]">
            {/* Haykal ortidagi oltin halqa (nimb) */}
            <div className="absolute top-[6%] left-1/2 -translate-x-1/2 w-[92%] aspect-square rounded-full border border-[#C59D5F]/20 bg-[radial-gradient(circle,rgba(197,157,95,0.16),transparent_70%)] pointer-events-none" />
            <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[70%] aspect-square rounded-full bg-[#C59D5F]/10 blur-[70px] pointer-events-none" />

            <div className="relative w-full aspect-[4/7]">
              <Image
                src="/news/femida.png"
                alt={h.imageAlt || "Фемида — весы правосудия"}
                fill
                sizes="(max-width: 1024px) 75vw, 380px"
                className="object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)]"
                priority
              />
            </div>

            {/* Haykal ostidagi soya - "yerga qo'nishi" uchun */}
            <div className="absolute bottom-[1%] left-1/2 -translate-x-1/2 w-[55%] h-5 rounded-[100%] bg-black/80 blur-lg pointer-events-none" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
