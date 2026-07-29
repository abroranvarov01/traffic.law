"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

// Swiper importlari
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Keyboard, Mousewheel } from "swiper/modules";

import "swiper/css";

const SLIDES_PER_VIEW = 4;

const ArrowButton = ({ direction, onClick, className = "" }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={direction === "prev" ? "Oldingi" : "Keyingi"}
    className={`w-12 h-12 rounded-full border border-white/20 bg-[#0d0d0d]/80 backdrop-blur-sm text-white items-center justify-center hover:bg-[#C59D5F] hover:border-[#C59D5F] hover:text-black transition-all duration-300 ${className || "flex"}`}
  >
    {direction === "prev" ? <HiArrowLeft size={18} /> : <HiArrowRight size={18} />}
  </button>
);

export const Team = ({ dict }) => {
  const t = dict?.team || {};
  const members = t.members || [];
  const swiperRef = useRef(null);

  // Rasm nomi ro'yxatdagi o'ringa bog'liq - nusxalashdan oldin biriktiramiz
  const cards = members.map((member, index) => ({
    ...member,
    photo: `/news/team-${index + 1}.png`,
  }));

  // Swiper loop uchun slaydlar ko'rinadiganidan kamida 2 barobar ko'p bo'lishi kerak,
  // aks holda uzluksiz aylanish o'chib qoladi
  const slides =
    cards.length > 0 && cards.length < SLIDES_PER_VIEW * 2
      ? [...cards, ...cards]
      : cards;

  return (
    <section className="relative bg-[#070707] py-4 md:py-4 overflow-hidden text-white">
      <Container>
        {/* --- Header Section --- */}
        <div className="text-center mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#C59D5F] text-[10px] font-bold tracking-[0.4em] uppercase block mb-6"
          >
            • {t.subtitle} •
          </motion.span>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-serif uppercase tracking-widest leading-tight">
            {t.title}
          </h2>
        </div>

        {/* --- Team Slider --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Autoplay, Keyboard, Mousewheel, A11y]}
            loop={true}
            speed={600}
            slidesPerView={1}
            spaceBetween={24}
            // Sichqoncha bilan tortish - "grab" kursori bilan ko'rinadigan qiladi
            grabCursor={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            keyboard={{ enabled: true }}
            // forceToAxis - faqat gorizontal harakat, sahifa scrollini o'g'irlamaydi
            mousewheel={{ forceToAxis: true }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 16 },
              1024: { slidesPerView: SLIDES_PER_VIEW, spaceBetween: 24 },
            }}
          >
            {slides.map((member, index) => (
              <SwiperSlide key={`${member.photo}-${index}`}>
                <div className="group relative flex flex-col">
                  {/* Image Container with Hover Frame */}
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-4 border border-white/5 transition-colors duration-500 group-hover:border-[#0091FF] group-hover:shadow-[0_0_30px_rgba(0,145,255,0.2)] transform-gpu [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
                    {/* Background Shadow Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent z-10" />

                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                    />

                    {/* Blue Border Overlay (Visible on Hover like Figma) */}
                    <div className="absolute inset-0 border-[2px] border-[#0091FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" />
                  </div>

                  {/* Text Information Box */}
                  <div className="bg-white/[0.04] border border-white/5 p-6 flex flex-col items-center text-center transition-colors duration-500 group-hover:bg-white/[0.06]">
                    <h4 className="text-white font-serif text-[15px] lg:text-[17px] tracking-wide uppercase mb-2 whitespace-nowrap">
                      {member.name}
                    </h4>
                    <p className="text-[#C59D5F] text-[9px] lg:text-[10px] font-bold tracking-[0.15em] leading-relaxed uppercase">
                      {member.role}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* --- Yon strelkalar (lg dan yuqorida) ---
              top-[37%] - kartaning rasm qismining o'rtasi: rasm aspect-[3/4],
              pastida ism bloki, shuning uchun markaz 50% dan yuqorida */}
          <ArrowButton
            direction="prev"
            onClick={() => swiperRef.current?.slidePrev()}
            className="hidden lg:flex absolute left-0 top-[37%] -translate-x-1/2 -translate-y-1/2 z-10"
          />
          <ArrowButton
            direction="next"
            onClick={() => swiperRef.current?.slideNext()}
            className="hidden lg:flex absolute right-0 top-[37%] translate-x-1/2 -translate-y-1/2 z-10"
          />

          {/* --- Kichik ekranlarda strelkalar pastda: yon tomonda joy yetmaydi --- */}
          <div className="flex lg:hidden justify-center gap-4 mt-10">
            <ArrowButton
              direction="prev"
              onClick={() => swiperRef.current?.slidePrev()}
            />
            <ArrowButton
              direction="next"
              onClick={() => swiperRef.current?.slideNext()}
            />
          </div>
        </motion.div>

        {/* --- View All Button (Premium Gold Style) --- */}
        {/* <div className="flex justify-center mt-20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group overflow-hidden px-10 py-4 md:px-14 md:py-5 rounded-lg transition-all duration-300"
            style={{
              background:
                "linear-gradient(180deg, #F3D393 0%, #D4A762 50%, #B68541 100%)",
              boxShadow: "0px 4px 0px #8B6229, 0px 10px 25px rgba(0,0,0,0.5)",
            }}
          >
            <div className="absolute inset-0 opacity-30 bg-gradient-to-b from-white via-transparent to-transparent pointer-events-none" />

          
            <div className="absolute inset-[1px] rounded-[7px] border border-white/20 pointer-events-none" />

            <div className="relative z-10 flex items-center justify-center gap-4">
              <div className="w-1.5 h-1.5 bg-[#2D1F16] rotate-45 group-hover:scale-125 transition-transform duration-300" />
              <span className="text-[#2D1F16] font-black uppercase tracking-[0.2em] text-[10px] md:text-[11px]">
                {t.view_all}
              </span>
              <div className="w-1.5 h-1.5 bg-[#2D1F16] rotate-45 group-hover:scale-125 transition-transform duration-300" />
            </div>

          
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          </motion.button>
        </div> */}
      </Container>
    </section>
  );
};
