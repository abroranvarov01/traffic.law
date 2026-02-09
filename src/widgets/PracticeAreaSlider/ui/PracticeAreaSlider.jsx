"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

// Swiper komponentlari
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Swiper stillari
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const practiceImages = ["/robber.jpg", "/robber.jpg", "/robber.jpg"];

const practiceList = [
  { name: "Domestic Violence" },
  { name: "Business Activity" },
  { name: "Murder Crime" },
  { name: "Commercial Law" },
  { name: "Financial Law" },
];

export const PracticeAreaSlider = () => {
  const swiperRef = useRef(null);

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="flex flex-col lg:flex-row items-stretch shadow-2xl overflow-hidden rounded-sm">
          {/* --- CHAP TARAFI: SWIPER SLIDER --- */}
          <div className="w-full lg:w-[65%] relative h-[400px] md:h-[500px] lg:h-auto overflow-hidden">
            <Swiper
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              speed={300}
              className="h-full w-full"
            >
              {practiceImages.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-full">
                    <Image
                      src={img}
                      alt={`Practice ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* --- NAVIGATION TUGMALARI --- 
                Mobile: bottom-4 right-4 
                Desktop: md:bottom-8 md:left-8 md:right-auto 
            */}
            <div className="absolute bottom-4 right-4 md:bottom-8 md:left-8 md:right-auto z-20 flex gap-3 md:gap-4">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/50 bg-black/30 text-white flex items-center justify-center hover:bg-[#C59D5F] hover:border-[#C59D5F] hover:text-black transition-all duration-300 backdrop-blur-md"
              >
                <HiArrowLeft size={20} className="md:w-6 md:h-6" />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/50 bg-black/30 text-white flex items-center justify-center hover:bg-[#C59D5F] hover:border-[#C59D5F] hover:text-black transition-all duration-300 backdrop-blur-md"
              >
                <HiArrowRight size={20} className="md:w-6 md:h-6" />
              </button>
            </div>
          </div>

          {/* --- O'NG TARAFI: GOLDEN INFO BOX --- */}
          <div className="w-full lg:w-[35%] bg-gradient-to-br from-[#d4af37] via-[#C59D5F] to-[#b38e54] p-8 md:p-14 flex flex-col justify-center relative">
            <h3 className="text-xl md:text-2xl font-serif text-[#1a1612] mb-6 md:mb-10 font-bold italic tracking-tight uppercase">
              Practice Areas
            </h3>

            <div className="bg-[#1a120b] p-6 md:p-10 shadow-[-10px_10px_30px_rgba(0,0,0,0.3)] md:shadow-[-20px_20px_40px_rgba(0,0,0,0.3)] border-l-2 border-[#C59D5F]">
              <ul className="flex flex-col">
                {practiceList.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group border-b border-white/5 last:border-none"
                  >
                    <button className="flex items-center gap-4 md:gap-5 py-4 md:py-5 w-full text-left transition-all duration-300">
                      <div className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-[#C59D5F] group-hover:bg-[#C59D5F] transition-all" />
                      <span className="text-[10px] md:text-[11px] text-gray-300 uppercase tracking-[0.2em] md:tracking-[0.25em] font-bold group-hover:text-[#C59D5F]">
                        {item.name}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Bezak harfi - Mobil versiyada kichikroq */}
            <div className="absolute top-0 right-0 p-2 md:p-4 opacity-5 pointer-events-none">
              <span className="text-8xl md:text-[12rem] font-serif text-black italic leading-none">
                P
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
