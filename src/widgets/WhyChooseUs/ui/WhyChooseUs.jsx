"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";

export const WhyChooseUs = ({ dict }) => {
  const t = dict?.whyChooseUs || {};
  const features = t.features || [];

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#070707] py-16 text-white md:py-28">
      {/* 1. Background Decor */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 0.35, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="relative h-full w-full max-w-[400px] md:max-w-[750px] lg:max-w-[950px]"
        >
          <Image
            src="/news/tarozi.png"
            alt="Justice Background"
            fill
            className="object-contain object-center lg:scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070707] via-transparent to-[#070707]" />
        </motion.div>
      </div>

      <Container className="relative z-10 w-full">
        {/* Header Section */}
        <div className="mx-auto mb-20 max-w-4xl text-center md:mb-32">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-5 block text-[10px] font-bold uppercase tracking-[0.4em] text-[#C59D5F] md:text-[11px]"
          >
            • {t.subtitle} •
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="px-4 font-serif text-xl italic uppercase leading-tight tracking-widest md:text-3xl lg:text-4xl"
          >
            {t.title}
          </motion.h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2 md:gap-y-24 lg:gap-x-48">
          {features.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ x: isEven ? -40 : 40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`group relative mx-auto w-full max-w-[500px] rounded-sm border border-white/5 bg-white/[0.03] p-6 transition-colors duration-700 hover:border-[#C59D5F]/40 hover:bg-white/[0.05] md:p-10 ${
                  isEven ? "md:justify-self-start" : "md:justify-self-end"
                } text-left`}
              >
                {/* Sarlavha */}
                <h4 className="mb-5 font-serif text-lg uppercase tracking-[0.1em] text-[#C59D5F] md:text-xl lg:text-[22px]">
                  {item.title}
                </h4>

                {/* Tavsif */}
                <p className="mb-4 text-[13px] font-light leading-relaxed text-gray-300 md:text-[15px]">
                  {item.desc}
                </p>

                {/* Ichki Ro'yxat */}
                {item.list && (
                  <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                    {item.list.map((li, i) => (
                      <li
                        key={i}
                        className="flex items-center text-[12px] text-gray-400 md:text-[13px]"
                      >
                        <span className="mr-3 h-1.5 w-1.5 rounded-full bg-[#C59D5F] opacity-70" />
                        {li}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Hover Line */}
                <div
                  className={`absolute bottom-0 h-[2px] w-0 bg-[#C59D5F] transition-all duration-500 group-hover:w-full ${
                    isEven ? "left-0" : "right-0"
                  }`}
                />
              </motion.div>
            );
          })}
        </div>
      </Container>

      {/* Background Glow */}
      <div className="pointer-events-none absolute -bottom-20 left-1/2 h-60 w-[90%] -translate-x-1/2 rounded-full bg-[#C59D5F]/5 blur-[80px]" />
    </section>
  );
};
