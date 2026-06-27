"use client";
import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";
import { GoldButton } from "@/shared/ui/GoldButton/GoldButton";

export const LegalExpertSection = ({ dict }) => {
  const data = dict?.legal_expert_section || {};
  const items = data.list_items || [];

  return (
    <section className="relative bg-[#070707] py-16 md:py-32 overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <Image
          src="/news/koja.png"
          alt=""
          fill
          className="object-cover grayscale invert"
        />
      </div>

      <Container className="relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="w-1.5 h-1.5 bg-[#C59D5F] rotate-45" />
            <span className="text-[#C59D5F] text-[10px] font-black tracking-[0.4em] uppercase">
              {data.upper_title}
            </span>
            <span className="w-1.5 h-1.5 bg-[#C59D5F] rotate-45" />
          </motion.div>

          <h2 className="text-white text-2xl md:text-4xl font-serif italic uppercase leading-tight tracking-wide">
            {data.main_title} <br />
            <span className="text-[#C59D5F] not-italic font-bold">
              {data.gold_title}
            </span>
          </h2>
        </div>

        <div className="relative">
          {/* Markaziy rasm - layoutga ta'sir qilmasligi uchun absolute */}
          <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[700px] z-0 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="relative w-full h-full"
            >
              <Image
                src="/news/man.png"
                alt="Expert"
                fill
                className="object-contain drop-shadow-[0_0_50px_rgba(0,0,0,0.9)]"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[50%] bg-[#C59D5F]/10 blur-[130px] rounded-full" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-0 lg:gap-x-[400px] xl:gap-x-[480px] gap-y-4 relative z-20">
            {/* Chap tomondagi kartalar */}
            <div className="flex flex-col gap-4">
              {items.slice(0, 4).map((item) => (
                <ServiceCard key={item.id} item={item} align="left" />
              ))}
            </div>

            {/* O'ng tomondagi kartalar */}
            <div className="flex flex-col gap-4">
              {items.slice(4).map((item) => (
                <ServiceCard key={item.id} item={item} align="right" />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-24 text-center relative z-30">
          <GoldButton>{data.view_button}</GoldButton>
        </div>
      </Container>
    </section>
  );
};

const ServiceCard = ({ item, align }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout // Sakrashning oldini olish uchun silliq layout o'tishi
      className={`
        relative group bg-[#0d0d0d] border border-white/5 p-5 md:p-6 
        transition-all duration-500 backdrop-blur-md overflow-hidden
        min-h-[120px] md:min-h-[140px] flex flex-col justify-center
        hover:border-[#C59D5F]/50 hover:bg-[#121212]
      `}
    >
      {/* Background Number */}
      <span
        className={`absolute top-2 ${align === "left" ? "right-4" : "left-4"} text-3xl font-serif italic text-white/[0.02] group-hover:text-[#C59D5F]/5 transition-colors`}
      >
        {item.id.toString().padStart(2, "0")}
      </span>

      <div className="relative z-10">
        <motion.h3
          layout="position"
          className="text-[#C59D5F] font-serif text-base md:text-[18px] uppercase tracking-wider mb-2 group-hover:text-white"
        >
          {item.title}
        </motion.h3>

        <div className="relative overflow-hidden">
          <motion.p
            layout
            className={`text-gray-400 text-[12px] md:text-[13px] leading-relaxed font-light`}
            initial={false}
            animate={{
              height: isHovered ? "auto" : "40px", // 40px - bu taxminan 2 qator matn
              opacity: isHovered ? 1 : 0.6,
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {item.desc}
          </motion.p>
        </div>
      </div>

      {/* Animated Underline */}
      <motion.div
        layout
        className={`absolute bottom-0 h-[1px] bg-[#C59D5F] ${align === "left" ? "left-0" : "right-0"}`}
        initial={{ width: 0 }}
        animate={{ width: isHovered ? "100%" : 0 }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
};
