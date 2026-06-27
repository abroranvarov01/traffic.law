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
    threshold: 0.1,
    triggerOnce: true,
  });

  const stats = [
    { number: 192, suffix: "+", label: t.stats_completed },
    { number: 3210, suffix: "", label: t.stats_contracts },
    { number: 260, suffix: "%", label: t.stats_cases },
    { number: 100, suffix: "%", label: t.stats_clients },
  ];

  return (
    <section className="relative py-12 md:py-24 text-white bg-[#070707] overflow-hidden">
      {/* Dekorativ rasm */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        whileInView={{ x: 0, opacity: 0.4 }}
        className="absolute top-[5%] -left-20 w-64 h-64 md:w-[450px] md:h-[450px] z-0 pointer-events-none"
      >
        <Image src="/news/home.png" alt="" fill className="object-contain" />
      </motion.div>

      <Container className="relative z-10">
        {/* --- Header Section --- */}
        <div className="text-center max-w-5xl mx-auto mb-16 px-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#C59D5F] text-[10px] md:text-[12px] font-bold tracking-[0.4em] uppercase block mb-6"
          >
            • {t.subtitle} •
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xl md:text-3xl lg:text-[32px] font-serif uppercase leading-[1.5] tracking-wider italic mb-12"
          >
            <span className="text-[#C59D5F]">TRAFFIC LAW</span> – {t.main_title}
          </motion.h2>

          {/* Sarlavha ostidagi asosiy matn blogi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 text-left border-t border-white/10 pt-10"
          >
            <div className="space-y-6">
              <h3 className="text-[#C59D5F] font-serif text-xl md:text-2xl uppercase tracking-wide">
                {t.company_name}
              </h3>
              <p className="text-white font-medium italic text-sm md:text-base border-l-2 border-[#C59D5F] pl-5 leading-relaxed">
                {t.desc_1}
              </p>
            </div>
            <div className="text-gray-400 text-sm md:text-base leading-relaxed space-y-4">
              <p>{t.desc_2}</p>
              <p>{t.desc_3}</p>
            </div>
          </motion.div>
        </div>

        {/* --- Video Section --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative w-full aspect-video max-w-5xl mx-auto mb-16 rounded-sm overflow-hidden group border border-white/5 shadow-2xl"
        >
          <Image
            src="/news/video.png"
            alt="About Video"
            fill
            className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-16 h-16 md:w-24 md:h-24 bg-[#C59D5F] rounded-full flex items-center justify-center text-[#14110e] transition-all hover:scale-110 shadow-[0_0_30px_rgba(197,157,95,0.4)]">
              <FaPlay className="ml-1 text-xl md:text-3xl" />
            </button>
          </div>
        </motion.div>

        {/* --- Quote Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mb-24 px-6 py-10 bg-white/5 border-x border-[#C59D5F]/30 relative text-center"
        >
          <span className="text-[#C59D5F] text-6xl font-serif absolute -top-4 left-1/2 -translate-x-1/2 opacity-20">
            “
          </span>
          <p className="italic text-gray-300 text-sm md:text-lg leading-loose relative z-10">
            {t.quote}
          </p>
        </motion.div>

        {/* --- Statistics Section --- */}
        <div className="relative max-w-5xl mx-auto" ref={ref}>
          <div className="relative overflow-hidden py-12 md:py-20 px-6 border border-white/10 bg-[#0a0a0a]">
            <div className="absolute inset-0 z-0">
              <Image
                src="/news/koja.png"
                alt=""
                fill
                className="object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#1a1612]/70 to-[#070707]/95" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
              {stats.map((item, index) => (
                <div
                  key={index}
                  className="text-center md:border-r last:border-r-0 border-white/10"
                >
                  <h3 className="text-3xl md:text-5xl font-serif text-white mb-2">
                    {inView ? (
                      <CountUp
                        end={item.number}
                        duration={3}
                        suffix={item.suffix}
                      />
                    ) : (
                      "0"
                    )}
                  </h3>
                  <p className="text-[#C59D5F]/70 text-[9px] md:text-[11px] uppercase tracking-widest font-bold">
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
