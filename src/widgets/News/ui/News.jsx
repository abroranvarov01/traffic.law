"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";
import { FiCalendar, FiEye } from "react-icons/fi";
import { GoldButton } from "@/shared/ui/GoldButton/GoldButton";

export const NewsSection = ({ dict, lang = "uz" }) => {
  const t = dict?.news || {};
  const newsItems = t.items || [];
  const router = useRouter();

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
            >
              <Link
                href={`/${lang}/news/${index + 1}`}
                className="group flex flex-col h-full bg-[#111] border border-white/5 rounded-sm hover:border-[#C59D5F]/30 transition-colors duration-500 cursor-pointer shadow-xl"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden shrink-0 transform-gpu [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
                  <Image
                    src={`/news/card-${index + 1}.jpg`}
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
              </Link>
            </motion.div>
          ))}
        </div>

        {/* --- View All Button --- */}
        <div className="flex justify-center mt-16 md:mt-24 relative z-10">
          <GoldButton
            variant="primary"
            className="min-w-[280px]"
            onClick={() => router.push(`/${lang}/news/1`)}
          >
            {t.view_all}
          </GoldButton>
        </div>
      </Container>
    </section>
  );
};
