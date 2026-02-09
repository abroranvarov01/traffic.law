"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";

export const Services = ({ dict }) => {
  const t = dict?.services || {};
  const servicesList = t.items || [];

  return (
    <section className="relative bg-[#070707] py-4 flex flex-col justify-between overflow-hidden text-white">
      {/* Background Decor: Marble Bag (Ozod va mahobatli) */}
      <motion.div
        initial={{ x: 100, rotate: 15, opacity: 0 }}
        whileInView={{ x: 0, rotate: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -bottom-20 -right-20 w-[300px] h-[300px] md:w-[500px] md:h-[500px] z-20 pointer-events-none"
      >
        <Image
          src="/news/199.png"
          alt="Marble Decoration"
          fill
          className="object-contain"
        />
      </motion.div>

      <Container className="relative z-10 flex-1">
        {/* Header Section */}
        <div className="text-center max-w-5xl mx-auto mb-16">
          <h2 className="text-xl md:text-3xl lg:text-[28px] font-serif uppercase leading-relaxed tracking-[0.05em] text-[#C59D5F]">
            {t.title}
          </h2>
        </div>

        {/* Central Content */}
        <div className="relative flex items-center justify-center min-h-[600px]">
          {/* Background Big Text */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none pointer-events-none">
            <span className="text-[150px] md:text-[300px] lg:text-[450px] font-serif font-bold tracking-tighter">
              СФЕРЫ
            </span>
          </div>

          {/* Central Globe Image */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 2 }}
            className="relative w-[280px] h-[280px] md:w-[550px] md:h-[550px] lg:w-[700px] lg:h-[700px] z-0"
          >
            <Image
              src="/news/yer.png"
              alt="Global Law"
              fill
              className="object-contain mix-blend-lighten"
            />
            {/* Oltin rangli nur (Globus atrofida) */}
            <div className="absolute inset-0 bg-[#C59D5F]/5 blur-[150px] rounded-full" />
          </motion.div>

          {/* Services Labels */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-between pointer-events-none px-4 md:px-10 lg:px-20">
            {/* Left Column */}
            <div className="flex flex-col gap-24 md:gap-32 text-left z-30">
              {servicesList.slice(0, 3).map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -40, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.3, duration: 0.8 }}
                  className="max-w-[300px] pointer-events-auto group"
                >
                  <span className="font-serif text-[12px] md:text-[15px] lg:text-[18px] font-medium tracking-widest uppercase text-[#C59D5F] group-hover:text-white transition-colors duration-500 cursor-default">
                    {item}
                  </span>
                  <div className="w-0 group-hover:w-full h-[1px] bg-[#C59D5F] transition-all duration-700 mt-2 opacity-50" />
                </motion.div>
              ))}
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-24 md:gap-32 text-right z-30">
              {servicesList.slice(3, 6).map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ x: 40, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.3, duration: 0.8 }}
                  className="max-w-[300px] pointer-events-auto group"
                >
                  <span className="font-serif text-[12px] md:text-[15px] lg:text-[18px] font-medium tracking-widest uppercase text-[#C59D5F] group-hover:text-white transition-colors duration-500 cursor-default">
                    {item}
                  </span>
                  <div className="w-0 group-hover:w-full h-[1px] bg-[#C59D5F] ml-auto transition-all duration-700 mt-2 opacity-50" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
