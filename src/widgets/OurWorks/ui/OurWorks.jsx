"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Container } from "@/shared/ui/Container/Container";

export const OurWorks = ({ dict }) => {
  const t = dict?.works || {};

  const projects = [
    {
      id: "01",
      title: t.item1_title || "ГРАЖДАНСКОЕ ПРАВО",
      desc:
        t.item1_desc ||
        "Успешное разрешение споров в суде общей юрисдикции по вопросам недвижимости и наследства.",
      image: "/news/work-image.png",
    },
    {
      id: "02",
      title: t.item2_title || "БИЗНЕС-КОНСАЛТИНГ",
      desc:
        t.item2_desc ||
        "Полное юридическое сопровождение сделки по слиянию двух крупных производственных компаний.",
      image: "/news/work-image.png",
    },
    {
      id: "03",
      title: t.item3_title || "ЗАЩИТА ПРАВ",
      desc:
        t.item3_desc ||
        "Представление интересов клиента в арбитражном суде по вопросу защиты интеллектуальной собственности.",
      image: "/news/work-image.png",
    },
  ];

  return (
    <section className="bg-[#070707] py-4  text-white overflow-hidden">
      <Container>
        {/* --- Header Section --- */}
        <div className="text-center mb-12 md:mb-20 px-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#C59D5F] text-[9px] md:text-[10px] font-bold tracking-[0.4em] uppercase block mb-4"
          >
            • {t.subtitle || "НАШИ РАБОТЫ"} •
          </motion.span>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-serif uppercase tracking-wider max-w-3xl mx-auto leading-tight italic">
            {t.title || "РАБОТЫ, КОТОРЫЕ МЫ ВЫПОЛНИЛИ С ПОЛНЫМ УСПЕХОМ"}
          </h2>
        </div>

        {/* --- Projects List --- */}
        <div className="flex flex-col border-t border-white/10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative border-b border-white/10 flex flex-col md:flex-row items-start md:items-center py-8 md:py-10 transition-colors duration-300 hover:bg-white/[0.02] px-4 md:px-6"
            >
              {/* 1. Project Image - Mobile da tepada, Desktop da chapda */}
              <div className="relative w-full md:w-56 lg:w-64 h-48 md:h-36 lg:h-40 shrink-0 overflow-hidden rounded-sm mb-6 md:mb-0 md:mr-10 border border-white/5">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
              </div>

              {/* 2. Order Number & Text Content Wrapper */}
              <div className="flex items-start flex-grow w-full">
                {/* Order Number */}
                <span className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-white/10 group-hover:text-[#C59D5F] transition-colors duration-500 mr-6 md:mr-10 min-w-[50px] md:min-w-[70px]">
                  {project.id}
                </span>

                {/* Text Content */}
                <div className="flex-grow pr-4">
                  <h3 className="text-base md:text-lg lg:text-xl font-serif uppercase tracking-wide text-[#C59D5F] group-hover:text-white transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-[12px] md:text-sm max-w-xl leading-relaxed mt-2 md:mt-3 group-hover:text-gray-300 transition-colors duration-300 line-clamp-2 md:line-clamp-none">
                    {project.desc}
                  </p>
                </div>

                {/* 3. Arrow Icon - Mobil va Desktop uchun joylashuvi */}
                <div className="shrink-0 self-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 group-hover:bg-[#C59D5F] flex items-center justify-center rounded-sm transition-all duration-500">
                    <FiArrowUpRight className="text-lg md:text-2xl text-white/40 group-hover:text-[#070707] group-hover:rotate-45 transition-all duration-500" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Premium Zargarona Button --- */}
        <div className="flex justify-center mt-12 md:mt-20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group overflow-hidden px-8 md:px-14 py-4 md:py-5 rounded-lg transition-all duration-300"
            style={{
              background:
                "linear-gradient(180deg, #F3D393 0%, #D4A762 50%, #B68541 100%)",
              boxShadow: "0px 4px 0px #8B6229, 0px 10px 25px rgba(0,0,0,0.5)",
            }}
          >
            <div className="absolute inset-0 opacity-30 bg-gradient-to-b from-white via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-[1px] rounded-[7px] border border-white/20 pointer-events-none" />

            <div className="relative z-10 flex items-center justify-center gap-3 md:gap-4">
              <div className="w-1.5 h-1.5 bg-[#2D1F16] rotate-45 group-hover:scale-125 transition-transform duration-300" />
              <span className="text-[#2D1F16] font-bold md:font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-[11px]">
                {t.view_all_btn || "УВИДЕТЬ ВСЕ РАБОТЫ"}
              </span>
              <div className="w-1.5 h-1.5 bg-[#2D1F16] rotate-45 group-hover:scale-125 transition-transform duration-300" />
            </div>

            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          </motion.button>
        </div>
      </Container>
    </section>
  );
};
