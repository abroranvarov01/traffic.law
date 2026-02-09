"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Container } from "@/shared/ui/Container/Container";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

// Swiper stillari
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const services = [
  { title: "Criminal Law", category: "Personal Law", img: "/lawho09.png" },
  {
    title: "Domestic Violence",
    category: "Personal Law",
    img: "/lawho07-800x517.png",
  },
  {
    title: "Divorce Law",
    category: "Personal Law",
    img: "/lawho03-800x347.png",
  },
  { title: "Company Law", category: "Business Law", img: "/lawho08.png" },
  {
    title: "Real Estate Law",
    category: "Property Law",
    img: "/lawho06.png",
  },
];

const ExperienceSlider = () => {
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Intersection Observer animatsiyalar uchun
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Hydration xatosini oldini olish uchun
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative w-full bg-[#0a0a0a] overflow-hidden">
      {/* --- 1. STATISTIKA QISMI --- */}
      <div
        className="relative py-24 md:py-32 border-b border-white/5"
        ref={ref}
      >
        {/* Orqa fon rasmi va gradient */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/builtwo.png"
            alt="Experience Background"
            fill
            className="object-contain grayscale opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        </div>

        <Container className="relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            {/* Tajriba yillari */}
            <div className="flex items-center gap-6 group cursor-default">
              <span className="text-8xl md:text-[160px] font-serif text-[#C59D5F] leading-none transition-transform duration-500 group-hover:scale-105">
                {inView ? <CountUp end={10} duration={3} /> : "0"}
              </span>
              <div className="text-2xl md:text-4xl font-serif text-white italic uppercase tracking-[0.2em] leading-tight">
                years of <br />
                <span className="text-[#C59D5F]">experience</span>
              </div>
            </div>

            {/* Statistik kartalar */}
            <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
              {/* Card 01: Satisfied Clients */}
              <div className="relative overflow-hidden bg-[#1a1612]/80 backdrop-blur-md p-10 md:p-14 flex-1 lg:min-w-[280px] text-center border border-white/10 transition-all duration-500 hover:-translate-y-2 group">
                <div className="text-5xl font-serif text-white mb-3 transition-colors group-hover:text-[#C59D5F]">
                  {inView ? (
                    <CountUp end={2456} separator="," duration={2.5} />
                  ) : (
                    "0"
                  )}
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-gray-400 group-hover:text-white transition-colors">
                  Satisfied Clients
                </div>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C59D5F] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>

              {/* Card 02: Winning Awards */}
              <div className="relative overflow-hidden bg-[#C59D5F] p-10 md:p-14 flex-1 lg:min-w-[280px] text-center shadow-[0_20px_50px_rgba(197,157,95,0.1)] transition-all duration-500 hover:-translate-y-2 group">
                <div className="text-5xl font-serif text-[#1a120b] mb-3 font-bold">
                  {inView ? <CountUp end={25} duration={3} /> : "0"}
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#1a120b] font-black">
                  Winning Awards
                </div>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* --- 2. SWIPER SLIDER --- */}
      <div className="relative w-full h-[500px]">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          speed={1200}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation={{ prevEl, nextEl }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="h-full"
        >
          {services.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full overflow-hidden border-r border-white/5 cursor-pointer group">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-all duration-500" />

                <div className="absolute bottom-16 left-10 z-20 transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-[#C59D5F] transition-colors italic">
                    {item.name || item.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-[#C59D5F]" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-300">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[#C59D5F] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Tugmalari */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6">
          <button
            ref={(node) => setPrevEl(node)}
            className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white bg-black/30 backdrop-blur-md hover:bg-[#C59D5F] hover:border-[#C59D5F] hover:text-black transition-all duration-300 active:scale-90"
          >
            <FaChevronLeft size={16} />
          </button>
          <button
            ref={(node) => setNextEl(node)}
            className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white bg-black/30 backdrop-blur-md hover:bg-[#C59D5F] hover:border-[#C59D5F] hover:text-black transition-all duration-300 active:scale-90"
          >
            <FaChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSlider;
