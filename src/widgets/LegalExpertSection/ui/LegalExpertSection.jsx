"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";
import { GoldButton } from "@/shared/ui/GoldButton/GoldButton";

export const LegalExpertSection = ({ dict }) => {
  const data = dict?.legal_expert_section || {};
  const items = data.list_items || [];

  return (
    <section className="relative bg-[#070707] py-16 md:py-28 overflow-hidden border-y border-white/5">
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <Image
          src="/news/koja.png"
          alt="texture"
          fill
          className="object-cover grayscale invert"
        />
      </div>

      <Container className="relative z-10">
        {/* 1. Header */}
        <div className="text-center mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4 md:mb-6"
          >
            <span className="w-1.5 h-1.5 bg-[#C59D5F] rotate-45" />
            <span className="text-[#C59D5F] text-[9px] md:text-[10px] font-black tracking-[0.4em] uppercase">
              {data.upper_title}
            </span>
            <span className="w-1.5 h-1.5 bg-[#C59D5F] rotate-45" />
          </motion.div>

          <h2 className="text-white text-2xl md:text-3xl lg:text-3xl font-serif italic uppercase tracking-tight leading-tight">
            {data.main_title} <br className="hidden md:block" />
            <span className="text-[#C59D5F] not-italic font-bold">
              {data.gold_title}
            </span>
          </h2>
        </div>

        {/* 2. Main Content Layout */}
        <div className="relative flex flex-col items-center">
          {/* Markaziy rasm - Desktopda absolute markazda */}
          <div className="relative w-full max-w-[320px] md:max-w-[450px] lg:max-w-[550px] h-[350px] md:h-[550px] lg:h-[700px] z-10 flex justify-center order-1 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative w-full h-full"
            >
              <Image
                src="/news/man.png"
                alt="Legal Expert"
                fill
                className="object-contain z-10 drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
                priority
              />
            </motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[70%] bg-[#C59D5F]/10 blur-[100px] md:blur-[140px] rounded-full" />
          </div>

          {/* Xizmatlar Grid - Width uzunroq va matnlar start */}
          <div className="w-full grid grid-cols-2 lg:grid-cols-2 gap-3 md:gap-x-[350px] lg:gap-x-[450px] xl:gap-x-[500px] gap-y-4 md:gap-y-6 z-20 order-2 mt-8 lg:mt-0">
            {/* Chap tomon (1-4) */}
            <div className="flex flex-col gap-3 md:gap-5 w-full">
              {items.slice(0, 4).map((item) => (
                <ServiceCard key={item.id} item={item} />
              ))}
            </div>

            {/* O'ng tomon (5-8) */}
            <div className="flex flex-col gap-3 md:gap-5 w-full">
              {items.slice(4, 8).map((item) => (
                <ServiceCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* 3. Action Button */}
        <div className="mt-16 md:mt-28 text-center relative z-30">
          <GoldButton>{data.view_button}</GoldButton>
        </div>
      </Container>
    </section>
  );
};

// Karta komponenti - Width uzun va barcha text-align start
const ServiceCard = ({ item }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="group bg-[#111111]/90 border border-white/5 px-4 py-2 hover:border-[#C59D5F]/40 transition-all duration-500 backdrop-blur-xl flex flex-col justify-center w-full"
  >
    <div className="flex flex-col gap-3 md:gap-5 text-left items-start">
      <span className="text-2xl md:text-4xl font-serif italic text-[#C59D5F]/40 group-hover:text-[#C59D5F] transition-all leading-none">
        {item.id.toString().padStart(2, "0")}
      </span>
      <p className="text-gray-200 text-[12px] md:text-[17px] font-medium leading-relaxed group-hover:text-white transition-colors">
        {item.title}
      </p>
    </div>
  </motion.div>
);
