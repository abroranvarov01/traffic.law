"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";
import { FiCalendar, FiEye } from "react-icons/fi";
import { GoldButton } from "@/shared/ui/GoldButton/GoldButton";

export const NewsSection = ({ dict }) => {
  const t = dict?.news || {};
  const newsItems = t.items || [];

  return (
    <section className="relative bg-[#070707] py-12 md:py-20 overflow-hidden text-white">
      {/* Background Decor */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-[#C59D5F]/10 blur-[150px] rounded-full pointer-events-none" />

      <Container>
        {/* --- Header Section --- */}
        <div className="text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#C59D5F] text-[10px] md:text-[12px] font-bold tracking-[0.4em] uppercase block mb-6"
          >
            • {t.subtitle} •
          </motion.span>
          <h2 className="text-2xl md:text-4xl font-serif uppercase tracking-widest leading-tight italic">
            {t.title}
          </h2>
        </div>

        {/* --- News Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col h-full cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl mb-6 border border-white/5">
                <Image
                  src={`/news/card-${index + 1}.png`}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Text Content */}
              <div className="flex flex-col flex-grow px-2">
                <h3 className="text-lg md:text-xl font-serif leading-snug mb-4 group-hover:text-[#C59D5F] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                  {item.desc}
                </p>

                {/* Meta Info */}
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-[#555] text-[12px]">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-[#C59D5F]" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiEye className="text-[#C59D5F]" />
                    <span>{item.views}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- View All Button (Tayyor komponentdan foydalanamiz) --- */}
        <div className="flex justify-center mt-16 md:mt-24">
          <GoldButton
            variant="primary" // Yoki sizda qanday variant bo'lsa (gold/primary)
            className="min-w-[280px]"
          >
            {t.view_all}
          </GoldButton>
        </div>
      </Container>
    </section>
  );
};
