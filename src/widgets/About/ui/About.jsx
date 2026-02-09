"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";
import { FaPlay } from "react-icons/fa";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export const About = ({ dict, lang }) => {
  const t = dict?.about || {};
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const stats = [
    { number: 192, suffix: "+", label: t.stats_completed },
    { number: 3210, suffix: "", label: t.stats_contracts },
    { number: 260, suffix: "%", label: t.stats_cases },
    { number: 100, suffix: "%", label: t.stats_clients },
  ];

  return (
    <section className="relative py-4 md:py-24 text-white bg-[#070707] overflow-hidden">
      {/* 1. Chap tarafdagi dekorativ rasm (Home/Gold) */}
      <motion.div
        initial={{ x: -80, opacity: 0, rotate: -10 }}
        whileInView={{ x: 0, opacity: 1, rotate: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute top-[10%] -left-20 w-32 h-32 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] z-0 pointer-events-none opacity-40 lg:opacity-60"
      >
        <Image
          src="/news/home.png"
          alt="Decoration Left"
          fill
          className="object-contain"
        />
      </motion.div>

      {/* 2. O'ng pastdagi dekorativ rasm (Bag/Marble) */}
      <motion.div
        initial={{ x: 80, opacity: 0, rotate: 10 }}
        whileInView={{ x: 0, opacity: 1, rotate: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute bottom-[5%] -right-30 w-40 h-40 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] z-20 pointer-events-none opacity-50 lg:opacity-100"
      >
        <Image
          src="/news/bag.png"
          alt="Decoration Right"
          fill
          className="object-contain"
        />
      </motion.div>

      <Container className="relative z-10">
        {/* --- Header Section --- */}
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16 px-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#C59D5F] text-[10px] md:text-[12px] font-bold tracking-[0.4em] uppercase block mb-4 md:mb-6"
          >
            • {t.subtitle || "About Us"} •
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xl md:text-3xl lg:text-[32px] font-serif uppercase leading-[1.4] tracking-wider italic"
          >
            <span className="text-[#C59D5F]">TRAFFIC LAW</span> – {t.main_title}
          </motion.h2>
        </div>

        {/* --- Video Section --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative w-full aspect-video max-w-5xl mx-auto mb-16 md:mb-24 rounded-sm overflow-hidden group shadow-[0_0_60px_rgba(0,0,0,0.6)] border border-white/5"
        >
          <Image
            src="/news/video.png"
            alt="About Video"
            fill
            className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-16 h-16 md:w-24 md:h-24 bg-[#C59D5F] rounded-full flex items-center justify-center text-[#14110e] transition-all duration-300 hover:scale-110 shadow-[0_0_30px_rgba(197,157,95,0.3)]">
              <FaPlay className="ml-1 text-xl md:text-3xl" />
            </button>
          </div>
        </motion.div>

        {/* --- Statistics Section with CountUp --- */}
        <div className="relative max-w-5xl mx-auto" ref={ref}>
          <div className="relative overflow-hidden py-12 md:py-20 px-6 md:px-10 border border-white/10 shadow-2xl z-10 bg-[#0a0a0a]">
            {/* Leather Texture Background */}
            <div className="absolute inset-0 z-0 opacity-100">
              <Image
                src="/news/koja.png"
                alt="Leather"
                fill
                className="object-contain opacity-40 md:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#1a1612]/80 to-[#070707]/90" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative z-10">
              {stats.map((item, index) => (
                <div
                  key={index}
                  className="text-center md:border-r last:border-r-0 border-white/10"
                >
                  <h3 className="text-2xl md:text-5xl font-serif text-white mb-2 md:mb-4 tracking-tighter">
                    {inView ? (
                      <CountUp
                        end={item.number}
                        duration={3}
                        suffix={item.suffix}
                        separator=","
                      />
                    ) : (
                      "0"
                    )}
                  </h3>
                  <p className="text-[#C59D5F]/70 text-[9px] md:text-[11px] uppercase tracking-[0.2em] font-bold leading-relaxed px-2">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
