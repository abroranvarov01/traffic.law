"use client";
import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";
import Image from "next/image";
import { GoldButton } from "@/shared/ui/GoldButton/GoldButton";

const Hero = ({ dict }) => {
  const h = dict?.hero || {};

  return (
    <section className="relative w-full  flex items-center justify-center overflow-hidden bg-[#070707]">
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
      <Container className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 pt-20">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-3/5 text-white space-y-6 order-2 lg:order-1"
        >
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
            <GoldButton onClick={() => console.log("Consultation requested")}>
              {h.ctaButton || "ЗАПРОСИТЬ КОНСУЛЬТАЦИЮ"}
            </GoldButton>
          </div>
        </motion.div>

        {/* Right Image - Ixchamroq o'lchamda */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full lg:w-2/5 flex justify-center lg:justify-end order-1 lg:order-2"
        >
          <div className="relative w-full max-w-[380px] aspect-[4/7] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <Image
              src="/news/intro.png"
              alt="Professional Lawyer"
              fill
              className="object-contain"
              priority
            />
            {/* Rasm ostidagi oltin nuri (glow) */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#C59D5F]/10 blur-[100px] rounded-full" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
