"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";
import { FiCalendar, FiEye, FiX, FiAlertTriangle } from "react-icons/fi";
import { GoldButton } from "@/shared/ui/GoldButton/GoldButton";

export const NewsSection = ({ dict }) => {
  const t = dict?.news || {};
  const newsItems = t.items || [];

  // Modal holatini boshqarish
  const [selectedNews, setSelectedNews] = useState(null);

  // Modal yopilganda scrollni qaytarish
  const closeModal = () => {
    setSelectedNews(null);
    document.body.style.overflow = "unset";
  };

  // Modal ochilganda scrollni muzlatish
  const openModal = (item, index) => {
    setSelectedNews({ ...item, index });
    document.body.style.overflow = "hidden";
  };

  return (
    <section className="relative bg-[#070707] py-20 md:py-32 overflow-hidden text-white">
      {/* Background Decor */}
      <div className="absolute top-1/2 -left-20 w-[400px] h-[400px] bg-[#C59D5F]/5 blur-[80px] rounded-full pointer-events-none" />

      <Container>
        {/* --- Header --- */}
        <div className="text-center mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="w-1.5 h-1.5 bg-[#C59D5F] rotate-45" />
            <span className="text-[#C59D5F] text-[10px] md:text-[12px] font-black tracking-[0.4em] uppercase">
              • {t.subtitle} •
            </span>
            <span className="w-1.5 h-1.5 bg-[#C59D5F] rotate-45" />
          </motion.div>

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif uppercase tracking-widest leading-tight italic max-w-4xl mx-auto">
            {t.title}
          </h2>
        </div>

        {/* --- News Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {newsItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => openModal(item, index)} // Click hodisasi
              className="group flex flex-col h-full bg-[#111] border border-white/5 rounded-sm hover:border-[#C59D5F]/30 transition-colors duration-500 cursor-pointer shadow-xl"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden shrink-0 transform-gpu [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
                <Image
                  src={`/news/card-${index + 1}.png`}
                  alt={item.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent opacity-80" />
              </div>

              {/* Text Content */}
              <div className="flex flex-col flex-grow p-6 md:p-8 relative">
                <h3 className="text-lg md:text-xl font-serif leading-snug mb-4 group-hover:text-[#C59D5F] transition-colors duration-300 line-clamp-2">
                  {item.title}
                </h3>
                {/* Asosiy sahifada qisqa tavsif qoladi, lekin modalda to'liq chiqadi */}
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-6 line-clamp-3">
                  {item.desc}
                </p>

                {/* Meta Info */}
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-[#555] text-[10px] md:text-[11px] uppercase tracking-widest">
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

        {/* --- View All Button --- */}
        <div className="flex justify-center mt-16 md:mt-24 relative z-10">
          <GoldButton variant="primary" className="min-w-[280px]">
            {t.view_all}
          </GoldButton>
        </div>
      </Container>

      {/* --- PREMIUM NEWS MODAL (O'qish uchun qulay) --- */}
      <AnimatePresence>
        {selectedNews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal} // Fon bosilganda yopish
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 cursor-pointer overflow-y-auto"
          >
            {/* Modal Kontenti */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Ichini bosganda yopilmasligi uchun
              className="bg-[#111] border border-white/10 w-full max-w-5xl rounded-sm shadow-[0_0_60px_rgba(0,0,0,0.7)] cursor-default overflow-hidden"
            >
              {/* Header: Rasm va Yopish tugmasi */}
              <div className="relative aspect-[21/9] w-full overflow-hidden border-b border-white/10">
                <Image
                  src={`/news/card-${selectedNews.index + 1}.png`}
                  alt={selectedNews.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />

                {/* Yopish tugmasi */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10 text-white/70 hover:text-white hover:bg-[#C59D5F] transition-all"
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              {/* Body: Matnlar (Scroll bo'ladigan qism) */}
              <div className="p-8 md:p-12 lg:p-16 max-h-[60vh] overflow-y-auto space-y-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {/* Meta & Title */}
                <div className="space-y-4 border-b border-white/5 pb-8">
                  <div className="flex items-center gap-6 text-[#777] text-xs md:text-sm uppercase tracking-widest">
                    <div className="flex items-center gap-2.5">
                      <FiCalendar className="text-[#C59D5F]" />
                      <span>{selectedNews.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <FiEye className="text-[#C59D5F]" />
                      <span>{selectedNews.views}</span>
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-white leading-tight">
                    {selectedNews.title}
                  </h2>
                </div>

                {/* To'liq Matn (Barcha ma'lumotlar shu yerda) */}
                <div className="prose prose-sm md:prose-base prose-invert max-w-none text-gray-300 leading-relaxed space-y-6 font-light">
                  {/* JSON-dagi 'desc' bu yerda to'liq chiqadi. Agar JSON-da HTML bo'lsa, dangerouslySetInnerHTML ishlatish mumkin */}
                  <p className="text-white text-base md:text-lg font-medium italic border-l-2 border-[#C59D5F] pl-6 py-1">
                    {selectedNews.desc}
                  </p>

                  {/* Localized call-to-action from the dictionary */}
                  {t.cta && <p>{t.cta}</p>}
                </div>

                {/* Disclaimer ichida */}
                <div className="mt-12 pt-10 border-t border-white/5 bg-black/20 p-6 flex flex-col md:flex-row gap-6 items-center rounded-sm">
                  <FiAlertTriangle className="text-4xl text-[#C59D5F] shrink-0" />
                  <p className="text-xs md:text-sm text-gray-500 italic leading-relaxed text-center md:text-left">
                    {dict.news?.disclaimer?.note}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
