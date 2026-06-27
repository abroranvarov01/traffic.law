"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";

export const AppSection = ({ dict }) => {
  const t = dict?.app || {};

  return (
    <section className="relative bg-[#000000] py-4 md:py-0 md:min-h-[700px] flex items-center overflow-hidden text-white border-t border-white/5">
      <Container className="relative">
        {/* --- Main Wrapper --- */}
        <div className="flex flex-col md:flex-row items-center justify-between relative min-h-[500px]">
          {/* 1. Left Content */}
          <div className="w-full md:w-1/2 z-10 text-center md:text-left mb-12 md:mb-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center justify-center md:justify-start gap-3 mb-4"
            >
              <div className="w-1.5 h-1.5 bg-[#C59D5F] rotate-45" />
              <span className="text-[#C59D5F] text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase">
                {t.subtitle}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl lg:text-4xl font-serif uppercase leading-[1.2] tracking-wide mb-6"
            >
              {t.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-xs md:text-sm leading-relaxed mb-10 max-w-md mx-auto md:mx-0"
            >
              {t.desc}
            </motion.p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="relative w-[130px] h-[40px] md:w-[150px] md:h-[46px]"
              >
                <Image
                  src="/news/appstore.png"
                  alt="App Store"
                  fill
                  className="object-contain"
                />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="relative w-[130px] h-[40px] md:w-[150px] md:h-[46px]"
              >
                <Image
                  src="/news/googleplay.png"
                  alt="Google Play"
                  fill
                  className="object-contain"
                />
              </motion.a>
            </div>
          </div>

          {/* 2. Phone Image - Takomillashtirilgan qism */}
          <div className="relative w-full md:absolute md:right-[-70px] md:top-10 md:bottom-0 h-[400px] md:h-full z-0 overflow-visible">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="relative w-full h-full"
              /* Mana bu uslub rasmning borderlarini (chekkalarini) fon bilan uyg'unlashtiradi */
              style={{
                WebkitMaskImage:
                  "radial-gradient(circle, black 60%, transparent 95%)",
                maskImage:
                  "radial-gradient(circle, black 60%, transparent 95%)",
              }}
            >
              <Image
                src="/news/phone.png"
                alt="App Background"
                fill
                /* object-contain qilsang rasm qochib ketmaydi va qirqilmaydi */
                className="object-contain md:object-right object-center"
                priority
              />
            </motion.div>
          </div>
        </div>
      </Container>

      <div className="absolute -bottom-20 left-0 w-[40%] h-64 bg-[#C59D5F]/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};
